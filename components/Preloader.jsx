"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { site } from "@/data/site";

const COUNT = [3, 2, 1];
const STEP = 0.85; // detik per angka
const PIE = 2 * Math.PI * 24; // keliling lingkaran "pie" (r = 24, stroke 48 = isi sampai r 48)

// 60 garis skala melingkar; tiap kelima lebih panjang
const TICKS = Array.from({ length: 60 }, (_, i) => ({ angle: i * 6, long: i % 5 === 0 }));

// Tandai preloader sudah tampil (sesi ini), supaya tidak diulang saat kembali dari halaman project
function markSeen() {
  try {
    sessionStorage.setItem("pre-seen", "1");
  } catch (e) {}
  document.documentElement.classList.add("pre-seen");
}

/**
 * Film leader klasik: angka 3-2-1 di dalam dial, garis sapuan berputar tiap detik,
 * lalu satu kilatan putih membuka halaman.
 * Hanya opacity, transform, dan atribut SVG yang dianimasikan (aman untuk iOS Safari).
 */
export default function Preloader({ onDone }) {
  const root = useRef(null);
  const num = useRef(null);
  const pie = useRef(null);
  const sweep = useRef(null);
  const flash = useRef(null);
  const done = useRef(onDone);
  done.current = onDone; // selalu versi terbaru, tanpa memicu ulang timeline

  useEffect(() => {
    // Sudah pernah tampil: langsung buka (class pre-seen sudah menyembunyikan .pre lewat CSS)
    if (document.documentElement.classList.contains("pre-seen")) {
      done.current();
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        // Tanpa countdown: tampil sebentar lalu pudar
        gsap
          .timeline()
          .call(() => { num.current.textContent = "1"; })
          .to(root.current, { opacity: 0, duration: 0.4, delay: 0.5 })
          .call(() => done.current())
          .set(root.current, { display: "none" })
          .call(markSeen);
        return;
      }

      const tl = gsap.timeline();

      COUNT.forEach((n, i) => {
        const t = i * STEP;
        tl.call(() => { num.current.textContent = n; }, null, t)
          .fromTo(num.current, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 0.22, ease: "power2.out" }, t)
          .fromTo(pie.current, { attr: { "stroke-dasharray": `0 ${PIE}` } }, { attr: { "stroke-dasharray": `${PIE} ${PIE}` }, duration: STEP - 0.06, ease: "none" }, t)
          .fromTo(sweep.current, { rotation: 0, svgOrigin: "50 50" }, { rotation: 360, svgOrigin: "50 50", duration: STEP - 0.06, ease: "none" }, t)
          .to(num.current, { opacity: 0, duration: 0.1 }, t + STEP - 0.12);
      });

      const end = COUNT.length * STEP;
      tl.to(flash.current, { opacity: 1, duration: 0.14, ease: "power2.in" }, end + 0.05)
        .set(".pre-frame", { autoAlpha: 0 })
        .set(root.current, { backgroundColor: "rgba(5,5,5,0)" })
        .call(() => done.current())
        .to(flash.current, { opacity: 0, duration: 1.1, ease: "power2.out" })
        .set(root.current, { display: "none" })
        .call(markSeen);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pre" ref={root} aria-hidden="true">
      <div className="pre-frame">
        <div className="pre-stage">
          <div className="pre-dial">
            <svg className="pre-svg" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <circle ref={pie} cx="50" cy="50" r="24" stroke="rgba(243,243,241,0.14)" strokeWidth="48" strokeDasharray={`0 ${PIE}`} transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="48" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <circle cx="50" cy="50" r="26" strokeWidth="1" strokeOpacity="0.45" vectorEffect="non-scaling-stroke" />
              <path d="M0 50H24M76 50H100M50 0V24M50 76V100" strokeWidth="1" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />
              {TICKS.map((tick) => (
                <line
                  key={tick.angle}
                  x1="50" y1="2" x2="50" y2={tick.long ? 5.2 : 3.6}
                  transform={`rotate(${tick.angle} 50 50)`}
                  strokeWidth="1" strokeOpacity={tick.long ? 0.9 : 0.5} vectorEffect="non-scaling-stroke"
                />
              ))}
              <line ref={sweep} x1="50" y1="50" x2="50" y2="2" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="pre-num serif" ref={num}>3</div>
          </div>
        </div>

        <div className="pre-ui mono">
          <div className="pre-row">
            <span>Portfolio</span>
            <span>© {site.year}</span>
          </div>
          <div className="pre-row">
            <span>Reel 01</span>
            <span>24 fps</span>
          </div>
        </div>
      </div>
      <div className="pre-flash" ref={flash} />
    </div>
  );
}
