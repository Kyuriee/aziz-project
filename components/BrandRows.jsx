import Link from "next/link";
import { ArrowUpRight } from "./Icon";
import { brandsWith, disciplinesOf } from "@/data/site";

/** Daftar brand yang punya karya di satu disiplin. Chip menghubungkan ke disiplin lain brand yang sama. */
export default function BrandRows({ discipline }) {
  const list = brandsWith(discipline);
  if (!list.length) return null;

  return (
    <ul className="brand-rows">
      {list.map((brand) => {
        const others = disciplinesOf(brand).filter((d) => d.slug !== discipline);
        const href = `/work/brand/${brand.slug}/`;
        return (
          <li className="brand-row reveal" key={brand.slug}>
            <Link href={href} className="brand-row-main" data-cursor="Open">
              <img className="brand-row-thumb" src={brand.cover.src} width={brand.cover.width} height={brand.cover.height} alt="" loading="lazy" decoding="async" />
              <span className="brand-row-name">{brand.name}</span>
              <ArrowUpRight />
            </Link>
            {brand.duration && <p className="brand-row-duration mono">{brand.duration}</p>}
            {others.length > 0 && (
              <ul className="brand-chips mono">
                {others.map((d) => (
                  <li key={d.slug}>
                    <Link href={`${href}#${d.slug}`}>{d.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
