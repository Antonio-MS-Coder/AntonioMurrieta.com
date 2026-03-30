# Structural Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio from a standard layout into a living studio with interactive hero typography, organic work masonry grid, lab dot grid, simplified connect page, scroll progress bar, and scroll-reveal animations.

**Architecture:** Build on Phase 1 re-skin (styles.css already has palette, fonts, easing, nav, footer). Add new shared CSS classes to styles.css. Modify page-specific inline styles and HTML/JS per page. No build tools, no libraries — vanilla CSS/JS only.

**Tech Stack:** Vanilla HTML5, CSS3, JavaScript (IntersectionObserver, requestAnimationFrame, CSS animations)

**Spec:** `docs/superpowers/specs/2026-03-29-structural-redesign-design.md`

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| **Modify** | `styles.css` | Add `.section-label`, `.scroll-progress`, `.work-grid-*`, `.dot-grid-*`, `.reveal-stagger`, hero letter CSS |
| **Modify** | `index.html` | Hero rewrite (interactive letters), features refinement, masonry grid, progress bar, scroll-reveal |
| **Modify** | `connect.html` | Layout simplification, scroll-reveal |
| **Modify** | `lab.html` | Dot grid background, card backdrop-filter, scroll-reveal |
| **Modify** | `work.html` | Scroll progress bar, scroll-reveal |
| **Modify** | `story.html` | Scroll progress bar, scroll-reveal |
| **Modify** | `support.html` | Scroll-reveal |

---

### Task 1: Add Shared CSS to styles.css

**Files:**
- Modify: `styles.css`

Add section labels, scroll progress bar, work masonry grid, hero letter animations, dot grid animation, and reveal-stagger CSS classes.

- [ ] **Step 1: Add new CSS classes before the Reduced Motion block**

Insert the following rules right before the `/* === Reduced Motion === */` comment (line 270 in styles.css):

```css
/* === Section Labels === */
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

/* === Scroll Progress Bar === */
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
    pointer-events: none;
}

.scroll-progress.visible {
    opacity: 1;
}

/* === Work Masonry Grid === */
.work-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 100px;
    gap: 12px;
    max-width: 1000px;
    margin: 0 auto;
}

.work-grid-item {
    border-radius: 8px;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
    display: block;
    text-decoration: none;
    transition: transform 0.3s var(--ease-snap), box-shadow 0.3s var(--ease-snap);
}

.work-grid-item:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.work-grid-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    background: linear-gradient(180deg, transparent 0%, rgba(17, 17, 17, 0.6) 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
}

.work-grid-category {
    font-family: var(--sans);
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--roble-light);
    margin-bottom: 4px;
}

.work-grid-title {
    font-family: var(--serif);
    font-size: 18px;
    font-weight: 400;
    color: var(--paper);
}

.work-grid-large { grid-column: span 2; grid-row: span 2; }
.work-grid-tall { grid-column: span 1; grid-row: span 2; }
.work-grid-wide { grid-column: span 2; grid-row: span 1; }

.work-grid-item:not(.work-grid-large):not(.work-grid-wide) .work-grid-title {
    font-size: 14px;
}

.work-grid-item:not(.work-grid-large):not(.work-grid-wide) .work-grid-category {
    display: none;
}

/* === Interactive Hero Letters === */
.hero-letter {
    display: inline-block;
    will-change: transform;
    transition: transform 0.4s var(--ease-gentle), text-shadow 0.4s var(--ease-gentle);
}

.hero-letter.active {
    transition: transform 60ms ease-out, text-shadow 60ms ease-out;
    animation: none;
    transform: rotate(0deg) translateY(0);
}

.hero-letter-roble {
    color: var(--roble);
}

.hero-letter-roble.active {
    text-shadow: 0 0 20px rgba(139, 115, 85, 0.15);
}

@keyframes letterIdle {
    0% { transform: rotate(calc(var(--idle-rot) * -1)) translateY(calc(var(--idle-y) * -1)); }
    100% { transform: rotate(var(--idle-rot)) translateY(var(--idle-y)); }
}

.hero-letter.idle {
    animation: letterIdle var(--idle-duration) ease-in-out infinite alternate;
}

/* === Dot Grid (Lab) === */
.dot-grid-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    pointer-events: none;
    opacity: 0.13;
}

/* === Reveal Stagger === */
.reveal-stagger > .reveal:nth-child(1) { transition-delay: 0ms; }
.reveal-stagger > .reveal:nth-child(2) { transition-delay: 100ms; }
.reveal-stagger > .reveal:nth-child(3) { transition-delay: 200ms; }
.reveal-stagger > .reveal:nth-child(4) { transition-delay: 300ms; }
.reveal-stagger > .reveal:nth-child(5) { transition-delay: 400ms; }
.reveal-stagger > .reveal:nth-child(6) { transition-delay: 500ms; }
.reveal-stagger > .reveal:nth-child(7) { transition-delay: 600ms; }
.reveal-stagger > .reveal:nth-child(8) { transition-delay: 700ms; }
```

