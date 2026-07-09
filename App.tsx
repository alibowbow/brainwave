import React, { useState, useEffect, useRef } from 'react';
import { Settings, Brain, BarChart2, Sparkles, Home, Play, Pause, X, Moon, Sun, ArrowLeft, Sliders, Activity, Volume2, Headphones, Save, RotateCcw, Flame, CloudMoon, LucideIcon } from 'lucide-react';
import { PRESETS, AMBIENCE_PRESETS, AmbiencePreset, SessionPreset, SessionLog, AppSettings, BackgroundSoundType, BrainWaveType, WAVE_FREQS, getBrainWaveLabel } from './types';
import { BinauralEngine, SoundLayer, ToneMode } from './services/audioEngine';
import { Player } from './components/Player';
import { Toggle } from './components/Toggle';
import { SoundLayerPicker } from './components/SoundLayerPicker';
import { StatsDashboard } from './components/StatsDashboard';
import { ImmersiveMode } from './components/ImmersiveMode';
import { WAVE_ORDER, getWaveColor } from './audioOptions';

const DEFAULT_SETTINGS: AppSettings = {
  darkMode: true,
  showSoundNotice: true,
};

const DEFAULT_LAYER_VOL = 0.8;

interface UserPreset {
  id: string;
  name: string;
  brainWaveType: BrainWaveType;
  toneMode: ToneMode;
  brainwaveEnabled: boolean;
  durationMinutes: number;
  layers: SoundLayer[];
}

// Snapshot of the last-started session for one-tap resume.
interface LastSession {
  name: string;
  brainWaveType: BrainWaveType;
  toneMode: ToneMode;
  brainwaveEnabled: boolean;
  durationMinutes: number;
  layers: SoundLayer[];
  sleepMode: boolean;
}

