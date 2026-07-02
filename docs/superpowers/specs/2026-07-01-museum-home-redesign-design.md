# A Museum You Can Live In — Site Redesign Design Spec

**Date:** 2026-07-01
**Pages touched:** index.html (rewrite), lab.html (full redesign), work.html (light pass), library.html (mobile-only pass), styles.css (new shared component)
**Pages untouched:** story.html, connect.html, support.html, Abundia.html, Music_1.html
**Audience for the site:** YC application reviewers, Google recruiters, and anyone Antonio sends the link to.

---

## 1. Concept

Antonio's brief: *"Interesting but original. A voice, but best design practices. An art museum, but cozy. Conceptual art, but in a home."*

The organizing idea: **the site is a house-museum.** Every museum convention gets a domestic, warm translation:

| Museum convention | Site translation |
|---|---|
| Curation (few works, given space) | Fewer, bigger, better-labeled pieces per page |
| Wall plaque next to each work | The `.plaque` component (§2) |
| Rooms | Pages: Entrance (index), Workshop (lab), Galleries (work), Reading Room (library), Study (story) |
| "Now Showing" exhibition | Pulso + Vocera above the fold on index |
| Guestbook | Warm contact close on index; "Draw With Me" wall in lab |
| Audio guide | Antonio's first-person voice in every plaque note |

The existing visual system (Newsreader serif, Instrument Sans, JetBrains Mono, linen/paper/bone/roble palette, film grain on Library) **does not change**. It is the house. We are rehanging the art.

---

## 2. The Plaque — new shared component (styles.css)

One reusable museum wall label, used on index (Now Showing, collection grid), lab (every experiment), and work (flagship + selected items).

Structure (semantic HTML):

```html
<div class="plaque">
  <p class="plaque-id">No. 03 — Gravity Sandbox, 2025</p>
  <p class="plaque-medium">HTML canvas · orbital mechanics</p>
  <p class="plaque-note">What I was chasing: whether restraint can feel infinite.</p>
</div>
```

Style rules:
- `.plaque-id`: `var(--mono)`, 11px, letter-spacing 1px, color `var(--ink)`; the "No. NN" and year in `var(--roble)`.
- `.plaque-medium`: `var(--mono)`, 10px, uppercase, letter-spacing 2px, color `var(--stone)`.
- `.plaque-note`: `var(--serif)` italic, 15px, color `var(--stone)`. Always first person, always one line.
- Optional left border 2px `var(--roble-border)` + 14px padding-left, like a label pinned to a wall.
- Plaques never contain links; the work itself is the link.

---

## 3. Room 1 — The Entrance (index.html rewrite)

New page order, top to bottom:

### 3.1 Hero
- Keep: interactive serif letters (mouse proximity + mobile tap wave), scroll indicator, layout skeleton, reduced-motion handling.
- Replace headline. Three copy options, implementer defaults to **Option A** unless Antonio picks otherwise:
  - **A.** `I build companies, apps & books —` / italic accent: `all under one roof.`
  - **B.** `Everything on display here` / italic accent: `shipped.` (sub: "Companies, apps, and books — handmade in Mexico City.")
  - **C.** `I turn questions I can't shake` / italic accent: `into things that ship.`
- Subtitle line replaces "BUILDER. ENTREPRENEUR. CURIOUS BY DEFAULT." with a mono room label: `ANTONIO MURRIETA · BUILDER · MEXICO CITY`.
- CTAs stay two buttons: `Now Showing ↓` (anchors to §3.2) and `Read My Story`.
- **Proof bar fix (mobile bug):** replace flex-wrap with `display: grid; grid-template-columns: repeat(4, auto)` on desktop and `repeat(2, 1fr)` at ≤600px with aligned rules (border logic per cell, no stagger). Numbers/labels unchanged: 16+ apps shipped, 2 AI products, 3 books published, 157 books read.