- [ ] **Step 2: Add mobile responsive rules for the work grid**

Inside the existing `@media (max-width: 768px)` block at the bottom of styles.css, add:

```css
    .work-grid {
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 140px;
    }

    .work-grid-large,
    .work-grid-tall,
    .work-grid-wide {
        grid-column: span 1;
        grid-row: span 1;
    }
```

- [ ] **Step 3: Add reduced motion overrides for new animations**

Inside the existing `@media (prefers-reduced-motion: reduce)` block, add:

```css
    .hero-letter {
        animation: none !important;
        transform: none !important;
    }

    .dot-grid-container circle {
        animation: none !important;
    }
```

- [ ] **Step 4: Add dot grid animation via prefers-reduced-motion media query**

After the reduced motion block, add:

```css
@media (prefers-reduced-motion: no-preference) {
    @keyframes dotPulse {
        0% { opacity: 0.2; }
        50% { opacity: 0.8; }
        100% { opacity: 0.2; }
    }

    .dot-grid-container circle {
        animation: dotPulse var(--dot-duration) steps(1, end) infinite;
    }
}
```

- [ ] **Step 5: Commit**

```bash
git add styles.css
git commit -m "feat: add shared CSS for section labels, scroll progress, masonry grid, hero letters, dot grid, reveal stagger"
```

---

### Task 2: Rewrite Hero Section (index.html)

**Files:**
- Modify: `index.html`

Replace the current hero with interactive typography — letters that breathe and respond to cursor proximity.

- [ ] **Step 1: Remove old hero CSS from inline `<style>`**

Remove these CSS rules:
- `.hero-title span` (gradient clip background)
- `@keyframes shimmer`
- `.hero-description`
- `.hero-currently` and `.hero-currently strong`
- `.credentials-bar`, `.credentials-bar span`, `.credentials-bar .separator`
- `.floating-gradient`, `.gradient-1`, `.gradient-2`, `@keyframes float-gradient`
- `@keyframes fadeInUp`
- Remove `animation: fadeInUp 0.8s var(--ease-snap);` from `.hero-content`

Update `.hero-title` to:
```css
.hero-title {
    font-family: var(--serif);
    font-size: clamp(48px, 8vw, 80px);
    font-weight: 300;
    letter-spacing: -2px;
    margin-bottom: 24px;
    line-height: 1.1;
    color: var(--ink);
}
```

- [ ] **Step 2: Update hero HTML**

Remove:
- `<div class="floating-gradient gradient-1"></div>` and `gradient-2`
- `<p class="hero-description">...</p>`

Replace the hero title:
```html
<h1 class="hero-title" id="heroTitle">
    <span class="hero-text" data-text="Building at the intersection of ">Building at the intersection of </span>
    <span class="hero-text hero-text-accent" data-text="art &amp; technology.">art &amp; technology.</span>
</h1>
```

- [ ] **Step 3: Replace old hero JS with interactive letter system**

Remove from `<script>`:
- "Dynamic cursor effect on hero title" block
- "Parallax effect on scroll for hero content" block

Add this interactive letter system:

