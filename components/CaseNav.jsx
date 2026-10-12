import Link from "next/link";
import Roll from "./Roll";
import { ArrowLeft } from "./Icon";
import { site } from "@/data/site";

/** Header halaman dalam (disiplin dan brand): logo, nama halaman, kembali ke Work. */
export default function CaseNav({ label }) {
  return (
    <header className="nav is-static mono">
      <Link href="/" className="nav-logo" data-cursor="Home">
        {site.name}
      </Link>
      <span className="nav-count">{label}</span>
      <div className="nav-right">
        <Link href="/#work" className="nav-back" data-cursor="Back">
          <ArrowLeft />
          <Roll>Work</Roll>
        </Link>
      </div>
    </header>
  );
}
