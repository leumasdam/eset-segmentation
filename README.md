# ESET – Kybernetická bezpečnosť | Redesign Prototype

Live: https://leumasdam.github.io/eset-segmentation/
Repo: https://github.com/leumasdam/eset-segmentation

**→ [Case Study](CASE_STUDY.md)** — design decisions, tech rationale, lessons learned

---

## Čo je toto

High-fidelity interaktívny prototyp redesignu ESET.com/sk — 7 stránok,
3 interaktívne flows (business selector, trial wizard, compare matrix),
vanilla HTML + CSS + JavaScript. Žiadne závislosti okrem Google Fonts (Inter).
Funguje offline aj online.

---

## Čo prototyp obsahuje

### Sekcie (zhora nadol)

  NAVBAR
  - Fixná navigácia s glassmorphism efektom (backdrop-filter blur)
  - Logo: eset-logo2.png (transparentné PNG, 526x89px)
  - CTA tlačidlo: ružová (#EA6CB1) — "Vyskúšať zadarmo"

  HERO
  - Canvas particle network — 68 bodov prepojených líniami
  - Scan line animácia — prechádza zhora nadol každých 6.5s
    → scan beam s echo líniou a tick marks
    → particles pulzujú keď ich scan linia prejde
    → dvojfarebná linka: tyrkys + ružová
  - Scan HUD — top right: INICIALIZÁCIA → SKENUJE (%) → BEZPEČNÉ / 0 HROZIEB
  - Shield watermark — SVG štít s trojitým obrysom + checkmark
  - Hero badge — "30 rokov na čele kybernetickej bezpečnosti"
  - Security award badges (eset-badges.png): AV-TEST, SE Labs AAA,
    AV-Comparatives Advanced+, Canalys Champion
  - Štatistiky: 99.9% detekcia, 11 R&D centier, 4.6★ Gartner

  PILL SWITCHER
  - "Pre domácnosti" / "Pre firmy" — prepína obsah nižšie
  - Progress shape: C-arc vľavo (ESET brand language)

  PRODUKTOVÉ KARTY (Pre domácnosti)
  - Essential / Premium / Ultimate
  - Premium (stredná): animovaný conic-gradient border — tyrkys → krimson
    → @property --angle + spin-border keyframe (CSS Houdini)
  - Glassmorphism: backdrop-filter blur(20px) saturate(160%)
  - Badge "NAJOBĽÚBENEJŠÍ" — červená pilulka nad kartou

  BUSINESS GUIDE (Pre firmy)
  - 4-krokový sprievodca výberom riešenia
  - CTA: 30-dňová skúšobná verzia + Kontakt konzultanta

  TRUST SEKCIA
  - 99.9% / 30+ / 100+ / 4.6★ štatistiky v mriežke
  - 3 zákaznícke recenzie (glassmorphism karty)
  - Progress shapes: U-krivka hore + quarter arc dole vpravo

  TRIAL BANNER
  - "Vyskúšajte ESET zadarmo" — 30 dní bez kreditky
  - Progress shape: rotovaná kapsula (ružová)

  FOOTER
  - 4 stĺpce, legal linky

---

## Farebná paleta (ESET Brand Colors 2023)

  Tyrkysová škála:
  --teal-heavy:  #004B55
  --teal-dark:   #00717F
  --teal-mid:    #0095A1
  --teal-bright: #00BBC5   ← primárna, CTA "Kúpiť teraz"
  --teal-light:  #87CFD3

  Akcentové:
  --crimson:       #D80B55  ← badge, akcia
  --crimson-light: #EA6CB1  ← sekundárne CTA, ružová
  --orange:        #FEAA3A  ← hviezdy
  --blue:          #00C0F2

  Neutrálne (tmavé pozadie):
  --dark:   #0A1823
  --dark-2: #0d1e2b
  --dark-3: #122432
  --text:   #F0F6F8

---

## Súborová štruktúra

  eset-prototype/
  ├── index.html          ← HTML štruktúra + JavaScript
  ├── eset-redesign.css   ← celý stylesheet (27 komentovaných sekcií)
  ├── eset-logo2.png      ← ESET logo (transparentné PNG)
  ├── eset-badges.png     ← security award badges
  └── README.md           ← tento súbor

---

## Technické detaily

  Canvas particle network (JS):
  - COUNT = 68 particles
  - LINK_DIST = 128px (max vzdialenosť pre spojenie líniou)
  - SPEED = 0.26 (rýchlosť pohybu)
  - SCAN_DUR = 6500ms (trvanie scanu)
  - HOLD_DUR = 1800ms (pauza "BEZPEČNÉ" na konci)
  - Farby: #00BBC5 (tyrkys) + #EA6CB1 (ružová) v pomere 4:2

  Animated border (CSS):
  - @property --angle (CSS Houdini)
  - conic-gradient(from var(--angle), transparent, #00BBC5, #D80B55, transparent)
  - Rotácia: 4s linear infinite

  Glassmorphism:
  - backdrop-filter: blur(20px) saturate(160-180%)
  - Funguje len s ambient orb vrstvou (#ambient, position:fixed, z-index:0)
  - Obsah má z-index:3, noise texture z-index:2

  Z-index architektúra:
  - 0: #ambient (orbs)
  - 1: hero dekorácie (shield, progress shapes)
  - 2: noise texture (body::before) + hero obsah
  - 3: všetky sekcie
  - 101: navbar

  Progress shapes (ESET brand language):
  - Pravidlo: každý tvar musí vykukovať von aspoň cez 2 okraje sekcie
  - Nikdy nesmie plávať celý viditeľný — vždy orezaný

---

## Ako spustiť lokálne

  git clone https://github.com/leumasdam/eset-prototype.git
  cd eset-prototype
  open index.html           # macOS
  start index.html          # Windows
  xdg-open index.html       # Linux

  # Alebo lokálny server (odporúčané pre backdrop-filter):
  python3 -m http.server 8000
  # → http://localhost:8000

---

## Ako pushnúť zmeny

  cd ~/eset-prototype
  git add .
  git commit -m "popis zmeny"
  git push

---

## Kontext projektu

Prototyp vytvorený s Claude Code (Anthropic) ako UX/UI redesign projekt.
Pôvodný web: https://www.eset.com/sk/
Nie je napojený na skutočný web ESET — osobný portfolio projekt.

Pozn: CSS je rozdelený do 27 číslovaných sekcií, každá s komentárom
vysvetľujúcim čo robí, čo možno meniť a s ktorými HTML prvkami je spätá.