```javascript
// Interactive Hero Letters
(function() {
    var heroTitle = document.getElementById('heroTitle');
    if (!heroTitle) return;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Wrap each character in a span
    var textSpans = heroTitle.querySelectorAll('.hero-text');
    textSpans.forEach(function(span) {
        var text = span.getAttribute('data-text');
        var isAccent = span.classList.contains('hero-text-accent');
        var frag = document.createDocumentFragment();

        for (var i = 0; i < text.length; i++) {
            var ch = text[i];
            var el = document.createElement('span');

            if (ch === ' ') {
                el.textContent = '\u00A0';
                el.className = 'hero-letter';
            } else {
                el.textContent = ch;
                el.className = 'hero-letter' + (isAccent ? ' hero-letter-roble' : '');
            }

            if (!prefersReducedMotion) {
                var rot = (Math.random() * 1 - 0.5).toFixed(2);
                var y = (Math.random() * 2 - 1).toFixed(2);
                var dur = (2 + Math.random() * 2).toFixed(2);
                el.style.setProperty('--idle-rot', rot + 'deg');
                el.style.setProperty('--idle-y', y + 'px');
                el.style.setProperty('--idle-duration', dur + 's');
                el.classList.add('idle');
            }

            frag.appendChild(el);
        }

        span.textContent = '';
        span.appendChild(frag);
    });

    if (prefersReducedMotion) return;

    var isTouchDevice = 'ontouchstart' in window;
    var letters = heroTitle.querySelectorAll('.hero-letter');

    // Desktop: cursor interaction
    if (!isTouchDevice) {
        var rafId = null;
        heroTitle.addEventListener('mousemove', function(e) {
            if (rafId) return;
            rafId = requestAnimationFrame(function() {
                var mx = e.clientX;
                var my = e.clientY;
                letters.forEach(function(letter) {
                    if (letter.textContent === '\u00A0') return;
                    var rect = letter.getBoundingClientRect();
                    var cx = rect.left + rect.width / 2;
                    var cy = rect.top + rect.height / 2;
                    var dist = Math.sqrt(Math.pow(mx - cx, 2) + Math.pow(my - cy, 2));
                    if (dist < 100) {
                        letter.classList.add('active');
                        letter.classList.remove('idle');
                    } else if (letter.classList.contains('active')) {
                        letter.classList.remove('active');
                        setTimeout(function() { letter.classList.add('idle'); }, 400);
                    }
                });
                rafId = null;
            });
        });

        heroTitle.addEventListener('mouseleave', function() {
            letters.forEach(function(letter) {
                letter.classList.remove('active');
                setTimeout(function() { letter.classList.add('idle'); }, 400);
            });
        });
    }

    // Mobile: tap wave
    if (isTouchDevice) {
        heroTitle.addEventListener('touchstart', function(e) {
            var touch = e.touches[0];
            var tx = touch.clientX;
            var ty = touch.clientY;
            letters.forEach(function(letter) {
                if (letter.textContent === '\u00A0') return;
                var rect = letter.getBoundingClientRect();
                var cx = rect.left + rect.width / 2;
                var cy = rect.top + rect.height / 2;
                var dist = Math.sqrt(Math.pow(tx - cx, 2) + Math.pow(ty - cy, 2));
                var delay = dist * 1.5;
                setTimeout(function() {
                    letter.classList.add('active');
                    letter.classList.remove('idle');
                    setTimeout(function() {
                        letter.classList.remove('active');
                        letter.classList.add('idle');
                    }, 300);
                }, delay);
            });
        });
    }
})();
```

- [ ] **Step 4: Add scroll progress bar HTML and JS**

Add as first child of `<body>`:
```html
<div class="scroll-progress" id="scrollProgress"></div>
```

Add to `<script>`:
```javascript
// Scroll progress bar
var scrollProgress = document.getElementById('scrollProgress');
var heroSection = document.querySelector('.hero');
if (scrollProgress && heroSection) {
    var heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) {
                scrollProgress.classList.add('visible');
            } else {
                scrollProgress.classList.remove('visible');
            }
        });
    }, { threshold: 0 });
    heroObserver.observe(heroSection);

    window.addEventListener('scroll', function() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
            scrollProgress.style.width = (scrollTop / docHeight) * 100 + '%';
        }
    });
}
```

- [ ] **Step 5: Add scroll-reveal observer**

Add to `<script>`:
```javascript
// Scroll reveal
var reveals = document.querySelectorAll('.reveal');
var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
reveals.forEach(function(el) { revealObserver.observe(el); });
```

- [ ] **Step 6: Verify in browser**

- Hero letters have subtle idle animation
- Cursor proximity straightens letters, Roble letters get glow
- No floating gradient blobs or parallax
- Progress bar appears after scrolling past hero
- Mobile: letters idle-animate, tap wave works

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "feat: interactive hero typography with cursor-responsive letters

