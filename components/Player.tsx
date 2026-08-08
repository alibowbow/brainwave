import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowDown,
  Clock3,
  Expand,
  Headphones,
  Layers3,
  Maximize2,
  Pause,
  Play,
  Plus,
  SlidersHorizontal,
  Square,
  Volume2,
  Wind,
  X,
} from 'lucide-react';
import { type BackgroundSoundType, type BrainWaveType, type VisualMode, getBrainWaveLabel } from '../types';
import { WAVE_ORDER, getSoundLabel, getWaveShortLabel, getWaveColor } from '../audioOptions';
import type { SoundLayer, ToneMode } from '../services/audioEngine';
import type { MixVolumes } from '../audioLevels';
import { Toggle } from './Toggle';
import { SoundLayerPicker } from './SoundLayerPicker';
import { VolumeMixer } from './VolumeMixer';
import { BreathingGuide } from './BreathingGuide';
import { AuraVisualizer } from './AuraVisualizer';
import { NatureScene, type NatureBackgroundVariant } from './NatureScene';
import { VisualModeSwitch } from './VisualModeSwitch';

interface PlayerProps {
  sessionName: string;
  intention?: string;
  timeLeft: number;
  totalSeconds?: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onMinimize: () => void;
  onTimeChange: (val: number) => void;
  currentBrainWave: BrainWaveType;
  onWaveChange: (val: BrainWaveType) => void;
  activeLayers: SoundLayer[];
  onToggleLayer: (type: BackgroundSoundType) => void;
  onLayerVolume: (type: BackgroundSoundType, vol: number) => void;
  onBalanceLayers: () => void;
  volumes: MixVolumes;
  onMixChange: (volumes: MixVolumes) => void;
  brainwaveEnabled: boolean;
  onToggleBrainwave: () => void;
  toneMode: ToneMode;
  onToneModeChange: (mode: ToneMode) => void;
  visualMode: VisualMode;
  onVisualModeChange: (mode: VisualMode) => void;
  getAnalyser: () => AnalyserNode | null;
  onImmersive: () => void;
  backgroundVariant?: NatureBackgroundVariant;
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
};

