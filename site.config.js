/* ============================================================================
   Aether Awareness — site configuration (SINGLE SOURCE OF TRUTH)
   ----------------------------------------------------------------------------
   Edit THIS file to change prices, checkout links, or the signup endpoint.
   Nothing else needs to change. Loaded before js/main.js.

   Prices mirror the product catalog (aether-awareness/billing/plans.json):
   Companion $39.95/mo · $399/yr — Team $59.95/mo · $599/yr —
   Governance $499.95/mo · $4,999/yr. Change them together.

   CHECKOUT: while the billing host is not live yet, every tier uses
   action:"signup" (email capture — no lead is ever lost). When
   subscribe.aetherawareness.com is up, set action:"checkout" and
   checkout:"https://subscribe.aetherawareness.com/subscribe" per tier.
   ========================================================================== */
window.AETHER_CONFIG = {

  // Where "request access" email signups go.
  //  • Leave "" for launch-capture mode (stores locally + opens a prefilled
  //    email to contactEmail so no signup is ever lost).
  //  • Or set a Formspree/Supabase/gateway URL that accepts POST {email}.
  signupEndpoint: "",
  contactEmail: "admin@aetherawareness.com",

  // The three editions. Names match checkout exactly (Companion/Team/
  // Governance); Signal/Operator/Sovereign are the thematic badges.
  tiers: [
    {
      tierKey: "personal",
      name: "Companion",
      badge: "Signal",
      price: "$39.95",
      cadence: "/ month",
      blurb: "A private companion trio that is genuinely yours.",
      model: "Your own single-owner instance · 1 seat",
      features: [
        "Mira, Atlas &amp; Echo — shaped to you before first hello",
        "Persistent memory that never resets between sessions",
        "Runs on <strong>your own private instance</strong> — nobody else on your box",
        "Life-ops tools: memory, lookups, to-dos — <strong>never</strong> your files or shell",
        "Warm and SFW by design — a friend, not a parasocial trap",
        "Annual: $399/yr (2 months free) · cancel anytime, memory preserved",
      ],
      cta: "Request your instance",
      action: "signup",
      checkout: "",
      highlight: false,
    },
    {
      tierKey: "coworker",
      name: "Team",
      badge: "Operator",
      price: "$59.95",
      cadence: "/ month",
      blurb: "A builder's crew on tap — lead, operator, analyst.",
      model: "Private team instance · 5 seats with roles",
      features: [
        "Sol, Cipher &amp; Sage — a working team, not a chatbot",
        "Cipher runs shell &amp; edits files in a <strong>reversible workspace jail</strong>",
        "Awareness dashboard: system + world signal, opt-in feeds",
        "Owner / admin / member / viewer roles, shared memory, audit trail",
        "Bring your own model — local GGUF or any frontier API",
        "Annual: $599/yr (2 months free)",
      ],
      cta: "Request your instance",
      action: "signup",
      checkout: "",
      highlight: true,
    },
    {
      tierKey: "corporate",
      name: "Governance",
      badge: "Sovereign",
      price: "$499.95",
      cadence: "/ month",
      blurb: "An executive intelligence layer, grounded in your documents.",
      model: "Dedicated sovereign VM · 25 seats · SSO-ready",
      features: [
        "Sterling, Reeve &amp; Quinn — counsel grounded in YOUR documents",
        "Says “no signal” instead of inventing numbers",
        "Full RBAC + auditor role + tamper-evident audit log",
        "OIDC/SSO-ready (Google / Microsoft / Okta), password fallback",
        "Dedicated VM, long context, priority support",
        "Annual: $4,999/yr (2 months free) · air-gap by application",
      ],
      cta: "Talk to us",
      action: "signup",
      checkout: "",
      highlight: false,
    },
  ],

  // Launch note shown under the pricing grid (set to "" to hide).
  pricingNote:
    "Every edition is a private, single-tenant instance — your agents, your memory, your data, on infrastructure that answers to you. Cancel anytime: chat suspends, nothing is deleted, and resubscribing restores everything exactly as you left it.",
};
