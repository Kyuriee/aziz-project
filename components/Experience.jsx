"use client";

import { useState } from "react";
import SmoothScroll from "./SmoothScroll";
import Cursor from "./Cursor";
import Preloader from "./Preloader";
import Nav from "./Nav";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Works from "./Works";
import Reel from "./Reel";
import About from "./About";
import Contact from "./Contact";

export default function Experience() {
  const [ready, setReady] = useState(false);

  return (
    <SmoothScroll locked={!ready}>
      <Cursor />
      <Preloader onDone={() => setReady(true)} />
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Works />
        <Reel />
        <About />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
