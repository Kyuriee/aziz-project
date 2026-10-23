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
  // visual: "photos" (pakai `images`) | "film" (pita dari site.reel.frames) | "feed" (HP dengan feed tile bertipografi dari brand di `journey`)
  works: [
    { slug: "photo", title: "Photo", kind: "Product · Portrait · Lifestyle", visual: "photos", images: [{ src: "/work/tzuyu-skincare/hero.webp", width: 1332, height: 1996 }, { src: "/work/bintang-zero/final.webp", width: 745, height: 1323 }, { src: "/work/tzuyu-skincare/11.webp", width: 1707, height: 1138 }, { src: "/work/tzuyu-skincare/02.webp", width: 798, height: 1198 }], href: "#work" },
    { slug: "video", title: "Video", kind: "Shoot · Edit · Grade", visual: "film" },
    { slug: "design", title: "Design", kind: "Layout · Identity · Social", visual: "feed", status: "soon", href: "#work" },
  ],

  // Reel: foto-foto ini berganti mengikuti scroll (pakai file di public/)
  reel: { caption: "Stories that move.", sub: "Selected frames", frames: ["/work/tzuyu-skincare/hero.webp", "/work/tzuyu-skincare/03.webp", "/work/tzuyu-skincare/08.webp", "/work/tzuyu-skincare/11.webp", "/work/tzuyu-skincare/12.webp", "/work/tzuyu-skincare/10.webp"] },

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
// Foto milik brand otomatis ikut ke halaman Photo (lihat photoChapters di bawah); `shots` hanya untuk foto lepas tanpa brand.
export const categories = {
  photo: {
    title: ["Photo", "Selected frames"],
    kind: "Product · Portrait · Lifestyle",
    role: "Photographer",
    brief: "Light first. Skin, product, mood.",
    palette: { bg: "#f3f3f1", fg: "#050505", mute: "#6b6b67", line: "rgba(5, 5, 5, 0.18)", accent: "#050505" },
    hero: { src: "/work/tzuyu-skincare/hero.webp", width: 1332, height: 1996, alt: "Model with eyes closed holding a pink bottle against her cheek in a white sleeveless top" },
    shots: [], // foto lepas tanpa brand (kosong: semua foto sudah milik brand dan otomatis ikut ke halaman Photo)
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
    cover: shots("tzuyu-skincare", "Tzuyu Skincare", [["hero", 1332, 1996, "Model with eyes closed holding a pink bottle against her cheek in a white sleeveless top"]])[0],
    photo: shots("tzuyu-skincare", "Tzuyu Skincare", [
      ["01", 1080, 1080, "Model in a beige shirt holding a white tube beside her face"],
      ["02", 798, 1198, "Model with eyes closed holding a pink pump bottle against her cheek"],
      ["03", 891, 1336, "Model in a green top holding a small jar by her face at a cafe"],
      ["04", 827, 1239, "Model in a white tank top holding a foam pump bottle against her cheek outdoors"],
      ["05", 1866, 1244, "Model on a light backdrop holding a bottle under her chin"],
      ["06", 1616, 1080, "Model with eyes closed holding a small bottle in both hands"],
      ["07", 1753, 1169, "Model with eyes closed holding a lotion tube against a light backdrop"],
      ["08", 1274, 1911, "Model shading her eyes in strong sunlight while holding a bottle"],
      ["09", 2000, 1333, "Model with short hair holding a tube against a white backdrop"],
      ["10", 2000, 1333, "Model with short hair in a cream blouse holding a tube"],
      ["11", 1707, 1138, "Model in a grey blazer holding two cream jars against a black backdrop"],
      ["12", 800, 1197, "Model outdoors holding two cream jars against her cheeks, eyes closed"],
    ]),
    video: [],
    design: [],
  },
  {
    slug: "nez-coffeeneatery",
    // Palet halaman brand diambil dari warna cover (krem pucat + oranye minuman)
    palette: { bg: "#ece9e2", fg: "#1c1710", mute: "#6d675d", line: "rgba(28, 23, 16, 0.2)", accent: "#c4660a" },
    name: "Nez Coffeeneatery",
    cover: shots("nez-coffeeneatery", "Nez Coffeeneatery", [["hero", 1333, 2000, "Barista pouring espresso over an iced milk coffee"]])[0],
    photo: shots("nez-coffeeneatery", "Nez Coffeeneatery", [
      ["01", 1333, 2000, "Latte with leaf art in a black cup on white marble"],
      ["02", 1333, 2000, "Iced milk coffee in a glass on a wooden coaster"],
      ["03", 1333, 2000, "Coffee with latte art in a glass on a wooden coaster"],
      ["04", 683, 1024, "Iced milk coffee in a branded cup on a white podium"],
      ["05", 819, 1024, "Orange and cream iced drink in a branded cup on a white podium"],
      ["06", 540, 960, "Iced drinks in branded cups on white podiums"],
    ]),
    video: [{ vimeo: { id: "1234933920", hash: "76fbd6f3d0" }, ratio: "16 / 9" }],
    design: [],
  },
  {
    slug: "heiu",
    // Palet halaman brand diambil dari warna cover (krem kaos + merah cetakan)
    palette: { bg: "#d9c3a8", fg: "#1d120d", mute: "#5f5043", line: "rgba(29, 18, 13, 0.22)", accent: "#c8281f" },
    name: "HEIU",
    cover: shots("heiu", "HEIU", [["hero", 768, 1150, "Back of a sand tee printed with a red barcode and the words forgive me"]])[0],
    photo: shots("heiu", "HEIU", [
      ["01", 930, 1392, "Model in a sand tee against a white wall"],
      ["02", 1080, 1616, "Close-up of a sand tee with a red heiu print and a necklace"],
      ["03", 1006, 1505, "Model in profile at night wearing a sand tee"],
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
    cover: shots("bintang-zero", "Bintang Zero", [["final", 745, 1323, "Bintang Zero can lit against a black background"]])[0],
    photo: shots("bintang-zero", "Bintang Zero", [["01", 1126, 2000], ["02", 2000, 1126], ["03", 2000, 1126]]),
    video: [],
    design: [],
  },
  {
    slug: "freelance",
    // Karya lepas (model Mei, produk Zara). Palet dari tembok bata merah + kemeja krem
    palette: { bg: "#1a0e0c", fg: "#f0e6da", mute: "#9a8b80", line: "rgba(240, 230, 218, 0.18)", accent: "#c4452f" },
    name: "Freelance",
    role: "Freelance Creative",
    cover: shots("freelance", "Freelance", [["hero", 731, 1299, "Model in a printed beige shirt leaning against a red brick wall"]])[0],
    photo: shots("freelance", "Freelance", [
      ["01", 879, 1561, "Model in a printed beige shirt and white pants sitting on a bench at night"],
      ["02", 1080, 1920, "Model sitting on green stairs with her hands on her knees"],
      ["03", 788, 1402, "Model on green stairs with one arm raised"],
      ["04", 902, 1605, "Model looking to the side against a red brick wall"],
      ["05", 927, 1648, "Close-up of a beige printed shirt and a chain across the lips"],
      ["06", 1003, 1783, "Model crouching against a red brick wall holding her sunglasses"],
      ["07", 938, 1667, "Model holding her sunglasses to her lips against a plain wall"],
      ["08", 922, 1637, "Olive green Zara perfume bottle on a dark backdrop"],
    ]),
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

// Bab halaman Photo: satu brand = satu bab. Cover jadi foto pertama, lalu foto brand; tiap foto membawa slug brand-nya.
export const photoChapters = () =>
  brands
    .filter((b) => b.photo.length)
    .map((brand) => ({
      brand,
      frames: [brand.cover, ...brand.photo]
        .filter((p, i, all) => p && all.findIndex((q) => q?.src === p.src) === i)
        .map((p) => ({ ...p, brand: brand.slug })),
    }));

// Semua video lintas brand untuk gallery Video
export const videoGallery = () => brands.flatMap((b) => b.video.map((v) => ({ ...v, brand: b.slug })));
