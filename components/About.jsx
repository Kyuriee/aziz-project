"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
  const root = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let split;

    const ctx = gsap.context(() => {
      // Kata-kata menyala satu per satu mengikuti scroll
      split = new SplitText(".about-statement", { type: "words", wordsClass: "word" });
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".about-statement", start: "top 80%", end: "bottom 50%", scrub: true },
        }
      );

      gsap.from(".cap", {
        y: 36,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: ".about-side", start: "top 85%" },
      });
      gsap.from(".about-note", {
        y: 36,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".about-note", start: "top 90%" },
      });
    }, root);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <section className="section about" id="about" ref={root}>
      <div className="section-head mono">
        <span>(02) About</span>
        <span>{site.location}</span>
      </div>

      <div className="about-grid">
        <p className="about-statement">{site.statement}</p>

        <p className="about-note">
          {site.stats.map((stat, i) => (
            <span key={stat.label}>
              <em>{stat.value}</em> {stat.label}
              {i < site.stats.length - 1 ? ", " : "."}{" "}
            </span>
          ))}
        </p>

        <div className="about-side">
          {site.capabilities.map((c) => (
            <div className="cap" key={c.name}>
              <span className="cap-name">{c.name}</span>
              <span className="cap-note mono">{c.note}</span>
            </div>
          ))}

          <dl className="facts mono">
            <div>
              <dt>Tools</dt>
              <dd>{site.tools.join(" · ")}</dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>{site.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