// Per-preset icon + chip accent so the session list reads at a glance.
const PRESET_VISUALS: Record<string, { Icon: LucideIcon; chip: string }> = {
  focus: { Icon: Brain, chip: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' },
  relax: { Icon: Flame, chip: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300' },
  country_morning: { Icon: Sun, chip: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300' },
  sleep_prep: { Icon: Moon, chip: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300' },
  power_nap: { Icon: CloudMoon, chip: 'bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-300' },
  meditation: { Icon: Sparkles, chip: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300' },
};
const DEFAULT_VISUAL = { Icon: Brain, chip: 'bg-slate-100 text-primary-600 dark:bg-slate-700 dark:text-primary-400' };

export default function App() {
  const [activeTab, setActiveTab] = useState<'session' | 'history' | 'settings'>('session');
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [logs, setLogs] = useState<SessionLog[]>([]);

  const [playbackStatus, setPlaybackStatus] = useState<'idle' | 'running' | 'paused'>('idle');
  const [viewMode, setViewMode] = useState<'list' | 'config' | 'player' | 'feedback'>('list');
  const [selectedPreset, setSelectedPreset] = useState<SessionPreset | null>(null);

  const [currentBrainWave, setCurrentBrainWave] = useState<BrainWaveType>('alpha');
  const [activeLayers, setActiveLayers] = useState<SoundLayer[]>([{ type: 'rain', volume: DEFAULT_LAYER_VOL }]);
  const [toneMode, setToneMode] = useState<ToneMode>('binaural');
  const [timeLeft, setTimeLeft] = useState(0);
  const [volumes, setVolumes] = useState({ master: 0.5, binaural: 0.4, bg: 0.5 });
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [brainwaveEnabled, setBrainwaveEnabled] = useState(true);
  const [userPresets, setUserPresets] = useState<UserPreset[]>([]);
  const [sleepMode, setSleepMode] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [presetNameDraft, setPresetNameDraft] = useState('');
  const [lastSession, setLastSession] = useState<LastSession | null>(null);
  const [immersive, setImmersive] = useState(false);

  // Lazily create a single, stable audio engine (avoids re-allocating each render).
  const audioEngine = useRef<BinauralEngine | null>(null);
  if (!audioEngine.current) audioEngine.current = new BinauralEngine();
  const engine = audioEngine.current!;

  // Timestamp-based timer state: drift-free and recovers correctly after the
  // browser throttles timers in a backgrounded tab.
  const endTimeRef = useRef<number | null>(null);   // wall-clock ms when the countdown hits 0
  const runStartRef = useRef<number | null>(null);  // wall-clock ms the current run began
  const playedMsRef = useRef<number>(0);            // actually-played time accumulated across runs
  const wakeLockRef = useRef<any>(null);
  const mainRef = useRef<HTMLElement>(null);

  // Screens share one scroll container; reset it when the visible screen changes
  // so e.g. the player always opens at the timer, not mid-scroll.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [viewMode, activeTab]);

  useEffect(() => {
    const savedLogs = localStorage.getItem('mc_brain_logs');
    if (savedLogs) setLogs(JSON.parse(savedLogs));

    const savedPresets = localStorage.getItem('mc_brain_presets');
    if (savedPresets) setUserPresets(JSON.parse(savedPresets));

    const savedLast = localStorage.getItem('mc_brain_last');
    if (savedLast) setLastSession(JSON.parse(savedLast));

    const savedSettings = localStorage.getItem('mc_brain_settings');
    const merged: AppSettings = savedSettings
      ? { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) }
      : DEFAULT_SETTINGS;
    setSettings(merged);
    setNoticeOpen(merged.showSoundNotice);
  }, []);

  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('mc_brain_settings', JSON.stringify(settings));
  }, [settings]);

  // Drive the countdown from wall-clock time rather than counting interval ticks.
  useEffect(() => {
    if (playbackStatus !== 'running') return;
    const tick = () => {
      if (endTimeRef.current == null) return;
      const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0) handleSessionComplete();
    };
    tick();
    const id = window.setInterval(tick, 250);
    return () => clearInterval(id);
  }, [playbackStatus]);

  useEffect(() => {
    if (playbackStatus === 'running') {
      engine.setVolumes(volumes.master, brainwaveEnabled ? volumes.binaural : 0, volumes.bg);
    }
  }, [volumes, playbackStatus, brainwaveEnabled]);

  // Keep the screen awake during a session and resume audio when the tab
  // becomes visible again (mitigates background audio being suspended).
  useEffect(() => {
    if (playbackStatus !== 'running') return;
    let active = true;

    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
        }
      } catch { /* wake lock unsupported or denied */ }
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        engine.resume();
        if (active) requestWakeLock();
      }
    };

    requestWakeLock();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      active = false;
      document.removeEventListener('visibilitychange', onVisibility);
      try { wakeLockRef.current?.release?.(); } catch { /* ignore */ }
      wakeLockRef.current = null;
    };
  }, [playbackStatus]);

  // Release all audio resources when the app unmounts.
  useEffect(() => () => engine.dispose(), []);

  const beginRun = (seconds: number) => {
    endTimeRef.current = Date.now() + seconds * 1000;
    runStartRef.current = Date.now();
  };

  const accumulateRun = () => {
    if (runStartRef.current != null) {
      playedMsRef.current += Date.now() - runStartRef.current;
      runStartRef.current = null;
    }
  };

  const handlePresetSelect = (preset: SessionPreset) => {
    setSelectedPreset(preset);
    setCurrentBrainWave(preset.brainWaveType);
    setActiveLayers(preset.defaultBackgroundSound === 'none' ? [] : [{ type: preset.defaultBackgroundSound, volume: DEFAULT_LAYER_VOL }]);
    setTimeLeft(preset.defaultDurationMinutes * 60);

    if (playbackStatus !== 'idle') stopSession();
    setViewMode('config');
  };

  const handleCustomMode = () => {
    const customPreset: SessionPreset = {
      id: 'custom',
      name: '커스텀 모드',
      description: '원하는 뇌파와 사운드를 직접 조합해보세요.',
      defaultDurationMinutes: 30,
      brainWaveType: 'alpha',
      defaultBackgroundSound: 'rain',
    };
    handlePresetSelect(customPreset);
  };

  const startSession = () => {
    playedMsRef.current = 0;
    beginRun(timeLeft);
    setPlaybackStatus('running');
    setViewMode('player');
    const snapshot: LastSession = {
      name: selectedPreset?.name ?? '커스텀 모드',
      brainWaveType: currentBrainWave,
      toneMode,
      brainwaveEnabled,
      durationMinutes: Math.max(1, Math.round(timeLeft / 60)),
      layers: activeLayers,
      sleepMode,
    };
    setLastSession(snapshot);
    localStorage.setItem('mc_brain_last', JSON.stringify(snapshot));
    const freqs = WAVE_FREQS[currentBrainWave];
    engine.start({
      base: freqs.base,
      beat: freqs.beat,
      mode: toneMode,
      masterVol: volumes.master,
      binauralVol: brainwaveEnabled ? volumes.binaural : 0,
      bgVol: volumes.bg,
      sounds: activeLayers,
    });
  };

  const pauseSession = () => {
    accumulateRun();
    setPlaybackStatus('paused');
    engine.stop();
  };

  const resumeSession = () => {
    beginRun(timeLeft);
    setPlaybackStatus('running');
    const freqs = WAVE_FREQS[currentBrainWave];
    engine.start({
      base: freqs.base,
      beat: freqs.beat,
      mode: toneMode,
      masterVol: volumes.master,
      binauralVol: brainwaveEnabled ? volumes.binaural : 0,
      bgVol: volumes.bg,
      sounds: activeLayers,
    });
  };

  const stopSession = () => {
    accumulateRun();
    endTimeRef.current = null;
    setPlaybackStatus('idle');
    setImmersive(false);
    setViewMode('list');
    engine.stop();
    setTimeLeft(0);
  };

  const handleSessionComplete = () => {
    accumulateRun();
    endTimeRef.current = null;
    setPlaybackStatus('idle');
    setImmersive(false);
    // Sleep mode: fade out gently and end silently (no chime/haptics).
    if (sleepMode) {
      engine.fadeOutStop(12);
      setViewMode('list');
      return;
    }
    setViewMode('feedback');
    engine.stop();
    // Completion alert: a gentle chime plus haptic feedback.
    engine.playCompletionChime();
    try { navigator.vibrate?.([180, 90, 180]); } catch { /* ignore */ }
  };

  const handleLiveWaveChange = (wave: BrainWaveType) => {
    setCurrentBrainWave(wave);
    if (playbackStatus === 'running') {
      const freqs = WAVE_FREQS[wave];
      engine.setBrainwave(freqs.base, freqs.beat);
    }
  };

  const toggleLayer = (type: BackgroundSoundType) => {
    setActiveLayers((prev) => {
      if (prev.some((l) => l.type === type)) {
        if (playbackStatus === 'running') engine.removeSound(type);
        return prev.filter((l) => l.type !== type);
      }
      if (playbackStatus === 'running') engine.addSound(type, DEFAULT_LAYER_VOL);
      return [...prev, { type, volume: DEFAULT_LAYER_VOL }];
    });
  };

  const setLayerVolume = (type: BackgroundSoundType, vol: number) => {
    setActiveLayers((prev) => prev.map((l) => (l.type === type ? { ...l, volume: vol } : l)));
    if (playbackStatus === 'running') engine.setSoundVolume(type, vol);
  };

  const handleToneModeChange = (mode: ToneMode) => {
    setToneMode(mode);
    if (playbackStatus === 'running') engine.setMode(mode);
  };

  const handleTimeChange = (minutes: number) => {
    const seconds = minutes * 60;
    setTimeLeft(seconds);
    if (playbackStatus === 'running') {
      endTimeRef.current = Date.now() + seconds * 1000;
    }
  };

  const saveFeedback = (mood: number) => {
    if (!selectedPreset) return;

    const newLog: SessionLog = {
      id: Date.now().toString(),
      modeId: selectedPreset.id,
      modeName: selectedPreset.name,
      startedAt: new Date().toISOString(),
      durationMinutes: Math.max(1, Math.round(playedMsRef.current / 60000)),
      moodBefore: null,
      moodAfter: mood,
      helpfulScore: mood,
    };

    const updated = [newLog, ...logs];
    setLogs(updated);
    localStorage.setItem('mc_brain_logs', JSON.stringify(updated));
    setViewMode('list');
  };

  const persistPresets = (next: UserPreset[]) => {
    setUserPresets(next);
    localStorage.setItem('mc_brain_presets', JSON.stringify(next));
  };

  const confirmSavePreset = () => {
    const name = presetNameDraft.trim() || '내 프리셋';
    const preset: UserPreset = {
      id: Date.now().toString(),
      name,
      brainWaveType: currentBrainWave,
      toneMode,
      brainwaveEnabled,
      durationMinutes: Math.max(1, Math.round(timeLeft / 60)),
      layers: activeLayers,
    };
    persistPresets([preset, ...userPresets]);
    setSaveOpen(false);
    setPresetNameDraft('');
  };

  const deleteUserPreset = (id: string) => {
    persistPresets(userPresets.filter((p) => p.id !== id));
  };

  const loadUserPreset = (p: UserPreset) => {
    const synthetic: SessionPreset = {
      id: `user:${p.id}`,
      name: p.name,
      description: '내 프리셋',
      defaultDurationMinutes: p.durationMinutes,
      brainWaveType: p.brainWaveType,
      defaultBackgroundSound: 'none',
    };
    if (playbackStatus !== 'idle') stopSession();
    setSelectedPreset(synthetic);
    setCurrentBrainWave(p.brainWaveType);
    setToneMode(p.toneMode);
    setBrainwaveEnabled(p.brainwaveEnabled);
    setActiveLayers(p.layers);
    setTimeLeft(p.durationMinutes * 60);
    setViewMode('config');
  };

  const loadAmbience = (a: AmbiencePreset) => {
    if (playbackStatus !== 'idle') stopSession();
    setSelectedPreset({
      id: `amb:${a.id}`,
      name: a.name,
      description: a.description,
      defaultDurationMinutes: a.durationMinutes,
      brainWaveType: a.brainWaveType,
      defaultBackgroundSound: 'none',
    });
    setCurrentBrainWave(a.brainWaveType);
    setToneMode('binaural');
    setBrainwaveEnabled(true);
    setActiveLayers(a.layers.map((l) => ({ ...l })));
    setTimeLeft(a.durationMinutes * 60);
    setViewMode('config');
  };

  const resumeLastSession = () => {
    if (!lastSession) return;
    if (playbackStatus !== 'idle') stopSession();
    setSelectedPreset({
      id: 'last',
      name: lastSession.name,
      description: '최근 세션 구성 그대로',
      defaultDurationMinutes: lastSession.durationMinutes,
      brainWaveType: lastSession.brainWaveType,
      defaultBackgroundSound: 'none',
    });
    setCurrentBrainWave(lastSession.brainWaveType);
    setToneMode(lastSession.toneMode);
    setBrainwaveEnabled(lastSession.brainwaveEnabled);
    setActiveLayers(lastSession.layers);
    setSleepMode(lastSession.sleepMode);
    setTimeLeft(lastSession.durationMinutes * 60);
    setViewMode('config');
  };

  const dismissNotice = (rememberChoice: boolean) => {
    setNoticeOpen(false);
    if (rememberChoice) setSettings((s) => ({ ...s, showSoundNotice: false }));
  };

  // Lock-screen / notification media controls, where the platform supports it.
  useEffect(() => {
    if (!('mediaSession' in navigator)) return;
    const ms = navigator.mediaSession;
    try {
      ms.metadata = new MediaMetadata({
        title: selectedPreset?.name ?? 'MC Brain Care',
        artist: brainwaveEnabled ? getBrainWaveLabel(currentBrainWave).split(' ')[0] : '자연음',
        album: 'MC Brain Care',
      });
    } catch { /* MediaMetadata unsupported */ }
    ms.playbackState = playbackStatus === 'running' ? 'playing' : playbackStatus === 'paused' ? 'paused' : 'none';
    const set = (action: MediaSessionAction, handler: MediaSessionActionHandler | null) => {
      try { ms.setActionHandler(action, handler); } catch { /* action unsupported */ }
    };
    set('play', () => resumeSession());
    set('pause', () => pauseSession());
    set('stop', () => stopSession());
    return () => {
      set('play', null); set('pause', null); set('stop', null);
    };
  }, [playbackStatus, selectedPreset, currentBrainWave, brainwaveEnabled]);

  const renderSessionList = () => (
    <div className="grid grid-cols-1 gap-4 p-4 pb-24 md:grid-cols-2">
      <div className="md:col-span-2 mb-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">세션 선택</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">원하는 모드를 선택해 시작하세요.</p>
      </div>

      {lastSession && playbackStatus === 'idle' && (
        <button
          onClick={resumeLastSession}
          className="md:col-span-2 flex items-center gap-3 bg-white dark:bg-slate-800 border border-primary-500/30 rounded-2xl p-4 text-left hover:border-primary-500 transition-all active:scale-[0.99]"
        >
          <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shrink-0">
            <RotateCcw size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wide">이어하기</p>
            <p className="font-bold text-slate-900 dark:text-white truncate">{lastSession.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {lastSession.brainwaveEnabled ? getBrainWaveLabel(lastSession.brainWaveType).split(' ')[0] : '자연음 전용'} · {lastSession.durationMinutes}분 · 사운드 {lastSession.layers.length}개
            </p>
          </div>
        </button>
      )}

      <div
        onClick={handleCustomMode}
        className="bg-gradient-to-br from-indigo-500 to-purple-600 p-5 rounded-2xl shadow-lg shadow-indigo-500/20 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] group md:col-span-2 text-white"
      >
        <div className="flex justify-between items-start mb-3">
          <div className="p-3 rounded-xl bg-white/20 text-white backdrop-blur-sm">
            <Sliders size={24} />
          </div>
          <span className="text-xs font-bold px-2 py-1 rounded bg-white/20 backdrop-blur-sm text-white">
            자유 설정
          </span>
        </div>
        <h3 className="text-lg font-bold mb-1">커스텀 모드</h3>
        <p className="text-sm text-indigo-100 leading-snug">뇌파와 배경음을 직접 조합해 나만의 세션을 만들어보세요.</p>
      </div>

      {userPresets.length > 0 && (
        <div className="md:col-span-2 -mb-1">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">내 프리셋</h3>
        </div>
      )}
      {userPresets.map((p) => (
        <div
          key={p.id}
          onClick={() => loadUserPreset(p)}
          className="relative bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-primary-500 cursor-pointer transition-all active:scale-[0.98]"
        >
          <button
            onClick={(e) => { e.stopPropagation(); deleteUserPreset(p.id); }}
            aria-label="프리셋 삭제"
            className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <X size={16} />
          </button>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-primary-600 dark:text-primary-400 w-fit mb-3">
            <Sliders size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 pr-6">{p.name}</h3>
          <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold mb-1">
            {p.brainwaveEnabled ? getBrainWaveLabel(p.brainWaveType).split(' ')[0] : '자연음 전용'} · 사운드 {p.layers.length}개
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{p.durationMinutes}분</p>
        </div>
      ))}

      {PRESETS.map((preset) => {
        const { Icon, chip } = PRESET_VISUALS[preset.id] ?? DEFAULT_VISUAL;
        return (
          <div
            key={preset.id}
            onClick={() => handlePresetSelect(preset)}
            className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-primary-500 cursor-pointer transition-all active:scale-[0.98] group"
          >
            <div className="flex justify-between items-start mb-3">
              <div className={`p-3 rounded-xl transition-colors ${chip}`}>
                <Icon size={24} />
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300">
                {preset.defaultDurationMinutes}분
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">{preset.name}</h3>
            <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold mb-1">{getBrainWaveLabel(preset.brainWaveType).split(' ')[0]}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">{preset.description}</p>
          </div>
        );
      })}

      <div className="md:col-span-2 mt-2">
        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">분위기 · 사운드 조합</h3>
        <p className="text-xs text-slate-400">여러 소리와 뇌파가 한 번에 설정돼요.</p>
      </div>
      {AMBIENCE_PRESETS.map((a) => (
        <div
          key={a.id}
          onClick={() => loadAmbience(a)}
          className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-primary-500 cursor-pointer transition-all active:scale-[0.98]"
        >
          <div className="text-2xl mb-1.5 leading-none">{a.emoji}</div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-0.5">{a.name}</h3>
          <p className="text-[11px] text-primary-600 dark:text-primary-400 font-semibold mb-1">
            {getBrainWaveLabel(a.brainWaveType).split(' ')[0]} · 사운드 {a.layers.length} · {a.durationMinutes}분
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{a.description}</p>
        </div>
      ))}
    </div>
  );

  const renderConfig = () => {
    if (!selectedPreset) return null;

    return (
      <div className="p-6 h-full flex flex-col animate-fade-in pb-24">
        <button onClick={() => setViewMode('list')} aria-label="뒤로 가기" className="self-start mb-6 p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>

        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{selectedPreset.name}</h2>
          <p className="text-slate-500 dark:text-slate-400">{selectedPreset.description}</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-full py-2 px-3">
          <Headphones size={14} className="text-primary-500 shrink-0" />
          <span>좌우 뇌파 효과를 위해 헤드폰·이어폰 착용을 권장해요</span>
        </div>

        <button
          onClick={startSession}
          className="w-full mb-6 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-bold text-lg shadow-lg shadow-primary-500/30 active:scale-[0.99] transition-transform flex items-center justify-center gap-2"
        >
          <Play size={24} fill="currentColor" /> 세션 시작
        </button>

        <div className="space-y-4 mb-8">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-2"><Activity size={16} /> 재생 시간</span>
              <span className="text-xl font-bold text-primary-600">{Math.floor(timeLeft / 60)}분</span>
            </div>
            <input
              type="range"
              min="1"
              max="120"
              aria-label="재생 시간 (분)"
              value={timeLeft / 60}
              onChange={(e) => setTimeLeft(Number(e.target.value) * 60)}
              className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary-500"
            />
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-2"><Brain size={16} /> 뇌파음</span>
              <Toggle checked={brainwaveEnabled} onChange={() => setBrainwaveEnabled((v) => !v)} label="뇌파음 사용" />
            </div>
            <div className={`grid grid-cols-2 gap-2 transition-opacity ${brainwaveEnabled ? '' : 'opacity-40 pointer-events-none'}`}>
              {WAVE_ORDER.map((wave) => (
                <button
                  key={wave}
                  onClick={() => setCurrentBrainWave(wave)}
                  disabled={!brainwaveEnabled}
                  aria-pressed={currentBrainWave === wave}
                  className={`py-2 px-3 rounded-xl text-sm font-medium transition-all text-left ${
                    currentBrainWave === wave
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {getBrainWaveLabel(wave).split(' ')[0]} <span className="text-[10px] opacity-80">{getBrainWaveLabel(wave).split('(')[1].replace(')', '')}</span>
                </button>
              ))}
            </div>
            {brainwaveEnabled && (
              <div className="mt-3">
                <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                  {(['binaural', 'isochronic'] as ToneMode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => handleToneModeChange(m)}
                      aria-pressed={toneMode === m}
                      className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
                        toneMode === m
                          ? 'bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-sm'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {m === 'binaural' ? '바이노럴' : '아이소크로닉'}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5">
                  {toneMode === 'isochronic' ? '아이소크로닉: 스피커로도 효과를 느낄 수 있어요.' : '바이노럴: 헤드폰·이어폰을 착용하세요.'}
                </p>
              </div>
            )}
            {!brainwaveEnabled && (
              <p className="text-[11px] text-slate-400 mt-3">뇌파음을 끄고 자연음만 재생합니다.</p>
            )}
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-2"><Volume2 size={16} /> 배경음 (여러 개 가능)</span>
            </div>
            <SoundLayerPicker activeLayers={activeLayers} onToggle={toggleLayer} onVolume={setLayerVolume} />
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <div>
              <span className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-2"><Moon size={16} /> 수면 모드</span>
              <p className="text-[11px] text-slate-400 mt-1">종료 시 알림음 없이 서서히 페이드아웃돼요.</p>
            </div>
            <Toggle checked={sleepMode} onChange={() => setSleepMode((v) => !v)} label="수면 모드" />
          </div>
        </div>

        <button
          onClick={() => { setPresetNameDraft(selectedPreset?.name ?? ''); setSaveOpen(true); }}
          className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-semibold flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Save size={18} /> 현재 조합을 내 프리셋으로 저장
        </button>
      </div>
    );
  };

  const renderFeedback = () => (
    <div className="p-8 h-full flex flex-col items-center justify-center animate-fade-in text-center pb-24">
      <Sparkles size={48} className="text-yellow-400 mb-6" />
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">세션 종료</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8">지금 기분이 어떠신가요?</p>

      <div className="flex gap-4 mb-8">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            onClick={() => saveFeedback(score)}
            aria-label={`기분 ${score}점`}
            className="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-xl transition-all"
          >
            {score}
          </button>
        ))}
      </div>
      <button onClick={() => setViewMode('list')} className="text-slate-400 underline">건너뛰기</button>
    </div>
  );

  const renderHistory = () => (
    <div className="p-6 pb-24">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <BarChart2 /> 세션 기록
      </h2>
      <StatsDashboard logs={logs} />
    </div>
  );

  const renderSettings = () => (
    <div className="p-6 pb-24">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">설정</h2>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {settings.darkMode ? <Moon className="text-indigo-400" /> : <Sun className="text-orange-400" />}
            <span className="font-medium text-slate-700 dark:text-slate-200">다크 모드</span>
          </div>
          <button
            onClick={() => setSettings((s) => ({ ...s, darkMode: !s.darkMode }))}
            role="switch"
            aria-checked={settings.darkMode}
            aria-label="다크 모드"
            className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.darkMode ? 'bg-primary-600' : 'bg-slate-300'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings.darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Headphones className="text-primary-500" />
            <span className="font-medium text-slate-700 dark:text-slate-200">헤드폰 안내 표시</span>
          </div>
          <button
            onClick={() => setSettings((s) => ({ ...s, showSoundNotice: !s.showSoundNotice }))}
            role="switch"
            aria-checked={settings.showSoundNotice}
            aria-label="헤드폰 안내 표시"
            className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.showSoundNotice ? 'bg-primary-600' : 'bg-slate-300'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings.showSoundNotice ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-slate-400">
        <p>MC Brain Care v3.7.0</p>
        <p className="mt-2">모든 오디오는 기기에서 실시간으로 생성됩니다.</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-[430px] mx-auto h-[100dvh] bg-slate-50 dark:bg-slate-900 flex flex-col relative overflow-hidden shadow-2xl ring-1 ring-slate-900/5">
      <header className="shrink-0 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-center sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Brain className="text-primary-500" size={22} />
          <span className="font-bold text-lg text-slate-900 dark:text-white">MC Brain Care</span>
        </div>
      </header>

      <main ref={mainRef} className="flex-1 overflow-y-auto scrollbar-hide">
        {activeTab === 'session' && (
          viewMode === 'list' ? renderSessionList() :
          viewMode === 'config' ? renderConfig() :
          viewMode === 'player' ? (
            <Player
              sessionName={selectedPreset?.name || '세션'}
              timeLeft={timeLeft}
              isPlaying={playbackStatus === 'running'}
              onPlay={resumeSession}
              onPause={pauseSession}
              onStop={stopSession}
              onMinimize={() => setViewMode('list')}
              onTimeChange={handleTimeChange}
              currentBrainWave={currentBrainWave}
              onWaveChange={handleLiveWaveChange}
              activeLayers={activeLayers}
              onToggleLayer={toggleLayer}
              onLayerVolume={setLayerVolume}
              volumes={volumes}
              onVolumeChange={(k, v) => setVolumes((prev) => ({ ...prev, [k]: v }))}
              brainwaveEnabled={brainwaveEnabled}
              onToggleBrainwave={() => setBrainwaveEnabled((v) => !v)}
              toneMode={toneMode}
              onToneModeChange={handleToneModeChange}
              getAnalyser={() => engine.getAnalyser()}
              onImmersive={() => setImmersive(true)}
            />
          ) : renderFeedback()
        )}
        {activeTab === 'history' && renderHistory()}
        {activeTab === 'settings' && renderSettings()}
      </main>

      {playbackStatus !== 'idle' && viewMode !== 'player' && viewMode !== 'feedback' && (
        <div
          onClick={() => setViewMode('player')}
          className="absolute bottom-20 left-4 right-4 bg-white dark:bg-slate-800 border border-primary-500/30 p-3 rounded-xl shadow-lg shadow-black/10 flex items-center justify-between cursor-pointer animate-slide-up z-20"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-end gap-1 h-4 ml-1">
              <div className="w-1 bg-primary-500 animate-equalizer h-3"></div>
              <div className="w-1 bg-primary-500 animate-equalizer h-full animation-delay-100"></div>
              <div className="w-1 bg-primary-500 animate-equalizer h-2 animation-delay-200"></div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-none">{selectedPreset?.name}</h4>
              <span className="text-xs text-primary-600 dark:text-primary-400 font-mono">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={(e) => { e.stopPropagation(); playbackStatus === 'running' ? pauseSession() : resumeSession(); }} aria-label={playbackStatus === 'running' ? '일시정지' : '재생'} className="p-2 text-slate-700 dark:text-slate-200">
              {playbackStatus === 'running' ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={(e) => { e.stopPropagation(); stopSession(); }} aria-label="세션 종료" className="p-2 text-red-500">
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <nav className="h-16 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around items-center shrink-0 z-30">
        {([
          { tab: 'session' as const, Icon: Home, label: '세션' },
          { tab: 'history' as const, Icon: BarChart2, label: '기록' },
          { tab: 'settings' as const, Icon: Settings, label: '설정' },
        ]).map(({ tab, Icon, label }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            aria-current={activeTab === tab ? 'page' : undefined}
            className={`flex flex-col items-center gap-0.5 transition-colors ${activeTab === tab ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
          >
            <span className={`px-4 py-1 rounded-full transition-colors ${activeTab === tab ? 'bg-primary-50 dark:bg-primary-900/25' : ''}`}>
              <Icon size={20} />
            </span>
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </nav>

      {immersive && viewMode === 'player' && playbackStatus !== 'idle' && (
        <ImmersiveMode
          timeLeft={timeLeft}
          isPlaying={playbackStatus === 'running'}
          sessionName={selectedPreset?.name || '세션'}
          color={brainwaveEnabled ? getWaveColor(currentBrainWave) : '#6366f1'}
          getAnalyser={() => engine.getAnalyser()}
          onPlay={resumeSession}
          onPause={pauseSession}
          onStop={stopSession}
          onExit={() => setImmersive(false)}
        />
      )}

      {noticeOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6" role="dialog" aria-modal="true" aria-labelledby="notice-title">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-xs w-full shadow-2xl animate-fade-in">
            <div className="flex justify-center mb-4 text-primary-500"><Headphones size={40} /></div>
            <h3 id="notice-title" className="text-lg font-bold text-center text-slate-900 dark:text-white mb-2">헤드폰을 착용해 주세요</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-5 leading-relaxed">
              바이노럴 비트는 좌우 귀에 서로 다른 주파수를 들려주어 작동합니다. 스테레오 헤드폰이나 이어폰을 착용해야 제대로 된 효과를 느낄 수 있어요. 볼륨은 편안한 수준에서 시작하세요.
            </p>
            <button onClick={() => dismissNotice(false)} className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold mb-2 transition-colors">확인했어요</button>
            <button onClick={() => dismissNotice(true)} className="w-full py-2 text-xs text-slate-400 underline">다시 보지 않기</button>
          </div>
        </div>
      )}

      {saveOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6" role="dialog" aria-modal="true" aria-labelledby="save-title">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-xs w-full shadow-2xl animate-fade-in">
            <h3 id="save-title" className="text-lg font-bold text-center text-slate-900 dark:text-white mb-4">프리셋 저장</h3>
            <input
              autoFocus
              value={presetNameDraft}
              onChange={(e) => setPresetNameDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') confirmSavePreset(); }}
              placeholder="프리셋 이름"
              maxLength={20}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white mb-4 outline-none focus:border-primary-500"
            />
            <button onClick={confirmSavePreset} className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold mb-2 transition-colors">저장</button>
            <button onClick={() => setSaveOpen(false)} className="w-full py-2 text-xs text-slate-400 underline">취소</button>
          </div>
        </div>
      )}
    </div>
  );
}
