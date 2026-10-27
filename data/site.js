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
  // visual: "photos" (pakai `images`) | "film" (pita dari site.reel.frames) | "feed" (HP dengan feed dari karya Design; kalau belum ada, tile bertipografi dari brand di `journey`)
  works: [
    { slug: "photo", title: "Photo", kind: "Product · Portrait · Lifestyle", visual: "photos", images: [{ src: "/work/tzuyu-skincare/hero.webp", width: 1332, height: 1996 }, { src: "/work/bintang-zero/final.webp", width: 745, height: 1323 }, { src: "/work/tzuyu-skincare/11.webp", width: 1707, height: 1138 }, { src: "/work/tzuyu-skincare/02.webp", width: 798, height: 1198 }], href: "#work" },
    { slug: "video", title: "Video", kind: "Shoot · Edit · Grade", visual: "film" },
    { slug: "design", title: "Design", kind: "Feed · Story · Banner", visual: "feed" },
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
    layout: "gallery", // halaman Photo (tumpukan cetakan per brand); layout lain: "feed" (Design); tanpa layout = halaman Video
  },
  video: {
    title: ["Video", "Selected films"],
    kind: "Shoot · Edit · Grade",
    brief: "Moving frames, brand by brand.",
    palette: { bg: "#050505", fg: "#f3f3f1", mute: "#8c8c88", line: "rgba(243, 243, 241, 0.16)", accent: "#f3f3f1" },
  },
  design: {
    title: ["Design", "Selected work"],
    kind: "Feed · Story · Banner",
    brief: "Made to be scrolled.",
    layout: "feed", // halaman Design: HP yang di-scroll + rel per brand, per platform dan format
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
// Karya Design: bentuknya sama dengan `shots`, ditambah `channel` (platform) dan `format` (jenis konten di platform itu).
// Platform dan format yang dikenal halaman Design ada di DESIGN_CHANNELS; tambahkan di sana kalau ada yang baru.
const designShots = (dir, name, channel, format, files) =>
  files.map(([file, width, height, alt]) => ({
    src: `/work/${dir}/${file}.webp`, width, height, alt: alt ?? `${name}, ${channel} ${format} ${file}`, channel, format,
  }));

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
    design: [
      ...designShots("tzuyu-skincare", "Tzuyu Skincare", "instagram", "ads", [
        ["ads-01", 1072, 535, "Hello Glass Skin Serum ad banner with a model holding the dropper"],
        ["ads-02", 1440, 360, "Face and Body Peeling ultra-wide ad banner"],
        ["ads-03", 1060, 530, "DNA Salmon and Yuzu Extract whitening cream ad banner"],
        ["ads-04", 1440, 360, "Hand and Body Lotion ultra-wide ad banner"],
        ["ads-05", 1169, 584, "Payday Sale 6.6 up to 60 percent off ad banner with the product lineup"],
        ["ads-06", 1440, 360, "Hand and Body Lotion ultra-wide ad banner with a cream splash"],
        ["ads-07", 1249, 750, "Face and Body Peeling and Hand and Body Lotion ad banner"],
        ["ads-08", 1157, 694, "Beauty without clinic treatment ad banner with the product lineup"],
        ["ads-09", 857, 714, "Payday Sale 6.6 ad banner, compact version"],
        ["ads-10", 757, 632, "DNA Salmon and Yuzu Extract whitening cream ad banner, compact version"],
        ["ads-11", 767, 640, "Hello Glass Skin Serum ad banner, compact version"],
      ]),
      ...designShots("tzuyu-skincare", "Tzuyu Skincare", "instagram", "feed", [
        ["feed-01", 1005, 1002, "Hydrating Facial Essence post on pink"],
        ["feed-02", 1174, 1171, "Glow Expert day and night cream post"],
        ["feed-03", 1440, 1440, "Acne Spot Cream product shot"],
        ["feed-04", 1440, 1440, "Hello Glass Skin Serum product shot"],
        ["feed-05", 1440, 1440, "Hydrating Facial Essence product shot"],
        ["feed-06", 1440, 1440, "Refreshing Face Wash product shot"],
        ["feed-07", 1440, 1440, "Refreshing Face Wash product shot, second angle"],
        ["feed-08", 1440, 1440, "Whitening Night Cream product shot"],
        ["feed-09", 1440, 1440, "Whitening Day Cream product shot"],
        ["feed-10", 1440, 1440, "Glow Expert Night Cream product shot"],
        ["feed-11", 1440, 1440, "Day Cream Protection product shot"],
        ["feed-12", 1440, 1440, "Hand and Body Lotion product shot"],
        ["feed-13", 1440, 1440, "Face and Body Peeling product shot"],
        ["feed-14", 741, 741, "Age Miracle Serum post on pink water"],
        ["feed-15", 913, 913, "Dull skin question post with DNA Salmon"],
        ["feed-16", 1012, 1012, "DNA Salmon cream post"],
        ["feed-17", 811, 811, "Hands holding a DNA Salmon jar beside a skin check"],
        ["feed-18", 971, 971, "Which skin type quiz post"],
        ["feed-19", 972, 972, "Best Seller Buy 1 Get 1 post"],
        ["feed-20", 832, 832, "Model with a serum bottle and Buy 1 Get 1"],
        ["feed-21", 1039, 1039, "Model holding two tubes"],
        ["feed-22", 896, 896, "Model with short hair holding a tube"],
        ["feed-23", 977, 977, "Model with short hair in a white shirt holding a bottle"],
        ["feed-24", 1080, 1080, "Buy 1 get 2 face wash and essence post"],
        ["feed-25", 946, 946, "Model in a dark setting holding a bottle"],
        ["feed-26", 989, 989, "Model with a dropper serum in a dark setting"],
        ["feed-27", 990, 990, "Professional private class announcement with a hijab model"],
        ["feed-28", 968, 968, "Private class benefits with a hijab model"],
        ["feed-29", 1080, 1080, "Model hugging a bottle, just two drops post"],
        ["feed-30", 1080, 1080, "Hydrating Facial Essence lying on a surface"],
        ["feed-31", 773, 773, "Smiling model holding a bottle"],
        ["feed-32", 1080, 1080, "Glowing set of face wash and creams on black"],
        ["feed-33", 1080, 1080, "Lotion poured into a hand"],
        ["feed-34", 1080, 1080, "Whitening Expert face wash and cream product shot"],
        ["feed-35", 1062, 1062, "Before and after skin comparison"],
        ["feed-36", 1080, 1080, "Night routine night cream on black"],
        ["feed-37", 762, 762, "Model on a scooter holding a cream"],
        ["feed-38", 1043, 1043, "Best combo, hands holding lotion tubes"],
        ["feed-39", 1008, 1008, "Model with eyes closed holding a tube"],
        ["feed-40", 1080, 1080, "Face and Body Peeling and Hand and Body Lotion on black"],
        ["feed-41", 1080, 1080, "Pay Day Sale 6.6 with the product set"],
        ["feed-42", 1080, 1080, "Pay Day Sale 6.6 with a facial essence in torn paper"],
        ["feed-43", 1080, 1080, "Pay Day Sale up to 60 percent off post"],
        ["feed-44", 1080, 1080, "Woman at a desk showing a product to a friend"],
        ["feed-45", 1080, 1080, "Brightening and moisturizing lotion post"],
        ["feed-46", 1080, 1080, "Smiling model holding a tube"],
        ["feed-47", 1080, 1080, "UV A/B Protector day cream post"],
        ["feed-48", 1080, 1080, "Serum bottle against a dark garment"],
        ["feed-49", 1080, 1080, "DNA Salmon and Yuzu Extract night cream post"],
        ["feed-50", 1440, 1440, "Product floating on water ripples"],
        ["feed-51", 1440, 1440, "Serum dropper product shot"],
        ["feed-52", 1080, 1080, "Close-up of cream jars"],
        ["feed-53", 1080, 1080, "Refreshing Face Wash, clean and glow"],
        ["feed-54", 1080, 1080, "Hydrating Facial Essence on white"],
        ["feed-55", 1440, 1440, "Hydrating Facial Essence on white, second angle"],
        ["feed-56", 1080, 1080, "Age Miracle Serum on white"],
        ["feed-57", 1080, 1080, "Hello Glass Skin Serum on white"],
        ["feed-58", 1080, 1080, "Hand and Body Lotion on white"],
        ["feed-59", 1080, 1080, "UV protection lotion on silk"],
        ["feed-60", 1080, 1080, "Anti dull serum with a water splash"],
        ["feed-61", 1080, 1080, "Hand and Body Lotion with a cream swirl"],
        ["feed-62", 1080, 1080, "Serum in water, in 30 days post"],
        ["feed-63", 1080, 1080, "Hydrating Facial Essence tilted on a surface"],
        ["feed-64", 1080, 1080, "Facial essence on a black pedestal"],
        ["feed-65", 1080, 1080, "Facial essence in torn paper"],
      ]),
      ...designShots("tzuyu-skincare", "Tzuyu Skincare", "instagram", "highlight", [
        ["highlight-01", 1080, 1080, "Tzuyu logo highlight cover"],
        ["highlight-02", 1080, 1080, "Highlight icon of a pointing hand"],
        ["highlight-03", 1080, 1080, "Highlight icon of a location pin on a map"],
        ["highlight-04", 1080, 1080, "Highlight icon of a light bulb with people"],
        ["highlight-05", 1080, 1080, "Highlight icon of an open gift box"],
        ["highlight-06", 1080, 1080, "Refreshing face wash highlight cover"],
        ["highlight-07", 1080, 1080, "Hydrating facial essence highlight cover"],
      ]),
      ...designShots("tzuyu-skincare", "Tzuyu Skincare", "instagram", "story", [
        ["story-01", 810, 1440, "Buy 1 Get 1 testimonial story with a customer review"],
        ["story-02", 766, 1362, "Fade dark spots in 30 days story with serum bottles"],
        ["story-03", 497, 1044, "Product price list story with creams and serums"],
        ["story-04", 661, 1388, "Glow with Tzuyu pricelist story with a model holding a bottle"],
        ["story-05", 810, 1440, "Konsul dulu consultation story with a chat on a phone and Buy 1 Get 1"],
        ["story-06", 810, 1440, "Anti dry skin story with Hydrating Facial Essence"],
        ["story-07", 810, 1440, "Model shading her eyes in the sun while holding a bottle"],
        ["story-08", 810, 1440, "Anti dark spot story with a serum dropper bottle"],
        ["story-09", 810, 1440, "Model holding a pink bottle against her cheek"],
        ["story-10", 810, 1440, "Brightening and moisturizing story with Hand and Body Lotion"],
        ["story-11", 660, 1172, "Model with short hair in a white shirt holding a bottle"],
        ["story-12", 810, 1440, "Exfoliate and brighten skin tone story with Face and Body Peeling"],
        ["story-13", 810, 1440, "Model on a black background holding two tubes"],
        ["story-14", 810, 1440, "Clean and glowing story with Refreshing Face Wash"],
        ["story-15", 639, 1137, "Model with eyes closed holding a foam pump bottle in the sun"],
        ["story-16", 810, 1440, "Testimonial story with a five star customer review"],
        ["story-17", 624, 1111, "Model with a face wash bottle under her chin"],
      ]),
      ...designShots("tzuyu-skincare", "Tzuyu Skincare", "identity", "logo", [
        ["logo-01", 1080, 1080, "Tzuyu logo, white mark and wordmark on black"],
      ]),
      ...designShots("tzuyu-skincare", "Tzuyu Skincare", "instagram", "greeting", [
        ["greeting-01", 882, 882, "Nyepi greeting with a Balinese temple"],
        ["greeting-02", 708, 708, "Ramadan Kareem greeting with Tzuyu products among gift boxes"],
        ["greeting-03", 962, 962, "Eid al-Fitr Mubarak greeting with a phone showing Tzuyu products"],
        ["greeting-04", 764, 764, "Ascension of Jesus Christ greeting, 9 May 2024"],
        ["greeting-05", 1080, 1080, "Waisak greeting post with a meditating silhouette, 23 May 2024"],
        ["greeting-06", 810, 1440, "Waisak greeting story with a meditating silhouette, 23 May 2024"],
        ["greeting-07", 773, 773, "Maulid Nabi Muhammad greeting with a crescent moon and Tzuyu creams"],
      ]),
      ...designShots("tzuyu-skincare", "Tzuyu Skincare", "shopee", "product", [
        ["product-01", 1024, 1024, "Tzuyu Skincare Shopee product image 01"],
        ["product-02", 1080, 1080, "Tzuyu Skincare Shopee product image 02"],
        ["product-03", 900, 900, "Tzuyu Skincare Shopee product image 03"],
        ["product-04", 1080, 1080, "Tzuyu Skincare Shopee product image 04"],
        ["product-05", 1024, 1024, "Tzuyu Skincare Shopee product image 05"],
        ["product-06", 1080, 1080, "Tzuyu Skincare Shopee product image 06"],
        ["product-07", 1024, 1024, "Tzuyu Skincare Shopee product image 07"],
        ["product-08", 900, 900, "Tzuyu Skincare Shopee product image 08"],
        ["product-09", 1080, 1080, "Tzuyu Skincare Shopee product image 09"],
        ["product-10", 1024, 1024, "Tzuyu Skincare Shopee product image 10"],
        ["product-11", 900, 900, "Tzuyu Skincare Shopee product image 11"],
        ["product-12", 1080, 1080, "Tzuyu Skincare Shopee product image 12"],
        ["product-13", 1024, 1024, "Tzuyu Skincare Shopee product image 13"],
        ["product-14", 1080, 1080, "Tzuyu Skincare Shopee product image 14"],
        ["product-15", 1080, 1080, "Tzuyu Skincare Shopee product image 15"],
        ["product-16", 1024, 1024, "Tzuyu Skincare Shopee product image 16"],
        ["product-17", 959, 1440, "Tzuyu Skincare Shopee product image 17"],
        ["product-18", 1080, 1080, "Tzuyu Skincare Shopee product image 18"],
        ["product-19", 1024, 1024, "Tzuyu Skincare Shopee product image 19"],
        ["product-20", 1440, 1440, "Tzuyu Skincare Shopee product image 20"],
        ["product-21", 1080, 1080, "Tzuyu Skincare Shopee product image 21"],
        ["product-22", 1024, 1024, "Tzuyu Skincare Shopee product image 22"],
        ["product-23", 1080, 1080, "Tzuyu Skincare Shopee product image 23"],
        ["product-24", 1080, 1080, "Tzuyu Skincare Shopee product image 24"],
        ["product-25", 1024, 1024, "Tzuyu Skincare Shopee product image 25"],
        ["product-26", 1080, 1080, "Tzuyu Skincare Shopee product image 26"],
        ["product-27", 1080, 1080, "Tzuyu Skincare Shopee product image 27"],
        ["product-28", 1024, 1024, "Tzuyu Skincare Shopee product image 28"],
        ["product-29", 1080, 1080, "Tzuyu Skincare Shopee product image 29"],
        ["product-30", 1080, 1080, "Tzuyu Skincare Shopee product image 30"],
        ["product-31", 1024, 1024, "Tzuyu Skincare Shopee product image 31"],
        ["product-32", 1080, 1080, "Tzuyu Skincare Shopee product image 32"],
        ["product-33", 1080, 1080, "Tzuyu Skincare Shopee product image 33"],
        ["product-34", 1024, 1024, "Tzuyu Skincare Shopee product image 34"],
        ["product-35", 1080, 1080, "Tzuyu Skincare Shopee product image 35"],
        ["product-36", 1080, 1080, "Tzuyu Skincare Shopee product image 36"],
        ["product-37", 1024, 1024, "Tzuyu Skincare Shopee product image 37"],
        ["product-38", 1080, 1080, "Tzuyu Skincare Shopee product image 38"],
        ["product-39", 1080, 1080, "Tzuyu Skincare Shopee product image 39"],
        ["product-40", 1024, 1024, "Tzuyu Skincare Shopee product image 40"],
        ["product-41", 1080, 1080, "Tzuyu Skincare Shopee product image 41"],
        ["product-42", 1080, 1080, "Tzuyu Skincare Shopee product image 42"],
        ["product-43", 1024, 1024, "Tzuyu Skincare Shopee product image 43"],
        ["product-44", 1080, 1080, "Tzuyu Skincare Shopee product image 44"],
        ["product-45", 1080, 1080, "Tzuyu Skincare Shopee product image 45"],
        ["product-46", 1080, 1080, "Tzuyu Skincare Shopee product image 46"],
        ["product-47", 1080, 1080, "Tzuyu Skincare Shopee product image 47"],
        ["product-48", 1080, 1080, "Tzuyu Skincare Shopee product image 48"],
        ["product-49", 1080, 1080, "Tzuyu Skincare Shopee product image 49"],
        ["product-50", 1080, 1080, "Tzuyu Skincare Shopee product image 50"],
        ["product-51", 1080, 1080, "Tzuyu Skincare Shopee product image 51"],
        ["product-52", 1080, 1080, "Tzuyu Skincare Shopee product image 52"],
        ["product-53", 1080, 1080, "Tzuyu Skincare Shopee product image 53"],
        ["product-54", 1080, 1080, "Tzuyu Skincare Shopee product image 54"],
        ["product-55", 1080, 1080, "Tzuyu Skincare Shopee product image 55"],
        ["product-56", 1080, 1080, "Tzuyu Skincare Shopee product image 56"],
        ["product-57", 1080, 1080, "Tzuyu Skincare Shopee product image 57"],
        ["product-58", 1080, 1080, "Tzuyu Skincare Shopee product image 58"],
        ["product-59", 1080, 1080, "Tzuyu Skincare Shopee product image 59"],
        ["product-60", 1080, 1080, "Tzuyu Skincare Shopee product image 60"],
        ["product-61", 1080, 1080, "Tzuyu Skincare Shopee product image 61"],
        ["product-62", 1080, 1080, "Tzuyu Skincare Shopee product image 62"],
        ["product-63", 1080, 1080, "Tzuyu Skincare Shopee product image 63"],
        ["product-64", 1038, 1038, "Tzuyu Skincare Shopee product image 64"],
        ["product-65", 1080, 1080, "Tzuyu Skincare Shopee product image 65"],
        ["product-66", 1080, 1080, "Tzuyu Skincare Shopee product image 66"],
        ["product-67", 1080, 1080, "Tzuyu Skincare Shopee product image 67"],
        ["product-68", 1080, 1080, "Tzuyu Skincare Shopee product image 68"],
        ["product-69", 1080, 1080, "Tzuyu Skincare Shopee product image 69"],
        ["product-70", 1080, 1080, "Tzuyu Skincare Shopee product image 70"],
        ["product-71", 1080, 1080, "Tzuyu Skincare Shopee product image 71"],
        ["product-72", 1080, 1080, "Tzuyu Skincare Shopee product image 72"],
      ]),
      ...designShots("tzuyu-skincare", "Tzuyu Skincare", "shopee", "bundle", [
        ["bundle-01", 1080, 1080, "Tzuyu Skincare Shopee bundle image 01"],
        ["bundle-02", 1080, 1080, "Tzuyu Skincare Shopee bundle image 02"],
        ["bundle-03", 1080, 1080, "Tzuyu Skincare Shopee bundle image 03"],
        ["bundle-04", 1080, 1080, "Tzuyu Skincare Shopee bundle image 04"],
        ["bundle-05", 1080, 1080, "Tzuyu Skincare Shopee bundle image 05"],
        ["bundle-06", 1080, 1080, "Tzuyu Skincare Shopee bundle image 06"],
        ["bundle-07", 1080, 1080, "Tzuyu Skincare Shopee bundle image 07"],
        ["bundle-08", 1080, 1080, "Tzuyu Skincare Shopee bundle image 08"],
        ["bundle-09", 1080, 1080, "Tzuyu Skincare Shopee bundle image 09"],
        ["bundle-10", 1080, 1080, "Tzuyu Skincare Shopee bundle image 10"],
        ["bundle-11", 1080, 1080, "Tzuyu Skincare Shopee bundle image 11"],
        ["bundle-12", 1080, 1080, "Tzuyu Skincare Shopee bundle image 12"],
        ["bundle-13", 1080, 1080, "Tzuyu Skincare Shopee bundle image 13"],
        ["bundle-14", 1080, 1080, "Tzuyu Skincare Shopee bundle image 14"],
        ["bundle-15", 1080, 1080, "Tzuyu Skincare Shopee bundle image 15"],
        ["bundle-16", 1080, 1080, "Tzuyu Skincare Shopee bundle image 16"],
        ["bundle-17", 1080, 1080, "Tzuyu Skincare Shopee bundle image 17"],
        ["bundle-18", 1080, 1080, "Tzuyu Skincare Shopee bundle image 18"],
        ["bundle-19", 1080, 1080, "Tzuyu Skincare Shopee bundle image 19"],
        ["bundle-20", 1080, 1080, "Tzuyu Skincare Shopee bundle image 20"],
        ["bundle-21", 1080, 1080, "Tzuyu Skincare Shopee bundle image 21"],
      ]),
    ],
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
  {
    slug: "starphone-semarang",
    // Palet dari feed Starphone: hitam hangat + kuning toko
    palette: { bg: "#0e0b05", fg: "#f4e9c8", mute: "#9b8d68", line: "rgba(244, 233, 200, 0.18)", accent: "#f0b020" },
    name: "Starphone Semarang",
    photo: [],
    video: [],
    design: [
      ...designShots("starphone-semarang", "Starphone Semarang", "instagram", "feed", [
      ["feed-01", 851, 851, "New iPhone 14 Pro Max announcement with large NEW lettering"],
      ["feed-02", 689, 689, "Lock screen refresh rate tips on a yellow background"],
      ["feed-03", 976, 976, "iOS 16.2 update post about the AirDrop Everyone setting"],
      ["feed-04", 694, 694, "Always On Display on iPhone 14 Pro and battery drain"],
      ["feed-05", 1080, 1080, "AirPods product post with floating earbuds"],
      ["feed-06", 614, 614, "Meme about mirror selfies with a cat and an iPhone"],
      ["feed-07", 1080, 1080, "Apple Watch price list post"],
      ["feed-08", 659, 659, "Meme about a mirror selfie with a cat in sunglasses"],
      ["feed-09", 903, 903, "Cashback promo post with up to 200 thousand rupiah back"],
      ["feed-10", 517, 517, "Which iPhone generation is your favorite, with a tech founder portrait"],
      ["feed-11", 1019, 1019, "Merry Christmas greeting with a snowy tree"],
      ["feed-12", 480, 480, "New and second iPhone 11 ready stock on black"],
      ["feed-13", 994, 994, "World Cup score prediction contest, Argentina versus France"],
      ["feed-14", 479, 479, "Yellow iPhone 14 and 14 Plus announcement"],
      ["feed-15", 1080, 1080, "iOS 17 update news post"],
      ["feed-16", 718, 718, "iPhone 14 series teaser on a dark background"],
      ["feed-17", 1080, 1080, "iPad mini 6 product post"],
      ["feed-18", 869, 869, "Is there an iPhone 16 teaser on yellow"],
      ["feed-19", 1030, 1030, "iPad price list with colorful iPads"],
      ["feed-20", 869, 869, "Meme about the iPhone 16 with a man holding a purple phone"],
      ["feed-21", 1080, 1080, "iPhone 14 Pro lineup with gold lettering"],
      ["feed-22", 813, 813, "Do you believe this, a man in a cap holding a phone"],
      ["feed-23", 1080, 1080, "iPhone XR post with huge XR lettering"],
      ["feed-24", 578, 578, "Isra Miraj greeting with a mosque silhouette"],
      ["feed-25", 984, 984, "Happy New Year 2023 greeting in gold"],
      ["feed-26", 643, 643, "Reasons to choose the iPhone 11"],
      ["feed-27", 1080, 1080, "Mock iPhone reminder alert post"],
      ["feed-28", 941, 941, "Meme about choosing between iPhone models with a surprised child"],
      ["feed-29", 612, 612, "How to care for an iPhone, tips post"],
      ["feed-30", 802, 802, "Why choose the iPhone 11, with colorful phones"],
      ["feed-31", 734, 734, "We are hiring a shopkeeper, job post"],
      ["feed-32", 439, 439, "Promo sale price list for iPhone 14 series and iPhone 11"],
      ["feed-33", 594, 594, "How to care for an iPhone, tips post in yellow"],
      ["feed-34", 595, 595, "Happy Valentine's Day post with a glowing heart"],
      ]),
      ...designShots("starphone-semarang", "Starphone Semarang", "instagram", "story", [
      ["story-01", 784, 1394, "Ready stock story for the iPhone 13 Pro Max series"],
      ["story-02", 512, 909, "Storefront story with a greeting message"],
      ["story-03", 516, 918, "Ready stock iPhone 11 series on a white desk"],
      ["story-04", 349, 620, "Merry Christmas story with a decorated tree"],
      ["story-05", 632, 1130, "Thank you 2022 story with a clock and champagne glasses"],
      ["story-06", 514, 914, "Happy New Year 2023 story with a clock"],
      ["story-07", 729, 1296, "Ready stock second-hand iPhone Plus story with a phone in hand"],
      ["story-08", 1080, 1920, "Ready stock iPhone 11 story with a hand and floating phones"],
      ["story-09", 359, 638, "Ready stock iPhone 11 Pro story, close-up of the camera"],
      ["story-10", 534, 948, "Ready stock story with a black camera lens close-up"],
      ["story-11", 376, 669, "New iPhone 14 story held in hands above clouds"],
      ["story-12", 648, 1151, "New iPhone 14 Pro story on a purple gradient"],
      ["story-13", 713, 1268, "Ready stock yellow iPhone 11 held in a hand"],
      ["story-14", 487, 865, "Ready stock iPhone 11 Pro Max on a wooden table"],
      ]),
    ],
  },
  pending("salwa-official", "Salwa Official"),
  pending("disdikbud-kalbar", "Dinas Pendidikan dan Kebudayaan Kalimantan Barat"),
  {
    slug: "cantik-clinic",
    // Palet dari promo Cantik: krem hangat, tinta cokelat, emas
    palette: { bg: "#efe4d3", fg: "#2a211b", mute: "#8a7660", line: "rgba(42, 33, 27, 0.2)", accent: "#b8963c" },
    name: "Cantik Clinic",
    photo: [],
    video: [],
    design: [
      // Produk dulu: karya pertama jadi cover brand
      ...designShots("cantik-clinic", "Cantik Clinic", "promo", "product", [
        ["product-01", 1010, 1010, "Whitening infusion and injection promo for Ramadan"],
        ["product-02", 764, 955, "Diamond infusion whitening package with savings of 2.1 million rupiah"],
        ["product-03", 994, 994, "Anti dark spot package promo for Ramadan"],
        ["product-04", 652, 816, "Korean artist whitening infusion package"],
        ["product-05", 1046, 1046, "Acne scar free package with platelet rich plasma"],
        ["product-06", 743, 929, "Platinum bright skin package with chromosome treatment"],
        ["product-07", 1015, 1015, "Glowing package promo for Ramadan"],
        ["product-08", 978, 978, "Ramadan promo with two facial packages"],
        ["product-09", 954, 954, "Quick acne scar package promo"],
        ["product-10", 959, 959, "Face and body goals package with hifu and RF"],
      ]),
      ...designShots("cantik-clinic", "Cantik Clinic", "promo", "banner", [
        ["banner-01", 1389, 781, "Bebas Jerawat acne treatment banner with package prices"],
        ["banner-02", 1248, 702, "Body fit and Bright slimming and whitening banner"],
        ["banner-03", 1157, 650, "Large pores and acne scar treatment banner with plasma packages"],
        ["banner-04", 1219, 686, "Dark spots treatment banner on a blue background"],
        ["banner-05", 1274, 716, "Romantic couple glowing facial banner"],
        ["banner-06", 1226, 690, "Hifu face and fat injection banner on pink"],
      ]),
    ],
  },
  {
    slug: "chamomile",
    // Palet dari promo Chamomile: cokelat tua, krem, hijau daun
    palette: { bg: "#2b1f18", fg: "#f1e9dc", mute: "#a39382", line: "rgba(241, 233, 220, 0.18)", accent: "#8fa65a" },
    name: "Chamomile",
    photo: [],
    video: [],
    design: designShots("chamomile", "Chamomile", "instagram", "feed", [
      ["feed-01", 746, 746, "Enjoy your me time at Chamomile Tea and Spa, woman with eyes closed"],
      ["feed-02", 752, 752, "Happy Hour weekday packages with prices"],
      ["feed-03", 870, 870, "Happy Hour packages with a woman covering her eyes"],
      ["feed-04", 871, 871, "Why manicure and pedicure matter, four benefits around a flower foot bath"],
      ["feed-05", 1020, 1020, "Manicure and pedicure package price list over a foot massage photo"],
      ["feed-06", 687, 687, "Why we need me time, woman holding a tea glass in a white robe"],
    ]),
  },
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

// Urutan tampil di halaman Design: platform, lalu format di dalamnya. Karya `design` harus punya `channel` dan `format` dari daftar ini.
export const DESIGN_CHANNELS = [
  { slug: "identity", title: "Identity", formats: ["logo"] },
  { slug: "instagram", title: "Instagram", formats: ["ads", "feed", "greeting", "highlight", "story"] },
  { slug: "shopee", title: "Shopee", formats: ["product", "bundle"] },
  { slug: "promo", title: "Promo", formats: ["banner", "product"] }, // materi promo yang tidak terikat satu platform
];

// Karya Design satu brand dikelompokkan per platform dan format; tiap karya membawa slug brand-nya (untuk Lightbox)
export const designGroups = (brand) =>
  DESIGN_CHANNELS.flatMap(({ slug: channel, formats }) =>
    formats
      .map((format) => ({
        channel,
        format,
        items: brand.design.filter((d) => d.channel === channel && d.format === format).map((d) => ({ ...d, brand: brand.slug })),
      }))
      .filter((g) => g.items.length)
  );

// Bab halaman Design: satu brand = satu bab berisi rel per format
export const designChapters = () => brands.filter((b) => b.design.length).map((brand) => ({ brand, groups: designGroups(brand) }));

// Contoh feed lintas brand (bergantian per brand), untuk HP di beranda dan pembuka halaman Design
export const designSamples = (count) => {
  const pools = designChapters().map(({ groups }) => groups.find((g) => g.format === "feed")?.items ?? []);
  const out = [];
  for (let i = 0; out.length < count && pools.some((p) => i < p.length); i++) {
    pools.forEach((p) => p[i] && out.length < count && out.push(p[i]));
  }
  return out;
};
