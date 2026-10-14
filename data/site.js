// Semua konten portofolio ada di sini. Ganti sesuai kebutuhan — komponen tidak perlu disentuh.
// Perjalanan kerja (urutan terbaru ke lama), diambil dari CV.
// `tags`: kunci di TAGS (components/Journey.jsx). `brand`: slug di `brands` (bawah). Nama perusahaan baru jadi link
// ke /work/brand/<slug>/ setelah brand itu punya karya; sebelum itu tampil sebagai teks biasa.
export const journey = [
  // Freelance: `brands` = slug brand yang punya halaman karya (lihat `brands`); `period` kosong = label "Freelance"
  { period: null, role: "Freelance Creative", brands: ["bintang-zero", "heiu", "nez-coffeeneatery"], tags: ["shoot", "reels", "feed"] },
  { period: ["06/2024", "09/2026"], role: "Marketing Communication", company: "FitNation", brand: "fitnation", tags: ["feed", "reels", "captions", "shoot", "edit"] },
  { period: ["06/2023", "06/2024"], role: "Video Editor", company: "Tzuyu Skincare", brand: "tzuyu-skincare", tags: ["feed", "reels", "captions"] },
  { period: ["11/2022", "06/2023"], role: "Graphic Designer", company: "Starphone Semarang", brand: "starphone-semarang", tags: ["feed", "reels", "captions"] },
  { period: ["07/2022", "10/2022"], role: "Videographer", company: "Salwa Official", brand: "salwa-official", tags: ["shoot", "edit"] },
  { period: ["03/2022", "07/2022"], role: "Videographer", company: "Dinas Pendidikan dan Kebudayaan Kalimantan Barat", brand: "disdikbud-kalbar", tags: ["docs"] },
  { period: ["01/2022", "07/2022"], role: "Videographer", company: "Cantik Clinic", brand: "cantik-clinic", tags: ["shoot", "edit"] },
  { period: ["01/2022", "07/2022"], role: "Videographer", company: "Chamomile", brand: "chamomile", tags: ["shoot", "edit"] },
  { period: ["01/2022", "07/2022"], role: "Videographer", company: "DNA Farmasi", brand: "dna-farmasi", tags: ["shoot", "edit"] },
];

export const education = {
  period: ["2018", "2021"],
  field: "Multimedia",
  school: "SMK N 2 Singkawang",
  badges: ["Student council president", "GenRe Singkawang ambassador", "Head of PIK-R", "LSP P1 Multimedia"],
};

