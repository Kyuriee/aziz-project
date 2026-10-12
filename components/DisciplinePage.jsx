"use client";

import { useRef } from "react";
import Link from "next/link";
import SmoothScroll from "./SmoothScroll";
import Cursor from "./Cursor";
import CaseNav from "./CaseNav";
import BrandRows from "./BrandRows";
import Roll from "./Roll";
import useCaseIntro from "./useCaseIntro";
import { ArrowLeft } from "./Icon";
import { site } from "@/data/site";

/** Halaman disiplin tanpa galeri sendiri (mis. Video): daftar brand yang punya karya di disiplin ini. */
export default function DisciplinePage({ slug, data }) {
  const root = useRef(null);
  useCaseIntro(root);

  return (
    <SmoothScroll>
      <Cursor />
      <div className="case" ref={root}>
        <CaseNav label={data.title[0]} />

        <main>
          <section className="discipline-hero">
            <h1 className="case-title" aria-label={data.title.join(" ")}>
              <span className="mask">
                <span className="line case-line-1" aria-hidden="true">{data.title[0]}</span>
              </span>
              <span className="mask">
                <span className="line case-line-2" aria-hidden="true">{data.title[1]}</span>
              </span>
            </h1>
            <p className="case-brief case-fade">{data.brief}</p>
          </section>

          <BrandRows discipline={slug} />
        </main>

        <footer className="case-foot">
          <div className="case-foot-row mono">
            <Link href="/#work" className="case-back" data-cursor="Back">
              <ArrowLeft />
              <Roll>All work</Roll>
            </Link>
            <p>© {site.year} {site.name}</p>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
