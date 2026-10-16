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
    { slug: "photo", title: "Photo", kind: "Product · Portrait · Lifestyle", visual: "photos", images: [{ src: "/work/tzuyu-skincare/hero.webp", width: 1552, height: 2328 }, { src: "/work/bintang-zero/final.webp", width: 1100, height: 1954 }, { src: "/work/tzuyu-skincare/09.webp", width: 2600, height: 1734 }, { src: "/work/tzuyu-skincare/02.webp", width: 1529, height: 2292 }], href: "#work" },
    { slug: "video", title: "Video", kind: "Shoot · Edit · Grade", visual: "film" },
    { slug: "design", title: "Design", kind: "Layout · Identity · Social", visual: "feed", status: "soon", href: "#work" },
  ],

  // Reel: foto-foto ini berganti mengikuti scroll (pakai file di public/)
  reel: { caption: "Stories that move.", sub: "Selected frames", frames: ["/work/tzuyu-skincare/01.webp", "/work/tzuyu-skincare/06.webp", "/work/tzuyu-skincare/04.webp", "/work/tzuyu-skincare/09.webp", "/work/tzuyu-skincare/10.webp", "/work/tzuyu-skincare/13.webp"] },

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
// Netral mengikuti hero: Photo = paper yang sama dengan hero, Video = ink, Design = abu beton. Warna datang dari foto/video-nya. Video & Design: isi `shots` + `hero` lalu hapus status "soon".
// Foto milik brand otomatis ikut ke galeri Photo (lihat photoGallery di bawah); `shots` hanya untuk foto lepas tanpa brand.
export const categories = {
  photo: {
    title: ["Photo", "Selected frames"],
    kind: "Product · Portrait · Lifestyle",
    role: "Photographer",
    brief: "Light first. Skin, product, mood.",
    palette: { bg: "#f3f3f1", fg: "#050505", mute: "#6b6b67", line: "rgba(5, 5, 5, 0.18)", accent: "#050505" },
    hero: { src: "/work/tzuyu-skincare/hero.webp", width: 1552, height: 2328, alt: "Model on a dark crinkled backdrop resting her chin on her hand, holding two cream jars" },
    shots: [], // foto lepas tanpa brand (kosong: semua foto sudah milik brand dan otomatis ikut ke galeri)
    layout: "gallery", // halaman galeri dengan filter brand; tanpa ini, halaman disiplin berupa daftar brand
  },
  video: {
    title: ["Video", "Selected films"],
    kind: "Shoot · Edit · Grade",
    brief: "Moving frames, brand by brand.",
    palette: { bg: "#050505", fg: "#f3f3f1", mute: "#8c8c88", line: "rgba(243, 243, 241, 0.16)", accent: "#f3f3f1" },
  },
  design: {
    palette: { bg: "#d6d6d2", fg: "#050505", mute: "#55554f", line: "rgba(5, 5, 5, 0.2)", accent: "#050505" },
  },
};

/* ---------- Brand: pusat konten ----------
   Satu brand = satu halaman (/work/brand/<slug>/). Photo, Video, dan Design brand itu tampil di halaman yang sama;
   halaman disiplin (/work/photo, /work/video) hanya menyaring brand yang punya disiplin tersebut.
   Isi `quote` ({ text, by }), `duration` ("3 minggu · Mar–Apr 2026"), dan `role` kalau sudah ada; kosong = bagian itu disembunyikan.
   Video Vimeo: `vimeo: { id, hash }` dari URL player (hash = nilai ?h=). Tambah `poster` (webp) supaya tampilan sebelum play lebih bagus.
   `design` memakai bentuk yang sama dengan `photo` (gambar). */
// files: [nama-file, lebar, tinggi, alt?]. Alt kosong = "<Brand>, photo <file>"
const shots = (dir, name, files) =>
  files.map(([file, width, height, alt]) => ({ src: `/work/${dir}/${file}.webp`, width, height, alt: alt ?? `${name}, photo ${file}` }));

// Brand dari CV yang karyanya belum masuk: halaman dan linknya otomatis aktif begitu `photo`/`video`/`design` diisi
const pending = (slug, name) => ({ slug, name, photo: [], video: [], design: [] });

