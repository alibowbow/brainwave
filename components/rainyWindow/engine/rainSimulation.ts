import type { Rng } from './random';

/*
 * Water on a vertical window, in millimetres with y pointing down the glass.
 * Drops bead up, and once heavy enough start to creep, gather the drops in
 * their way and race down, leaving a line of beads and a cleared channel.
 * The behaviour follows Lucas Bebber's well-known raindrop model, rescaled to
 * physical sizes and made independent of frame rate and window area.
 */

/** Reference pixels of the original model expressed in millimetres. */
const K = 0.14;

export interface Drop {
  x: number;
  y: number;
  r: number;
  spreadX: number;
  spreadY: number;
  momentum: number;
  momentumX: number;
  lastSpawn: number;
  nextSpawn: number;
  parent: Drop | null;
  isNew: boolean;
  killed: boolean;
  shrink: number;
  seed: number;
}

/** A circle, or a capsule when `px`/`py` give the previous centre of a moving drop. */
export interface Stamp { x: number; y: number; r: number; px?: number; py?: number }

export interface RainParams {
  minR: number;
  maxR: number;
  maxDrops: number;
  /** New drops per second per square metre at intensity 1. */
  spawnRate: number;
  /** Tiny beads per second per square metre at intensity 1. */
  dropletRate: number;
  dropletSize: [number, number];
  trailRate: number;
  trailScaleRange: [number, number];
  collisionRadius: number;
  collisionRadiusIncrease: number;
  dropFallMultiplier: number;
  collisionBoostMultiplier: number;
  collisionBoost: number;
  cleaningRadius: number;
  /** Converts momentum to travel; higher values make drops race faster. */
  speed: number;
}

export const DEFAULT_RAIN: RainParams = {
  minR: 1.6,
  maxR: 5.2,
  maxDrops: 2600,
  spawnRate: 260,
  dropletRate: 4200,
  dropletSize: [0.35, 0.9],
  trailRate: 1,
  trailScaleRange: [0.22, 0.46],
  collisionRadius: 0.65,
  collisionRadiusIncrease: 0.01,
  dropFallMultiplier: 1.05,
  collisionBoostMultiplier: 0.05,
  collisionBoost: 1,
  cleaningRadius: 0.62,
  speed: 1,
};

const chance = (rng: Rng, probability: number) => rng() <= probability;

export class RainSimulation {
  drops: Drop[] = [];
  /** Beads to stamp this tick; consumed by the renderer. */
  readonly droplets: Stamp[] = [];
  /** Channels wiped by moving drops this tick; consumed by the renderer. */
  readonly clearings: Stamp[] = [];
  intensity = 1;
  private dropletCarry = 0;
  private spawnCarry = 0;
  private grid = new Map<number, Drop[]>();
  private cell = 1;
  /** Live drops including those created during the current tick. */
  private live = 0;

  constructor(public width: number, public height: number, readonly params: RainParams, private readonly rng: Rng) {}

  get deltaR() { return this.params.maxR - this.params.minR; }

  get area() { return (this.width * this.height) / 1_000_000; }

  resize(width: number, height: number, shiftX = 0, shiftY = 0) {
    this.width = width;
    this.height = height;
    for (const drop of this.drops) {
      drop.x += shiftX;
      drop.y += shiftY;
    }
    this.drops = this.drops.filter((drop) => drop.x > -drop.r && drop.x < width + drop.r && drop.y > -drop.r * 3 && drop.y < height + drop.r);
  }

  createDrop(options: Partial<Drop> & Pick<Drop, 'x' | 'y' | 'r'>): Drop | null {
    if (Math.max(this.live, this.drops.length) >= this.params.maxDrops) return null;
    this.live = Math.max(this.live, this.drops.length) + 1;
    return {
      spreadX: 0,
      spreadY: 0,
      momentum: 0,
      momentumX: 0,
      lastSpawn: 0,
      nextSpawn: 0,
      parent: null,
      isNew: true,
      killed: false,
      shrink: 0,
      seed: this.rng(),
      ...options,
    };
  }

  /** Wet the whole pane at once so the first frame already shows a rainy window. */
  seed(count: number) {
    const { minR, maxR } = this.params;
    for (let i = 0; i < count; i++) {
      const r = minR + (maxR - minR) * Math.pow(this.rng(), 3.2) * 0.85;
      const drop = this.createDrop({ x: this.rng() * this.width, y: this.rng() * this.height, r });
      if (drop) {
        drop.isNew = false;
        this.drops.push(drop);
      }
    }
  }

  private random(min: number, max: number, curve?: (n: number) => number) {
    const n = curve ? curve(this.rng()) : this.rng();
    return min + (max - min) * n;
  }

  private spawnRain(timeScale: number): Drop[] {
    const { minR, maxR, spawnRate } = this.params;
    const spawned: Drop[] = [];
    this.spawnCarry += (spawnRate * this.area * this.intensity * timeScale) / 60;
    while (this.spawnCarry >= 1) {
      this.spawnCarry -= 1;
      // Mostly small drops, with the occasional fat one that soon races down.
      const r = this.rng() < 0.015 ? maxR * this.random(1.05, 1.3) : this.random(minR, maxR, (n) => Math.pow(n, 3));
      const drop = this.createDrop({
        x: this.random(0, this.width),
        y: this.random(-0.05 * this.height, 0.98 * this.height),
        r,
        momentum: (1 + (r - minR) * 0.1 / K + this.random(0, 2)) * K * 0.5,
        spreadX: 1.4,
        spreadY: 1.4,
      });
      if (drop) spawned.push(drop);
    }
    return spawned;
  }

