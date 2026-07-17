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
  // Governance); Signal/Colleague/Sovereign are the thematic badges.
  // NOTE: "Operator" is reserved for a future restricted tier (contractors /
  // cleared personnel) and must NEVER label a public edition.
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
      badge: "Colleague",
      price: "$59.95",
      cadence: "/ month",
      blurb: "A custom co-worker for your business — synced to how your company runs.",
      model: "Private team instance · 5 seats with roles",
      features: [
        "Sol, Cipher &amp; Sage — a working team of colleagues, not a chatbot",
        "<strong>Learns your business</strong> at orientation — company, vocabulary, HR &amp; workflow — and stays synced",
        "Hands-on with documents &amp; files in a <strong>reversible shared workspace</strong>",
        "Awareness dashboard: your systems + world signal, opt-in feeds",
        "Owner / admin / member / viewer roles, shared memory, audit trail",
        "Professional workplace demeanor · SFW by design · Annual: $599/yr (2 months free)",
      ],
      cta: "Request your instance",
      action: "signup",
      checkout: "",
      highlight: true,
    },
    {
      tierKey: "corporate",
      name: "Governance",
      badge: "Sovereign · Coming Soon",
      price: "$499.95",
      cadence: "/ month",
      blurb: "Coming soon — a sovereign executive intelligence layer on a dedicated private GPU instance, grounded in your documents.",
      model: "Dedicated private GPU instance · 25 seats · SSO-ready",
      features: [
        "Sterling, Reeve &amp; Quinn — counsel grounded in YOUR documents",
        "Says “no signal” instead of inventing numbers",
        "Full RBAC + auditor role + tamper-evident audit log",
        "OIDC/SSO-ready (Google / Microsoft / Okta), password fallback",
        "Dedicated private GPU instance provisioned per customer — built for CEOs &amp; trading desks",
        "Annual: $4,999/yr (2 months free) · air-gap by application",
      ],
      cta: "Join the list",
      action: "signup",
      checkout: "",
      highlight: false,
    },
  ],

  // Launch note shown under the pricing grid (set to "" to hide).
  pricingNote:
    "Every edition is a private, single-tenant instance — your agents, your memory, your data, on infrastructure that answers to you. Cancel anytime: chat suspends, nothing is deleted, and resubscribing restores everything exactly as you left it.",
};
