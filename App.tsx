import React, { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BrainCircuit, Headphones, Save, X } from 'lucide-react';
import { DEFAULT_MIX_VOLUMES, defaultSoundLevel, normalizeMixVolumes, type MixVolumes } from './audioLevels';
import { SOUND_ORDER, getWaveColor } from './audioOptions';
import {
  createBackupPayload,
  parseBackupPayload,
  type LastSession,
  type UserPreset,
} from './experience';
import { BinauralEngine, type SoundLayer, type ToneMode } from './services/audioEngine';
import {
  NATURE_MIXES,
  DEFAULT_VISUAL_MODE,
  WAVE_FREQS,
  getBrainWaveLabel,
  type AmbiencePreset,
  type AppSettings,
  type BackgroundSoundType,
  type BrainWaveType,
  type NatureMix,
  type SessionLog,
  type SessionPreset,
  type VisualMode,
} from './types';
import { AppShell, type AppView } from './components/app/AppShell';
import { HomeDashboard } from './components/app/HomeDashboard';
import { NowPlayingBar } from './components/app/NowPlayingBar';

const NatureMode = lazy(() => import('./components/NatureMode').then((module) => ({ default: module.NatureMode })));
const StatsDashboard = lazy(() => import('./components/StatsDashboard').then((module) => ({ default: module.StatsDashboard })));
const ImmersiveMode = lazy(() => import('./components/ImmersiveMode').then((module) => ({ default: module.ImmersiveMode })));
const Player = lazy(() => import('./components/Player').then((module) => ({ default: module.Player })));
const RoutineLibrary = lazy(() => import('./components/app/RoutineLibrary').then((module) => ({ default: module.RoutineLibrary })));
const SettingsView = lazy(() => import('./components/app/SettingsView').then((module) => ({ default: module.SettingsView })));
const SessionSetup = lazy(() => import('./components/session/SessionSetup').then((module) => ({ default: module.SessionSetup })));
const SessionReflection = lazy(() => import('./components/redesign/SessionReflection').then((module) => ({ default: module.SessionReflection })));

const DEFAULT_SETTINGS: AppSettings = {
  darkMode: true,
  showSoundNotice: true,
  dailyGoalMinutes: 30,
  reduceMotion: false,
};

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? { ...fallback as object, ...JSON.parse(value) } as T : fallback;
  } catch {
    return fallback;
  }
};

