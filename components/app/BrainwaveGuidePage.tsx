import React from 'react';
import { ArrowRight, BrainCircuit, Headphones, RadioTower, SlidersHorizontal } from 'lucide-react';
import { getWaveShortLabel } from '../../audioOptions';
import { type BrainWaveType } from '../../types';
import { BrainwaveGuide } from '../session/BrainwaveGuide';

interface Props {
  wave: BrainWaveType;
  onWaveChange: (wave: BrainWaveType) => void;
  onCreateSound: () => void;
}

export const BrainwaveGuidePage: React.FC<Props> = ({ wave, onWaveChange, onCreateSound }) => (
  <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
    <header className="relative isolate overflow-hidden rounded-[26px] border border-indigo-300/15 bg-slate-950 px-5 py-7 text-white shadow-xl shadow-slate-950/15 sm:px-7 sm:py-9 lg:px-9 lg:py-10">
      <img
        src={new URL('images/guide/brainwave-guide-hero-v1.webp', document.baseURI).toString()}
        alt=""
        width="1600"
        height="854"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[62%_center] sm:object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/88 to-indigo-950/30" aria-hidden="true" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.56fr)] lg:items-end">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-black tracking-[0.18em] text-indigo-300">
            <BrainCircuit size={15} /> BRAINWAVE GUIDE
          </p>
          <h1 className="mt-2 max-w-3xl text-[32px] font-semibold leading-[1.12] tracking-[-0.045em] text-white sm:text-[42px]">
            뇌파 리듬, 알고 고르기
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
            뇌파는 뇌의 전기 활동에서 관찰되는 리듬을 주파수 대역으로 묶어 부르는 이름입니다. 아래 다섯 대역을 눌러 속도와 쓰임을 비교해 보세요.
          </p>
        </div>

        <aside className="rounded-2xl border border-white/12 bg-slate-950/68 p-4 backdrop-blur-sm" aria-label="앱의 뇌파 리듬 안내">
          <p className="text-[10px] font-black tracking-[0.13em] text-indigo-300">이 앱이 하는 일</p>
          <p className="mt-2 text-xs leading-relaxed text-slate-300">
            EEG를 측정하는 대신 선택한 대역에 맞춘 오디오 박동과 자연음을 조합합니다. 편안한 낮은 볼륨에서 사용하세요.
          </p>
        </aside>
      </div>
    </header>

    <BrainwaveGuide wave={wave} enabled onWaveChange={onWaveChange} />

    <section className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr_1.25fr]" aria-label="재생 방식과 다음 단계">
      <article className="flex min-h-[116px] items-start gap-3 rounded-2xl border border-slate-200 bg-white/65 p-4 dark:border-white/10 dark:bg-white/[0.035]">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300"><Headphones size={18} /></span>
        <div>
          <h2 className="text-sm font-bold text-slate-950 dark:text-white">바이노럴</h2>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">좌우 귀에 다른 음을 보내 차이만큼의 리듬을 느끼게 합니다. 스테레오 이어폰이 필요합니다.</p>
        </div>
      </article>

      <article className="flex min-h-[116px] items-start gap-3 rounded-2xl border border-slate-200 bg-white/65 p-4 dark:border-white/10 dark:bg-white/[0.035]">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600 dark:bg-white/8 dark:text-slate-300"><RadioTower size={18} /></span>
        <div>
          <h2 className="text-sm font-bold text-slate-950 dark:text-white">아이소크로닉</h2>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">한 음의 크기를 일정하게 반복해 박동을 만듭니다. 스피커로도 리듬을 들을 수 있습니다.</p>
        </div>
      </article>

      <article className="flex min-h-[116px] flex-col justify-between rounded-2xl bg-slate-950 p-4 text-white dark:bg-slate-900">
        <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.12em] text-primary-300"><SlidersHorizontal size={14} /> NEXT STEP</div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch xl:flex-row xl:items-end">
          <div>
            <p className="text-[11px] text-slate-400">현재 선택</p>
            <strong className="mt-0.5 block text-lg font-bold">{getWaveShortLabel(wave)} 리듬</strong>
          </div>
          <button type="button" onClick={onCreateSound} className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 text-xs font-bold text-white transition-colors hover:bg-primary-500">
            이 리듬으로 만들기 <ArrowRight size={15} />
          </button>
        </div>
      </article>
    </section>
  </div>
);
