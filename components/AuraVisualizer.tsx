import React, { useEffect, useRef } from 'react';

interface Props {
  getAnalyser: () => AnalyserNode | null;
  active: boolean;
  color: string;
  className?: string;
}

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

// A living "aura": reads the engine's AnalyserNode each frame and renders a
// pulsing, additive energy field on a canvas. Bass drives the core swell,
// per-bin energy deforms three rotating blobs. Falls back to a static glow when
// the user prefers reduced motion.
export const AuraVisualizer: React.FC<Props> = ({ getAnalyser, active, color, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef({ bass: 0, energy: 0, phase: 0, smooth: new Float32Array(64) });
  const propsRef = useRef({ getAnalyser, active, color });
  propsRef.current = { getAnalyser, active, color };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const N = 64;
    const freq = new Uint8Array(256);
    let w = 0, h = 0, dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
    };

    const draw = () => {
      const st = stateRef.current;
      const { getAnalyser: getA, active: isOn, color: col } = propsRef.current;
      const rgb = hexToRgb(col);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const analyser = getA();
      let bassT = 0, energyT = 0;
      if (analyser && isOn) {
        const bins = Math.min(freq.length, analyser.frequencyBinCount);
        analyser.getByteFrequencyData(freq);
        let bSum = 0; for (let i = 0; i < 8; i++) bSum += freq[i];
        bassT = bSum / (8 * 255);
        let eSum = 0; for (let i = 0; i < bins; i++) eSum += freq[i];
        energyT = eSum / (bins * 255);
        for (let i = 0; i < N; i++) {
          const bin = Math.floor((Math.min(i, N - i) / (N / 2)) * bins * 0.7);
          st.smooth[i] += (freq[bin] / 255 - st.smooth[i]) * 0.25;
        }
      } else {
        for (let i = 0; i < N; i++) st.smooth[i] += -st.smooth[i] * 0.06;
      }
      st.bass += (bassT - st.bass) * 0.15;
      st.energy += (energyT - st.energy) * 0.1;
      st.phase += 0.0025 + st.energy * 0.004;

      const cx = w / 2, cy = h / 2;
      const baseR = Math.min(w, h) * 0.3;
      const breathe = Math.sin(st.phase * 2) * 0.5 + 0.5;
      const idle = isOn ? 0 : 0.08 + breathe * 0.05;
      const glow = Math.min(1, st.energy * 1.5 + idle);

      // Outer radial glow
      const gR = baseR * (1.5 + st.bass * 0.9);
      const og = ctx.createRadialGradient(cx, cy, baseR * 0.2, cx, cy, gR);
      og.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.28 * glow + 0.05})`);
      og.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
      ctx.fillStyle = og;
      ctx.fillRect(0, 0, w, h);

      // Additive energy blobs
      ctx.globalCompositeOperation = 'lighter';
      const layers = [
        { rot: st.phase, amp: 0.55, a: 0.5 },
        { rot: -st.phase * 0.7 + 1.2, amp: 0.4, a: 0.3 },
        { rot: st.phase * 0.4 + 3, amp: 0.3, a: 0.2 },
      ];
      const lr = Math.min(255, rgb.r + 60), lg = Math.min(255, rgb.g + 60), lb = Math.min(255, rgb.b + 60);
      for (const L of layers) {
        ctx.beginPath();
        for (let i = 0; i <= N; i++) {
          const idx = i % N;
          const ang = (idx / N) * Math.PI * 2 + L.rot;
          const r = baseR * (0.82 + st.bass * 0.35 + breathe * 0.04) + st.smooth[idx] * baseR * L.amp;
          const x = cx + Math.cos(ang) * r;
          const y = cy + Math.sin(ang) * r;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        const bg = ctx.createRadialGradient(cx, cy, baseR * 0.1, cx, cy, baseR * 1.5);
        bg.addColorStop(0, `rgba(${lr},${lg},${lb},${L.a})`);
        bg.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
        ctx.fillStyle = bg;
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';

      if (!reduced) rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(() => { resize(); if (reduced) draw(); });
    ro.observe(canvas);

    if (reduced) draw();
    else rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};