Letters breathe with idle animation, straighten on cursor proximity.
Mobile tap wave. Remove gradient blobs and parallax. Add progress bar."
```

---

### Task 3: Refine Features + Add Masonry Grid (index.html)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace features intro with section label**

Replace `<div class="features-intro">...</div>` with:
```html
<p class="section-label reveal">01 — What I Build</p>
```

- [ ] **Step 2: Remove tech tags, add reveal classes, update card title CSS**

Remove all `<div class="feature-meta">...</div>` blocks from each card.

Add `reveal` class to each `<article class="feature-card">` → `<article class="feature-card reveal">`.

Wrap the features-grid in a stagger container: add `reveal-stagger` class to `<div class="features-grid">` → `<div class="features-grid reveal-stagger">`.

Update `.feature-card h3` CSS to:
```css
.feature-card h3 {
    font-family: var(--serif);
    font-size: 20px;
    font-weight: 400;
    color: var(--ink);
    margin-bottom: 12px;
    letter-spacing: -0.3px;
}
```

Change `.feature-card` background from `var(--linen)` to `var(--paper)`.

Remove `.feature-meta`, `.feature-meta-tag`, `.feature-card:hover .feature-meta-tag` CSS rules.

- [ ] **Step 3: Replace featured projects with masonry grid**

Replace the entire `<section class="featured">...</section>` with:

```html
<section class="featured">
    <div class="featured-container">
        <p class="section-label reveal">02 — Recent Work</p>

        <div class="work-grid reveal-stagger">
            <a href="work.html" class="work-grid-item work-grid-large reveal" style="background-image: url('assets/Work_Covers/Abundia.webp')">
                <div class="work-grid-overlay">
                    <span class="work-grid-category">Finance & AI</span>
                    <span class="work-grid-title">AbundIA</span>
                </div>
            </a>
            <a href="work.html" class="work-grid-item work-grid-tall reveal" style="background-image: url('assets/Work_Covers/Tribu.webp')">
                <div class="work-grid-overlay">
                    <span class="work-grid-title">Tribu</span>
                </div>
            </a>
            <a href="work.html" class="work-grid-item reveal" style="background-image: url('assets/Work_Covers/Komercia.webp')">
                <div class="work-grid-overlay">
                    <span class="work-grid-title">Komercia</span>
                </div>
            </a>
            <a href="work.html" class="work-grid-item reveal" style="background-image: url('assets/Work_Covers/Contrario.webp')">
                <div class="work-grid-overlay">
                    <span class="work-grid-title">Contrario</span>
                </div>
            </a>
            <a href="work.html" class="work-grid-item work-grid-wide reveal" style="background-image: url('assets/Work_Covers/LCK-1.webp')">
                <div class="work-grid-overlay">
                    <span class="work-grid-category">Experience Design</span>
                    <span class="work-grid-title">LCK Experience</span>
                </div>
            </a>
            <a href="work.html" class="work-grid-item reveal" style="background-image: url('assets/Work_Covers/Capi_Corazon.webp')">
                <div class="work-grid-overlay">
                    <span class="work-grid-title">Capi Coraz&oacute;n</span>
                </div>
            </a>
            <a href="work.html" class="work-grid-item reveal" style="background-image: url('assets/Work_Covers/El_Peso_Del_Aire.webp')">
                <div class="work-grid-overlay">
                    <span class="work-grid-title">El Peso del Aire</span>
                </div>
            </a>
            <a href="work.html" class="work-grid-item reveal" style="background-image: url('assets/Work_Covers/Bounce_Blitz.webp')">
                <div class="work-grid-overlay">
                    <span class="work-grid-title">Bounce Blitz</span>
                </div>
            </a>
        </div>

        <div class="featured-cta reveal" style="margin-top: 32px;">
            <a href="work.html">See all projects &#8594;</a>
        </div>
    </div>
