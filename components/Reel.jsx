"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const FPS = 24;
const pad = (n) => String(n).padStart(2, "0");

function timecode(progress) {
  const frames = Math.round(progress * FPS * 47);
  const f = frames % FPS;
  const s = Math.floor(frames / FPS) % 60;
  const m = Math.floor(frames / (FPS * 60));
  return `00:${pad(m)}:${pad(s)}:${pad(f)}`;
}

function ReelArt() {
  return (
    <svg viewBox="-500 -500 1000 1000" fill="none" stroke="#fff" strokeWidth="1.2" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} r={60 + i * 36} strokeOpacity={0.9 - i * 0.065} strokeDasharray={i % 3 ? "none" : "4 10"} />
      ))}
      {Array.from({ length: 120 }, (_, i) => {
        const a = (i / 120) * Math.PI * 2;
        const r2 = i % 10 === 0 ? 500 : 472;
        return (
          <line key={i} x1={Math.cos(a) * 450} y1={Math.sin(a) * 450} x2={Math.cos(a) * r2} y2={Math.sin(a) * r2} strokeOpacity={0.6} />
        );
      })}
      <line x1="-500" y1="0" x2="500" y2="0" strokeOpacity={0.35} />
      <line x1="0" y1="-500" x2="0" y2="500" strokeOpacity={0.35} />
    </svg>
  );
}

/** Frame sinematik: dibuka dari letterbox kecil ke layar penuh, di-pin selama scroll, timecode ikut bergerak. */
export default function Reel() {
  const root = useRef(null);
  const tc = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(".reel-frame", { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const small = window.matchMedia("(max-width: 820px)").matches;
    const from = small ? "inset(30% 6% 30% 6%)" : "inset(24% 30% 24% 30%)";

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=180%",
            scrub: 0.6,
            pin: true,
            onUpdate: (self) => {
              tc.current.textContent = timecode(self.progress);
            },
          },
        })
        .fromTo(".reel-frame", { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut" }, 0)
        .fromTo(".reel-art", { scale: 1.3 }, { scale: 1, ease: "none" }, 0)
        .fromTo(".reel-caption", { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, ease: "power2.out", duration: 0.45 }, 0.4);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="reel" ref={root} aria-label="Showreel">
      <div className="reel-frame">
        <div className="reel-art">
          <ReelArt />
        </div>
        <div className="reel-beam" />
        <div className="reel-caption">
          <span>
            {site.reel.caption.split(" ").slice(0, -1).join(" ")} <em>{site.reel.caption.split(" ").slice(-1)}</em>
          </span>
        </div>
        <div className="reel-hud mono">
          <div>
            <span className="rec">REC</span>
            <span>{site.reel.sub}</span>
          </div>
          <div>
            <span>24 FPS — 2.39:1</span>
            <span ref={tc}>00:00:00:00</span>
          </div>
        </div>
      </div>
    </section>
  );
}
