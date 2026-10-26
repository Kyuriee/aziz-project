"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll, { useLenis } from "./SmoothScroll";
import Cursor from "./Cursor";
import CaseNav from "./CaseNav";
import Lightbox from "./Lightbox";
import Roll from "./Roll";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "./Icon";
import { photoChapters, site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const chapters = photoChapters();

const SCREENS_PER_FRAME = 0.65; // jarak scroll (tinggi layar) untuk melempar satu foto
const HOLD = 0.5; // jeda di foto terakhir, dalam satuan foto
const runOf = (frames) => (frames - 1 + HOLD) * SCREENS_PER_FRAME; // panjang scroll satu bab, dalam tinggi layar

// Miring dan arah lempar tetap per foto (bukan acak), jadi hasil server dan klien sama
const tiltOf = (i) => ((i * 37) % 7 - 3) * 0.9;
const sideOf = (i) => (i % 2 ? 1 : -1);

/**
 * Satu bab = satu brand: foto bertumpuk seperti cetakan di atas meja berwarna brand; scroll melempar cetakan teratas.
 * Struktur: section tinggi (panjang scroll bab) berisi satu layar sticky. Sticky (bukan pin ScrollTrigger) supaya
 * tinggi layar ikut toolbar Chrome HP yang naik-turun; pin mengunci tinggi dalam piksel dan meninggalkan strip kosong.
 */
function Chapter({ chapter, first, still, onOpen }) {
  const { brand, frames } = chapter;
  const { palette } = brand;
  const style = { "--p-bg": palette.bg, "--p-fg": palette.fg, "--p-acc": palette.accent, "--run": runOf(frames.length) };

  return (
    <section className={`pt-chapter${still ? " is-still" : ""}`} style={style} aria-label={brand.name}>
      <div className="pt-sticky">
        <p className="pt-name" aria-hidden="true">{brand.name}</p>

        <div className="pt-stack">
          {frames.map((frame, i) => (
            <div className="pt-print" style={{ "--i": i, "--r": frame.width / frame.height }} key={frame.src}>
              <img
                src={frame.src}
                width={frame.width}
                height={frame.height}
                alt={frame.alt}
                loading={first && i === 0 ? "eager" : "lazy"}
                fetchPriority={first && i === 0 ? "high" : undefined}
                decoding="async"
              />
            </div>
          ))}
          {!still && <button type="button" className="pt-open" onClick={onOpen} data-cursor="View" aria-label={`View ${brand.name} photos`} />}
        </div>

        <div className="pt-foot">
          <div className="pt-ticks" aria-hidden="true">
            {frames.map((frame, i) => (
              <i className={`pt-tick${i === 0 ? " is-on" : ""}`} key={frame.src} />
            ))}
          </div>
          <Link href={`/work/brand/${brand.slug}/`} className="pt-go" data-cursor="Open" aria-label={`Open ${brand.name}`}>
            <ArrowUpRight />
          </Link>
        </div>

        {first && <span className="scroll-cue pt-cue" aria-hidden="true"><i /></span>}
      </div>
    </section>
  );
}

function Stage() {
  const root = useRef(null);
  const triggers = useRef([]);
  const current = useRef(chapters.map(() => 0)); // foto teratas tiap bab, dibaca tombol buka
  const lenis = useLenis();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(null); // { chapter, index }
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setStill(true);
  }, []);

  useEffect(() => {
    if (still) return;
    ScrollTrigger.config({ ignoreMobileResize: true }); // bar alamat HP naik-turun tidak perlu menghitung ulang posisi
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups = [];

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".pt-chapter").forEach((el, c) => {
        const prints = el.querySelectorAll(".pt-print");
        const ticks = el.querySelectorAll(".pt-tick");
        const name = el.querySelector(".pt-name");
        const stack = el.querySelector(".pt-stack");
        const cue = el.querySelector(".pt-cue");
        const last = prints.length - 1;
        const total = last + HOLD;

        // Cetakan di bawah sedikit lebih kecil dan miring; saat naik ke atas ia lurus dan penuh
        prints.forEach((print, i) => gsap.set(print, { rotation: tiltOf(i), scale: i === 0 ? 1 : 0.95 }));

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom", // layar sticky menempel sepanjang section; progres 0 → 1 = satu bab
            scrub: 0.6,
            invalidateOnRefresh: true,
            onToggle: (self) => {
              el.classList.toggle("is-live", self.isActive);
              if (self.isActive) setActive(c);
            },
            onUpdate: (self) => {
              const top = Math.min(last, Math.floor(self.progress * total + 0.5));
              if (top !== current.current[c]) {
                current.current[c] = top;
                ticks.forEach((tick, i) => tick.classList.toggle("is-on", i === top));
              }
              cue?.classList.toggle("is-off", self.progress > 0.02);
            },
          },
        });
        triggers.current[c] = tl.scrollTrigger;

        // Nama brand (kontur) bergeser pelan sepanjang bab
        tl.fromTo(
          name,
          { x: () => window.innerWidth * 0.06 },
          { x: () => -Math.max(0, name.scrollWidth - window.innerWidth * 0.94), duration: total },
          0
        );

        prints.forEach((print, i) => {
          if (i === last) return;
          const side = sideOf(i);
          tl.to(
            print,
            { x: () => side * window.innerWidth * 0.85, y: () => -window.innerHeight * 0.08, rotation: tiltOf(i) + side * 16, ease: "power2.in", duration: 1 },
            i
          );
          tl.to(prints[i + 1], { scale: 1, rotation: 0, ease: "power2.out", duration: 1 }, i);
        });

        // Tumpukan sedikit mengikuti pointer (hanya desktop)
        if (finePointer) {
          const tiltX = gsap.quickTo(stack, "rotationX", { duration: 0.8, ease: "power3" });
          const tiltY = gsap.quickTo(stack, "rotationY", { duration: 0.8, ease: "power3" });
          const onMove = (e) => {
            tiltY((e.clientX / window.innerWidth - 0.5) * 8);
            tiltX(-(e.clientY / window.innerHeight - 0.5) * 6);
          };
          el.addEventListener("pointermove", onMove);
          cleanups.push(() => el.removeEventListener("pointermove", onMove));
        }
      });

      // Pembuka: tumpukan bab pertama naik masuk
      const first = root.current.querySelector(".pt-chapter");
      gsap.from(first.querySelector(".pt-stack"), { y: 70, opacity: 0, duration: 1.4, ease: "expo.out", delay: 0.15 });
      gsap.from(first.querySelector(".pt-name"), { opacity: 0, duration: 1.6, ease: "power2.out" });
    }, root);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [still]);

  const jump = (c) => lenis?.scrollTo(triggers.current[c].start, { duration: 1.6 });

  return (
    <div className="case pt" ref={root}>
      <CaseNav label="Photo" />
      <h1 className="sr-only">Photo</h1>

      <main>
        {chapters.map((chapter, c) => (
          <Chapter
            chapter={chapter}
            first={c === 0}
            still={still}
            onOpen={() => setOpen({ chapter: c, index: current.current[c] })}
            key={chapter.brand.slug}
          />
        ))}
      </main>

      {!still && (
        <nav className="pt-rail" aria-label="Brands">
          {chapters.map(({ brand }, c) => (
            <button type="button" onClick={() => jump(c)} aria-label={brand.name} aria-current={active === c} data-cursor={brand.name} key={brand.slug}>
              <i />
            </button>
          ))}
        </nav>
      )}

      <Footer />

      {open && (
        <Lightbox
          items={chapters[open.chapter].frames}
          index={open.index}
          onIndex={(index) => setOpen({ ...open, index })}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}

// Project berikutnya (berputar), dan jalan kembali ke Work
function Footer() {
  const projects = site.works.filter((w) => w.slug && w.status !== "soon");
  const at = projects.findIndex((w) => w.slug === "photo");
  const next = projects.length > 1 ? projects[(at + 1) % projects.length] : null;

  return (
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
  );
}

/** Halaman Photo: bab per brand, foto bertumpuk. Data dari `photoChapters()` di data/site.js. */
export default function PhotoStage() {
  return (
    <SmoothScroll locked={false}>
      <Cursor />
      <Stage />
    </SmoothScroll>
  );
}
