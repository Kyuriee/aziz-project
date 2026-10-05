// Semua konten portofolio ada di sini. Ganti sesuai kebutuhan — komponen tidak perlu disentuh.
export const site = {
  name: "Aziz Zulhakim",
  role: "Marketing Communication",
  year: 2026,
  email: "zulhakimaziz778@gmail.com",
  phone: "0895372691601",
  location: "Indonesia",
  status: "Open for work",
  title: "Aziz Zulhakim — Marketing Communication",
  description: "Brand stories, campaigns, and conversations that stick.",

  portrait: { src: "/portrait.jpg", width: 770, height: 1368, alt: "Black-and-white portrait of Aziz Zulhakim in a black tuxedo with an untied bow tie" },

  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  marquee: ["Brand", "Campaign", "Content", "Media", "Story", "Community"],

  // variant = pola visual abstrak (lihat components/Frame.jsx) — ganti dengan gambar asli nanti
  // Tiap item punya halaman sendiri (lihat `cases` di bawah): slug + cover wajib.
  works: [
    { slug: "bintang-zero", title: "Bintang Zero", kind: "Product Visual", year: "2026", variant: 0, cover: "/work/bintang-zero/final.webp", href: "#work" },
    { slug: "heiu", title: "HEIU", kind: "Apparel Shoot", year: "2021", variant: 1, cover: "/work/heiu/hero.webp", href: "#work" },
    { slug: "nez-coffeeneatery", title: "Nez", kind: "Café Content", year: "2022", variant: 2, cover: "/work/nez-coffeeneatery/hero.webp", href: "#work" },
  ],

  reel: { caption: "Stories that move.", sub: "Campaign reel 2024 — 2026" },

  statement:
    "I help brands find their voice and say it well — turning strategy into campaigns, stories and conversations people remember.",

  capabilities: [
    { name: "Brand Communication", note: "Voice, message, positioning" },
    { name: "Campaign Strategy", note: "Concept to rollout" },
    { name: "Content & Social", note: "Story, copy, community" },
    { name: "Media & PR", note: "Press, relations, reputation" },
  ],

  // CATATAN: angka di bawah placeholder — isi dengan data sebenarnya.
  stats: [
    { value: "05+", label: "Years in comms" },
    { value: "40", label: "Campaigns run" },
    { value: "12", label: "Brands partnered" },
  ],

  socials: [
    { label: "WhatsApp", href: "https://wa.me/62895372691601" },
    { label: "Email", href: "mailto:zulhakimaziz778@gmail.com" },
  ],
};

// Halaman project. Tambah brand baru: taruh foto di public/work/<slug>/, lalu salin blok ini.
// `palette` tiap brand juga mewarnai section Work di beranda saat di-hover (atau saat baris di tengah layar di HP).
// CATATAN: tahun, peran, dan kalimat brief masih placeholder — sesuaikan.
export const cases = {
  "bintang-zero": {
    title: ["Bintang", "Zero 0.0"],
    kind: "Product Visual",
    year: "2026",
    role: "Visual & Content",
    brief: "Low-key light. Cold condensation. One red star.",
    // Palet brand: dipakai halaman ini + efek warna saat hover di daftar Work
    palette: { bg: "#070d20", fg: "#e9edf5", mute: "#787d8b", line: "rgba(233, 237, 245, 0.18)", accent: "#e2445a" },
    hero: { src: "/work/bintang-zero/final.webp", width: 1100, height: 1954, alt: "Bintang Zero 0.0 can covered in condensation, lit from the front against a black background" },
    // slot 1-3 menentukan posisi di galeri (lihat .shot-1/2/3 di globals.css)
    shots: [
      { slot: 1, src: "/work/bintang-zero/01.webp", width: 1100, height: 1955, alt: "Bintang Zero 0.0 can, portrait frame with soft front light" },
      { slot: 2, src: "/work/bintang-zero/02.webp", width: 2000, height: 1125, alt: "Bintang Zero 0.0 can emerging from darkness, low-key frame" },
      { slot: 3, src: "/work/bintang-zero/03.webp", width: 2000, height: 1125, alt: "Bintang Zero 0.0 can in near darkness, wide low-key frame" },
    ],
  },
  heiu: {
    title: ["Heiu", "Lookbook"],
    kind: "Apparel Shoot",
    year: "2021", // dari tanggal file foto; sesuaikan
    role: "Visual & Content",
    brief: "Night flash. Red gothic print on sand cotton.",
    // Latar halaman = warna baju (diambil dari foto), teks cokelat tua, aksen merah dari print
    palette: { bg: "#cdc0ad", fg: "#1c120c", mute: "#584d43", line: "rgba(28, 18, 12, 0.2)", accent: "#c8281b" },
    layout: "portraits", // 4 foto potret: lihat .case-gallery--portraits di globals.css
    hero: { src: "/work/heiu/hero.webp", width: 1023, height: 1531, alt: "Back of a sand-colored tee printed with a red barcode and the words forgive me, HEIU" },
    shots: [
      { slot: 1, src: "/work/heiu/01.webp", width: 930, height: 1392, alt: "Model in a sand tee with a small red HEIU logo, against a white wall" },
      { slot: 2, src: "/work/heiu/02.webp", width: 1080, height: 1616, alt: "Close-up of the red gothic HEIU logo on the chest of a sand tee" },
      { slot: 3, src: "/work/heiu/03.webp", width: 1080, height: 1616, alt: "Model in profile at night on concrete stairs, wearing the HEIU tee" },
      { slot: 4, src: "/work/heiu/04.webp", width: 1080, height: 1616, alt: "Model facing the camera at night on concrete stairs, wearing the HEIU tee" },
    ],
  },
  "nez-coffeeneatery": {
    title: ["Nez", "Coffeeneatery"],
    kind: "Café Content",
    year: "2022", // dari tanggal file foto; sesuaikan
    role: "Visual & Content",
    brief: "Soft daylight. White marble, ice, warm cups.",
    palette: { bg: "#efeae1", fg: "#2b1d14", mute: "#72675e", line: "rgba(43, 29, 20, 0.2)", accent: "#ac7d3b" },
    layout: "portraits",
    hero: { src: "/work/nez-coffeeneatery/hero.webp", width: 1100, height: 1375, alt: "Three iced drinks with the NEZ logo on white podiums, the center one orange and clear" },
    shots: [
      { slot: 1, src: "/work/nez-coffeeneatery/01.webp", width: 1100, height: 1650, alt: "Barista pouring espresso over milk and ice into a cup" },
      { slot: 2, src: "/work/nez-coffeeneatery/02.webp", width: 1100, height: 1650, alt: "Latte with leaf art in a black cup on white marble with coffee beans" },
      { slot: 3, src: "/work/nez-coffeeneatery/03.webp", width: 1100, height: 1650, alt: "Layered iced coffee in a glass on a wooden coaster" },
      { slot: 4, src: "/work/nez-coffeeneatery/04.webp", width: 1100, height: 1650, alt: "Iced milk coffee in a NEZ cup on a white podium" },
    ],
  },
};
