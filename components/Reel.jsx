"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const FPS = 24;
const SECONDS_PER_FRAME = 2; // timecode: tiap foto "berdurasi" 2 detik
const pad = (n) => String(n).padStart(2, "0");

function timecode(progress, totalSeconds) {
  const frames = Math.round(progress * FPS * totalSeconds);
  const f = frames % FPS;
  const s = Math.floor(frames / FPS) % 60;
  const m = Math.floor(frames / (FPS * 60));
  return `00:${pad(m)}:${pad(s)}:${pad(f)}`;
}

/** Frame sinematik: dibuka dari letterbox kecil ke layar penuh, di-pin selama scroll.
 *  Foto di `site.reel.frames` berganti mengikuti scroll, timecode ikut bergerak. */
export default function Reel() {
  const root = useRef(null);
  const tc = useRef(null);
  const frames = site.reel.frames;
  const total = frames.length * SECONDS_PER_FRAME;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(".reel-frame", { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const imgs = root.current.querySelectorAll(".reel-img");
    const show = (index) => imgs.forEach((el, k) => el.classList.toggle("is-on", k === index));
    let current = 0;

    const small = window.matchMedia("(max-width: 820px)").matches;
    const from = small ? "inset(30% 6% 30% 6%)" : "inset(24% 30% 24% 30%)";

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=" + frames.length * 45 + "%",
            scrub: 0.4,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              tc.current.textContent = timecode(self.progress, total);
              const index = Math.min(frames.length - 1, Math.floor(self.progress * frames.length));
              if (index !== current) {
                current = index;
                show(index);
              }
            },
          },
        })
        .fromTo(".reel-frame", { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 0.5 }, 0)
        .fromTo(".reel-imgs", { scale: 1.12 }, { scale: 1, ease: "none", duration: 1 }, 0)
        .fromTo(".reel-caption", { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, ease: "power2.out", duration: 0.3 }, 0.25);
    }, root);

    return () => ctx.revert();
  }, [frames.length, total]);

  return (
    <section className="reel" ref={root} aria-label="Showreel">
      <div className="reel-frame">
        <div className="reel-imgs" aria-hidden="true">
          {frames.map((src, i) => (
            <img key={src} className={`reel-img${i === 0 ? " is-on" : ""}`} src={src} alt="" loading="eager" decoding="async" />
          ))}
        </div>
        <div className="reel-shade" />
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
