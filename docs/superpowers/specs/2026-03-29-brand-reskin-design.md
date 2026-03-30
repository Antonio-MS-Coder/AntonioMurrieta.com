# Brand Re-skin: MurrietaLabs Alignment

**Date:** 2026-03-29
**Scope:** Color palette, typography, easing curves, and CSS architecture across AntonioMurrieta.com
**Approach:** Shared `styles.css` + per-page inline style updates. No layout/structural changes.

---

## Goal

Make AntonioMurrieta.com feel like a sibling to MurrietaLabs.com through shared typefaces, earth-tone palette, and consistent accent color — without changing page layouts or section structures.

## Architecture

Create a single `styles.css` at the project root containing all shared brand styles. Each HTML page links it via `<link rel="stylesheet" href="styles.css">` and retains a `<style>` block for page-specific styles only.

```
styles.css          ← Shared: palette, fonts, easing, reset, nav, footer, scroll-reveal, micro-interactions
index.html          ← <link href="styles.css"> + page-specific hero, features, featured work styles
work.html           ← <link href="styles.css"> + page-specific project grid, filters
library.html        ← Keeps self-contained dark theme. Only accent color + fonts updated inline.
lab.html            ← <link href="styles.css"> + page-specific experiments grid, canvas
story.html          ← <link href="styles.css"> + page-specific narrative, photos
connect.html        ← <link href="styles.css"> + page-specific form, dark section
support.html        ← <link href="styles.css"> + minimal page-specific styles
```

**Library exception:** Library keeps its own inline styles (dark editorial theme). We only update `--lib-accent` from `#B83A3A` to `#8B7355` and swap font families to Newsreader/Instrument Sans. If the font swap feels wrong, revert fonts only.

**Out of scope (this phase):** Abundia.html, Music_1.html — these get the brand refresh in a future pass.

---

## 1. Color Palette

Replace all current color variables with:

```css
:root {
  --ink: #111111;
  --carbon: #2A2A2A;
  --stone: #6B6560;
  --bone: #E8E4DD;
  --paper: #F5F3EE;
  --linen: #FAF8F5;
  --roble: #8B7355;
  --roble-light: #A8916F;
  --roble-dim: rgba(139, 115, 85, 0.08);
  --roble-border: rgba(139, 115, 85, 0.2);
}
```

**Mapping from old → new:**
| Old variable | Old value | New variable | New value |
|---|---|---|---|
| `--cardinal` | #8C1515 | `--roble` | #8B7355 |
| `--cardinal-light` | #B83A3A | `--roble-light` | #A8916F |
| `--dark` | #2E2D29 | `--ink` | #111111 |
| `--warm-gray` | #544948 | `--stone` | #6B6560 |
| `--light-gray` | #F4F4F4 | `--paper` | #F5F3EE |
| `--white` | #FFFFFF | `--linen` | #FAF8F5 |
| `--text-primary` | #2E2D29 | `--carbon` | #2A2A2A |
| `--text-secondary` | #544948 | `--stone` | #6B6560 |
| `--border-light` | #E5E5E5 | `--bone` | #E8E4DD |
| `--accent-blue` | #006CB8 | *(removed)* | — |
| `--accent-green` | #009B76 | *(removed)* | — |
| `--accent-orange` | #E98300 | *(removed)* | — |

Drop cardinal red, blue, green, and orange entirely. One accent color (Roble).

Any hardcoded hex values referencing the old palette (e.g., `#8C1515` inline, `rgba(140, 21, 21, ...)`) must also be found and replaced.

---

## 2. Typography

Replace Google Fonts import from Crimson Text + Inter to:

```
Newsreader: 300 (Light), 400 (Regular), 400 Italic
Instrument Sans: 400 (Regular), 500 (Medium), 600 (SemiBold)
JetBrains Mono: 400 (Regular)
```

CSS custom properties:

```css
:root {
  --serif: 'Newsreader', Georgia, serif;
  --sans: 'Instrument Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
}
```

**Type scale applied to existing elements (no layout changes):**

| Element | Font | Size | Weight | Details |
|---|---|---|---|---|
| H1 / hero titles | `--serif` | Keep current clamp values | 300 Light | letter-spacing -1px, line-height 1.1 |
| H2 / section titles | `--serif` | Keep current sizes | 400 Regular | letter-spacing -0.5px, line-height 1.2 |
| Body text | `--sans` | 15-16px | 400 | line-height 1.75 |
| Nav links | `--sans` | 13px | 400 | color: var(--stone), hover: var(--roble) |
| Buttons / CTAs | `--sans` | Keep current sizes | 500 Medium | — |
| Code / Lab text | `--mono` | 13-14px | 400 | — |

**Migration:** Replace `font-family: var(--serif)` or `'Crimson Text'` → `var(--serif)` (now Newsreader). Replace system font stack or `'Inter'` references → `var(--sans)` (now Instrument Sans).

---

## 3. Easing Curves

```css
:root {
  --ease-snap: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-reveal: cubic-bezier(0.61, 1, 0.88, 1);
  --ease-overlay: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-gentle: cubic-bezier(0.45, 0.05, 0.55, 0.95);
}
```

