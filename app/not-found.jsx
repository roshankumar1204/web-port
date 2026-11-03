import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#07070b] px-5 text-center text-[#ededf2]">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8d8d9c]">Error 404</p>
      <h1 className="mt-4 font-display text-7xl font-bold tracking-tight sm:text-9xl">
        Lost<span className="text-[#c6ff3d]">.</span>
      </h1>
      <p className="mt-4 text-[#8d8d9c]">This page doesn&apos;t exist.</p>
      <Link href="/" className="mt-8 rounded-full bg-[#c6ff3d] px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105">
        Back home
      </Link>
    </div>
  );
}
