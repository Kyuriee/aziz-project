"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "./SmoothScroll";
import Cursor from "./Cursor";
import CaseNav from "./CaseNav";
import CaseFooter from "./CaseFooter";
import Lightbox from "./Lightbox";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, FormatAds, FormatBanner, FormatBundle, FormatFeed, FormatGreeting, FormatHighlight,
  FormatLogo, FormatProduct, FormatStory, Identity, Instagram, Shop, Tag,
} from "./Icon";
import { DESIGN_CHANNELS, categories, designChapters, designSamples } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const chapters = designChapters();
const samples = designSamples(8);
const palette = categories.design.palette;

// Ikon platform dan format; platform atau format baru: tambahkan di sini dan di DESIGN_CHANNELS (data/site.js)
const CHANNEL_ICON = { identity: Identity, instagram: Instagram, shopee: Shop, promo: Tag };
const FORMAT_ICON = {
  ads: FormatAds, banner: FormatBanner, bundle: FormatBundle, feed: FormatFeed, greeting: FormatGreeting,
  highlight: FormatHighlight, logo: FormatLogo, product: FormatProduct, story: FormatStory,
};
const titleOf = (slug) => slug.charAt(0).toUpperCase() + slug.slice(1);
const channelTitle = (slug) => DESIGN_CHANNELS.find((c) => c.slug === slug)?.title ?? titleOf(slug);

/** Pembuka: HP berisi feed yang ikut ter-scroll saat halaman di-scroll (layar sticky, bukan pin, supaya ikut toolbar HP). */
function Intro({ still }) {
  return (
    <section
      className={`ds-intro${still ? " is-still" : ""}`}
      style={{ "--p-bg": palette.bg, "--p-fg": palette.fg }}
      aria-label="Design"
    >
      <div className="ds-intro-sticky">
        <p className="ds-word" aria-hidden="true">Design</p>
        <div className="ds-phone" aria-hidden="true">
          <div className="ds-screen">
            <div className="ds-feed">
              {samples.map((post, i) => (
                <img src={post.src} width={post.width} height={post.height} alt="" loading={i < 3 ? "eager" : "lazy"} decoding="async" key={post.src} />
              ))}
            </div>
          </div>
        </div>
        <span className="scroll-cue ds-cue" aria-hidden="true"><i /></span>
      </div>
    </section>
  );
}

/** Satu rel = satu format di satu platform (mis. Instagram Feed). Digeser dengan sentuh, drag, atau panah. */
function Rail({ group, onOpen }) {
  const rail = useRef(null);
  const bar = useRef(null);
  const { channel, format, items } = group;
  const ChannelIcon = CHANNEL_ICON[channel];
  const FormatIcon = FORMAT_ICON[format];

  useEffect(() => {
    const el = rail.current;
    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;

    // Penanda posisi: lebar = bagian rel yang terlihat, geser = posisi scroll
    const sync = () => {
      const max = el.scrollWidth - el.clientWidth;
      bar.current.style.setProperty("--w", `${Math.min(100, (el.clientWidth / el.scrollWidth) * 100)}%`);
      bar.current.style.setProperty("--p", max > 0 ? el.scrollLeft / max : 0);
    };
    const onDown = (e) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
    };
    const onMove = (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) {
        moved = true;
        el.classList.add("is-drag");
      }
      if (moved) el.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      down = false;
      el.classList.remove("is-drag");
    };
    // Setelah drag, klik yang menyusul tidak boleh membuka viewer
    const onClick = (e) => {
      if (!moved) return;
      e.preventDefault();
      e.stopPropagation();
      moved = false;
    };

    sync();
    el.addEventListener("scroll", sync, { passive: true });
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    const resize = new ResizeObserver(sync);
    resize.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
      resize.disconnect();
    };
  }, []);

  const nudge = (dir) => rail.current.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div className="ds-group">
      <div className="ds-label mono">
        <span className="ds-label-icons" aria-hidden="true">
          {ChannelIcon && <ChannelIcon />}
          {FormatIcon && <FormatIcon />}
        </span>
        <span>{titleOf(format)}</span>
        <span className="ds-label-count">{String(items.length).padStart(2, "0")}</span>
        <span className="sr-only">{channelTitle(channel)}</span>
        <div className="ds-arrows">
          <button type="button" className="ds-arrow" onClick={() => nudge(-1)} aria-label="Previous">
            <ArrowLeft />
          </button>
          <button type="button" className="ds-arrow" onClick={() => nudge(1)} aria-label="Next">
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className="ds-rail" data-format={format} ref={rail}>
        {items.map((item, i) => (
          <button
            type="button"
            className="ds-item"
            style={{ "--r": item.width / item.height }}
            onClick={() => onOpen(items, i)}
            data-cursor="View"
            aria-label={item.alt}
            key={item.src}
          >
            <img src={item.src} width={item.width} height={item.height} alt="" loading="lazy" decoding="async" draggable="false" />
          </button>
        ))}
      </div>

      <div className="ds-progress" aria-hidden="true">
        <i ref={bar} />
      </div>
    </div>
  );
}

