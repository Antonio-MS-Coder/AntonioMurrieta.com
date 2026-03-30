# Brand Re-skin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the cardinal-red Stanford palette and Crimson Text typography with the MurrietaLabs earth-tone Roble palette and Newsreader/Instrument Sans typography across all main pages.

**Architecture:** Create a shared `styles.css` at project root containing palette, fonts, easing, CSS reset, nav, footer, scroll-reveal, and reduced-motion styles. Each page links it and retains only page-specific inline styles. Library keeps self-contained dark theme but swaps accent + fonts.

**Tech Stack:** Vanilla HTML5, CSS3, JavaScript (no build tools, no frameworks)

**Spec:** `docs/superpowers/specs/2026-03-29-brand-reskin-design.md`

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| **Create** | `styles.css` | Shared brand: palette, fonts, easing, reset, nav, footer, scroll-reveal, micro-interactions |
| **Modify** | `index.html` | Link styles.css, remove duplicated CSS, swap page-specific colors |
| **Modify** | `work.html` | Link styles.css, remove duplicated CSS, swap page-specific colors |
| **Modify** | `library.html` | Swap `--lib-accent` to Roble, swap fonts to Newsreader/Instrument Sans |
| **Modify** | `lab.html` | Link styles.css, remove duplicated CSS, swap page-specific colors |
| **Modify** | `story.html` | Link styles.css, remove duplicated CSS, swap page-specific colors |
| **Modify** | `connect.html` | Link styles.css, remove duplicated CSS, swap page-specific colors |
| **Modify** | `support.html` | Link styles.css, remove duplicated CSS, swap page-specific colors |

---

### Task 1: Create styles.css — Shared Foundation

**Files:**
- Create: `styles.css`

This file contains everything shared across pages: palette, typography, easing, CSS reset, nav (desktop + mobile), footer, scroll-reveal system, and reduced-motion override.

- [ ] **Step 1: Create `styles.css` with the complete shared foundation**

Create the file at project root with this content:

```css
/* ============================================
   AntonioMurrieta.com — Shared Brand Styles
   ============================================ */

/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,400&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono&display=swap');

/* === Palette === */
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

    /* Typography */
    --serif: 'Newsreader', Georgia, serif;
    --sans: 'Instrument Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    --mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;

    /* Easing */
    --ease-snap: cubic-bezier(0.25, 1, 0.5, 1);
    --ease-reveal: cubic-bezier(0.61, 1, 0.88, 1);
    --ease-overlay: cubic-bezier(0.22, 1, 0.36, 1);
    --ease-gentle: cubic-bezier(0.45, 0.05, 0.55, 0.95);

    /* Layout */
    --max-width: 1200px;
    --content-width: 680px;
}

/* === Reset === */
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
    line-height: 1.6;
    font-size: 16px;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

::selection {
    background: var(--roble-dim);
    color: var(--ink);
}

:focus-visible {
    outline: 2px solid var(--roble);
    outline-offset: 4px;
}

/* === Navigation === */
nav {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(250, 248, 245, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 1000;
    padding: 24px 40px;
    transition: all 0.3s var(--ease-snap);
}

nav.scrolled {
    padding: 16px 40px;
    border-bottom: 1px solid var(--bone);
}

.nav-container {
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-family: var(--sans);
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: var(--ink);
    text-decoration: none;
    transition: color 0.2s var(--ease-snap);
    position: relative;
    white-space: nowrap;
}

.logo::after {
    content: '.';
    color: var(--roble);
    font-weight: 700;
    position: absolute;
}

.logo:hover {
    color: var(--roble);
}

.nav-links {
    display: flex;
    gap: 32px;
    list-style: none;
}

.nav-links a {
    font-family: var(--sans);
    color: var(--stone);
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: color 0.2s var(--ease-snap);
    position: relative;
    text-transform: uppercase;
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--roble);
    transition: width 0.3s var(--ease-snap);
}

.nav-links a:hover {
    color: var(--roble);
}

.nav-links a:hover::after,
.nav-links a.active::after {
    width: 100%;
}

.nav-links a.active {
    color: var(--ink);
    font-weight: 600;
    border-bottom: 2px solid var(--roble);
    padding-bottom: 2px;
}

/* === Mobile Menu === */
.menu-toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
}

.menu-toggle span {
    width: 25px;
    height: 2px;
    background: var(--ink);
    transition: all 0.3s var(--ease-snap);
}

.menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.menu-toggle.active span:nth-child(2) {
    opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
}

/* === Footer === */
footer {
    padding: 60px 40px 40px;
    background: var(--ink);
    color: var(--paper);
    text-align: center;
}

.footer-content {
    max-width: var(--max-width);
    margin: 0 auto;
}

.footer-brand {
    font-family: var(--sans);
    font-size: 16px;
    font-weight: 500;
    color: var(--paper);
    margin-bottom: 12px;
}

.footer-studio {
    margin-bottom: 20px;
}

.footer-studio a {
    font-family: var(--sans);
    font-size: 13px;
    color: var(--stone);
    text-decoration: none;
    transition: color 0.2s var(--ease-snap);
}

.footer-studio a:hover {
    color: var(--roble-light);
}

.footer-links {
    display: flex;
    gap: 30px;
    justify-content: center;
    margin-bottom: 30px;
    flex-wrap: wrap;
}

.footer-links a {
    font-family: var(--sans);
    color: var(--stone);
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s var(--ease-snap);
}

.footer-links a:hover {
    color: var(--roble-light);
}

.footer-copyright {
    font-family: var(--sans);
    font-size: 13px;
    color: rgba(245, 243, 238, 0.25);
}

/* === Scroll Reveal === */
.reveal {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.5s var(--ease-reveal), transform 0.5s var(--ease-reveal);
}

.revealed {
    opacity: 1;
    transform: translateY(0);
}

/* === Reduced Motion === */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }

    .reveal {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
    }
}

/* === Mobile Responsive (shared) === */
@media (max-width: 768px) {
    nav {
        padding: 15px 20px;
    }

    .nav-links {
        position: fixed;
        top: 0;
        right: -100%;
        width: 100%;
        height: 100vh;
        background: var(--linen);
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 30px;
        transition: right 0.3s var(--ease-overlay);
        z-index: 1000;
    }

    .nav-links.active {
        right: 0;
    }

    .menu-toggle {
        display: flex;
        z-index: 1001;
    }
}
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `head -5 styles.css && echo "---" && wc -l styles.css`
Expected: First 5 lines show the comment header, line count around 260-280 lines.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: create shared styles.css with brand foundation

New palette (Roble earth tones), typography (Newsreader + Instrument Sans),
easing curves, CSS reset, nav, footer, scroll-reveal, and reduced-motion."
```

