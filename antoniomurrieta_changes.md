# antoniomurrieta.com — Redesign Spec

## The Vision

The personal site should feel like it was built by someone who understands design at a deep level. Not a portfolio template. Not a generic "creative developer" site. A piece of craftsmanship that makes visitors think: "this person sees details others miss."

The design language aligns with MurrietaLabs (Antonio's software studio) — same typefaces, same earth-tone palette, same editorial confidence — but the personal site is warmer, more experimental, and more intimate. The studio site is a quiet conversation with a client. The personal site is an invitation into how Antonio thinks.

Every animation has a reason. Every whitespace decision is intentional. The restraint itself communicates taste.

## What Stays

- **The Library** — keep entirely as-is. It has its own dark editorial aesthetic with film grain texture that works. Don't touch it.
- **The content architecture** — HOME, WORK, LIBRARY, LAB, STORY, CONNECT is a good structure.

---

## 1. Color Palette

**Current:** Cardinal red (#8C1515), accent blue (#006CB8), accent green (#009B76), dark (#2E2D29)

**New palette:** Earth tones with an oak accent. Define these as CSS custom properties in `:root`:

```css
:root {
  --ink: #111111;        /* Titles, primary text, dark section backgrounds */
  --carbon: #2A2A2A;     /* Body text */
  --stone: #6B6560;      /* Secondary text, metadata, inactive states */
  --bone: #E8E4DD;       /* Borders, separators (always 1px, never thicker) */
  --paper: #F5F3EE;      /* Card surfaces, elevated elements */
  --linen: #FAF8F5;      /* Page background */
  --roble: #8B7355;      /* Primary accent — links, interactive elements, highlights */
  --roble-light: #A8916F; /* Accent on dark backgrounds */
  --roble-dim: rgba(139, 115, 85, 0.08); /* Accent backgrounds (tags, hover states) */
  --roble-border: rgba(139, 115, 85, 0.2); /* Accent borders */
}
```

Drop cardinal red, blue, and green entirely. One accent color (Roble) used consistently creates a stronger identity than three competing colors.

## 2. Typography

**Current:** Crimson Text (serif) + system sans-serif

**New type system:** Two fonts from Google Fonts (or self-hosted via @fontsource npm packages for speed):

```css
:root {
  --serif: 'Newsreader', Georgia, serif;
  --sans: 'Instrument Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
}
```

**Font weights to load:**
- Newsreader: 300 (Light), 400 (Regular), 400 Italic
- Instrument Sans: 400 (Regular), 500 (Medium), 600 (SemiBold)
- JetBrains Mono: 400 (Regular) — for LAB section and code

**Type scale:**

| Role | Font | Size | Weight | Details |
|------|------|------|--------|---------|
| H1 (hero) | Newsreader | clamp(42px, 8vw, 72px) | 300 Light | line-height 1.1, letter-spacing -1px |
| H2 (section titles) | Newsreader | clamp(28px, 4vw, 40px) | 400 Regular | line-height 1.2, letter-spacing -0.5px |
| H3 (subsections) | Newsreader | 20-24px | 400 | line-height 1.3 |
| Body text | Instrument Sans | 15-16px | 400 | line-height 1.75-1.8 |
| Section labels | Instrument Sans | 11px | 600 SemiBold | uppercase, letter-spacing 3px, color: var(--roble) |
| Nav links | Instrument Sans | 13px | 400 | color: var(--stone), hover: var(--roble) |
| Code/technical | JetBrains Mono | 13-14px | 400 | For LAB section |

**Section labels** appear before every major section. Format: `"01 — Section Name"` in the label style above. These create rhythm and structure across pages.

## 3. Custom Easing Curves

Don't use generic `ease` or `ease-in-out`. Define purpose-specific curves:

```css
:root {
  --ease-snap: cubic-bezier(0.25, 1, 0.5, 1);      /* Quick, snappy — hovers, clicks */
  --ease-reveal: cubic-bezier(0.61, 1, 0.88, 1);    /* Smooth content reveals on scroll */
  --ease-overlay: cubic-bezier(0.22, 1, 0.36, 1);   /* Overlay/panel slides */
  --ease-gentle: cubic-bezier(0.45, 0.05, 0.55, 0.95); /* Slow, deliberate — timelines, progress */
}
```

These curves give every motion a specific character. Fast-in/slow-out for reveals feels organic. The gentle curve for progress feels deliberate.

## 4. Navigation

**Current:** Standard navbar with hamburger on mobile, drop shadow on scroll.

**New design:**

**Desktop:**
- Fixed position, top of viewport, transparent background
- Left: "Antonio Murrieta" in Instrument Sans Medium 18px, letter-spacing -0.3px. This is a link to `/` (home). NOT all-caps.
- Right: nav links (HOME, WORK, LIBRARY, LAB, STORY, CONNECT) in Instrument Sans 13px, var(--stone), spaced 32px apart
- Link hover: color transitions to var(--roble), 200ms, var(--ease-snap)
- No background, no shadow, no border. The nav floats confidently over the content.
- `pointer-events: none` on the header, `pointer-events: auto` on the links (so clicks pass through to content below)

**Mobile (under 700px):**
- Left: "Antonio Murrieta" wordmark (same as desktop)
- Right: two thin horizontal lines (20px wide, 1.5px height, var(--ink), 5px gap between them) — the menu button
- Click menu button → full-screen overlay slides in from the left edge
  - Background: rgba(17, 17, 17, 0.95) — nearly opaque Ink
  - Transition: `transform: translateX(-100%)` → `translateX(0)`, 500ms, var(--ease-overlay)
  - Links stacked vertically in Newsreader italic, clamp(24px, 4vw, 36px), var(--paper) color at 50% opacity
  - Link hover: opacity goes to 100%
  - Gap between links: 32px
  - Close: click menu button again (lines animate to X shape: first line rotates 45deg, second -45deg), or press Escape
- Body scroll locked when overlay is open (`overflow: hidden`)

**Scroll progress bar:**
- A 1px line at the very top of the viewport, var(--roble) color
- Width grows from 0% to 100% as you scroll the page
- Starts invisible, fades in (`opacity 0 → 1`, 400ms) after scrolling past the hero section
- Only appears on long pages (HOME, STORY). Skip on short pages.

**Drop:** the scroll shadow. It's generic and adds visual noise.

## 5. Hero Section

**Current:** "Building at the intersection of art & technology" with 3D parallax tilt on mouse movement, floating gradient blobs in background.

**New design — the headline writes itself:**

- Full viewport height (`100vh` / `100dvh`). Linen (#FAF8F5) background. Nothing else visible except the nav wordmark above.
- Content aligned to bottom-left of viewport (flexbox, `justify-content: flex-end`), with 80px bottom padding.
- The headline **types itself character by character** in Newsreader Light at clamp(42px, 8vw, 72px):

  **"Building at the intersection of art & technology."**

  - Each character appears with intentionally irregular timing — not uniform like a chatbot, but like someone writing with a pen. Some letters arrive quickly (40-60ms), others pause (100-200ms). Spaces get a longer pause (140-240ms).
  - A thin blinking cursor (3px wide, 0.8em tall, var(--roble), blink animation 0.8s ease-in-out infinite) follows the text.
  - Total animation: ~4-5 seconds.
  - When the period lands: 500ms pause, then the cursor disappears and a 48px horizontal line in var(--roble) slides in from the left (transform scaleX 0→1, 500ms, var(--ease-snap)).

- After the accent line appears (300ms delay):
  - Subtitle fades in: "Builder. Entrepreneur. Curious by default." in Instrument Sans 17px, var(--stone), `opacity 0→1 + translateY 8px→0`, 500ms, var(--ease-reveal)
  - Two text links fade in below (staggered 150ms delay):
    - "View My Work →" — Instrument Sans 15px, 500 weight, var(--roble), no underline, hover: underline with text-underline-offset 4px
    - "Read My Story →" — same style

- At the very bottom, a scroll indicator: a small downward chevron SVG (16x24px) in var(--roble) that pulses gently up and down (translateY 0→6px, 2s ease-in-out infinite). Opacity 0.5.

**Reduced motion (`prefers-reduced-motion: reduce`):** Show everything immediately. No typing animation. No fades. Cursor hidden. All content visible and static.

**Why this works:** The typing animation sets the pace for the entire site. It says "I don't rush." It's the same philosophy as MurrietaLabs' hero but adapted for a personal site — same technique, different sentence.

## 6. Features Section ("What I Build")

**Current:** Three cards with colored icons, tags in pill badges, gradient borders on hover.

**New design — three massive words that expand:**

- Section label: `"01 — What I Build"` in the section label style (Instrument Sans SemiBold 11px, uppercase, var(--roble), letter-spacing 3px)
- Background: var(--linen)
- Three words stacked vertically, each taking the full width:

  **Apps.** / **Experiments.** / **Writing.**

  - Font: Newsreader Light, clamp(48px, 10vw, 96px), line-height 1.1, letter-spacing -1px, var(--ink)
  - Each word sits on a row separated by a 1px var(--bone) border
  - First item also has a top border

- **Interaction:** Click (desktop) or tap (mobile) on a word to expand it:
  - The word's top half rises 12px (`translateY(-12px)`)
  - A paragraph slides open in the gap: Instrument Sans 15px, var(--carbon), line-height 1.8, max-width 600px
  - Open transition: 250ms, var(--ease-snap)
  - Close transition: 400ms, cubic-bezier(0.45, 0.05, 0.55, 0.95) — asymmetric timing (fast open, slow close) feels organic
  - Only one word can be open at a time. Opening one closes the other.
  - Word color shifts to var(--roble) on hover AND when open

- **Keyboard accessible:** Each word gets `tabindex="0"` and `role="button"`. Enter/Space triggers the expand.

- **Content for each word:**
  - **Apps.** → "iOS applications and web platforms built for real users. 12 shipped apps, integrated payments, and systems designed for businesses that need software that actually works."
  - **Experiments.** → "Machine learning, generative AI, visual algorithms, and interactive design. The lab where ideas get tested before they become products."
  - **Writing.** → "Published children's literature and essays. 52 books a year, because the best builders are the best readers."

**Why this works:** Typography becomes the interface. The words ARE the design. No icons, no cards, no decorative elements competing for attention. The interaction rewards curiosity — you have to engage to learn more.

## 7. Featured Work Section

**Current:** Two project cards (AbundIA, Tribu) with images, category tags, gradient hover.

**New design — editorial project entries with reveal-on-scroll:**

- Section label: `"02 — Recent Work"`
- Background: var(--paper) — subtle shift from var(--linen) signals a new chapter

- Projects listed vertically, each separated by 1px var(--bone) border:
  - Category label: Instrument Sans SemiBold 10px, uppercase, var(--roble), letter-spacing 2px (e.g., "FINANCE & AI")
  - Title: Newsreader Regular 24px, var(--ink), margin-top 8px
  - Description: Instrument Sans 14px, var(--stone), one line, margin-top 6px
  - Each entry is a link (`<a>`) — entire row is clickable
  - Hover: title color transitions to var(--roble), entry shifts right 12px (`padding-left: 12px`, 300ms, var(--ease-snap))

- **Scroll reveal:** Each project entry starts invisible (`opacity: 0, translateY: 16px`) and fades in when it enters the viewport (Intersection Observer, threshold 0.2). Stagger consecutive entries by 150ms delay.

- At the bottom: "See all projects →" as a text link in var(--roble), Instrument Sans 15px, 500 weight.

**Optional blueprint effect for projects:** If a project doesn't have a screenshot, show a subtle wireframe/blueprint SVG of the app interface. Thin lines (var(--ink), stroke-width 0.5-1px) that draw themselves with a `stroke-dashoffset` animation when the section scrolls into view, over ~3 seconds. This turns the lack of screenshots into a design feature — you're showing how you think, not what you shipped.

## 8. Story Page Enhancement

**Current:** Unknown (didn't scrape the subpage)

**Proposed craft element — cursor-responsive text:**

For the "Story" page (which is likely a long personal narrative), add a manifesto-style section with a **cursor spotlight effect**:

- A dark section (var(--ink) background), full-width
- Text in Newsreader 300 weight, clamp(20px, 3vw, 28px), line-height 1.8
- The text is rendered at 12-15% opacity — barely visible, like text printed on dark paper
- A soft radial spotlight (~220px radius) follows the cursor position, illuminating nearby text to full brightness (var(--paper) color)
- The spotlight follows with a slight lag (CSS custom properties `--spotlight-x` and `--spotlight-y` updated on mousemove, with no transition for instant feel)

**Implementation:**
```css
.spotlight-text {
  background: radial-gradient(
    circle 220px at var(--spotlight-x) var(--spotlight-y),
    var(--paper) 0%,
    rgba(245, 243, 238, 0.12) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

Update `--spotlight-x` and `--spotlight-y` via JS on `mousemove`:
```javascript
element.addEventListener('mousemove', (e) => {
  const rect = textEl.getBoundingClientRect();
  textEl.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
  textEl.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
});
```

**Mobile fallback (no cursor):** Text starts at 15% opacity and fades to full opacity when the section enters the viewport (Intersection Observer, `transition: color 0.8s`).

**Reduced motion:** Show text at full opacity, no spotlight.

**Why this works:** Forces the reader to slow down and actually read, word by word. Creates intimacy. The reader leans in. Use this for a key paragraph — a personal manifesto or philosophy statement, not the entire page.

## 9. Lab Section Enhancement

**Proposed craft element — living dot grid:**

For the LAB section (experiments, ML, generative art), add an ambient background animation:

- A grid of small dots (3px circles, var(--bone) color) spaced 24px apart
- Each dot has its own independent animation: opacity pulsing between 0.2 and 0.8 using `steps(1, end)` timing (discrete stepping, not smooth fade)
- Different dots use different animation durations (2800ms, 3200ms, 3600ms) creating a polyrhythmic visual texture — like a living circuit board
- The effect should be subtle — 5-8% opacity on the overall grid container so it sits behind content as atmospheric texture
- Only render this on devices with 4+ CPU cores (`navigator.hardwareConcurrency > 4`), otherwise show a static grid

**Implementation approach:**
- CSS keyframes with `steps(1, end)` for discrete opacity changes
- Use CSS custom properties per dot for staggered timing
- `will-change: opacity` for GPU compositing
- Wrap in `@media (prefers-reduced-motion: no-preference)` — static grid for reduced motion

**Why this works:** Signals technical depth without saying a word. The stepped animation (not smooth) feels engineered and digital — like a system monitoring dashboard. It says "the person who built this thinks in systems."

## 10. Connect Page

**Current:** Unknown

**New design — an invitation, not a form:**

- Full viewport, var(--ink) background (dark)
- Centered vertically, generous whitespace (120px top padding minimum)
- Headline fades in on scroll: "Let's talk." in Newsreader Light, clamp(20px, 3vw, 28px), var(--paper)
- After 400ms delay, email fades in below: "carlosantonio.murrieta@gmail.com" in Instrument Sans 500 weight, clamp(16px, 2.5vw, 20px), var(--roble-light), underlined with a 1px var(--roble-light) line
- Email hover: color and border transition to var(--paper)
- Below email: "Or find me on" followed by text links (not icons): "GitHub · LinkedIn · Instagram" in Instrument Sans 14px, var(--stone)
- Social link hover: color transitions to var(--paper)

**Below, separated by a thin border (rgba(245, 243, 238, 0.08)):**
- "MurrietaLabs →" link in Instrument Sans 13px, var(--stone), linking to murrietalabs.com
- This subtly connects the two identities without making it prominent

**No contact form.** No "Send Message" button. The restraint IS the message — someone who reaches this page doesn't need to be convinced. They need to be invited.

**Scroll reveal:** Headline, email, and social links each fade in with staggered timing (0ms, 200ms, 350ms delay). Use Intersection Observer. `opacity 0→1 + translateY 16px→0`, var(--ease-reveal).

## 11. Scroll-Triggered Animations (Global)

Every section on every page should use scroll-reveal. This is the global animation system:

**How it works:**
- Elements that should animate get a `.reveal` class
- Initially: `opacity: 0; transform: translateY(16px);`
- When they enter the viewport (Intersection Observer, threshold 0.2): add `.revealed` class
- `.revealed`: `opacity: 1; transform: translateY(0);` with `transition: opacity 0.5s var(--ease-reveal), transform 0.5s var(--ease-reveal)`
- For groups of elements (list items, project entries): stagger each child by 150ms using `transition-delay`

**Global implementation:**
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

**Reduced motion:** Add a global override:
```css
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

**No animation libraries.** No GSAP, no AOS, no Framer Motion. Vanilla JS + CSS transitions + Intersection Observer. This keeps the site fast and proves you don't need a library to make things feel polished.

## 12. Hover Micro-Interactions

Small details that signal craft:

**Text links:**
- Default: var(--stone) or var(--roble) depending on context
- Hover: color transition 200ms var(--ease-snap)
- Underline appears on hover with `text-underline-offset: 4px` (not on by default)

**Project entries:**
- Hover: entry shifts right 12px via padding-left, title color changes to var(--roble), 300ms var(--ease-snap)
- This "nudge" on hover is subtle but deliberate — it says "this is interactive" without a neon button

**Expandable words (Features section):**
- Word color shifts to var(--roble) on hover, 300ms
- The asymmetric timing (fast open 250ms, slow close 400ms) is a craft detail — it mimics how physical things move (quick to engage, gentle to settle)

**Nav links:**
- Stone → Roble on hover, 200ms
- No underline. Just the color shift.

## 13. Footer

**Current:** Light background, social icons, "Crafted with passion and code."

**New design:**
- Background: var(--ink) (dark) — creates a visual bookend with the Connect page
- "Antonio Murrieta" in Instrument Sans Medium 16px, var(--paper), centered
- Below: "MurrietaLabs" in Instrument Sans 13px, var(--stone), linking to murrietalabs.com
- Below: Social links as text: "GitHub · LinkedIn · Instagram" in Instrument Sans 12px, var(--stone), hover: var(--roble-light)
- Copyright: Instrument Sans 11px, rgba(245, 243, 238, 0.25)
- Drop "Crafted with passion and code" — the site itself proves that. Saying it is redundant.

## 14. Global CSS Reset & Base

Apply these base styles across all pages (except Library):

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

## Summary of Craft Elements

| Section | Craft Element | What It Communicates |
|---------|--------------|----------------------|
| Hero | Typing animation with irregular timing | "I don't rush. I'm deliberate." |
| Features | Typography as interface (expandable words) | "The words ARE the design." |
| Work | Blueprint wireframe drawings (SVG) | "I show how I think, not just what I ship." |
| Story | Cursor spotlight on manifesto text | "Lean in. This is intimate." |
| Lab | Living dot grid (polyrhythmic pulses) | "I think in systems." |
| Connect | Restrained invitation (no form, just email) | "I don't need to convince you." |
| Global | Custom easing curves per interaction type | "Every motion is intentional." |
| Global | Scroll-reveal with staggered timing | "Each section earns its entrance." |
| Nav | Progress bar + overlay with italic serif links | "Navigation is part of the experience." |

## The Thread Between Sites

antoniomurrieta.com and murrietalabs.com share:
- **Typefaces:** Newsreader (headlines) + Instrument Sans (body)
- **Accent color:** Roble (#8B7355) as the single accent
- **Background:** Linen (#FAF8F5)
- **Easing curves:** Same four custom cubic-beziers
- **Design philosophy:** Editorial restraint, typography-driven, whitespace as confidence
- **Animation approach:** Vanilla CSS/JS, Intersection Observer, no libraries

A visitor who sees both sites should feel "same person" without either site saying it. The connection is in the craft DNA, not in a logo or a link.
