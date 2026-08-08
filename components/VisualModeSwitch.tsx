import React from 'react';
import { Activity, Check, Leaf } from 'lucide-react';
import type { VisualMode } from '../types';

interface Props {
  value: VisualMode;
  onChange: (mode: VisualMode) => void;
  className?: string;
  quiet?: boolean;
  compact?: boolean;
}

const OPTIONS: Array<{ value: VisualMode; label: string; Icon: typeof Leaf }> = [
  { value: 'nature', label: '자연 보기', Icon: Leaf },
  { value: 'graphics', label: '그래픽 보기', Icon: Activity },
];

export const VisualModeSwitch: React.FC<Props> = ({ value, onChange, className = '', quiet = false, compact = false }) => (
  <div
    role="group"
    aria-label="보기 모드"
    className={`grid grid-cols-2 border border-white/15 bg-[#07100d]/78 shadow-[0_16px_42px_rgba(0,0,0,0.28)] backdrop-blur-xl ${compact ? 'w-[min(238px,calc(100vw-88px))] gap-0.5 rounded-full p-1' : 'w-[min(310px,calc(100vw-32px))] gap-1 rounded-2xl p-1.5'} ${quiet ? 'opacity-95' : ''} ${className}`}
  >
    {OPTIONS.map(({ value: option, label, Icon }) => {
      const selected = value === option;
      return (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={selected}
          className={`flex items-center justify-center font-bold transition-[background-color,color,box-shadow,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07100d] active:scale-[0.98] ${compact ? 'min-h-10 gap-1.5 rounded-full px-2.5 text-[11px]' : 'min-h-11 gap-2 rounded-xl px-3 text-xs'} ${
            selected
              ? 'bg-[#edf6e9] text-[#17331f] shadow-sm'
              : 'text-white/68 hover:bg-white/9 hover:text-white'
          }`}
        >
          <Icon size={15} strokeWidth={selected ? 2.5 : 2} aria-hidden="true" />
          <span>{label}</span>
          {selected && !compact ? <Check size={13} strokeWidth={2.7} aria-hidden="true" /> : null}
        </button>
      );
    })}
  </div>
);
