"use client";
import Lenis from "lenis";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

/* Smooth scroll for the creative view only */
export function SmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -20 } });
    let id;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, [reduce]);
  return null;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-[var(--c-accent)] to-[var(--c-violet)]"
    />
  );
}

/* Dot + ring cursor, fine pointers only */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHover(!!e.target.closest?.("a, button, [data-cursor]"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[80] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-[var(--c-accent)]"
      />
      <motion.div
        aria-hidden
        style={{ x: rx, y: ry }}
        animate={{ scale: hover ? 1.9 : 1, opacity: hover ? 0.9 : 0.45 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed left-0 top-0 z-[80] -ml-4 -mt-4 h-8 w-8 rounded-full border border-[var(--c-accent)] mix-blend-difference"
      />
    </>
  );
}

/* Number that counts up when scrolled into view */
export function Counter({ value, prefix = "", suffix = "", format }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(v) });
    return () => c.stop();
  }, [inView, value]);
  const text = format === "inr" ? Math.round(n).toLocaleString("en-IN") : Math.round(n).toString();
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {text}
      {suffix}
    </span>
  );
}

/* Paragraph whose words light up as you scroll through it */
export function ScrollWords({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

/* Fade/rise on enter */
export function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const M = motion[as];
  return (
    <M
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </M>
  );
}

/* 3D tilt card with a glare that follows the pointer */
export function TiltCard({ children, className = "", max = 9 }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 220, damping: 22 });
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 25 });
  const glare = useTransform([px, py], ([x, y]) => `radial-gradient(500px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.12), transparent 45%)`);

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    glareOpacity.set(1);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div aria-hidden style={{ background: glare, opacity: glareOpacity }} className="pointer-events-none absolute inset-0 rounded-[inherit]" />
    </motion.div>
  );
}

/* Element that drifts toward the pointer */
export function Magnetic({ children, strength = 0.35, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* Sets --mx/--my for the .spotlight hover glow */
export function spotlightMove(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}
