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
  // CATATAN: nama proyek di bawah masih placeholder.
  // slug + cover = punya halaman sendiri (lihat `cases` di bawah). Tanpa slug = placeholder.
  works: [
    { slug: "bintang-zero", title: "Bintang Zero", kind: "Product Visual", year: "2026", variant: 0, cover: "/work/bintang-zero/final.webp", href: "#work" },
    { title: "Lumen", kind: "Brand Campaign", year: "2026", variant: 0, href: "#work" },
    { title: "Northbound", kind: "Launch Strategy", year: "2025", variant: 1, href: "#work" },
    { title: "Common Ground", kind: "Content & Social", year: "2025", variant: 2, href: "#work" },
    { title: "Quiet Riot", kind: "Public Relations", year: "2024", variant: 3, href: "#work" },
    { title: "Open House", kind: "Event Activation", year: "2024", variant: 4, href: "#work" },
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
// CATATAN: tahun, peran, dan kalimat brief masih placeholder — sesuaikan.
export const cases = {
  "bintang-zero": {
    title: ["Bintang", "Zero 0.0"],
    kind: "Product Visual",
    year: "2026",
    role: "Visual & Content",
    brief: "Low-key light. Cold condensation. One red star.",
    hero: { src: "/work/bintang-zero/final.webp", width: 1100, height: 1954, alt: "Bintang Zero 0.0 can covered in condensation, lit from the front against a black background" },
    // slot 1-3 menentukan posisi di galeri (lihat .shot-1/2/3 di globals.css)
    shots: [
      { slot: 1, src: "/work/bintang-zero/01.webp", width: 1100, height: 1955, alt: "Bintang Zero 0.0 can, portrait frame with soft front light" },
      { slot: 2, src: "/work/bintang-zero/02.webp", width: 2000, height: 1125, alt: "Bintang Zero 0.0 can emerging from darkness, low-key frame" },
      { slot: 3, src: "/work/bintang-zero/03.webp", width: 2000, height: 1125, alt: "Bintang Zero 0.0 can in near darkness, wide low-key frame" },
    ],
  },
};
