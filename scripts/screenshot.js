/**
 * screenshot.js — Visual QA tool for Positive Misfits static site
 *
 * Usage (from project root):
 *   cd scripts && npm install   # one-time setup
 *   node scripts/screenshot.js
 *
 * Requires the dev server to be running:
 *   python3 -m http.server 8000
 *
 * Output: ../screenshots/  (relative to this file)
 */

const puppeteer = require('puppeteer');
const path      = require('path');
const fs        = require('fs');

/* ── Config ─────────────────────────────────────────────────────── */
const BASE_URL   = 'http://localhost:8000/index.html';
const OUT_DIR    = path.resolve(__dirname, '..', 'screenshots');
const VIEWPORTS  = [
  { label: 'desktop', width: 1440, height: 900  },
  { label: 'tablet',  width: 1024, height: 768  },
  { label: 'mobile',  width: 390,  height: 844  },
];

/**
 * Sections to capture individually.
 * Each entry scrolls to the section ID, then takes a clipped screenshot.
 */
const SECTIONS = [
  'hero',
  'services',
  'work',
  'process',
  'stats',
  'testimonials',
  'contact',
  'footer',
];

/* ── Helpers ─────────────────────────────────────────────────────── */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function setTheme(page, theme) {
  await page.evaluate((t) => {
    document.documentElement.setAttribute('data-theme', t);
  }, theme);
  // Allow CSS transitions to settle
  await new Promise((r) => setTimeout(r, 400));
}

/**
 * Scroll through the full page so AOS triggers every section's entrance
 * animation, then scroll back to top and wait for all transitions to finish.
 */
async function triggerAOS(page) {
  await page.evaluate(async () => {
    const totalHeight = document.documentElement.scrollHeight;
    const step = 300;
    for (let pos = 0; pos < totalHeight; pos += step) {
      window.scrollTo(0, pos);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  // Wait for all AOS transitions (longest duration = 700ms) to fully complete
  await new Promise((r) => setTimeout(r, 800));
}

async function screenshotSection(page, sectionId, filePath) {
  const el = await page.$(`#${sectionId}`);
  if (!el) {
    console.warn(`  ⚠  Section #${sectionId} not found — skipping`);
    return;
  }
  // Scroll the section into view so AOS animations triggered by IntersectionObserver
  // have fully played before we capture. Without this, deep sections captured after
  // the initial page scroll-through can still have cards at opacity:0.
  await page.evaluate((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, sectionId);
  // Wait for the longest AOS animation (700ms) + any CSS transition to settle
  await new Promise((r) => setTimeout(r, 900));
  await el.screenshot({ path: filePath });
  console.log(`  ✓  ${path.basename(filePath)}`);
}

/* ── Main ────────────────────────────────────────────────────────── */
(async () => {
  ensureDir(OUT_DIR);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\n── ${vp.label} (${vp.width}×${vp.height}) ──────────────`);

      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height });

      for (const theme of ['dark', 'light']) {
        const themeDir = path.join(OUT_DIR, vp.label, theme);
        ensureDir(themeDir);

        await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
        await setTheme(page, theme);
        await triggerAOS(page);

        // ── Full page ──────────────────────────────────────────────
        const fullPath = path.join(themeDir, 'full-page.png');
        await page.screenshot({ path: fullPath, fullPage: true });
        console.log(`  ✓  ${vp.label}/${theme}/full-page.png`);

        // ── Per section ────────────────────────────────────────────
        for (const sectionId of SECTIONS) {
          const sectionPath = path.join(themeDir, `${sectionId}.png`);
          await screenshotSection(page, sectionId, sectionPath);
        }
      }

      await page.close();
    }
  } finally {
    await browser.close();
  }

  console.log(`\n✅  All screenshots saved to: ${OUT_DIR}\n`);
})();
