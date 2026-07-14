/* ============================================================================
   Aether Awareness — site configuration (SINGLE SOURCE OF TRUTH)
   ----------------------------------------------------------------------------
   Edit THIS file to change prices, Stripe links, or the signup endpoint.
   Nothing else needs to change. Loaded before js/main.js.
   ========================================================================== */
window.AETHER_CONFIG = {

  // Where the "Start free" email signups go.
  //  • Leave "" to run in launch-capture mode (stores locally + opens a prefilled
  //    email to hello@aetherawareness.com so no signup is ever lost).
  //  • Set to a Formspree/Supabase/your-gateway URL that accepts POST {email}.
  signupEndpoint: "",
  contactEmail: "hello@aetherawareness.com",

  // The three tiers. `tierKey` maps to the subscriber gateway (free/standard/premium).
  // PRICES ARE PLACEHOLDERS — set them to your real numbers before launch.
  tiers: [
    {
      tierKey: "free",
      name: "Signal",
      badge: "Start here",
      price: "$0",
      cadence: "forever",
      blurb: "A private, remembering AI — free, no card.",
      model: "Llama 3.3 70B",
      persona: "Aether Guide",
      features: [
        "Persistent Continuum memory",
        "Aether Guide persona",
        "Private &amp; isolated to you",
        "Up to 5 messages / minute",
        "Standard response length",
      ],
      cta: "Start free",
      action: "signup",          // opens the email signup
      highlight: false,
    },
    {
      tierKey: "standard",
      name: "Operator",
      badge: "Most popular",
      price: "$19",              // <-- SET YOUR PRICE
      cadence: "/ month",
      blurb: "Frontier intelligence that works ahead of you.",
      model: "Grok 4.5 (frontier)",
      persona: "All personas",
      features: [
        "Everything in Signal",
        "Frontier model — Grok 4.5",
        "<strong>Proactive</strong> intelligence",
        "Guide, Analyst &amp; Companion personas",
        "6× the throughput, longer answers",
      ],
      cta: "Go Operator",
      action: "checkout",        // opens Stripe
      checkout: "https://donate.stripe.com/fZuaEQbUmb4ra2aaXo6J203",
      highlight: true,
    },
    {
      tierKey: "premium",
      name: "Sovereign",
      badge: "Private model",
      price: "$49",              // <-- SET YOUR PRICE
      cadence: "/ month",
      blurb: "Our own private model, on infrastructure we control.",
      model: "Aether private model",
      persona: "All personas",
      features: [
        "Everything in Operator",
        "Aether's private custom model",
        "Highest limits — 120 msg / min",
        "Longest context &amp; responses",
        "Priority secure-GPU lane",
      ],
      cta: "Go Sovereign",
      action: "checkout",
      checkout: "https://donate.stripe.com/fZuaEQbUmb4ra2aaXo6J203",
      highlight: false,
    },
  ],

  // Launch note shown under the pricing grid (set to "" to hide).
  pricingNote:
    "Founding-member launch pricing. Cancel anytime. Your data is never sold or used to train other models.",
};
