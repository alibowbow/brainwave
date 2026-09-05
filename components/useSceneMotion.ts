import { useEffect, useState } from 'react';

/** One motion policy for CSS, event reactions and video in every scene host. */
export function useSceneMotion(active: boolean) {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setAllowed(active && !document.hidden && !query.matches && !document.documentElement.classList.contains('reduce-motion'));
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    query.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    update();
    return () => { observer.disconnect(); query.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); };
  }, [active]);
  return allowed;
}
