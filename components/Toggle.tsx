import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

// Small accessible on/off switch shared across the app.
export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => (
  <button
    type="button"
    onClick={onChange}
    role="switch"
    aria-checked={checked}
    aria-label={label}
    className="relative h-11 w-14 shrink-0 rounded-full"
  >
    <span
      aria-hidden="true"
      className={`absolute left-1 top-1/2 h-6 w-12 -translate-y-1/2 rounded-full transition-colors ${
        checked ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-600'
      }`}
    >
      <span
        className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </span>
  </button>
);