**Usage mapping:**
- Hover transitions (nav, links, buttons) → `--ease-snap`, 200ms
- Content fade-ins on scroll → `--ease-reveal`, 500ms
- Mobile menu overlay slide → `--ease-overlay`, 500ms
- Progress indicators, slow transitions → `--ease-gentle`

Replace all `transition: ... ease` / `ease-in-out` / `cubic-bezier(0.4, 0, 0.2, 1)` with the appropriate named curve.

---

## 4. CSS Reset & Base Styles

Add to `styles.css`:

```css
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--sans);
  color: var(--ink);
  background: var(--linen);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

::selection {
  background: var(--roble-dim);
  color: var(--ink);
}

:focus-visible {
  outline: 2px solid var(--roble);
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Each page that currently sets its own `body` styles and `*, *::before, *::after` resets can remove those — `styles.css` handles it.

---

## 5. Navigation Updates (Colors + Fonts Only)

**Keep:** Current layout, fixed positioning, hamburger toggle, mobile slide-in menu, scroll-shrink behavior.

**Change:**
- Background: `rgba(255,255,255,0.98)` → `rgba(250,248,245,0.98)` (linen-tinted)
- Logo: Keep "ANTONIO MURRIETA" text. Swap font to Instrument Sans. Change the `.` pseudo-element color from cardinal to `var(--roble)`.
- Nav links: Swap to Instrument Sans 13px. Color: `var(--stone)`. Hover: `var(--roble)`.
- Active link underline: cardinal → `var(--roble)`
- Mobile menu background: white → `var(--linen)`
- Drop the `box-shadow` on `.scrolled` state — replace with 1px `var(--bone)` bottom border (or remove entirely)
- All hover transitions: use `var(--ease-snap)`, 200ms

---

## 6. Footer Updates (Colors + Fonts Only)

**Keep:** Current layout and position (only on pages that currently have it: HOME, STORY, CONNECT, LIBRARY).

**Change:**
- Background: `var(--dark)` → `var(--ink)`
- Font: Swap to Instrument Sans
- Link colors: white → `var(--paper)`, opacity hover states → direct color transitions
- Social links hover: → `var(--roble-light)`
- Drop "Crafted with passion and code." — just copyright line
- Add "MurrietaLabs" text link above copyright (Instrument Sans 13px, `var(--stone)`, links to murrietalabs.com)

---

## 7. Scroll-Reveal System (Ready to Use)

Add to `styles.css` — pages can opt in by adding `.reveal` class to elements:

```css
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s var(--ease-reveal), transform 0.5s var(--ease-reveal);
}

.revealed {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

Plus a small JS snippet (can go in each page's existing `<script>` or a shared `main.js`):

```javascript
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
reveals.forEach(el => observer.observe(el));
```

This phase: include in `styles.css` but don't add `.reveal` classes to page elements yet — that's a future enhancement pass.

---

## 8. Per-Page Changes Summary

Each page gets: `<link rel="stylesheet" href="styles.css">`, updated Google Fonts import, removal of duplicated reset/palette/nav/footer CSS from inline `<style>`.

| Page | Specific changes |
|---|---|
| **index.html** | Swap hero gradient colors (cardinal→roble). Update feature cards border-top color. Update featured project hover colors. Remove gradient blobs or re-color them. |
| **work.html** | Swap filter button active/hover colors. Update project card hover/accent colors. Add footer (currently missing). |
| **library.html** | Update `--lib-accent` from `#B83A3A` to `#8B7355`. Swap font families to Newsreader/Instrument Sans. Keep all dark theme styling intact. |
| **lab.html** | Swap accent-orange and other accent colors → roble. Update experiment card border colors. Add footer (currently missing). |
| **story.html** | Swap any cardinal references. Update narrative serif to Newsreader. |
| **connect.html** | Swap accent colors. Re-style form inputs with new palette. Keep contact form. |
| **support.html** | Swap colors and fonts to match new palette. |

---

## 9. What's NOT Changing (This Phase)

- Page layouts and section structures
- Hero typing animation (stays as current centered layout)
- Features section (stays as 3 cards, not expandable words)
- Featured work section (stays as project cards with images)
- Story page spotlight effect (future phase)
- Lab dot grid background (future phase)
- Connect page dark-section conversion (future phase — keep current light layout, just re-color)
- Mobile responsive breakpoints
- JavaScript functionality
- Abundia.html, Music_1.html

---

## 10. Testing Checklist

After implementation, verify:
- [ ] All pages load `styles.css` correctly
- [ ] No remaining cardinal red (#8C1515) or old accent colors visible
- [ ] Newsreader and Instrument Sans load correctly (check network tab)
- [ ] Nav looks correct on all pages (desktop + mobile)
- [ ] Footer looks correct on pages that have it
- [ ] Library dark theme is intact with Roble accent
- [ ] Hover states use new colors across all pages
- [ ] Mobile menu works correctly
- [ ] No horizontal scroll issues
- [ ] Reduced motion media query works
- [ ] Selection highlight uses roble-dim
