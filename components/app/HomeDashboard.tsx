import React, { useDeferredValue, useMemo, useState } from 'react';
import {
  Check,
  Clock3,
  Headphones,
  Heart,
  Layers3,
  Play,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import {
  AMBIENCE_PRESETS,
  NATURE_MIXES,
  PRESETS,
  type AmbiencePreset,
  type NatureMix,
  type SessionLog,
  type SessionPreset,
} from '../../types';
import { getSoundLabel } from '../../audioOptions';
import { currentStreak, getAmbienceVisual, getPresetVisual, minutesOnDate } from './catalog';
import { displayPresetName } from './homeLaunchers';

export interface LastSessionSummary {
  name: string;
  durationMinutes: number;
  brainwaveEnabled: boolean;
  layerCount: number;
  waveLabel: string;
}

export interface SavedHomeRoutine {
  id: string;
  name: string;
  durationMinutes: number;
  layerCount: number;
  waveLabel: string;
}

interface Props {
  logs: SessionLog[];
  dailyGoalMinutes: number;
  lastSession: LastSessionSummary | null;
  savedRoutines: SavedHomeRoutine[];
  favoriteIds: Set<string>;
  onResumeLast: () => void;
  onCreateCustom: () => void;
  onOpenPreset: (preset: SessionPreset) => void;
  onQuickStartPreset: (preset: SessionPreset) => void;
  onOpenAmbience: (preset: AmbiencePreset) => void;
  onQuickStartAmbience: (preset: AmbiencePreset) => void;
  onOpenNatureMix: (mix: NatureMix) => void;
  onQuickStartNature: (mix: NatureMix) => void;
  onOpenSaved: (id: string) => void;
  onDeleteSaved: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

type CatalogFilter = 'all' | 'routine' | 'ambience' | 'nature' | 'favorites';
type CatalogEntry =
  | { kind: 'routine'; id: string; name: string; description: string; source: SessionPreset }
  | { kind: 'ambience'; id: string; name: string; description: string; source: AmbiencePreset }
  | { kind: 'nature'; id: string; name: string; description: string; source: NatureMix };

const FILTERS: { id: CatalogFilter; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'routine', label: '집중 루틴' },
  { id: 'ambience', label: '사운드스케이프' },
  { id: 'nature', label: '자연 장면' },
  { id: 'favorites', label: '즐겨찾기' },
];

const KIND_LABELS = {
  routine: '집중 루틴',
  ambience: '사운드스케이프',
  nature: '자연 장면',
} as const;

const NATURE_ARTWORK: Partial<Record<string, string>> = {
  summer_valley: 'images/nature/backgrounds/summer-valley.webp',
  bamboo_grove: 'images/nature/backgrounds/summer-valley.webp',
  campfire: 'images/nature/backgrounds/campfire-loop-poster-v2.webp',
  winter_lodge: 'images/nature/backgrounds/campfire-loop-poster-v2.webp',
  scops_night: 'images/nature/backgrounds/scops-night.webp',
};

const AMBIENCE_ARTWORK: Partial<Record<string, string>> = {
  morning_forest: 'images/nature/backgrounds/summer-valley.webp',
  rainy_forest: 'images/nature/backgrounds/summer-valley.webp',
  deep_forest: 'images/nature/backgrounds/summer-valley.webp',
  waterfall_valley: 'images/nature/backgrounds/summer-valley.webp',
  campfire_night: 'images/nature/backgrounds/campfire-loop-poster-v2.webp',
  night_pond: 'images/nature/backgrounds/scops-night.webp',
  deep_night: 'images/nature/backgrounds/scops-night.webp',
};

const NATURE_TONES = [
  'from-indigo-950 via-indigo-900 to-slate-500',
  'from-cyan-950 via-cyan-900 to-slate-500',
  'from-amber-950 via-rose-700 to-amber-500',
  'from-indigo-900 via-indigo-900 to-slate-500',
] as const;

export const HOME_CATALOG: CatalogEntry[] = [
  ...PRESETS.map((source) => ({
    kind: 'routine' as const,
    id: `preset:${source.id}`,
    name: displayPresetName(source.name),
    description: source.description,
    source,
  })),
  ...AMBIENCE_PRESETS.map((source) => ({
    kind: 'ambience' as const,
    id: `ambience:${source.id}`,
    name: source.name,
    description: source.description,
    source,
  })),
  ...NATURE_MIXES.map((source) => ({
    kind: 'nature' as const,
    id: `nature:${source.id}`,
    name: source.name,
    description: source.layers.map((layer) => getSoundLabel(layer.type)).join(' · '),
    source,
  })),
];

const artworkUrl = (path: string) => new URL(path, document.baseURI).toString();

const getEntryArtwork = (entry: CatalogEntry) => {
  if (entry.kind === 'routine') return getPresetVisual(entry.source).artwork;
  if (entry.kind === 'ambience') return AMBIENCE_ARTWORK[entry.source.id];
  return NATURE_ARTWORK[entry.source.id];
};

const getEntryGradient = (entry: CatalogEntry, index: number) => {
  if (entry.kind === 'routine') return getPresetVisual(entry.source).gradient;
  if (entry.kind === 'ambience') return getAmbienceVisual(entry.source).gradient;
  return NATURE_TONES[index % NATURE_TONES.length];
};

export const HomeDashboard: React.FC<Props> = ({
  logs,
  dailyGoalMinutes,
  lastSession,
  savedRoutines,
  favoriteIds,
  onResumeLast,
  onCreateCustom,
  onOpenPreset,
  onQuickStartPreset,
  onOpenAmbience,
  onQuickStartAmbience,
  onOpenNatureMix,
  onQuickStartNature,
  onOpenSaved,
  onDeleteSaved,
  onToggleFavorite,
}) => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase('ko-KR'));
  const [filter, setFilter] = useState<CatalogFilter>('all');
  const now = useMemo(() => new Date(), []);
  const todayMinutes = minutesOnDate(logs, now);
  const streak = currentStreak(logs, now);
  const progress = Math.min(100, Math.round((todayMinutes / Math.max(1, dailyGoalMinutes)) * 100));
  const dayLabel = new Intl.DateTimeFormat('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' }).format(now);

  const results = useMemo(() => HOME_CATALOG.filter((entry) => {
    const matchesKind = filter === 'all'
      || filter === 'favorites' && favoriteIds.has(entry.id)
      || entry.kind === filter;
    const haystack = `${entry.name} ${entry.description} ${KIND_LABELS[entry.kind]}`.toLocaleLowerCase('ko-KR');
    return matchesKind && (!deferredQuery || haystack.includes(deferredQuery));
  }), [deferredQuery, favoriteIds, filter]);

  const editEntry = (entry: CatalogEntry) => {
    if (entry.kind === 'routine') onOpenPreset(entry.source);
    else if (entry.kind === 'ambience') onOpenAmbience(entry.source);
    else onOpenNatureMix(entry.source);
  };

  const playEntry = (entry: CatalogEntry) => {
    if (entry.kind === 'routine') onQuickStartPreset(entry.source);
    else if (entry.kind === 'ambience') onQuickStartAmbience(entry.source);
    else onQuickStartNature(entry.source);
  };

  return (
    <div className="mx-auto w-full max-w-[1680px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
      <section className="grid gap-5 border-b border-slate-200 pb-6 dark:border-white/10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:pb-8">
        <div>
          <p className="text-[10px] font-black tracking-[0.18em] text-slate-500 dark:text-primary-400">{dayLabel} · SOUND HOME</p>
          <h1 className="mt-2 max-w-3xl text-[32px] font-semibold leading-[1.12] tracking-[-0.045em] text-slate-950 sm:text-[42px] dark:text-white">
            당신의 하루를 위한 사운드
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            집중 루틴부터 자연 장면, 직접 조합한 믹스까지 이 화면에서 바로 고르고 편집하세요.
          </p>
        </div>
        <button
          type="button"
          onClick={onCreateCustom}
          className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-primary-600 px-6 text-sm font-bold text-white shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700 active:translate-y-0 lg:w-auto"
        >
          <SlidersHorizontal size={18} /> 나만의 사운드 만들기
        </button>
      </section>

      <section className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]" aria-label="오늘의 진행과 최근 구성">
        <article className="flex min-h-[94px] items-center gap-4 rounded-2xl border border-slate-200 bg-white/42 px-4 py-3 dark:border-white/10 dark:bg-white/[0.035]">
          <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary-50 text-sm font-black tabular-nums text-primary-700 dark:bg-primary-500/15 dark:text-primary-300">
            {progress}%
            <span className="absolute inset-0 rounded-full border border-primary-400/30" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm font-bold text-slate-900 dark:text-white">오늘 {todayMinutes}/{dailyGoalMinutes}분</strong>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-500">{streak}일 연속</span>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
              <div className="h-full rounded-full bg-primary-500 transition-[width] duration-500" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 truncate text-[10px] text-slate-500 dark:text-slate-500">
              {progress >= 100 ? '오늘의 목표를 채웠어요.' : `${Math.max(0, dailyGoalMinutes - todayMinutes)}분 더하면 오늘 목표를 채워요.`}
            </p>
          </div>
        </article>

        {lastSession ? (
          <button
            type="button"
            onClick={onResumeLast}
            className="group flex min-h-[94px] items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-left text-white shadow-lg transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-slate-900"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/8 text-primary-300"><RotateCcw size={19} /></span>
            <span className="min-w-0 flex-1">
              <span className="text-[9px] font-black tracking-[0.15em] text-slate-400">RECENT MIX · 바로 재생</span>
              <strong className="mt-1 block truncate text-base font-bold">{displayPresetName(lastSession.name)}</strong>
              <span className="mt-1 block truncate text-[10px] text-slate-400">{lastSession.waveLabel} · {lastSession.durationMinutes}분 · 사운드 {lastSession.layerCount}개</span>
            </span>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-primary-600 transition-transform group-hover:scale-105"><Play size={16} fill="currentColor" className="ml-0.5" /></span>
          </button>
        ) : (
          <div className="flex min-h-[94px] items-center gap-4 rounded-2xl border border-dashed border-slate-200 px-4 py-3 dark:border-white/12">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-50 text-primary-500 dark:bg-primary-500/15 dark:text-primary-300"><Headphones size={19} /></span>
            <div>
              <strong className="text-sm font-bold text-slate-900 dark:text-white">첫 사운드를 시작해 보세요</strong>
              <p className="mt-1 text-[11px] text-slate-500">다음부터 최근 믹스를 여기서 바로 재생할 수 있어요.</p>
            </div>
          </div>
        )}
      </section>

      {savedRoutines.length > 0 ? (
        <section className="mt-7" aria-labelledby="saved-routines-title">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-amber-500" />
              <h2 id="saved-routines-title" className="text-sm font-bold text-slate-900 dark:text-white">내가 저장한 사운드</h2>
            </div>
            <span className="text-[10px] font-bold text-slate-500">{savedRoutines.length}개</span>
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
            {savedRoutines.map((routine) => (
              <article key={routine.id} className="relative flex w-[250px] shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white/45 p-3 dark:border-white/10 dark:bg-white/[0.035]">
                <button type="button" onClick={() => onOpenSaved(routine.id)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300"><Sparkles size={16} /></span>
                  <span className="min-w-0">
                    <strong className="block truncate text-xs font-bold text-slate-900 dark:text-white">{routine.name}</strong>
                    <span className="mt-1 block truncate text-[9px] text-slate-500">{routine.waveLabel} · {routine.durationMinutes}분 · {routine.layerCount}개</span>
                  </span>
                </button>
                <button type="button" onClick={() => onDeleteSaved(routine.id)} aria-label={`${routine.name} 삭제`} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-500"><X size={15} /></button>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-7" aria-labelledby="sound-catalog-title">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-[10px] font-black tracking-[0.17em] text-slate-500 dark:text-primary-400">ALL SOUNDS</p>
            <h2 id="sound-catalog-title" className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-slate-950 dark:text-white">전체 사운드</h2>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2.5 lg:flex-row xl:max-w-[1080px] xl:justify-end">
            <label className="relative block min-w-0 flex-1 lg:max-w-[430px]">
              <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <span className="sr-only">사운드 검색</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="사운드, 장면, 루틴 검색"
                className="routine-search-input h-12 w-full rounded-2xl border border-slate-200 bg-white/70 pl-11 pr-12 text-sm font-semibold text-slate-950 outline-none transition-all focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/10 dark:border-white/10 dark:bg-white/[0.045] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-primary-400/60 dark:focus:bg-white/[0.065]"
              />
              {query ? (
                <button type="button" onClick={() => setQuery('')} aria-label="검색어 지우기" className="absolute right-0.5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-xl text-slate-400 hover:text-slate-950 dark:hover:text-white"><X size={16} /></button>
              ) : null}
            </label>
            <div className="flex gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white/36 p-1 scrollbar-hide dark:border-white/10 dark:bg-white/[0.025]" role="group" aria-label="사운드 분류">
              {FILTERS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFilter(id)}
                  aria-pressed={filter === id}
                  className={`min-h-11 shrink-0 rounded-xl px-3.5 text-[11px] font-bold transition-colors ${filter === id
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-slate-500 hover:bg-white/70 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/7 dark:hover:text-white'}`}
                >
                  {id === 'favorites' ? <Heart size={12} className="mr-1 inline" fill={filter === id ? 'currentColor' : 'none'} /> : null}{label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-200 pt-3 text-[10px] font-bold text-slate-500 dark:border-white/8">
          <span>{results.length}개의 사운드</span>
          <span className="hidden sm:inline">카드에서 편집하거나 즉시 재생할 수 있습니다.</span>
        </div>

        {results.length ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {results.map((entry, index) => {
              const artwork = getEntryArtwork(entry);
              const gradient = getEntryGradient(entry, index);
              const favorite = favoriteIds.has(entry.id);
              const layerCount = entry.kind === 'routine'
                ? (entry.source.defaultBackgroundSound === 'none' ? 0 : 1)
                : entry.source.layers.length;
              const duration = entry.kind === 'routine'
                ? `${entry.source.defaultDurationMinutes}분`
                : entry.kind === 'ambience' ? `${entry.source.durationMinutes}분` : '타이머 선택';
              const emoji = entry.kind === 'ambience' || entry.kind === 'nature' ? entry.source.emoji : null;

              return (
                <article key={entry.id} className="content-auto group relative min-h-[286px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-white shadow-md transition-all hover:-translate-y-1 hover:border-slate-600 hover:shadow-xl dark:border-white/10 dark:bg-slate-900">
                  <div className={`absolute inset-x-0 top-0 h-[60%] bg-gradient-to-br ${gradient}`} aria-hidden="true">
                    {artwork ? <img src={artworkUrl(artwork)} alt="" loading="lazy" decoding="async" width="1000" height="400" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : null}
                    {emoji && !artwork ? <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-[108px] opacity-[0.16]">{emoji}</span> : null}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/95 to-black/5" aria-hidden="true" />

                  <div className="relative flex min-h-[286px] flex-col p-4">
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-lg border border-white/12 bg-black/24 px-2.5 py-1.5 text-[9px] font-black tracking-[0.08em] text-white/78 backdrop-blur-sm">{KIND_LABELS[entry.kind]}</span>
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(entry.id)}
                        aria-label={favorite ? `${entry.name} 즐겨찾기 해제` : `${entry.name} 즐겨찾기 추가`}
                        aria-pressed={favorite}
                        className={`grid h-11 w-11 place-items-center rounded-xl border backdrop-blur-sm transition-colors ${favorite ? 'border-amber-400/30 bg-amber-400/20 text-amber-300' : 'border-white/10 bg-black/18 text-white/55 hover:text-white'}`}
                      >
                        <Heart size={16} fill={favorite ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <button type="button" onClick={() => editEntry(entry)} className="mt-auto min-w-0 text-left focus-visible:outline-offset-4">
                      <h3 className="truncate text-lg font-bold tracking-[-0.025em]">{entry.name}</h3>
                      <p className="mt-1 line-clamp-1 text-[11px] text-slate-400">{entry.description}</p>
                    </button>

                    <div className="mt-3 flex items-center gap-3 text-[9px] font-bold text-slate-400">
                      <span className="flex items-center gap-1"><Clock3 size={11} /> {duration}</span>
                      <span className="flex items-center gap-1"><Layers3 size={11} /> {layerCount}개 레이어</span>
                    </div>

                    <div className="mt-3 grid grid-cols-[1fr_1.18fr] gap-2 border-t border-white/9 pt-3">
                      <button type="button" onClick={() => editEntry(entry)} className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-white/12 bg-white/[0.035] text-[11px] font-bold text-slate-300 transition-colors hover:bg-white/8 hover:text-white"><SlidersHorizontal size={14} /> 편집</button>
                      <button type="button" onClick={() => playEntry(entry)} className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-primary-600 text-[11px] font-bold text-white transition-colors hover:bg-primary-500"><Play size={14} fill="currentColor" /> 재생</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-5 grid min-h-[260px] place-items-center rounded-2xl border border-dashed border-slate-200 text-center dark:border-white/12">
            <div className="px-6">
              <Search size={27} className="mx-auto text-slate-400" />
              <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">조건에 맞는 사운드가 없어요</h3>
              <p className="mt-1 text-[11px] text-slate-400">검색어를 지우거나 다른 분류를 선택해 보세요.</p>
            </div>
          </div>
        )}
      </section>

      <footer className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-5 text-[10px] text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:text-slate-500">
        <span className="flex items-center gap-2"><Check size={13} className="text-primary-500" /> 모든 오디오는 기기 안에서 조합됩니다.</span>
        <span>편안한 낮은 볼륨으로 시작하세요.</span>
      </footer>
    </div>
  );
};
