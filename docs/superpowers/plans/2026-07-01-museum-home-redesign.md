# "A Museum You Can Live In" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the house-museum redesign per `docs/superpowers/specs/2026-07-01-museum-home-redesign-design.md`: index rewrite, lab full redesign, work light pass, library mobile declutter.

**Architecture:** Static site, vanilla HTML/CSS/JS, no build step. One new shared CSS component (`.plaque`) in `styles.css`; everything else is per-page inline `<style>`/markup edits, matching the existing pattern (each page carries its own page-specific CSS).

**Tech Stack:** HTML5, CSS custom properties (existing palette tokens), vanilla JS canvases, Google Fonts (unchanged), gstack `browse` for verification.

## Global Constraints

- Palette law (lab §4.2): canvas colors ONLY from `#111111`, `#F5F3EE`, `#E8E4DD`, `#6B6560`, `#8B7355`, `#A8916F`. No cyan/magenta/green/rainbow HSL cycling.
- Voice rule (§7): all new copy first-person, concrete, warm, a little wry. Banned words: "passionate", "innovative", "crafting digital experiences".
- Do-not-regress (§6): `?book=` deep links, Share button, `100dvh` modal, safe-area insets, blurred cover band, mobile grain. Library desktop pixel-identical.
- story.html, connect.html, support.html, Abundia.html, Music_1.html untouched.
- No new dependencies. Reduced-motion support preserved everywhere.
- Verification tool: `B="$HOME/.claude/skills/gstack/browse/dist/browse"` against `python3 -m http.server 8907` in repo root. Screenshots at 1280x800 and 375x812.

---

### Task 1: Plaque component + room-header shared styles

**Files:**
- Modify: `styles.css` (append after the `.section-label` block, ~line 281)

**Interfaces:**
- Produces: `.plaque`, `.plaque-id`, `.plaque-medium`, `.plaque-note`, `.room-eyebrow` class names consumed by Tasks 3, 4, 6, 9.

- [ ] **Step 1: Append component CSS to styles.css**

```css
/* === Museum Plaque === */
.plaque {
    border-left: 2px solid var(--roble-border);
    padding-left: 14px;
}

.plaque-id {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 1px;
    color: var(--ink);
}

.plaque-id .accent { color: var(--roble); }

.plaque-medium {
    font-family: var(--mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--stone);
    margin-top: 4px;
}

.plaque-note {
    font-family: var(--serif);
    font-style: italic;
    font-size: 15px;
    color: var(--stone);
    margin-top: 10px;
    line-height: 1.5;
}

/* === Room header (page-top plaque) === */
.room-eyebrow {
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--roble);
    margin-bottom: 20px;
}
```

- [ ] **Step 2: Verify no visual regression**

Run: `$B goto http://localhost:8907/index.html && $B console --errors`
Expected: no errors; page renders unchanged.

- [ ] **Step 3: Commit**

```bash
git add styles.css && git commit -m "feat: add museum plaque + room header shared components"
```

---

### Task 2: Index — hero copy + mobile proof bar fix

**Files:**
- Modify: `index.html` (hero markup ~lines 520-549; `.hero-proof` CSS ~lines 383-419 and 457-460)

**Interfaces:**
- Consumes: nothing new. Produces: hero anchor `#now-showing` target used by CTA.

- [ ] **Step 1: Replace hero headline, subtitle, CTAs**

Replace the `<h1 id="heroTitle">` spans and subtitle with (hero copy Option A per spec §3.1 — Antonio may override later):

```html
<h1 class="hero-title" id="heroTitle">
    <span class="hero-text" data-text="I build companies, apps &amp; books — ">I build companies, apps &amp; books — </span>
    <span class="hero-text hero-text-accent" data-text="all under one roof.">all under one roof.</span>
</h1>
<p class="hero-subtitle">Antonio Murrieta &middot; Builder &middot; Mexico City</p>
<div class="hero-cta">
    <a href="#now-showing" class="btn btn-primary">Now Showing &darr;</a>
    <a href="story.html" class="btn btn-secondary">Read My Story</a>
</div>
```

- [ ] **Step 2: Fix proof bar as aligned grid**

Replace `.hero-proof` flex CSS with:

```css
.hero-proof {
    display: grid;
    grid-template-columns: repeat(4, auto);
    justify-content: center;
    margin-top: 48px;
}
.hero-proof-item {
    padding: 0 26px;
    border-right: 1px solid var(--bone);
    text-align: center;
}
.hero-proof-item:last-child { border-right: none; }
@media (max-width: 600px) {
    .hero-proof { grid-template-columns: repeat(2, 1fr); row-gap: 24px; max-width: 340px; margin-left: auto; margin-right: auto; }
    .hero-proof-item { padding: 0 16px; }
    .hero-proof-item:nth-child(2) { border-right: none; }
    .hero-proof-num { font-size: 19px; }
}
```

(Keep existing `.hero-proof-num` / `.hero-proof-label` rules; delete the old 600px override block.)

- [ ] **Step 3: Verify**

Run browse: desktop + 375px screenshots of hero. Expected: headline reads new copy with italic roble accent on "all under one roof."; on mobile the four stats form an aligned 2×2 grid, rows separated, no stagger. `#now-showing` link no-ops for now (target added in Task 3).

- [ ] **Step 4: Commit**

```bash
git add index.html && git commit -m "feat(index): founder-forward hero copy + aligned mobile proof grid"
```

---

### Task 3: Index — Now Showing section

**Files:**
- Modify: `index.html` (insert new section between hero `</section>` and the marquee `<div class="marquee">`; add CSS to the inline `<style>`)

**Interfaces:**
- Consumes: `.plaque` family from Task 1. Produces: `id="now-showing"` anchor.

- [ ] **Step 1: Insert section markup**

```html
<!-- Now Showing -->
<section class="now-showing" id="now-showing">
    <div class="now-showing-container">
        <p class="section-label reveal">Now Showing</p>
        <p class="now-showing-note reveal">The two companies I'm building right now.</p>
        <div class="now-showing-grid reveal-stagger">
            <a href="https://pulso-latam.com" target="_blank" rel="noopener" class="show-card reveal">
                <div class="show-card-image" style="background-image: url('assets/Work_Covers/Pulso.jpg')"></div>
                <h3 class="show-card-title">Pulso</h3>
                <div class="plaque">
                    <p class="plaque-id">No. 01 <span class="accent">&mdash;</span> Pulso, 2026</p>
                    <p class="plaque-medium">Synthetic market research &middot; LATAM</p>
                    <p class="plaque-note">Simulate how thousands of Mexican consumers react to your concept &mdash; in hours, not weeks. Methods validated with Stanford and Colgate-Palmolive.</p>
                </div>
            </a>
            <a href="https://vocera.mx" target="_blank" rel="noopener" class="show-card reveal">
                <div class="show-card-image" style="background-image: url('assets/Work_Covers/Vocera.jpg')"></div>
                <h3 class="show-card-title">Vocera</h3>
                <div class="plaque">
                    <p class="plaque-id">No. 02 <span class="accent">&mdash;</span> Vocera, 2026</p>
                    <p class="plaque-medium">AI voice agents &middot; SaaS</p>
                    <p class="plaque-note">An AI voice agent that answers every call and works your lists in natural Mexican Spanish, 24/7 &mdash; every conversation transcribed.</p>
                </div>
            </a>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Add section CSS**

```css
.now-showing { padding: 100px 40px; background: var(--paper); }
.now-showing-container { max-width: var(--max-width); margin: 0 auto; }
.now-showing-note {
    font-family: var(--serif); font-style: italic; font-size: 18px;
    color: var(--stone); text-align: center; margin: -32px 0 56px;
}
.now-showing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; max-width: 1000px; margin: 0 auto; }
.show-card { text-decoration: none; color: inherit; display: block; transition: transform 0.3s var(--ease-snap); }
.show-card:hover { transform: translateY(-4px); }
.show-card-image {
    height: 300px; border-radius: 8px; background-size: cover; background-position: center;
    margin-bottom: 24px; box-shadow: 0 12px 32px rgba(17,17,17,0.10);
}
.show-card-title { font-family: var(--serif); font-size: 32px; font-weight: 400; letter-spacing: -0.5px; margin-bottom: 14px; }
@media (max-width: 768px) {
    .now-showing { padding: 60px 20px; }
    .now-showing-grid { grid-template-columns: 1fr; gap: 48px; }
    .show-card-image { height: 220px; }
}
```

- [ ] **Step 3: Verify**

Browse screenshots desktop + mobile. Expected: two exhibition cards under hero, plaques with left roble rule, hero CTA scrolls to this section.

- [ ] **Step 4: Commit**

```bash
git add index.html && git commit -m "feat(index): Now Showing section — Pulso & Vocera above the fold"
```

---

### Task 4: Index — exhibition roll, Permanent Collection, delete feature cards

**Files:**
- Modify: `index.html` (marquee block ~lines 560-589; features section ~lines 591-627 deleted; featured section ~lines 629-683 retitled/anchored)

- [ ] **Step 1: Restyle + relink marquee**

CSS: change `.marquee` padding to `16px 0`; `.marquee-item` font-size to `clamp(20px, 2.6vw, 30px)`. HTML: point each item at its anchor (both loop copies): Pulso→`work.html#pulso`, Vocera→`work.html#vocera`, AbundIA→`work.html#abundia`, Komercia→`work.html#komercia`, Tribu→`work.html#tribu`, FitMental→`work.html#fitmental`, Contrario→`work.html#contrario`, Kairos→`work.html#kairos`, El Peso del Aire→`work.html#el-peso-del-aire`, Capi y el Corazón→`work.html#capi`, LCK Experience→`work.html#lck`, Andrés Noireau→`work.html#andres-noireau`.