export const site = {
  name: "Aziz Zulhakim",
  role: "Digital Creative",
  year: 2026,
  email: "zulhakimaziz778@gmail.com",
  phone: "0895372691601",
  location: "Semarang, Indonesia",
  status: "Open for work",
  title: "Aziz Zulhakim — Digital Creative",
  description: "Photo, video, and design with a point of view.",
  // Domain sendiri (mis. "https://azizzulhakim.com") untuk link share. Kosong = pakai domain Vercel otomatis.
  url: "",
  og: { src: "/og.jpg", width: 1200, height: 630, alt: "Aziz Zulhakim, Digital Creative: black-and-white portrait beside the name" },

  portrait: { src: "/portrait.jpg", width: 770, height: 1368, alt: "Black-and-white portrait of Aziz Zulhakim in a black tuxedo with an untied bow tie" },

  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Journey", href: "#journey" },
    { label: "Contact", href: "#contact", cta: true },
  ],

  marquee: ["Photo", "Video", "Design", "Brand", "Story", "Motion"],

  // Tiga disiplin (panggung di section Work). Punya halaman sendiri kalau `categories[slug]` berisi foto/karya.
  // status: "soon" = belum ada karya: tampil di panggung tapi belum bisa dibuka.
  // visual: "photos" (pakai `images`) | "film" (pita dari site.reel.frames) | "feed" (tile bertipografi dari brand di `journey`)
  works: [
    { slug: "photo", title: "Photo", kind: "Product · Portrait · Lifestyle", visual: "photos", images: [{ src: "/work/photo/hero.webp", width: 1552, height: 2328 }, { src: "/work/photo/02.webp", width: 1100, height: 1954 }, { src: "/work/photo/14.webp", width: 2600, height: 1734 }, { src: "/work/photo/04.webp", width: 1529, height: 2292 }], href: "#work" },
    { slug: "video", title: "Video", kind: "Shoot · Edit · Grade", visual: "film" },
    { slug: "design", title: "Design", kind: "Layout · Identity · Social", visual: "feed", status: "soon", href: "#work" },
  ],

  // Reel: foto-foto ini berganti mengikuti scroll (pakai file di public/)
  reel: { caption: "Stories that move.", sub: "Selected frames", frames: ["/work/photo/01.webp", "/work/photo/11.webp", "/work/photo/06.webp", "/work/photo/14.webp", "/work/photo/16.webp", "/work/photo/20.webp"] },

  statement:
    "I make images, films and visual systems — turning ideas into work people remember.",

  capabilities: [
    { name: "Photography", note: "Product, portrait, lifestyle" },
    { name: "Videography", note: "Shoot, edit, reels" },
    { name: "Graphic Design", note: "Feed, stories, layout" },
    { name: "Creative Direction", note: "Concept to delivery" },
  ],

  // Angka dari CV: 4 tahun pengalaman; jumlah tim/klien dihitung dari `journey` (brand freelance dihitung satu per satu).
  stats: [
    { value: "4", label: "years creating" },
    { value: String(journey.reduce((n, j) => n + (j.brands ? j.brands.length : 1), 0)), label: "teams & clients" },
  ],

  tools: ["Photoshop", "After Effects", "Premiere Pro", "Canva", "CapCut"],
  languages: [{ name: "Bahasa Indonesia", level: "Native" }, { name: "English", level: "Intermediate" }],

  // Kanal di section Contact dan menu mobile. Isi `href` (+ `handle` = teks yang tampil, mis. "@aziz"), lalu ubah `show` jadi true.
  // Tampil hanya kalau `show: true` DAN `href` terisi. Email sudah jadi tombol utama, jadi tidak ada di daftar ini.
  socials: [
    { label: "WhatsApp", href: "https://wa.me/62895372691601", handle: "+62 895-3726-91601", show: true },
    { label: "Instagram", href: "", handle: "", show: false },
    { label: "TikTok", href: "", handle: "", show: false },
    { label: "YouTube", href: "", handle: "", show: false },
    { label: "Vimeo", href: "", handle: "", show: false },
    { label: "Behance", href: "", handle: "", show: false },
    { label: "LinkedIn", href: "", handle: "", show: false },
    { label: "Pinterest", href: "", handle: "", show: false },
    { label: "Dribbble", href: "", handle: "", show: false },
    { label: "Threads", href: "", handle: "", show: false },
    { label: "X", href: "", handle: "", show: false },
    { label: "Facebook", href: "", handle: "", show: false },
  ],
};

export const socialLinks = () => site.socials.filter((s) => s.show && s.href);