const readArray = <T,>(key: string): T[] => {
  try {
    const value = localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const LoadingPanel = () => (
  <div className="route-loading" role="status">
    <span><BrainCircuit size={22} /></span>
    <p>공간을 준비하고 있어요</p>
  </div>
);

export default function App() {
  const initialSettings = readStorage<AppSettings>('mc_brain_settings', DEFAULT_SETTINGS);
  const [activeView, setActiveView] = useState<AppView>('home');
  const [settings, setSettings] = useState<AppSettings>(initialSettings);
  const [logs, setLogs] = useState<SessionLog[]>(() => readArray<SessionLog>('mc_brain_logs'));
  const [userPresets, setUserPresets] = useState<UserPreset[]>(() => readArray<UserPreset>('mc_brain_presets'));
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => readArray<string>('mc_brain_favorites'));
  const [lastSession, setLastSession] = useState<LastSession | null>(() => {
    try { return JSON.parse(localStorage.getItem('mc_brain_last') ?? 'null'); } catch { return null; }
  });

  const [playbackStatus, setPlaybackStatus] = useState<'idle' | 'running' | 'paused'>('idle');
  const [viewMode, setViewMode] = useState<'list' | 'config' | 'player' | 'feedback'>('list');
  const [selectedPreset, setSelectedPreset] = useState<SessionPreset | null>(null);
  const [currentBrainWave, setCurrentBrainWave] = useState<BrainWaveType>('alpha');
  const [activeLayers, setActiveLayers] = useState<SoundLayer[]>([{ type: 'rain', volume: defaultSoundLevel('rain') }]);
  const [toneMode, setToneMode] = useState<ToneMode>('binaural');
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [sessionTotalSeconds, setSessionTotalSeconds] = useState(30 * 60);
  const [volumes, setVolumes] = useState<MixVolumes>(() => {
    try {
      const value = localStorage.getItem('mc_brain_volumes_v2');
      return value ? normalizeMixVolumes(JSON.parse(value)) : DEFAULT_MIX_VOLUMES;
    } catch { return DEFAULT_MIX_VOLUMES; }
  });
  const [brainwaveEnabled, setBrainwaveEnabled] = useState(true);
  const [sleepMode, setSleepMode] = useState(false);
  const [intention, setIntention] = useState('');
  const [moodBefore, setMoodBefore] = useState<number | null>(null);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [presetNameDraft, setPresetNameDraft] = useState('');
  const [immersive, setImmersive] = useState(false);
  const [visualMode, setVisualMode] = useState<VisualMode>(DEFAULT_VISUAL_MODE);
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  const [natureLayers, setNatureLayers] = useState<SoundLayer[]>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('mc_nature_state') ?? 'null');
      if (!Array.isArray(stored?.layers)) return [{ type: 'rain', volume: defaultSoundLevel('rain') }];
      const known = new Set<string>(SOUND_ORDER);
      return stored.layers.filter((layer: SoundLayer) => layer && known.has(layer.type));
    } catch { return [{ type: 'rain', volume: defaultSoundLevel('rain') }]; }
  });
  const [natureStatus, setNatureStatus] = useState<'idle' | 'running'>('idle');
  const [natureTimerMin, setNatureTimerMin] = useState<number | null>(() => {
    try {
      const value = JSON.parse(localStorage.getItem('mc_nature_state') ?? 'null')?.timerMin;
      return value == null || typeof value === 'number' ? value ?? null : null;
    } catch { return null; }
  });
  const [natureTimeLeft, setNatureTimeLeft] = useState(0);
  const [natureVol, setNatureVol] = useState(() => {
    try {
      const value = JSON.parse(localStorage.getItem('mc_nature_state') ?? 'null')?.volume;
      return typeof value === 'number' ? value : 0.78;
    } catch { return 0.78; }
  });
  const [natureMixId, setNatureMixId] = useState<string | null>(() => {
    try {
      const value = JSON.parse(localStorage.getItem('mc_nature_state') ?? 'null')?.mixId;
      return typeof value === 'string' ? value : null;
    } catch { return null; }
  });

  const audioEngine = useRef<BinauralEngine | null>(null);
  if (!audioEngine.current) audioEngine.current = new BinauralEngine();
  const engine = audioEngine.current;
  const endTimeRef = useRef<number | null>(null);
  const runStartRef = useRef<number | null>(null);
  const playedMsRef = useRef(0);
  const sessionStartedAtRef = useRef<string>(new Date().toISOString());
  const natureEndRef = useRef<number | null>(null);
  const wakeLockRef = useRef<any>(null);
  const pendingStartRef = useRef<(() => void) | null>(null);

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

  const persistLastSession = (snapshot: LastSession) => {
    setLastSession(snapshot);
    localStorage.setItem('mc_brain_last', JSON.stringify(snapshot));
  };

  const playEngineSession = (seconds: number, snapshot: LastSession) => {
    const frequencies = WAVE_FREQS[snapshot.brainWaveType];
    engine.start({
      base: frequencies.base,
      beat: frequencies.beat,
      mode: snapshot.toneMode,
      masterVol: snapshot.mix?.master ?? volumes.master,
      binauralVol: snapshot.brainwaveEnabled ? snapshot.mix?.binaural ?? volumes.binaural : 0,
      bgVol: snapshot.mix?.bg ?? volumes.bg,
      sounds: snapshot.layers,
    });
    beginRun(seconds);
    setVisualMode(DEFAULT_VISUAL_MODE);
    setPlaybackStatus('running');
    setViewMode('player');
    setActiveView('home');
    persistLastSession(snapshot);
  };

  const runAfterHeadphoneNotice = (callback: () => void, enabled = brainwaveEnabled, mode = toneMode) => {
    let acknowledged = false;
    try { acknowledged = sessionStorage.getItem('brainwave_headphone_ack') === '1'; } catch { /* storage unavailable */ }
    if (settings.showSoundNotice && enabled && mode === 'binaural' && !acknowledged) {
      pendingStartRef.current = callback;
      setNoticeOpen(true);
      return;
    }
    callback();
  };

  const confirmHeadphoneNotice = (remember = false) => {
    setNoticeOpen(false);
    try { sessionStorage.setItem('brainwave_headphone_ack', '1'); } catch { /* storage unavailable */ }
    if (remember) setSettings((current) => ({ ...current, showSoundNotice: false }));
    const pending = pendingStartRef.current;
    pendingStartRef.current = null;
    pending?.();
  };

  const startSessionNow = () => {
    if (!selectedPreset) return;
    if (natureStatus === 'running') stopNature();
    playedMsRef.current = 0;
    sessionStartedAtRef.current = new Date().toISOString();
    setSessionTotalSeconds(timeLeft);
    const snapshot: LastSession = {
      name: selectedPreset.name,
      brainWaveType: currentBrainWave,
      toneMode,
      brainwaveEnabled,
      durationMinutes: Math.max(1, Math.round(timeLeft / 60)),
      layers: activeLayers.map((layer) => ({ ...layer })),
      sleepMode,
      mix: { ...volumes },
      intention: intention.trim() || undefined,
    };
    playEngineSession(timeLeft, snapshot);
  };

  const startSession = () => runAfterHeadphoneNotice(startSessionNow);

  const quickStartPresetNow = (preset: SessionPreset) => {
    if (natureStatus === 'running') stopNature();
    if (playbackStatus !== 'idle') engine.stop();
    const layers: SoundLayer[] = preset.defaultBackgroundSound === 'none' ? [] : [{
      type: preset.defaultBackgroundSound,
      volume: defaultSoundLevel(preset.defaultBackgroundSound),
    }];
    const seconds = preset.defaultDurationMinutes * 60;
    setSelectedPreset(preset);
    setCurrentBrainWave(preset.brainWaveType);
    setToneMode('binaural');
    setBrainwaveEnabled(true);
    setActiveLayers(layers);
    setSleepMode(preset.id === 'sleep_prep');
    setIntention('');
    setMoodBefore(null);
    setTimeLeft(seconds);
    setSessionTotalSeconds(seconds);
    playedMsRef.current = 0;
    sessionStartedAtRef.current = new Date().toISOString();
    playEngineSession(seconds, {
      name: preset.name,
      brainWaveType: preset.brainWaveType,
      toneMode: 'binaural',
      brainwaveEnabled: true,
      durationMinutes: preset.defaultDurationMinutes,
      layers,
      sleepMode: preset.id === 'sleep_prep',
      mix: { ...volumes },
    });
  };

  const quickStartPreset = (preset: SessionPreset) => runAfterHeadphoneNotice(() => quickStartPresetNow(preset), true, 'binaural');

  const quickStartAmbienceNow = (preset: AmbiencePreset) => {
    if (natureStatus === 'running') stopNature();
    if (playbackStatus !== 'idle') engine.stop();
    const layers = preset.layers.map((layer) => ({ ...layer }));
    const selected: SessionPreset = {
      id: `amb:${preset.id}`,
      name: preset.name,
      description: preset.description,
      defaultDurationMinutes: preset.durationMinutes,
      brainWaveType: preset.brainWaveType,
      defaultBackgroundSound: 'none',
    };
    const seconds = preset.durationMinutes * 60;
    setSelectedPreset(selected);
    setCurrentBrainWave(preset.brainWaveType);
    setToneMode('binaural');
    setBrainwaveEnabled(true);
    setActiveLayers(layers);
    setSleepMode(false);
    setIntention('');
    setMoodBefore(null);
    setTimeLeft(seconds);
    setSessionTotalSeconds(seconds);
    playedMsRef.current = 0;
    sessionStartedAtRef.current = new Date().toISOString();
    playEngineSession(seconds, {
      name: preset.name,
      brainWaveType: preset.brainWaveType,
      toneMode: 'binaural',
      brainwaveEnabled: true,
      durationMinutes: preset.durationMinutes,
      layers,
      sleepMode: false,
      mix: { ...volumes },
    });
  };

  const quickStartAmbience = (preset: AmbiencePreset) => runAfterHeadphoneNotice(() => quickStartAmbienceNow(preset), true, 'binaural');

  const pauseSession = () => {
    accumulateRun();
    setPlaybackStatus('paused');
    engine.fadeOutStop(0.08);
  };

  const resumeSession = () => {
    if (!selectedPreset) return;
    if (natureStatus === 'running') stopNature();
    const frequencies = WAVE_FREQS[currentBrainWave];
    engine.start({
      base: frequencies.base,
      beat: frequencies.beat,
      mode: toneMode,
      masterVol: volumes.master,
      binauralVol: brainwaveEnabled ? volumes.binaural : 0,
      bgVol: volumes.bg,
      sounds: activeLayers.map((layer) => ({ ...layer, volume: layer.muted ? 0 : layer.volume })),
    });
    beginRun(timeLeft);
    setPlaybackStatus('running');
  };

  const stopSession = ({ reflect = false, goHome = false }: { reflect?: boolean; goHome?: boolean } = {}) => {
    accumulateRun();
    endTimeRef.current = null;
    setPlaybackStatus('idle');
    setImmersive(false);
    const hasMeaningfulProgress = playedMsRef.current >= 60_000;
    setViewMode(reflect && hasMeaningfulProgress && selectedPreset ? 'feedback' : 'list');
    if (goHome || (reflect && hasMeaningfulProgress)) setActiveView('home');
    setTimeLeft(0);
    engine.fadeOutStop(0.08);
  };

  const saveSessionLog = (moodAfter: number, note = '') => {
    if (!selectedPreset) return;
    const newLog: SessionLog = {
      id: `${Date.now()}`,
      modeId: selectedPreset.id,
      modeName: selectedPreset.name,
      startedAt: sessionStartedAtRef.current,
      durationMinutes: Math.max(1, Math.round(playedMsRef.current / 60000)),
      moodBefore,
      moodAfter,
      helpfulScore: moodAfter,
      intention: intention.trim() || undefined,
      note: note || undefined,
    };
    const next = [newLog, ...logs];
    setLogs(next);
    localStorage.setItem('mc_brain_logs', JSON.stringify(next));
  };

  const handleSessionComplete = () => {
    if (endTimeRef.current == null) return;
    accumulateRun();
    endTimeRef.current = null;
    setPlaybackStatus('idle');
    setImmersive(false);
    if (sleepMode) {
      engine.fadeOutStop(12);
      saveSessionLog(moodBefore ?? 3, '수면 모드 자동 완료');
      setViewMode('list');
      return;
    }
    engine.stop();
    engine.playCompletionChime();
    try { navigator.vibrate?.([160, 80, 160]); } catch { /* unsupported */ }
    setViewMode('feedback');
  };

  const configurePreset = (preset: SessionPreset) => {
    if (playbackStatus !== 'idle') stopSession();
    setSelectedPreset(preset);
    setCurrentBrainWave(preset.brainWaveType);
    setToneMode('binaural');
    setBrainwaveEnabled(true);
    setActiveLayers(preset.defaultBackgroundSound === 'none' ? [] : [{
      type: preset.defaultBackgroundSound,
      volume: defaultSoundLevel(preset.defaultBackgroundSound),
    }]);
    setSleepMode(preset.id === 'sleep_prep');
    setIntention('');
    setMoodBefore(null);
    const seconds = preset.defaultDurationMinutes * 60;
    setTimeLeft(seconds);
    setSessionTotalSeconds(seconds);
    setViewMode('config');
  };

  const loadAmbience = (preset: AmbiencePreset) => {
    if (playbackStatus !== 'idle') stopSession();
    setSelectedPreset({
      id: `amb:${preset.id}`,
      name: preset.name,
      description: preset.description,
      defaultDurationMinutes: preset.durationMinutes,
      brainWaveType: preset.brainWaveType,
      defaultBackgroundSound: 'none',
    });
    setCurrentBrainWave(preset.brainWaveType);
    setToneMode('binaural');
    setBrainwaveEnabled(true);
    setActiveLayers(preset.layers.map((layer) => ({ ...layer })));
    setSleepMode(false);
    setIntention('');
    setMoodBefore(null);
    const seconds = preset.durationMinutes * 60;
    setTimeLeft(seconds);
    setSessionTotalSeconds(seconds);
    setViewMode('config');
  };

  const loadUserPreset = (preset: UserPreset) => {
    if (playbackStatus !== 'idle') stopSession();
    setSelectedPreset({
      id: `user:${preset.id}`,
      name: preset.name,
      description: '내가 저장한 리듬과 사운드 조합',
      defaultDurationMinutes: preset.durationMinutes,
      brainWaveType: preset.brainWaveType,
      defaultBackgroundSound: 'none',
    });
    setCurrentBrainWave(preset.brainWaveType);
    setToneMode(preset.toneMode);
    setBrainwaveEnabled(preset.brainwaveEnabled);
    setActiveLayers(preset.layers.map((layer) => ({ ...layer })));
    setVolumes((current) => normalizeMixVolumes({ ...current, ...(preset.mix ?? {}) }));
    setSleepMode(false);
    setIntention('');
    setMoodBefore(null);
    const seconds = preset.durationMinutes * 60;
    setTimeLeft(seconds);
    setSessionTotalSeconds(seconds);
    setViewMode('config');
  };

  const resumeLastSession = () => {
    if (!lastSession) return;
    loadUserPreset({ id: 'last', ...lastSession });
    setSleepMode(lastSession.sleepMode);
    setIntention(lastSession.intention ?? '');
  };

  const persistPresets = (next: UserPreset[]) => {
    setUserPresets(next);
    localStorage.setItem('mc_brain_presets', JSON.stringify(next));
  };

  const saveCurrentPreset = () => {
    const preset: UserPreset = {
      id: `${Date.now()}`,
      name: presetNameDraft.trim() || selectedPreset?.name || '내 프리셋',
      brainWaveType: currentBrainWave,
      toneMode,
      brainwaveEnabled,
      durationMinutes: Math.max(1, Math.round(timeLeft / 60)),
      layers: activeLayers.map((layer) => ({ ...layer })),
      mix: { ...volumes },
    };
    persistPresets([preset, ...userPresets]);
    setPresetNameDraft('');
    setSaveOpen(false);
  };

  const handleTimeChange = (minutes: number) => {
    const seconds = minutes * 60;
    setTimeLeft(seconds);
    setSessionTotalSeconds(seconds);
    if (playbackStatus === 'running') endTimeRef.current = Date.now() + seconds * 1000;
  };

  const handleLiveWaveChange = (wave: BrainWaveType) => {
    setCurrentBrainWave(wave);
    if (playbackStatus === 'running') {
      const frequencies = WAVE_FREQS[wave];
      engine.setBrainwave(frequencies.base, frequencies.beat);
    }
  };

  const handleToneModeChange = (mode: ToneMode) => {
    setToneMode(mode);
    if (playbackStatus === 'running') engine.setMode(mode);
  };

  const toggleLayer = (type: BackgroundSoundType) => {
    setActiveLayers((current) => {
      if (current.some((layer) => layer.type === type)) {
        if (playbackStatus === 'running') engine.removeSound(type);
        return current.filter((layer) => layer.type !== type);
      }
      const volume = defaultSoundLevel(type);
      if (playbackStatus === 'running') engine.addSound(type, volume);
      return [...current, { type, volume }];
    });
  };

  const setLayerVolume = (type: BackgroundSoundType, volume: number) => {
    setActiveLayers((current) => current.map((layer) => layer.type === type ? { ...layer, volume } : layer));
    if (playbackStatus === 'running') engine.setSoundVolume(type, volume);
  };

  const balanceLayers = () => {
    const next = activeLayers.map((layer) => ({ ...layer, volume: defaultSoundLevel(layer.type) }));
    setActiveLayers(next);
    if (playbackStatus === 'running') engine.setSounds(next);
  };

  const startNature = () => {
    if (natureLayers.length === 0) return;
    if (playbackStatus !== 'idle') stopSession();
    setNatureStatus('running');
    if (natureTimerMin != null) {
      natureEndRef.current = Date.now() + natureTimerMin * 60 * 1000;
      setNatureTimeLeft(natureTimerMin * 60);
    } else natureEndRef.current = null;
    engine.start({
      base: WAVE_FREQS.alpha.base,
      beat: WAVE_FREQS.alpha.beat,
      mode: 'binaural',
      masterVol: natureVol,
      binauralVol: 0,
      bgVol: 1,
      sounds: natureLayers.map((layer) => ({ ...layer, volume: layer.muted ? 0 : layer.volume })),
    });
  };

  const stopNature = (fade = false) => {
    setNatureStatus('idle');
    natureEndRef.current = null;
    if (fade) engine.fadeOutStop(12); else engine.stop();
  };

  const handleNatureTimer = (minutes: number | null) => {
    setNatureTimerMin(minutes);
    if (natureStatus !== 'running') return;
    if (minutes == null) natureEndRef.current = null;
    else {
      natureEndRef.current = Date.now() + minutes * 60 * 1000;
      setNatureTimeLeft(minutes * 60);
    }
  };

  const toggleNatureLayer = (type: BackgroundSoundType) => {
    setNatureMixId(null);
    setNatureLayers((current) => {
      if (current.some((layer) => layer.type === type)) {
        const next = current.filter((layer) => layer.type !== type);
        if (natureStatus === 'running') {
          engine.removeSound(type);
          if (next.length === 0) stopNature();
        }
        return next;
      }
      const volume = defaultSoundLevel(type);
      if (natureStatus === 'running') engine.addSound(type, volume);
      return [...current, { type, volume }];
    });
  };

  const setNatureLayerVolume = (type: BackgroundSoundType, volume: number) => {
    setNatureLayers((current) => current.map((layer) => layer.type === type ? { ...layer, volume, muted: false } : layer));
    if (natureStatus === 'running') engine.setSoundVolume(type, volume);
  };

  const toggleNatureMute = (type: BackgroundSoundType) => {
    setNatureLayers((current) => current.map((layer) => {
      if (layer.type !== type) return layer;
      const muted = !layer.muted;
      if (natureStatus === 'running') engine.setSoundVolume(type, muted ? 0 : layer.volume);
      return { ...layer, muted };
    }));
  };

  const selectNatureMix = (mix: NatureMix) => {
    const layers = mix.layers.map((layer) => ({ ...layer }));
    setNatureLayers(layers);
    setNatureMixId(mix.id);
    if (natureStatus === 'running') engine.setSounds(layers);
  };

  const subscribeNatureEvents = useCallback((callback: (type: BackgroundSoundType) => void) => engine.onSoundEvent(callback), [engine]);

  const exportData = () => {
    const blob = new Blob([JSON.stringify(createBackupPayload(logs, userPresets, lastSession), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `brainwave-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const importData = async (file: File) => {
    try {
      if (file.size > 5_000_000) throw new Error('too-large');
      const payload = parseBackupPayload(JSON.parse(await file.text()));
      if (!payload) throw new Error('invalid');
      if (!window.confirm('현재 기록과 프리셋을 백업 파일의 내용으로 교체할까요?')) return;
      setLogs(payload.logs);
      setUserPresets(payload.presets);
      setLastSession(payload.lastSession);
      localStorage.setItem('mc_brain_logs', JSON.stringify(payload.logs));
      localStorage.setItem('mc_brain_presets', JSON.stringify(payload.presets));
      if (payload.lastSession) localStorage.setItem('mc_brain_last', JSON.stringify(payload.lastSession));
      else localStorage.removeItem('mc_brain_last');
      setImportMessage(`기록 ${payload.logs.length}개와 프리셋 ${payload.presets.length}개를 복원했습니다.`);
    } catch {
      setImportMessage(file.size > 5_000_000 ? '백업 파일은 5MB 이하여야 합니다.' : '올바른 Brainwave 백업 파일이 아닙니다.');
    }
  };

  const clearHistory = () => {
    if (!window.confirm('완료한 세션 기록만 모두 지울까요? 저장한 루틴은 유지됩니다.')) return;
    localStorage.removeItem('mc_brain_logs');
    setLogs([]);
    setImportMessage('세션 기록을 삭제했습니다.');
  };

  const resetPreferences = () => {
    if (!window.confirm('화면, 안내, 하루 목표 설정을 기본값으로 되돌릴까요?')) return;
    setSettings(DEFAULT_SETTINGS);
    setImportMessage('환경 설정을 기본값으로 되돌렸습니다.');
  };

  const installApp = async () => {
    if (!installPrompt) return;
    try {
      await installPrompt.prompt();
      await installPrompt.userChoice;
    } finally {
      setInstallPrompt(null);
    }
  };

  const handleNavigate = (view: AppView) => {
    if (viewMode === 'feedback') saveSessionLog(moodBefore ?? 3);
    setViewMode('list');
    setActiveView(view);
  };

  const dailyMinutes = useMemo(() => {
    const today = new Date().toDateString();
    return logs.reduce((total, log) => new Date(log.startedAt).toDateString() === today ? total + log.durationMinutes : total, 0);
  }, [logs]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.darkMode);
    document.documentElement.classList.toggle('reduce-motion', settings.reduceMotion);
    document.documentElement.style.colorScheme = settings.darkMode ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', settings.darkMode ? '#0f172a' : '#f8fafc');
    localStorage.setItem('mc_brain_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => { localStorage.setItem('mc_brain_volumes_v2', JSON.stringify(volumes)); }, [volumes]);
  useEffect(() => { localStorage.setItem('mc_brain_favorites', JSON.stringify(favoriteIds)); }, [favoriteIds]);
  useEffect(() => {
    localStorage.setItem('mc_nature_state', JSON.stringify({ layers: natureLayers, timerMin: natureTimerMin, volume: natureVol, mixId: natureMixId }));
  }, [natureLayers, natureTimerMin, natureVol, natureMixId]);

  useEffect(() => {
    document.querySelector<HTMLElement>('[data-app-scroll]')?.scrollTo({ top: 0, behavior: 'auto' });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activeView, viewMode]);

  useEffect(() => {
    if (!noticeOpen && !saveOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      pendingStartRef.current = null;
      setNoticeOpen(false);
      setSaveOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [noticeOpen, saveOpen]);

  useEffect(() => {
    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const onInstalled = () => setInstallPrompt(null);
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

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
    return () => window.clearInterval(id);
  }, [playbackStatus, sleepMode, selectedPreset, logs, moodBefore, intention]);

  useEffect(() => {
    if (natureStatus !== 'running' || natureTimerMin == null) return;
    const tick = () => {
      if (natureEndRef.current == null) return;
      const remaining = Math.max(0, Math.round((natureEndRef.current - Date.now()) / 1000));
      setNatureTimeLeft(remaining);
      if (remaining <= 0) stopNature(true);
    };
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [natureStatus, natureTimerMin]);

  useEffect(() => {
    if (playbackStatus === 'running') engine.setVolumes(volumes.master, brainwaveEnabled ? volumes.binaural : 0, volumes.bg);
  }, [engine, volumes, playbackStatus, brainwaveEnabled]);

  useEffect(() => {
    if (natureStatus === 'running') engine.setVolumes(natureVol, 0, 1);
  }, [engine, natureVol, natureStatus]);

  useEffect(() => {
    if (playbackStatus !== 'running' && natureStatus !== 'running') return;
    let active = true;
    const requestWakeLock = async () => {
      try { if ('wakeLock' in navigator) wakeLockRef.current = await (navigator as any).wakeLock.request('screen'); } catch { /* unsupported */ }
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
      try { wakeLockRef.current?.release?.(); } catch { /* unsupported */ }
      wakeLockRef.current = null;
    };
  }, [engine, playbackStatus, natureStatus]);

  useEffect(() => {
    if (!('mediaSession' in navigator)) return;
    const media = navigator.mediaSession;
    const natureActive = natureStatus === 'running';
    try {
      media.metadata = new MediaMetadata({
        title: natureActive ? NATURE_MIXES.find((mix) => mix.id === natureMixId)?.name ?? '자연의 소리' : selectedPreset?.name ?? 'Brainwave',
        artist: natureActive ? 'Living soundscape' : brainwaveEnabled ? getBrainWaveLabel(currentBrainWave) : '자연음 전용',
        album: 'Brainwave Ritual Studio',
      });
    } catch { /* unsupported */ }
    media.playbackState = natureActive || playbackStatus === 'running' ? 'playing' : playbackStatus === 'paused' ? 'paused' : 'none';
    const setHandler = (action: MediaSessionAction, handler: MediaSessionActionHandler | null) => {
      try { media.setActionHandler(action, handler); } catch { /* unsupported */ }
    };
    if (natureActive) {
      setHandler('pause', () => stopNature());
      setHandler('stop', () => stopNature());
    } else {
      setHandler('play', resumeSession);
      setHandler('pause', pauseSession);
      setHandler('stop', () => stopSession({ reflect: true, goHome: true }));
    }
    return () => { setHandler('play', null); setHandler('pause', null); setHandler('stop', null); };
  }, [natureStatus, natureMixId, playbackStatus, selectedPreset, brainwaveEnabled, currentBrainWave]);

  useEffect(() => () => engine.dispose(), [engine]);

  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);
  const lastSessionSummary = lastSession ? {
    name: lastSession.name,
    durationMinutes: lastSession.durationMinutes,
    brainwaveEnabled: lastSession.brainwaveEnabled,
    layerCount: lastSession.layers.length,
    waveLabel: lastSession.brainwaveEnabled ? getBrainWaveLabel(lastSession.brainWaveType).split(' ')[0] : '자연음 전용',
  } : null;

  const floating = playbackStatus !== 'idle' && viewMode !== 'player'
    ? (
      <NowPlayingBar
        tone="session"
        title={selectedPreset?.name ?? '세션'}
        subtitle={`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')} · ${playbackStatus === 'running' ? '재생 중' : '일시정지'}`}
        isPlaying={playbackStatus === 'running'}
        onOpen={() => { setActiveView('home'); setViewMode('player'); }}
        onToggle={playbackStatus === 'running' ? pauseSession : resumeSession}
        onStop={() => stopSession({ reflect: true, goHome: true })}
      />
    )
    : natureStatus === 'running' && activeView !== 'nature'
      ? (
        <NowPlayingBar
          tone="nature"
          title={NATURE_MIXES.find((mix) => mix.id === natureMixId)?.name ?? '자연의 소리'}
          subtitle={natureTimerMin == null ? '∞ 계속 재생' : `${Math.floor(natureTimeLeft / 60)}:${String(natureTimeLeft % 60).padStart(2, '0')}`}
          isPlaying
          onOpen={() => { setViewMode('list'); setActiveView('nature'); }}
          onToggle={() => stopNature()}
          onStop={() => stopNature()}
        />
      )
      : null;

  return (
    <>
      <AppShell
        activeView={activeView}
        dailyMinutes={dailyMinutes}
        dailyGoalMinutes={settings.dailyGoalMinutes}
        darkMode={settings.darkMode}
        focusMode={viewMode === 'player'}
        pageMeta={viewMode === 'config'
          ? { eyebrow: 'SESSION STUDIO', title: selectedPreset?.name.replace(/\s*\([^)]*\)/, '') ?? '세션 설정' }
          : viewMode === 'feedback'
            ? { eyebrow: 'SESSION COMPLETE', title: '세션 회고' }
            : undefined}
        onNavigate={handleNavigate}
        onToggleTheme={() => setSettings((current) => ({ ...current, darkMode: !current.darkMode }))}
      >
        {viewMode === 'list' && activeView === 'home' && (
          <HomeDashboard
            logs={logs}
            dailyGoalMinutes={settings.dailyGoalMinutes}
            lastSession={lastSessionSummary}
            onResumeLast={resumeLastSession}
            onQuickStartPreset={quickStartPreset}
            onConfigurePreset={configurePreset}
            onQuickStartAmbience={quickStartAmbience}
            onOpenLibrary={() => setActiveView('library')}
            onOpenNature={() => setActiveView('nature')}
          />
        )}

        {viewMode === 'list' && activeView === 'library' && (
          <Suspense fallback={<LoadingPanel />}>
            <RoutineLibrary
              savedRoutines={userPresets.map((preset) => ({
                id: preset.id,
                name: preset.name,
                durationMinutes: preset.durationMinutes,
                layerCount: preset.layers.length,
                waveLabel: preset.brainwaveEnabled ? getBrainWaveLabel(preset.brainWaveType).split(' ')[0] : '자연음',
              }))}
              favoriteIds={favoriteSet}
              onCreateCustom={() => configurePreset({
                id: 'custom', name: '나만의 세션', description: '시간·뇌파·사운드를 직접 조합합니다.',
                defaultDurationMinutes: 30, brainWaveType: 'alpha', defaultBackgroundSound: 'rain',
              })}
              onOpenPreset={configurePreset}
              onQuickStartPreset={quickStartPreset}
              onOpenAmbience={loadAmbience}
              onQuickStartAmbience={quickStartAmbience}
              onOpenSaved={(id) => { const preset = userPresets.find((item) => item.id === id); if (preset) loadUserPreset(preset); }}
            onDeleteSaved={(id) => {
              const preset = userPresets.find((item) => item.id === id);
              if (!preset || !window.confirm(`“${preset.name}” 루틴을 삭제할까요?`)) return;
              persistPresets(userPresets.filter((item) => item.id !== id));
            }}
              onToggleFavorite={(id) => setFavoriteIds((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id])}
            />
          </Suspense>
        )}

        {viewMode === 'config' && selectedPreset && (
          <Suspense fallback={<LoadingPanel />}>
            <SessionSetup
              preset={selectedPreset}
              durationMinutes={Math.max(1, Math.round(timeLeft / 60))}
              brainWave={currentBrainWave}
              brainwaveEnabled={brainwaveEnabled}
              toneMode={toneMode}
              layers={activeLayers}
              volumes={volumes}
              sleepMode={sleepMode}
              moodBefore={moodBefore}
              intention={intention}
              onBack={() => setViewMode('list')}
              onStart={startSession}
              onDurationChange={handleTimeChange}
              onWaveChange={setCurrentBrainWave}
              onToggleBrainwave={() => setBrainwaveEnabled((value) => !value)}
              onToneModeChange={handleToneModeChange}
              onToggleLayer={toggleLayer}
              onLayerVolume={setLayerVolume}
              onBalanceLayers={balanceLayers}
              onMixChange={setVolumes}
              onToggleSleepMode={() => setSleepMode((value) => !value)}
              onMoodBeforeChange={setMoodBefore}
              onIntentionChange={setIntention}
              onSave={() => { setPresetNameDraft(selectedPreset.name.replace(/\s*\([^)]*\)/, '')); setSaveOpen(true); }}
            />
          </Suspense>
        )}

        {viewMode === 'player' && selectedPreset && (
          <Suspense fallback={<LoadingPanel />}>
            <Player
              sessionName={selectedPreset.name.replace(/\s*\([^)]*\)/, '')}
              intention={intention}
              timeLeft={timeLeft}
              totalSeconds={sessionTotalSeconds}
              isPlaying={playbackStatus === 'running'}
              onPlay={resumeSession}
              onPause={pauseSession}
              onStop={() => stopSession({ reflect: true, goHome: true })}
              onMinimize={() => { setViewMode('list'); setActiveView('home'); }}
              onTimeChange={handleTimeChange}
              currentBrainWave={currentBrainWave}
              onWaveChange={handleLiveWaveChange}
              activeLayers={activeLayers}
              onToggleLayer={toggleLayer}
              onLayerVolume={setLayerVolume}
              onBalanceLayers={balanceLayers}
              volumes={volumes}
              onMixChange={(next) => setVolumes(normalizeMixVolumes(next))}
              brainwaveEnabled={brainwaveEnabled}
              onToggleBrainwave={() => setBrainwaveEnabled((value) => !value)}
              toneMode={toneMode}
              onToneModeChange={handleToneModeChange}
              visualMode={visualMode}
              onVisualModeChange={setVisualMode}
              getAnalyser={() => engine.getAnalyser()}
              onImmersive={() => setImmersive(true)}
            />
          </Suspense>
        )}

        {viewMode === 'feedback' && (
          <Suspense fallback={<LoadingPanel />}>
            <SessionReflection
              moodBefore={moodBefore}
              durationMinutes={Math.max(1, Math.round(playedMsRef.current / 60000))}
              onSave={(mood, note) => { saveSessionLog(mood, note); setViewMode('list'); setActiveView('insights'); }}
              onSkip={() => { saveSessionLog(moodBefore ?? 3); setViewMode('list'); setActiveView('home'); }}
            />
          </Suspense>
        )}

        {viewMode === 'list' && activeView === 'nature' && (
          <div className="nature-route">
            <Suspense fallback={<LoadingPanel />}>
              <NatureMode
                layers={natureLayers}
                isPlaying={natureStatus === 'running'}
                timerMin={natureTimerMin}
                timeLeft={natureTimeLeft}
                volume={natureVol}
                activeMixId={natureMixId}
                onPlay={startNature}
                onStop={() => stopNature()}
                onToggleLayer={toggleNatureLayer}
                onLayerVolume={setNatureLayerVolume}
                onToggleMute={toggleNatureMute}
                onSelectMix={selectNatureMix}
                onTimerChange={handleNatureTimer}
                onVolumeChange={setNatureVol}
                subscribeEvents={subscribeNatureEvents}
              />
            </Suspense>
          </div>
        )}

        {viewMode === 'list' && activeView === 'insights' && (
          <Suspense fallback={<LoadingPanel />}><StatsDashboard logs={logs} dailyGoalMinutes={settings.dailyGoalMinutes} onStartSession={() => setActiveView('library')} /></Suspense>
        )}

        {viewMode === 'list' && activeView === 'settings' && (
          <Suspense fallback={<LoadingPanel />}>
            <SettingsView
              darkMode={settings.darkMode}
              showSoundNotice={settings.showSoundNotice}
              reduceMotion={settings.reduceMotion}
              dailyGoalMinutes={settings.dailyGoalMinutes}
              logCount={logs.length}
              presetCount={userPresets.length}
              canInstall={!!installPrompt}
              importMessage={importMessage}
              onToggleDarkMode={() => setSettings((current) => ({ ...current, darkMode: !current.darkMode }))}
              onToggleSoundNotice={() => setSettings((current) => ({ ...current, showSoundNotice: !current.showSoundNotice }))}
              onToggleReduceMotion={() => setSettings((current) => ({ ...current, reduceMotion: !current.reduceMotion }))}
              onDailyGoalChange={(minutes) => setSettings((current) => ({ ...current, dailyGoalMinutes: minutes }))}
              onInstall={installApp}
              onExport={exportData}
              onImport={importData}
              onClearHistory={clearHistory}
              onResetPreferences={resetPreferences}
            />
          </Suspense>
        )}
      </AppShell>
      {floating}

      {immersive && viewMode === 'player' && playbackStatus !== 'idle' && (
        <Suspense fallback={null}>
          <ImmersiveMode
            timeLeft={timeLeft}
            isPlaying={playbackStatus === 'running'}
            sessionName={selectedPreset?.name ?? '세션'}
            color={brainwaveEnabled ? getWaveColor(currentBrainWave) : '#34d399'}
            visualMode={visualMode}
            activeLayers={activeLayers}
            getAnalyser={() => engine.getAnalyser()}
            onVisualModeChange={setVisualMode}
            onPlay={resumeSession}
            onPause={pauseSession}
            onStop={() => stopSession({ reflect: true, goHome: true })}
            onExit={() => setImmersive(false)}
          />
        </Suspense>
      )}

      {noticeOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="notice-title" onMouseDown={(event) => { if (event.target === event.currentTarget) { pendingStartRef.current = null; setNoticeOpen(false); } }}>
          <div className="bw-modal">
            <button type="button" className="modal-close" onClick={() => { pendingStartRef.current = null; setNoticeOpen(false); }} aria-label="닫기"><X size={18} /></button>
            <span className="modal-icon"><Headphones size={25} /></span>
            <p className="eyebrow">Before you begin</p>
            <h2 id="notice-title">편안한 볼륨에서<br />헤드폰으로 시작하세요.</h2>
            <p>바이노럴 리듬은 좌우 귀에 서로 다른 주파수를 전달합니다. 주변 소리가 희미하게 들릴 정도의 볼륨으로 시작하세요.</p>
            <button type="button" className="primary-button" autoFocus onClick={() => confirmHeadphoneNotice(false)}>확인하고 시작</button>
            <button type="button" className="text-button" onClick={() => confirmHeadphoneNotice(true)}>다시 보지 않고 시작</button>
          </div>
        </div>
      )}

      {saveOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="save-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setSaveOpen(false); }}>
          <div className="bw-modal compact-modal">
            <button type="button" className="modal-close" onClick={() => setSaveOpen(false)} aria-label="닫기"><X size={18} /></button>
            <span className="modal-icon"><Save size={23} /></span>
            <h2 id="save-title">이 리듬을 저장할까요?</h2>
            <p>다음에는 홈에서 바로 불러올 수 있습니다.</p>
            <label className="modal-input"><span>프리셋 이름</span><input autoFocus value={presetNameDraft} maxLength={24} onChange={(event) => setPresetNameDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') saveCurrentPreset(); }} /></label>
            <button type="button" className="primary-button" onClick={saveCurrentPreset}>프리셋 저장</button>
          </div>
        </div>
      )}
    </>
  );
}
