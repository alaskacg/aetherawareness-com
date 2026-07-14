# Aether Awareness — launch site

Marketing + signup site for **[Aether Awareness](https://aetherawareness.com)**: private,
single-tenant AI instances — three companions with persistent memory, owned identity, and
governed autonomy, in three editions (Companion / Team / Governance). Static, zero-build,
self-contained (no external requests, no trackers), served by GitHub Pages.

```
aetherawareness-com/
├── index.html          # the page: manifesto, capabilities, editions, FAQ
├── terms.html          # Terms of Service
├── privacy.html        # Privacy Policy
├── site.config.js      # ← EDIT THIS: prices, checkout links, signup endpoint
├── css/style.css       # dark "signal intelligence" theme
├── js/main.js          # hero field, pricing render, signup handling
├── assets/             # favicon.svg, og-card (social preview)
├── CNAME               # custom domain for GitHub Pages
└── marketing/
    └── video-scripts.md  # 3 launch video scripts (90–120s)
```

## Editing

Everything you'd routinely change lives in **`site.config.js`**:

1. **Prices** — mirror the product catalog: Companion **$39.95/mo · $399/yr**, Team
   **$59.95/mo · $599/yr**, Governance **$499.95/mo · $4,999/yr**.
2. **Checkout** — while the billing host is pre-launch every tier uses `action:"signup"`
   (email capture; no lead is lost). When checkout goes live, set `action:"checkout"` and
   `checkout:"https://subscribe.aetherawareness.com/subscribe"` per tier.
3. **Signup destination** — `signupEndpoint`: leave `""` for launch-capture mode
   (localStorage + prefilled mail to `contactEmail`), or point it at any POST endpoint
   that accepts `{ "email": "..." }`.

## Run locally

```bash
python3 -m http.server 4310   # open http://localhost:4310
```

## Deploy

Pushed `main` deploys automatically via GitHub Pages (custom domain in `CNAME`,
DNS A/AAAA records at the registrar point to GitHub Pages).

## Social card

`assets/og-card.png` (1200×630) is rendered from `assets/og-card.html`:

```bash
google-chrome --headless --disable-gpu --window-size=1200,630 \
  --screenshot=assets/og-card.png "file://$PWD/assets/og-card.html"
```

## Honesty guardrails (keep these true in all copy)

Claims stay to what the product does: persistent memory that survives sessions and model
swaps, single-tenant isolation (never pooled, never trained on), personalized agent trios
("souls"), per-edition capability molds (Companion: no file/shell access; Team: reversible
workspace jail; Governance: audit + SSO-ready), bring-your-own-model, cancel-preserves-data.
Do **not** claim device monitoring, account reading, uptime guarantees, or romance.
