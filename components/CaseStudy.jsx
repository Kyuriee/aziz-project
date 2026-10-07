"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "./SmoothScroll";
import Cursor from "./Cursor";
import Roll from "./Roll";
import { ArrowLeft, ArrowRight } from "./Icon";
import { site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

/** Halaman satu disiplin (Photo/Video/Design). Data dari `categories` di data/site.js. */
export default function CaseStudy({ slug, data }) {
  const root = useRef(null);
  const palette = data.palette;

  // Project berikutnya (berputar); disembunyikan kalau cuma ada satu project
  const projects = site.works.filter((w) => w.slug && w.status !== "soon");
  const at = projects.findIndex((w) => w.slug === slug);
  const next = projects.length > 1 ? projects[(at + 1) % projects.length] : null;

  const meta = [
    { label: "Type", value: data.kind },
    { label: "Frames", value: String(data.shots.length + 1) },
    { label: "Role", value: data.role },
  ];

  // Palet khusus: warnai juga body supaya area overscroll tidak hitam
  useEffect(() => {
    if (!palette) return;
    document.body.style.background = palette.bg;
    return () => {
      document.body.style.background = "";
    };
  }, [palette]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.set(".case .line", { visibility: "visible" });
      if (reduced) return;

      gsap.set(".case .line", { yPercent: 110 });
      gsap
        .timeline({ delay: 0.15 })
        .to(".case .line", { yPercent: 0, duration: 1.3, stagger: 0.12, ease: "expo.out" })
        .fromTo(".case-hero-img", { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1.6, ease: "expo.out" }, 0)
        .from(".case-fade", { opacity: 0, y: 16, duration: 0.9, stagger: 0.1, ease: "power3.out" }, 0.6);

      // Tiap foto galeri muncul saat masuk layar
      gsap.utils.toArray(".shot").forEach((shot) => {
        gsap.from(shot, {
          opacity: 0,
          y: 60,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: shot, start: "top 88%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll locked={false}>
      <Cursor />
      <div
        className={`case${palette ? " has-palette" : ""}`}
        style={palette ? { "--ink": palette.bg, "--paper": palette.fg, "--mute": palette.mute, "--line": palette.line, "--accent": palette.accent } : undefined}
        ref={root}
      >
        <header className="nav is-static mono">
          <Link href="/" className="nav-logo" data-cursor="Home">
            {site.name}
          </Link>
          <span className="nav-count">{data.title[0]}</span>
          <div className="nav-right">
            <Link href="/#work" className="nav-back" data-cursor="Back">
              <ArrowLeft />
              <Roll>Work</Roll>
            </Link>
          </div>
        </header>

        <main>
          <section className="case-hero">
            <div className="case-hero-text">
              <h1 className="case-title" aria-label={data.title.join(" ")}>
                <span className="mask">
                  <span className="line case-line-1" aria-hidden="true">{data.title[0]}</span>
                </span>
                <span className="mask">
                  <span className="line case-line-2" aria-hidden="true">{data.title[1]}</span>
                </span>
              </h1>

              <p className="case-brief case-fade">{data.brief}</p>

              <dl className="case-meta mono case-fade">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt>{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <img
              className="case-hero-img"
              src={data.hero.src}
              width={data.hero.width}
              height={data.hero.height}
              alt={data.hero.alt}
              fetchPriority="high"
              decoding="async"
            />
          </section>

          <section className="case-gallery" aria-label="Frames">
            {data.shots.map((shot) => (
              <figure className={`shot pos-${shot.pos}`} key={shot.src}>
                <img src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </section>
        </main>

        <footer className="case-foot">
          {next && (
            <Link href={`/work/${next.slug}/`} className="case-next" data-cursor="Next">
              <span className="case-next-label mono">Next project</span>
              <span className="case-next-title">
                {next.title} <ArrowRight />
              </span>
              <span className="case-next-meta mono">{next.kind} — {next.year}</span>
            </Link>
          )}
          <div className="case-foot-row mono">
            <Link href="/#work" className="case-back" data-cursor="Back">
              <ArrowLeft />
              <Roll>All work</Roll>
            </Link>
            <p>© {site.year} {site.name}</p>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