- [ ] **Step 2: Delete the features section entirely**

Remove `<section class="features" id="features">…</section>` and its CSS (`.features`, `.features::before`, `.features-container`, `.features-grid`, `.feature-card*`, `.feature-index`). Update the scroll-indicator JS target from `.features` to `.now-showing` (Task 3's section is now the scroll destination — move the marquee AFTER now-showing if needed so order is hero → now-showing → marquee → collection).

- [ ] **Step 3: Retitle featured section + anchor links + plaque-style overlays**

Section label becomes `The Permanent Collection`. Each `work-grid-item` href changes from `work.html` to its anchor (AbundIA→`#abundia`, Tribu→`#tribu`, Komercia→`#komercia`, Contrario→`#contrario`, LCK→`#lck`, Capi→`#capi`, El Peso del Aire→`#el-peso-del-aire`, Bounce Blitz→`work.html` [tier-3, no anchor: keep plain]). In `.work-grid-overlay`, change `.work-grid-category` text to mono year+medium form (e.g. `2025 · Finance & AI`).

- [ ] **Step 4: Verify + commit**

Browse: desktop/mobile screenshots; click a marquee item → lands on work.html anchored card (anchors exist after Task 6; acceptable interim: page top).

```bash
git add index.html && git commit -m "feat(index): exhibition roll links, Permanent Collection, drop generic feature cards"
```

---

### Task 5: Index — Guestbook close

**Files:**
- Modify: `index.html` (new section before `<footer>`; CSS in inline style)

- [ ] **Step 1: Markup**

```html
<!-- Guestbook -->
<section class="guestbook">
    <div class="guestbook-inner reveal">
        <img class="guestbook-portrait" src="assets/Story_Photos/lck_1.webp" alt="Antonio Murrieta">
        <div class="guestbook-text">
            <p class="guestbook-line">If something here made you curious, write to me.</p>
            <p class="guestbook-sub">I answer everything that isn't spam.</p>
            <a class="guestbook-email" href="mailto:create@antoniomurrieta.com">create@antoniomurrieta.com</a>
            <div class="guestbook-links">
                <a href="https://github.com/Antonio-MS-Coder" target="_blank" rel="noopener">GitHub</a>
                <a href="https://www.linkedin.com/in/antonio-murrieta" target="_blank" rel="noopener">LinkedIn</a>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: CSS**

```css
.guestbook { padding: 100px 40px 120px; background: var(--linen); }
.guestbook-inner { max-width: 720px; margin: 0 auto; display: flex; align-items: center; gap: 48px; }
.guestbook-portrait {
    width: 180px; height: 220px; object-fit: cover; flex-shrink: 0;
    border: 8px solid var(--paper); outline: 1px solid var(--bone);
    box-shadow: 0 16px 40px rgba(17,17,17,0.12); border-radius: 2px;
}
.guestbook-line { font-family: var(--serif); font-size: 28px; font-weight: 300; letter-spacing: -0.5px; line-height: 1.25; }
.guestbook-sub { font-family: var(--serif); font-style: italic; font-size: 17px; color: var(--stone); margin: 10px 0 24px; }
.guestbook-email { font-family: var(--mono); font-size: 15px; color: var(--roble); text-decoration: none; border-bottom: 1px solid var(--roble-border); }
.guestbook-email:hover { border-bottom-color: var(--roble); }
.guestbook-links { margin-top: 18px; display: flex; gap: 24px; }
.guestbook-links a { font-size: 13px; font-weight: 500; letter-spacing: 0.5px; color: var(--stone); text-decoration: none; text-transform: uppercase; }
.guestbook-links a:hover { color: var(--roble); }
@media (max-width: 768px) {
    .guestbook { padding: 60px 20px 80px; }
    .guestbook-inner { flex-direction: column; text-align: center; gap: 28px; }
    .guestbook-line { font-size: 24px; }
}
```

- [ ] **Step 3: Verify + commit**

Browse screenshots. Expected: framed portrait, serif invitation, visible email.

```bash
git add index.html && git commit -m "feat(index): guestbook close — portrait, voice, visible email"
```

---

### Task 6: Work — room header, anchors, plaques, evidence lines

**Files:**
- Modify: `work.html` (header ~line 479; flagship items ~503-534; selected items ~539-621; inline CSS)

- [ ] **Step 1: Room header + scroll margins**

Above `<h1>` insert `<p class="room-eyebrow">Room 01 — The Galleries</p>`. Add CSS: `.flagship-item, .selected-item { scroll-margin-top: 120px; }`.

- [ ] **Step 2: Anchors**

Add `id` attributes: flagship `pulso`, `vocera`, `abundia`; selected `kairos`, `komercia`, `andres-noireau`, `tribu`, `fitmental`, `contrario`, `morph`, `el-peso-del-aire`, `capi`, `100-prompts`, `lck`.

- [ ] **Step 3: Plaque-ify flagship meta**

For each flagship, replace `<p class="flagship-category">…</p>` with a plaque (keep title/desc). Example for Pulso; repeat pattern with correct numbering (Pulso No. 01 2026, Vocera No. 02 2026, AbundIA No. 03 2025):

```html
<div class="plaque">
    <p class="plaque-id">No. 01 <span class="accent">&mdash;</span> Pulso, 2026</p>
    <p class="plaque-medium">AI Market Intelligence &middot; Web SaaS</p>
</div>
```

Append an evidence line to each flagship description (serif italic, class `flagship-evidence`): Pulso — `Methods validated with Stanford and Colgate-Palmolive.` (already in desc — keep in desc, skip separate line); Vocera — `Live at vocera.mx — every conversation lands in the dashboard.`; AbundIA — `On-device Apple Intelligence: zero data leaves the phone.` CSS: `.flagship-evidence { font-family: var(--serif); font-style: italic; font-size: 15px; color: var(--roble); margin-top: 10px; }`

- [ ] **Step 4: Selected items get mini-plaque category line**

Change `.selected-category` styling to mono plaque-medium form (keep markup, restyle): `font-family: var(--mono); font-size: 10px; letter-spacing: 2px;` (already uppercase). No structural change.

- [ ] **Step 5: Verify + commit**

Browse: `goto http://localhost:8907/work.html#vocera` lands on Vocera card below nav. Screenshots both widths.

```bash
git add work.html && git commit -m "feat(work): room header, project anchors, plaques + evidence lines"
```

---

### Task 7: Lab — cull to six works

**Files:**
- Modify: `lab.html` (experiment cards ~832-910; modals from ~1055; all JS for cut experiments; Pattern Generator section ~986)

- [ ] **Step 1: Delete cut experiments**

Remove cards, modals, preview-init JS, and all functions for: **Particle Physics** (`particles*`), **Glitch Art** (`glitch*`), **Fractal Explorer** (`fractal*`), **Sound Visualizer** (`audio*`), **3D Playground**, **Pattern Generator** (standalone section). Keep: Invisible Instrument, Generative Typography, Gravity Sandbox, Cellular Automata, Wave Generator, Draw With Me. Grep each removed name after deletion to confirm zero references.

- [ ] **Step 2: Verify**

`$B goto http://localhost:8907/lab.html && $B console --errors` → zero errors; six works present; remaining experiments open/close. Record `wc -c lab.html` before/after (target ≥40% reduction combined with Task 8-9).

- [ ] **Step 3: Commit**

```bash
git add lab.html && git commit -m "refactor(lab): curate to six works, remove generic demos + dead code"
```

---

### Task 8: Lab — palette law

**Files:**
- Modify: `lab.html` (all remaining canvas draw code, previews + modals)

- [ ] **Step 1: Define shared palette constant near top of lab script**

```js
var HOUSE = {
    ink: '#111111', paper: '#F5F3EE', bone: '#E8E4DD',
    stone: '#6B6560', roble: '#8B7355', robleLight: '#A8916F',
    marks: ['#E8E4DD', '#A8916F', '#8B7355', '#6B6560', '#F5F3EE']
};
```

- [ ] **Step 2: Recolor every experiment**

For each remaining experiment (preview AND modal): background `#111118`/black → `HOUSE.ink` (or `HOUSE.paper` where a light canvas reads better — Draw With Me uses paper with ink strokes). Replace every `hsl(...)` rainbow/random-hue generation with `HOUSE.marks[i % HOUSE.marks.length]` or fixed roble/bone; glows → roble at low alpha (`rgba(139,115,85,0.35)`). Grep `hsl(` and hex colors after: only house values remain.

- [ ] **Step 3: Verify + commit**

Browse screenshots of lab previews + each opened modal. Expected: every canvas warm ink/paper/roble — zero neon.

```bash
git add lab.html && git commit -m "feat(lab): palette law — all canvases in house colors"
```

---

### Task 9: Lab — gallery walls, plaques, typography words, SEO

**Files:**
- Modify: `lab.html` (header, grid CSS, card markup, typography experiment word list, `<head>`)

- [ ] **Step 1: Room header**

```html
<div class="lab-header">
    <p class="room-eyebrow">Room 02 — The Workshop</p>
    <h1 class="lab-title">Where the pieces get made.</h1>
    <p class="lab-intro reveal">The one room in the museum where you're allowed to touch. Everything runs live, right here.</p>
</div>
```

CSS: `.lab-title { font-family: var(--serif); font-size: clamp(40px, 6vw, 64px); font-weight: 300; letter-spacing: -1.5px; margin-bottom: 16px; }`

- [ ] **Step 2: Gallery-wall layout**

Replace `.experiments-grid` auto-fit grid with explicit walls: No. 01 Invisible Instrument full-width (`.wall-full`), 02 Typography + 03 Gravity two-up (`.wall-pair`), 04 Automata + 05 Waves two-up, 06 Draw With Me full-width (existing DRAW WITH ME canvas section becomes the No. 06 wall). CSS:

```css
.walls { display: flex; flex-direction: column; gap: 96px; margin-bottom: 120px; }
.wall-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.wall-full .experiment-preview { height: 320px; }
@media (max-width: 768px) { .wall-pair { grid-template-columns: 1fr; gap: 64px; } .walls { gap: 64px; } }
```

Each work keeps its clickable card but the card chrome lightens: remove heavy border-radius/backdrop-filter; preview + plaque beneath. Plaques (use Task 1 component):
- No. 01 — Invisible Instrument, 2025 · `AI gesture tracking · Web audio` · note: *"Play music with your hands and face. No instrument, no training, no excuses."*
- No. 02 — Generative Typography, 2025 · `Canvas particles · My own words` · note: *"Letters that scatter and reform. The words are mine — from the books."*
- No. 03 — Gravity Sandbox, 2025 · `Orbital mechanics` · note: *"What I was chasing: whether restraint can feel infinite."*
- No. 04 — Cellular Automata, 2025 · `Conway's Life` · note: *"Grew up and moved out: shipped as PatternLab on the App Store."*
- No. 05 — Wave Generator, 2025 · `Sine fields` · note: *"Tides you can tune. I leave it running when I write."*
- No. 06 — The Guestbook Wall, 2026 · `Your hand, my canvas` · note: *"Draw something. Leave a mark on the museum."*

- [ ] **Step 3: Typography experiment renders Antonio's words**

Replace its word/phrase list with: `["Everything here started as a question.", "All under one roof.", "El peso del aire.", "Curious by default.", "Hecho en México."]`

- [ ] **Step 4: SEO head block**

```html
<title>The Lab — Antonio Murrieta</title>
<meta name="description" content="The workshop of Antonio Murrieta's house-museum: six live interactive experiments — gesture-tracked music, generative typography, gravity, cellular automata — all handmade, all touchable.">
<link rel="canonical" href="https://antoniomurrieta.com/lab.html">
<meta property="og:title" content="The Lab — Antonio Murrieta">
<meta property="og:description" content="Six live experiments you can touch. The room where the pieces get made.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://antoniomurrieta.com/lab.html">
<meta property="og:image" content="https://antoniomurrieta.com/assets/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
```

- [ ] **Step 5: Offscreen pause**

Add one `IntersectionObserver` that toggles a `data-paused` flag per preview canvas; each preview's rAF loop early-returns when paused. Reduced-motion: previews render one static frame.

- [ ] **Step 6: Verify + commit**

Browse: desktop/mobile screenshots, all six modals open/run/close, console clean, `wc -c lab.html` shows ≥40% total reduction vs original 239,568 bytes.

```bash
git add lab.html && git commit -m "feat(lab): gallery walls, plaques, house typography words, SEO, offscreen pause"
```

---

### Task 10: Library — mobile declutter

**Files:**
- Modify: `library.html` (≤768px media query ~lines 850-1103 only)

- [ ] **Step 1: Clean covers**

Inside the ≤768px block replace the `.book-hover-info { opacity: 1; … }` override with `.book-hover-info { display: none; }` and delete the mobile `.book-hover-title` / `.book-hover-author` size overrides.

- [ ] **Step 2: One-row scrollable filters**

In the ≤768px block, replace the `.filter-section`/`.filter-buttons` overrides with:

```css
.filter-section { padding: 12px; flex-direction: column; align-items: stretch; gap: 10px; margin-bottom: 24px; border-radius: 6px; }
.filter-buttons {
    display: flex; flex-wrap: nowrap; overflow-x: auto; justify-content: flex-start;
    gap: 6px; -webkit-overflow-scrolling: touch; scrollbar-width: none;
    mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 28px), transparent 100%);
    -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 28px), transparent 100%);
}
.filter-buttons::-webkit-scrollbar { display: none; }
.filter-btn { flex-shrink: 0; }
.search-input { padding: 8px 36px 8px 12px; }
```

Note: verify markup — if category pills and year pills are separate `.filter-buttons` containers, apply to both (two thin rows is acceptable per spec; the win is no wrapping).

- [ ] **Step 3: Year divider breathing room**

`.year-divider { padding: 20px 0 4px; }` in the mobile block.

- [ ] **Step 4: Regression verify + commit**

Browse at 375x812: covers clean (no caption bands); pills scroll horizontally with edge fade; `library.html?book=el-camino-de-yc` opens modal with Share button; modal scrolls; desktop (1280) screenshot diff vs pre-change — identical.

```bash
git add library.html && git commit -m "fix(library): mobile declutter — clean covers, scrollable filters"
```

---

### Task 11: Full regression pass

- [ ] **Step 1:** Browse: screenshots of index, work, lab, library at 1280x800 and 375x812; `console --errors` on each → zero errors.
- [ ] **Step 2:** Click-through: hero CTA → Now Showing; marquee item → anchored work card; lab modals; library filter + search + deep link.
- [ ] **Step 3:** Reduced-motion spot check (`emulate` via CDP or OS setting): hero letters static, lab previews static frame.
- [ ] **Step 4:** Fix anything found; commit fixes individually (`fix: …`).
- [ ] **Step 5:** Final commit if any docs updates needed.
