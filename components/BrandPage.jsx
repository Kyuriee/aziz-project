"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SmoothScroll, { useLenis } from "./SmoothScroll";
import Cursor from "./Cursor";
import CaseNav from "./CaseNav";
import Gallery from "./Gallery";
import VideoEmbed from "./VideoEmbed";
import Roll from "./Roll";
import useCaseIntro from "./useCaseIntro";
import { ArrowLeft, ArrowRight } from "./Icon";
import { disciplinesOf, liveBrands, site } from "@/data/site";

const SCROLL_OFFSET = -120; // ruang untuk header dan tab yang menempel
const SECTION_ORDER = ["video", "photo", "design"]; // video paling atas: bobotnya paling besar

// Loncat ke #photo / #video / #design lewat Lenis (dari chip di halaman lain)
function HashJump() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis || !window.location.hash) return;
    const t = setTimeout(() => lenis.scrollTo(window.location.hash, { offset: SCROLL_OFFSET }), 300);
    return () => clearTimeout(t);
  }, [lenis]);
  return null;
}

/** Tab yang menempel di atas: loncat antar section dan menandai section yang sedang terlihat. */
function SectionTabs({ sections, brand }) {
  const lenis = useLenis();
  const [active, setActive] = useState(sections[0].slug);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.slug);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const go = (e, slug) => {
    if (!lenis) return;
    e.preventDefault();
    lenis.scrollTo(`#${slug}`, { offset: SCROLL_OFFSET });
  };

  return (
    <nav className="brand-tabs mono" aria-label="Sections">
      {sections.map((s) => (
        <a href={`#${s.slug}`} key={s.slug} aria-current={active === s.slug ? "true" : undefined} onClick={(e) => go(e, s.slug)} data-cursor="Go">
          {s.title}
          <span>{brand[s.slug].length}</span>
        </a>
      ))}
    </nav>
  );
}

/** Halaman satu brand: quote dan lama kerja di atas, lalu karya Video, Photo, Design di bawahnya. */
export default function BrandPage({ brand }) {
  const root = useRef(null);
  useCaseIntro(root);

  const disciplines = disciplinesOf(brand);
  const sections = SECTION_ORDER.map((slug) => disciplines.find((d) => d.slug === slug)).filter(Boolean);
  const [first, ...rest] = brand.name.split(" ");
  const live = liveBrands();
  const next = live[(live.findIndex((b) => b.slug === brand.slug) + 1) % live.length];
  const meta = [
    { label: "Scope", value: disciplines.map((d) => d.title).join(" · ") },
    brand.duration && { label: "Duration", value: brand.duration },
    brand.role && { label: "Role", value: brand.role },
  ].filter(Boolean);

  return (
    <SmoothScroll>
      <Cursor />
      <HashJump />
      <div className="case" ref={root}>
        <CaseNav label={brand.name} />

        <main>
          <section className="case-hero">
            <div className="case-hero-text">
              <h1 className="case-title" aria-label={brand.name}>
                <span className="mask">
                  <span className="line case-line-1" aria-hidden="true">{first}</span>
                </span>
                {rest.length > 0 && (
                  <span className="mask">
                    <span className="line case-line-2" aria-hidden="true">{rest.join(" ")}</span>
                  </span>
                )}
              </h1>

              {brand.quote && (
                <blockquote className="brand-quote case-fade">
                  <p>{brand.quote.text}</p>
                  {brand.quote.by && <cite className="mono">{brand.quote.by}</cite>}
                </blockquote>
              )}

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
              src={brand.cover.src}
              width={brand.cover.width}
              height={brand.cover.height}
              alt={brand.cover.alt}
              fetchPriority="high"
              decoding="async"
            />
          </section>

          {sections.length > 1 && <SectionTabs sections={sections} brand={brand} />}

          {sections.map((d) => (
            <section className="brand-section" id={d.slug} key={d.slug} aria-label={d.title}>
              {d.slug === "video" ? (
                <div className="brand-videos">
                  {brand.video.map((video) => (
                    <VideoEmbed video={video} label={`${brand.name} film`} key={video.vimeo.id} />
                  ))}
                </div>
              ) : (
                <Gallery items={brand[d.slug]} kind="photo" />
              )}
            </section>
          ))}
        </main>

        <footer className="case-foot">
          {next && next.slug !== brand.slug && (
            <Link href={`/work/brand/${next.slug}/`} className="case-next" data-cursor="Next">
              <span className="case-next-title">
                {next.name} <ArrowRight />
              </span>
              <span className="case-next-meta mono">{disciplinesOf(next).map((d) => d.title).join(" · ")}</span>
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
