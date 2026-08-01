import React from 'react';
import {
  BarChart3,
  Compass,
  Headphones,
  Home,
  Leaf,
  Moon,
  Settings,
  Sun,
} from 'lucide-react';

export type AppView = 'home' | 'library' | 'nature' | 'insights' | 'settings';

interface Props {
  activeView: AppView;
  children: React.ReactNode;
  dailyMinutes: number;
  dailyGoalMinutes: number;
  darkMode: boolean;
  focusMode?: boolean;
  pageMeta?: { eyebrow: string; title: string };
  onNavigate: (view: AppView) => void;
  onToggleTheme: () => void;
}

const NAV_ITEMS = [
  { id: 'home' as const, label: '오늘', Icon: Home },
  { id: 'library' as const, label: '루틴', Icon: Compass },
  { id: 'nature' as const, label: '자연', Icon: Leaf },
  { id: 'insights' as const, label: '리포트', Icon: BarChart3 },
];

const PAGE_META: Record<AppView, { eyebrow: string; title: string }> = {
  home: { eyebrow: 'YOUR DAILY RHYTHM', title: '오늘의 브레인웨이브' },
  library: { eyebrow: 'ROUTINE LIBRARY', title: '루틴 라이브러리' },
  nature: { eyebrow: 'LIVING SOUNDSCAPE', title: '자연 스튜디오' },
  insights: { eyebrow: 'YOUR PROGRESS', title: '리포트' },
  settings: { eyebrow: 'PREFERENCES', title: '설정' },
};

const Brand = () => (
  <div className="flex items-center gap-3">
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
    <div className="leading-none">
      <strong className="block text-[15px] font-black tracking-[0.2em] text-slate-950 dark:text-white">BRAINWAVE</strong>
      <span className="mt-1 block text-[9px] font-semibold tracking-[0.18em] text-slate-400">SOUND · FOCUS · REST</span>
    </div>
  </div>
);

export const AppShell: React.FC<Props> = ({
  activeView,
  children,
  dailyMinutes,
  dailyGoalMinutes,
  darkMode,
  focusMode = false,
  pageMeta,
  onNavigate,
  onToggleTheme,
}) => {
  const progress = Math.min(100, Math.round((dailyMinutes / Math.max(1, dailyGoalMinutes)) * 100));
  const meta = pageMeta ?? PAGE_META[activeView];

  if (focusMode) {
    return <div className="min-h-[100dvh] bg-[#070a12] text-white">{children}</div>;
  }

  return (
    <div className="app-shell min-h-[100dvh] bg-[#f3f5f8] text-slate-950 dark:bg-[#080b13] dark:text-white">
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-[252px] lg:flex-col lg:border-r lg:border-slate-200/80 lg:bg-white/90 lg:px-5 lg:py-6 lg:backdrop-blur-xl dark:lg:border-white/8 dark:lg:bg-[#0d111c]/92">
        <button type="button" onClick={() => onNavigate('home')} className="rounded-2xl px-2 py-1 text-left">
          <Brand />
        </button>

        <nav className="mt-12 space-y-1" aria-label="주요 메뉴">
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const active = activeView === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                aria-current={active ? 'page' : undefined}
                className={`group flex min-h-12 w-full items-center gap-3 rounded-2xl px-3.5 text-sm font-bold transition-all ${
                  active
                    ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/15 dark:bg-white dark:text-slate-950'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/6 dark:hover:text-white'
                }`}
              >
                <Icon size={19} strokeWidth={active ? 2.3 : 1.8} />
                {label}
                {active ? <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#8b9cff] dark:bg-[#596bff]" /> : null}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3">
          <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 dark:border-white/8 dark:bg-white/[0.035]">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span>오늘의 리듬</span>
              <span className="tabular-nums text-slate-950 dark:text-white">{dailyMinutes}/{dailyGoalMinutes}분</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-[#6c7cff] to-[#b590ff] transition-[width] duration-500" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-slate-400">
              {progress >= 100 ? '오늘 목표를 채웠어요. 충분히 잘했습니다.' : `${Math.max(0, dailyGoalMinutes - dailyMinutes)}분이면 오늘 목표를 채워요.`}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('settings')}
            className={`flex min-h-11 w-full items-center gap-3 rounded-2xl px-3.5 text-sm font-bold transition-colors ${
              activeView === 'settings'
                ? 'bg-slate-100 text-slate-950 dark:bg-white/8 dark:text-white'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/6 dark:hover:text-white'
            }`}
          >
            <Settings size={18} /> 설정
          </button>
        </div>
      </aside>

      <div className="lg:pl-[252px]">
        <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-slate-200/70 bg-[#f3f5f8]/88 px-4 backdrop-blur-xl sm:px-6 lg:h-[88px] lg:px-9 dark:border-white/7 dark:bg-[#080b13]/88">
          <div className="lg:hidden"><Brand /></div>
          <div className="hidden lg:block">
            <p className="text-[10px] font-black tracking-[0.2em] text-[#6978ea] dark:text-[#8f9cff]">{meta.eyebrow}</p>
            <h1 className="mt-1 text-[22px] font-extrabold tracking-[-0.035em] text-slate-950 dark:text-white">{meta.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={darkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:text-slate-950 dark:border-white/8 dark:bg-white/5 dark:text-slate-400 dark:hover:text-white"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('settings')}
              aria-label="설정 열기"
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:text-slate-950 lg:hidden dark:border-white/8 dark:bg-white/5 dark:text-slate-400 dark:hover:text-white"
            >
              <Settings size={17} />
            </button>
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-600 shadow-sm sm:flex dark:border-white/8 dark:bg-white/5 dark:text-slate-300">
              <Headphones size={14} className="text-[#7282ff]" /> 로컬 오디오 엔진
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100dvh-68px)] pb-[calc(92px+env(safe-area-inset-bottom))] lg:min-h-[calc(100dvh-88px)] lg:pb-10">
          {children}
        </main>
      </div>

      <nav className="fixed inset-x-3 bottom-[calc(10px+env(safe-area-inset-bottom))] z-40 grid h-[66px] grid-cols-4 rounded-[24px] border border-slate-200/90 bg-white/92 p-1.5 shadow-[0_16px_44px_rgba(15,23,42,0.18)] backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-[#141925]/94" aria-label="주요 메뉴">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const active = activeView === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              aria-current={active ? 'page' : undefined}
              className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-[18px] text-[10px] font-bold transition-all ${
                active
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                  : 'text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200'
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
