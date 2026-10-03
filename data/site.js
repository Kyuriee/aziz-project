// Semua konten portofolio ada di sini. Ganti sesuai kebutuhan — komponen tidak perlu disentuh.
export const site = {
  name: "Aziz Zulhakim",
  role: "Digital Creative",
  year: 2026,
  email: "zulhakimaziz778@gmail.com",
  phone: "0895372691601",
  location: "Indonesia",
  status: "Open for work",
  title: "Aziz Zulhakim — Digital Creative",
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
  works: [
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
