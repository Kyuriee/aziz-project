"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLenis } from "./SmoothScroll";
import { ArrowLeft, ArrowRight, Close } from "./Icon";
import { brands } from "@/data/site";

const SWIPE_MIN = 50; // px

/** Foto layar penuh: panah keyboard, swipe di HP, Esc menutup. Memakai <dialog> supaya fokus terkunci di dalamnya. */
export default function Lightbox({ items, index, onIndex, onClose }) {
  const dialog = useRef(null);
  const swipeStart = useRef(null);
  const lenis = useLenis();

  const item = items[index];
  const brand = brands.find((b) => b.slug === item.brand);
  const pad = (n) => String(n).padStart(2, "0");
  const go = (step) => onIndex((index + step + items.length) % items.length);

  // Buka sebagai modal dan hentikan scroll halaman selama terbuka
  useEffect(() => {
    dialog.current.showModal();
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  // Muat foto sebelum dan sesudahnya supaya perpindahan terasa instan
  useEffect(() => {
    [1, -1].forEach((step) => {
      const neighbour = items[(index + step + items.length) % items.length];
      new Image().src = neighbour.src;
    });
  }, [index, items]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  const onPointerUp = (e) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > SWIPE_MIN) go(dx < 0 ? 1 : -1);
  };

  return (
    <dialog className="lb" ref={dialog} onClose={onClose} onKeyDown={onKeyDown} aria-label="Photo viewer">
      <div className="lb-bar mono">
        <span>{pad(index + 1)} / {pad(items.length)}</span>
        {brand && (
          <Link href={`/work/brand/${brand.slug}/`} className="lb-brand" onClick={onClose}>
            {brand.name}
          </Link>
        )}
        <button type="button" className="lb-btn" onClick={onClose} aria-label="Close">
          <Close />
        </button>
      </div>

      <div
        className="lb-stage"
        onPointerDown={(e) => (swipeStart.current = e.clientX)}
        onPointerUp={onPointerUp}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <img className="lb-img" key={item.src} src={item.src} width={item.width} height={item.height} alt={item.alt} decoding="async" />
      </div>

      <button type="button" className="lb-btn lb-prev" onClick={() => go(-1)} aria-label="Previous photo">
        <ArrowLeft />
      </button>
      <button type="button" className="lb-btn lb-next" onClick={() => go(1)} aria-label="Next photo">
        <ArrowRight />
      </button>
    </dialog>
  );
}
