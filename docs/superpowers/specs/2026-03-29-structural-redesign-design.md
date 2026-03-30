# Structural Redesign: Phase 2

**Date:** 2026-03-29
**Scope:** Hero interaction, features refinement, featured work masonry grid, nav progress bar, connect page simplification, lab dot grid, scroll-reveal activation
**Prerequisite:** Phase 1 brand re-skin (completed — styles.css, palette, typography)

---

## Goal

Transform AntonioMurrieta.com from a standard portfolio into a living studio — the personal workshop behind MurrietaLabs' polished gallery. Same design DNA (fonts, palette, easing), but distinct personality: curious explorer meets warm storyteller.

## Design Principles for This Phase

- **The studio, not the gallery.** More playful, less rigid, more interesting.
- **Same artist, different room.** Coherent with MurrietaLabs but never a replica.
- **Interactivity proves the craft.** The hero doesn't just say "art & technology" — it IS art & technology.
- **Less is more, when it's intentional.** Every animation has a reason.

---

## 1. Hero — Interactive Typography

**Current:** Centered hero with gradient shimmer text, parallax mouse effect, floating gradient blobs.

**New:** The headline letters are individually alive. Each character has subtle idle animation and responds to cursor proximity. The content IS the interaction.

### Layout
- Full viewport height (100vh / 100dvh), linen background
- Content centered (keep current centering — different from MurrietaLabs which is bottom-left)
- Remove floating gradient blobs (`.floating-gradient` elements and CSS)
- Remove parallax scroll effect on hero content
- Remove 3D perspective cursor effect on hero title
- Keep: subtitle, CTAs, scroll indicator

### Letter Wrapping
Each character of the headline gets wrapped in a `<span>` with `display: inline-block`. The headline text stays the same: "Building at the intersection of art & technology."

"art & technology" portion renders in `var(--roble)` color (replacing the gradient clip).

### Idle Animation
- Each letter has a tiny independent CSS animation:
  - Subtle rotation: between -0.5deg and +0.5deg
  - Slight vertical drift: between -1px and +1px
  - Each letter gets a random animation duration between 2s and 4s (set via inline `style` or CSS custom property `--idle-duration`)
  - Timing: `ease-in-out`, infinite, alternate
- The effect is barely perceptible — you notice the *feeling* of life, not the individual movements
- Use `will-change: transform` for GPU compositing

### Cursor Interaction (Desktop)
- JavaScript tracks cursor position over the hero section
- Letters within ~100px radius of cursor react:
  - Rotation snaps to 0deg, translateY snaps to 0 (letters "straighten up")
  - "art & technology" letters get `text-shadow: 0 0 20px rgba(139, 115, 85, 0.15)`
  - Transition: 60ms ease-out for snapping in, 400ms var(--ease-gentle) for settling back
- Implementation: on `mousemove`, calculate distance from cursor to each letter's center. If distance < 100px, add `.active` class. Remove when distance > 100px.
- Performance: use `requestAnimationFrame`, throttle to ~60fps. Only check letters visible in viewport.

### Mobile Behavior
- On load: letters animate in with staggered spring effect (each letter 20ms apart, slight overshoot via `cubic-bezier(0.34, 1.56, 0.64, 1)`)
- After settling: gentle idle drift (same as desktop idle)
- Touch interaction: tap anywhere on hero triggers a wave — letters momentarily straighten from tap point outward (radiating), then settle back
- No gyroscope dependency (too unreliable)

### Reduced Motion
- All letters static, no animation, full opacity
- No cursor interaction
- Clean static headline

### Remove
- `.floating-gradient` elements from HTML and CSS
- `shimmer` keyframe animation
- Hero title `perspective` / `rotateY` / `rotateX` JS
- Hero content parallax scroll JS
- Gradient `background-clip: text` on `.hero-title span`

---

## 2. Features Section — Refined Cards

**Current:** 3 cards with tech tag pills, gradient border-top on hover.

**New:** Same 3-card layout, elevated with editorial polish. No structural change.

### Changes
- Add section label above: `"01 — What I Build"` in Instrument Sans SemiBold 11px, uppercase, var(--roble), letter-spacing 3px, centered
- Card titles: change to Newsreader serif, 20px, weight 400, letter-spacing -0.3px
- Remove `.feature-meta` tech tags (the entire `<div class="feature-meta">` block with Swift/Python/React/etc. tags)
- Card background: var(--paper) instead of var(--linen)
- Keep: existing hover animation (Roble border-top slides in), card descriptions, layout
- Add `.reveal` class to each `.feature-card` for scroll animation

### Section Label HTML
```html
<p class="section-label">01 — What I Build</p>
```

### Section Label CSS (add to styles.css)
```css
.section-label {
    font-family: var(--sans);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--roble);
    text-align: center;
    margin-bottom: 48px;
}
```