export const Player: React.FC<PlayerProps> = ({
  sessionName,
  intention,
  timeLeft,
  totalSeconds = timeLeft,
  isPlaying,
  onPlay,
  onPause,
  onStop,
  onMinimize,
  onTimeChange,
  currentBrainWave,
  onWaveChange,
  activeLayers,
  onToggleLayer,
  onLayerVolume,
  onBalanceLayers,
  volumes,
  onMixChange,
  brainwaveEnabled,
  onToggleBrainwave,
  toneMode,
  onToneModeChange,
  visualMode,
  onVisualModeChange,
  getAnalyser,
  onImmersive,
  backgroundVariant,
}) => {
  const [breathingOn, setBreathingOn] = useState(false);
  const [panel, setPanel] = useState<'controls' | 'sounds'>('controls');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [sceneChromeVisible, setSceneChromeVisible] = useState(true);
  const sceneChromeTimerRef = useRef<number | null>(null);
  const detailsRef = useRef<HTMLElement>(null);
  const auraColor = brainwaveEnabled ? getWaveColor(currentBrainWave) : '#7886ff';
  const minutesLeft = Math.max(1, Math.ceil(timeLeft / 60));
  const progress = totalSeconds > 0 ? Math.min(1, Math.max(0, 1 - timeLeft / totalSeconds)) : 0;

  const revealSceneChrome = useCallback(() => {
    setSceneChromeVisible(true);
    if (sceneChromeTimerRef.current != null) window.clearTimeout(sceneChromeTimerRef.current);
    sceneChromeTimerRef.current = window.setTimeout(() => setSceneChromeVisible(false), 3600);
  }, []);

  const holdSceneChrome = useCallback(() => {
    setSceneChromeVisible(true);
    if (sceneChromeTimerRef.current != null) window.clearTimeout(sceneChromeTimerRef.current);
  }, []);

  useEffect(() => {
    if (visualMode === 'nature') {
      revealSceneChrome();
      document.addEventListener('keydown', revealSceneChrome);
    } else {
      setSceneChromeVisible(true);
      if (sceneChromeTimerRef.current != null) window.clearTimeout(sceneChromeTimerRef.current);
    }
    return () => {
      document.removeEventListener('keydown', revealSceneChrome);
      if (sceneChromeTimerRef.current != null) window.clearTimeout(sceneChromeTimerRef.current);
    };
  }, [revealSceneChrome, visualMode]);

  const handleVisualModeChange = (mode: VisualMode) => {
    if (mode === 'graphics') setDetailsOpen(false);
    onVisualModeChange(mode);
  };

  const openDetails = () => {
    setDetailsOpen(true);
    if (!window.matchMedia('(min-width: 1024px)').matches) {
      window.setTimeout(() => detailsRef.current?.scrollIntoView({ block: 'start' }), 0);
    }
  };

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-[#070a12] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 -top-48 h-[540px] w-[540px] rounded-full bg-indigo-600/14 blur-[110px]" />
        <div className="absolute -right-48 top-1/3 h-[520px] w-[520px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <header className="relative z-20 flex h-[68px] items-center justify-between border-b border-white/7 px-4 sm:px-6 lg:h-[78px] lg:px-8">
        <button type="button" onClick={onMinimize} className="flex items-center gap-2 rounded-full py-2 pr-3 text-xs font-black text-white/58 transition-colors hover:text-white">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/7"><ArrowDown size={16} /></span>
          축소
        </button>
        <div className="min-w-0 px-3 text-center">
          <p className="text-[9px] font-black tracking-[0.17em] text-[#8d99ff]">NOW PLAYING</p>
          <h1 className="mt-0.5 max-w-[40vw] truncate text-sm font-black tracking-[-0.02em] sm:max-w-md">{sessionName}</h1>
        </div>
        <button type="button" onClick={onImmersive} aria-label="전체 화면 보기" className="flex items-center gap-2 rounded-full bg-white/7 px-3 py-2.5 text-xs font-black text-white/64 transition-colors hover:bg-white/11 hover:text-white">
          <Maximize2 size={15} /><span className="hidden sm:inline">전체 화면</span>
        </button>
      </header>

      <main className={`relative z-10 mx-auto grid w-full lg:grid ${visualMode === 'nature' && !detailsOpen ? 'max-w-none gap-0 p-0 lg:px-4 lg:pb-4' : 'max-w-[1500px] gap-5 px-3 py-3 sm:px-5 sm:py-5 lg:grid-cols-[minmax(0,1.45fr)_390px] lg:gap-6 lg:px-8 lg:py-7'}`}>
        <section
          onPointerMove={visualMode === 'nature' ? revealSceneChrome : undefined}
          onPointerDown={visualMode === 'nature' ? revealSceneChrome : undefined}
          className={`relative overflow-hidden border-white/8 bg-[#101522] shadow-[0_30px_90px_rgba(0,0,0,0.42)] ${visualMode === 'nature' ? 'min-h-[calc(100dvh-68px)] border-0 sm:mx-3 sm:min-h-[calc(100dvh-80px)] sm:rounded-[28px] sm:border lg:mx-0 lg:min-h-[calc(100dvh-94px)]' : 'min-h-[540px] rounded-[30px] border sm:min-h-[650px] lg:min-h-[calc(100dvh-134px)]'}`}
        >
          <div className={`absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none ${visualMode === 'nature' ? 'opacity-100' : 'opacity-[0.78]'}`}>
            <NatureScene types={activeLayers.map((layer) => layer.type)} backgroundVariant={backgroundVariant} fill />
          </div>
          <div className={`absolute inset-0 transition-colors duration-300 motion-reduce:transition-none ${visualMode === 'nature' ? 'bg-gradient-to-b from-[#03110a]/8 via-transparent to-[#020807]/82' : 'bg-gradient-to-b from-[#050914]/42 via-[#050914]/46 to-[#050914]/92'}`} />
          {visualMode === 'graphics' ? <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,6,14,0.32)_72%,rgba(3,6,14,0.72)_100%)]" /> : null}

          {visualMode === 'nature' ? (
            <div
              onFocusCapture={holdSceneChrome}
              onBlurCapture={revealSceneChrome}
              className={`absolute inset-0 z-20 transition-opacity duration-300 motion-reduce:transition-none ${sceneChromeVisible ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'}`}
            >
              <VisualModeSwitch
                value={visualMode}
                onChange={handleVisualModeChange}
                className="absolute left-1/2 top-[max(12px,env(safe-area-inset-top))] -translate-x-1/2"
                compact
                quiet
              />

              <div className="absolute bottom-[max(18px,calc(env(safe-area-inset-bottom)+18px))] left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/16 bg-black/58 p-1.5 pl-4 text-white shadow-[0_16px_45px_rgba(0,0,0,0.34)] backdrop-blur-md">
                <div className="mr-1 min-w-[62px] text-center">
                  <p className="text-[8px] font-bold tracking-[0.14em] text-white/58">남은 시간</p>
                  <p className="mt-0.5 text-base font-semibold tabular-nums tracking-tight" aria-label={`남은 시간 ${Math.floor(timeLeft / 60)}분 ${timeLeft % 60}초`}>{formatTime(timeLeft)}</p>
                </div>
                <button type="button" onClick={isPlaying ? onPause : onPlay} aria-label={isPlaying ? '일시정지' : '재생'} className="grid h-12 w-12 place-items-center rounded-full bg-white text-slate-950 shadow-lg transition-transform hover:scale-105 active:scale-95">
                  {isPlaying ? <Pause size={21} fill="currentColor" /> : <Play size={21} fill="currentColor" className="ml-0.5" />}
                </button>
                <button type="button" onClick={onStop} aria-label="세션 종료" className="grid h-11 w-11 place-items-center rounded-full text-red-200 transition-colors hover:bg-red-500/18"><Square size={15} fill="currentColor" /></button>
                <button type="button" onClick={openDetails} aria-label="세션 세부 조절 열기" className="grid h-11 w-11 place-items-center rounded-full text-white/78 transition-colors hover:bg-white/12 hover:text-white"><SlidersHorizontal size={18} /></button>
              </div>

              <div
                className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10"
                role="progressbar"
                aria-label="세션 진행률"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress * 100)}
              >
                <div className="h-full bg-gradient-to-r from-emerald-300 to-lime-200 transition-[width] duration-500" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>
          ) : (
          <div className="relative flex min-h-[540px] flex-col items-center justify-between p-5 sm:min-h-[650px] sm:p-8 lg:min-h-[calc(100dvh-134px)]">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2 rounded-full bg-black/22 px-3 py-2 text-[10px] font-black text-white/70 backdrop-blur-md">
                <Headphones size={13} className="text-[#9ca6ff]" />
                {brainwaveEnabled ? getBrainWaveLabel(currentBrainWave).split(' ')[0] : '자연음 전용'}
              </div>
              <div className="flex items-center gap-2 rounded-full bg-black/22 px-3 py-2 text-[10px] font-black text-white/70 backdrop-blur-md">
                <Layers3 size={13} className="text-emerald-300" /> {activeLayers.length}개 레이어
              </div>
            </div>

            <VisualModeSwitch
              value={visualMode}
              onChange={handleVisualModeChange}
              className="absolute left-1/2 top-[74px] z-20 -translate-x-1/2 sm:top-6"
              compact
            />

            <div className="my-auto flex flex-col items-center pt-16 sm:pt-0">
              <div className="relative grid h-[250px] w-[250px] place-items-center sm:h-[310px] sm:w-[310px]">
                <AuraVisualizer getAnalyser={getAnalyser} active={isPlaying} color={auraColor} className="absolute inset-0 h-full w-full" />
                <div className="absolute inset-[18%] rounded-full border border-white/10 bg-black/18 shadow-[inset_0_0_45px_rgba(255,255,255,0.025)] backdrop-blur-md" />
                <div className="relative z-10 text-center">
                  <div className="text-[49px] font-extralight tabular-nums tracking-[-0.065em] drop-shadow-lg sm:text-[62px]">{formatTime(timeLeft)}</div>
                  <p className="mt-2 text-[10px] font-black tracking-[0.16em] text-white/45">REMAINING</p>
                  {intention ? <p className="mx-auto mt-3 max-w-[220px] truncate text-[11px] font-bold text-white/58">“{intention}”</p> : null}
                </div>
                <BreathingGuide active={breathingOn && isPlaying} />
              </div>

              <div className="mt-1 flex items-center gap-3">
                <button type="button" onClick={() => onTimeChange(Math.min(120, minutesLeft + 5))} className="flex min-h-10 items-center gap-1.5 rounded-full bg-white/8 px-3 text-[11px] font-black text-white/64 backdrop-blur-md transition-colors hover:bg-white/13 hover:text-white"><Plus size={13} /> 5분</button>
                <button type="button" onClick={isPlaying ? onPause : onPlay} aria-label={isPlaying ? '일시정지' : '재생'} className="grid h-[72px] w-[72px] place-items-center rounded-full bg-white text-slate-950 shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 active:scale-95">
                  {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                </button>
                <button type="button" onClick={onStop} aria-label="세션 종료" className="grid h-10 w-10 place-items-center rounded-full bg-red-500/14 text-red-300 backdrop-blur-md transition-colors hover:bg-red-500/22"><Square size={14} fill="currentColor" /></button>
              </div>

              <button type="button" onClick={() => setBreathingOn((value) => !value)} aria-pressed={breathingOn} className={`mt-4 flex min-h-9 items-center gap-1.5 rounded-full px-3 text-[10px] font-black backdrop-blur-md transition-all ${breathingOn ? 'bg-[#7180ef] text-white' : 'bg-black/22 text-white/55 hover:text-white'}`}><Wind size={13} /> 호흡 가이드</button>
            </div>

            <div className="w-full">
              <div className="mb-4 h-1 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-label="세션 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}><div className="h-full rounded-full bg-gradient-to-r from-[#7c89ff] to-[#b496ff] transition-[width] duration-500" style={{ width: `${progress * 100}%` }} /></div>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {activeLayers.length ? activeLayers.map((layer) => (
                  <span key={layer.type} className="shrink-0 rounded-full border border-white/10 bg-black/22 px-3 py-1.5 text-[10px] font-black text-white/62 backdrop-blur-md">{getSoundLabel(layer.type)}</span>
                )) : <span className="text-[10px] font-bold text-white/45">환경음 없이 뇌파음만 재생 중</span>}
              </div>
            </div>
          </div>
          )}
        </section>

        {(visualMode === 'graphics' || detailsOpen) ? <aside ref={detailsRef} className="rounded-[28px] border border-white/8 bg-[#101522] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.24)] lg:max-h-[calc(100dvh-134px)] lg:overflow-hidden">
          {visualMode === 'nature' ? (
            <div className="mb-3 flex min-h-11 items-center justify-between px-2">
              <div><p className="text-[9px] font-black tracking-[0.14em] text-emerald-300/70">SESSION</p><h2 className="mt-0.5 text-sm font-black">세션 조절</h2></div>
              <button type="button" onClick={() => setDetailsOpen(false)} aria-label="세션 조절 닫기" className="grid h-11 w-11 place-items-center rounded-full bg-white/6 text-white/58 transition-colors hover:bg-white/10 hover:text-white"><X size={17} /></button>
            </div>
          ) : null}
          <div className="grid grid-cols-2 gap-1 rounded-[18px] bg-white/[0.035] p-1">
            <button type="button" onClick={() => setPanel('controls')} aria-pressed={panel === 'controls'} className={`flex min-h-10 items-center justify-center gap-2 rounded-[14px] text-[11px] font-black transition-all ${panel === 'controls' ? 'bg-white text-slate-950 shadow-sm' : 'text-white/42 hover:text-white'}`}><Activity size={14} /> 세션</button>
            <button type="button" onClick={() => setPanel('sounds')} aria-pressed={panel === 'sounds'} className={`flex min-h-10 items-center justify-center gap-2 rounded-[14px] text-[11px] font-black transition-all ${panel === 'sounds' ? 'bg-white text-slate-950 shadow-sm' : 'text-white/42 hover:text-white'}`}><SlidersHorizontal size={14} /> 믹서</button>
          </div>

          <div className="mt-3 space-y-3 lg:max-h-[calc(100dvh-210px)] lg:overflow-y-auto lg:pr-1 scrollbar-hide">
            {panel === 'controls' ? (
              <>
                <section className="rounded-[20px] bg-white/[0.035] p-4">
                  <div className="flex items-center justify-between">
                    <div><p className="text-[9px] font-black tracking-[0.14em] text-white/30">TIME</p><h2 className="mt-1 text-sm font-black">재생 시간</h2></div>
                    <strong className="text-lg font-black tabular-nums text-[#98a3ff]">{minutesLeft}분</strong>
                  </div>
                  <input type="range" min="1" max="120" value={minutesLeft} onChange={(event) => onTimeChange(Number(event.target.value))} aria-label="남은 재생 시간" className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#7c8aff]" />
                  <div className="mt-3 grid grid-cols-4 gap-1.5">
                    {[10, 25, 40, 60].map((minutes) => <button key={minutes} type="button" onClick={() => onTimeChange(minutes)} className={`min-h-9 rounded-xl text-[10px] font-black ${minutesLeft === minutes ? 'bg-[#7180ef] text-white' : 'bg-white/[0.045] text-white/45 hover:text-white'}`}>{minutes}</button>)}
                  </div>
                </section>

                <section className="rounded-[20px] bg-white/[0.035] p-4">
                  <div className="flex items-center justify-between">
                    <div><p className="text-[9px] font-black tracking-[0.14em] text-[#8f9cff]">BRAINWAVE</p><h2 className="mt-1 text-sm font-black">뇌파 레이어</h2></div>
                    <Toggle checked={brainwaveEnabled} onChange={onToggleBrainwave} label="뇌파음 사용" />
                  </div>
                  <div className={`mt-4 grid grid-cols-5 gap-1 transition-opacity ${brainwaveEnabled ? '' : 'pointer-events-none opacity-30'}`}>
                    {WAVE_ORDER.map((wave) => <button key={wave} type="button" disabled={!brainwaveEnabled} onClick={() => onWaveChange(wave)} aria-pressed={currentBrainWave === wave} className={`min-h-10 rounded-xl text-[10px] font-black ${currentBrainWave === wave ? 'bg-[#7180ef] text-white' : 'bg-white/[0.045] text-white/45 hover:text-white'}`}>{getWaveShortLabel(wave)}</button>)}
                  </div>
                  {brainwaveEnabled ? <div className="mt-3 grid grid-cols-2 gap-1 rounded-xl bg-black/15 p-1">{(['binaural', 'isochronic'] as ToneMode[]).map((mode) => <button key={mode} type="button" onClick={() => onToneModeChange(mode)} aria-pressed={toneMode === mode} className={`min-h-9 rounded-lg text-[10px] font-black ${toneMode === mode ? 'bg-white/10 text-white' : 'text-white/35'}`}>{mode === 'binaural' ? '바이노럴' : '아이소크로닉'}</button>)}</div> : null}
                </section>

                <section className="rounded-[20px] bg-white/[0.035] p-4">
                  <p className="text-[9px] font-black tracking-[0.14em] text-emerald-300/70">ACTIVE SOUNDS</p>
                  <div className="mt-3 space-y-2">
                    {activeLayers.length ? activeLayers.map((layer) => (
                      <div key={layer.type} className="flex items-center gap-2 rounded-xl bg-black/14 px-3 py-2.5">
                        <Volume2 size={13} className="text-emerald-300" />
                        <span className="min-w-0 flex-1 truncate text-[11px] font-black text-white/70">{getSoundLabel(layer.type)}</span>
                        <span className="text-[9px] font-bold tabular-nums text-white/30">{Math.round(layer.volume * 100)}%</span>
                      </div>
                    )) : <p className="text-[10px] text-white/35">활성 환경음이 없습니다.</p>}
                  </div>
                  <button type="button" onClick={() => setPanel('sounds')} className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-white/8 text-[10px] font-black text-white/50 hover:text-white"><Expand size={13} /> 사운드 편집</button>
                </section>
              </>
            ) : (
              <>
                <section className="rounded-[20px] bg-white/[0.035] p-4">
                  <p className="mb-4 text-[9px] font-black tracking-[0.14em] text-[#8f9cff]">MASTER MIX</p>
                  <VolumeMixer volumes={volumes} brainwaveEnabled={brainwaveEnabled} onChange={onMixChange} />
                </section>
                <section className="rounded-[20px] bg-white/[0.035] p-4 player-sound-picker">
                  <p className="mb-4 text-[9px] font-black tracking-[0.14em] text-emerald-300/70">SOUND LAYERS</p>
                  <SoundLayerPicker activeLayers={activeLayers} onToggle={onToggleLayer} onVolume={onLayerVolume} onBalance={onBalanceLayers} hideScene compact />
                </section>
              </>
            )}
          </div>
        </aside> : null}
      </main>
    </div>
  );
};
