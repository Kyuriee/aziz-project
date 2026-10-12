"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Lightbox from "./Lightbox";
import VideoEmbed from "./VideoEmbed";
import { ArrowUpRight } from "./Icon";
import { brands } from "@/data/site";

// Pilihan kolom: cols = [desktop, mobile]; hideSm = tombol disembunyikan di mobile (hasil kolomnya sama dengan yang lain)
const DENSITIES = {
  photo: [
    { id: "loose", cols: [2, 1] },
    { id: "mid", cols: [3, 2] },
    { id: "tight", cols: [4, 2], hideSm: true },
  ],
  video: [
    { id: "loose", cols: [1, 1], hideSm: true },
    { id: "mid", cols: [2, 1], hideSm: true },
  ],
};
const DEFAULT_DENSITY = { photo: "mid", video: "loose" };

const MOBILE_QUERY = "(max-width: 820px)";
const subscribeMobile = (callback) => {
  const media = window.matchMedia(MOBILE_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const useIsMobile = () => useSyncExternalStore(subscribeMobile, () => window.matchMedia(MOBILE_QUERY).matches, () => false);

// Tinggi relatif item (tinggi / lebar) dari data, jadi susunan bisa dihitung tanpa mengukur layar
const heightRatio = (item) => {
  if (item.height) return item.height / item.width;
  const [w, h] = (item.ratio ?? "16 / 9").split("/").map(Number);
  return h / w;
};

// Masonry: tiap item masuk ke kolom yang paling pendek, jadi tidak ada kolom timpang dan urutan baca tetap kiri ke kanan
function toColumns(items, count) {
  const columns = Array.from({ length: count }, () => ({ items: [], height: 0 }));
  items.forEach((item) => {
    const shortest = columns.reduce((a, b) => (b.height < a.height ? b : a));
    shortest.items.push(item);
    shortest.height += heightRatio(item);
  });
  return columns.map((column) => column.items);
}

const brandName = (slug) => brands.find((b) => b.slug === slug)?.name;

/**
 * Gallery masonry untuk foto/design (`kind="photo"`) dan video (`kind="video"`).
 * `filterable`: tampilkan filter brand (tersimpan di URL ?brand=). `sticky`: toolbar menempel di atas saat scroll.
 * Item: { src, width, height, alt, brand? } untuk foto, { vimeo, ratio, brand? } untuk video.
 */
export default function Gallery({ items, kind = "photo", filterable = false, sticky = false }) {
  const [brand, setBrand] = useState(null);
  const [density, setDensity] = useState(DEFAULT_DENSITY[kind]);
  const [open, setOpen] = useState(null);
  const isMobile = useIsMobile();

  const owners = useMemo(() => brands.filter((b) => items.some((i) => i.brand === b.slug)), [items]);
  const visible = useMemo(() => (brand ? items.filter((i) => i.brand === brand) : items), [items, brand]);
  const countOf = (slug) => items.filter((i) => i.brand === slug).length;
  const columnCount = DENSITIES[kind].find((d) => d.id === density).cols[isMobile ? 1 : 0];
  const columns = useMemo(() => toColumns(visible, columnCount), [visible, columnCount]);
  const showChips = filterable && owners.length > 1;
  const showDensity = items.length > 1;

  // Filter dari URL (?brand=heiu) dibaca sekali saat halaman terbuka
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("brand");
    if (filterable && owners.some((b) => b.slug === fromUrl)) setBrand(fromUrl);
  }, [filterable, owners]);

  const select = (slug) => {
    setBrand(slug);
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set("brand", slug);
    else url.searchParams.delete("brand");
    window.history.replaceState(null, "", url);
  };

  return (
    <div className="gal">
      {(showChips || showDensity) && (
      <div className={`gal-bar${sticky ? " is-sticky" : ""}`}>
        {showChips && (
          <ul className="chips mono" aria-label="Filter by brand">
            <li>
              <button type="button" aria-pressed={brand === null} onClick={() => select(null)}>
                All <span>{items.length}</span>
              </button>
            </li>
            {owners.map((b) => (
              <li key={b.slug}>
                <button type="button" aria-pressed={brand === b.slug} onClick={() => select(b.slug)}>
                  {b.name} <span>{countOf(b.slug)}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {showDensity && (
          <div className="gal-density mono" role="group" aria-label="Columns">
            {DENSITIES[kind].map((d) => (
              <button
                type="button"
                key={d.id}
                className={d.hideSm ? "hide-sm" : undefined}
                aria-pressed={density === d.id}
                aria-label={`${d.cols[0]} columns`}
                onClick={() => setDensity(d.id)}
              >
                <span className="lg">{d.cols[0]}</span>
                <span className="sm">{d.cols[1]}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      )}

      <div className="gal-grid">
        {columns.map((column, c) => (
          <ul className="gal-col" key={c}>
            {column.map((item) =>
              kind === "video" ? (
                <li className="gal-item" key={item.vimeo.id}>
                  {/* Banyak video di satu halaman: tidak diputar otomatis, mulai saat diklik */}
                  <VideoEmbed video={{ ...item, autoplay: false }} label={brandName(item.brand)} />
                  {item.brand && (
                    <Link className="gal-caption mono" href={`/work/brand/${item.brand}/#video`}>
                      {brandName(item.brand)}
                      <ArrowUpRight />
                    </Link>
                  )}
                </li>
              ) : (
                <li className="gal-item" key={item.src}>
                  <button type="button" className="gal-photo" onClick={() => setOpen(visible.indexOf(item))} data-cursor="View" aria-haspopup="dialog">
                    <img src={item.src} width={item.width} height={item.height} alt={item.alt} loading="lazy" decoding="async" />
                  </button>
                </li>
              )
            )}
          </ul>
        ))}
      </div>

      {open !== null && kind === "photo" && <Lightbox items={visible} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </div>
  );
}
