"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Camera, Folder, Layout, Lines, Play, Scissors } from "./Icon";
import { brands, education, journey, liveBrands } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

// Kunci tag di data/site.js -> ikon + label pendek
const TAGS = {
  feed: { label: "Feed", Icon: Layout },
  reels: { label: "Reels", Icon: Play },
  captions: { label: "Captions", Icon: Lines },
  shoot: { label: "Shoot", Icon: Camera },
  edit: { label: "Edit", Icon: Scissors },
  docs: { label: "Docs", Icon: Folder },
};

const brandExists = (slug) => liveBrands().some((b) => b.slug === slug);

function Period({ value }) {
  if (!value) return <p className="jr-period mono">Freelance</p>;
  return (
    <p className="jr-period mono">
      {value[0]} <span aria-hidden="true">—</span> {value[1]}
    </p>
  );
}

const brandName = (slug) => brands.find((b) => b.slug === slug)?.name;

function Company({ item }) {
  if (item.brands) {
    return (
      <span className="jr-company jr-clients">
        {item.brands.filter(brandExists).map((slug) => (
          <Link href={`/work/brand/${slug}/`} className="jr-link" data-cursor="Open" key={slug}>
            {brandName(slug)} <ArrowUpRight />
          </Link>
        ))}
      </span>
    );
  }
  if (!item.brand || !brandExists(item.brand)) return <span className="jr-company">{item.company}</span>;
  return (
    <Link href={`/work/brand/${item.brand}/`} className="jr-company jr-link" data-cursor="Open">
      {item.company} <ArrowUpRight />
    </Link>
  );
}

export default function Journey() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".jr-row", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
        clearProps: "opacity,transform", // biar efek redup saat hover (CSS) tidak tertimpa style inline
        scrollTrigger: { trigger: ".jr-list", start: "top 85%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section journey" id="journey" ref={root}>
      <div className="section-head mono">
        <span>(03) Journey</span>
        <span>2022 — 2026</span>
      </div>

      <div className="jr-grid">
        <h2 className="jr-title">
          The <em>road</em> so far.
        </h2>

        <ol className="jr-list">
          {journey.map((item) => (
            <li className="jr-row" key={item.company ?? item.role}>
              <Period value={item.period} />
              <div className="jr-main">
                <h3 className="jr-role">{item.role}</h3>
                <Company item={item} />
              </div>
              <ul className="jr-tags mono">
                {item.tags.map((key) => {
                  const { label, Icon } = TAGS[key];
                  return (
                    <li key={key}>
                      <Icon />
                      {label}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}

          <li className="jr-row jr-school">
            <Period value={education.period} />
            <div className="jr-main">
              <h3 className="jr-role">{education.field}</h3>
              <span className="jr-company">{education.school}</span>
            </div>
            <ul className="jr-tags mono">
              {education.badges.map((badge) => (
                <li key={badge}>{badge}</li>
              ))}
            </ul>
          </li>
        </ol>
      </div>
    </section>
  );
}