// Halaman tiap disiplin (/work/<slug>/). `palette` mewarnai panggung Work di beranda dan halaman disiplinnya.
// Design memakai hitam-putih situs; Photo dan Video membawa warna dari karya (krem dan merah dari HEIU/Nez, hitam sinematik). Video & Design: isi `shots` + `hero` lalu hapus status "soon".
// `shots` = foto lepas di gallery Photo; foto milik brand otomatis ikut (lihat photoGallery di bawah).
export const categories = {
  photo: {
    title: ["Photo", "Selected frames"],
    kind: "Product · Portrait · Lifestyle",
    role: "Photographer",
    brief: "Light first. Skin, product, mood.",
    palette: { bg: "#ece6dc", fg: "#1d1712", mute: "#6c665f", line: "rgba(29, 23, 18, 0.2)", accent: "#b5482a" },
    hero: { src: "/work/photo/hero.webp", width: 1552, height: 2328, alt: "Model on a dark crinkled backdrop resting her chin on her hand, holding two cream jars" },
    shots: [
      { src: "/work/photo/01.webp", width: 2580, height: 1720, alt: "Model holding two skincare tubes against a black backdrop" },
      { src: "/work/photo/02.webp", width: 1100, height: 1954, alt: "Bintang Zero can covered in condensation on a black background" },
      { src: "/work/photo/03.webp", width: 1023, height: 1531, alt: "Back of a sand tee printed with a red barcode and the words forgive me" },
      { src: "/work/photo/04.webp", width: 1529, height: 2292, alt: "Model with eyes closed holding a pink bottle against her cheek" },
      { src: "/work/photo/05.webp", width: 2106, height: 1404, alt: "Model holding a foam pump bottle under her chin against a white backdrop" },
      { src: "/work/photo/06.webp", width: 1965, height: 1309, alt: "Model holding two cream jars against a black background" },
      { src: "/work/photo/07.webp", width: 1080, height: 1616, alt: "Model on concrete stairs at night wearing a sand tee" },
      { src: "/work/photo/08.webp", width: 887, height: 1330, alt: "Close-up of a model with eyes closed holding a serum bottle against her cheek" },
      { src: "/work/photo/09.webp", width: 1100, height: 1650, alt: "Iced milk coffee in a branded cup on a white podium" },
      { src: "/work/photo/10.webp", width: 922, height: 1637, alt: "Dark perfume bottle on a black fabric background" },
      { src: "/work/photo/11.webp", width: 2836, height: 1890, alt: "Model holding two lotion tubes against a black backdrop" },
      { src: "/work/photo/12.webp", width: 1051, height: 1573, alt: "Model in a floral jacket holding two cream jars beside her face in a bright shop" },
      { src: "/work/photo/13.webp", width: 908, height: 1361, alt: "Model in a green top holding a small bottle by her face" },
      { src: "/work/photo/14.webp", width: 2600, height: 1734, alt: "Model with short hair holding a lotion tube against a white backdrop" },
      { src: "/work/photo/15.webp", width: 1100, height: 1650, alt: "Latte with leaf art in a black cup on white marble" },
      { src: "/work/photo/16.webp", width: 1616, height: 1080, alt: "Woman at a cafe table presenting skincare products" },
      { src: "/work/photo/17.webp", width: 1442, height: 2163, alt: "Model shading her eyes in strong sunlight while holding a bottle" },
      { src: "/work/photo/18.webp", width: 916, height: 1370, alt: "Model outdoors holding two cream jars against her cheeks, eyes closed" },
      { src: "/work/photo/19.webp", width: 1080, height: 1616, alt: "Model in profile at night wearing a sand tee" },
    ],
  },
  video: {
    title: ["Video", "Selected films"],
    kind: "Shoot · Edit · Grade",
    brief: "Moving frames, brand by brand.",
    palette: { bg: "#0b0708", fg: "#f3ece9", mute: "#7f7a79", line: "rgba(243, 236, 233, 0.2)", accent: "#e5322d" },
  },
  design: {
    palette: { bg: "#f3f3f1", fg: "#050505", mute: "#6b6b67", line: "rgba(5, 5, 5, 0.18)", accent: "#050505" },
  },
};

/* ---------- Brand: pusat konten ----------
   Satu brand = satu halaman (/work/brand/<slug>/). Photo, Video, dan Design brand itu tampil di halaman yang sama;
   halaman disiplin (/work/photo, /work/video) hanya menyaring brand yang punya disiplin tersebut.
   Isi `quote` ({ text, by }), `duration` ("3 minggu · Mar–Apr 2026"), dan `role` kalau sudah ada; kosong = bagian itu disembunyikan.
   Video Vimeo: `vimeo: { id, hash }` dari URL player (hash = nilai ?h=). Tambah `poster` (webp) supaya tampilan sebelum play lebih bagus.
   `design` memakai bentuk yang sama dengan `photo` (gambar). */
const shots = (dir, name, files) =>
  files.map(([file, width, height]) => ({ src: `/work/${dir}/${file}.webp`, width, height, alt: `${name}, photo ${file}` }));

// Brand dari CV yang karyanya belum masuk: halaman dan linknya otomatis aktif begitu `photo`/`video`/`design` diisi
const pending = (slug, name) => ({ slug, name, photo: [], video: [], design: [] });

// Foto brand yang sama dengan foto lepas di categories.photo.shots dipakai ulang dari sana
const legacy = (n) => categories.photo.shots.find((shot) => shot.src === `/work/photo/${n}.webp`);

