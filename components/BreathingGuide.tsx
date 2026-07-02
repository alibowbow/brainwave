import React, { useEffect, useState } from 'react';

// Box breathing (4-4-4-4): the ring expands over the inhale, holds, contracts
// over the exhale, holds. Transition duration equals the phase length so the
// motion itself paces the breath.
const PHASES = [
  { label: '들이쉬기', dur: 4, scale: 1.06 },
  { label: '멈추기', dur: 4, scale: 1.06 },
  { label: '내쉬기', dur: 4, scale: 0.85 },
  { label: '멈추기', dur: 4, scale: 0.85 },
] as const;

interface Props {
  active: boolean;
}

// Renders inside the player's (relative) timer-circle container.
export const BreathingGuide: React.FC<Props> = ({ active }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!active) {
      setIdx(0);
      return;
    }
    const id = window.setTimeout(() => setIdx((i) => (i + 1) % PHASES.length), PHASES[idx].dur * 1000);
    return () => clearTimeout(id);
  }, [idx, active]);

  if (!active) return null;
  const phase = PHASES[idx];

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-3 rounded-full border-2 border-primary-400/60 transition-transform ease-in-out"
        style={{ transform: `scale(${phase.scale})`, transitionDuration: `${phase.dur}s` }}
      />
      <div className="absolute bottom-9 inset-x-0 text-center text-sm font-medium text-primary-600 dark:text-primary-300" aria-live="polite">
        {phase.label}
      </div>
    </>
  );
};
