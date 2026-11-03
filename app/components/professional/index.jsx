"use client";
import Image from "next/image";
import { FiArrowUpRight, FiDownload, FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone, FiPrinter } from "react-icons/fi";
import { certifications, education, experience, learning, profile, projects, skillGroups } from "@/utils/data/profile";

function Section({ id, title, children }) {
  return (
    <section id={id} className="grid gap-4 border-t border-[var(--p-line)] py-10 md:grid-cols-[160px_1fr] md:gap-10 print:py-5">
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--p-muted)] md:pt-1">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function ExtLink({ href, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-[var(--p-ink)] underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-[var(--p-accent)] hover:text-[var(--p-accent)] ${className}`}
    >
      {children}
    </a>
  );
}

export default function Professional() {
  return (
    <div className="min-h-screen bg-[var(--p-bg)] text-[var(--p-ink)]">
      <div className="mx-auto max-w-4xl px-5 pb-32 pt-14 sm:px-8 md:pt-20 print:max-w-none print:px-0 print:pt-0 print:pb-0">
        {/* Header */}
        <header className="flex flex-col-reverse gap-8 pb-10 sm:flex-row sm:items-start sm:justify-between print:pb-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
            <p className="mt-2 text-lg text-[var(--p-muted)]">
              {profile.headline} · AI, Backend & IoT
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--p-muted)]">
              <li className="flex items-center gap-1.5"><FiMapPin aria-hidden /> {profile.location}</li>
              <li className="flex items-center gap-1.5">
                <FiMail aria-hidden />
                <a className="hover:text-[var(--p-ink)]" href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li className="flex items-center gap-1.5">
                <FiPhone aria-hidden />
                <a className="hover:text-[var(--p-ink)]" href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}>{profile.phone}</a>
              </li>
            </ul>
            <div className="no-print mt-6 flex flex-wrap gap-2 text-sm">
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 font-medium text-white transition-colors hover:bg-zinc-700"
              >
                <FiDownload aria-hidden /> Resume
              </a>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-[var(--p-line)] bg-white px-4 py-2 font-medium transition-colors hover:border-zinc-400">
                <FiGithub aria-hidden /> GitHub
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-[var(--p-line)] bg-white px-4 py-2 font-medium transition-colors hover:border-zinc-400">
                <FiLinkedin aria-hidden /> LinkedIn
              </a>
              <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-md border border-[var(--p-line)] bg-white px-4 py-2 font-medium transition-colors hover:border-zinc-400">
                <FiPrinter aria-hidden /> Print
              </button>
            </div>
          </div>
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-[var(--p-line)] bg-zinc-100 sm:h-28 sm:w-28 print:hidden">
            <Image src={profile.photo} alt={profile.name} fill sizes="112px" className="object-cover" priority />
          </div>
        </header>

        <Section id="summary" title="Summary">
          <p className="max-w-[68ch] leading-relaxed text-zinc-700">{profile.summary}</p>
        </Section>

        <Section id="experience" title="Experience">
          <div className="space-y-9">
            {experience.map((job) => (
              <article key={job.company} className="break-inside-avoid">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-semibold">
                    {job.title} <span className="font-normal text-[var(--p-muted)]">· {job.company}</span>
                  </h3>
                  <span className="shrink-0 text-sm tabular-nums text-[var(--p-muted)]">{job.period}</span>
                </div>
                <p className="mt-0.5 text-sm text-[var(--p-muted)]">{job.context}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-zinc-700 marker:text-zinc-400">
                  {job.achievements.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-[var(--p-muted)]">
                  <span className="font-medium text-zinc-700">Stack:</span> {job.tech.join(", ")}
                </p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="space-y-7">
            {projects.map((p) => (
              <article key={p.name} className="break-inside-avoid">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-semibold">
                    {p.name} <span className="font-normal text-[var(--p-muted)]">· {p.kind}</span>
                  </h3>
                  {p.url && (
                    <ExtLink href={p.url} className="shrink-0 text-sm">
                      {p.url.includes("github.com") ? "Code" : "Live"} <FiArrowUpRight aria-hidden />
                    </ExtLink>
                  )}
                </div>
                <p className="mt-2 max-w-[70ch] text-[15px] leading-relaxed text-zinc-700">{p.summary}</p>
                <p className="mt-2 text-sm text-[var(--p-muted)]">{p.tech.join(" · ")}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <dl className="space-y-3 text-[15px]">
            {skillGroups.map((g) => (
              <div key={g.label} className="grid gap-1 sm:grid-cols-[150px_1fr] sm:gap-4">
                <dt className="font-medium">{g.label}</dt>
                <dd className="text-zinc-700">{g.items.join(", ")}</dd>
              </div>
            ))}
            <div className="grid gap-1 sm:grid-cols-[150px_1fr] sm:gap-4">
              <dt className="font-medium">Currently learning</dt>
              <dd className="text-[var(--p-muted)]">{learning.join(", ")}</dd>
            </div>
          </dl>
        </Section>

        <Section id="education" title="Education">
          <div className="space-y-4">
            {education.map((e) => (
              <div key={e.degree} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-semibold">{e.degree}</h3>
                  <p className="text-sm text-[var(--p-muted)]">
                    {e.institution} · {e.score}
                  </p>
                </div>
                <span className="text-sm tabular-nums text-[var(--p-muted)]">{e.year}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="certifications" title="Certifications">
          <ul className="space-y-1 text-[15px] text-zinc-700">
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Section>

        <Section id="contact" title="Contact">
          <p className="text-[15px] leading-relaxed text-zinc-700">
            {profile.available}. Based in Bengaluru, open to relocation, onsite, hybrid or remote. The fastest way to reach me is{" "}
            <ExtLink href={`mailto:${profile.email}`}>{profile.email}</ExtLink>.
          </p>
        </Section>

        <footer className="no-print border-t border-[var(--p-line)] pt-6 text-xs text-[var(--p-muted)]">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </div>
    </div>
  );
}
