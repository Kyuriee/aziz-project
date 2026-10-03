"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "./SmoothScroll";
import { site } from "@/data/site";

const SECTION_IDS = site.nav.map((item) => item.href.slice(1));
const HIDE_AFTER = 160; // px scroll sebelum nav boleh menghilang
const easeOut = (t) => 1 - Math.pow(1 - t, 4);

/** Teks yang "berguling" saat hover: salinan kedua naik menggantikan yang pertama. */
function Roll({ children }) {
  return (
    <span className="roll">
      <span className="roll-in">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}

export default function Nav({ ready }) {
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const header = useRef(null);
  const linksWrap = useRef(null);
  const indicator = useRef(null);
  const counter = useRef(null);
  const menu = useRef(null);
  const menuTl = useRef(null);
  const hidden = useRef(false);
  const openRef = useRef(false);
  openRef.current = open;

  /* ---------- Intro ---------- */
  useEffect(() => {
    if (!ready) return;
    gsap.to(header.current, { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.6 });
  }, [ready]);

  /* ---------- Smart hide: turun saat scroll ke atas, naik saat scroll ke bawah ---------- */
  const setHidden = useCallback((hide) => {
    if (hidden.current === hide) return;
    hidden.current = hide;
    gsap.to(header.current, { yPercent: hide ? -120 : 0, duration: 0.7, ease: "expo.out" });
  }, []);

  /* ---------- Scroll: smart hide + counter persen + section aktif ---------- */
  useEffect(() => {
    if (!lenis) return;

    const onScroll = ({ scroll, limit, direction }) => {
      const pct = limit ? Math.round((scroll / limit) * 100) : 0;
      if (counter.current) counter.current.textContent = `${String(pct).padStart(3, "0")}%`;

      if (scroll < HIDE_AFTER || direction < 0 || openRef.current) setHidden(false);
      else if (direction > 0) setHidden(true);

      // Section aktif = yang paling akhir melewati tengah layar. Reel ikut "Work".
      const line = window.innerHeight * 0.5;
      let current = null;
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      });
      setActiveId(current);
    };

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis, setHidden]);

  /* ---------- Indikator garis yang meluncur ke link aktif ---------- */
  const moveIndicator = useCallback(() => {
    const link = linksWrap.current?.querySelector(`[data-id="${activeId}"]`);
    if (!link) {
      gsap.to(indicator.current, { opacity: 0, duration: 0.4 });
      return;
    }
    gsap.to(indicator.current, {
      x: link.offsetLeft,
      width: link.offsetWidth,
      opacity: 1,
      duration: 0.7,
      ease: "expo.out",
    });
  }, [activeId]);

  useEffect(() => {
    moveIndicator();
    window.addEventListener("resize", moveIndicator);
    return () => window.removeEventListener("resize", moveIndicator);
  }, [moveIndicator]);

  /* ---------- Menu layar penuh (mobile) ---------- */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      menuTl.current = gsap
        .timeline({ paused: true })
        .fromTo(
          menu.current,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" }
        )
        .fromTo(".menu-in", { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.08, ease: "expo.out" }, "-=0.35")
        .fromTo(".menu-foot > *", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" }, "-=0.7");
      if (reduced) menuTl.current.timeScale(20);
    }, menu);
    return () => ctx.revert();
  }, []);

  const openMenu = useCallback(() => {
    setOpen(true);
    setHidden(false);
    lenis?.stop();
    menuTl.current?.play();
  }, [lenis, setHidden]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    lenis?.start();
    menuTl.current?.reverse();
  }, [lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && closeMenu();
    // Kalau layar melebar ke desktop saat menu terbuka, tutup otomatis
    const mq = window.matchMedia("(min-width: 821px)");
    const onMq = (e) => e.matches && closeMenu();
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, closeMenu]);

  const go = (e, target) => {
    if (!lenis) return;
    e.preventDefault();
    if (openRef.current) closeMenu();
    lenis.scrollTo(target, { duration: 1.6, easing: easeOut });
  };

  return (
    <>
      <header className="nav mono" ref={header} onFocus={() => setHidden(false)}>
        <a href="#top" className="nav-logo" onClick={(e) => go(e, 0)} data-cursor="Top">
          {site.name}
        </a>

        <span className="nav-count" ref={counter} aria-hidden="true">000%</span>

        <div className="nav-right">
          <nav className="nav-links" aria-label="Main" ref={linksWrap}>
            {site.nav.map((item) => {
              const id = item.href.slice(1);
              return (
                <a
                  key={id}
                  href={item.href}
                  data-id={id}
                  className={activeId === id ? "is-active" : undefined}
                  aria-current={activeId === id ? "location" : undefined}
                  onClick={(e) => go(e, item.href)}
                >
                  <Roll>{item.label}</Roll>
                </a>
              );
            })}
            <i className="nav-ind" ref={indicator} aria-hidden="true" />
          </nav>

          <button
            type="button"
            className={`menu-btn${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-controls="menu"
            onClick={open ? closeMenu : openMenu}
          >
            <Roll>{open ? "Close" : "Menu"}</Roll>
            <span className="burger" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <div className="menu" id="menu" ref={menu} inert={!open}>
        <ul className="menu-list">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="menu-link" onClick={(e) => go(e, item.href)}>
                <span className="menu-mask">
                  <span className="menu-in menu-title">{item.label}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="menu-foot mono">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <ul>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
