# Portfolio — Aziz Zulhakim (Digital Creative)

Next.js (static export) + GSAP + Lenis. Tiga disiplin: Photo, Video, Design.

## Jalankan di lokal
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # hasil static ada di folder out/
npm run start      # preview folder out/
```

## Ubah konten
Semua teks, kontak, daftar disiplin, galeri, dan palet warna ada di `data/site.js`.

- `site.works`: tiga disiplin di panggung Work (beranda). `visual`: `photos` | `film` | `shapes`. `status: "soon"` = belum ada karya (tampil, belum bisa dibuka).
- `categories[slug]`: isi halaman `/work/<slug>/` (hero, foto galeri, palet warna).
- `site.reel.frames`: foto yang berganti di section Reel.

## Sosial media (section Contact + menu mobile)
`site.socials` di `data/site.js` sudah berisi Instagram, TikTok, YouTube, Vimeo, Behance, LinkedIn, Pinterest, Dribbble, Threads, X, Facebook. Isi `href` dan `handle` (teks yang tampil), lalu ubah `show: true`. Kalau `show: false` atau `href` kosong, tidak tampil. Email sudah jadi tombol utama.

## Journey, pendidikan, skill (dari CV)
- `journey`: perjalanan kerja (terbaru ke lama). `tags` memilih ikon (`feed`, `reels`, `captions`, `shoot`, `edit`, `docs`; daftar di `components/Journey.jsx`).
- Kalau sebuah brand di Journey sudah punya halaman karya, isi `brand: "<slug>"` (slug yang sama di `brands`); nama perusahaannya otomatis jadi link.
- `education`, `site.tools`, `site.languages`: tampil di Journey dan About.

## Brand dari CV (assets menyusul)
Tiap brand di CV sudah punya slug di `brands` (`data/site.js`) dengan `photo/video/design` kosong. Halaman `/work/brand/<slug>/` dan link di Journey otomatis aktif begitu salah satunya diisi. Role dan lama kerja diambil dari `journey`; cover default = foto pertama (brand khusus video isi `cover` sendiri).

1. Taruh foto mentah di `assets-src/<slug>/` (folder ini tidak ikut git). Foto cover beri nama `hero.jpg`.
2. `npm install` (sekali), lalu `npm run images -- <slug>` untuk convert ke WebP + compress ke `public/work/<slug>/`.
3. Tempel baris `shots(...)` yang dicetak ke `photo` (atau `design`) brand itu. Video tetap lewat Vimeo (`vimeo: { id, hash }`).

## Tambah foto ke Photo
Foto selalu milik sebuah brand: taruh di `public/work/<slug-brand>/` (pakai `npm run images -- <slug>`) dan tambahkan ke `photo` brand itu di `brands`. Halaman `/work/photo` (`components/PhotoStage.jsx`) membuat satu bab per brand yang punya foto: cover jadi foto pertama, lalu foto brand, bertumpuk seperti cetakan dan terlempar satu per satu saat scroll. Warna bab dari `palette` brand. Foto lepas tanpa brand: `categories.photo.shots` (belum ditampilkan di halaman Photo).

## Tambah karya Design
Taruh gambar di `public/work/<slug-brand>/` dan daftarkan di `design` brand itu lewat `designShots(dir, nama, platform, format, files)` di `data/site.js`. Format nama file: `feed-01`, `story-01`, dst. Halaman `/work/design` membuat satu bab per brand dengan satu rel per platform dan format, urutannya dari `DESIGN_CHANNELS` (Instagram: ads, feed, highlight, story; Shopee: banner, bundle). Platform atau format baru: tambahkan ke `DESIGN_CHANNELS` dan ikonnya ke `CHANNEL_ICON` / `FORMAT_ICON` di `components/DesignStage.jsx`.

## Aktifkan Video
Isi `categories.video` dengan `title`, `kind`, `role`, `brief`; lalu hapus `status: "soon"` di `site.works` dan isi `video` brand yang punya karya video.
