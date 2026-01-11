"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import PortfolioModeToggle from "./components/portfolio-mode-toggle";
import ProfessionalPortfolio from "./components/professional-portfolio";

// Import ScrollToTop dynamically with SSR disabled
const ScrollToTop = dynamic(() => import("./components/helper/scroll-to-top"), {
  ssr: false,
});

// async function getData() {
//   const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`)
//   console.log(personalData.devUsername);


//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }

//   const data = await res.json();
//   console.log(data);
  

//   const filtered = data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);

//   return filtered;
// };

// Home page with mode toggle and scroll-to-top
export default function Home() {
  const [mode, setMode] = useState("professional");

  return (
    <div suppressHydrationWarning>
      <PortfolioModeToggle mode={mode} setMode={setMode} />
      <ScrollToTop />
      {mode === "creative" ? (
        <>
          <HeroSection />
          <AboutSection />
          <Experience />
          <Skills />
          <Projects />
          <Education />
          <ContactSection />
        </>
      ) : (
        <ProfessionalPortfolio />
      )}
    </div>
  );
}