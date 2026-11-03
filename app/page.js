"use client";
import { useEffect, useState } from "react";
import ModeToggle from "./components/mode-toggle";
import Creative from "./components/creative";
import Professional from "./components/professional";

// Mode is shareable via ?view=professional and remembered per visitor.
const KEY = "portfolio-view";

export default function Home() {
  const [mode, setMode] = useState("creative");

  useEffect(() => {
    let initial = null;
    const fromUrl = new URLSearchParams(window.location.search).get("view");
    if (fromUrl === "professional" || fromUrl === "creative") initial = fromUrl;
    if (!initial) {
      try {
        initial = localStorage.getItem(KEY);
      } catch {}
    }
    if (initial === "professional" || initial === "creative") setMode(initial);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    try {
      localStorage.setItem(KEY, mode);
    } catch {}
    const url = new URL(window.location.href);
    url.searchParams.set("view", mode);
    window.history.replaceState(null, "", url);
  }, [mode]);

  const change = (next) => {
    if (next === mode) return;
    window.scrollTo({ top: 0 });
    setMode(next);
  };

  return (
    <>
      <ModeToggle mode={mode} onChange={change} />
      {mode === "creative" ? <Creative /> : <Professional />}
    </>
  );
}
