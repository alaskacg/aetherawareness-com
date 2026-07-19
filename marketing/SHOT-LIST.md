# Aether Awareness — Director's Shot List (2026-07-19)

Everything the site and the three promo videos need, as specific captures.
**You record raw. I do all post** — trimming, grading, compression, posters,
captions, stills extraction, and wiring into the site (ffmpeg is on the box).
Don't edit anything; don't speed anything up; retakes are cheap, just roll again.

## How to hand it back
1. Record each shot below; name the file **exactly** `<ID>_raw` (any container:
   .mkv/.mp4/.mov — OBS default is fine).
2. Drop everything in one folder (e.g. `~/aa-captures/`), plus a `notes.txt`
   with anything I should know ("take 2 is the good one", "VR clip has my voice
   at 0:40 — cut it").
3. Tell me where the folder is. I take it from there — each finished asset
   lands in `assets/media/<ID>.mp4` + poster, I flip its switch in
   `media.config.js`, and the "See it running" tour + hero footage light up
   on the live site. Nothing renders until then; the site hides the whole
   section while it's empty.

## Global staging rules (read once, apply to every shot)
- **Instance:** record a **freshly-provisioned demo instance built from the
  shipped customer packs** — Companion pack for personal shots, Team/Governance
  pack for office shots. Two reasons: (a) honesty — the tour's on-page claim is
  "the same build a customer receives"; (b) privacy — your live instance and
  its memory stay entirely off camera. **Never record your own instance.**
- **Demo identities:** owner **"Jordan Hale"** (jordan@northlight.example),
  company **"Northlight Trading Co."** for Team/Governance. If you seed demo
  memory/docs before recording, keep it in that fiction (I can write you a
  seeding script of ~10 memories + 4 workspace docs — say the word).
- **Never on screen:** real API keys, real emails, `.env` contents, your
  Signal/health/data, anything Neo-personal. If a config page must appear,
  demo placeholders only.
- **Display:** 1920×1080 minimum (2560×1440 preferred), browser at 100–110%
  zoom, dark theme, bookmarks bar hidden, clean desktop behind, OS notifications
  off (Do Not Disturb ON).
- **OBS:** 60 fps, high quality (CRF 16–18 or ≥40 Mbps), display or window
  capture. **Mic OFF** for UI captures — I add sound design. The only shots
  that need system/product audio are marked **⟨sound⟩**.
- **Pacing:** move the cursor like a calm human. Pause a beat after each
  result lands so I have cut room. If you fumble, keep rolling — restart the
  action; I'll use the clean pass.
- **Length:** minimums below are for the loop/cut; longer is always fine.

Priorities: **P1 = lights the site** (hero + all five tour chapters + the
signature proof). **P2 = fills it out.** **P3 = nice-to-have.** A P1-only
session is maybe 90 minutes including staging.

---

## P1 — the eight that light the site

### `hero-loop` — the front-door capture (P1)
- **Proves:** memory → governed action, in one breath. This replaces the hand-drawn
  hero mock with the real thing, same frame.
- **Surface:** Construct console (chat), Companion demo instance.
- **Setup:** seed one memory earlier in the session: tell Trinity about a
  sister's Saturday visit and the cooking plan (mirror the current hero mock so
  the copy stays true: lemon pasta, thesis stress, phones in the drawer).
- **Action:** ① type "What did I tell you about my sister's visit?" → she
  answers with the specifics ② type "Put the prep on my board." → the tool-call
  chip appears → confirmation lands.
- **Duration:** one clean 25–45s pass. I'll loop-cut ~15s from it.
- **Notes:** this one is worth two takes; it's the first thing every visitor sees.

### `memory-recall` — cold recall, days later (P1)
- **Proves:** Continuum. The "never re-introduce yourself" claim on film.
- **Surface:** Construct chat.
- **Setup:** ideally seed a distinctive fact **the day before** (a project
  name, a preference, a person). The staleness is the proof — the recording
  should visibly be a *new session*.
