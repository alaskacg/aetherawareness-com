# Aether Awareness — launch site

Marketing + signup site for **Aether Awareness**: a private, persistent, proactive AI
with three tiers (Free / Standard / Premium). Static, zero-build, deploys anywhere.

```
aetherawareness-com/
├── index.html          # the page (SEO + Open Graph for the X launch card)
├── site.config.js      # ← EDIT THIS: prices, Stripe links, signup endpoint
├── css/style.css       # committed dark "signal intelligence" theme
├── js/main.js          # hero field, pricing render, signup handling
├── assets/             # favicon.svg, og-card (social preview)
└── marketing/
    └── video-scripts.md  # 3 launch video scripts (90–120s)
```

## Before launch — the two things to set

Everything you'd change lives in **`site.config.js`**:

1. **Prices** — `tiers[].price` are placeholders (`$19`, `$49`). Set your real numbers.
2. **Checkout links** — `tiers[].checkout` currently point at the existing Stripe
   pay-what-you-want link. Swap for your fixed recurring Stripe Checkout / Payment Link
   per tier. (These map to the subscriber gateway tiers `free` / `standard` / `premium`.)
3. **Signup destination** — `signupEndpoint`:
   - Leave `""` for **launch-capture mode**: emails are stored in `localStorage` and a
     prefilled mail to `contactEmail` opens, so no signup is ever lost pre-backend.
   - Or set it to a POST endpoint (Formspree, a Supabase Edge Function, or the subscriber
     gateway's provisioning webhook) that accepts `{ "email": "..." }`.

## Run locally

```bash
cd aetherawareness-com
python3 -m http.server 4310
# open http://localhost:4310
```

## Deploy

It's pure static files — host on any of:
- **Cloudflare Pages / GitHub Pages / Netlify** — point at this repo, build command: none,
  output dir: `/` (root).
- Drop behind the same Cloudflare tunnel you use for the app.

Add the custom domain (`aetherawareness.com`) in your host's dashboard, or commit a
`CNAME` file with `aetherawareness.com` for GitHub Pages.

## Social card

`index.html` references `assets/og-card.png` (1200×630) for the X/Twitter/Open Graph
preview. Regenerate it from `assets/og-card.html` if you tweak branding
(open it and screenshot at 1200×630, or use any HTML-to-image tool).

## Honesty guardrails (keep these true in all copy)

The product is a **private, remembering, proactive assistant**. Claims stay to: persistent
memory (Continuum), privacy/isolation (never sold, never trains other models), proactivity,
personas, and real frontier models. Do **not** claim it monitors devices or reads accounts.
