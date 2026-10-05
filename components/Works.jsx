"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Frame from "./Frame";
import { ArrowUpRight } from "./Icon";
import { cases, site } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const HIDDEN = "inset(50% 50% 50% 50%)";
const SHOWN = "inset(0% 0% 0% 0%)";

// Palet brand milik work ke-i (null kalau tidak ada)
const brandOf = (work) => cases[work?.slug]?.palette ?? null;
const paletteVars = (p) =>
  p ? { "--ink": p.bg, "--paper": p.fg, "--mute": p.mute, "--line": p.line } : undefined;

export default function Works() {
  const root = useRef(null);
  const preview = useRef(null);
  const follow = useRef(null);
  const [active, setActive] = useState(0);
  const [palette, setPalette] = useState(null); // palet brand yang sedang aktif

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Garis & judul tiap baris muncul saat masuk viewport
      gsap.utils.toArray(".work").forEach((row) => {
        const trigger = { trigger: row, start: "top 90%" };
        gsap.fromTo(row, { "--s": 0 }, { "--s": 1, duration: 1.4, ease: "expo.out", scrollTrigger: trigger });
        gsap.from(row.querySelector(".ttl-in"), {
          yPercent: 110,
          duration: 1.3,
          ease: "expo.out",
          clearProps: "transform",
          scrollTrigger: trigger,
        });
        gsap.from(row.querySelectorAll(".work-idx, .work-meta"), {
          opacity: 0,
          y: 12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: trigger,
        });
      });

      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        // Preview mengikuti kursor (hanya pointer halus)
        follow.current = {
          x: gsap.quickTo(preview.current, "x", { duration: 0.7, ease: "power3" }),
          y: gsap.quickTo(preview.current, "y", { duration: 0.7, ease: "power3" }),
        };
      } else {
        // Layar sentuh: warna mengikuti baris yang sedang di tengah layar
        site.works.forEach((work, i) => {
          ScrollTrigger.create({
            trigger: root.current.querySelectorAll(".work")[i],
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => self.isActive && setPalette(brandOf(work)),
          });
        });
        ScrollTrigger.create({
          trigger: root.current.querySelector(".works-list"),
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => !self.isActive && setPalette(null),
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  const onMove = (e) => {
    if (!follow.current) return;
    const { offsetHeight: h, offsetWidth: w } = preview.current;
    const y = gsap.utils.clamp(16, window.innerHeight - h - 16, e.clientY - h / 2);
    const x = gsap.utils.clamp(16, window.innerWidth - w - 16, e.clientX + 36);
    follow.current.x(x);
    follow.current.y(y);
  };

  const toggle = (show) => {
    if (!show) setPalette(null);
    if (!follow.current) return;
    gsap.to(preview.current, {
      clipPath: show ? SHOWN : HIDDEN,
      duration: show ? 0.8 : 0.5,
      ease: show ? "expo.out" : "expo.in",
      overwrite: true,
    });
  };

  return (
    <section className="section works-section" id="work" ref={root} style={paletteVars(palette)}>
      <div className="section-head mono">
        <span>(01) Selected campaigns</span>
        <span>
          {String(site.works.length).padStart(2, "0")} projects
        </span>
      </div>

      <ul
        className="works-list"
        onPointerMove={onMove}
        onPointerEnter={() => toggle(true)}
        onPointerLeave={() => toggle(false)}
      >
        {site.works.map((work, i) => (
          <li
            className="work"
            key={work.title}
            onPointerEnter={(e) => {
              setActive(i);
              if (e.pointerType === "mouse") setPalette(brandOf(work));
            }}
          >
            <Link href={work.slug ? `/work/${work.slug}/` : work.href} data-cursor="View">
              <span className="work-idx mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="work-ttl-wrap">
                <span className="work-title">
                  <span className="ttl-in" style={{ display: "block" }}>{work.title}</span>
                </span>
              </span>
              <span className="work-meta mono">
                {work.kind}
                <br />
                {work.year}
              </span>
              <span className="work-arrow" aria-hidden="true"><ArrowUpRight size="1.6rem" /></span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="preview" ref={preview} aria-hidden="true" style={{ clipPath: HIDDEN }}>
        {site.works.map((work, i) => (
          <div className="frame" key={work.title} data-on={active === i}>
            {work.cover ? <img className="frame-photo" src={work.cover} alt="" /> : <Frame variant={work.variant} />}
          </div>
        ))}
      </div>
    </section>
  );
}
