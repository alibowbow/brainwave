import React from 'react';

/** A still of the study, shown while the 3D scene loads and on devices without WebGL 2. */
export const RAINY_WINDOW_POSTER = 'images/nature/backgrounds/focus-window-v1.webp';

export const RainyWindowPoster: React.FC = () => (
  <img
    className="absolute inset-0 h-full w-full object-cover object-[68%_50%]"
    src={`${import.meta.env.BASE_URL}${RAINY_WINDOW_POSTER}`}
    alt=""
    aria-hidden="true"
    decoding="async"
  />
);

/** Placeholder with the same framing as the live scene. */
export const RainyWindowFallback: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden bg-[#050a14]">
    <RainyWindowPoster />
  </div>
);