- **Action:** ① open a fresh session (show that: new/empty thread) ② ask
  "what do you remember about ⟨the thing⟩?" ③ she answers specifically
  ④ optional: open the memory file in the workspace viewer and scroll it slowly
  for 5s — the physical file is a great beat.
- **Duration:** 30–60s.

### `model-swap-persist` — THE signature proof (P1, the money shot)
- **Proves:** "swap the brain, the being persists." Nobody else can film this.
- **Surface:** Construct chat + the model Switchboard/patch-bay surface.
- **Setup:** demo instance with two lanes registered (e.g. local model +
  hosted API lane). Mid-conversation state: 3–4 messages of a distinct thread
  going (use the Northlight fiction).
- **Action:** ① ask her something that references the running thread — answer
  arrives ② open the patch-bay, visibly select the OTHER brain, swap ③ back to
  chat: "still with me? where were we?" ④ she continues the thread, same
  persona, memory intact.
- **Duration:** 60–90s. Do NOT trim the swap wait — the honest pause is
  credibility. ⟨narrated in tour: plays in the lightbox with controls⟩
- **Notes:** if the model names on screen are ones you don't want public,
  tell me in notes.txt and I'll blur the labels in post.

### `presence-face` — she speaks ⟨sound⟩ (P1)
- **Proves:** presence is a face and a voice, not a text box.
- **Surface:** Living Presence face.
- **Setup:** desktop audio capture ON (product voice). Pick a line that isn't
  saccharine — e.g. ask "give me tomorrow in one sentence" and let her answer.
- **Action:** face idle 3s → speaks the line → settles. 
- **Duration:** 15–30s.
- **Notes:** capture at the face's natural window size; don't stretch it.

### `jade-workspace` — governed hands + the revert (P1)
- **Proves:** real document work AND reversibility — the jail as a feature.
- **Surface:** Construct + workspace document window (Team demo).
- **Action:** ① ask Jade to draft "Northlight — Q3 supplier shortlist" →
  file appears in the workspace pane ② ask for an edit ("add a risks section")
  → visible diff/update ③ **revert that change** through the UI ④ hold 2s on
  the restored doc.
- **Duration:** 45–90s.

### `briefing-daily` — the daily brief (P1)
- **Proves:** briefings from the instance's own signal, honestly grounded.
- **Surface:** briefing page/card, Companion or Team demo with a day of seeded
  activity (so the brief has real content — no empty brief on camera).
