import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import { cases, site } from "@/data/site";

// Static export: semua halaman project dibuat saat build
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(cases).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = cases[slug];
  if (!item) return {};
  return {
    title: `${item.title.join(" ")} — ${site.name}`,
    description: item.brief,
  };
}

export default async function WorkPage({ params }) {
  const { slug } = await params;
  const item = cases[slug];
  if (!item) notFound();
  return <CaseStudy slug={slug} data={item} />;
}
