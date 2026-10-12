"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import SmoothScroll from "./SmoothScroll";
import Cursor from "./Cursor";
import CaseNav from "./CaseNav";
import Gallery from "./Gallery";
import Roll from "./Roll";
import useCaseIntro from "./useCaseIntro";
import { ArrowLeft, ArrowRight } from "./Icon";
import { photoGallery, site } from "@/data/site";

const gallery = photoGallery();

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
    { label: "Frames", value: String(gallery.length + 1) },
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

  useCaseIntro(root);

  return (
    <SmoothScroll locked={false}>
      <Cursor />
      <div
        className={`case${palette ? " has-palette" : ""}`}
        style={palette ? { "--ink": palette.bg, "--paper": palette.fg, "--mute": palette.mute, "--line": palette.line, "--accent": palette.accent } : undefined}
        ref={root}
      >
        <CaseNav label={data.title[0]} />

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

          <Gallery items={gallery} filterable sticky />
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
