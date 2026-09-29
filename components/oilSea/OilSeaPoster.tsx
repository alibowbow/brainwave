import React from 'react';

/** A still of the finished painting, for devices without WebGL 2 or when the scene cannot load. */
export const OIL_SEA_POSTER = 'images/nature/backgrounds/oil-sea-v2.webp';

export const OilSeaPoster: React.FC = () => (
  <img
    className="absolute inset-0 h-full w-full object-cover object-[58%_50%]"
    src={`${import.meta.env.BASE_URL}${OIL_SEA_POSTER}`}
    alt=""
    aria-hidden="true"
    decoding="async"
  />
);

/** The bare canvas the painting starts from, while its code loads. */
export const OilSeaPaper: React.FC = () => <div className="absolute inset-0 bg-[#f1ede3]" />;

/** When the scene's code cannot load (offline before first use), the still stays. */
export const OilSeaFallback: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden bg-[#f1ede3]">
    <OilSeaPoster />
  </div>
);
