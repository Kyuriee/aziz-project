"use client";

import { useEffect, useRef, useState } from "react";
import { preconnect } from "react-dom";
import { Play } from "./Icon";

// Autoplay dari scroll harus muted (aturan browser); autoplay dari klik boleh bersuara
const playerUrl = ({ id, hash }, muted) =>
  `https://player.vimeo.com/video/${id}?h=${hash}&autoplay=1${muted ? "&muted=1" : ""}&title=0&byline=0&portrait=0&dnt=1`;

/**
 * Video Vimeo dengan "facade": yang tampil dulu hanya poster + tombol play (ringan, aman di jaringan lambat).
 * Iframe dimuat dan diputar dengan dua cara:
 *  - Klik: langsung diputar dengan suara (klik = interaksi, jadi diizinkan browser).
 *  - Scroll: otomatis diputar tanpa suara saat video terlihat (matikan per video dengan `autoplay: false`).
 *    Dilewati kalau pengunjung memilih reduced-motion atau mode hemat data.
 */
export default function VideoEmbed({ video, label }) {
  const root = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const { vimeo, poster, ratio = "16 / 9", title, autoplay = true } = video;
  const name = title ?? label;

  useEffect(() => {
    const skip = window.matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.connection?.saveData;
    if (!autoplay || playing || skip) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setMuted(true);
        setPlaying(true);
        observer.disconnect();
      },
      { threshold: 0.6 }
    );
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [autoplay, playing]);

  // Buka koneksi ke player lebih awal saat kursor/fokus mendekat
  const warm = () => preconnect("https://player.vimeo.com");

  return (
    <figure className="vid reveal" style={{ aspectRatio: ratio }} ref={root}>
      {playing ? (
        <iframe
          className="vid-frame"
          title={name}
          src={playerUrl(vimeo, muted)}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="vid-facade"
          onClick={() => setPlaying(true)}
          onPointerEnter={warm}
          onFocus={warm}
          data-cursor="Play"
          aria-label={`Play ${name}`}
        >
          {poster && <img className="vid-poster" src={poster.src} width={poster.width} height={poster.height} alt="" loading="lazy" decoding="async" />}
          <span className="vid-play">
            <Play />
          </span>
          <span className="vid-name mono">{name}</span>
        </button>
      )}
      <noscript>
        <a href={`https://vimeo.com/${vimeo.id}/${vimeo.hash}`}>Watch {name} on Vimeo</a>
      </noscript>
    </figure>
  );
}
