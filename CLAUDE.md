# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page marketing website for **Positive Misfits** — a tech/digital agency.
No build tools, no framework, no package manager. Pure HTML5, CSS3, and vanilla JS.

## Running Locally

```bash
python3 -m http.server
# then open http://localhost:8000/HTML/index.html
```

## Project Structure

```
HTML/index.html   — single entry point; all page sections live here
CSS/index.css     — single stylesheet (design tokens + all section styles)
JS/main.js        — vanilla JS (dark mode, AOS, Lucide icons, nav, mobile menu)
img/              — image assets (referenced in CSS via relative paths ../img/)
```

> The CSS file uses relative paths for background images (`url('../img/...')`),
> so the stylesheet must be served from `CSS/` for paths to resolve correctly.
> Opening `index.html` directly from disk may cause image load failures.

---

## CDN Packages (no npm/node needed)

All dependencies are loaded via CDN in `HTML/index.html`. Do **not** add packages
unless clearly required — prefer CDN over npm to keep the project dependency-free.

| Package | Purpose | CDN |
|---|---|---|
| **Inter** (Google Fonts) | Primary typeface | fonts.googleapis.com |
| **Lucide Icons** | SVG icon set | unpkg.com/lucide |
| **AOS** (Animate on Scroll) | Scroll entrance animations | unpkg.com/aos@2.3.4 |

---

## Design System

### Colour Tokens (derived from the PositiveMisfits logo palette)

| Token | Value | Source |
|---|---|---|
| `--pm-green` | `#52A852` | "Positive" lettering in logo |
| `--pm-green-light` | `#72C472` | lightened brand green |
| `--pm-green-dark` | `#3A7A3A` | darkened brand green |
| `--pm-orange` | `#F07028` | "Misfits" lettering in logo |
| `--pm-orange-light` | `#F59050` | lightened brand orange |
| `--pm-orange-dark` | `#C05018` | darkened brand orange |
| `--pm-yellow` | `#F0B429` | lightbulb body colour in logo |
| `--pm-yellow-light` | `#F5C859` | lightened brand yellow |
| `--pm-yellow-dark` | `#C08010` | darkened brand yellow |

### Gradients

| Token | Direction & Stops |
|---|---|
| `--gradient-brand` | `135deg, #52A852 → #F07028` (green to orange — primary brand) |
| `--gradient-green` | `135deg, #52A852 → #3A7A3A` |
| `--gradient-orange` | `135deg, #F07028 → #C05018` |
| `--gradient-yellow` | `135deg, #F0B429 → #C08010` |

### Surface Tokens (theme-aware via `data-theme`)

| Token | Light Mode | Dark Mode |
|---|---|---|
| `--bg-base` | `#FFFFFF` | `#0D0D0D` |
| `--bg-subtle` | `#F5F5F0` | `#161616` |
| `--bg-card` | `#FFFFFF` | `#1C1C1C` |
| `--bg-input` | `#F5F5F0` | `#222222` |
| `--border` | `#E8E8E0` | `#2A2A2A` |
| `--text-1` | `#111110` | `#F0F0EC` |
| `--text-2` | `#555550` | `#A0A09A` |
| `--nav-bg` | `rgba(255,255,255,.85)` | `rgba(13,13,13,.85)` |

### Typography

- Font: **Inter** (weights 300–900 loaded from Google Fonts)
- Scale: `--text-xs` (12px) → `--text-7xl` (72px)
- Headlines: `font-weight: 800–900`, `letter-spacing: -.02em` to `-.03em`
- Body: `font-weight: 400`, `line-height: 1.65`

### Spacing (8-pt grid)

`--sp-1` 4px · `--sp-2` 8px · `--sp-3` 12px · `--sp-4` 16px · `--sp-5` 20px ·
`--sp-6` 24px · `--sp-8` 32px · `--sp-10` 40px · `--sp-12` 48px · `--sp-16` 64px ·
`--sp-20` 80px · `--sp-24` 96px · `--sp-32` 128px

