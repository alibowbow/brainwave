import React, { useState, useEffect, useRef } from 'react';
import { Settings, Brain, BarChart2, Sparkles, Home, Play, Pause, Maximize2, X, Moon, Sun, ArrowLeft, Sliders, Activity, Volume2, CloudRain, Wind, CloudMoon, Flame, Bird, Volume1 } from 'lucide-react';
import { PRESETS, SessionPreset, SessionLog, AppSettings, BackgroundSoundType, BrainWaveType, WAVE_FREQS, AiSessionSuggestion, getBrainWaveLabel } from './types';
import { BinauralEngine } from './services/audioEngine';
import { Player } from './components/Player';

export default function App() {
  // --- Global State ---
  const [activeTab, setActiveTab] = useState<'session' | 'ai' | 'history' | 'settings'>('session');
  const [settings, setSettings] = useState<AppSettings>({
    darkMode: true,
    defaultSessionDuration: 25,
    showSoundNotice: true
  });
  const [logs, setLogs] = useState<SessionLog[]>([]);

  // --- Session State ---
  const [playbackStatus, setPlaybackStatus] = useState<'idle' | 'running' | 'paused'>('idle');
  const [viewMode, setViewMode] = useState<'list' | 'config' | 'player' | 'feedback'>('list');
  const [selectedPreset, setSelectedPreset] = useState<SessionPreset | null>(null);
  
  // --- Audio Config State ---
  const [currentBrainWave, setCurrentBrainWave] = useState<BrainWaveType>('alpha');
  const [currentSound, setCurrentSound] = useState<BackgroundSoundType>('rain');
  const [timeLeft, setTimeLeft] = useState(0);
  const [volumes, setVolumes] = useState({ master: 0.5, binaural: 0.4, bg: 0.5 });

  // --- AI State ---
  const [aiInput, setAiInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<AiSessionSuggestion | null>(null);

  // --- Refs ---
  const audioEngine = useRef(new BinauralEngine());
  const timerRef = useRef<number | null>(null);

  // --- Effects ---
  useEffect(() => {
    // Load persisted data
    const savedLogs = localStorage.getItem('mc_brain_logs');
    if (savedLogs) setLogs(JSON.parse(savedLogs));
    
    const savedSettings = localStorage.getItem('mc_brain_settings');
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  }, []);

  useEffect(() => {
    // Apply Dark Mode
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('mc_brain_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    // Timer Logic
    if (playbackStatus === 'running' && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playbackStatus, timeLeft]);

  useEffect(() => {
    // Live Volume Updates
    if (playbackStatus === 'running') {
      audioEngine.current.setVolumes(volumes.master, volumes.binaural, volumes.bg);
    }
  }, [volumes, playbackStatus]);

  // --- Handlers ---

  const handlePresetSelect = (preset: SessionPreset) => {
    setSelectedPreset(preset);
    setCurrentBrainWave(preset.brainWaveType);
    setCurrentSound(preset.defaultBackgroundSound);
    setTimeLeft(preset.defaultDurationMinutes * 60);
    
    if (playbackStatus !== 'idle') stopSession();
    setViewMode('config');
  };

  const handleCustomMode = () => {
    const customPreset: SessionPreset = {
      id: 'custom',
      name: '커스텀 모드',
      description: '나만의 뇌파와 사운드를 직접 조합해보세요.',
      defaultDurationMinutes: 30,
      brainWaveType: 'alpha',
      defaultBackgroundSound: 'rain',
      baseFreq: 200, beatFreq: 10
    };
    handlePresetSelect(customPreset);
  };

  const startSession = () => {
    setPlaybackStatus('running');
    setViewMode('player');
    const freqs = WAVE_FREQS[currentBrainWave];
    audioEngine.current.start(freqs.base, freqs.beat, volumes.master, currentSound, volumes.bg, volumes.binaural);
  };

  const pauseSession = () => {
    setPlaybackStatus('paused');
    audioEngine.current.stop();
  };

  const resumeSession = () => {
    setPlaybackStatus('running');
    const freqs = WAVE_FREQS[currentBrainWave];
    audioEngine.current.start(freqs.base, freqs.beat, volumes.master, currentSound, volumes.bg, volumes.binaural);
  };

  const stopSession = () => {
    setPlaybackStatus('idle');
    setViewMode('list');
    audioEngine.current.stop();
    setTimeLeft(0);
  };

  const handleSessionComplete = () => {
    setPlaybackStatus('idle');
    setViewMode('feedback');
    audioEngine.current.stop();
  };

  const handleLiveWaveChange = (wave: BrainWaveType) => {
    setCurrentBrainWave(wave);
    if (playbackStatus === 'running') {
      const freqs = WAVE_FREQS[wave];
      audioEngine.current.updateBinauralParams(freqs.base, freqs.beat);
    }
  };

  const handleLiveSoundChange = (sound: BackgroundSoundType) => {
    setCurrentSound(sound);
    if (playbackStatus === 'running') {
      audioEngine.current.changeBackgroundSound(sound);
    }
  };

  // Mock AI Generator
  const generateAiSession = async () => {
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    
    // Simulating API latency
    setTimeout(() => {
      let type: BrainWaveType = 'alpha';
      let bg: BackgroundSoundType = 'rain';
      let name = "AI 맞춤 세션";
      
      const lower = aiInput.toLowerCase();
      if (lower.includes('잠') || lower.includes('수면') || lower.includes('밤') || lower.includes('sleep')) {
        type = 'delta'; bg = 'night'; name = "굿나잇 슬립";
      } else if (lower.includes('집중') || lower.includes('공부') || lower.includes('시험') || lower.includes('focus')) {
        type = 'alpha'; bg = 'none'; name = "초집중 모드";
      } else if (lower.includes('화') || lower.includes('스트레스') || lower.includes('휴식') || lower.includes('relax')) {
        type = 'theta'; bg = 'wave'; name = "마음 진정";
      }

      setAiSuggestion({
        name,
        description: `입력하신 내용 "${aiInput}"에 최적화된 세션입니다.`,
        durationMinutes: 30,
        brainWaveType: type,
        backgroundSound: bg,
        guidance: "편안한 자세를 취하고 호흡에 집중하며 시작해보세요."
      });
      setIsAiLoading(false);
    }, 1500);
  };

  const applyAiSession = () => {
    if(!aiSuggestion) return;
    const tempPreset: SessionPreset = {
      id: 'ai-gen',
      name: aiSuggestion.name,
      description: aiSuggestion.description,
      defaultDurationMinutes: aiSuggestion.durationMinutes,
      brainWaveType: aiSuggestion.brainWaveType,
      defaultBackgroundSound: aiSuggestion.backgroundSound,
      baseFreq: 200, beatFreq: 10 // defaults, handled by type
    };
    handlePresetSelect(tempPreset);
    setActiveTab('session');
    setAiInput('');
    setAiSuggestion(null);
  };

  const saveFeedback = (mood: number) => {
    if (!selectedPreset) return;
    const newLog: SessionLog = {
      id: Date.now().toString(),
      modeId: selectedPreset.id,
      modeName: selectedPreset.name,
      startedAt: new Date().toISOString(),
      durationMinutes: Math.floor((selectedPreset.defaultDurationMinutes * 60 - timeLeft) / 60), // approx
      moodBefore: 3, // simplified
      moodAfter: mood,
      helpfulScore: mood
    };
    const updated = [newLog, ...logs];
    setLogs(updated);
    localStorage.setItem('mc_brain_logs', JSON.stringify(updated));
    setViewMode('list');
  };

  const getSoundIcon = (type: BackgroundSoundType) => {
    switch(type) {
        case 'rain': return <CloudRain size={20}/>;
        case 'wave': return <Wind size={20}/>;
        case 'forest': return <Sun size={20}/>;
        case 'white': return <Activity size={20}/>;
        case 'birds': return <Bird size={20}/>;
        case 'night': return <CloudMoon size={20}/>;
        case 'fire': return <Flame size={20}/>;
        case 'none': return <Volume1 size={20}/>;
    }
  };

  const getSoundLabel = (type: BackgroundSoundType) => {
    switch(type) {
        case 'none': return '없음';
        case 'white': return '백색소음';
        case 'rain': return '빗소리';
        case 'wave': return '파도';
        case 'forest': return '바람(숲)';
        case 'birds': return '새소리';
        case 'night': return '밤벌레';
        case 'fire': return '모닥불';
        default: return type;
    }
  };

  // --- Render Helpers ---

  const renderSessionList = () => (
    <div className="grid grid-cols-1 gap-4 p-4 pb-24 md:grid-cols-2">
      <div className="md:col-span-2 mb-2">
         <h2 className="text-xl font-bold text-slate-900 dark:text-white">세션 선택</h2>
         <p className="text-slate-500 dark:text-slate-400 text-sm">원하는 모드를 선택하여 시작하세요.</p>
      </div>
      
      {/* Custom Mode Card */}
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
        <p className="text-sm text-indigo-100 leading-snug">뇌파와 배경음을 직접 선택하여 나만의 세션을 만드세요.</p>
      </div>

      {/* Preset Cards */}
      {PRESETS.map(preset => (
        <div 
          key={preset.id} 
          onClick={() => handlePresetSelect(preset)}
          className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-primary-500 cursor-pointer transition-all active:scale-[0.98] group"
        >
          <div className="flex justify-between items-start mb-3">
             <div className={`p-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-primary-600 dark:text-primary-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors`}>
               <Brain size={24} />
             </div>
             <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300">
               {preset.defaultDurationMinutes}분
             </span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">{preset.name}</h3>
          <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold mb-1">{getBrainWaveLabel(preset.brainWaveType).split(' ')[0]}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">{preset.description}</p>
        </div>
      ))}
    </div>
  );

  const renderConfig = () => {
    if (!selectedPreset) return null;
    return (
      <div className="p-6 h-full flex flex-col animate-fade-in pb-24">
        <button onClick={() => setViewMode('list')} className="self-start mb-6 p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{selectedPreset.name}</h2>
          <p className="text-slate-500 dark:text-slate-400">{selectedPreset.description}</p>
        </div>

        {/* Configuration Controls */}
        <div className="space-y-4 mb-8">
            {/* Time */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-2"><Activity size={16}/> 재생 시간</span>
                    <span className="text-xl font-bold text-primary-600">{Math.floor(timeLeft / 60)}분</span>
                </div>
                <input 
                    type="range" min="1" max="120" 
                    value={timeLeft / 60} 
                    onChange={(e) => setTimeLeft(Number(e.target.value) * 60)} 
                    className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary-500"
                />
            </div>

            {/* Brainwave Selection (Always visible for Custom, or just helpful info for others) */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-2"><Brain size={16}/> 뇌파 선택</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {(['alpha', 'beta', 'theta', 'delta'] as BrainWaveType[]).map(wave => (
                    <button
                        key={wave}
                        onClick={() => setCurrentBrainWave(wave)}
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
            </div>

            {/* Sound Selection */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-2"><Volume2 size={16}/> 배경음 선택</span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {(['none', 'rain', 'fire', 'birds', 'night', 'wave', 'forest', 'white'] as BackgroundSoundType[]).map(sound => (
                    <button
                        key={sound}
                        onClick={() => setCurrentSound(sound)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl min-w-[70px] border transition-all ${
                            currentSound === sound
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                            : 'border-transparent bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                    >
                        {getSoundIcon(sound)}
                        <span className="text-[10px] font-bold whitespace-nowrap">{getSoundLabel(sound)}</span>
                    </button>
                    ))}
                </div>
            </div>
        </div>

        <button 
          onClick={startSession}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-bold text-lg shadow-lg shadow-primary-500/30 active:scale-[0.99] transition-transform flex items-center justify-center gap-2"
        >
          <Play size={24} fill="currentColor" /> 세션 시작
        </button>
      </div>
    );
  };

  const renderFeedback = () => (
    <div className="p-8 h-full flex flex-col items-center justify-center animate-fade-in text-center pb-24">
       <Sparkles size={48} className="text-yellow-400 mb-6" />
       <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">세션 종료</h2>
       <p className="text-slate-500 dark:text-slate-400 mb-8">기분이 어떠신가요?</p>
       
       <div className="flex gap-4 mb-8">
         {[1, 2, 3, 4, 5].map(score => (
           <button 
             key={score}
             onClick={() => saveFeedback(score)}
             className="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-xl transition-all"
           >
             {score === 1 ? '😫' : score === 2 ? '😕' : score === 3 ? '😐' : score === 4 ? '🙂' : '🤩'}
           </button>
         ))}
       </div>
       <button onClick={() => setViewMode('list')} className="text-slate-400 underline">건너뛰기</button>
    </div>
  );

  const renderAiTab = () => (
    <div className="p-6 pb-24 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Sparkles className="text-primary-500"/> AI 코디네이터
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">현재 상태나 목표를 알려주세요. (예: "잠이 안 와요", "집중이 필요해요")</p>
      </div>

      <div className="flex-1">
        <textarea 
          className="w-full h-32 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none resize-none shadow-sm mb-4"
          placeholder="여기에 입력하세요..."
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          disabled={isAiLoading}
        />
        <button 
          onClick={generateAiSession}
          disabled={!aiInput.trim() || isAiLoading}
          className="w-full py-3 rounded-xl bg-primary-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold transition-all"
        >
          {isAiLoading ? '분석 중...' : 'AI 추천 받기'}
        </button>

        {aiSuggestion && (
          <div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-primary-200 dark:border-primary-900 shadow-md animate-slide-up">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{aiSuggestion.name}</h3>
              <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded font-bold uppercase">AI 추천</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-4 italic">"{aiSuggestion.guidance}"</p>
            <div className="flex gap-4 mb-6 text-sm text-slate-500 dark:text-slate-400">
               <span className="flex items-center gap-1"><Brain size={14}/> {getBrainWaveLabel(aiSuggestion.brainWaveType).split(' ')[0]}</span>
               <span className="flex items-center gap-1"><Settings size={14}/> {aiSuggestion.backgroundSound}</span>
            </div>
            <button onClick={applyAiSession} className="w-full py-2 rounded-lg border border-primary-500 text-primary-600 dark:text-primary-400 font-bold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
              이 세션으로 시작하기
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="p-6 pb-24">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <BarChart2 /> 나의 기록
      </h2>
      
      {logs.length === 0 ? (
        <div className="text-center text-slate-400 mt-20">
          <p>아직 기록된 세션이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200">{log.modeName}</h4>
                <span className="text-xs text-slate-500">{new Date(log.startedAt).toLocaleDateString()}</span>
              </div>
              <div className="text-right">
                <div className="font-mono text-primary-600 dark:text-primary-400 font-bold">{log.durationMinutes}분</div>
                <div className="text-xs text-slate-400">기분: {log.moodAfter}/5</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="p-6 pb-24">
       <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">설정</h2>
       
       <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
         <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {settings.darkMode ? <Moon className="text-indigo-400"/> : <Sun className="text-orange-400"/>}
              <span className="font-medium text-slate-700 dark:text-slate-200">다크 모드</span>
            </div>
            <button 
              onClick={() => setSettings(s => ({...s, darkMode: !s.darkMode}))}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.darkMode ? 'bg-primary-600' : 'bg-slate-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings.darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
         </div>
       </div>

       <div className="mt-8 text-center text-xs text-slate-400">
         <p>MC Brain Care v1.2.0</p>
         <p className="mt-2">모든 오디오는 기기에서 실시간으로 생성됩니다.</p>
       </div>
    </div>
  );

  // --- Main Layout ---
  return (
    <div className="max-w-[430px] mx-auto h-[100dvh] bg-slate-50 dark:bg-slate-900 flex flex-col relative overflow-hidden shadow-2xl ring-1 ring-slate-900/5">
      
      {/* Header */}
      <header className="shrink-0 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-center sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Brain className="text-primary-500" size={22} />
          <span className="font-bold text-lg text-slate-900 dark:text-white">MC Brain Care</span>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        {activeTab === 'session' && (
          viewMode === 'list' ? renderSessionList() :
          viewMode === 'config' ? renderConfig() :
          viewMode === 'player' ? (
            <Player 
              sessionName={selectedPreset?.name || 'Session'}
              timeLeft={timeLeft}
              isPlaying={playbackStatus === 'running'}
              onPlay={resumeSession}
              onPause={pauseSession}
              onStop={stopSession}
              onMinimize={() => setViewMode('list')}
              onTimeChange={(val) => setTimeLeft(val * 60)}
              currentBrainWave={currentBrainWave}
              onWaveChange={handleLiveWaveChange}
              currentSound={currentSound}
              onSoundChange={handleLiveSoundChange}
              volumes={volumes}
              onVolumeChange={(k, v) => setVolumes(prev => ({...prev, [k]: v}))}
            />
          ) : renderFeedback()
        )}
        {activeTab === 'ai' && renderAiTab()}
        {activeTab === 'history' && renderHistory()}
        {activeTab === 'settings' && renderSettings()}
      </main>

      {/* Mini Player */}
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
               <span className="text-xs text-primary-600 dark:text-primary-400 font-mono">{Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}</span>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={(e) => { e.stopPropagation(); playbackStatus === 'running' ? pauseSession() : resumeSession(); }} className="p-2 text-slate-700 dark:text-slate-200">
               {playbackStatus === 'running' ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={(e) => { e.stopPropagation(); stopSession(); }} className="p-2 text-red-500">
               <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <nav className="h-16 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around items-center shrink-0 z-30">
        <button onClick={() => setActiveTab('session')} className={`flex flex-col items-center gap-1 ${activeTab === 'session' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400'}`}>
          <Home size={20} />
          <span className="text-[10px] font-medium">홈</span>
        </button>
        <button onClick={() => setActiveTab('ai')} className={`flex flex-col items-center gap-1 ${activeTab === 'ai' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400'}`}>
          <Sparkles size={20} />
          <span className="text-[10px] font-medium">AI 코디</span>
        </button>
        <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center gap-1 ${activeTab === 'history' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400'}`}>
          <BarChart2 size={20} />
          <span className="text-[10px] font-medium">기록</span>
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 ${activeTab === 'settings' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400'}`}>
          <Settings size={20} />
          <span className="text-[10px] font-medium">설정</span>
        </button>
      </nav>
    </div>
  );
}