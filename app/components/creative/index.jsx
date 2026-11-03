"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FiArrowDown, FiArrowUpRight, FiCheck, FiCopy, FiCpu, FiGithub, FiLinkedin } from "react-icons/fi";
import {
  certifications,
  education,
  experience,
  focusAreas,
  learning,
  profile,
  projects,
  skillGroups,
  stats,
} from "@/utils/data/profile";
import { Counter, Cursor, Magnetic, Reveal, ScrollProgress, ScrollWords, SmoothScroll, TiltCard, spotlightMove } from "./fx";
import SkillGlobe from "./skill-globe";

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-64 w-64 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.35),transparent_65%)]" />
    </div>
  ),
});

const EASE = [0.16, 1, 0.3, 1];
const NAV = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];
const ROTATING = ["AI that checks its own work.", "apps that talk to wearables.", "ERPs that pay for themselves.", "backends that ship and stay up."];

/* ------------------------------------------------------------------ */

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 sm:px-8">
        <a href="#top" className="font-display text-lg font-bold tracking-tight text-white">
          RK<span className="text-[var(--c-accent)]">.</span>
        </a>
        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.16em] text-white md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="opacity-70 transition-opacity hover:opacity-100">
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.16em] text-white"
        >
          Resume <FiArrowUpRight aria-hidden />
        </a>
      </div>
    </header>
  );
}

