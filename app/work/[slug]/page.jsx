import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import DisciplinePage from "@/components/DisciplinePage";
import { brandsWith, categories, site } from "@/data/site";

// Halaman dibuat hanya untuk disiplin yang sudah punya karya: galeri sendiri (shots) atau brand yang memuatnya
const hasWork = (slug, c) => c.shots?.length || brandsWith(slug).length;
const live = Object.entries(categories).filter(([slug, c]) => hasWork(slug, c));

// Static export: semua halaman dibuat saat build
export const dynamicParams = false;

export function generateStaticParams() {
  return live.map(([slug]) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = categories[slug];
  if (!item || !hasWork(slug, item)) return {};
  return {
    title: `${item.title[0]} — ${site.name}`,
    description: item.brief,
  };
}

export default async function WorkPage({ params }) {
  const { slug } = await params;
  const item = categories[slug];
  if (!item || !hasWork(slug, item)) notFound();
  return item.shots?.length ? <CaseStudy slug={slug} data={item} /> : <DisciplinePage data={item} />;
}
