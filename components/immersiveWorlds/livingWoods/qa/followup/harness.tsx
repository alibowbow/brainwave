import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import * as THREE from 'three';
import { Player } from '../../../../Player';
import { ImmersiveMode } from '../../../../ImmersiveMode';
import { getWoodsHost } from '../../host';
import { interactions, recordInteraction, title, world, worlds } from './backdrop';
import type { VisualMode } from '../../../../../types';
import 'pretendard/dist/web/variable/pretendardvariable.css';
import '../../../../../index.css';
import '../../../../../sound-studio.css';

const params = new URLSearchParams(location.search);
const raw = params.get('mode') === 'scene';
type QACanvas = HTMLCanvasElement & { __qaRemembered?: boolean };
type Lifecycle = { removalMs?: number; contextLostMs?: number; maxHeartbeatLagMs: number; heartbeatCount: number; canvas?: QACanvas };
const lifecycle: Lifecycle = { maxHeartbeatLagMs: 0, heartbeatCount: 0 };
const nativeInputLog: unknown[] = [];
let maxPendingSubmissions = 0;

function Harness() {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [immersive, setImmersive] = useState(false);
  const [static3D, setStatic] = useState(false);
  const [visualMode, setVisualMode] = useState<VisualMode>('nature');
  const [timeLeft, setTimeLeft] = useState(1500);
  const World = worlds[world];
  useEffect(() => {
    const selectCanvas = () => document.querySelector<QACanvas>('canvas[data-engine-id]');
    let lastHeartbeat = performance.now();
    const beat = window.setInterval(() => {
      const now = performance.now();
      lifecycle.maxHeartbeatLagMs = Math.max(lifecycle.maxHeartbeatLagMs, now - lastHeartbeat - 25);
      lifecycle.heartbeatCount++;
      maxPendingSubmissions = Math.max(maxPendingSubmissions, Number(selectCanvas()?.dataset.pendingSubmissions || 0));
      lastHeartbeat = now;
    }, 25);
    const observer = new MutationObserver(() => {
      if (lifecycle.canvas && !lifecycle.canvas.isConnected && lifecycle.removalMs === undefined) lifecycle.removalMs = performance.now();
    });
    observer.observe(document.getElementById('root')!, { childList: true, subtree: true });
    const recordInput = (event: PointerEvent) => { nativeInputLog.push({ type: event.type, trusted: event.isTrusted, tag: (event.target as Element)?.tagName, dragSurface: (event.target as Element)?.hasAttribute?.('data-scene-drag'), timeMs: performance.now() }); };
    document.addEventListener('pointerdown', recordInput, true);
    const api = {
      setActive: (v: boolean) => flushSync(() => setActive(v)),
      setMounted: (v: boolean) => flushSync(() => setMounted(v)),
      setStatic: (v: boolean) => flushSync(() => setStatic(v)),
      setImmersive: (v: boolean) => flushSync(() => setImmersive(v)),
      clearEvents: () => { interactions.length = 0; },
      events: () => interactions.slice(),
      nativeInputLog: () => nativeInputLog.slice(),
      rememberCanvas: () => {
        const canvas = selectCanvas();
        if (!canvas) throw new Error('No live scene canvas');
        lifecycle.canvas = canvas;
        lifecycle.removalMs = undefined;
        lifecycle.contextLostMs = undefined;
        lifecycle.maxHeartbeatLagMs = 0;
        lifecycle.heartbeatCount = 0;
        lastHeartbeat = performance.now();
        if (!canvas.__qaRemembered) {
          canvas.__qaRemembered = true;
          canvas.addEventListener('webglcontextlost', () => { lifecycle.contextLostMs = performance.now(); });
        }
      },
      lifecycle: () => {
        const canvas = lifecycle.canvas;
        return { ...lifecycle, canvas: undefined, sameCanvas: !!canvas && canvas === selectCanvas(), connected: canvas?.isConnected, dataset: { ...canvas?.dataset } };
      },
      targets: () => {
        const canvas = selectCanvas();
        if (!canvas) return [];
        const box = canvas.getBoundingClientRect();
        return (JSON.parse(canvas.dataset.targets || '[]') as { x: number; y: number }[])
          .filter(({ x, y }) => x > 0 && x < 1 && y > 0 && y < 1)
          .map(target => ({ ...target, clientX: box.left + target.x * box.width, clientY: box.top + target.y * box.height }));
      },
      triangleTargets: () => {
        // Read-only QA target selection. Box centers can lie in empty air for
        // thin angled leaves. Project real triangle interiors, then require the
        // same scene-target raycast used by native input to confirm each point.
        const engine = (getWoodsHost(world) as unknown as { engine: { content: { interactionTargets: THREE.Object3D[] } | null; camera: THREE.PerspectiveCamera } | null }).engine;
        const canvas = selectCanvas();
        if (!engine?.content || !canvas) return [];
        const targets = engine.content.interactionTargets, box = canvas.getBoundingClientRect();
        const ray = new THREE.Raycaster(), meshes: THREE.Mesh[] = [];
        for (const target of targets) target.traverse(object => {
          if (!(object as THREE.Mesh).isMesh || meshes.includes(object as THREE.Mesh)) return;
          for (let ancestor: THREE.Object3D | null = object; ancestor; ancestor = ancestor.parent) if (!ancestor.visible) return;
          meshes.push(object as THREE.Mesh);
        });
        const candidates: { x: number; y: number; clientX: number; clientY: number; object: string; triangle: number; instanceId?: number; projectedAreaPx: number; preferred: boolean; raycastObject: string; raycastDistance: number; sourceFrame?: string; selection: string }[] = [];
        for (const mesh of meshes) {
          const positions = mesh.geometry.getAttribute('position'), index = mesh.geometry.getIndex();
          if (!positions) continue;
          const isInstanced = (mesh as THREE.InstancedMesh).isInstancedMesh === true;
          const count = isInstanced ? Math.min((mesh as THREE.InstancedMesh).count, 24) : 1;
          const triangleCount = Math.floor((index?.count ?? positions.count) / 3);
          const step = Math.max(1, Math.ceil(triangleCount / 192));
          for (let instance = 0; instance < count; instance++) {
            const transform = mesh.matrixWorld.clone();
            if (isInstanced) {
              const local = new THREE.Matrix4(); (mesh as THREE.InstancedMesh).getMatrixAt(instance, local);
              transform.multiply(local);
            }
            for (let triangle = 0; triangle < triangleCount; triangle += step) {
              const vertices = [0, 1, 2].map(offset => new THREE.Vector3().fromBufferAttribute(positions, index ? index.getX(triangle * 3 + offset) : triangle * 3 + offset).applyMatrix4(transform));
              const point = vertices[0].clone().add(vertices[1]).add(vertices[2]).multiplyScalar(1 / 3).project(engine.camera);
              if (point.z <= -1 || point.z >= 1 || Math.abs(point.x) >= 0.98 || Math.abs(point.y) >= 0.98) continue;
              const projected = vertices.map(vertex => vertex.clone().project(engine.camera));
              const area = Math.abs((projected[1].x - projected[0].x) * (projected[2].y - projected[0].y) - (projected[1].y - projected[0].y) * (projected[2].x - projected[0].x)) * box.width * box.height / 8;
              if (area < 1) continue;
              ray.setFromCamera(new THREE.Vector2(point.x, point.y), engine.camera);
              const hit = ray.intersectObjects(targets, true)[0];
              if (!hit) continue;
              const x = (point.x + 1) / 2, y = (1 - point.y) / 2;
              candidates.push({ x, y, clientX: box.left + x * box.width, clientY: box.top + y * box.height, object: mesh.name || mesh.uuid, triangle, instanceId: isInstanced ? instance : undefined,
                projectedAreaPx: area, preferred: !isInstanced, raycastObject: hit.object.name || hit.object.uuid, raycastDistance: hit.distance, sourceFrame: canvas.dataset.frames, selection: 'projected actual triangle centroid; existing interaction-target raycast verified' });
            }
          }
        }
        candidates.sort((a, b) => Number(b.preferred) - Number(a.preferred) || b.projectedAreaPx - a.projectedAreaPx);
        const selected: typeof candidates = [];
        for (const candidate of candidates) {
          if (selected.some(previous => Math.hypot(previous.clientX - candidate.clientX, previous.clientY - candidate.clientY) < 2)) continue;
          selected.push(candidate); if (selected.length === 8) break;
        }
        return selected;
      },
      metrics: () => {
        const canvas = selectCanvas();
        const holder = canvas?.closest('[data-status]');
        const gl = canvas?.getContext('webgl2');
        const box = canvas?.getBoundingClientRect();
        return { nowMs: performance.now(), canvasCount: document.querySelectorAll('canvas').length,
          dataset: { ...canvas?.dataset }, width: canvas?.width, height: canvas?.height,
          css: box && { x: box.x, y: box.y, width: box.width, height: box.height }, dpr: devicePixelRatio,
          status: holder?.getAttribute('data-status'), motion: holder?.getAttribute('data-motion'),
          frames: Number(canvas?.dataset.frames), time: Number(canvas?.dataset.time),
          contextLost: gl?.isContextLost(), renderer: gl?.getParameter(gl.RENDERER), version: gl?.getParameter(gl.VERSION),
          maxPendingSubmissions,
          colorBufferFloat: !!gl?.getExtension('EXT_color_buffer_float'), colorBufferHalfFloat: !!gl?.getExtension('EXT_color_buffer_half_float'),
          visibility: document.visibilityState,
        };
      },
      drain: async (budgetMs: number) => {
        const canvas = selectCanvas();
        const gl = canvas?.getContext('webgl2');
        if (!canvas || !gl || gl.isContextLost()) throw new Error('No healthy existing WebGL2 context');
        const frames = canvas.dataset.frames, time = canvas.dataset.time;
        const start = performance.now();
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        if (!sync) throw new Error('fenceSync returned null');
        gl.flush();
        let polls = 0;
        try {
          // Yield before each zero-timeout observation. A new WebGL fence cannot
          // become observable as signaled in the task that created it.
          while (performance.now() - start < budgetMs) {
            await new Promise(resolve => window.setTimeout(resolve, 16));
            if (gl.isContextLost()) throw new Error('Context lost during GPU drain');
            if (canvas !== selectCanvas() || canvas.dataset.frames !== frames || canvas.dataset.time !== time) throw new Error('Canvas/frame/time changed during paused GPU drain');
            const result = gl.clientWaitSync(sync, 0, 0); polls++;
            if (result === gl.WAIT_FAILED) throw new Error('GPU drain WAIT_FAILED');
            if (result === gl.ALREADY_SIGNALED || result === gl.CONDITION_SATISFIED) return { passed: true, elapsedMs: performance.now() - start, polls, frames, time, result };
          }
          throw new Error(`GPU drain exceeded ${budgetMs} ms`);
        } finally { gl.deleteSync(sync); }
      },
      // Supplemental only; unlike native browser PNGs this omits HTML/CSS.
      captureCanvasSupplement: () => {
        const engine = (getWoodsHost(world) as unknown as { engine: { captureFrame(): string } }).engine;
        const canvas = selectCanvas();
        if (!engine || !canvas) throw new Error('Scene missing');
        return engine.captureFrame();
      },
    };
    (window as unknown as { __livingWoodsFollowupQA: typeof api }).__livingWoodsFollowupQA = api;
    return () => { clearInterval(beat); observer.disconnect(); document.removeEventListener('pointerdown', recordInput, true); };
  }, []);

  if (!mounted) return <button data-qa-remount onClick={() => setMounted(true)}>Restore QA scene</button>;
  if (raw) return <div data-scene-surface style={{ position: 'fixed', inset: 0 }}><World active={active} static3D={static3D} onInteraction={recordInteraction}/></div>;
  const noop = () => {};
  return <>
    <Player sessionName={title} timeLeft={timeLeft} isPlaying={active} onPlay={() => setActive(true)} onPause={() => setActive(false)} onStop={() => { setActive(false); setMounted(false); }} onMinimize={() => setMounted(false)} onTimeChange={setTimeLeft}
      currentBrainWave="alpha" onWaveChange={noop} activeLayers={[]} onToggleLayer={noop} onLayerVolume={noop} onBalanceLayers={noop}
      volumes={{ master: 0, binaural: 0, bg: 0 }} onMixChange={noop} brainwaveEnabled={false} onToggleBrainwave={noop} toneMode="binaural" onToneModeChange={noop}
      visualMode={visualMode} onVisualModeChange={setVisualMode} getAnalyser={() => null} onImmersive={() => setImmersive(true)} backgroundVariant="rainy-window" sceneCovered={immersive}/>
    {immersive && <ImmersiveMode timeLeft={timeLeft} isPlaying={active} sessionName={title} color="#7dbd92" visualMode={visualMode} activeLayers={[]} getAnalyser={() => null} onVisualModeChange={setVisualMode} onPlay={() => setActive(true)} onPause={() => setActive(false)} onStop={() => { setActive(false); setMounted(false); }} onExit={() => setImmersive(false)} backgroundVariant="rainy-window"/>}
  </>;
}

createRoot(document.getElementById('root')!).render(<Harness/>);
