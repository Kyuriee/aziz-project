"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLenis } from "./SmoothScroll";
import { site } from "@/data/site";

const Row = ({ outline }) => {
  // Daftar diduplikasi supaya loop tak terlihat putus
  const items = [...site.marquee, ...site.marquee];
  return (
    <div className={`mq-row${outline ? " outline" : ""}`}>
      <div className="mq-track" aria-hidden="true">
        {[0, 1].map((copy) =>
          items.map((word, i) => (
            <span className="mq-item" key={`${copy}-${i}`}>
              {word}
              <i className="mq-sep" />
            </span>
          ))
        )}
      </div>
    </div>
  );
};

/** Dua baris teks raksasa berlawanan arah; kecepatannya ikut melonjak saat scroll kencang. */
export default function Marquee() {
  const root = useRef(null);
  const lenis = useLenis();
  const lenisRef = useRef(null);
  lenisRef.current = lenis;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tracks = [...root.current.querySelectorAll(".mq-track")];
    const state = tracks.map((el, i) => ({ el, dir: i % 2 ? 1 : -1, x: 0, w: el.scrollWidth / 2 }));
    state.forEach((s) => {
      if (s.dir > 0) s.x = -s.w;
    });

    const measure = () => state.forEach((s) => (s.w = s.el.scrollWidth / 2));
    window.addEventListener("resize", measure);

    const tick = (_t, delta) => {
      const boost = Math.abs(lenisRef.current?.velocity ?? 0);
      state.forEach((s) => {
        s.x += s.dir * (0.7 + boost * 0.4) * (delta / 16.7);
        if (s.dir < 0 && s.x <= -s.w) s.x += s.w;
        if (s.dir > 0 && s.x >= 0) s.x -= s.w;
        gsap.set(s.el, { x: s.x });
      });
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section className="marquee" ref={root} aria-label="Disciplines">
      <Row />
      <Row outline />
    </section>
  );
}
