"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

const clean = (path) => path.replace(/\/+$/, "") || "/";

/**
 * Transisi antar halaman: tirai hitam naik menutup layar, halaman berganti di baliknya, lalu tirai terangkat.
 * Tanpa JS, reduced-motion, tab baru, atau link ke halaman yang sama (hash), link berjalan normal.
 */
export default function PageCurtain() {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef(null);
  const waiting = useRef(false); // true selama tirai menutup dan halaman baru belum tampil

  const lift = () => {
    if (!waiting.current) return;
    waiting.current = false;
    gsap.to(curtain.current, {
      yPercent: -100,
      duration: 0.9,
      delay: 0.15,
      ease: "expo.inOut",
      onComplete: () => gsap.set(curtain.current, { yPercent: 100, visibility: "hidden" }),
    });
  };

  // Halaman baru sudah tampil: angkat tirai
  useEffect(() => {
    lift();
  }, [pathname]);

  useEffect(() => {
    gsap.set(curtain.current, { yPercent: 100 });

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const link = event.target.closest?.("a[href]");
      if (!link || link.target || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (clean(url.pathname) === clean(window.location.pathname)) return; // halaman sama (hash): biarkan

      event.preventDefault();
      event.stopPropagation();
      if (waiting.current) return;
      waiting.current = true;

      gsap.set(curtain.current, { visibility: "visible" });
      gsap.to(curtain.current, {
        yPercent: 0,
        duration: 0.7,
        ease: "expo.inOut",
        onComplete: () => router.push(url.pathname + url.search + url.hash),
      });
      setTimeout(lift, 4000); // cadangan kalau navigasi gagal
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return <div className="curtain" ref={curtain} aria-hidden="true" />;
}
