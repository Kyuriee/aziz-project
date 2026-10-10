"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "./Icon";
import { site } from "@/data/site";

const WORDS = ["Photo", "Video", "Design"];
const STEP = 0.85; // detik per disiplin (3 disiplin ≈ 2,6 detik)
const PATH_D = "M12 78 C20 20 60 10 66 52 S86 90 90 24"; // kurva bezier untuk adegan Design
const ANCHORS = [[12, 78], [66, 52], [90, 24]];
const HANDLES = [[20, 20], [60, 10], [72, 94], [86, 90]];
const pad2 = (n) => String(n).padStart(2, "0");

// Tandai preloader sudah tampil (sesi ini), supaya tidak diulang saat kembali dari halaman project
function markSeen() {
  try {
    sessionStorage.setItem("pre-seen", "1");
  } catch (e) {}
  document.documentElement.classList.add("pre-seen");
}

/**
 * Preloader "digital creative": tiga adegan singkat, satu per disiplin.
 *  Photo  → bingkai viewfinder, kotak fokus mengunci, rana berkedip.
 *  Video  → REC berkedip, timecode berjalan, playhead menyapu timeline.
 *  Design → kurva bezier digambar pen tool lengkap dengan anchor dan handle.
 * Lalu tirai hitam naik membuka halaman. Ada tombol Skip (atau tekan Esc).
 * Hanya opacity, transform, dan atribut SVG yang dianimasikan (aman untuk iOS Safari).
 */