---

### Task 2: Update index.html

**Files:**
- Modify: `index.html`

Remove all duplicated CSS that now lives in styles.css (reset, `:root` variables, `::selection`, `@import` fonts, `body`, `html`, nav, footer, mobile menu, mobile nav responsive). Keep only page-specific styles (hero, features, featured projects, floating gradients, page-specific responsive). Swap all old color references to new variables.

- [ ] **Step 1: Add `<link>` to styles.css in `<head>`, before the `<style>` tag**

Add on line 15 (just before `<style>`):
```html
    <link rel="stylesheet" href="styles.css">
```

- [ ] **Step 2: Remove duplicated CSS from inline `<style>`**

Remove these sections from the `<style>` block (they now come from styles.css):
- The `* { margin: 0; padding: 0; box-sizing: border-box; }` reset (lines 16-20)
- The entire `:root { ... }` block with old variables (lines 22-37)
- The `::selection { ... }` block (lines 39-42)
- The `@import url(...)` Google Fonts line (line 44)
- The `body { ... }` block (lines 46-55)
- The `html { scroll-behavior: smooth; }` block (lines 57-59)
- The entire `nav { ... }` through `.nav-links a.active { ... }` (lines 62-151)
- The entire `footer { ... }` through `.footer-copyright { ... }` (lines 628-663)
- The entire `.menu-toggle { ... }` section (lines 697-724)
- The mobile `@media` rules for `nav`, `.nav-links`, `.menu-toggle` (lines 727-754)

- [ ] **Step 3: Update remaining page-specific styles to use new variables**

In the remaining `<style>` block, make these substitutions:

| Find | Replace with |
|------|-------------|
| `var(--cardinal)` | `var(--roble)` |
| `var(--cardinal-light)` | `var(--roble-light)` |
| `var(--dark)` | `var(--ink)` |
| `var(--warm-gray)` | `var(--stone)` |
| `var(--light-gray)` | `var(--paper)` |
| `var(--white)` | `var(--linen)` |
| `var(--text-primary)` | `var(--carbon)` |
| `var(--text-secondary)` | `var(--stone)` |
| `var(--border-light)` | `var(--bone)` |
| `rgba(140, 21, 21, 0.08)` | `var(--roble-dim)` |
| `rgba(140, 21, 21, 0.25)` | `rgba(139, 115, 85, 0.25)` |