### Border Radius

`--radius-sm` 6px · `--radius-md` 12px · `--radius-lg` 20px ·
`--radius-xl` 28px · `--radius-pill` 9999px

---

## Page Sections

| Section ID | Description |
|---|---|
| `#navbar` | Fixed glassmorphism nav — logo, links, dark mode toggle, CTA pill |
| `#hero` | Full-viewport dark hero — large headline, CTAs, floating service cards |
| `#services` | 3-column grid of 6 gradient service cards |
| `#work` | Dark portfolio mosaic grid (CSS Grid, wide + standard cards) with hover overlays |
| `#process` | 4-step process row with gradient connectors |
| `#stats` | Brand-gradient strip with key metrics (50+ Projects, 30+ Clients, etc.) |
| `#testimonials` | 3-column testimonial card grid |
| `#contact` | Dark split layout — contact info left, Netlify form right |
| `#footer` | 4-column dark footer (brand, services, company, legal) |

New sections should use the same `<section id="…">` pattern with a `.container`
div inside. Cards use `var(--bg-card)` + `var(--border)` to adapt to both themes.

---

## Dark Mode

Implemented via `data-theme` attribute on `<html>`:
- **Default:** `dark` (set in HTML; overridden by `localStorage` or OS preference)
- Toggle button `#theme-toggle` persists preference to `localStorage` key `pm-theme`
- All colours swap via CSS custom properties — no JS class toggling on elements
- The **hero section** is always dark regardless of theme (deliberate design choice)
- Icon logic: sun icon shown in dark mode (→ switch to light); moon in light (→ switch to dark)

---

## Google Analytics

Measurement ID placeholder is `G-XXXXXXXXXX` in `HTML/index.html` (~line 14).

**TODO:** Replace both instances of `G-XXXXXXXXXX` with the real Measurement ID
from https://analytics.google.com → Admin → Data Streams → Web stream details.

---

## Netlify Form

The contact form uses Netlify's zero-config form detection (`data-netlify="true"`).

Setup checklist:
1. Deploy site to Netlify (drag-and-drop project folder or connect GitHub repo)
2. Netlify dashboard → **Forms** → `contact` form appears automatically after first submission
3. Set up **email notifications** under Forms → contact → Notifications
4. Optionally set `action="/HTML/thank-you.html"` on the form and create that page

**TODO items to fill in (search `TODO` in `HTML/index.html`):**
- Replace `hello@positivemisfits.com` with real business email
- Replace `(000) 000-0000` with real phone number
- Replace `Your City, State` with real location
- Replace all social media `href="#"` with real profile URLs (LinkedIn, Twitter, Instagram, GitHub)

---

## Image Placeholders

All placeholder images use `placehold.co` URLs.
Search `placehold.co` in `HTML/index.html` to find all 5 portfolio cards + 3 testimonial avatars.

**Logo:** add the actual PM logo PNG to `img/pm-logo.png`, then uncomment the `<img>` tags
in the nav and footer (search `TODO: Save your logo` in `HTML/index.html`).

---

## Visual Self-Review Workflow (Screenshot QA)

**Always run this process after any visual change.** Do not report a task as done
until at least 2 screenshot passes have confirmed no visible regressions.

### Setup (one-time)

```bash
cd scripts && npm install   # installs Puppeteer into scripts/node_modules/
```

### Taking screenshots

```bash
# 1. Start the dev server (if not already running)
python3 -m http.server 8000 &

# 2. Run the screenshot script
node scripts/screenshot.js
```

Output is written to `screenshots/<viewport>/<theme>/`:
- `full-page.png` — full scrollable page
- `hero.png`, `services.png`, `work.png`, `process.png`, `stats.png`,
  `testimonials.png`, `contact.png`, `footer.png` — each section individually

