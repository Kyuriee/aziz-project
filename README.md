# Portfolio — Aziz Zulhakim (Marketing Communication)

Next.js (static export) + GSAP + Lenis. Tema hitam-putih sinematik.

## Jalankan di lokal
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # hasil static ada di folder out/
npm run start      # preview folder out/
```

## Ubah konten
Semua teks, nama, proyek, email, dan sosmed ada di `data/site.js`.
Placeholder visual proyek ada di `components/Frame.jsx` — ganti dengan <img> asli kalau sudah ada.

## Struktur
- `components/Preloader.jsx` — film leader 3-2-1 + kilatan kamera
- `components/Hero.jsx` — foto (multiply) + judul kinetik (SplitText, blend difference)
- `components/Marquee.jsx` — teks raksasa, kecepatan ikut velocity scroll
- `components/Works.jsx` — daftar proyek + preview mengikuti kursor
- `components/Reel.jsx` — frame sinematik pinned + timecode
- `components/About.jsx` — kata menyala mengikuti scroll
- `components/Contact.jsx` — CTA magnetik

## Foto
Ganti `public/portrait.jpg` (rasio potret). Foto dengan latar terang paling menyatu dengan hero.
