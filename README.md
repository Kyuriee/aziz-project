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

## Tambah project baru (halaman sendiri per brand)
1. Taruh foto di `public/work/<slug>/` (webp, lebar maks ~2000px).
2. Di `data/site.js`: tambah item di `works` (isi `slug` + `cover`), lalu salin blok di `cases` dengan slug yang sama.
3. Halaman otomatis ada di `/work/<slug>/`. Item `works` tanpa `slug` masih placeholder.
4. Opsional di `cases`: `layout: "portraits"` untuk galeri 4 foto potret (default: 3 foto, slot 1-3).
5. Opsional di `cases`: `theme: "light"` untuk halaman berlatar terang (cocok untuk foto high-key).
