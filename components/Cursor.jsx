"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Kursor custom (hanya perangkat pointer halus). Elemen dengan data-cursor="Label" membesarkan kursor. */
export default function Cursor() {
  const root = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const xTo = gsap.quickTo(root.current, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(root.current, "y", { duration: 0.35, ease: "power3" });

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e) => {
      const target = e.target.closest?.("[data-cursor]");
      label.current.textContent = target?.dataset.cursor ?? "";
      root.current.classList.toggle("is-active", Boolean(target));
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <span ref={label} />
    </div>
  );
}
