"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "./Icon";
import { categories, site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const pad = (n) => String(n).padStart(2, "0");
const works = site.works;
const REVEAL = ".ph, .film-col, .film-ring, .sh"; // item yang muncul bertahap saat scroll

/* ---------- Visual tiap disiplin (semuanya dekoratif) ---------- */

// Foto bertumpuk dengan kedalaman berbeda; judul ada di belakangnya
function PhotoVisual({ images }) {
  const speeds = [1.2, 2, 3, 1.6]; // makin besar = drift scroll makin jauh
  return (
    <div className="visual" aria-hidden="true">
      {images.map((img, i) => (
        <div className={`ph ph-${i + 1}`} data-speed={speeds[i % speeds.length]} key={img.src}>
          <img className="ph-img" src={img.src} width={img.width} height={img.height} alt="" loading="lazy" decoding="async" />
        </div>
      ))}
    </div>
  );
}

// Dua pita film berlawanan arah, dari foto reel (placeholder sampai video ada)
function FilmVisual() {
  const frames = site.reel.frames;
  const cols = [[0, 1, 2, 3], [3, 4, 5, 2]];
  return (
    <div className="visual" aria-hidden="true">
      <div className="film">
        {cols.map((col, c) => (
          <div className={`film-col film-col-${c}`} key={c}>
            <div className="film-track">
              {[...col, ...col].map((f, k) => (
                <img className="film-frame" src={frames[f % frames.length]} alt="" loading="lazy" decoding="async" key={k} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="film-ring">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M42 33 70 50 42 67Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

// Komposisi bentuk + huruf: teaser desain sampai karya ada
function ShapesVisual() {
  return (
    <div className="visual" aria-hidden="true">
      <div className="sh sh-circle" data-speed="1.4"><i /></div>
      <div className="sh sh-square" data-speed="2.4"><i /></div>
      <div className="sh sh-dots" data-speed="1"><i /></div>
      <div className="sh sh-line" data-speed="1.8"><i /></div>
      <div className="sh sh-aa" data-speed="3"><span>Aa</span></div>
    </div>
  );
}

function Visual({ work }) {
  if (work.visual === "photos") return <PhotoVisual images={work.images} />;
  if (work.visual === "film") return <FilmVisual />;
  return <ShapesVisual />;
}

/* ---------- Satu panel = satu disiplin ---------- */
function Panel({ work }) {
  const palette = categories[work.slug]?.palette;
  const soon = work.status === "soon";
  const href = `/work/${work.slug}/`;
  const vars = palette ? { "--p-bg": palette.bg, "--p-fg": palette.fg, "--accent": palette.accent } : undefined;

  return (
    <article className="dis" style={vars} aria-label={work.title}>
      {soon ? (
        <Visual work={work} />
      ) : (
        <Link href={href} className="dis-visual-link" tabIndex={-1} aria-hidden="true" data-cursor="View">
          <Visual work={work} />
        </Link>
      )}

      <h3 className="dis-title">
        <span className="dis-title-in">{work.title}</span>
      </h3>

      <div className="dis-info">
        <p className="dis-kind mono">{work.kind}</p>
        {soon ? (
          <span className="dis-soon mono">Soon</span>
        ) : (
          <Link href={href} className="dis-cta" data-cursor="Open">
            Open <ArrowUpRight size="1.1em" />
          </Link>
        )}
      </div>
    </article>
  );
}

/**
 * Section Work: panggung yang menempel (CSS sticky). Scroll mengganti disiplin (Photo → Video → Design):
 * judul naik-turun, visual bertukar, dan warna latar berubah mengikuti palet tiap disiplin.
 * Tanpa JS atau dengan reduced-motion, panel tersusun vertikal (gaya dasar di CSS).
 */
export default function Works() {
  const root = useRef(null);
  const sticky = useRef(null);
  const counter = useRef(null);
  const bar = useRef(null);
  const first = categories[works[0]?.slug]?.palette;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const stage = root.current;
    const panels = gsap.utils.toArray(".dis", stage);
    const n = panels.length;
    stage.classList.add("is-pinned");

    const ctx = gsap.context(() => {
      const setBar = gsap.quickSetter(bar.current, "scaleX");
      const titleOf = (panel) => panel.querySelector(".dis-title-in");

      // Keadaan awal: hanya panel pertama tampil, dan item-itemnya belum muncul (muncul saat di-scroll)
      panels.forEach((panel, i) => {
        gsap.set(panel.querySelectorAll(REVEAL), { opacity: 0, y: 60 });
        gsap.set(panel, { opacity: i === 0 ? 1 : 0 });
        gsap.set(titleOf(panel), { yPercent: i === 0 ? 0 : 110 });
        panel.inert = i !== 0;
      });

      let current = 0;
      const tl = gsap.timeline({
        scrollTrigger: {
          // Pembungkus setinggi (n * 110 + 100)dvh; layar menempel selama (n * 110)dvh scroll.
          // Sticky (bukan pin ScrollTrigger) supaya tinggi ikut toolbar browser HP dan tidak "membeku".
          trigger: stage,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setBar(self.progress);
            const t = self.progress * tl.duration();
            const index = Math.min(n - 1, Math.max(0, Math.floor(t + 0.14)));
            if (index !== current) {
              current = index;
              counter.current.textContent = `${pad(index + 1)} / ${pad(n)}`;
              panels.forEach((panel, k) => { panel.inert = k !== index; });
            }
          },
        },
      });

      // Pergantian disiplin i → i+1: judul keluar naik, judul baru masuk dari bawah, warna ikut berubah
      for (let i = 0; i < n - 1; i++) {
        const t = i + 0.72;
        const next = categories[works[i + 1].slug]?.palette;
        tl.to(titleOf(panels[i]), { yPercent: -110, duration: 0.28, ease: "power2.in" }, t)
          .to(panels[i], { opacity: 0, duration: 0.28, ease: "none" }, t)
          .fromTo(panels[i + 1], { opacity: 0 }, { opacity: 1, duration: 0.28, ease: "none" }, t + 0.1)
          .fromTo(titleOf(panels[i + 1]), { yPercent: 110 }, { yPercent: 0, duration: 0.34, ease: "power2.out" }, t + 0.12);
        if (next) tl.to(sticky.current, { backgroundColor: next.bg, color: next.fg, duration: 0.3, ease: "none" }, t);
      }

      // Drift: tiap elemen bergerak dengan kecepatan berbeda selama panelnya terlihat
      panels.forEach((panel, i) => {
        panel.querySelectorAll("[data-speed]").forEach((el) => {
          const s = parseFloat(el.dataset.speed) * 6;
          tl.fromTo(el, { yPercent: s }, { yPercent: -s, ease: "none", duration: 1.6 }, Math.max(0, i - 0.3));
        });
      });

      // Item tiap panel naik dan menyala satu per satu saat di-scroll (panel pertama langsung mulai)
      panels.forEach((panel, i) => {
        const items = panel.querySelectorAll(REVEAL);
        const start = i === 0 ? 0.04 : i + 0.08;
        const gap = Math.min(0.1, 0.45 / Math.max(1, items.length));
        items.forEach((el, k) => {
          tl.fromTo(el, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }, start + k * gap);
        });
      });

      // Masuk: judul pertama naik dari bawah saat section mendekat
      gsap.from(titleOf(panels[0]), {
        yPercent: 110,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: stage, start: "top 75%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="stage" id="work" ref={root} style={{ "--n": works.length }}>
      <div className="stage-sticky" ref={sticky} style={first ? { backgroundColor: first.bg, color: first.fg } : undefined}>
        <h2 className="sr-only">Work</h2>
        <div className="stage-head mono" aria-hidden="true">
          <span>(01) Work</span>
          <span ref={counter}>{`01 / ${pad(works.length)}`}</span>
          <span>{pad(works.length)} disciplines</span>
        </div>

        {works.map((work) => (
          <Panel work={work} key={work.slug} />
        ))}

        <div className="stage-bar" aria-hidden="true">
          <i ref={bar} />
        </div>
      </div>
    </section>
  );
}
