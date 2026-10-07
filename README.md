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

## Tambah karya ke Photo
1. Taruh foto (webp, lebar maks ~2000px) di `public/work/photo/`.
2. Tambah baris di `categories.photo.shots` dengan `pos` (posisi di galeri): `wide`, `pa`/`pb`, `qa`/`qb`, atau `t1`/`t2`/`t3` (lihat `.pos-*` di `app/globals.css`).

## Aktifkan Video atau Design
Isi `categories.video` (atau `design`) dengan `title`, `kind`, `role`, `brief`, `hero`, `shots`; lalu hapus `status: "soon"` di `site.works`. Palet `palette` sudah ada dan dipakai untuk efek warna saat hover di daftar Work.
