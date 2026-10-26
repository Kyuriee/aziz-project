"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "./Icon";
import { categories, designSamples, journey, site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const pad = (n) => String(n).padStart(2, "0");
const works = site.works;
const REVEAL = ".wk-print, .film-col, .film-ring, .wk-phone"; // item yang naik saat panelnya aktif
const DRIFT = [1, 1.6, 2.2, 1.3]; // kecepatan drift tiap item (kecil, supaya foto tidak keluar dari layar)

/* ---------- Visual tiap disiplin (semuanya dekoratif) ---------- */

// Cetakan foto bertumpuk, bahasa yang sama dengan halaman Photo. Ukuran dihitung dari rasio foto di CSS, jadi selalu muat utuh
function PhotoVisual({ images }) {
  return (
    <div className="visual" aria-hidden="true">
      {images.map((img, i) => (
        <div className={`wk-print wk-print-${i + 1}`} data-speed={DRIFT[i % DRIFT.length]} style={{ "--r": img.width / img.height }} key={img.src}>
          <img src={img.src} width={img.width} height={img.height} alt="" loading="eager" fetchPriority={i === 0 ? "high" : undefined} decoding="async" />
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

// Teaser Design: HP dengan feed yang jalan sendiri, isinya karya Design nyata. Belum ada karya: tile bertipografi dari nama brand di CV
function FeedVisual() {
  const posts = designSamples(6);
  const tiles = journey.filter((j) => j.brand && j.company.length <= 20).slice(0, 5);
  const loop = (list) => [...list, ...list];
  return (
    <div className="visual" aria-hidden="true">
      <div className="wk-phone" data-speed={DRIFT[1]}>
        <div className="wk-screen">
          <div className="wk-feed">
            {posts.length
              ? loop(posts).map((post, k) => (
                  <img className="wk-post-img" src={post.src} width={post.width} height={post.height} alt="" loading="lazy" decoding="async" key={k} />
                ))
              : loop(tiles).map((j, k) => (
                  <div className={`wk-post wk-post-${(k % tiles.length) + 1}`} key={k}>
                    <span className="wk-post-idx mono">{pad((k % tiles.length) + 1)}</span>
                    <span className="wk-post-name">{j.company}</span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Visual({ work }) {
  if (work.visual === "photos") return <PhotoVisual images={work.images} />;
  if (work.visual === "film") return <FilmVisual />;
  return <FeedVisual />;
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
          <Link href={href} className="dis-go" aria-label={`Open ${work.title}`} data-cursor="Open">
            <ArrowUpRight />
          </Link>
        )}
      </div>
    </article>
  );
}

/**
 * Section Work: panggung yang menempel (CSS sticky). Scroll mengganti disiplin (Photo → Video → Design):
 * judul naik-turun, panel bergantian (satu tampil, yang lain visibility:hidden), dan warna latar mengikuti palet disiplin.
 * Item panel muncul berdasarkan panel aktif, bukan progress scroll: foto selalu tampil penuh walau scroll cepat
 * atau lompat dari navbar. Tanpa JS atau dengan reduced-motion, panel tersusun vertikal (gaya dasar di CSS).
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
      const itemsOf = (panel) => panel.querySelectorAll(REVEAL);

      // Item naik satu per satu; selalu berakhir di opacity 1 (tidak bergantung pada posisi scroll)
      const showItems = (panel) =>
        gsap.fromTo(itemsOf(panel), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.09, overwrite: "auto" });

      // Keadaan awal: hanya panel pertama tampil; item-itemnya menunggu masuk
      panels.forEach((panel, i) => {
        gsap.set(itemsOf(panel), { opacity: 0, y: 60 });
        gsap.set(panel, { autoAlpha: i === 0 ? 1 : 0 });
        gsap.set(titleOf(panel), { yPercent: i === 0 ? 0 : 110 });
        panel.inert = i !== 0;
      });

      let current = 0;
      const tl = gsap.timeline({
        scrollTrigger: {
          // Pembungkus setinggi (n * 110 + 100)lvh; layar menempel selama (n * 110)lvh scroll.
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
              if (counter.current) counter.current.textContent = `${pad(index + 1)} / ${pad(n)}`;
              panels.forEach((panel, k) => { panel.inert = k !== index; });
              showItems(panels[index]);
            }
          },
        },
      });

      // Pergantian disiplin i → i+1, berurutan (tanpa tumpang tindih): panel lama habis dulu, baru panel baru masuk.
      // Judul keluar naik, judul baru masuk dari bawah, warna latar ikut berubah.
      for (let i = 0; i < n - 1; i++) {
        const t = i + 0.72;
        const next = categories[works[i + 1].slug]?.palette;
        tl.to(titleOf(panels[i]), { yPercent: -110, duration: 0.2, ease: "power2.in" }, t)
          .to(panels[i], { autoAlpha: 0, duration: 0.2, ease: "none" }, t)
          .fromTo(panels[i + 1], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: "none" }, t + 0.2)
          .fromTo(titleOf(panels[i + 1]), { yPercent: 110 }, { yPercent: 0, duration: 0.3, ease: "power2.out" }, t + 0.2);
        if (next) tl.to(sticky.current, { backgroundColor: next.bg, color: next.fg, duration: 0.4, ease: "none" }, t);
      }

      // Drift: tiap elemen bergerak dengan kecepatan berbeda selama panelnya terlihat
      panels.forEach((panel, i) => {
        panel.querySelectorAll("[data-speed]").forEach((el) => {
          const s = parseFloat(el.dataset.speed) * 5;
          tl.fromTo(el, { yPercent: s }, { yPercent: -s, ease: "none", duration: 1.6 }, Math.max(0, i - 0.3));
        });
      });

      // Masuk: judul dan item panel pertama muncul saat section mendekat (juga saat lompat dari navbar)
      gsap.from(titleOf(panels[0]), { yPercent: 110, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: stage, start: "top 75%", once: true } });
      ScrollTrigger.create({ trigger: stage, start: "top 85%", once: true, onEnter: () => showItems(panels[0]) });
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
