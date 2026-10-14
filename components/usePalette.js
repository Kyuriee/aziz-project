import { useEffect } from "react";

/**
 * Palet halaman (bg, fg, mute, line, accent) -> kelas + CSS variable untuk wadah `.case`,
 * dan warna body ikut berubah supaya area overscroll tidak hitam. Tanpa palet: tema hitam-putih bawaan.
 */
export default function usePalette(palette) {
  useEffect(() => {
    if (!palette) return;
    document.body.style.background = palette.bg;
    return () => {
      document.body.style.background = "";
    };
  }, [palette]);

  if (!palette) return { className: "case", style: undefined };
  return {
    className: "case has-palette",
    style: { "--ink": palette.bg, "--paper": palette.fg, "--mute": palette.mute, "--line": palette.line, "--accent": palette.accent },
  };
}
