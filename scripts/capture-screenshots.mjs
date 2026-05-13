import puppeteer from 'puppeteer';

const ROOT = 'file:///C:/Users/samue/eset-segmentation';
const OUT = 'C:/Users/samue/eset-segmentation/screenshots';
const browser = await puppeteer.launch({ headless: 'new' });

async function shot(name, url, opts = {}) {
  const page = await browser.newPage();
  await page.setViewport({ width: opts.w || 1440, height: opts.h || 900 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  if (opts.scrollTo) await page.evaluate(s => document.querySelector(s)?.scrollIntoView({ block: 'start' }), opts.scrollTo);
  await new Promise(r => setTimeout(r, 600)); // animations + reveals
  if (opts.selector) {
    const el = await page.$(opts.selector);
    await el.screenshot({ path: `${OUT}/${name}.png` });
  } else {
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: opts.full });
  }
  console.log('Captured', name);
  await page.close();
}

// 01 — Hero (viewport)
await shot('01-hero-desktop', `${ROOT}/index.html`, { w: 1440, h: 900 });

// 02 — Pricing cards (just the .cards-grid)
await shot('02-pricing-cards', `${ROOT}/index.html`, { selector: '.cards-grid', scrollTo: '#plans' });

// 03 — Biz selector wizard
await shot('03-biz-selector', `${ROOT}/index.html#firmy`, { selector: '.business-guide' });

// 04 — Trial wizard (just the .wpanel)
await shot('04-trial-wizard', `${ROOT}/vybrat-plan.html`, { selector: '.wpanel' });

// 05 — Compare matrix (the .cmp-wrap on biz tab)
await shot('05-compare-desktop', `${ROOT}/porovnat-baliky.html#firmy`, { selector: '.cmp-pane.is-active .cmp-wrap', w: 1440, h: 1200 });

// 06 — Contact modal
await shot('06-contact-modal', `${ROOT}/index.html#open-contact`, { selector: '#contactModal .modal' });

// 07 — Mobile (full viewport)
await shot('07-mobile', `${ROOT}/index.html`, { w: 375, h: 800 });

await browser.close();
console.log('All done.');