/** Satu bab = satu brand, di atas warna brand itu; isinya rel per platform dan format. */
function Chapter({ chapter, onOpen }) {
  const { brand, groups } = chapter;
  const { palette: p } = brand;
  const style = { "--p-bg": p.bg, "--p-fg": p.fg, "--p-acc": p.accent, "--p-line": p.line };

  return (
    <section className="ds-chapter" style={style} aria-label={brand.name}>
      <header className="ds-head">
        <h2 className="ds-name">{brand.name}</h2>
        <Link href={`/work/brand/${brand.slug}/`} className="ds-go" data-cursor="Open" aria-label={`Open ${brand.name}`}>
          <ArrowUpRight />
        </Link>
      </header>
      {groups.map((group) => (
        <Rail group={group} onOpen={onOpen} key={`${group.channel}-${group.format}`} />
      ))}
    </section>
  );
}

function Stage() {
  const root = useRef(null);
  const [open, setOpen] = useState(null); // { items, index }
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setStill(true);
  }, []);

  useEffect(() => {
    if (still) return;
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      // Pembuka: feed di dalam HP naik seiring scroll, kata DESIGN bergeser, HP sedikit berputar
      const intro = root.current.querySelector(".ds-intro");
      const feed = intro.querySelector(".ds-feed");
      const screen = intro.querySelector(".ds-screen");
      const word = intro.querySelector(".ds-word");
      const phone = intro.querySelector(".ds-phone");
      const cue = intro.querySelector(".ds-cue");

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: intro,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => cue?.classList.toggle("is-off", self.progress > 0.02),
          },
        })
        .fromTo(feed, { y: 0 }, { y: () => -Math.max(0, feed.offsetHeight - screen.offsetHeight) }, 0)
        .fromTo(word, { x: () => window.innerWidth * 0.05 }, { x: () => -Math.max(0, word.scrollWidth - window.innerWidth * 0.95) }, 0)
        .fromTo(phone, { rotation: -6 }, { rotation: 4 }, 0);

      gsap.from(phone, { y: 80, opacity: 0, duration: 1.4, ease: "expo.out", delay: 0.15 });

      // Bab: nama brand naik masuk; beberapa item pertama tiap rel naik saat rel mendekat (selalu berakhir tampil penuh)
      gsap.utils.toArray(".ds-chapter").forEach((chapter) => {
        gsap.from(chapter.querySelector(".ds-name"), {
          yPercent: 40, opacity: 0, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: chapter, start: "top 80%", once: true },
        });
        chapter.querySelectorAll(".ds-rail").forEach((rail) => {
          const firstItems = Array.from(rail.children).slice(0, 5);
          gsap.set(firstItems, { opacity: 0, y: 50 });
          ScrollTrigger.create({
            trigger: rail,
            start: "top 92%",
            once: true,
            onEnter: () => gsap.to(firstItems, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 }),
          });
        });
      });
    }, root);

    return () => ctx.revert();
  }, [still]);

  return (
    <div className="case ds" ref={root}>
      <CaseNav label="Design" />
      <h1 className="sr-only">Design</h1>

      <main>
        <Intro still={still} />
        {chapters.map((chapter) => (
          <Chapter chapter={chapter} onOpen={(items, index) => setOpen({ items, index })} key={chapter.brand.slug} />
        ))}
      </main>

      <CaseFooter slug="design" />

      {open && (
        <Lightbox
          items={open.items}
          index={open.index}
          onIndex={(index) => setOpen({ ...open, index })}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}

/** Halaman Design: pembuka HP berisi feed, lalu satu bab per brand dengan rel per platform dan format. Data dari `designChapters()` di data/site.js. */
export default function DesignStage() {
  return (
    <SmoothScroll locked={false}>
      <Cursor />
      <Stage />
    </SmoothScroll>
  );
}
