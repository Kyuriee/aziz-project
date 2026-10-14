"use client";

import SmoothScroll from "./SmoothScroll";
import Cursor from "./Cursor";
import Nav from "./Nav";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Works from "./Works";
import Reel from "./Reel";
import About from "./About";
import Journey from "./Journey";
import Contact from "./Contact";

export default function Experience() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Works />
        <Reel />
        <About />
        <Journey />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
