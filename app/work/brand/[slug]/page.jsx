import { notFound } from "next/navigation";
import BrandPage from "@/components/BrandPage";
import { brands, disciplinesOf, site } from "@/data/site";

// Static export: satu halaman per brand, dibuat saat build
export const dynamicParams = false;

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) return {};
  return {
    title: `${brand.name} — ${site.name}`,
    description: disciplinesOf(brand).map((d) => d.title).join(", "),
  };
}

export default async function BrandRoute({ params }) {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) notFound();
  return <BrandPage brand={brand} />;
}
