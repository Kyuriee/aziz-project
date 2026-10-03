"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "./SmoothScroll";
import { ArrowUp, ArrowUpRight } from "./Icon";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const root = useRef(null);
  const cta = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-title .mask > span", {
        yPercent: 110,
        duration: 1.4,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: ".contact-title", start: "top 80%" },
      });
      gsap.from(".contact-cta", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-cta", start: "top 95%" },
      });
    }, root);

    // Efek magnetik pada tombol email (pointer halus saja)
    let cleanup = () => {};
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const el = cta.current;
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
      const move = (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanup = () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    }

    return () => {
      ctx.revert();
      cleanup();
    };
  }, []);

  return (
    <section className="contact" id="contact" ref={root}>
      <div>
        <div className="section-head mono">
          <span>(03) Contact</span>
          <span>{site.status}</span>
        </div>

        <h2 className="contact-title">
          <span className="mask"><span className="line" style={{ visibility: "visible" }}>Let&rsquo;s tell</span></span>
          <span className="mask"><span className="line" style={{ visibility: "visible" }}>your story</span></span>
          <span className="mask"><span className="line" style={{ visibility: "visible" }}><em>out loud.</em></span></span>
        </h2>

        <a className="contact-cta" href={`mailto:${site.email}`} ref={cta} data-cursor="Send">
          {site.email} <ArrowUpRight />
        </a>

        <a className="contact-phone mono" href={`tel:${site.phone}`} data-cursor="Call">
          {site.phone}
        </a>
      </div>

      <footer className="contact-foot mono">
        <span>© {site.year} {site.name}</span>
        <ul>
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mono back-top"
          onClick={() => lenis?.scrollTo(0, { duration: 2 })}
        >
          Back to top <ArrowUp />
        </button>
      </footer>
    </section>
  );
}
