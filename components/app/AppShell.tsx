import React from 'react';
import {
  BarChart3,
  Brain,
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

const Brand: React.FC<{ subtitle?: string }> = ({ subtitle = '집중 · 휴식 · 수면' }) => (
  <div className="flex items-center gap-2.5">
    <span className="brand-mark" aria-hidden="true"><Brain size={21} /></span>
    <div className="min-w-0 leading-tight">
      <strong className="block text-lg font-bold text-slate-900 dark:text-white">Brainwave</strong>
      <span className="block max-w-[150px] truncate text-[11px] text-slate-400">{subtitle}</span>
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
    return <div className="app-shell classic-ui min-h-[100dvh] bg-slate-900 text-white">{children}</div>;
  }

  return (
    <div className="app-shell classic-ui h-[100dvh] overflow-hidden bg-slate-50 text-slate-900 lg:h-auto lg:min-h-[100dvh] lg:overflow-visible dark:bg-slate-900 dark:text-slate-100">
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-[252px] lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white lg:px-5 lg:py-6 dark:lg:border-slate-700 dark:lg:bg-slate-800">
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
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/6 dark:hover:text-white'
                }`}
              >
                <Icon size={19} strokeWidth={active ? 2.3 : 1.8} />
                {label}
                {active ? <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/80" /> : null}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span>오늘의 리듬</span>
              <span className="tabular-nums text-slate-950 dark:text-white">{dailyMinutes}/{dailyGoalMinutes}분</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div className="h-full rounded-full bg-primary-500 transition-[width] duration-500" style={{ width: `${progress}%` }} />
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
                ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/6 dark:hover:text-white'
            }`}
          >
            <Settings size={18} /> 설정
          </button>
        </div>
      </aside>

      <div className="flex h-full min-h-0 flex-col lg:block lg:h-auto lg:min-h-[100dvh] lg:pl-[252px]">
        <header className="relative z-30 flex h-[68px] shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50/90 px-4 backdrop-blur-md sm:px-6 lg:sticky lg:top-0 lg:h-[88px] lg:px-9 dark:border-slate-800 dark:bg-slate-900/90">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            aria-label="Brainwave 홈으로 이동"
            className="min-h-11 rounded-xl text-left lg:hidden"
          >
            <Brand subtitle={activeView === 'home' ? undefined : meta.title} />
          </button>
          <div className="hidden lg:block">
            <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">{meta.eyebrow}</p>
            <h1 className="mt-1 text-[22px] font-bold text-slate-900 dark:text-white">{meta.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={darkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:text-slate-950 dark:border-white/8 dark:bg-white/5 dark:text-slate-400 dark:hover:text-white"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('settings')}
              aria-label="설정 열기"
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:text-slate-950 lg:hidden dark:border-white/8 dark:bg-white/5 dark:text-slate-400 dark:hover:text-white"
            >
              <Settings size={17} />
            </button>
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-600 shadow-sm sm:flex dark:border-white/8 dark:bg-white/5 dark:text-slate-300">
              <Headphones size={14} className="text-primary-500" /> 로컬 오디오 엔진
            </div>
          </div>
        </header>

        <main data-app-scroll className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain pb-6 lg:min-h-[calc(100dvh-88px)] lg:overflow-visible lg:pb-10">
          {children}
        </main>

        <nav className="relative z-40 grid h-[calc(68px+env(safe-area-inset-bottom))] shrink-0 grid-cols-4 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden dark:border-slate-700 dark:bg-slate-800/95" aria-label="주요 메뉴">
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const active = activeView === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                aria-current={active ? 'page' : undefined}
                className={`my-1.5 flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-semibold transition-colors ${
                  active
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-300'
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
    </div>
  );
};
