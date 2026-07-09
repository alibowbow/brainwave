import React, { useId } from 'react';

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  emphasized?: boolean;
}

export const VolumeSlider: React.FC<Props> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
  disabled = false,
  emphasized = false,
}) => {
  const id = useId();
  const safeValue = Math.max(min, Math.min(max, value));
  const fill = ((safeValue - min) / Math.max(0.0001, max - min)) * 100;
  const percentage = Math.round(safeValue * 100);

  return (
    <div className={`flex min-h-11 items-center gap-3 ${disabled ? 'opacity-40' : ''}`}>
      <label
        htmlFor={id}
        className={`w-20 shrink-0 text-xs ${emphasized ? 'font-bold text-primary-600 dark:text-primary-400' : 'font-semibold text-slate-600 dark:text-slate-300'}`}
      >
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={safeValue}
        disabled={disabled}
        aria-valuetext={`${percentage}%`}
        onChange={(event) => onChange(Number(event.target.value))}
        className="volume-range min-w-0 flex-1 cursor-pointer disabled:cursor-not-allowed"
        style={{ '--range-progress': `${fill}%` } as React.CSSProperties}
      />
      <output htmlFor={id} className="w-11 text-right text-xs font-bold tabular-nums text-slate-500 dark:text-slate-300">
        {percentage}%
      </output>
    </div>
  );
};
