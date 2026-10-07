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
  description: "Photo, video, and design with a point of view.",

  portrait: { src: "/portrait.jpg", width: 770, height: 1368, alt: "Black-and-white portrait of Aziz Zulhakim in a black tuxedo with an untied bow tie" },

  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  marquee: ["Photo", "Video", "Design", "Brand", "Story", "Motion"],

  // Tiga disiplin. Punya halaman sendiri kalau `categories[slug]` berisi foto/karya.
  // status: "soon" = belum ada karya: tampil di daftar tapi belum bisa dibuka.
  // variant = pola visual abstrak (components/Frame.jsx) untuk preview yang belum punya cover.
  works: [
    { slug: "photo", title: "Photo", kind: "Product · Portrait · Lifestyle", variant: 0, cover: "/work/photo/hero.webp", href: "#work" },
    { slug: "video", title: "Video", kind: "Shoot · Edit · Grade", variant: 1, status: "soon", href: "#work" },
    { slug: "design", title: "Design", kind: "Layout · Identity · Social", variant: 2, status: "soon", href: "#work" },
  ],

  // Reel: foto-foto ini berganti mengikuti scroll (pakai file di public/)
  reel: { caption: "Stories that move.", sub: "Selected frames", frames: ["/work/photo/01.webp", "/work/photo/11.webp", "/work/photo/06.webp", "/work/photo/14.webp", "/work/photo/16.webp", "/work/photo/20.webp"] },

  statement:
    "I make images, films and visual systems — turning ideas into work people remember.",

  capabilities: [
    { name: "Photography", note: "Product, portrait, lifestyle" },
    { name: "Videography", note: "Shoot, edit, grade" },
    { name: "Graphic Design", note: "Layout, identity, social" },
    { name: "Creative Direction", note: "Concept to delivery" },
  ],

  // CATATAN: angka di bawah placeholder — isi dengan data sebenarnya.
  stats: [
    { value: "05+", label: "Years creating" },
    { value: "40", label: "Projects done" },
    { value: "12", label: "Brands served" },
  ],

  socials: [
    { label: "WhatsApp", href: "https://wa.me/62895372691601" },
    { label: "Email", href: "mailto:zulhakimaziz778@gmail.com" },
  ],
};

// Halaman tiap disiplin (/work/<slug>/). `palette` juga mewarnai section Work di beranda saat di-hover
// (atau saat barisnya di tengah layar di HP). Video & Design: isi `shots` + `hero` lalu hapus status "soon".
// `pos` foto di galeri: wide | pa pb | qa qb | t1 t2 t3 (lihat .pos-* di globals.css).
export const categories = {
  photo: {
    title: ["Photo", "Selected frames"],
    kind: "Product · Portrait · Lifestyle",
    role: "Photographer",
    brief: "Light first. Skin, product, mood.",
    palette: { bg: "#ece6dc", fg: "#1d1712", mute: "#6c665f", line: "rgba(29, 23, 18, 0.2)", accent: "#b5482a" },
    hero: { src: "/work/photo/hero.webp", width: 1552, height: 2328, alt: "Model on a dark crinkled backdrop resting her chin on her hand, holding two cream jars" },
    shots: [
      { pos: "wide", src: "/work/photo/01.webp", width: 2580, height: 1720, alt: "Model holding two skincare tubes against a black backdrop" },
      { pos: "pa", src: "/work/photo/02.webp", width: 1100, height: 1954, alt: "Bintang Zero can covered in condensation on a black background" },
      { pos: "pb", src: "/work/photo/03.webp", width: 1023, height: 1531, alt: "Back of a sand tee printed with a red barcode and the words forgive me" },
      { pos: "qa", src: "/work/photo/04.webp", width: 1529, height: 2292, alt: "Model with eyes closed holding a pink bottle against her cheek" },
      { pos: "qb", src: "/work/photo/05.webp", width: 2106, height: 1404, alt: "Model holding a foam pump bottle under her chin against a white backdrop" },
      { pos: "wide", src: "/work/photo/06.webp", width: 1965, height: 1309, alt: "Model holding two cream jars against a black background" },
      { pos: "t1", src: "/work/photo/07.webp", width: 1080, height: 1616, alt: "Model on concrete stairs at night wearing a sand tee" },
      { pos: "t2", src: "/work/photo/08.webp", width: 887, height: 1330, alt: "Close-up of a model with eyes closed holding a serum bottle against her cheek" },
      { pos: "t3", src: "/work/photo/09.webp", width: 1100, height: 1650, alt: "Iced milk coffee in a branded cup on a white podium" },
      { pos: "qa", src: "/work/photo/10.webp", width: 922, height: 1637, alt: "Dark perfume bottle on a black fabric background" },
      { pos: "qb", src: "/work/photo/11.webp", width: 2836, height: 1890, alt: "Model holding two lotion tubes against a black backdrop" },
      { pos: "pa", src: "/work/photo/12.webp", width: 1051, height: 1573, alt: "Model in a floral jacket holding two cream jars beside her face in a bright shop" },
      { pos: "pb", src: "/work/photo/13.webp", width: 908, height: 1361, alt: "Model in a green top holding a small bottle by her face" },
      { pos: "wide", src: "/work/photo/14.webp", width: 2600, height: 1734, alt: "Model with short hair holding a lotion tube against a white backdrop" },
      { pos: "qa", src: "/work/photo/15.webp", width: 1100, height: 1650, alt: "Latte with leaf art in a black cup on white marble" },
      { pos: "qb", src: "/work/photo/16.webp", width: 1616, height: 1080, alt: "Woman at a cafe table presenting skincare products" },
      { pos: "t1", src: "/work/photo/17.webp", width: 1442, height: 2163, alt: "Model shading her eyes in strong sunlight while holding a bottle" },
      { pos: "t2", src: "/work/photo/18.webp", width: 916, height: 1370, alt: "Model outdoors holding two cream jars against her cheeks, eyes closed" },
      { pos: "t3", src: "/work/photo/19.webp", width: 1080, height: 1616, alt: "Model in profile at night wearing a sand tee" },
    ],
  },
  video: {
    palette: { bg: "#0b0708", fg: "#f3ece9", mute: "#7f7a79", line: "rgba(243, 236, 233, 0.2)", accent: "#e5322d" },
  },
  design: {
    palette: { bg: "#d8dde6", fg: "#0c1222", mute: "#5a5f6c", line: "rgba(12, 18, 34, 0.2)", accent: "#2f4bff" },
  },
};
