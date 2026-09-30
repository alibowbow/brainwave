import * as THREE from 'three';

/**
 * A small image drawn on the CPU, straight into a texture. For images made
 * of many thousands of dabs this is far quicker than a 2D canvas, whose
 * drawing is replayed (and on some devices rasterised slowly) when the
 * texture is uploaded. y runs down the image, as on a canvas.
 */
export class Raster {
  readonly data: Uint8Array;

  constructor(readonly width: number, readonly height: number) {
    this.data = new Uint8Array(width * height * 4);
  }

  /** An opaque filled ellipse turned by `angle` (radians), colour in 0..255. */
  ellipse(cx: number, cy: number, rx: number, ry: number, angle: number, r: number, g: number, b: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const reach = Math.max(rx, ry);
    const x0 = Math.max(0, Math.floor(cx - reach));
    const x1 = Math.min(this.width - 1, Math.ceil(cx + reach));
    const y0 = Math.max(0, Math.floor(cy - reach));
    const y1 = Math.min(this.height - 1, Math.ceil(cy + reach));
    for (let y = y0; y <= y1; y++) {
      const dy = y + 0.5 - cy;
      // Rows are stored bottom up, so the texture's v runs up the image.
      const row = (this.height - 1 - y) * this.width;
      for (let x = x0; x <= x1; x++) {
        const dx = x + 0.5 - cx;
        const u = (dx * cos + dy * sin) / rx;
        const v = (-dx * sin + dy * cos) / ry;
        if (u * u + v * v > 1) continue;
        const i = (row + x) * 4;
        this.data[i] = r;
        this.data[i + 1] = g;
        this.data[i + 2] = b;
        this.data[i + 3] = 255;
      }
    }
  }

  /** A line of round dabs from one point to another, tapering from `w0` to `w1` wide. */
  stroke(xa: number, ya: number, xb: number, yb: number, w0: number, w1: number, r: number, g: number, b: number) {
    const length = Math.hypot(xb - xa, yb - ya);
    const steps = Math.max(1, Math.ceil(length / Math.max(0.5, Math.min(w0, w1) * 0.35)));
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const w = (w0 + (w1 - w0) * t) / 2;
      this.ellipse(xa + (xb - xa) * t, ya + (yb - ya) * t, w, w, 0, r, g, b);
    }
  }

  /** See {@link bleed}. */
  bleed() {
    bleed(this.data, this.width, this.height);
  }

  texture() {
    const texture = new THREE.DataTexture(this.data, this.width, this.height, THREE.RGBAFormat);
    texture.colorSpace = THREE.NoColorSpace;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.needsUpdate = true;
    return texture;
  }
}

/**
 * Give the empty pixels round the drawing the colour of the drawing beside
 * them (they stay transparent), so that when the image is filtered or
 * shrunk its edges keep their colour instead of darkening towards black.
 */
export function bleed(data: Uint8Array, width: number, height: number) {
  const filled = new Uint8Array(width * height);
  let red = 0;
  let green = 0;
  let blue = 0;
  let count = 0;
  for (let i = 0; i < filled.length; i++) {
    if (data[i * 4 + 3] === 0) continue;
    filled[i] = 1;
    red += data[i * 4];
    green += data[i * 4 + 1];
    blue += data[i * 4 + 2];
    count++;
  }
  const copy = (to: number, from: number) => {
    data[to * 4] = data[from * 4];
    data[to * 4 + 1] = data[from * 4 + 1];
    data[to * 4 + 2] = data[from * 4 + 2];
  };
  // Along each row, from the nearest drawn pixel either side.
  const coloured = filled.slice();
  for (let y = 0; y < height; y++) {
    const row = y * width;
    let last = -1;
    const nearestLeft = new Int32Array(width).fill(-1);
    for (let x = 0; x < width; x++) {
      if (filled[row + x]) last = x;
      nearestLeft[x] = last;
    }
    last = -1;
    for (let x = width - 1; x >= 0; x--) {
      if (filled[row + x]) {
        last = x;
        continue;
      }
      const left = nearestLeft[x];
      const from = left < 0 ? last : last < 0 ? left : x - left <= last - x ? left : last;
      if (from < 0) continue;
      copy(row + x, row + from);
      coloured[row + x] = 1;
    }
  }
  // Then down and up each column, for rows with nothing drawn in them.
  for (let x = 0; x < width; x++) {
    let last = -1;
    const nearestAbove = new Int32Array(height).fill(-1);
    for (let y = 0; y < height; y++) {
      if (coloured[y * width + x]) last = y;
      nearestAbove[y] = last;
    }
    last = -1;
    for (let y = height - 1; y >= 0; y--) {
      const i = y * width + x;
      if (coloured[i]) {
        last = y;
        continue;
      }
      const above = nearestAbove[y];
      const from = above < 0 ? last : last < 0 ? above : y - above <= last - y ? above : last;
      if (from >= 0) copy(i, from * width + x);
      else if (count) {
        data[i * 4] = red / count;
        data[i * 4 + 1] = green / count;
        data[i * 4 + 2] = blue / count;
      }
    }
  }
}