All three viewports (`desktop` 1440px · `tablet` 1024px · `mobile` 390px) are
captured in both `dark` and `light` themes automatically.

### The self-review loop

1. **Make changes** to `HTML/index.html`, `CSS/index.css`, or `JS/main.js`.

2. **Capture** — run `node scripts/screenshot.js` to regenerate all screenshots.

3. **Analyze** — read each affected screenshot with the Read tool and check every
   visual detail:
   - Spacing & padding — gaps between elements, section padding
   - Typography — font size, weight, line-height, letter-spacing
   - Colour — backgrounds, text, borders, gradients (match design tokens)
   - Layout — grid/flex alignment, column counts, wrapping behaviour
   - Effects — shadows, glassmorphism blur, gradient text, overlays
   - Responsive — stacking order at tablet/mobile, touch target sizes ≥ 44px
   - Dark vs light — all surface tokens swapping correctly, no hardcoded colours
   - Interactive states — hover styles visible where applicable

4. **Locate** the source of each issue:
   - Layout / colour / spacing → `CSS/index.css`
   - Markup / content / attributes → `HTML/index.html`
   - Behaviour / scroll / toggle → `JS/main.js`

5. **Fix every issue found.** Edit the minimum necessary. Do not refactor
   unrelated code.

6. **Re-capture** — run `node scripts/screenshot.js` again after fixes.

7. **Compare** — re-read the updated screenshots. List any remaining mismatches
   explicitly.

8. **Repeat steps 5–7** until no visible issues remain (within ~2–3 px /
   imperceptible colour delta).

9. **Report** what changed, grouped by: layout · typography · colour · spacing ·
   effects.

**Do not stop after one pass.** Always do a minimum of 2 comparison rounds.
Only stop when the screenshots look correct or the user says so.

### What counts as a bug (always fix)

| Category | Examples |
|---|---|
| Overflow | Horizontal scroll at any breakpoint; text clipping outside its container |
| Broken layout | Grid/flex items wrapping unexpectedly; columns collapsing at wrong breakpoint |
| Colour leak | A section using hardcoded colour instead of a `--` token; dark mode showing light bg |
| Missing content | A section or element invisible / zero height / off-screen |
| Typography | Wrong font weight loaded; gradient text (`-webkit-text-fill-color`) not applying |
| Form | Input fields not styled; select not themed; focus ring missing |
| Navigation | Nav not sticky; blur not rendering; hamburger not appearing on mobile |
| Floating cards | Hero float cards outside viewport; overlapping hero mockup |

---

## Architecture Notes

- Page layout uses **CSS Grid** for section-level layouts; flexbox for component-level
- Service card icon colours are set inline (intentional — each card has a unique gradient)
- Responsive breakpoints: `≤ 1024px` (tablet) and `≤ 640px` (mobile)
- Animation: AOS handles scroll entrance; floating hero cards use a CSS `@keyframes float` loop
- The project is in early prototype stage — all copy and portfolio items are placeholder

---

## Mobile-First Design Standard

- Touch targets minimum `44×44px`
- No horizontal scroll at any breakpoint
- Stack columns on mobile; expand to multi-column at `≥ 641px` and `≥ 1025px`
- Font sizes use `clamp()` for fluid scaling between breakpoints

## Animation Rules

- Only animate `transform` and `opacity` — never `width`, `height`, `top`, or `left`
- Respect `prefers-reduced-motion` (AOS handles this automatically)
- Durations: 150ms micro · 250ms standard · 400–650ms entrance

## Security Checklist (run on every code change)

- [ ] No hardcoded secrets, API keys, or PII
- [ ] No `eval()`, `new Function()`, or dynamic script injection
- [ ] External URLs validated before passing to `window.location`
- [ ] Netlify form honeypot (`bot-field`) preserved on any form changes
- [ ] GA ID stays in `index.html` only — never in `main.js` or external files