Also update the floating gradient backgrounds:
- `.gradient-1`: `var(--cardinal)` → `var(--roble)`
- `.gradient-2`: `var(--accent-blue)` → `var(--roble-light)`

The hero gradient: `linear-gradient(180deg, var(--white) 0%, var(--light-gray) 100%)` → `linear-gradient(180deg, var(--linen) 0%, var(--paper) 100%)`

The hero title span gradient: `linear-gradient(135deg, var(--cardinal) 0%, var(--cardinal-light) 100%)` → `linear-gradient(135deg, var(--roble) 0%, var(--roble-light) 100%)`

The mobile menu `background: white` → remove (handled by styles.css `.nav-links` with `var(--linen)`)

- [ ] **Step 4: Update footer HTML markup**

Replace the current footer HTML with:
```html
<footer>
    <div class="footer-content">
        <p class="footer-brand">Antonio Murrieta</p>
        <div class="footer-studio">
            <a href="https://murrietalabs.com" target="_blank">MurrietaLabs</a>
        </div>
        <div class="footer-links">
            <a href="https://github.com/Antonio-MS-Coder" target="_blank">GitHub</a>
            <a href="https://www.linkedin.com/in/antonio-murrieta" target="_blank">LinkedIn</a>
            <a href="https://instagram.com/tono_cams" target="_blank">Instagram</a>
            <a href="mailto:carlosantonio.murrieta@gmail.com,create@antoniomurrieta.com">Email</a>
        </div>
        <p class="footer-copyright">
            &copy; 2026 Antonio Murrieta
        </p>
    </div>
</footer>
```

- [ ] **Step 5: Verify in browser**

Open `index.html` in browser. Check:
- Nav shows linen-tinted background, Roble dot after logo, stone-colored links
- Hero gradient uses Roble tones instead of cardinal red
- Feature card hover border is Roble
- Feature meta tags on hover use roble-dim background
- Featured project category text is Roble
- Footer is dark with Roble-light hover on links, MurrietaLabs link present, no tagline
- Mobile menu works (resize to <768px)

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "refactor: update index.html to use shared styles.css

Swap cardinal palette to Roble, Crimson Text to Newsreader/Instrument Sans.
Remove duplicated nav/footer/reset CSS. Update footer with MurrietaLabs link."
```

---

### Task 3: Update work.html

**Files:**
- Modify: `work.html`

Same pattern: add link to styles.css, remove duplicated CSS, swap color references.

- [ ] **Step 1: Add `<link rel="stylesheet" href="styles.css">` before `<style>`**

- [ ] **Step 2: Remove duplicated CSS from inline `<style>`**

Remove: reset, `:root`, `::selection`, `@import` fonts, `body`, `html`, nav, mobile menu, mobile nav responsive rules — same sections as index.html.

- [ ] **Step 3: Swap all old color variable references to new ones**

Same mapping as index.html Task 2 Step 3. Also search for any hardcoded hex values:
- `#8C1515` → `var(--roble)` or `#8B7355`
- `rgba(140, 21, 21, ...)` → equivalent roble rgba

Key page-specific swaps:
- Filter button active/hover: cardinal → roble
- Project card accent colors: cardinal → roble
- Any ripple effect colors: cardinal → roble

- [ ] **Step 4: Add footer (currently missing)**

Add before the closing `<script>` tag:
```html
<footer>
    <div class="footer-content">
        <p class="footer-brand">Antonio Murrieta</p>
        <div class="footer-studio">
            <a href="https://murrietalabs.com" target="_blank">MurrietaLabs</a>
        </div>
        <div class="footer-links">
            <a href="https://github.com/Antonio-MS-Coder" target="_blank">GitHub</a>
            <a href="https://www.linkedin.com/in/antonio-murrieta" target="_blank">LinkedIn</a>
            <a href="https://instagram.com/tono_cams" target="_blank">Instagram</a>
            <a href="mailto:carlosantonio.murrieta@gmail.com,create@antoniomurrieta.com">Email</a>
        </div>
        <p class="footer-copyright">
            &copy; 2026 Antonio Murrieta
        </p>
    </div>
</footer>
```

- [ ] **Step 5: Verify in browser**

Open `work.html`. Check:
- Nav correct with new colors
- Filter buttons use Roble for active/hover states
- Project cards use Roble accents
- Footer present at bottom
- Mobile responsive works

- [ ] **Step 6: Commit**

```bash
git add work.html
git commit -m "refactor: update work.html to use shared styles.css

Swap palette, add footer, remove duplicated CSS."
```

---

### Task 4: Update lab.html

**Files:**
- Modify: `lab.html`

This is the largest page (3614 lines). Same pattern but also needs to replace `--accent-orange` references.

