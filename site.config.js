/* ============================================================================
   Aether Awareness — site configuration (SINGLE SOURCE OF TRUTH)
   ----------------------------------------------------------------------------
   Edit THIS file to change prices, checkout links, or the signup endpoint.
   Nothing else needs to change. Loaded before js/main.js.

   Prices mirror the product catalog (aether-awareness/billing/plans.json):
   Companion $39.95/mo · $399/yr — Team $39.95/mo · $399/yr —
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
  signupEndpoint: "https://uqfwufprawgqxmhrksxn.supabase.co/functions/v1/early-access",
  contactEmail: "admin@aetherawareness.com",

  // The three editions. Names match checkout exactly (Companion/Team/
  // Governance); Signal/Colleague/Sovereign are the thematic badges.
  // NOTE: "Operator" is reserved for a future restricted tier (contractors /
  // cleared personnel) and must NEVER label a public edition.
  // Same trio in every edition — what changes is demeanor and duty.
  tiers: [
    {
      tierKey: "personal",
      name: "Companion",
      badge: "Signal",
      price: "$39.95",
      cadence: "/ month",
      blurb: "Trinity, Jade &amp; Zara as your own private circle — warm, present, and permanently yours.",
      model: "Your own single-owner instance · 1 seat",
      features: [
        "The full trio, shaped to <em>you</em> before first hello — tone, boundaries, crisis behavior",
        "Memory that never resets — across sessions, restarts, even model swaps",
        "Real follow-through: plans, reminders, documents kept in one sealed workspace folder — never the rest of your machine, never a shell",
        "Daily briefing, living Presence face, VR room, world globe &amp; health record included",
        "Warm and SFW by design — a friend, never a parasocial trap",
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
      price: "$39.95",
      cadence: "/ month",
      blurb: "The same trio in office demeanor — colleagues who learn your business and carry real work.",
      model: "Private team instance · 5 seats with roles",
      features: [
        "Trinity leads with quiet authority; Jade builds in a <strong>reversible workspace</strong>; Zara weighs the calls",
        "<strong>Learns your business at orientation</strong> — company, vocabulary, HR &amp; workflow — and stays synced",
        "<strong>Prepared briefings</strong>: daily, weekly &amp; monthly — written by the colleague YOU choose",
        "5 seats with owner / admin / member / viewer roles, shared memory, audit trail",
        "Same price as Companion — the difference is demeanor, not a bigger bill",
        "Professional &amp; SFW by design · Annual: $399/yr (2 months free)",
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
      blurb: "An executive intelligence layer, grounded in your documents, with a private GPU model on demand.",
      model: "Dedicated private model on demand · 25 seats",
      features: [
        "Counsel grounded in YOUR documents — says <strong>“no signal”</strong> instead of inventing numbers",
        "<strong>Dedicated private model</strong> — your own GPU instance, spun up on demand, released when idle, no API keys to manage · activated with onboarding",
        "Company Briefing + prepared briefings — workspace, knowledge, team, audit posture &amp; spend",
        "25 seats · full RBAC + auditor role + tamper-evident audit log · OIDC SSO on the near roadmap",
        "Built for the C-suite &amp; trading desk — sovereign, private, accountable",
        "Annual: $4,999/yr (2 months free) · air-gap / isolation by application",
      ],
      cta: "Request your instance",
      action: "signup",
      checkout: "",
      highlight: false,
    },
  ],

  // Launch note shown under the pricing grid (set to "" to hide).
  pricingNote:
    "Every edition is a private, single-tenant instance — your agents, your memory, your data, on infrastructure that answers to you. Inference is included at fair-use capacity, or bring your own key or GPU. Cancel anytime: chat suspends, nothing is deleted, and resubscribing restores everything exactly as you left it.",
};
