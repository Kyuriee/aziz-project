# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Existing: Next.js (static export), React, GSAP + ScrollTrigger, Lenis. New dependencies are allowed when they serve the work (owner confirmed).

## Users
Brands, agencies and recruiters in marketing / digital-creative who look at Aziz Zulhakim's work to decide whether to hire or commission him. Often on a phone, often with weak network.

## Product Purpose
Personal portfolio of Aziz Zulhakim, Digital Creative (Semarang), in three disciplines: Photo, Video, Design. The site is the proof of work; success is a visitor who remembers the images and reaches out.

## Positioning
Work is organised by brand: each brand has its own colour world and role in Aziz's career (Freelance, FitNation, Tzuyu Skincare, ...). Photo, Video and Design of one brand live on the same brand page.

## Operating Context
Photo page = gallery of every brand's photos (Tzuyu Skincare, Nez Coffeeneatery, HEIU, Bintang Zero, Freelance), filterable by brand via `?brand=`, columns toggle, lightbox. Photos are WebP in `public/work/<slug>/`; data lives in `data/site.js` (`photoGallery()`, `brands`).

## Capabilities and Constraints
Static export only (no server). Hero must open fast; weight is acceptable elsewhere. Mobile must stay smooth.

## Brand Commitments
Site name "Aziz Zulhakim". Black/white editorial base with per-brand colour palettes. Owner wants little text (icons and short labels) and nothing that feels like a template or uniform card grid.

## Evidence on Hand
38 real photos across 5 brands in `public/work/`. One Vimeo video (Nez). No testimonials or client quotes yet; do not invent.

## Product Principles
1. The photograph leads; interface recedes.
2. Brand colour is the navigation: moving through work should feel like moving through different worlds.
3. Fewer words, shorter labels, icons where possible.
4. Smooth on a mid-range phone before impressive on a laptop.