- [ ] **Step 1: Add `<link rel="stylesheet" href="styles.css">` before `<style>`**

- [ ] **Step 2: Remove duplicated CSS from inline `<style>`**

Same sections as before. Also remove `--accent-orange: #E98300` from `:root`.

- [ ] **Step 3: Swap all old color variable references to new ones**

Same mapping. Additional lab-specific swaps:
- `var(--accent-orange)` → `var(--roble)`
- `var(--accent-blue)` → `var(--roble)`
- `var(--accent-green)` → `var(--roble)`
- Any hardcoded `#E98300` → `#8B7355`
- Any hardcoded `#006CB8` → `#8B7355`
- Any hardcoded `#009B76` → `#8B7355`
- Any rgba variants of these colors → roble equivalents

Experiment card border gradients: `linear-gradient(90deg, var(--cardinal), var(--cardinal-light))` → `linear-gradient(90deg, var(--roble), var(--roble-light))`

- [ ] **Step 4: Add footer (currently missing)**

Same footer HTML as Task 2 Step 4, placed before the `<script>` block.

- [ ] **Step 5: Verify in browser**

Open `lab.html`. Check:
- All experiment cards use Roble accents
- No orange, blue, or green accent colors remaining
- Canvas/visualization sections still function
- Footer present
- Mobile responsive works

- [ ] **Step 6: Commit**

```bash
git add lab.html
git commit -m "refactor: update lab.html to use shared styles.css

Swap cardinal/blue/green/orange accents to Roble, add footer, remove duplicated CSS."
```

---

### Task 5: Update story.html

**Files:**
- Modify: `story.html`

- [ ] **Step 1: Add `<link rel="stylesheet" href="styles.css">` before `<style>`**

- [ ] **Step 2: Remove duplicated CSS from inline `<style>`**

Same sections. Note: story.html also defines `--content-width: 680px` in `:root` — this is now in styles.css so it can be removed.

- [ ] **Step 3: Swap all old color variable references to new ones**

Same mapping. Story-specific:
- Narrative text uses `var(--serif)` — no change needed (variable name stays, value changed in styles.css)
- Any section break lines: `var(--cardinal)` → `var(--roble)`
- Photo slideshow accent colors

- [ ] **Step 4: Update footer HTML to new format**

Replace existing footer with the new footer HTML (same as Task 2 Step 4).

- [ ] **Step 5: Verify in browser**

Open `story.html`. Check:
- Narrative serif text renders in Newsreader
- No cardinal red anywhere
- Photos/slideshow still work
- Footer updated

- [ ] **Step 6: Commit**

```bash
git add story.html
git commit -m "refactor: update story.html to use shared styles.css

Swap palette, update footer, remove duplicated CSS."
```

---

### Task 6: Update connect.html

**Files:**
- Modify: `connect.html`

Note: connect.html uses a `<link>` tag for Google Fonts instead of `@import`. This needs to be removed since styles.css now handles fonts.

- [ ] **Step 1: Remove the old Google Fonts `<link>` tag from `<head>`**

Remove: `<link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">`

Add: `<link rel="stylesheet" href="styles.css">`

- [ ] **Step 2: Remove duplicated CSS from inline `<style>`**

Same sections as before.

- [ ] **Step 3: Swap all old color variable references to new ones**

Same mapping. Connect-specific:
- Form input focus border: cardinal → roble
- Submit button: cardinal background → roble background
- Contact method accent colors
- Social link hover colors

- [ ] **Step 4: Update footer HTML to new format**

Replace existing footer with the new footer HTML (same as Task 2 Step 4).

- [ ] **Step 5: Verify in browser**

Open `connect.html`. Check:
- Contact form uses Roble accents for focus/submit
- Social links use new colors
- No cardinal red anywhere
- Footer updated
- Form submission still works

- [ ] **Step 6: Commit**

```bash
git add connect.html
git commit -m "refactor: update connect.html to use shared styles.css

Swap palette, update footer, remove duplicated CSS."
```

---

### Task 7: Update support.html

**Files:**
- Modify: `support.html`

Note: support.html also uses a `<link>` tag for Google Fonts.

- [ ] **Step 1: Remove old Google Fonts `<link>`, add styles.css `<link>`**

- [ ] **Step 2: Remove duplicated CSS from inline `<style>`**

Same sections.

- [ ] **Step 3: Swap all old color variable references to new ones**

Same mapping.

- [ ] **Step 4: Verify in browser**

Open `support.html`. Check:
- Page renders with new palette and fonts
- Nav correct
- No cardinal red