  private spawnDroplets(timeScale: number) {
    const { dropletRate, dropletSize } = this.params;
    this.dropletCarry += (dropletRate * this.area * Math.min(1.4, 0.2 + this.intensity) * timeScale) / 60;
    while (this.dropletCarry >= 1) {
      this.dropletCarry -= 1;
      this.droplets.push({ x: this.rng() * this.width, y: this.rng() * this.height, r: this.random(dropletSize[0], dropletSize[1], (n) => n * n) });
    }
  }

  private buildGrid() {
    this.cell = this.params.maxR * 3.2;
    this.grid.clear();
    for (const drop of this.drops) {
      if (drop.killed) continue;
      const key = this.key(Math.floor(drop.x / this.cell), Math.floor(drop.y / this.cell));
      const bucket = this.grid.get(key);
      if (bucket) bucket.push(drop);
      else this.grid.set(key, [drop]);
    }
  }

  private key(cx: number, cy: number) {
    return (cy + 1024) * 4096 + (cx + 1024);
  }

  /** Advance one tick (1/60 s) scaled by `timeScale`. */
  step(timeScale = 1) {
    const p = this.params;
    this.droplets.length = 0;
    this.clearings.length = 0;
    this.live = this.drops.length;
    this.spawnDroplets(timeScale);
    const fresh = this.spawnRain(timeScale);
    this.drops.push(...fresh);
    this.buildGrid();

    const next: Drop[] = [];
    for (const drop of this.drops) {
      if (drop.killed) continue;

      // Heavier drops overcome pinning more often and start to creep down.
      if (chance(this.rng, (drop.r - p.minR * p.dropFallMultiplier) * (0.1 / this.deltaR) * timeScale)) {
        drop.momentum += this.random(0, (drop.r / p.maxR) * 4) * K;
      }
      if (drop.r <= p.minR && chance(this.rng, 0.05 * timeScale)) drop.shrink += 0.01 * K;
      drop.r -= drop.shrink * timeScale;
      if (drop.r <= 0.05) drop.killed = true;

      // Moving drops shed a line of beads behind them.
      drop.lastSpawn += drop.momentum * timeScale * p.trailRate;
      if (!drop.killed && drop.lastSpawn > drop.nextSpawn) {
        const trail = this.createDrop({
          x: drop.x + this.random(-drop.r, drop.r) * 0.1,
          y: drop.y - drop.r * 0.01,
          r: drop.r * this.random(p.trailScaleRange[0], p.trailScaleRange[1]),
          spreadY: (drop.momentum / K) * 0.1,
          parent: drop,
        });
        if (trail) {
          next.push(trail);
          drop.r *= Math.pow(0.97, timeScale);
          drop.lastSpawn = 0;
          drop.nextSpawn = this.random(p.minR, p.maxR) - drop.momentum * 2 * p.trailRate + (p.maxR - drop.r);
        }
      }

      drop.spreadX *= Math.pow(0.4, timeScale);
      drop.spreadY *= Math.pow(0.7, timeScale);

      const moved = drop.momentum > 0;
      const previousX = drop.x;
      const previousY = drop.y;
      if (moved && !drop.killed) {
        drop.y += drop.momentum * p.speed * timeScale;
        drop.x += drop.momentumX * p.speed * timeScale;
        if (drop.y > this.height + drop.r) drop.killed = true;
      }

      if ((moved || drop.isNew) && !drop.killed) this.collide(drop, timeScale);
      drop.isNew = false;

      drop.momentum -= Math.max(K, p.minR * 0.5 - drop.momentum) * 0.1 * timeScale;
      if (drop.momentum < 0) drop.momentum = 0;
      drop.momentumX *= Math.pow(0.7, timeScale);

      if (drop.killed) this.live--;
      if (!drop.killed) {
        next.push(drop);
        if (moved) this.clearings.push({ x: drop.x, y: drop.y, r: drop.r * p.cleaningRadius, px: previousX, py: previousY });
      }
    }
    this.drops = next;
    this.live = next.length;
  }

  private collide(drop: Drop, timeScale: number) {
    const p = this.params;
    const cx = Math.floor(drop.x / this.cell);
    const cy = Math.floor(drop.y / this.cell);
    for (let oy = -1; oy <= 1; oy++) {
      for (let ox = -1; ox <= 1; ox++) {
        const bucket = this.grid.get(this.key(cx + ox, cy + oy));
        if (!bucket) continue;
        for (const other of bucket) {
          if (other === drop || other.killed || drop.r <= other.r || drop.parent === other || other.parent === drop) continue;
          const dx = other.x - drop.x;
          const dy = other.y - drop.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const reach = (drop.r + other.r) * (p.collisionRadius + (drop.momentum / K) * p.collisionRadiusIncrease * timeScale);
          if (distance >= reach) continue;
          const area = Math.PI * drop.r * drop.r + Math.PI * other.r * other.r * 0.8;
          const targetR = Math.min(Math.sqrt(area / Math.PI), p.maxR * 1.35);
          drop.r = targetR;
          drop.momentumX += dx * 0.1;
          drop.spreadX = 0;
          drop.spreadY = 0;
          other.killed = true;
          drop.momentum = Math.max(other.momentum, Math.min(40 * K, drop.momentum + targetR * p.collisionBoostMultiplier + p.collisionBoost * K));
        }
      }
    }
  }
}