### 3.2 Now Showing (new section — the YC section)
- Section label: `NOW SHOWING`. Sub-note in Antonio's voice: one line, e.g. "The two companies I'm building right now."
- Two large exhibition cards side by side (stack on mobile), each: cover image (existing `assets/Work_Covers/Pulso.jpg`, `Vocera.jpg`), title in serif, plaque, and one **evidence line** inside the plaque note:
  - **Pulso** — `pulso-latam.com` — Synthetic market research for LATAM; evidence: *methods validated with Stanford and Colgate-Palmolive* (already claimed on work.html; reuse verbatim).
  - **Vocera** — `vocera.mx` — AI voice agent answering and working call lists in Mexican Spanish, 24/7.
- Default copy ships from existing work.html descriptions. Antonio may later replace evidence lines with harder numbers (users, pilots, revenue); the section works without them.

### 3.3 Exhibition roll (marquee, restyled)
- Keep the marquee mechanics (seamless loop, pause on hover, reduced-motion off).
- Thinner: padding 16px, font-size clamp(20px, 2.6vw, 30px).
- **Every item links to its real destination**: `work.html#<slug>` anchors (see §5.3) instead of bare `work.html`.

### 3.4 Permanent Collection (replaces "What I Build" cards + "Recent Work" grid)
- Delete the three generic feature cards ("Apps & Products" / "Exploring & Experimenting" / "Writing & Stories") entirely. Their content is implicit in the rest of the page.
- Keep the masonry `work-grid` but retitle section `THE PERMANENT COLLECTION` and change item hover overlays to plaque-style labels (mono title + year instead of the current category/title pair). Items link to `work.html#<slug>` anchors.

### 3.5 The Guestbook (new closing section)
- Small portrait, framed: reuse an existing photo from `assets/Story_Photos/` (default: `lck_1.webp`, the on-stage shot, cropped to Antonio; swap freely — this is the one asset decision Antonio may want to override with a proper portrait; add 8px paper-colored border + 1px bone outline + subtle shadow, like a hung frame). Alt text: "Antonio Murrieta".
- Two lines in Antonio's voice (draft, Antonio can edit): *"If something here made you curious, write to me. I answer everything that isn't spam."*
- Email shown as visible text (`create@antoniomurrieta.com`), plus links to GitHub / LinkedIn. This section is the contact moment; connect.html remains for the nav.

### 3.6 SEO
- Keep all existing meta/OG/JSON-LD; update `og:description`/`meta description` only if headline copy changes meaningfully. Add Pulso and Vocera to the Person JSON-LD `owns`/`brand` is NOT required — out of scope.

---

## 4. Room 2 — The Workshop (lab.html full redesign)

### 4.1 Curation: 9 experiments + 2 sections → 6 works
**Keep (with new plaque numbering):**
1. **Invisible Instrument** (lead work, No. 01, rendered large — full-width gallery wall). Links out to Music_1.html as today.
2. **Generative Typography** (No. 02) — retooled to cycle through *Antonio's own words*: 3–5 short lines from his books/site copy (e.g. "Everything here started as a question I couldn't shake."). Particles form the words in brand palette.
3. **Gravity Sandbox** (No. 03).
4. **Cellular Automata** (No. 04) — plaque note cross-sells: *"Grew up and moved out: shipped as PatternLab on the App Store."*
5. **Wave Generator** (No. 05).
6. **Draw With Me** (No. 06) — reframed as **The Guestbook Wall**: plaque invites visitors to leave a mark. Existing canvas mechanics stay.

**Cut entirely (markup + all supporting JS):** Particle Physics, Glitch Art, Fractal Explorer, Sound Visualizer, 3D Playground, and the standalone Pattern Generator section. Removing their code is a primary goal — lab.html is 240KB/5,690 lines and must shrink substantially.

### 4.2 Art direction — the palette law
Every canvas (preview and modal) may use **only** house colors:
- Backgrounds: `#111111` (ink) or `#F5F3EE` (paper).
- Marks/particles/strokes: bone `#E8E4DD`, paper `#F5F3EE`, stone `#6B6560`, roble `#8B7355`, roble-light `#A8916F`, ink `#111111`.
- Glow permitted only as roble at low alpha. **No cyan, magenta, green, rainbow HSL cycling anywhere.**

