"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Lightbox from "./Lightbox";
import VideoEmbed from "./VideoEmbed";
import { ArrowUpRight } from "./Icon";
import { brands } from "@/data/site";

// Pilihan kolom: label = [desktop, mobile]; hideSm = tombol disembunyikan di mobile (hasil kolomnya sama dengan yang lain)
const DENSITIES = {
  photo: [
    { id: "loose", label: ["2", "1"] },
    { id: "mid", label: ["3", "2"] },
    { id: "tight", label: ["4", "2"], hideSm: true },
  ],
  video: [
    { id: "loose", label: ["1", "1"], hideSm: true },
    { id: "mid", label: ["2", "1"], hideSm: true },
  ],
};
const DEFAULT_DENSITY = { photo: "mid", video: "loose" };

/**
 * Gallery masonry untuk foto/design (`kind="photo"`) dan video (`kind="video"`).
 * `filterable`: tampilkan filter brand (tersimpan di URL ?brand=). `sticky`: toolbar menempel di atas saat scroll.
 * Item: { src, width, height, alt, brand? } untuk foto, { vimeo, ratio, brand? } untuk video.
 */
export default function Gallery({ items, kind = "photo", filterable = false, sticky = false }) {
  const [brand, setBrand] = useState(null);
  const [density, setDensity] = useState(DEFAULT_DENSITY[kind]);
  const [open, setOpen] = useState(null);

  const owners = useMemo(() => brands.filter((b) => items.some((i) => i.brand === b.slug)), [items]);
  const visible = brand ? items.filter((i) => i.brand === brand) : items;
  const countOf = (slug) => items.filter((i) => i.brand === slug).length;
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
                aria-label={`${d.label[0]} columns`}
                onClick={() => setDensity(d.id)}
              >
                <span className="lg">{d.label[0]}</span>
                <span className="sm">{d.label[1]}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      )}

      <ul className="gal-grid" data-kind={kind} data-density={density}>
        {visible.map((item, i) =>
          kind === "video" ? (
            <li className="gal-item" key={item.vimeo.id}>
              {/* Banyak video di satu halaman: tidak diputar otomatis, mulai saat diklik */}
              <VideoEmbed video={{ ...item, autoplay: false }} label={brands.find((b) => b.slug === item.brand)?.name} />
              {item.brand && (
                <Link className="gal-caption mono" href={`/work/brand/${item.brand}/#video`}>
                  {brands.find((b) => b.slug === item.brand)?.name}
                  <ArrowUpRight />
                </Link>
              )}
            </li>
          ) : (
            <li className="gal-item" key={item.src}>
              <button type="button" className="gal-photo" onClick={() => setOpen(i)} data-cursor="View" aria-haspopup="dialog">
                <img src={item.src} width={item.width} height={item.height} alt={item.alt} loading="lazy" decoding="async" />
              </button>
            </li>
          )
        )}
      </ul>

      {open !== null && kind === "photo" && <Lightbox items={visible} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </div>
  );
}
