import React from 'react';
import {
  BarChart3,
  Brain,
  Headphones,
  Home,
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
  { id: 'home' as const, label: '사운드 홈', mobileLabel: '홈', Icon: Home },
  { id: 'insights' as const, label: '리포트', mobileLabel: '리포트', Icon: BarChart3 },
];

const PAGE_META: Record<AppView, { eyebrow: string; title: string }> = {
  home: { eyebrow: 'SOUND HOME', title: '모든 사운드' },
  library: { eyebrow: 'SOUND HOME', title: '모든 사운드' },
  nature: { eyebrow: 'LIVING SOUNDSCAPE', title: '자연 장면' },
  insights: { eyebrow: 'YOUR PROGRESS', title: '리포트' },
  settings: { eyebrow: 'PREFERENCES', title: '설정' },
};

const Brand = () => (
  <div className="flex items-center gap-3">
    <span className="brand-mark" aria-hidden="true"><Brain size={21} /></span>
    <div className="min-w-0 leading-tight">
      <strong className="block font-serif text-[21px] font-semibold tracking-[-0.035em] text-slate-950 dark:text-white">Brainwave</strong>
      <span className="block text-[10px] font-semibold tracking-[0.04em] text-slate-500 dark:text-slate-400">RITUAL SOUND STUDIO</span>
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
  const soundHomeActive = activeView === 'home' || activeView === 'library' || activeView === 'nature';

  if (focusMode) {
    return <div className="app-shell min-h-[100dvh] bg-indigo-950 text-white">{children}</div>;
  }

  return (
    <div className="app-shell min-h-[100dvh] bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="relative z-40 border-b border-slate-200 bg-slate-50/95 dark:border-white/10 dark:bg-slate-950/95">
        <div className="mx-auto flex min-h-[72px] w-full max-w-[1680px] items-center gap-4 px-4 sm:px-6 lg:min-h-[78px] lg:px-8">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            aria-label="Brainwave 홈으로 이동"
            className="shrink-0 rounded-xl text-left focus-visible:outline-offset-4"
          >
            <Brand />
          </button>

          <span className="hidden h-8 w-px bg-black/10 dark:bg-white/10 lg:block" aria-hidden="true" />

          <nav className="hidden items-center gap-1 md:flex" aria-label="주요 메뉴">
            {NAV_ITEMS.map(({ id, label, Icon }) => {
              const active = id === 'home' ? soundHomeActive : activeView === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onNavigate(id)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-11 items-center gap-2 rounded-xl px-3.5 text-xs font-bold transition-colors ${
                    active
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/6 dark:hover:text-white'
                  }`}
                >
                  <Icon size={16} strokeWidth={active ? 2.3 : 1.9} /> {label}
                </button>
              );
            })}
          </nav>

          <div className="hidden min-w-0 flex-1 items-center lg:flex">
            {pageMeta || activeView === 'nature' ? (
              <div className="ml-2 min-w-0 border-l border-slate-200 pl-5 dark:border-white/10">
                <p className="text-[9px] font-black tracking-[0.16em] text-primary-500 dark:text-primary-400">{meta.eyebrow}</p>
                <p className="mt-0.5 truncate text-xs font-bold text-slate-700 dark:text-slate-400">{meta.title}</p>
              </div>
            ) : null}
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <div className="hidden min-w-[166px] items-center gap-3 rounded-xl border border-slate-200 bg-white/38 px-3.5 py-2.5 xl:flex dark:border-white/10 dark:bg-white/[0.035]">
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  <span>오늘의 진행</span>
                  <span className="tabular-nums text-slate-950 dark:text-white">{dailyMinutes}/{dailyGoalMinutes}분</span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <div className="h-full rounded-full bg-primary-500 transition-[width] duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={darkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
              className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white/70 text-slate-500 transition-colors hover:bg-white hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.045] dark:text-slate-400 dark:hover:bg-white/9 dark:hover:text-white"
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('settings')}
              aria-label="설정 열기"
              aria-current={activeView === 'settings' ? 'page' : undefined}
              className={`grid h-11 w-11 place-items-center rounded-xl border transition-colors ${activeView === 'settings'
                ? 'border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-400/30 dark:bg-primary-500/15 dark:text-primary-300'
                : 'border-slate-200 bg-white/70 text-slate-500 hover:bg-white hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.045] dark:text-slate-400 dark:hover:bg-white/9 dark:hover:text-white'}`}
            >
              <Settings size={17} />
            </button>
            <span className="hidden items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-[10px] font-bold text-slate-500 2xl:flex dark:border-white/10 dark:text-slate-400">
              <Headphones size={13} className="text-primary-500" /> 로컬 엔진
            </span>
          </div>
        </div>
      </header>

      <main data-app-scroll className="min-w-0 pb-[calc(76px+env(safe-area-inset-bottom))] md:pb-10">
        {children}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 grid h-[calc(64px+env(safe-area-inset-bottom))] grid-cols-3 border-t border-slate-200 bg-slate-50/95 px-3 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden dark:border-white/10 dark:bg-slate-950/95" aria-label="주요 메뉴">
        {NAV_ITEMS.map(({ id, mobileLabel, Icon }) => {
          const active = id === 'home' ? soundHomeActive : activeView === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              aria-current={active ? 'page' : undefined}
              className={`my-1.5 flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-bold transition-colors ${active
                ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300'
                : 'text-slate-500 dark:text-slate-500'}`}
            >
              <Icon size={18} strokeWidth={active ? 2.4 : 1.9} />
              <span>{mobileLabel}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => onNavigate('settings')}
          aria-current={activeView === 'settings' ? 'page' : undefined}
          className={`my-1.5 flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-bold transition-colors ${activeView === 'settings'
            ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300'
            : 'text-slate-500 dark:text-slate-500'}`}
        >
          <Settings size={18} strokeWidth={activeView === 'settings' ? 2.4 : 1.9} />
          <span>설정</span>
        </button>
      </nav>
    </div>
  );
};
