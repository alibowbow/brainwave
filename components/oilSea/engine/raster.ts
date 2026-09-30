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
