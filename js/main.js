/* ============================================================================
   Aether Awareness — site behavior.
   Everything here is an ENHANCEMENT. The page is complete and readable with
   this file absent or broken: nothing is hidden except behind classes this
   file adds itself, and the funnel (pricing render, signup) fails soft.
   ========================================================================== */
(function () {
  "use strict";
  var CFG = window.AETHER_CONFIG || { tiers: [], pricingNote: "" };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;

  /* ---- year ---- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- render pricing from config (single source of truth) ---- */
  function renderPricing() {
    var grid = document.getElementById("pricing-grid");
    if (!grid) return;
    grid.innerHTML = CFG.tiers.map(function (t) {
      var feats = (t.features || []).map(function (f) { return "<li>" + f + "</li>"; }).join("");
      var btnClass = t.highlight ? "btn btn-primary" : "btn";
      return '' +
        '<div class="tier' + (t.highlight ? " highlight" : "") + '">' +
          (t.badge ? '<span class="badge">' + t.badge + "</span>" : "") +
          '<div class="tname">' + t.name + "</div>" +
          '<div class="blurb">' + (t.blurb || "") + "</div>" +
          '<div class="price"><span class="amt">' + t.price + '</span><span class="cad">' + (t.cadence || "") + "</span></div>" +
          '<div class="model">' + (t.model || "") + "</div>" +
          "<ul>" + feats + "</ul>" +
          '<button class="' + btnClass + '" data-action="' + t.action + '" data-checkout="' +
            (t.checkout || "") + '" data-tier="' + t.tierKey + '">' + t.cta + "</button>" +
        "</div>";
    }).join("");

    var note = document.getElementById("pricing-note");
    if (note) note.textContent = CFG.pricingNote || "";

    grid.querySelectorAll("button[data-action]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.dataset.action === "checkout" && b.dataset.checkout) {
          window.open(b.dataset.checkout, "_blank", "noopener");
        } else {
          // signup → scroll to the email capture and focus it
          document.querySelector(".band").scrollIntoView({ behavior: "smooth" });
          setTimeout(function () { var e = document.getElementById("signup-email"); if (e) e.focus(); }, 500);
        }
      });
    });
    spotlight(grid.querySelectorAll(".tier"));
  }
  renderPricing();

  /* ---- signup ---- */
  var form = document.getElementById("signup-form");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var email = (document.getElementById("signup-email").value || "").trim();
      var msg = document.getElementById("signup-msg");
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        msg.className = "msg err"; msg.textContent = "Please enter a valid email address."; return;
      }
      if (CFG.signupEndpoint) {
        msg.className = "msg"; msg.textContent = "Adding you…";
        fetch(CFG.signupEndpoint, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, source: "aetherawareness.com" }),
        }).then(function (r) {
          if (r.ok) { done(msg, email); }
          else { msg.className = "msg err"; msg.textContent = "Something went wrong — email " + CFG.contactEmail + " and we'll add you."; }
        }).catch(function () { fallback(msg, email); });
      } else {
        // Launch-capture mode: never lose a signup even before the backend is wired.
        fallback(msg, email);
      }
    });
  }
  function done(msg, email) {
    msg.className = "msg ok"; msg.textContent = "You're on the list — we'll reach out to shape your instance.";
    try { form.reset(); } catch (e) {}
  }
  function fallback(msg, email) {
    // Persist locally + open a prefilled email so the lead is captured pre-backend.
    try {
      var list = JSON.parse(localStorage.getItem("aa_signups") || "[]");
      list.push({ email: email, at: Date.now() });
      localStorage.setItem("aa_signups", JSON.stringify(list));
    } catch (e) {}
    msg.className = "msg ok";
    msg.innerHTML = "You're on the list! To confirm, we've opened a quick email — just hit send.";
    var subj = encodeURIComponent("Aether Awareness — early access");
    var body = encodeURIComponent("I'd like early access. My email: " + email);
    window.location.href = "mailto:" + (CFG.contactEmail || "admin@aetherawareness.com") + "?subject=" + subj + "&body=" + body;
  }

  /* ---- nav: mobile menu, stuck state, scroll progress, section spy ---- */
  (function () {
    var nav = document.getElementById("nav");
    if (!nav) return;
    var toggle = document.getElementById("nav-toggle");
    var links = Array.prototype.slice.call(nav.querySelectorAll('.nav-links a[href^="#"]'));

    function closeMenu() {
      nav.dataset.open = "false";
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }
    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = nav.dataset.open === "true";
        nav.dataset.open = open ? "false" : "true";
        toggle.setAttribute("aria-expanded", open ? "false" : "true");
      });
    }
    links.forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

    // progress + stuck, rAF-throttled
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var st = window.scrollY || document.documentElement.scrollTop;
        nav.classList.toggle("stuck", st > 8);
        var h = document.documentElement.scrollHeight - window.innerHeight;
        nav.style.setProperty("--sp", h > 0 ? Math.min(1, st / h).toFixed(4) : 0);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // scrollspy — highlight the section you're actually in
    if ("IntersectionObserver" in window) {
      var targets = links.map(function (a) {
        return document.querySelector(a.getAttribute("href"));
      }).filter(Boolean);
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      targets.forEach(function (t) { spy.observe(t); });
    }
  })();

  /* ---- scroll reveal (auto-attach; respects reduced motion) ---- */
  (function () {
    var els = document.querySelectorAll(
      ".rev, .section-head, .card, .tier, .persona, .fix, .step, .stat, details, .signup"
    );
    els.forEach(function (el) { el.classList.add("rev"); });
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var d = Math.min(240, (Array.prototype.indexOf.call(
            en.target.parentNode.children, en.target) % 6) * 60);
          en.target.style.transitionDelay = d + "ms";
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---- hero headline: word-by-word entrance ---- */
  (function () {
    var wr = document.querySelector(".wr");
    if (!wr || reduce) return;
    var frag = document.createDocumentFragment();
    Array.prototype.slice.call(wr.childNodes).forEach(function (node) {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach(function (tok) {
          if (!tok) return;
          if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(tok)); return; }
          var s = document.createElement("span"); s.textContent = tok; frag.appendChild(s);
        });
      } else {
        var s = document.createElement("span"); s.appendChild(node.cloneNode(true)); frag.appendChild(s);
      }
    });
    wr.classList.add("split");          // only now is anything hidden
    wr.innerHTML = "";
    wr.appendChild(frag);
    var kids = wr.children;
    for (var i = 0; i < kids.length; i++) kids[i].style.transitionDelay = (i * 52) + "ms";
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { wr.classList.add("in"); });
    });
    // belt-and-braces: never leave the headline invisible
    setTimeout(function () { wr.classList.add("in"); }, 1200);
  })();

  /* ==========================================================================
     Hero vignette — two scenes, six months apart.
     The point of the product is that nothing was re-explained in between, so
     the frame demonstrates it instead of asserting it. Both scenes are in the
     markup and readable with JS off; here we only cross-fade and type.
     ========================================================================= */
  function typeIn(el, done) {
    var text = el.getAttribute("data-text") || el.textContent;
    if (reduce) { if (done) done(); return; }
    // Reserve the height BEFORE emptying it. Otherwise the paragraph collapses
    // from three lines to one, the frame shrinks, and everything below jumps —
    // a real layout shift, measured at up to 0.11 CLS.
    el.style.minHeight = el.getBoundingClientRect().height + "px";
    el.textContent = "";
    var caret = document.createElement("span");
    caret.className = "caret";
    el.appendChild(caret);
    var i = 0;
    (function tick() {
      if (i <= text.length) {
        el.insertBefore(document.createTextNode(text.charAt(i)), caret);
        i++;
        setTimeout(tick, 16 + Math.random() * 26);
      } else {
        setTimeout(function () {
          caret.remove();
          el.style.minHeight = "";      // text is whole again; let it size itself
          if (done) done();
        }, 1100);
      }
    })();
  }

  (function () {
    var vig = document.getElementById("vignette");
    if (!vig) return;
    var scenes = Array.prototype.slice.call(vig.querySelectorAll(".vig-scene"));
    var tabs = Array.prototype.slice.call(vig.querySelectorAll(".vig-dots [role=tab]"));
    if (scenes.length !== 2 || tabs.length !== 2) return;

    var typed = [false, false];
    var manual = false;                 // a visitor who takes the wheel keeps it
    var timer = null;

    function show(i, byUser) {
      if (byUser) { manual = true; clearTimeout(timer); }
      scenes.forEach(function (s, k) { s.classList.toggle("is-on", k === i); });
      tabs.forEach(function (t, k) {
        t.setAttribute("aria-selected", k === i ? "true" : "false");
        t.tabIndex = k === i ? 0 : -1;
      });
      var p = scenes[i].querySelector(".typed");
      if (!p || typed[i]) return;
      typed[i] = true;
      typeIn(p, function () {
        // Scene one lands, then time passes — unless the visitor already chose.
        if (i === 0 && !manual) timer = setTimeout(function () { show(1); }, 1900);
      });
    }

    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { show(i, true); });
    });
    vig.querySelector(".vig-dots").addEventListener("keydown", function (e) {
      var cur = tabs.indexOf(document.activeElement), i;
      if (cur < 0) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") i = (cur + 1) % tabs.length;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") i = (cur - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") i = 0;
      else if (e.key === "End") i = tabs.length - 1;
      else return;
      e.preventDefault();
      tabs[i].focus();
      show(i, true);
    });

    if (reduce || !("IntersectionObserver" in window)) return;   // full text already in markup
    var io = new IntersectionObserver(function (entries) {
      if (!entries.some(function (e) { return e.isIntersecting; })) return;
      io.disconnect();
      show(0);
    }, { threshold: 0.45 });
    io.observe(vig);
  })();

  /* ==========================================================================
     Interactive architecture diagram.
     An ILLUSTRATION, not a product surface: the visitor swaps the drawing's
     brain and watches the souls/memory/boundaries above stay lit and running.
     Nothing is fetched, nothing is configured, nothing leaves the page.
     ========================================================================= */
  (function () {
    var inst = document.getElementById("instance");
    if (!inst) return;
    var slot = document.getElementById("inst-slot");
    var picker = inst.querySelector(".inst-picker");
    var opts = Array.prototype.slice.call(inst.querySelectorAll(".inst-opt"));
    var countEl = document.getElementById("inst-count");
    var live = document.getElementById("inst-live");
    if (!slot || !picker || opts.length < 2) return;

    var cur = 0, swaps = 0, busy = false, queued = null;

    function pad(n) { return (n < 10 ? "0" : "") + n; }

    function seat(btn) {
      var n = slot.querySelector(".name"), m = slot.querySelector(".meta");
      if (n) n.textContent = btn.dataset.name || "";
      if (m) m.textContent = btn.dataset.meta || "";
    }

    function settle(btn) {
      swaps++;
      if (countEl) countEl.textContent = pad(swaps);
      if (live) {
        live.textContent = "Brain swapped to " + (btn.dataset.name || "") +
          ". Souls intact. Memory intact. " + swaps + (swaps === 1 ? " swap." : " swaps.");
      }
    }

    function swap(i) {
      // An impatient visitor clicking twice should get their SECOND choice,
      // not have it silently dropped — queue the latest intent instead.
      if (busy) { queued = i; return; }
      if (i === cur) return;
      var btn = opts[i];
      cur = i;
      opts.forEach(function (o, k) {
        o.setAttribute("aria-checked", k === i ? "true" : "false");
        o.tabIndex = k === i ? 0 : -1;
      });

      if (reduce) { seat(btn); settle(btn); return; }

      busy = true;
      inst.classList.add("swapping", "ejecting");
      setTimeout(function () {
        seat(btn);                                  // change it while it's out
        inst.classList.remove("ejecting");
        inst.classList.add("seating");
        setTimeout(function () {
          inst.classList.remove("swapping", "seating");
          settle(btn);
          busy = false;
          if (queued !== null) { var q = queued; queued = null; swap(q); }
        }, 460);
      }, 420);
    }

    opts.forEach(function (o, i) { o.addEventListener("click", function () { swap(i); }); });

    // radiogroup keyboard semantics
    picker.addEventListener("keydown", function (e) {
      var n = opts.length, i = cur;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") i = (cur + 1) % n;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") i = (cur - 1 + n) % n;
      else if (e.key === "Home") i = 0;
      else if (e.key === "End") i = n - 1;
      else return;
      e.preventDefault();
      opts[i].focus();
      swap(i);
    });

    // one-time affordance when it first comes into view
    if ("IntersectionObserver" in window && !reduce) {
      var once = new IntersectionObserver(function (entries) {
        if (!entries.some(function (x) { return x.isIntersecting; })) return;
        once.disconnect();
        picker.classList.add("nudge");
        setTimeout(function () { picker.classList.remove("nudge"); }, 1600);
      }, { threshold: 0.5 });
      once.observe(inst);
    }
  })();

  /* ---- pointer spotlight on raised surfaces (fine pointers only) ---- */
  function spotlight(nodes) {
    if (!fine || reduce) return;
    Array.prototype.forEach.call(nodes, function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 100).toFixed(1) + "%");
        el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 100).toFixed(1) + "%");
      }, { passive: true });
    });
  }
  spotlight(document.querySelectorAll(".card, .persona"));

  /* ---- aurora parallax (a whisper — 26px at the extremes) ---- */
  (function () {
    var aur = document.querySelector(".aurora");
    if (!aur || !fine || reduce) return;
    window.addEventListener("pointermove", function (e) {
      var x = (e.clientX / window.innerWidth - .5);
      var yy = (e.clientY / window.innerHeight - .5);
      aur.style.setProperty("--px", (x * 26).toFixed(1));
      aur.style.setProperty("--py", (yy * 18).toFixed(1));
    }, { passive: true });
  })();

  /* ==========================================================================
     Staged illustrations — the continuum, the capability mold, the matrix,
     the consult, the compiler. Each one's markup is complete on its own; the
     `play` class only decides WHEN it assembles. Anything unreached by the
     observer within a few seconds is played outright, so a stalled observer
     can never leave a panel half-drawn.
     ========================================================================= */
  (function () {
    var targets = Array.prototype.slice.call(
      document.querySelectorAll("#cont, #mold, #matrix, #consult, #forge"));
    if (!targets.length) return;

    function play(el) { el.classList.add("play"); }
    if (reduce || !("IntersectionObserver" in window)) { targets.forEach(play); return; }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        play(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -5% 0px" });
    targets.forEach(function (t) { io.observe(t); });

    // failsafe: anything already on screen after 4s plays regardless
    setTimeout(function () {
      targets.forEach(function (t) {
        if (t.classList.contains("play")) return;
        var r = t.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) { play(t); io.unobserve(t); }
      });
    }, 4000);
  })();

  /* ---- stat band: the number lands rather than appears ---- */
  (function () {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
    if (!els.length || reduce || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target;
        var target = parseFloat(el.getAttribute("data-count")) || 0;
        var suffix = el.getAttribute("data-suffix") || "";
        var t0 = null, dur = 1100;
        requestAnimationFrame(function step(t) {
          if (t0 === null) t0 = t;
          var p = Math.min(1, (t - t0) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        });
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---- magnetic primary CTA (fine pointers only, rAF-throttled) ---- */
  (function () {
    var els = Array.prototype.slice.call(document.querySelectorAll(".magnet"));
    if (!els.length || !fine || reduce) return;
    var pending = false, px = 0, py = 0;
    function apply() {
      pending = false;
      els.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var dx = px - (r.left + r.width / 2);
        var dy = py - (r.top + r.height / 2);
        var reach = Math.max(r.width, r.height) / 2 + 90;
        var d = Math.sqrt(dx * dx + dy * dy);
        var k = d > reach ? 0 : 0.2 * (1 - d / reach);
        el.style.setProperty("--mgx", (dx * k).toFixed(1) + "px");
        el.style.setProperty("--mgy", (dy * k).toFixed(1) + "px");
      });
    }
    window.addEventListener("pointermove", function (e) {
      px = e.clientX; py = e.clientY;
      if (!pending) { pending = true; requestAnimationFrame(apply); }
    }, { passive: true });
  })();
})();
