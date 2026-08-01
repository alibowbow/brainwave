import React, { useRef } from 'react';
import {
  BellRing,
  Check,
  Download,
  HardDrive,
  Headphones,
  Moon,
  RotateCcw,
  Smartphone,
  Sparkles,
  Sun,
  Trash2,
  Upload,
} from 'lucide-react';
import { Toggle } from '../Toggle';

interface Props {
  darkMode: boolean;
  showSoundNotice: boolean;
  reduceMotion: boolean;
  dailyGoalMinutes: number;
  logCount: number;
  presetCount: number;
  canInstall: boolean;
  importMessage: string | null;
  onToggleDarkMode: () => void;
  onToggleSoundNotice: () => void;
  onToggleReduceMotion: () => void;
  onDailyGoalChange: (minutes: number) => void;
  onInstall: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onClearHistory: () => void;
  onResetPreferences: () => void;
}

const GOALS = [15, 30, 45, 60];

export const SettingsView: React.FC<Props> = ({
  darkMode,
  showSoundNotice,
  reduceMotion,
  dailyGoalMinutes,
  logCount,
  presetCount,
  canInstall,
  importMessage,
  onToggleDarkMode,
  onToggleSoundNotice,
  onToggleReduceMotion,
  onDailyGoalChange,
  onInstall,
  onExport,
  onImport,
  onClearHistory,
  onResetPreferences,
}) => {
  const importRef = useRef<HTMLInputElement>(null);
  return (
  <div className="mx-auto w-full max-w-[1040px] px-4 py-5 sm:px-6 sm:py-7 lg:px-9 lg:py-8">
    <section className="overflow-hidden rounded-[30px] bg-gradient-to-br from-[#171d31] via-[#111728] to-[#20234a] p-6 text-white shadow-[0_26px_70px_rgba(12,18,40,0.22)] sm:p-8">
      <div className="flex max-w-2xl items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#9ca7ff] backdrop-blur-md"><Sparkles size={21} /></span>
        <div>
          <p className="text-[10px] font-black tracking-[0.16em] text-[#98a3ff]">LOCAL FIRST</p>
          <h2 className="mt-1 text-[28px] font-black tracking-[-0.05em] sm:text-[36px]">내 리듬, 내 기기에만</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/55">계정이나 서버 없이 모든 루틴과 기록을 이 기기에 저장합니다. 오디오는 선택할 때만 내려받고 이후 오프라인에서도 재사용합니다.</p>
        </div>
      </div>
    </section>

    <div className="mt-6 grid gap-5 lg:grid-cols-2">
      <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/8 dark:bg-[#111621]" aria-labelledby="appearance-title">
        <p className="text-[10px] font-black tracking-[0.15em] text-[#7180ef]">APPEARANCE</p>
        <h3 id="appearance-title" className="mt-1 text-lg font-black tracking-[-0.035em] text-slate-950 dark:text-white">화면과 움직임</h3>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between rounded-[20px] bg-slate-50 p-4 dark:bg-white/[0.035]">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-indigo-500 shadow-sm dark:bg-white/6">{darkMode ? <Moon size={18} /> : <Sun size={18} />}</span>
              <div><strong className="block text-sm font-black text-slate-800 dark:text-slate-100">다크 모드</strong><span className="mt-0.5 block text-[10px] text-slate-400">야간 사용에 편안한 어두운 화면</span></div>
            </div>
            <Toggle checked={darkMode} onChange={onToggleDarkMode} label="다크 모드" />
          </div>
          <div className="flex items-center justify-between rounded-[20px] bg-slate-50 p-4 dark:bg-white/[0.035]">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-violet-500 shadow-sm dark:bg-white/6"><Sparkles size={18} /></span>
              <div><strong className="block text-sm font-black text-slate-800 dark:text-slate-100">움직임 줄이기</strong><span className="mt-0.5 block text-[10px] text-slate-400">배경과 오브젝트 애니메이션 최소화</span></div>
            </div>
            <Toggle checked={reduceMotion} onChange={onToggleReduceMotion} label="움직임 줄이기" />
          </div>
        </div>
      </section>

      <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/8 dark:bg-[#111621]" aria-labelledby="goal-title">
        <p className="text-[10px] font-black tracking-[0.15em] text-emerald-500">DAILY GOAL</p>
        <h3 id="goal-title" className="mt-1 text-lg font-black tracking-[-0.035em] text-slate-950 dark:text-white">하루 목표</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">부담 없이 이어갈 수 있는 시간을 정하세요. 목표는 동기 부여용이며 알림을 보내지 않습니다.</p>
        <div className="mt-5 grid grid-cols-4 gap-2">
          {GOALS.map((minutes) => (
            <button key={minutes} type="button" onClick={() => onDailyGoalChange(minutes)} aria-pressed={dailyGoalMinutes === minutes} className={`relative min-h-14 rounded-2xl text-xs font-black transition-all ${dailyGoalMinutes === minutes ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-50 text-slate-500 hover:text-slate-950 dark:bg-white/[0.035] dark:text-slate-400 dark:hover:text-white'}`}>{minutes}분{dailyGoalMinutes === minutes ? <Check size={12} className="absolute right-2 top-2" /> : null}</button>
          ))}
        </div>
      </section>

      <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/8 dark:bg-[#111621]" aria-labelledby="audio-title">
        <p className="text-[10px] font-black tracking-[0.15em] text-amber-500">AUDIO</p>
        <h3 id="audio-title" className="mt-1 text-lg font-black tracking-[-0.035em] text-slate-950 dark:text-white">재생 안내</h3>
        <div className="mt-5 flex items-center justify-between rounded-[20px] bg-slate-50 p-4 dark:bg-white/[0.035]">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-amber-500 shadow-sm dark:bg-white/6"><Headphones size={18} /></span>
            <div><strong className="block text-sm font-black text-slate-800 dark:text-slate-100">헤드폰 안내</strong><span className="mt-0.5 block text-[10px] text-slate-400">첫 바이노럴 재생 전에만 표시</span></div>
          </div>
          <Toggle checked={showSoundNotice} onChange={onToggleSoundNotice} label="헤드폰 안내" />
        </div>
        <div className="mt-3 flex gap-2 rounded-[18px] bg-amber-50 p-3 text-[10px] leading-relaxed text-amber-800 dark:bg-amber-500/8 dark:text-amber-200/70">
          <BellRing size={14} className="mt-0.5 shrink-0" /> 편안하게 들리는 낮은 볼륨에서 시작하고, 운전이나 위험한 작업 중에는 사용하지 마세요.
        </div>
      </section>

      <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/8 dark:bg-[#111621]" aria-labelledby="device-title">
        <p className="text-[10px] font-black tracking-[0.15em] text-sky-500">DEVICE</p>
        <h3 id="device-title" className="mt-1 text-lg font-black tracking-[-0.035em] text-slate-950 dark:text-white">앱과 데이터</h3>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="rounded-[20px] bg-slate-50 p-4 dark:bg-white/[0.035]"><HardDrive size={17} className="text-sky-500" /><strong className="mt-3 block text-xl font-black text-slate-950 dark:text-white">{logCount}</strong><span className="text-[10px] font-semibold text-slate-400">세션 기록</span></div>
          <div className="rounded-[20px] bg-slate-50 p-4 dark:bg-white/[0.035]"><Sparkles size={17} className="text-violet-500" /><strong className="mt-3 block text-xl font-black text-slate-950 dark:text-white">{presetCount}</strong><span className="text-[10px] font-semibold text-slate-400">저장 루틴</span></div>
        </div>
        {canInstall ? <button type="button" onClick={onInstall} className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 text-xs font-black text-white dark:bg-white dark:text-slate-950"><Smartphone size={15} /> 홈 화면에 앱 설치</button> : <div className="mt-3 flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-[11px] font-bold text-slate-400 dark:border-white/8"><Smartphone size={15} /> 브라우저 메뉴에서 홈 화면에 추가할 수 있어요.</div>}
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button type="button" onClick={onExport} className="flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 text-xs font-black text-slate-500 transition-colors hover:text-slate-950 dark:border-white/8 dark:text-slate-400 dark:hover:text-white"><Download size={15} /> 백업</button>
          <button type="button" onClick={() => importRef.current?.click()} className="flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 text-xs font-black text-slate-500 transition-colors hover:text-slate-950 dark:border-white/8 dark:text-slate-400 dark:hover:text-white"><Upload size={15} /> 복원</button>
          <input ref={importRef} type="file" accept="application/json,.json" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) onImport(file); event.currentTarget.value = ''; }} />
        </div>
        {importMessage ? <p role="status" className="mt-2 rounded-xl bg-sky-50 px-3 py-2 text-[10px] font-bold leading-relaxed text-sky-700 dark:bg-sky-500/8 dark:text-sky-300">{importMessage}</p> : null}
      </section>
    </div>

    <section className="mt-5 rounded-[26px] border border-slate-200 bg-white p-5 dark:border-white/8 dark:bg-[#111621]" aria-label="데이터 초기화">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-black text-slate-950 dark:text-white">초기화</h3>
          <p className="mt-1 text-[10px] leading-relaxed text-slate-400">삭제 전 확인 창이 열립니다. 백업 파일을 먼저 받아두는 것을 권장합니다.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onResetPreferences} className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 text-[11px] font-black text-slate-500 dark:border-white/8 dark:text-slate-400"><RotateCcw size={14} /> 설정 초기화</button>
          <button type="button" onClick={onClearHistory} disabled={logCount === 0} className="flex min-h-10 flex-1 items-center justify-center gap-2 rounded-2xl border border-red-200 px-4 text-[11px] font-black text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-red-500/20 dark:hover:bg-red-500/8"><Trash2 size={14} /> 기록 삭제</button>
        </div>
      </div>
    </section>

    <footer className="py-8 text-center text-[10px] font-semibold leading-relaxed text-slate-400">
      BRAINWAVE 4.0 · CC0 현장 녹음 + 기기 내 절차형 오디오<br />의료기기가 아니며 진단이나 치료를 대신하지 않습니다.
    </footer>
  </div>
  );
};