</section>
```

- [ ] **Step 4: Remove obsolete CSS**

Remove from `<style>`:
- `.features-intro`, `.features-intro h2`, `.features-intro p`, `.features-intro p strong`
- `.featured-header`, `.featured-header h2`, `.featured-header p`
- `.featured-grid`
- `.featured-project`, `.featured-project:hover`
- `.featured-project-image`
- `.featured-project-info`, `.featured-project-category`, `.featured-project-title`, `.featured-project-desc`
- `.section-title`, `.section-title::after`
- `.feature-meta`, `.feature-meta-tag`, `.feature-card:hover .feature-meta-tag`
- Mobile `.featured-grid` rule

Keep: `.featured`, `.featured-container`, `.featured-cta`, `.featured-cta a`, `.featured-cta a:hover`

- [ ] **Step 5: Verify in browser**

- Section labels visible ("01 — What I Build", "02 — Recent Work")
- Feature cards: serif titles, no tech tags, paper background
- Masonry grid: 8 projects in varied sizes with cover images
- Grid hover: scale + shadow
- Mobile: 2-column uniform grid
- Scroll-reveal animates items in with stagger

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: section labels, refined feature cards, organic masonry grid

Editorial section labels. Serif card titles, tech tags removed.
8-project masonry grid with varied sizes. Scroll-reveal stagger."
```

---

### Task 4: Simplify Connect Page

**Files:**
- Modify: `connect.html`

- [ ] **Step 1: Replace page content between nav and footer**

Replace everything inside `<body>` between the `</nav>` and `<footer>` tags with:

```html
<div class="connect-container">
    <p class="section-label reveal">Say Hello</p>

    <div class="connect-hero reveal">
        <h1>Let's talk.</h1>
    </div>

    <p class="connect-intro reveal">
        I'm always open to interesting conversations, collaborations, or just connecting with curious people.
    </p>

    <div class="connect-email reveal">
        <a href="mailto:create@antoniomurrieta.com">create@antoniomurrieta.com</a>
    </div>

    <div class="connect-socials reveal">
        <a href="https://github.com/Antonio-MS-Coder" target="_blank" rel="noopener">GitHub</a>
        <span class="dot">&middot;</span>
        <a href="https://www.linkedin.com/in/antonio-murrieta" target="_blank" rel="noopener">LinkedIn</a>
        <span class="dot">&middot;</span>
        <a href="https://instagram.com/tono_cams" target="_blank" rel="noopener">Instagram</a>
    </div>

    <div class="connect-separator reveal"></div>

    <div class="message-section reveal">
        <form id="contactForm" action="https://formsubmit.co/create@antoniomurrieta.com" method="POST">
            <input type="hidden" name="_cc" value="carlosantonio.murrieta@gmail.com">
            <input type="hidden" name="_subject" value="New message from Antonio Murrieta Website">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_template" value="table">
            <div class="form-group">
                <label class="form-label" for="name">Name</label>
                <input type="text" id="name" name="name" class="form-input" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="email">Email</label>
                <input type="email" id="email" name="email" class="form-input" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="message">Message</label>
                <textarea id="message" name="message" class="form-textarea" required></textarea>
            </div>
            <button type="submit" class="form-button" id="submitBtn">Send Message</button>
        </form>
        <div class="form-message" id="formMessage"></div>
    </div>
</div>
```

- [ ] **Step 2: Replace inline CSS**

Replace the entire `<style>` block with the simplified connect page styles. Key rules: `.connect-container` centered max-width 520px, `.connect-hero h1` in Newsreader Light clamp(28-44px), `.connect-intro` in stone 15px, `.connect-email a` in Roble with underline, `.connect-socials` text links with dots, `.connect-separator` 60px bone line, bottom-border-only form inputs, Roble submit button. Form success message uses roble tones instead of green/red. Mobile padding adjustment.

- [ ] **Step 3: Add scroll-reveal observer to script**

Add the standard scroll-reveal observer JS before the form submission code.

- [ ] **Step 4: Verify in browser**

- "Say Hello" label, "Let's talk." headline
- Email in Roble, social text links
- Thin separator, bottom-border form
- Form submits correctly
- Scroll-reveal staggers elements
- Mobile responsive

- [ ] **Step 5: Commit**

```bash
git add connect.html
git commit -m "feat: simplify connect page — warm minimal layout

Centered layout, section label, email + socials above form.
Bottom-border inputs, scroll-reveal stagger."
```

---

### Task 5: Add Dot Grid to Lab Page

**Files:**
- Modify: `lab.html`

- [ ] **Step 1: Add dot grid container HTML**

Find the main lab section container. Add `position: relative` if needed. Insert as first child inside it:
```html
<div class="dot-grid-container" id="dotGrid" aria-hidden="true"></div>
```

- [ ] **Step 2: Update experiment card CSS**

Add to experiment card styling in the inline `<style>`:
```css
backdrop-filter: blur(8px);
background: rgba(250, 248, 245, 0.85);
border: 1px solid var(--bone);
```

