"use client";
import { useEffect, useMemo, useRef } from "react";

// Fibonacci-sphere tag cloud, projected with plain DOM transforms.
export default function SkillGlobe({ items }) {
  const wrap = useRef(null);
  const nodes = useRef([]);
  const state = useRef({ ax: 0.25, ay: 0, vx: 0.0016, vy: 0.0035, drag: false, lx: 0, ly: 0, visible: true });

  const points = useMemo(() => {
    const n = items.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return items.map((label, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      return { label, x: Math.cos(t) * r, y, z: Math.sin(t) * r };
    });
  }, [items]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = state.current;
    if (reduce) {
      s.vx = 0;
      s.vy = 0;
    }

    const io = new IntersectionObserver(([e]) => (s.visible = e.isIntersecting));
    io.observe(el);

    let id;
    const tick = () => {
      id = requestAnimationFrame(tick);
      if (!s.visible) return;
      if (!s.drag) {
        s.ay += s.vy;
        s.ax += s.vx;
        // ease back toward idle spin after a fling
        s.vy += ((reduce ? 0 : 0.0035) - s.vy) * 0.02;
        s.vx += ((reduce ? 0 : 0.0016) - s.vx) * 0.02;
      }
      const R = el.clientWidth * 0.4;
      const cx = Math.cos(s.ax), sx = Math.sin(s.ax);
      const cy = Math.cos(s.ay), sy = Math.sin(s.ay);
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const node = nodes.current[i];
        if (!node) continue;
        // rotate Y then X
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const depth = (z2 + 1) / 2; // 0 back, 1 front
        const scale = 0.55 + depth * 0.65;
        node.style.transform = `translate(-50%, -50%) translate3d(${x1 * R}px, ${y2 * R}px, 0) scale(${scale})`;
        node.style.opacity = String(0.15 + depth * 0.85);
        node.style.zIndex = String(Math.round(depth * 100));
        node.style.filter = depth < 0.35 ? "blur(1px)" : "none";
      }
    };
    tick();

    const down = (e) => {
      s.drag = true;
      s.lx = e.clientX;
      s.ly = e.clientY;
      el.setPointerCapture?.(e.pointerId);
    };
    const move = (e) => {
      if (!s.drag) return;
      const dx = e.clientX - s.lx;
      const dy = e.clientY - s.ly;
      s.lx = e.clientX;
      s.ly = e.clientY;
      s.vy = dx * 0.004;
      s.vx = -dy * 0.004;
      s.ay += s.vy;
      s.ax += s.vx;
    };
    const up = () => (s.drag = false);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);

    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [points]);

  return (
    <div
      ref={wrap}
      data-cursor
      className="relative mx-auto aspect-square w-full max-w-[520px] cursor-grab touch-pan-y select-none active:cursor-grabbing"
      aria-label="Skills globe. Drag to spin."
    >
      <div aria-hidden className="absolute inset-[8%] rounded-full border border-white/[0.06] bg-[radial-gradient(circle_at_35%_30%,rgba(139,92,246,0.18),transparent_60%)]" />
      <div aria-hidden className="absolute inset-[22%] rounded-full border border-dashed border-white/[0.05]" />
      <ul className="absolute left-1/2 top-1/2">
        {points.map((p, i) => (
          <li
            key={p.label}
            ref={(n) => (nodes.current[i] = n)}
            className="absolute left-0 top-0 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[12px] text-[var(--c-ink)] backdrop-blur-sm will-change-transform sm:text-[13px]"
          >
            {p.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
