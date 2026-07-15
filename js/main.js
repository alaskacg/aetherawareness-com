/* Aether Awareness — site behavior: hero field, pricing render, signup. */
(function () {
  "use strict";
  var CFG = window.AETHER_CONFIG || { tiers: [], pricingNote: "" };

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
          // free / signup → scroll to the email capture and focus it
          document.querySelector(".band").scrollIntoView({ behavior: "smooth" });
          setTimeout(function () { var e = document.getElementById("signup-email"); if (e) e.focus(); }, 500);
        }
      });
    });
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
    msg.className = "msg ok"; msg.textContent = "You're on the list. Check your inbox soon.";
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

  /* ---- scroll reveal (auto-attach; respects reduced motion) ---- */
  (function () {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
          // small stagger based on position among visible siblings
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

  /* ---- keep looping videos honest with reduced motion ---- */
  (function () {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll("video[autoplay]").forEach(function (v) {
      v.removeAttribute("autoplay"); v.pause(); v.setAttribute("controls", "controls");
    });
  })();

  /* ---- hero signal field (ambient, reduced-motion aware) ---- */
  var c = document.getElementById("field");
  if (c && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ctx = c.getContext("2d"), W, H, DPR = Math.min(2, window.devicePixelRatio || 1), pts = [];
    function size() {
      W = c.width = c.offsetWidth * DPR; H = c.height = c.offsetHeight * DPR;
      var n = Math.min(70, Math.round((c.offsetWidth * c.offsetHeight) / 16000));
      pts = []; for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .18 * DPR, vy: (Math.random() - .5) * .18 * DPR });
    }
    size(); window.addEventListener("resize", size);
    var sweep = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      sweep = (sweep + .0016) % 1;
      // links between near points
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130 * DPR) {
            ctx.strokeStyle = "rgba(53,230,200," + (0.10 * (1 - d / (130 * DPR))) + ")";
            ctx.lineWidth = DPR; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      // points, with a periodic "signal" flare
      for (var k = 0; k < pts.length; k++) {
        var pt = pts[k];
        var flare = Math.max(0, Math.sin(sweep * 6.283 + k)) ;
        ctx.fillStyle = "rgba(53,230,200," + (0.35 + 0.4 * flare) + ")";
        ctx.beginPath(); ctx.arc(pt.x, pt.y, (1.1 + 1.3 * flare) * DPR, 0, 6.283); ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  }
})();