### 4.3 Layout
- Page header becomes a room plaque: mono eyebrow `ROOM 02 — THE WORKSHOP`, serif h1 `Where the pieces get made.`, one-line intro in Antonio's voice.
- Replace the uniform card grid with **gallery walls**: alternating full-width and two-up rows with generous whitespace (No. 01 full-width; 02+03 two-up; 04+05 two-up; 06 full-width — the guestbook wall closes the room). Each work: live canvas preview + plaque beneath.
- Interaction model unchanged: click opens the existing modal experience (controls, fullscreen canvas). Modals inherit the palette law.
- Mobile: single column, previews animate but pause offscreen (§7).

### 4.4 SEO/meta (currently missing)
- `<title>The Lab — Antonio Murrieta</title>`; real meta description; canonical `https://antoniomurrieta.com/lab.html`; OG + Twitter tags matching other pages.

---

## 5. Room 3 — The Galleries (work.html light pass)

5.1 Page header gets the room-plaque treatment (eyebrow `ROOM 01 — THE GALLERIES`); h1 "Things I've shipped." and intro paragraph stay (they're good).

5.2 Flagship items (Pulso, Vocera, AbundIA) and Selected items get plaques replacing the current bare category labels. Flagship plaque notes carry the evidence lines (same facts as §3.2; AbundIA: *on-device AI, zero data leaves the phone*).

5.3 Add `id` anchors to every flagship/selected item (`id="pulso"`, `id="vocera"`, `id="abundia"`, `id="kairos"`, `id="komercia"`, `id="tribu"`, `id="fitmental"`, `id="contrario"`, `id="el-peso-del-aire"`, `id="capi"`, `id="lck"`, `id="andres-noireau"`, `id="morph"`) with `scroll-margin-top: 120px` so index links land correctly below the fixed nav.

5.4 Nothing else changes: tiers, grid, copy, sign-off all stay.

---

## 6. Room 4 — The Reading Room (library.html, mobile ≤768px only)

**Hard constraint — do not regress (from memory + recent commits):** `?book=<slug>` deep links, Share button, `100dvh` modal, safe-area insets, blurred cover band, fine mobile grain. Desktop rendering must remain pixel-identical.

6.1 **Clean covers:** in the ≤768px media query, set `.book-hover-info { display: none; }` (remove the permanent gradient caption band). Covers stand alone; title/author live in the modal, which is one tap away.

6.2 **Compact filters:** collapse the filter block from 3+ stacked rows to two compact rows:
- Row 1: all pills (categories + divider dot + years) in a single `overflow-x: auto` no-wrap scroll row, scrollbar hidden (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`), with a right-edge fade gradient hinting scrollability.
- Row 2: full-width search input, height reduced to 38px.

6.3 Optional-but-included polish: year dividers gain 4px more top spacing to compensate for removed caption bands. No other mobile changes.

---

## 7. Cross-cutting requirements

- **Performance:** all lab canvases (previews and any index texture) pause via `IntersectionObserver` when offscreen and stop entirely under `prefers-reduced-motion`. Target: lab.html file size cut by ≥40% from code removal.
- **Accessibility:** experiments keep `role="button"`/`tabindex`; plaques are plain text (no ARIA needed); guestbook portrait has alt text; color contrast of plaque text on linen ≥ 4.5:1 (stone on linen passes at these sizes; verify).
- **No new dependencies, no build step.** Vanilla HTML/CSS/JS, same fonts.
- **Voice rule for all new copy:** first person, concrete, warm, a little wry. Never "passionate," "innovative," "crafting digital experiences."

## 8. Testing plan

1. `browse` screenshots of all four touched pages at 1280×800 and 375×812; visual pass against this spec.
2. Console: zero JS errors on every page.
3. Regression: `library.html?book=el-camino-de-yc` opens the modal on mobile viewport; Share button present; modal scrolls; filters filter; search searches.
4. Index: marquee/collection links land on the correct anchored project card on work.html.
5. Lab: each experiment opens, runs, closes; palette law verified by eye; reduced-motion disables animation.
6. `prefers-reduced-motion` spot-check on index hero and lab previews.

## 9. Non-goals

- No changes to story.html, connect.html, support.html, Abundia.html, Music_1.html.
- No dark mode, no CMS, no framework migration, no new analytics.
- No invented metrics: evidence lines use only claims already published on the site until Antonio supplies real numbers.
- Library desktop stays exactly as is.