---

## 3. Featured Work — Organic Masonry Grid

**Current:** 2 project cards with cover images, category labels, descriptions, in a 2-column grid.

**New:** An organic masonry grid of project covers — varied sizes, image-forward, visual portfolio wall. Uses existing cover images from `assets/Work_Covers/`.

### Layout
- Section label: `"02 — Recent Work"`
- Background: var(--paper) (subtle shift from var(--linen) to signal new chapter)
- CSS Grid with `grid-template-columns: repeat(4, 1fr)` and `grid-auto-rows: 100px`
- Items span different sizes:
  - Hero item: `grid-column: span 2; grid-row: span 2` (e.g., AbundIA)
  - Tall item: `grid-column: span 1; grid-row: span 2`
  - Standard item: `grid-column: span 1; grid-row: span 1`
  - Wide item: `grid-column: span 2; grid-row: span 1`
- Gap: 12px
- Border-radius: 8px on each item
- Max-width: 1000px, centered

### Each Grid Item
```html
<a href="work.html" class="work-grid-item work-grid-large reveal" style="background-image: url('assets/Work_Covers/Abundia.webp')">
    <div class="work-grid-overlay">
        <span class="work-grid-category">Finance & AI</span>
        <span class="work-grid-title">AbundIA</span>
    </div>
</a>
```

### Item Styling
- `background-size: cover; background-position: center;`
- Gradient overlay at bottom: `linear-gradient(180deg, transparent 50%, rgba(17, 17, 17, 0.6) 100%)`
- Category label: Instrument Sans 9px, SemiBold, uppercase, letter-spacing 2px, var(--roble-light)
- Title: Newsreader 18px (large items) or 14px (small items), var(--paper)
- Labels positioned at bottom-left with padding

### Hover
- `transform: scale(1.02)` with 300ms var(--ease-snap)
- `box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12)`
- Overlay opacity increases slightly

### Mobile (under 768px)
- Grid switches to `grid-template-columns: repeat(2, 1fr)`
- All items become uniform: `grid-column: span 1; grid-row: span 1`
- `grid-auto-rows: 140px`

### "See all projects" Link
Below the grid: `"See all projects →"` in Instrument Sans 14px, 500 weight, var(--roble).

### Projects to Include (curated selection, not all)
Use existing covers from `assets/Work_Covers/`. Select 6-8 projects that show range. The exact selection can be finalized during implementation based on available covers.

---

## 4. Navigation — Scroll Progress Bar

**Current:** Fixed nav with scroll-shrink and border-bottom on scroll. No progress indicator.

**New:** Add a 1px scroll progress bar at the very top of the viewport.

### Implementation
- A `<div class="scroll-progress">` as first child of `<body>` (not inside nav)
- CSS:
```css
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 1px;
    background: var(--roble);
    z-index: 1001;
    width: 0%;
    opacity: 0;
    transition: opacity 0.4s var(--ease-reveal);
}

.scroll-progress.visible {
    opacity: 1;
}
```
- JS: on scroll, set `width` to `(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100 + '%'`
- Visibility: starts at opacity 0. Use IntersectionObserver on the hero section — when hero exits viewport, add `.visible`. When hero re-enters, remove `.visible`.
- Only add to long pages: `index.html`, `story.html`, `work.html`
- Do NOT add to: `connect.html`, `support.html`, `lab.html` (short or already interactive)

---

## 5. Connect Page — Warm & Minimal

**Current:** Light background with contact methods, social icons, and a contact form.

**New:** Simplified layout with generous whitespace. Light background (coherent with site). Email + socials above the form. Everything centered.

### Layout (top to bottom)
1. Section label: `"Say Hello"` (same `.section-label` style)
2. Headline: `"Let's talk."` in Newsreader Light, clamp(28px, 5vw, 44px), var(--ink), centered
3. Intro paragraph: `"I'm always open to interesting conversations, collaborations, or just connecting with curious people."` in Instrument Sans 15px, var(--stone), max-width 440px, centered, line-height 1.7
4. Email link: `create@antoniomurrieta.com` in Instrument Sans 16px, 500 weight, var(--roble), underlined, text-underline-offset 4px. Hover: color var(--ink)
5. Social links: `"GitHub · LinkedIn · Instagram"` in Instrument Sans 13px, var(--stone). Hover: var(--roble)
6. Separator: 60px wide, 1px, var(--bone), centered, 48px margin above and below
7. Contact form: max-width 480px, centered
   - Labels: Instrument Sans 11px, SemiBold, uppercase, letter-spacing 2px, var(--stone)
   - Inputs: bottom-border only (1px var(--bone)), no side/top borders, transparent background
   - Input focus: border-color var(--roble)
   - Submit button: background var(--roble), color var(--linen), Instrument Sans 14px 500 weight, padding 12px 32px. Hover: background var(--roble-light)

