import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import { categories, site } from "@/data/site";

// Halaman dibuat hanya untuk disiplin yang sudah punya foto/karya
const live = Object.entries(categories).filter(([, c]) => c.shots?.length);

// Static export: semua halaman dibuat saat build
export const dynamicParams = false;

export function generateStaticParams() {
  return live.map(([slug]) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = categories[slug];
  if (!item?.shots?.length) return {};
  return {
    title: `${item.title[0]} — ${site.name}`,
    description: item.brief,
  };
}

export default async function WorkPage({ params }) {
  const { slug } = await params;
  const item = categories[slug];
  if (!item?.shots?.length) notFound();
  return <CaseStudy slug={slug} data={item} />;
}
