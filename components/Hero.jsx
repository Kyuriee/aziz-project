"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, SplitText);

function Clock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(id);
  }, []);
  return <span>Local {time}</span>;
}

export default function Hero({ ready }) {
  const root = useRef(null);
  const intro = useRef(null);
  const readyRef = useRef(ready);
  readyRef.current = ready;

  const nameWords = site.name.split(" ");
  const [roleFirst, ...roleRest] = site.role.split(" ");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let splitA, splitB;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".line", { visibility: "visible" });
        return;
      }

      splitA = new SplitText(".line-a", { type: "chars" });
      splitB = new SplitText(".line-b", { type: "words" });

      gsap.set(".line", { visibility: "visible" });
      gsap.set(splitA.chars, { yPercent: 115, rotate: 8 });
      gsap.set(splitB.words, { yPercent: 120 });
      gsap.set(".hero-fade", { opacity: 0, y: 20 });
      gsap.set(".hero-photo", { opacity: 0 });

      intro.current = gsap
        .timeline({ paused: true })
        // Foto muncul pelan seperti cetakan yang "jadi" (tanpa filter, aman di Safari)
        .fromTo(
          ".hero-photo",
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1.8, ease: "expo.out" },
          0
        )
        .to(splitA.chars, { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.05, ease: "expo.out" }, 0.25)
        .to(splitB.words, { yPercent: 0, duration: 1.1, stagger: 0.1, ease: "expo.out" }, "-=0.9")
        .to(".hero-fade", { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out" }, "-=0.8");

      if (readyRef.current) intro.current.play();

      // Baris judul bergeser berlawanan arah
      const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".mask-1", { xPercent: -8, ease: "none", scrollTrigger: scrub });
      gsap.to(".mask-2", { xPercent: 8, ease: "none", scrollTrigger: scrub });
      gsap.to(".mask-3", { xPercent: -5, ease: "none", scrollTrigger: scrub });
    }, root);

    return () => {
      ctx.revert();
      splitA?.revert();
      splitB?.revert();
    };
  }, []);

  useEffect(() => {
    if (ready) intro.current?.play();
  }, [ready]);

  return (
    <section className="hero is-light" id="top" ref={root}>
      <div className="hero-photo-wrap">
        <div className="hero-photo-frame">
          <img
            className="hero-photo"
            src={site.portrait.src}
            width={site.portrait.width}
            height={site.portrait.height}
            alt={site.portrait.alt}
            fetchPriority="high"
            decoding="async"
          />
          <i className="hero-photo-fade" aria-hidden="true" />
        </div>
      </div>

      <div className="hero-meta mono">
        <span className="hero-fade">© {site.year}</span>
        <span className="hero-fade">
          <i className="dot" />
          {site.status}
        </span>
        <span className="hero-fade">
          <Clock />
        </span>
      </div>

      <h1 className="hero-title" aria-label={`${site.name} — ${site.role}`}>
        {nameWords.map((word, i) => (
          <span className={`mask mask-${i + 1}`} key={word}>
            <span className="line line-a" aria-hidden="true">{word}</span>
          </span>
        ))}
        <span className={`mask mask-${nameWords.length + 1}`}>
          <span className="line line-b" aria-hidden="true">
            <em>{roleFirst}</em> {roleRest.join(" ")}
          </span>
        </span>
      </h1>

      <div className="hero-foot mono hero-fade">
        <p>{site.description}</p>
        <div className="scroll-cue">
          <span>Scroll</span>
          <i />
        </div>
      </div>
    </section>
  );
}
