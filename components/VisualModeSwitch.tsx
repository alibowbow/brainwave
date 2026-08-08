import React from 'react';
import { Activity, Check, Leaf } from 'lucide-react';
import type { VisualMode } from '../types';

interface Props {
  value: VisualMode;
  onChange: (mode: VisualMode) => void;
  className?: string;
  quiet?: boolean;
}

const OPTIONS: Array<{ value: VisualMode; label: string; Icon: typeof Leaf }> = [
  { value: 'nature', label: '자연 보기', Icon: Leaf },
  { value: 'graphics', label: '그래픽 보기', Icon: Activity },
];

export const VisualModeSwitch: React.FC<Props> = ({ value, onChange, className = '', quiet = false }) => (
  <div
    role="group"
    aria-label="보기 모드"
    className={`grid w-[min(310px,calc(100vw-32px))] grid-cols-2 gap-1 rounded-2xl border border-white/15 bg-[#07100d]/78 p-1.5 shadow-[0_16px_42px_rgba(0,0,0,0.28)] backdrop-blur-xl ${quiet ? 'opacity-95' : ''} ${className}`}
  >
    {OPTIONS.map(({ value: option, label, Icon }) => {
      const selected = value === option;
      return (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={selected}
          className={`flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-xs font-bold transition-[background-color,color,box-shadow,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07100d] active:scale-[0.98] ${
            selected
              ? 'bg-[#edf6e9] text-[#17331f] shadow-sm'
              : 'text-white/68 hover:bg-white/9 hover:text-white'
          }`}
        >
          <Icon size={15} strokeWidth={selected ? 2.5 : 2} aria-hidden="true" />
          <span>{label}</span>
          {selected ? <Check size={13} strokeWidth={2.7} aria-hidden="true" /> : null}
        </button>
      );
    })}
  </div>
);