export const brands = [
  {
    slug: "nez-coffeeneatery",
    // Palet halaman brand diambil dari warna cover (krem pucat + oranye minuman)
    palette: { bg: "#ece9e2", fg: "#1c1710", mute: "#6d675d", line: "rgba(28, 23, 16, 0.2)", accent: "#c4660a" },
    name: "Nez Coffeeneatery",
    cover: shots("nez-coffeeneatery", "Nez Coffeeneatery", [["hero", 1100, 1375]])[0],
    photo: [
      ...shots("nez-coffeeneatery", "Nez Coffeeneatery", [["01", 1100, 1650]]),
      legacy("15"),
      ...shots("nez-coffeeneatery", "Nez Coffeeneatery", [["03", 1100, 1650]]),
      legacy("09"),
    ],
    video: [{ vimeo: { id: "1234933920", hash: "76fbd6f3d0" }, ratio: "16 / 9" }],
    design: [],
  },
  {
    slug: "heiu",
    // Palet halaman brand diambil dari warna cover (krem kaos + merah cetakan)
    palette: { bg: "#d9c3a8", fg: "#1d120d", mute: "#5f5043", line: "rgba(29, 18, 13, 0.22)", accent: "#c8281f" },
    name: "HEIU",
    cover: legacy("03"),
    photo: [...shots("heiu", "HEIU", [["01", 930, 1392], ["02", 1080, 1616]]), legacy("19"), legacy("07")],
    video: [],
    design: [],
  },
  {
    slug: "bintang-zero",
    // Palet halaman brand diambil dari warna cover (navy gelap + merah bintang)
    palette: { bg: "#0a0f1c", fg: "#f1efe9", mute: "#8a90a0", line: "rgba(241, 239, 233, 0.18)", accent: "#e0343c" },
    name: "Bintang Zero",
    cover: legacy("02"),
    photo: shots("bintang-zero", "Bintang Zero", [["01", 1100, 1955], ["02", 2000, 1125], ["03", 2000, 1125]]),
    video: [],
    design: [],
  },
  // Dari CV (assets menyusul)
  pending("fitnation", "FitNation"),
  pending("tzuyu-skincare", "Tzuyu Skincare"),
  pending("starphone-semarang", "Starphone Semarang"),
  pending("salwa-official", "Salwa Official"),
  pending("disdikbud-kalbar", "Dinas Pendidikan dan Kebudayaan Kalimantan Barat"),
  pending("cantik-clinic", "Cantik Clinic"),
  pending("chamomile", "Chamomile"),
  pending("dna-farmasi", "DNA Farmasi"),
];

// Role dan lama kerja brand diambil dari Journey (CV), cover default = foto pertama
journey.forEach(({ brand: slug, role, period }) => {
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) return;
  brand.role ??= role;
  brand.duration ??= period.join(" – ");
});
brands.forEach((b) => {
  b.cover ??= b.photo[0] ?? b.design[0];
});

export const DISCIPLINES = [
  { slug: "photo", title: "Photo" },
  { slug: "video", title: "Video" },
  { slug: "design", title: "Design" },
];

// Disiplin yang dimiliki sebuah brand (berurutan: Photo, Video, Design)
export const disciplinesOf = (brand) => DISCIPLINES.filter((d) => brand[d.slug]?.length);

// Brand yang sudah punya halaman: ada karya (cover otomatis dari foto pertama; brand khusus video perlu `cover` sendiri)
export const liveBrands = () => brands.filter((b) => b.cover && disciplinesOf(b).length);

// Brand yang punya karya di satu disiplin
export const brandsWith = (slug) => liveBrands().filter((b) => b[slug]?.length);

// Gabungan semua foto untuk gallery Photo: foto lepas + foto brand yang belum ada di sana.
// Tiap foto diberi `brand` (slug) kalau milik brand, dipakai untuk filter. Foto tanpa brand hanya tampil di "All".
export const photoGallery = () => {
  const owner = new Map();
  brands.forEach((b) => [b.cover, ...b.photo].filter(Boolean).forEach((p) => owner.set(p.src, b.slug)));

  const all = [...categories.photo.shots];
  brands.forEach((b) => b.photo.forEach((p) => all.some((s) => s.src === p.src) || all.push(p)));
  return all.map((p) => ({ ...p, brand: owner.get(p.src) }));
};

// Semua video lintas brand untuk gallery Video
export const videoGallery = () => brands.flatMap((b) => b.video.map((v) => ({ ...v, brand: b.slug })));
