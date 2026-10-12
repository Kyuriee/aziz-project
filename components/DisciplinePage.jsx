"use client";

import { useRef } from "react";
import Link from "next/link";
import SmoothScroll from "./SmoothScroll";
import Cursor from "./Cursor";
import CaseNav from "./CaseNav";
import Gallery from "./Gallery";
import Roll from "./Roll";
import useCaseIntro from "./useCaseIntro";
import { ArrowLeft } from "./Icon";
import { site, videoGallery } from "@/data/site";

const gallery = videoGallery();

/** Halaman Video: semua video lintas brand, bisa difilter per brand. */
export default function DisciplinePage({ data }) {
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

          <Gallery items={gallery} kind="video" filterable sticky />
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
