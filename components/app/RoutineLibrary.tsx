import React, { useDeferredValue, useMemo, useState } from 'react';
import {
  ArrowRight,
  Clock3,
  Heart,
  Layers3,
  Play,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import { AMBIENCE_PRESETS, PRESETS, type AmbiencePreset, type SessionPreset } from '../../types';
import {
  CATEGORY_LABELS,
  type RoutineCategory,
  getAmbienceVisual,
  getPresetVisual,
} from './catalog';

export interface SavedRoutineSummary {
  id: string;
  name: string;
  durationMinutes: number;
  layerCount: number;
  waveLabel: string;
}

interface Props {
  savedRoutines: SavedRoutineSummary[];
  favoriteIds: Set<string>;
  onCreateCustom: () => void;
  onOpenPreset: (preset: SessionPreset) => void;
  onQuickStartPreset: (preset: SessionPreset) => void;
  onOpenAmbience: (preset: AmbiencePreset) => void;
  onQuickStartAmbience: (preset: AmbiencePreset) => void;
  onOpenSaved: (id: string) => void;
  onDeleteSaved: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

type CategoryFilter = RoutineCategory | 'all' | 'favorites';

const artworkUrl = (path: string) => new URL(path, document.baseURI).toString();

export const RoutineLibrary: React.FC<Props> = ({
  savedRoutines,
  favoriteIds,
  onCreateCustom,
  onOpenPreset,
  onQuickStartPreset,
  onOpenAmbience,
  onQuickStartAmbience,
  onOpenSaved,
  onDeleteSaved,
  onToggleFavorite,
}) => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase('ko-KR'));
  const [category, setCategory] = useState<CategoryFilter>('all');

  const presetResults = useMemo(() => PRESETS.filter((preset) => {
    const visual = getPresetVisual(preset);
    const matchesQuery = !deferredQuery || `${preset.name} ${preset.description} ${visual.eyebrow}`.toLocaleLowerCase('ko-KR').includes(deferredQuery);
    const matchesCategory = category === 'all' || category === visual.category || (category === 'favorites' && favoriteIds.has(`preset:${preset.id}`));
    return matchesQuery && matchesCategory;
  }), [category, deferredQuery, favoriteIds]);

  const ambienceResults = useMemo(() => AMBIENCE_PRESETS.filter((preset) => {
    const visual = getAmbienceVisual(preset);
    const matchesQuery = !deferredQuery || `${preset.name} ${preset.description}`.toLocaleLowerCase('ko-KR').includes(deferredQuery);
    const matchesCategory = category === 'all' || category === visual.category || (category === 'favorites' && favoriteIds.has(`ambience:${preset.id}`));
    return matchesQuery && matchesCategory;
  }), [category, deferredQuery, favoriteIds]);

  const resultCount = presetResults.length + ambienceResults.length;

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 sm:py-7 lg:px-9 lg:py-8">
      <section className="overflow-hidden rounded-3xl bg-[#111725] p-6 text-white shadow-2xl shadow-slate-900/20 sm:p-8 lg:flex lg:items-end lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <p className="text-[10px] font-bold tracking-[0.18em] text-[#8d9aff]">BUILD YOUR RHYTHM</p>
          <h2 className="mt-2 text-[32px] font-bold leading-tight sm:text-[42px]">필요한 순간에 바로 꺼내 쓰는 루틴</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/56">집중·이완·수면 목적별 세션과 여러 자연음을 조합한 공간을 한곳에서 찾고 저장하세요.</p>
        </div>
        <button type="button" onClick={onCreateCustom} className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-slate-950 transition-transform hover:scale-[1.015] active:scale-[0.985] lg:mt-0 lg:w-auto">
          <SlidersHorizontal size={17} /> 새 루틴 만들기
        </button>
      </section>

      {savedRoutines.length > 0 ? (
        <section className="mt-8" aria-labelledby="saved-title">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[0.16em] text-[#7180f0]">MY ROUTINES</p>
              <h3 id="saved-title" className="mt-1 text-lg font-bold text-slate-950 dark:text-white">내가 저장한 루틴</h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400">{savedRoutines.length}개</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {savedRoutines.map((routine) => (
              <article key={routine.id} className="relative w-[255px] shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/8 dark:bg-[#111621]">
                <button type="button" onClick={() => onDeleteSaved(routine.id)} aria-label={`${routine.name} 삭제`} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"><X size={14} /></button>
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/12 dark:text-indigo-300"><Sparkles size={18} /></span>
                <h4 className="mt-4 truncate pr-7 text-base font-bold text-slate-950 dark:text-white">{routine.name}</h4>
                <p className="mt-1 truncate text-[10px] font-bold text-slate-400">{routine.waveLabel} · {routine.durationMinutes}분 · {routine.layerCount}개</p>
                <button type="button" onClick={() => onOpenSaved(routine.id)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 py-2.5 text-xs font-bold text-white dark:bg-white dark:text-slate-950"><ArrowRight size={14} /> 열기</button>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-8" aria-label="루틴 검색과 필터">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block lg:w-[360px]">
            <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <span className="sr-only">루틴 검색</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="루틴, 효과, 소리 검색"
              className="routine-search-input h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-12 text-sm font-semibold text-slate-950 shadow-sm outline-none transition focus:border-[#7b88f5] focus:ring-4 focus:ring-[#7180ff]/10 dark:border-white/8 dark:bg-[#111621] dark:text-white dark:placeholder:text-slate-500"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="검색어 지우기"
                className="absolute right-0.5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/6 dark:hover:text-white"
              >
                <X size={16} />
              </button>
            ) : null}
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" role="group" aria-label="카테고리 필터">
            {(['all', 'focus', 'calm', 'sleep', 'restore'] as const).map((id) => (
              <button key={id} type="button" onClick={() => setCategory(id)} aria-pressed={category === id} className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition-all ${category === id ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/15 dark:bg-white dark:text-slate-950' : 'border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-950 dark:border-white/8 dark:bg-white/4 dark:text-slate-400 dark:hover:text-white'}`}>{CATEGORY_LABELS[id]}</button>
            ))}
            <button type="button" onClick={() => setCategory('favorites')} aria-pressed={category === 'favorites'} className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition-all ${category === 'favorites' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'border border-slate-200 bg-white text-slate-500 hover:text-rose-500 dark:border-white/8 dark:bg-white/4 dark:text-slate-400'}`}><Heart size={13} className="mr-1 inline" fill={category === 'favorites' ? 'currentColor' : 'none'} /> 즐겨찾기</button>
          </div>
        </div>
        <p className="mt-3 text-[11px] font-bold text-slate-400">{resultCount}개의 루틴</p>
      </section>

      {resultCount === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 py-20 text-center dark:border-white/12">
          <Search size={28} className="mx-auto text-slate-300 dark:text-slate-600" />
          <h3 className="mt-4 font-bold text-slate-700 dark:text-slate-200">조건에 맞는 루틴이 없어요</h3>
          <p className="mt-1 text-xs text-slate-400">검색어나 필터를 바꿔보세요.</p>
        </div>
      ) : (
        <>
          {presetResults.length > 0 ? (
            <section className="mt-7" aria-labelledby="guided-title">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.16em] text-[#7180f0]">GUIDED SESSIONS</p>
                  <h3 id="guided-title" className="mt-1 text-xl font-bold text-slate-950 dark:text-white">목적별 세션</h3>
                </div>
                <span className="text-[11px] font-bold text-slate-400">뇌파음 선택 가능</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {presetResults.map((preset) => {
                  const visual = getPresetVisual(preset);
                  const favoriteKey = `preset:${preset.id}`;
                  const favorite = favoriteIds.has(favoriteKey);
                  return (
                    <article key={preset.id} className="content-auto group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/8 dark:border-white/8 dark:bg-[#111621]">
                      <button type="button" onClick={() => onOpenPreset(preset)} className={`relative block aspect-[16/8.8] w-full overflow-hidden bg-gradient-to-br ${visual.gradient} text-left`}>
                        {visual.artwork ? <img src={artworkUrl(visual.artwork)} alt="" loading="lazy" decoding="async" width="1000" height="400" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" /> : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/64 via-transparent to-black/12" />
                        <span className="absolute bottom-4 left-4 rounded-full bg-black/28 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">{visual.eyebrow}</span>
                        <span className="absolute bottom-4 right-4 rounded-full bg-white/92 px-3 py-1.5 text-[10px] font-bold text-slate-950">{preset.defaultDurationMinutes}분</span>
                      </button>
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <button type="button" onClick={() => onOpenPreset(preset)} className="min-w-0 text-left">
                            <h4 className="truncate text-lg font-bold text-slate-950 dark:text-white">{visual.text}</h4>
                            <p className="mt-1 line-clamp-2 min-h-9 text-xs leading-relaxed text-slate-400">{preset.description}</p>
                          </button>
                          <button type="button" onClick={() => onToggleFavorite(favoriteKey)} aria-label={favorite ? '즐겨찾기 해제' : '즐겨찾기 추가'} aria-pressed={favorite} className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors ${favorite ? 'bg-rose-50 text-rose-500 dark:bg-rose-500/12' : 'bg-slate-50 text-slate-300 hover:text-rose-500 dark:bg-white/4 dark:text-slate-600'}`}><Heart size={16} fill={favorite ? 'currentColor' : 'none'} /></button>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button type="button" onClick={() => onQuickStartPreset(preset)} className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-950 text-xs font-bold text-white transition-transform active:scale-[0.98] dark:bg-white dark:text-slate-950"><Play size={14} fill="currentColor" /> 바로 시작</button>
                          <button type="button" onClick={() => onOpenPreset(preset)} className="grid min-h-11 w-11 place-items-center rounded-2xl border border-slate-200 text-slate-400 transition-colors hover:text-slate-950 dark:border-white/8 dark:hover:text-white" aria-label="세부 설정"><SlidersHorizontal size={16} /></button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ) : null}

          {ambienceResults.length > 0 ? (
            <section className="mt-10" aria-labelledby="layered-title">
              <div className="mb-4">
                <p className="text-[10px] font-bold tracking-[0.16em] text-emerald-500">LAYERED SOUNDSCAPES</p>
                <h3 id="layered-title" className="mt-1 text-xl font-bold text-slate-950 dark:text-white">공간형 사운드스케이프</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {ambienceResults.map((preset) => {
                  const visual = getAmbienceVisual(preset);
                  const favoriteKey = `ambience:${preset.id}`;
                  const favorite = favoriteIds.has(favoriteKey);
                  return (
                    <article key={preset.id} className={`content-auto relative min-h-[210px] overflow-hidden rounded-3xl bg-gradient-to-br ${visual.gradient} p-5 text-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl`}>
                      <div className="absolute -right-7 -top-8 text-[128px] opacity-[0.14]" aria-hidden="true">{preset.emoji}</div>
                      <div className="relative flex min-h-[170px] flex-col">
                        <div className="flex items-start justify-between">
                          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/13 text-2xl backdrop-blur-md" aria-hidden="true">{preset.emoji}</span>
                          <button type="button" onClick={() => onToggleFavorite(favoriteKey)} aria-label={favorite ? '즐겨찾기 해제' : '즐겨찾기 추가'} aria-pressed={favorite} className="grid h-11 w-11 place-items-center rounded-full bg-black/14 text-white/70 backdrop-blur-md transition-colors hover:text-white"><Heart size={16} fill={favorite ? 'currentColor' : 'none'} /></button>
                        </div>
                        <button type="button" onClick={() => onOpenAmbience(preset)} className="mt-auto text-left">
                          <h4 className="text-lg font-bold">{preset.name}</h4>
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/62">{preset.description}</p>
                        </button>
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <span className="flex items-center gap-2 text-[10px] font-bold text-white/60"><Layers3 size={13} /> {preset.layers.length}개 <Clock3 size={13} /> {preset.durationMinutes}분</span>
                          <button type="button" onClick={() => onQuickStartAmbience(preset)} className="grid h-11 w-11 place-items-center rounded-full bg-white text-slate-950 shadow-lg transition-transform active:scale-95" aria-label={`${preset.name} 바로 시작`}><Play size={15} fill="currentColor" className="ml-0.5" /></button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ) : null}
        </>
      )}
    </div>
  );
};
