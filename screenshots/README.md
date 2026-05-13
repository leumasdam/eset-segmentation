# Screenshots

Drop PNG files here matching these names (case-sensitive):

| Filename | Source | Notes |
|---|---|---|
| `01-hero-desktop.png` | `index.html` (top of page, ~1440px width) | Full hero with particle network. Ideálne mid-scan (HUD ukazuje SKENUJE %). |
| `02-pricing-cards.png` | `index.html` → "Pre domácnosti" tab → pricing cards | All 3 cards visible. Bonus: prejdi kurzorom nad Premium pre hover (animated border). |
| `03-biz-selector.png` | `index.html` → "Pre firmy" tab → biz selector | Najlepšie krok 2 (chips selectable) ALEBO výsledná result karta. |
| `04-trial-wizard.png` | `vybrat-plan.html` | Niektorý wizard krok alebo result obrazovka. |
| `05-compare-desktop.png` | `porovnat-baliky.html#firmy` | Business tab matrix (viac stĺpcov, vizuálne bohatšie ako Home tab). |
| `06-contact-modal.png` | Akákoľvek stránka → klik "Kontaktovať konzultanta" alebo footer "Kontakt" | Modal otvorený s prázdnym formom. |
| `07-mobile.png` | `index.html` v mobile mode (375px viewport) | Hero alebo pricing cards. |

## Ako odfotiť

**Chrome DevTools (full-page capture):**
1. F12 (otvor DevTools)
2. `Ctrl + Shift + P`
3. Napíš `screenshot`
4. Vyber **"Capture full size screenshot"**
5. PNG sa stiahne do Downloads

**Cropped (Windows Snipping Tool):**
1. `Win + Shift + S` → vyber oblasť → uloží do schránky
2. Paste do Paint/Snip and Sketch → Save As PNG

**Mobile responsive:**
1. F12 → device toolbar (Ctrl+Shift+M)
2. Nastav width na 375 (iPhone SE)
3. Capture full size screenshot

## Po pridaní

Daj vedieť keď máš PNG-čka tu — commitnem ich a updatnem `CASE_STUDY.md` s embedded image referenciami.

---

## Auto-regeneration via Puppeteer

Skript v `scripts/capture-screenshots.mjs` regeneruje všetkých 7 screenshotov automaticky cez headless Chrome. Používa deep-link triggery (`#firmy`, `#open-contact`) ktoré sú zabudované v `index.html`.

Spustenie (z koreňa repa):
```sh
# Jednorazovo doinštaluj puppeteer (~50 MB, sťahuje Chromium)
cd .. && npm install puppeteer --no-save

# Spusti capture
node eset-segmentation/scripts/capture-screenshots.mjs
```

Skript pre každý screenshot:
- Otvorí relevantnú URL (file:// — local capture, žiadny GH Pages deploy lag)
- Nastaví viewport (1440×900 default, 375×800 pre mobile)
- Capturuje konkrétny element (`.business-guide`, `.modal`, `.cards-grid`, ...) namiesto fullpage — čistejší framing
- Uloží PNG do `screenshots/`
