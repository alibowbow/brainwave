import React, { useMemo } from 'react';
import { Activity, Gauge, Info, Sparkles } from 'lucide-react';
import { getWaveColor, getWaveShortLabel } from '../../audioOptions';
import { type BrainWaveType, WAVE_FREQS } from '../../types';

interface Props {
  wave: BrainWaveType;
  enabled: boolean;
  onWaveChange: (wave: BrainWaveType) => void;
}

interface WaveInfo {
  range: string;
  character: string;
  description: string;
  recommendedFor: string;
  cycles: number;
}

const WAVE_INFO: Record<BrainWaveType, WaveInfo> = {
  delta: {
    range: '0.5–4 Hz',
    character: '아주 느린 리듬',
    description: '깊은 수면에서 두드러지는 가장 느린 뇌파 대역입니다.',
    recommendedFor: '수면 준비 · 깊은 휴식',
    cycles: 2,
  },
  theta: {
    range: '4–8 Hz',
    character: '느슨한 주의의 리듬',
    description: '졸림이나 깊은 이완, 내적인 이미지 활동에서 자주 관찰됩니다.',
    recommendedFor: '명상 · 긴장 완화',
    cycles: 3.5,
  },
  alpha: {
    range: '8–12 Hz',
    character: '편안한 각성의 리듬',
    description: '눈을 감고 편안히 깨어 있을 때 두드러지는 대역입니다.',
    recommendedFor: '차분한 집중 · 휴식',
    cycles: 5,
  },
  beta: {
    range: '13–30 Hz',
    character: '활동적인 사고의 리듬',
    description: '문제 해결이나 외부 과제에 주의를 기울일 때 흔히 관찰됩니다.',
    recommendedFor: '업무 · 학습',
    cycles: 8,
  },
  gamma: {
    range: '30–80 Hz',
    character: '빠른 정보 통합의 리듬',
    description: '복합적인 감각·인지 처리와 함께 연구되는 빠른 대역입니다.',
    recommendedFor: '짧은 몰입 · 각성',
    cycles: 12,
  },
};

const SPECTRUM_ORDER: BrainWaveType[] = ['delta', 'theta', 'alpha', 'beta', 'gamma'];

const makeWavePath = (cycles: number) => {
  const pointCount = 72;
  return Array.from({ length: pointCount }, (_, index) => {
    const ratio = index / (pointCount - 1);
    const x = ratio * 320;
    const y = 40 - Math.sin(ratio * Math.PI * 2 * cycles) * 18;
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
};

export const BrainwaveGuide: React.FC<Props> = ({ wave, enabled, onWaveChange }) => {
  const info = WAVE_INFO[wave];
  const color = getWaveColor(wave);
  const path = useMemo(() => makeWavePath(info.cycles), [info.cycles]);

  return (
    <section
      className={`mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white/70 transition-opacity dark:border-white/10 dark:bg-slate-900/70 ${enabled ? '' : 'opacity-55'}`}
      aria-labelledby="brainwave-guide-title"
    >
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(260px,0.82fr)_minmax(0,1.18fr)] lg:items-center">
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="flex items-center gap-1.5 text-[9px] font-black tracking-[0.15em] text-primary-500"><Activity size={13} /> BRAINWAVE GUIDE</p>
              <h2 id="brainwave-guide-title" className="mt-1 text-base font-semibold text-slate-950 dark:text-white">뇌파 리듬 한눈에 보기</h2>
            </div>
            <span className="shrink-0 rounded-full bg-primary-50 px-2.5 py-1 text-[10px] font-bold text-primary-700 dark:bg-primary-500/15 dark:text-primary-300">
              {getWaveShortLabel(wave)} · {WAVE_FREQS[wave].beat} Hz
            </span>
          </div>

          <div className="relative mt-3 overflow-hidden rounded-xl bg-slate-950 px-3 py-2.5" role="img" aria-label={`${getWaveShortLabel(wave)} 리듬 파형, 앱 재생값 ${WAVE_FREQS[wave].beat}헤르츠`}>
            <svg viewBox="0 0 320 80" className="h-[82px] w-full" aria-hidden="true" preserveAspectRatio="none">
              <path d="M 0 40 L 320 40" stroke="rgba(148, 163, 184, 0.22)" strokeWidth="1" />
              <path d={path} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="absolute bottom-2.5 left-3 text-[9px] font-bold text-slate-400">느림</span>
            <span className="absolute bottom-2.5 right-3 text-[9px] font-bold text-slate-400">빠름</span>
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300"><Sparkles size={17} /></span>
            <div>
              <strong className="text-sm font-bold text-slate-950 dark:text-white">{info.character}</strong>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{info.description}</p>
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-slate-200 py-3 sm:grid-cols-3 dark:border-white/10">
            <div>
              <dt className="text-[9px] font-bold text-slate-400">일반적인 뇌파 범위</dt>
              <dd className="mt-1 text-xs font-bold tabular-nums text-slate-900 dark:text-white">{info.range}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1 text-[9px] font-bold text-slate-400"><Gauge size={11} /> 앱 재생 리듬</dt>
              <dd className="mt-1 text-xs font-bold tabular-nums text-slate-900 dark:text-white">{WAVE_FREQS[wave].beat} Hz</dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-[9px] font-bold text-slate-400">추천 상황</dt>
              <dd className="mt-1 text-xs font-bold text-slate-900 dark:text-white">{info.recommendedFor}</dd>
            </div>
          </dl>

          <div className="mt-3">
            <div className="mb-2 flex items-center justify-between gap-3 text-[9px] font-bold text-slate-400">
              <span>느린 휴식</span><span>빠른 각성</span>
            </div>
            <div className="grid grid-cols-5 gap-1" role="group" aria-label="뇌파 대역 비교">
              {SPECTRUM_ORDER.map((item) => {
                const selected = wave === item;
                return (
                  <button
                    key={item}
                    type="button"
                    disabled={!enabled}
                    onClick={() => onWaveChange(item)}
                    aria-pressed={selected}
                    aria-label={`${getWaveShortLabel(item)}, 일반 범위 ${WAVE_INFO[item].range}`}
                    className={`min-h-12 min-w-0 rounded-lg border px-1 py-1.5 text-center transition-colors ${selected
                      ? 'border-primary-400 bg-primary-50 text-primary-700 dark:border-primary-400/60 dark:bg-primary-500/15 dark:text-primary-200'
                      : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-primary-300 hover:text-slate-900 dark:border-white/8 dark:bg-white/[0.035] dark:text-slate-400 dark:hover:border-primary-400/40 dark:hover:text-white'}`}
                  >
                    <span className="mx-auto mb-1 block h-1 w-5 rounded-full" style={{ backgroundColor: getWaveColor(item) }} aria-hidden="true" />
                    <span className="block truncate text-[10px] font-bold">{getWaveShortLabel(item)}</span>
                    <span className="mt-0.5 block whitespace-nowrap text-[8px] font-semibold opacity-70">{WAVE_INFO[item].range.replace(' Hz', '')}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <p className="flex items-start gap-2 border-t border-slate-200 px-4 py-3 text-[9px] leading-relaxed text-slate-500 sm:px-5 dark:border-white/10 dark:text-slate-400">
        <Info size={12} className="mt-0.5 shrink-0" /> 일반적인 EEG 대역을 설명한 안내입니다. 이 앱은 뇌파를 측정하지 않으며 치료 효과를 보장하지 않습니다.
      </p>
    </section>
  );
};