function SplitLetters({ text, delay = 0, className = "" }) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.06em] ${className}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: delay + i * 0.045, ease: EASE }}
          className="inline-block"
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function RotatingLine() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % ROTATING.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-[var(--c-accent)]"
        >
          {ROTATING[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
      <motion.div style={{ y: sceneY, opacity: fade }} className="absolute inset-0 opacity-70 md:left-[30%] md:opacity-100">
        <HeroScene active={inView} calm={!!reduce} />
      </motion.div>

      <motion.div style={{ y: textY }} className="pointer-events-none relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-5 pb-28 pt-28 sm:px-8 md:justify-center md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--c-muted)] backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--c-accent)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--c-accent)]" />
          </span>
          {profile.available}
        </motion.p>

        <h1 className="font-display text-[clamp(2.8rem,8.5vw,7rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]">
          <SplitLetters text={profile.firstName} delay={0.3} />
          <br />
          <SplitLetters text={profile.lastName} delay={0.55} className="text-outline" />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
          className="mt-8 max-w-xl"
        >
          <p className="text-base text-[var(--c-ink)] sm:text-xl">
            Software engineer. I build <br className="sm:hidden" />
            <RotatingLine />
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-[var(--c-muted)]">
            {profile.location} · MCA 2026 · CGPA 8.6
          </p>
        </motion.div>
      </motion.div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-24 right-5 hidden h-14 w-14 items-center justify-center rounded-full border border-white/15 text-[var(--c-ink)] transition-colors hover:border-[var(--c-accent)] hover:text-[var(--c-accent)] sm:right-8 md:flex"
      >
        <motion.span animate={reduce ? {} : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <FiArrowDown />
        </motion.span>
      </a>
    </section>
  );
}

function SectionLabel({ index, children }) {
  return (
    <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[var(--c-muted)]">
      <span className="text-[var(--c-accent)]">{index}</span>
      <span className="h-px w-10 bg-[var(--c-line)]" />
      {children}
    </p>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-28">
      <SectionLabel index="01">About</SectionLabel>
      <ScrollWords
        text={`${profile.tagline} I owned the architecture of a fitness startup's BLE-wearable app, and built an ERP for a JSW vendor that recouped ₹74,071 in missed GST credit.`}
        className="max-w-5xl font-display text-[clamp(1.4rem,3vw,2.5rem)] font-medium leading-[1.1] tracking-tight"
      />

      <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--c-line)] bg-[var(--c-line)] lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[var(--c-bg)] p-6 sm:p-8">
            <div className="font-display text-2xl font-bold tracking-tight sm:text-4xl">
              <Counter {...s} />
            </div>
            <p className="mt-2 text-sm text-[var(--c-muted)]">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {focusAreas.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08}>
            <div
              onPointerMove={spotlightMove}
              className="spotlight group h-full rounded-2xl border border-[var(--c-line)] bg-white/[0.02] p-6 transition-colors hover:border-white/20"
            >
              <span className="font-mono text-xs text-[var(--c-accent)]">0{i + 1}</span>
              <h3 className="mt-6 font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--c-muted)]">{f.body}</p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {f.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[11px] text-[#ededf2]/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCover({ p }) {
  return (
    <div
      className="relative h-44 overflow-hidden rounded-xl border border-white/10 sm:h-52"
      style={{
        background: `radial-gradient(120% 90% at 15% 10%, hsl(${p.hue} 95% 60% / 0.55), transparent 55%),
          radial-gradient(90% 90% at 90% 100%, hsl(${(p.hue + 70) % 360} 90% 55% / 0.45), transparent 60%), #0c0c12`,
      }}
    >
      {p.image ? (
        <Image
          src={p.image}
          alt={`${p.name} screenshot`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-top opacity-85 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <>
          <div aria-hidden className="grid-lines absolute inset-0 opacity-70" />
          <div aria-hidden className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-black/30 text-2xl text-white backdrop-blur">
              <FiCpu />
            </span>
          </div>
        </>
      )}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <span className="absolute left-4 top-4 z-10 rounded-full bg-black/70 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white backdrop-blur">
        {p.badge}
      </span>
    </div>
  );
}

const SPANS = ["md:col-span-3", "md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-3", "md:col-span-3"];

function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <SectionLabel index="02">Selected work</SectionLabel>
          <h2 className="font-display text-[clamp(2rem,4.6vw,3.75rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            Things I&apos;ve <span className="text-outline">shipped</span>
          </h2>
        </div>
        <p className="max-w-sm text-[var(--c-muted)]">
          Mostly AI and data systems. Each one is tested, deployed, and checks its own output.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-6">
        {projects.map((p, i) => {
          const Wrapper = p.url ? "a" : "div";
          return (
            <Reveal key={p.name} delay={(i % 3) * 0.07} className={SPANS[i] || "md:col-span-2"}>
              <TiltCard className="h-full rounded-2xl" max={p.featured ? 6 : 9}>
                <Wrapper
                  {...(p.url ? { href: p.url, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col rounded-2xl border border-[var(--c-line)] bg-white/[0.025] p-3 transition-colors hover:border-white/20"
                >
                  <ProjectCover p={p} />
                  <div className="flex flex-1 flex-col p-3 pt-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--c-muted)]">{p.kind}</p>
                        <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
                      </div>
                      {p.url && (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:rotate-45 group-hover:border-[var(--c-accent)] group-hover:bg-[var(--c-accent)] group-hover:text-black">
                          <FiArrowUpRight aria-hidden />
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--c-muted)]">{p.summary}</p>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                      {p.tech.map((t) => (
                        <span key={t} className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-[#ededf2]/75">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Wrapper>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative border-t border-[var(--c-line)] bg-[#0a0a10]">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-28">
        <SectionLabel index="03">Experience</SectionLabel>
        <h2 className="font-display text-[clamp(2rem,4.6vw,3.75rem)] font-bold leading-[0.95] tracking-[-0.03em]">
          Where I&apos;ve <span className="text-outline">worked</span>
        </h2>

        <div ref={ref} className="relative mt-16">
          <div aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-[var(--c-line)] lg:left-[calc(33%-1px)]" />
          <motion.div
            aria-hidden
            style={{ scaleY }}
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-gradient-to-b from-[var(--c-accent)] to-[var(--c-violet)] lg:left-[calc(33%-1px)]"
          />

          <div className="space-y-20">
            {experience.map((job) => (
              <div key={job.company} className="relative grid gap-6 pl-10 lg:grid-cols-[33%_1fr] lg:gap-0 lg:pl-0">
                <span aria-hidden className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-[var(--c-accent)] bg-[#0a0a10] lg:left-[calc(33%-8px)]" />
                <div className="lg:sticky lg:top-28 lg:self-start lg:pr-14">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--c-accent)]">{job.period}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">{job.company}</h3>
                  <p className="mt-2 text-sm text-[var(--c-muted)]">{job.context}</p>
                </div>
                <Reveal className="lg:pl-14">
                  <p className="text-lg font-medium">{job.title}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {job.metrics.map((m) => (
                      <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <div className="font-display text-xl font-bold text-[var(--c-accent)]">{m.value}</div>
                        <div className="text-xs text-[var(--c-muted)]">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <ul className="mt-6 space-y-3">
                    {job.achievements.map((a) => (
                      <li key={a} className="flex gap-3 text-[15px] leading-relaxed text-[#ededf2]/80">
                        <span aria-hidden className="mt-2.5 h-1 w-3 shrink-0 bg-[#c6ff3d]/70" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {job.tech.map((t) => (
                      <span key={t} className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-[#ededf2]/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const GLOBE_ITEMS = [
  "Python", "C++", "TypeScript", "SQL", "LLMs", "RAG", "LangChain", "MCP", "FastAPI", "Flask",
  "Node.js", "React", "React Native", "PostgreSQL", "Supabase", "Redis", "MongoDB", "Docker",
  "Cloud Run", "GitHub Actions", "BLE", "MediaPipe", "BiLSTM", "scikit-learn", "pytest", "Playwright",
  "WebSocket", "OAuth2", "Zustand", "Tailwind", "Firebase", "Vision LLMs", "Embeddings", "RLS", "Power BI", "Linux",
];

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-28">
      <SectionLabel index="04">Toolkit</SectionLabel>
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-[clamp(2rem,4.6vw,3.75rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            The <span className="text-outline">stack</span>
          </h2>
          <p className="mt-5 max-w-md text-[var(--c-muted)]">
            Strongest in Python and C++. Drag the globe to spin it. The full list is below.
          </p>
          <div className="mt-10 space-y-5">
            {skillGroups.map((g) => (
              <div key={g.label} className="grid gap-2 border-t border-[var(--c-line)] pt-4 sm:grid-cols-[150px_1fr]">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--c-accent)]">{g.label}</p>
                <p className="text-sm leading-relaxed text-[#ededf2]/80">{g.items.join(" · ")}</p>
              </div>
            ))}
            <div className="grid gap-2 border-t border-[var(--c-line)] pt-4 sm:grid-cols-[150px_1fr]">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--c-muted)]">Learning now</p>
              <p className="text-sm text-[var(--c-muted)]">{learning.join(" · ")}</p>
            </div>
          </div>
        </div>
        <div className="order-first lg:sticky lg:top-24 lg:order-none lg:self-start">
          <SkillGlobe items={GLOBE_ITEMS} />
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-28 sm:px-8">
      <SectionLabel index="05">Education</SectionLabel>
      <div className="grid gap-4 md:grid-cols-3">
        {education.map((e, i) => (
          <Reveal key={e.degree} delay={i * 0.08}>
            <div onPointerMove={spotlightMove} className="spotlight h-full rounded-2xl border border-[var(--c-line)] bg-white/[0.02] p-6">
              <p className="font-mono text-xs text-[var(--c-accent)]">{e.year}</p>
              <h3 className="mt-4 font-display text-xl font-semibold">{e.degree}</h3>
              <p className="mt-2 text-sm text-[var(--c-muted)]">{e.institution}</p>
              <p className="mt-6 font-display text-3xl font-bold">{e.score.replace("CGPA ", "")}</p>
              <p className="text-xs text-[var(--c-muted)]">CGPA</p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.16}>
          <div onPointerMove={spotlightMove} className="spotlight h-full rounded-2xl border border-[var(--c-line)] bg-white/[0.02] p-6">
            <p className="font-mono text-xs text-[var(--c-accent)]">Certifications</p>
            <ul className="mt-4 space-y-3">
              {certifications.map((c) => (
                <li key={c} className="font-display text-lg font-medium">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-[var(--c-line)]">
      <div aria-hidden className="absolute left-1/2 top-full h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,255,61,0.16),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1400px] px-5 pb-32 pt-20 sm:px-8 md:pt-28">
        <SectionLabel index="06">Contact</SectionLabel>
        <h2 className="font-display text-[clamp(2.4rem,6.5vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.04em]">
          Let&apos;s build
          <br />
          <span className="text-outline">something</span> <span className="text-[var(--c-accent)]">real.</span>
        </h2>

        <div className="mt-14 flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
          <div>
            <a href={`mailto:${profile.email}`} className="font-display text-xl font-medium underline decoration-white/20 underline-offset-8 transition-colors hover:decoration-[var(--c-accent)] sm:text-3xl">
              {profile.email}
            </a>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm transition-colors hover:border-white/40"
              >
                {copied ? <FiCheck aria-hidden /> : <FiCopy aria-hidden />}
                {copied ? "Copied" : "Copy email"}
              </button>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm transition-colors hover:border-white/40">
                <FiGithub aria-hidden /> GitHub
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm transition-colors hover:border-white/40">
                <FiLinkedin aria-hidden /> LinkedIn
              </a>
            </div>
          </div>

          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[var(--c-accent)] font-display text-lg font-semibold text-black transition-transform hover:scale-105 sm:h-40 sm:w-40"
            >
              Say hello
              <FiArrowUpRight className="mt-1 text-2xl" aria-hidden />
            </a>
          </Magnetic>
        </div>

        <div className="mt-28 flex flex-col justify-between gap-3 border-t border-[var(--c-line)] pt-6 font-mono text-xs uppercase tracking-[0.14em] text-[var(--c-muted)] sm:flex-row">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>{profile.location}</span>
          <span>Built with Next.js · Three.js · Motion</span>
        </div>
      </div>
    </section>
  );
}

export default function Creative() {
  return (
    <div className="grain relative overflow-x-clip bg-[var(--c-bg)] text-[var(--c-ink)]">
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
