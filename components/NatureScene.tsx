import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { BackgroundSoundType } from '../types';
import { getSoundIcon, getSoundLabel } from '../audioOptions';
import { inferNatureScene, NATURE_SCENES, projectScenePoint, type NatureSceneId, type SceneSpec } from '../sceneCatalog';
import { useSceneMotion } from './useSceneMotion';
import './nature-scene.css';

export type NatureBackgroundVariant = 'campfire';
interface Props {
  types: BackgroundSoundType[];
  sceneId?: NatureSceneId;
  backgroundVariant?: NatureBackgroundVariant;
  tall?: boolean;
  fill?: boolean;
  active?: boolean;
  interactive?: boolean;
  selectedType?: BackgroundSoundType | null;
  quietTypes?: BackgroundSoundType[];
  onSelectType?: (type: BackgroundSoundType) => void;
  subscribeEvents?: (cb: (type: BackgroundSoundType) => void) => () => void;
  onPositionsChange?: (positions: Partial<Record<BackgroundSoundType, number>>) => void;
}
const NO_QUIET_TYPES: BackgroundSoundType[] = [];
const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

function SceneVideo({ src, poster, active }: { src: string; poster: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean; effectiveType?: string } }).connection;
    const update = () => setAllowed(!connection?.saveData && !['2g', 'slow-2g'].includes(connection?.effectiveType ?? ''));
    update(); connection?.addEventListener('change', update);
    return () => connection?.removeEventListener('change', update);
  }, []);
  useEffect(() => { if (active && allowed) setStarted(true); }, [active, allowed]);
  useEffect(() => {
    if (!ref.current) return;
    if (active && allowed) void ref.current.play().catch(() => undefined);
    else ref.current.pause();
  }, [active, allowed, started]);
  if (!started || failed || !allowed) return null;
  return <video ref={ref} className="landscape-video" src={assetUrl(src)} poster={assetUrl(poster)} muted loop playsInline preload="none" onError={() => setFailed(true)} aria-hidden="true" />;
}