- [ ] **Step 5: Commit**

```bash
git add support.html
git commit -m "refactor: update support.html to use shared styles.css

Swap palette, remove duplicated CSS."
```

---

### Task 8: Update library.html — Light Touch

**Files:**
- Modify: `library.html`

Library keeps its own self-contained dark theme. We only change: (1) accent color from cardinal to Roble, (2) font families to Newsreader/Instrument Sans. Library does NOT link styles.css — it stays self-contained to preserve its dark editorial aesthetic.

- [ ] **Step 1: Update the Google Fonts import**

Replace: `@import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap');`

With: `@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,400&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono&display=swap');`

- [ ] **Step 2: Update `:root` CSS variables**

In the `:root` block:
- Change `--lib-accent: #B83A3A;` → `--lib-accent: #8B7355;`
- Change `--serif: 'Crimson Text', Georgia, serif;` → `--serif: 'Newsreader', Georgia, serif;`
- Change `--sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;` → `--sans: 'Instrument Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;`
- Change `--cardinal: #8C1515;` → `--cardinal: #8B7355;` (keep variable name for internal consistency within library, just change the value)
- Change `--cardinal-light: #B83A3A;` → `--cardinal-light: #A8916F;`

- [ ] **Step 3: Update nav to match new brand**

In the library's nav CSS:
- Logo `::after` color: update from cardinal to the new `--cardinal` value (now Roble via step 2)
- Nav link hover colors: already use `var(--cardinal)` which is now Roble
- Verify mobile menu colors are correct

- [ ] **Step 4: Update `::selection` color**

The `::selection` block uses `var(--lib-accent)` — this is now Roble via step 2, so no change needed.

- [ ] **Step 5: Search for any remaining hardcoded cardinal hex values**

Search library.html for `#8C1515`, `#B83A3A`, `rgba(140, 21, 21`, `rgba(184, 58, 58` and replace:
- `#8C1515` → `#8B7355`
- `#B83A3A` → `#A8916F`
- `rgba(140, 21, 21, ...)` → `rgba(139, 115, 85, ...)`
- `rgba(184, 58, 58, ...)` → `rgba(168, 145, 111, ...)`

- [ ] **Step 6: Verify in browser**

Open `library.html`. Check:
- Dark theme intact (background, grain, surfaces)
- Accent color is now Roble (warm oak) instead of cardinal red
- Book card hover effects still work
- Modal still works
- Filters work
- Text renders in Newsreader/Instrument Sans
- The overall feel is still editorial and dark — fonts don't clash

- [ ] **Step 7: Commit**

```bash
git add library.html
git commit -m "refactor: update library.html accent color to Roble and fonts to Newsreader/Instrument Sans

Light-touch brand alignment. Dark editorial theme preserved."
```

---

### Task 9: Final Sweep — Verify No Old Colors Remain

**Files:**
- All modified HTML files

- [ ] **Step 1: Search for remaining old color values**

Run grep commands across all HTML files (excluding Abundia.html and Music_1.html) for:
- `#8C1515`, `#B83A3A`, `#006CB8`, `#009B76`, `#E98300`
- `rgba(140, 21, 21`, `rgba(184, 58, 58`, `rgba(0, 108, 184`, `rgba(0, 155, 118`
- `Crimson Text`
- `var(--cardinal)` in non-library files
- `var(--accent-blue)`, `var(--accent-green)`, `var(--accent-orange)` in all files

Expected: No matches for old colors in non-library files. Library may still have `var(--cardinal)` (which now points to Roble). No `Crimson Text` anywhere.

- [ ] **Step 2: Fix any remaining references found in step 1**

If any old color references are found, update them to the new palette equivalents.

- [ ] **Step 3: Open each page in browser and spot-check**

Quick visual pass on each page:
- `index.html` — hero, features, featured work, footer
- `work.html` — filters, project cards, footer
- `library.html` — dark theme with Roble accent
- `lab.html` — experiment cards, footer
- `story.html` — narrative text, photos, footer
- `connect.html` — form, social links, footer
- `support.html` — content, nav

Confirm: no cardinal red visible anywhere, fonts feel consistent, no layout breakage.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: clean up remaining old color references across all pages"
```

(Skip this step if no fixes were needed.)

---

### Task 10: Add .superpowers to .gitignore

**Files:**
- Modify or create: `.gitignore`

- [ ] **Step 1: Add .superpowers/ to .gitignore**

Check if `.gitignore` exists. If it does, append `.superpowers/`. If it doesn't, create it with:

```
.superpowers/
.DS_Store
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: add .superpowers/ to .gitignore"
```
