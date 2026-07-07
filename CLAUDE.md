# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static marketing website for Luis Weiss ("Soluciones y Servicios Integrales de la Construcción"), a construction/HVAC/solar-water-heater service business in Santa Fe, Argentina. Single-page site (`index.html`) with sections for services, completed projects, image/video galleries, and contact info. No build step, no framework, no package manager — plain HTML/CSS/JS served as-is.

## Architecture

- `index.html` — the entire page. All sections (hero, services, brands, projects, galleries, contact, footer) live in this one file with anchor-link navigation (`#servicios`, `#proyectos`, `#contacto`).
- `assets/css/estilo.css` — all styling (~1000 lines), including responsive rules and `:root` custom properties for the color palette.
- `assets/js/js.js` — vanilla JS, loaded via `<script defer>` at the end of `<head>`, so DOM-dependent code must run inside `DOMContentLoaded`. Handles:
  - Manual carousel/gallery logic (`showImage`, `nextImage`, `previousImage`, `addGallery`) driven by `galleryStates`, keyed by `data-gallery-id` on `.gallery-container` elements. Slide offset is a hardcoded `14.28%` (i.e. `100/7`) per step — tied to each gallery having 7 images; adding/removing slides requires updating this constant (or fixing it to be dynamic).
  - Click-to-play video swaps via `hacerClickeable(id, videoSrc)`: each trigger is a real `<button id="…-video" class="video-trigger">` wrapping a thumbnail `<img>`; on click, a `<video controls autoplay>` element (with its `<source>` pointing at `assets/videos/*.mp4`) is built via `document.createElement()` and swapped in with `replaceWith()`. Using a real `<button>` means Enter/Space already work natively — no custom keyboard handling needed.
- `assets/img/` — all images, grouped by usage: `servicios/`, `marcas/`, `proyectos/` (project cards, including the shared `video-thumbnail.png` reused by every video trigger), `galeria-monoambiente/` and `galeria-quincho/` (7 `fotoN.jpg` each, must stay in sync with the slide markup and `nav-dot` count in `index.html`), `footer/`.
- `assets/videos/` — video files referenced by the click-to-play triggers in `js.js`.
- `_backup/huerfanos/` — orphaned media files with no references anywhere in the site, kept here instead of deleted (recoverable). Not linked from any HTML/CSS/JS; excluded from crawling via `robots.txt`.
- `CNAME` — GitHub Pages custom domain: `luisweissservicios.casa`.
- `robots.txt` / `sitemap.xml` — crawler rules and the (single-URL) sitemap.

## Content Security Policy

`index.html` sets a strict CSP via meta tag:
```
default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' https://vjs.zencdn.net;
```
Any new external resource (script, font, image host, API call) must be added to this policy or it will be silently blocked by the browser. There is no `connect-src`/form endpoint allowance, so any future contact-form integration needs a CSP update too. The inline JSON-LD block in `<head>` and all `og:`/`twitter:` meta tags are passive metadata — they don't trigger requests from the document itself, so they didn't require CSP changes.

## Deployment

Static site hosted via GitHub Pages (repo `sandras2430/LuisWeiss`, remote `origin`), served at the custom domain in `CNAME`. There is no CI/build pipeline — pushing to `main` is the deploy mechanism. Test changes by opening `index.html` directly in a browser or serving the folder locally (e.g. `npx serve .`); there are no automated tests or linters configured.

**Case sensitivity:** this repo has `core.ignorecase = true` locally (Windows), but GitHub Pages serves from Linux (case-sensitive). Always use `git mv` for renames and double-check `git status` afterwards — this repo previously had duplicate index entries differing only by case (e.g. `Intert3.mp4` vs `intert3.mp4`) that had gone unnoticed.

## Conventions to preserve

- Spanish (es-AR) content throughout, including code comments and copy — keep new copy in the same voice.
- Asset filenames use lowercase kebab-case, no spaces/accents, to avoid case-sensitivity issues on GitHub Pages.
- Adding a gallery: duplicate the `.gallery-container[data-gallery-id]` block, its `nav-dot` set (as `<button>` elements, not `<div>`, for keyboard accessibility), and register/adjust the slide-count math in `js.js` (`galleryStates` + the `14.28` percentage) to match the new image count.
- Adding a click-to-play video: follow the existing pattern — a `<button class="video-trigger">` wrapping a thumbnail `<img alt="">`, registered via `hacerClickeable(id, videoSrc)` in `js.js` — rather than embedding `<video>` tags directly in `index.html`.
