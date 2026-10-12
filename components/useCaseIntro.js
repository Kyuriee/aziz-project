import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Animasi masuk halaman dalam: judul naik, foto hero muncul, lalu tiap `.reveal` muncul saat masuk layar. */
export default function useCaseIntro(root) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const has = (selector) => root.current.querySelector(selector);

    const ctx = gsap.context(() => {
      gsap.set(".case .line", { visibility: "visible" });
      if (reduced) return;

      const intro = gsap.timeline({ delay: 0.15 });
      if (has(".case .line")) {
        gsap.set(".case .line", { yPercent: 110 });
        intro.to(".case .line", { yPercent: 0, duration: 1.3, stagger: 0.12, ease: "expo.out" }, 0);
      }
      if (has(".case-hero-img")) {
        intro.fromTo(".case-hero-img", { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1.6, ease: "expo.out" }, 0);
      }
      if (has(".case-fade")) {
        intro.from(".case-fade", { opacity: 0, y: 16, duration: 0.9, stagger: 0.1, ease: "power3.out" }, 0.6);
      }

      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [root]);
}