### Remove
- Current contact method cards/icons
- Social icon buttons (replace with text links)
- Excess decorative elements

### Scroll-Reveal
Stagger: section label (0ms) → headline (100ms) → intro (200ms) → email (300ms) → socials (350ms) → separator (400ms) → form (500ms)

---

## 6. Lab — Ambient Dot Grid Background

**Current:** Linen background, experiment cards in a grid.

**New:** Add an ambient polyrhythmic dot grid behind the experiment cards.

### Dot Grid Implementation
- A `<div class="dot-grid">` positioned absolute, covering the lab section
- Contains a grid of small circles (3px diameter), var(--bone) color, spaced **16px apart** (denser than spec's 24px)
- Overall container opacity: **12-15%** (more visible than spec's 5-8%)

### Animation
- Each dot's opacity pulses between 0.2 and 0.8
- Use CSS `steps(1, end)` timing function for discrete stepping (not smooth fade — feels digital/engineered)
- Three animation duration classes:
  - `.dot-pulse-a`: 2800ms
  - `.dot-pulse-b`: 3200ms
  - `.dot-pulse-c`: 3600ms
- Dots are assigned classes in a rotating pattern (a, b, c, a, b, c...)
- Use `will-change: opacity` for GPU compositing

### Performance
- Only render animated dots on devices with 4+ CPU cores: `navigator.hardwareConcurrency > 4`
- Fallback: static grid (no animation) on less capable devices
- Wrap animation in `@media (prefers-reduced-motion: no-preference)`
- Reduced motion: show static grid

### Experiment Cards
- Add `backdrop-filter: blur(8px)` and `background: rgba(250, 248, 245, 0.85)` so cards float above the grid
- Add subtle border: `1px solid var(--bone)`

### Implementation Approach
Generate dots via JavaScript (CSS-only grid would be too many DOM elements). Create a canvas element or use a repeating SVG pattern with CSS animation on individual dots. The SVG approach is lighter:

```html
<div class="dot-grid" aria-hidden="true">
    <!-- Generated via JS: array of small circle elements with staggered animation classes -->
</div>
```

---

## 7. Scroll-Reveal Activation

**Current:** `.reveal` and `.revealed` CSS classes exist in styles.css. IntersectionObserver JS snippet defined but not added to pages. No elements have `.reveal` class.

**New:** Add `.reveal` classes to elements across all pages and include the observer JS.

### IntersectionObserver Script
Add to each page (except Library) in the existing `<script>` block:

```javascript
// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
reveals.forEach(el => revealObserver.observe(el));
```

### Stagger Support
For grouped elements (cards, grid items), use CSS `transition-delay` on nth-child:

```css
.reveal:nth-child(1) { transition-delay: 0ms; }
.reveal:nth-child(2) { transition-delay: 150ms; }
.reveal:nth-child(3) { transition-delay: 300ms; }
/* etc. */
```

Add a `.reveal-stagger` parent class that applies delays to children. Add to styles.css.

### Elements That Get `.reveal`

| Page | Elements |
|------|----------|
| **index.html** | Section labels, feature cards (staggered), masonry grid items (staggered 100ms), "See all projects" link |
| **work.html** | Work header, filter section, project cards (staggered) |
| **lab.html** | Lab header, experiment cards (staggered) |
| **story.html** | Narrative blocks, story photos, background sections |
| **connect.html** | All elements in sequence (see section 5 stagger spec) |
| **support.html** | Main content sections |

### What Does NOT Get `.reveal`
- Hero content (has its own interactive animation)
- Navigation (always visible)
- Footer (just appears)
- Library page (has its own aesthetic)

---

## 8. What's NOT Changing (This Phase)

- Library page (already done)
- Story page layout and content (already works)
- Work.html project grid and filters (just gets scroll-reveal)
- Support.html layout (just gets scroll-reveal)
- Footer (already updated in Phase 1)
- Mobile breakpoints (existing responsive rules stay)

---

## 9. Pages Affected

| Page | Changes |
|------|---------|
| **styles.css** | Add `.section-label`, `.scroll-progress`, `.work-grid-*`, `.dot-grid`, `.reveal-stagger` styles |
| **index.html** | Hero rewrite (interactive letters), features refinement, masonry grid, progress bar, scroll-reveal |
| **work.html** | Scroll progress bar, scroll-reveal on project cards |
| **lab.html** | Dot grid background, experiment card backdrop-filter, scroll-reveal |
| **connect.html** | Layout simplification, scroll-reveal |
| **story.html** | Scroll-reveal on sections |
| **support.html** | Scroll-reveal on sections |
