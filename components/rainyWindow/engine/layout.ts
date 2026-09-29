/**
 * World layout of the study, in metres. The desk top is y = 0 and the camera
 * looks down -z through the window. Everything the camera can frame is
 * defined here so the framing, the shadow camera and the rain area agree.
 */
export const GLASS_Z = -0.5;
export const GLASS_BOTTOM = 0.078;
export const GLASS_TOP = 2.7;
export const GLASS_HALF_WIDTH = 3.4;
export const MULLION_X = [-0.37, 0.5] as const;
export const MULLION_WIDTH = 0.056;

export const CAMERA_POSITION = { x: 0.015, y: 0.235, z: 0.78 } as const;

export const LAMP_BASE = { x: 0.445, z: -0.33 } as const;
export const MUG_POSITION = { x: 0.262, z: -0.085 } as const;
export const PLANT_POSITION = { x: -0.56, z: -0.3 } as const;
export const VASE_POSITION = { x: -0.365, z: -0.37 } as const;

/** Height of the viewer above the river, used by the city backdrop. */
export const CITY_EYE_HEIGHT = 34;

export interface CameraFrame {
  /** Vertical field of view in degrees. */
  fov: number;
  target: { x: number; y: number; z: number };
}

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const DEG = Math.PI / 180;

/**
 * One fixed shot that survives every screen shape: wide screens see the whole
 * desk, portrait phones keep a guaranteed horizontal view and slide the frame
 * toward the lamp and mug so the warm light never leaves the picture.
 */
export function frameForAspect(aspect: number): CameraFrame {
  const safeAspect = Math.min(3.2, Math.max(0.35, aspect || 1));
  const landscape = smoothstep(0.46, 1.78, safeAspect);
  const minHorizontalFov = lerp(28, 60, landscape);
  const fovForWidth = 2 * Math.atan(Math.tan((minHorizontalFov * DEG) / 2) / safeAspect) / DEG;
  // Ultra-wide screens keep a cinema-like vertical view instead of growing wider.
  const fov = Math.min(60, Math.max(safeAspect > 2 ? 33 : 36, fovForWidth));
  return {
    fov,
    target: {
      x: lerp(0.25, 0.02, landscape),
      y: lerp(0.262, 0.252, landscape),
      z: GLASS_Z,
    },
  };
}
