/* ============================================================================
   Aether Awareness — media manifest (SINGLE SOURCE OF TRUTH for the tour)
   ----------------------------------------------------------------------------
   Each slot maps to ONE capture from marketing/SHOT-LIST.md. Workflow:
     1. Record the raw capture named <id>_raw.* per the shot list.
     2. Hand the folder over; post-production produces assets/media/<id>.mp4
        (+ .webm) and a poster assets/media/<id>.jpg.
     3. Flip ready:true here. That is the ONLY switch — nothing renders,
        no nav link appears, and no 404s are probed while ready:false.

   kind:      "video" | "image"
   ambient:   muted, loops, autoplays when scrolled into view (UI b-roll)
   narrated:  opens in the lightbox with sound + controls (voice/product audio)
   chapter:   memory | presence | hands | counsel | ownership
   ========================================================================== */
window.AETHER_MEDIA = {

  chapters: [
    { key: "memory",    label: "Memory",    blurb: "Continuum — it remembers, and survives the brain swap." },
    { key: "presence",  label: "Presence",  blurb: "A face, a voice, a room — not a text box." },
    { key: "hands",     label: "Hands",     blurb: "Jade works — inside one sealed, reversible folder." },
    { key: "counsel",   label: "Counsel",   blurb: "Briefings and consults, grounded in your real signal." },
    { key: "ownership", label: "Ownership", blurb: "Claim it, hold the keys, audit everything." },
  ],

  slots: [
    /* ---- special placements (not in the chapter grid) ---- */
    { id: "hero-loop", chapter: null, kind: "video", ambient: true, ready: false,
      src: "assets/media/hero-loop.mp4", poster: "assets/media/hero-loop.jpg",
      caption: "Live capture — a Companion instance recalling context, then writing the plan through a governed tool call." },

    /* ---- memory ---- */
    { id: "memory-recall", chapter: "memory", kind: "video", ambient: true, ready: false,
      src: "assets/media/memory-recall.mp4", poster: "assets/media/memory-recall.jpg",
      caption: "Asked cold, days later — the instance answers from durable memory, no re-introduction." },
    { id: "model-swap-persist", chapter: "memory", kind: "video", narrated: true, ready: false,
      src: "assets/media/model-swap-persist.mp4", poster: "assets/media/model-swap-persist.jpg",
      caption: "The signature proof: the brain is swapped mid-conversation — and the being persists, memory intact." },
    { id: "compaction-moment", chapter: "memory", kind: "video", ambient: true, ready: false,
      src: "assets/media/compaction-moment.mp4", poster: "assets/media/compaction-moment.jpg",
      caption: "Context fills — so the agents compact their own memory instead of forgetting you." },

    /* ---- presence ---- */
    { id: "presence-face", chapter: "presence", kind: "video", narrated: true, ready: false,
      src: "assets/media/presence-face.mp4", poster: "assets/media/presence-face.jpg",
      caption: "The living Presence face, speaking — sound on." },
    { id: "construct-vr", chapter: "presence", kind: "video", ambient: true, ready: false,
      src: "assets/media/construct-vr.mp4", poster: "assets/media/construct-vr.jpg",
      caption: "Through the headset: panels, rays, and a 3D keyboard — your instance as a room." },
    { id: "globe", chapter: "presence", kind: "video", ambient: true, ready: false,
      src: "assets/media/globe.mp4", poster: "assets/media/globe.jpg",
      caption: "The world globe — offline facts, opt-in weather, one gesture from chat." },
    { id: "constellation", chapter: "presence", kind: "video", ambient: true, ready: false,
      src: "assets/media/constellation.mp4", poster: "assets/media/constellation.jpg",
      caption: "The constellation map — your own instance, seen from above." },

    /* ---- hands ---- */
    { id: "jade-workspace", chapter: "hands", kind: "video", ambient: true, ready: false,
      src: "assets/media/jade-workspace.mp4", poster: "assets/media/jade-workspace.jpg",
      caption: "Jade drafts, edits — then the change is reverted with one click. Power inside a sealed, reversible folder." },
    { id: "health-record", chapter: "hands", kind: "video", ambient: true, ready: false,
      src: "assets/media/health-record.mp4", poster: "assets/media/health-record.jpg",
      caption: "A watch export becomes a perpetual body record — trends that outlive every gadget." },

    /* ---- counsel ---- */
    { id: "briefing-daily", chapter: "counsel", kind: "video", ambient: true, ready: false,
      src: "assets/media/briefing-daily.mp4", poster: "assets/media/briefing-daily.jpg",
      caption: "The daily brief — composed from the instance's own signal, never invented." },
    { id: "briefing-prepared", chapter: "counsel", kind: "video", ambient: true, ready: false,
      src: "assets/media/briefing-prepared.mp4", poster: "assets/media/briefing-prepared.jpg",
      caption: "Prepared briefings — you choose the colleague; the brief arrives in their voice." },
    { id: "consult", chapter: "counsel", kind: "video", ambient: true, ready: false,
      src: "assets/media/consult.mp4", poster: "assets/media/consult.jpg",
      caption: "One question, three minds — disagreement credited, then one synthesized answer." },
    { id: "dedicated-gpu", chapter: "counsel", kind: "video", ambient: true, ready: false,
      src: "assets/media/dedicated-gpu.mp4", poster: "assets/media/dedicated-gpu.jpg",
      caption: "Governance: a dedicated private model spins up on demand — and releases when idle." },

    /* ---- ownership ---- */
    { id: "claim-flow", chapter: "ownership", kind: "video", narrated: true, ready: false,
      src: "assets/media/claim-flow.mp4", poster: "assets/media/claim-flow.jpg",
      caption: "The claim link: opened once, password chosen, link burned. The keys are handed over, not held for you." },
    { id: "orientation", chapter: "ownership", kind: "video", ambient: true, ready: false,
      src: "assets/media/orientation.mp4", poster: "assets/media/orientation.jpg",
      caption: "Orientation — shaped to you before the first hello, compiled from your answers." },
    { id: "audit-roles", chapter: "ownership", kind: "video", ambient: true, ready: false,
      src: "assets/media/audit-roles.mp4", poster: "assets/media/audit-roles.jpg",
      caption: "Seats, roles, and a trail of receipts — every consequential action, on the record." },
    { id: "readiness", chapter: "ownership", kind: "image", ready: false,
      src: "assets/media/readiness.jpg",
      caption: "The readiness board — every subsystem checked end-to-end, green before handoff." },
  ],
};