export const brands = [
  {
    slug: "tzuyu-skincare",
    // Palet halaman brand diambil dari warna cover (biru-hijau gelap + kulit hangat)
    palette: { bg: "#0f171d", fg: "#efe9e1", mute: "#8d969b", line: "rgba(239, 233, 225, 0.18)", accent: "#d99a7e" },
    name: "Tzuyu Skincare",
    cover: shots("tzuyu-skincare", "Tzuyu Skincare", [["hero", 1552, 2328, "Model on a dark crinkled backdrop resting her chin on her hand, holding two cream jars"]])[0],
    photo: shots("tzuyu-skincare", "Tzuyu Skincare", [
      ["01", 2580, 1720, "Model holding two skincare tubes against a black backdrop"],
      ["02", 1529, 2292, "Model with eyes closed holding a pink bottle against her cheek"],
      ["03", 2106, 1404, "Model holding a foam pump bottle under her chin against a white backdrop"],
      ["04", 1965, 1309, "Model holding two cream jars against a black background"],
      ["05", 887, 1330, "Close-up of a model with eyes closed holding a serum bottle against her cheek"],
      ["06", 2836, 1890, "Model holding two lotion tubes against a black backdrop"],
      ["07", 1051, 1573, "Model in a floral jacket holding two cream jars beside her face in a bright shop"],
      ["08", 908, 1361, "Model in a green top holding a small bottle by her face"],
      ["09", 2600, 1734, "Model with short hair holding a lotion tube against a white backdrop"],
      ["10", 1616, 1080, "Woman at a cafe table presenting skincare products"],
      ["11", 1442, 2163, "Model shading her eyes in strong sunlight while holding a bottle"],
      ["12", 916, 1370, "Model outdoors holding two cream jars against her cheeks, eyes closed"],
      ["13", 2147, 1432, "Model with eyes closed holding two skincare tubes against a soft grey backdrop"],
    ]),
    video: [],
    design: [],
  },
  {
    slug: "nez-coffeeneatery",
    // Palet halaman brand diambil dari warna cover (krem pucat + oranye minuman)
    palette: { bg: "#ece9e2", fg: "#1c1710", mute: "#6d675d", line: "rgba(28, 23, 16, 0.2)", accent: "#c4660a" },
    name: "Nez Coffeeneatery",
    cover: shots("nez-coffeeneatery", "Nez Coffeeneatery", [["hero", 1100, 1375]])[0],
    photo: [
      ...shots("nez-coffeeneatery", "Nez Coffeeneatery", [
        ["01", 1100, 1650],
        ["02", 1100, 1650, "Latte with leaf art in a black cup on white marble"],
        ["03", 1100, 1650],
        ["04", 1100, 1650, "Iced milk coffee in a branded cup on a white podium"],
      ]),
    ],
    video: [{ vimeo: { id: "1234933920", hash: "76fbd6f3d0" }, ratio: "16 / 9" }],
    design: [],
  },
  {
    slug: "heiu",
    // Palet halaman brand diambil dari warna cover (krem kaos + merah cetakan)
    palette: { bg: "#d9c3a8", fg: "#1d120d", mute: "#5f5043", line: "rgba(29, 18, 13, 0.22)", accent: "#c8281f" },
    name: "HEIU",
    cover: shots("heiu", "HEIU", [["hero", 1023, 1531, "Back of a sand tee printed with a red barcode and the words forgive me"]])[0],
    photo: shots("heiu", "HEIU", [
      ["01", 930, 1392],
      ["02", 1080, 1616],
      ["03", 1080, 1616, "Model in profile at night wearing a sand tee"],
      ["04", 1080, 1616, "Model on concrete stairs at night wearing a sand tee"],
    ]),
    video: [],
    design: [],
  },
  {
    slug: "bintang-zero",
    // Palet halaman brand diambil dari warna cover (navy gelap + merah bintang)
    palette: { bg: "#0a0f1c", fg: "#f1efe9", mute: "#8a90a0", line: "rgba(241, 239, 233, 0.18)", accent: "#e0343c" },
    name: "Bintang Zero",
    cover: shots("bintang-zero", "Bintang Zero", [["final", 1100, 1954, "Bintang Zero can covered in condensation on a black background"]])[0],
    photo: shots("bintang-zero", "Bintang Zero", [["01", 1100, 1955], ["02", 2000, 1125], ["03", 2000, 1125]]),
    video: [],
    design: [],
  },
  // Dari CV (assets menyusul)
  pending("fitnation", "FitNation"),
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
  brands.forEach((b) => [b.cover, ...b.photo].filter(Boolean).forEach((p) => all.some((s) => s.src === p.src) || all.push(p)));
  return all.map((p) => ({ ...p, brand: owner.get(p.src) }));
};

// Semua video lintas brand untuk gallery Video
export const videoGallery = () => brands.flatMap((b) => b.video.map((v) => ({ ...v, brand: b.slug })));