export default function Preloader({ onDone }) {
  const root = useRef(null);
  const intro = useRef(null);
  const exit = useRef(null);
  const done = useRef(onDone);
  done.current = onDone; // selalu versi terbaru, tanpa memicu ulang timeline

  // Skip: hentikan adegan, langsung buka tirai
  const skip = useCallback(() => {
    intro.current?.kill();
    exit.current?.play();
  }, []);

  useEffect(() => {
    // Sudah pernah tampil: langsung buka (class pre-seen sudah menyembunyikan .pre lewat CSS)
    if (document.documentElement.classList.contains("pre-seen")) {
      done.current();
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current;
    const $ = (selector) => el.querySelector(selector);
    const $$ = (selector) => gsap.utils.toArray(selector, el);

    const ctx = gsap.context(() => {
      const scenes = $$(".scene");
      const words = $$(".pre-word-in");
      const bars = $$(".pre-step b");

      // Keluar: halaman mulai bergerak di bawah tirai, tirai naik (reduced-motion: pudar saja)
      exit.current = gsap
        .timeline({ paused: true })
        .call(() => done.current())
        .to(el, reduced ? { opacity: 0, duration: 0.4 } : { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, 0.05)
        .set(el, { display: "none" })
        .call(markSeen);

      if (reduced) {
        gsap.set(scenes[0], { opacity: 1 });
        gsap.set(words[0], { yPercent: 0 });
        intro.current = gsap.timeline().to({}, { duration: 0.6 }).call(() => exit.current.play());
        return;
      }

      gsap.set(scenes, { opacity: 0 });
      gsap.set(words, { yPercent: 110 });
      gsap.set(bars, { scaleX: 0 });

      const tl = gsap.timeline();
      intro.current = tl;

      // Kerangka tiap adegan: adegan menyala, kata naik, bar progres terisi
      WORDS.forEach((_, i) => {
        const t = i * STEP;
        tl.to(scenes[i], { opacity: 1, duration: 0.12 }, t)
          .to(words[i], { yPercent: 0, duration: 0.45, ease: "expo.out" }, t + 0.02)
          .fromTo(bars[i], { scaleX: 0 }, { scaleX: 1, duration: STEP, ease: "none" }, t);
        if (i < WORDS.length - 1) {
          tl.to(scenes[i], { opacity: 0, duration: 0.1 }, t + STEP - 0.12)
            .to(words[i], { yPercent: -110, duration: 0.22, ease: "power2.in" }, t + STEP - 0.26);
        }
      });

      // 1) Photo: kotak fokus menyempit lalu mengunci, rana berkedip sekali
      const focus = $(".focus");
      tl.fromTo(focus, { scale: 1.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }, 0.05)
        .to(focus, { scale: 0.88, duration: 0.12, ease: "power1.inOut" }, 0.42)
        .to(focus, { scale: 1, duration: 0.12, ease: "power1.inOut" }, 0.54)
        .fromTo($(".focus-label"), { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0.54)
        .fromTo($(".shutter"), { opacity: 0 }, { opacity: 0.5, duration: 0.05 }, 0.58)
        .to($(".shutter"), { opacity: 0, duration: 0.2 }, 0.63);

      // 2) Video: REC berkedip, timecode berjalan, playhead menyapu timeline
      const v = STEP;
      const timeline = $(".tl");
      const tc = { f: 0 };
      tl.to($(".rec-dot"), { opacity: 0.15, duration: 0.12, repeat: 5, yoyo: true, ease: "none" }, v)
        .to(tc, { f: 22, duration: 0.78, ease: "none", onUpdate: () => { $(".rec-tc").textContent = `00:00:00:${pad2(Math.floor(tc.f))}`; } }, v)
        .fromTo($(".tl-fill"), { scaleX: 0 }, { scaleX: 1, duration: 0.78, ease: "none" }, v)
        .fromTo($(".tl-head"), { x: 0 }, { x: () => timeline.offsetWidth, duration: 0.78, ease: "none" }, v);

      // 3) Design: pen tool menggambar kurva, anchor dan handle menyusul
      const d = 2 * STEP;
      const path = $(".d-path");
      const cursor = $(".d-cursor");
      const length = path.getTotalLength();
      const prog = { p: 0 };
      tl.fromTo(path, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" }, d + 0.05)
        .to(prog, {
          p: 1,
          duration: 0.5,
          ease: "power2.inOut",
          onUpdate: () => {
            const pt = path.getPointAtLength(prog.p * length);
            cursor.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
          },
        }, d + 0.05)
        .fromTo($$(".anchor"), { opacity: 0 }, { opacity: 1, duration: 0.12, stagger: 0.1 }, d + 0.25)
        .fromTo($$(".d-handle"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, d + 0.45);

      // Selesai → buka tirai
      tl.call(() => exit.current.play(), null, WORDS.length * STEP + 0.08);
    }, root);

    const onKey = (e) => e.key === "Escape" && skip();
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      ctx.revert();
    };
  }, [skip]);

  return (
    <div className="pre" ref={root} role="status" aria-label="Intro">
      <div className="pre-top mono">
        <span>{site.name}</span>
        <button type="button" className="pre-skip mono" onClick={skip}>
          Skip <ArrowRight size="1.1em" />
        </button>
      </div>

      <div className="pre-stage" aria-hidden="true">
        <div className="pre-frame">
          <i className="corner c-tl" />
          <i className="corner c-tr" />
          <i className="corner c-bl" />
          <i className="corner c-br" />

          {/* Photo */}
          <div className="scene scene-photo">
            <i className="cross cross-h" />
            <i className="cross cross-v" />
            <div className="focus">
              <span className="focus-label mono">AF</span>
            </div>
            <div className="shutter" />
          </div>

          {/* Video */}
          <div className="scene scene-video">
            <div className="rec mono">
              <i className="rec-dot" />
              REC
              <span className="rec-tc">00:00:00:00</span>
            </div>
            <div className="tl">
              <i className="tl-line" />
              <i className="tl-fill" />
              <i className="tl-key tl-key-1" />
              <i className="tl-key tl-key-2" />
              <i className="tl-key tl-key-3" />
              <i className="tl-head" />
            </div>
          </div>

          {/* Design */}
          <div className="scene scene-design">
            <svg className="d-svg" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <path className="d-handle" d="M12 78 20 20M66 52 60 10M66 52 72 94M90 24 86 90" strokeWidth="0.25" strokeOpacity="0.5" />
              {HANDLES.map(([x, y]) => (
                <circle className="d-handle" key={`${x}-${y}`} cx={x} cy={y} r="1.6" strokeWidth="0.3" />
              ))}
              <path className="d-path" d={PATH_D} pathLength="1" strokeDasharray="1" strokeWidth="0.55" />
              {ANCHORS.map(([x, y]) => (
                <rect className="anchor" key={`${x}-${y}`} x={x - 2} y={y - 2} width="4" height="4" fill="#050505" strokeWidth="0.4" />
              ))}
              <g className="d-cursor" transform="translate(12 78)">
                <path d="M0 0V10L2.8 7.6 4.8 12 6.6 11.2 4.6 6.9 8 6.6Z" fill="currentColor" stroke="none" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className="pre-word" aria-hidden="true">
        {WORDS.map((word) => (
          <span className="pre-word-mask" key={word}>
            <span className="pre-word-in">{word}</span>
          </span>
        ))}
      </div>

      <div className="pre-steps" aria-hidden="true">
        {WORDS.map((word) => (
          <i className="pre-step" key={word}>
            <b />
          </i>
        ))}
      </div>
    </div>
  );
}