- **Action:** open the brief → unhurried scroll top to bottom → pause on the
  "no signal" line if one section honestly says so (that line is a *selling
  point* — don't avoid it).
- **Duration:** 20–40s.

### `claim-flow` — mint → claim → burned (P1)
- **Proves:** ownership begins at the front door; the link that dies.
- **Surface:** claim link email/URL + claim page + post-claim landing.
- **Setup:** mint a fresh claim link for the demo owner.
- **Action:** ① open the claim link ② choose a password (type a THROWAWAY —
  it's on camera; I'll also blur the field in post) ③ land inside the instance
  ④ **go back and open the same link again → the burned/expired state.** That
  second visit is the whole shot.
- **Duration:** 30–60s. ⟨narrated in tour⟩

### `consult` — three minds, one answer (P1)
- **Proves:** multi-mind consult with credited disagreement.
- **Surface:** Construct consult flow (Team demo).
- **Action:** ask one genuinely two-sided question ("Should Northlight renew
  the Fairbanks warehouse lease or go month-to-month?") → three perspective
  answers render → Trinity's synthesis, disagreement visibly credited.
- **Duration:** 45–75s. Let all three answers finish before the synthesis.

---

## P2 — depth and breadth

### `construct-vr` — the room ⟨headset capture⟩ (P2)
- **Surface:** VR Construct in-headset (Quest recorder is fine at its native
  format — I'll frame it). Panels, rays, grab-a-panel, 5s of the 3D keyboard
  typing a short message, send, response lands in-room.
- **Duration:** 40–90s raw. If headset capture is a hassle, record the desktop
  fallback at /construct-vr as `construct-vr_raw` and note it.

### `globe` (P2)
- Globe spin (slow, half-turn max) → click a city → facts card opens →
  (if opted-in) weather appears. 15–25s.

### `briefing-prepared` — the preparer picker (P2)
- Team/Governance demo: ① the config where you choose which colleague prepares
  weekly ② a finished weekly brief open, visibly in that persona's voice
  (byline/tone). Two short clips are fine (`briefing-prepared_raw_a/_b`). 30–45s total.

### `audit-roles` (P2)
- ① seats & roles screen (demo names) ② audit trail scrolling — including the
  entry from your `jade-workspace` doc edit if same session (receipts of a real
  action!) ③ revoke a session live. 30–45s.

### `dedicated-gpu` — Governance's private brain (P2)
- **Surface:** Governance briefing page, dedicated-model card.
- **Setup:** run the control plane in **mock backend** mode (rehearsal path) —
  the UI states are the real shipped states.
- **Action:** spin up → warming → live → (later) release. If the wait is long,
  keep rolling; I'll time-compress WITH a visible timestamp so it stays honest.
- **Duration:** whatever it takes; I cut to ~25s.

### `orientation` — shaped before first hello (P2)
- Questionnaire quick path: 4–6 screens answered in the Northlight fiction —
  tone picker, boundaries, briefing schedule, company basics → the "compiling
  your trio" / completion moment. 45–90s; I'll montage it.

### `health-record` (P2)
- **Setup:** DO NOT use your real export. I'll generate a synthetic
  Apple-Health-style export file first — ask me when you get here.
- **Action:** import the file → trends render → scroll a year+ of synthetic
  history. 30–45s.

---

## P3 — if the day is going well

### `constellation` (P3) — the instance map: hover, zoom, one node opened. 10–20s.
### `readiness` (P3) — /api/readiness board all-green. A clean STILL is enough (full-window screenshot, PNG).
### `compaction-moment` (P3) — if you can catch it: context meter high → self-compaction runs → thread continues. This is the hardest to stage; skip unless it happens naturally while recording other shots.

---

## The logo sting — record my page, get video AND audio in one pass
I built a self-contained, code-drawn ident at **`assets/logo-sting.html`**
(also live at `https://aetherawareness.com/assets/logo-sting.html`):
rings draw in → lock with a chime → signal-dot flare → wordmark resolves.
The audio is synthesized in the page (sub swell, lock chime, air shimmer) —
**no DAW needed.**

**To record `logo-sting_raw`:** open the page in a clean fullscreen browser
window (press **F**), press **H** to hide the help, set OBS to capture the
window **plus desktop audio**, roll, press **R**, let it run 6s, hold one
extra second. Do 3 takes back to back in one file. That's it — I'll master
loudness and tails in post. (Want different timing/notes in the chime? Tell
me — it's ~20 lines to retune.)

---

## The three explainer videos (your voice)
Scripts are rewritten and claims-safe in **`marketing/video-scripts.md` (v2)** —
the old free-tier/Grok scripts are gone; don't shoot from memory of them.
- Record VO only (close mic, quiet room, ~145 wpm, each script twice).
  Name them `vo-script1_raw.wav` etc. **All picture comes from the captures
  above** — you never need to film anything physical.
- The only new visual they need is the cold-open "re-introducing yourself"
  montage (Script 1): 3–4 quick screen recordings of typing "As I mentioned
  before…" style lines into any generic chat UI — 5s each, `reintro-a/b/c_raw`.

## What's on me once the folder lands
Trim/grade/loop-cut every clip · compress (mp4 + webm) · posters · blur passes
(password field, any model labels you flag) · captions/transcripts for the
narrated pieces · stills for OG/social from your frames · wire everything into
media.config.js and ship the tour · assemble the three promos and the 30s
vertical from your VO + these captures · synthetic health export + demo-data
seeding script whenever you want them.