- [ ] **Step 3: Add dot grid generation and scroll-reveal JS**

Add to `<script>`:
```javascript
// Dot grid background
(function() {
    var container = document.getElementById('dotGrid');
    if (!container) return;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hasCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency > 4;

    var spacing = 16;
    var parent = container.parentElement;
    var cols = Math.ceil(parent.offsetWidth / spacing);
    var rows = Math.ceil(parent.offsetHeight / spacing);

    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';

    var durations = ['2800ms', '3200ms', '3600ms'];

    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            var circle = document.createElementNS(svgNS, 'circle');
            circle.setAttribute('cx', c * spacing + spacing / 2);
            circle.setAttribute('cy', r * spacing + spacing / 2);
            circle.setAttribute('r', '1.5');
            circle.setAttribute('fill', '#E8E4DD');

            if (!prefersReducedMotion && hasCores) {
                var durIdx = (r * cols + c) % 3;
                circle.style.setProperty('--dot-duration', durations[durIdx]);
                circle.style.animationDelay = (Math.random() * 2).toFixed(2) + 's';
            }

            svg.appendChild(circle);
        }
    }

    container.appendChild(svg);
})();

// Scroll reveal
var reveals = document.querySelectorAll('.reveal');
var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
reveals.forEach(function(el) { revealObserver.observe(el); });
```

Add `.reveal` class to experiment cards.

- [ ] **Step 4: Verify in browser**

- Dot grid visible behind cards (faint pulsing at ~13% opacity)
- Discrete stepping animation (not smooth)
- Cards have frosted glass effect
- Scroll-reveal works

- [ ] **Step 5: Commit**

```bash
git add lab.html
git commit -m "feat: add polyrhythmic dot grid background to lab page

16px spacing, 13% opacity, discrete stepping animation.
Experiment cards float with backdrop-filter blur. Scroll-reveal added."
```

---

### Task 6: Add Scroll Progress + Reveal to work.html, story.html, support.html

**Files:**
- Modify: `work.html`, `story.html`, `support.html`

- [ ] **Step 1: Update work.html**

Add `<div class="scroll-progress" id="scrollProgress"></div>` as first child of `<body>`.

Add to `<script>`:
```javascript
// Scroll progress bar
var scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
    scrollProgress.classList.add('visible');
    window.addEventListener('scroll', function() {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
            scrollProgress.style.width = (scrollTop / docHeight) * 100 + '%';
        }
    });
}

// Scroll reveal
var reveals = document.querySelectorAll('.reveal');
var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
reveals.forEach(function(el) { revealObserver.observe(el); });
```

Add `.reveal` class to: work header elements, each project card.

- [ ] **Step 2: Update story.html**

Same progress bar + reveal pattern. Add `.reveal` to narrative blocks, story photos, background sections.

- [ ] **Step 3: Update support.html**

Add only scroll-reveal (no progress bar — short page). Add `.reveal` to content sections.

- [ ] **Step 4: Verify each page**

- work.html: progress bar, project cards reveal
- story.html: progress bar, narrative sections reveal
- support.html: content reveals

- [ ] **Step 5: Commit**

```bash
git add work.html story.html support.html
git commit -m "feat: add scroll progress bar and scroll-reveal to work, story, support pages"
```

---

### Task 7: Final Verification

**Files:** All modified files

- [ ] **Step 1: Test each page end-to-end in browser**

- index.html: interactive hero, section labels, masonry grid, progress bar, scroll-reveal
- work.html: progress bar, scroll-reveal
- lab.html: dot grid, backdrop-filter cards, scroll-reveal
- story.html: progress bar, scroll-reveal
- connect.html: simplified layout, form works, scroll-reveal
- support.html: scroll-reveal

- [ ] **Step 2: Test mobile (resize to <768px)**

- Hero letters idle-animate, tap wave
- Masonry grid 2-column
- Connect responsive
- Mobile nav works everywhere

- [ ] **Step 3: Test reduced motion**

Enable `prefers-reduced-motion: reduce` in DevTools:
- Hero letters static
- Dot grid static
- No scroll-reveal transitions
- All content visible immediately

- [ ] **Step 4: Fix any issues and commit**

```bash
git add -A
git commit -m "fix: address issues from final verification"
```

(Skip if no issues found.)
