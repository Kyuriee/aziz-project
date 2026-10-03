"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { site } from "@/data/site";

/**
 * Nama berbentuk outline yang terisi putih dari bawah ke atas (000→100),
 * garis tipis menyapu di tepi isian, lalu satu "kilatan kamera" membuka halaman.
 */
export default function Preloader({ onDone }) {
  const root = useRef(null);
  const fill = useRef(null);
  const edge = useRef(null);
  const count = useRef(null);
  const flash = useRef(null);
  const done = useRef(onDone);
  done.current = onDone; // selalu versi terbaru, tanpa memicu ulang timeline

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const n = { v: 0 };
      const render = () => {
        const rest = 100 - n.v;
        fill.current.style.clipPath = `inset(${rest}% 0 0 0)`;
        edge.current.style.top = `${rest}%`;
        count.current.textContent = String(Math.round(n.v)).padStart(3, "0");
      };

      const tl = gsap
        .timeline()
        .to(n, { v: 100, duration: reduced ? 0.4 : 2.4, ease: "power2.inOut", onUpdate: render })
        .to(edge.current, { opacity: 0, duration: 0.3, ease: "power2.out" }, "-=0.1");

      if (reduced) {
        // Tanpa kilatan: pudar saja
        tl.to(root.current, { opacity: 0, duration: 0.4, delay: 0.2 })
          .call(() => done.current())
          .set(root.current, { display: "none" });
        return;
      }

      tl.to(flash.current, { opacity: 1, duration: 0.14, ease: "power2.in" }, "+=0.3")
        .set(".pre-ui, .pre-bar", { autoAlpha: 0 })
        .call(() => done.current())
        .to(flash.current, { opacity: 0, duration: 1.1, ease: "power2.out" })
        .set(root.current, { display: "none" });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pre" ref={root} aria-hidden="true">
      <div className="pre-bar pre-bar-top" />
      <div className="pre-bar pre-bar-bot" />
      <div className="pre-ui">
        <div className="pre-top mono">
          <span>Portfolio</span>
          <span>© {site.year}</span>
        </div>

        <div className="pre-word">
          <span className="pre-word-out">{site.firstName}</span>
          <span className="pre-word-fill" ref={fill}>{site.firstName}</span>
          <i className="pre-edge" ref={edge} />
        </div>

        <div className="pre-count mono" ref={count}>000</div>
      </div>
      <div className="pre-flash" ref={flash} />
    </div>
  );
}
