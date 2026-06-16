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
    className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 ${
      checked ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-600'
    }`}
  >
    <div
      className={`w-4 h-4 bg-white rounded-full transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-0'
      }`}
    />
  </button>
);
