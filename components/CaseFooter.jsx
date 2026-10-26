import Link from "next/link";
import Roll from "./Roll";
import { ArrowLeft, ArrowRight } from "./Icon";
import { site } from "@/data/site";

/** Kaki halaman karya: project berikutnya (berputar) dan jalan kembali ke Work. `slug` = disiplin halaman ini. */
export default function CaseFooter({ slug }) {
  const projects = site.works.filter((w) => w.slug && w.status !== "soon");
  const at = projects.findIndex((w) => w.slug === slug);
  const next = projects.length > 1 ? projects[(at + 1) % projects.length] : null;

  return (
    <footer className="case-foot">
      {next && (
        <Link href={`/work/${next.slug}/`} className="case-next" data-cursor="Next">
          <span className="case-next-label mono">Next project</span>
          <span className="case-next-title">
            {next.title} <ArrowRight />
          </span>
          <span className="case-next-meta mono">{next.kind} — {next.year}</span>
        </Link>
      )}
      <div className="case-foot-row mono">
        <Link href="/#work" className="case-back" data-cursor="Back">
          <ArrowLeft />
          <Roll>All work</Roll>
        </Link>
        <p>© {site.year} {site.name}</p>
      </div>
    </footer>
  );
}
