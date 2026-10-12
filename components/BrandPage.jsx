"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import SmoothScroll, { useLenis } from "./SmoothScroll";
import Cursor from "./Cursor";
import CaseNav from "./CaseNav";
import VideoEmbed from "./VideoEmbed";
import useCaseIntro from "./useCaseIntro";
import { ArrowDown, ArrowLeft, ArrowRight } from "./Icon";
import Roll from "./Roll";
import { brands, disciplinesOf, site } from "@/data/site";

const SCROLL_OFFSET = -80;

// Posisi mosaik tiap foto: yang lanskap melebar penuh, yang potret berpasangan (pos-* di globals.css)
function layoutShots(items) {
  const pair = ["pa", "pb", "qa", "qb"];
  let portrait = 0;
  return items.map((item) => ({ ...item, pos: item.width > item.height ? "wide" : pair[portrait++ % pair.length] }));
}

// Loncat ke #photo / #video / #design lewat Lenis (dari link chip halaman disiplin)
function HashJump() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis || !window.location.hash) return;
    const t = setTimeout(() => lenis.scrollTo(window.location.hash, { offset: SCROLL_OFFSET }), 300);
    return () => clearTimeout(t);
  }, [lenis]);
  return null;
}

function Jump({ id, children }) {
  const lenis = useLenis();
  const go = (e) => {
    if (!lenis) return;
    e.preventDefault();
    lenis.scrollTo(`#${id}`, { offset: SCROLL_OFFSET });
  };
  return (
    <a href={`#${id}`} className="brand-jump" onClick={go} data-cursor="Go">
      {children}
      <ArrowDown />
    </a>
  );
}

function Gallery({ items }) {
  return (
    <div className="case-gallery">
      {layoutShots(items).map((shot) => (
        <figure className={`shot reveal pos-${shot.pos}`} key={shot.src}>
          <img src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} loading="lazy" decoding="async" />
        </figure>
      ))}
    </div>
  );
}

/** Halaman satu brand: quote dan lama kerja di atas, lalu karya Photo, Video, Design di bawahnya. */
export default function BrandPage({ brand }) {
  const root = useRef(null);
  useCaseIntro(root);

  const disciplines = disciplinesOf(brand);
  const [first, ...rest] = brand.name.split(" ");
  const next = brands[(brands.findIndex((b) => b.slug === brand.slug) + 1) % brands.length];
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

              {disciplines.length > 1 && (
                <nav className="brand-jumps mono case-fade" aria-label="Sections">
                  {disciplines.map((d) => (
                    <Jump id={d.slug} key={d.slug}>{d.title}</Jump>
                  ))}
                </nav>
              )}
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

          {disciplines.map((d) => (
            <section className="brand-section" id={d.slug} key={d.slug} aria-labelledby={`${d.slug}-h`}>
              <h2 className="brand-h" id={`${d.slug}-h`}>
                {d.title}
                <span className="mono">{brand[d.slug].length}</span>
              </h2>
              {d.slug === "video" ? (
                <div className="brand-videos">
                  {brand.video.map((video) => (
                    <VideoEmbed video={video} label={`${brand.name} film`} key={video.vimeo.id} />
                  ))}
                </div>
              ) : (
                <Gallery items={brand[d.slug]} />
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