/** A coherent landscape, with controls projected through its actual responsive crop. */
export const NatureScene: React.FC<Props> = ({ types, sceneId, backgroundVariant, tall, fill, active = false, interactive = false, selectedType, quietTypes = NO_QUIET_TYPES, onSelectType, subscribeEvents, onPositionsChange }) => {
  // A host may explicitly select a place; changing its audio never changes that place.
  const requested = sceneId ?? (backgroundVariant === 'campfire' ? 'campfire' : inferNatureScene(types));
  const [displayed, setDisplayed] = useState<NatureSceneId>(requested);
  const [previous, setPrevious] = useState<NatureSceneId | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const [imageSize, setImageSize] = useState({ width: 1536, height: 1024 });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [pulse, setPulse] = useState<BackgroundSoundType | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const currentRef = useRef(displayed);
  const motion = useSceneMotion(active);
  const scene: SceneSpec = NATURE_SCENES[displayed];

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setSize({ width: entry.contentRect.width, height: entry.contentRect.height }));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    setFailed(false); setReady(false);
    const picture = new Image();
    picture.onload = async () => {
      try { await picture.decode(); } catch { /* onload already proves this image can be displayed. */ }
      if (cancelled) return;
      setImageSize({ width: picture.naturalWidth, height: picture.naturalHeight });
      if (currentRef.current !== requested) setPrevious(currentRef.current);
      currentRef.current = requested;
      setDisplayed(requested); setReady(true);
    };
    picture.onerror = () => { if (!cancelled) setFailed(true); };
    picture.src = assetUrl(NATURE_SCENES[requested].image) + (retry ? `?retry=${retry}` : '');
    return () => { cancelled = true; picture.onload = null; picture.onerror = null; };
  }, [requested, retry]);

  useEffect(() => {
    if (!previous) return;
    const timer = window.setTimeout(() => setPrevious(null), motion ? 3000 : 0);
    return () => window.clearTimeout(timer);
  }, [previous, motion]);

  useEffect(() => {
    if (!motion || !subscribeEvents) { setPulse(null); return; }
    let timer: number | undefined;
    const unsubscribe = subscribeEvents(type => {
      if (!types.includes(type) || quietTypes.includes(type)) return;
      setPulse(type);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setPulse(null), 700);
    });
    return () => { unsubscribe(); window.clearTimeout(timer); };
  }, [motion, subscribeEvents, types, quietTypes]);

  const points = useMemo(() => {
    const placed: { type: BackgroundSoundType; x: number; y: number }[] = [];
    for (const type of types) {
      const point = scene.points[type];
      if (!point) continue;
      const next = projectScenePoint(point, size.width, size.height, imageSize.width, imageSize.height, scene.positionX);
      // Cropping can bring two anchors together. Keep their 48px targets separate.
      for (let attempt = 0; attempt < 8 && placed.some(p => Math.hypot(p.x - next.x, p.y - next.y) < 58); attempt++) {
        next.y = Math.max(110, Math.min(size.height - 64, next.y + (attempt % 2 ? -1 : 1) * 64 * (attempt + 1)));
      }
      placed.push({ type, ...next });
    }
    return placed;
  }, [types, scene, size, imageSize]);
  useEffect(() => {
    onPositionsChange?.(Object.fromEntries(points.map(p => [p.type, p.x / size.width])));
  }, [points, size.width, onPositionsChange, active]);

  const imageSrc = assetUrl(scene.image);
  return <div ref={root} className={`landscape ${fill ? 'landscape-fill' : tall ? 'landscape-tall' : 'landscape-small'}`} data-scene={displayed} data-requested-scene={requested} data-motion={motion ? 'running' : 'paused'} data-mood={scene.mood} data-sounds={types.join(',')}>
    <img key={displayed} className={`landscape-image ${previous && motion ? 'landscape-arriving' : ''}`} src={imageSrc} style={{ objectPosition: `${(scene.positionX ?? .5) * 100}% center` }} alt={scene.name} decoding="async" />
    {previous && <img className="landscape-image landscape-leaving" src={assetUrl(NATURE_SCENES[previous].image)} style={{ objectPosition: `${((NATURE_SCENES[previous] as SceneSpec).positionX ?? .5) * 100}% center` }} alt="" aria-hidden="true" />}
    {scene.video && ready && <SceneVideo key={scene.video} src={scene.video} poster={scene.image} active={motion} />}
    <div className="landscape-shade" aria-hidden="true" />
    {/* Atmosphere is restrained and contained in its scene; no stretched prop atlases. */}
    {scene.mood === 'night' && displayed !== 'rural_summer_night' && <div className="landscape-fireflies" aria-hidden="true">{[0, 1, 2, 3, 4].map(i => <i key={i} style={{ left: `${25 + i * 12}%`, top: `${58 + (i % 3) * 9}%`, animationDelay: `${i * -1.7}s` }} />)}</div>}
    {scene.mood === 'rain' && <div className={`landscape-rain landscape-rain-${displayed}`} aria-hidden="true" />}
    {scene.mood === 'water' && <div className="landscape-waterlight" aria-hidden="true" />}
    {pulse && (pulse === 'thunder' || pulse === 'dthunder') && <div className="landscape-lightning" aria-hidden="true" />}
    {interactive && ready && points.map(({ type, x, y }) => <button key={type} data-sound={type} type="button" className={`landscape-point ${selectedType === type ? 'is-selected' : ''} ${quietTypes.includes(type) ? 'is-quiet' : ''} ${pulse === type ? 'is-sounding' : ''}`} style={{ left: x, top: y }} aria-label={`${getSoundLabel(type)} 조절`} aria-pressed={selectedType === type} onClick={() => onSelectType?.(type)}>
      {getSoundIcon(type)}<span>{getSoundLabel(type)}</span>
    </button>)}
    {(!ready || failed) && <div className="landscape-status" role="status">{failed ? <>장면을 불러오지 못했어요.<button type="button" onClick={() => setRetry(n => n + 1)}>다시 불러오기</button></> : '장면 불러오는 중'}</div>}
  </div>;
};
