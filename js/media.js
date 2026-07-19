/* Aether Awareness — tour renderer.
   Driven entirely by media.config.js. While every slot is ready:false this
   file renders NOTHING (no tour section, no nav link, no network probes) —
   the site is byte-for-byte its pre-media self. Flip slots ready:true as
   post-produced assets land in assets/media/. */
(function () {
  "use strict";
  var M = window.AETHER_MEDIA;
  if (!M || !Array.isArray(M.slots)) return;

  var ready = M.slots.filter(function (s) { return s.ready && s.src; });
  if (!ready.length) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- hero swap: real footage into the existing frame ---------- */
  var hero = ready.find(function (s) { return s.id === "hero-loop"; });
  if (hero) {
    var vig = document.querySelector("#vignette .vig-body");
    var cap = document.querySelector(".shot-caption");
    if (vig) {
      vig.innerHTML = "";
      vig.appendChild(mediaEl(hero, { ambient: true }));
      if (cap && hero.caption) cap.textContent = hero.caption;
    }
  }

  /* ---------- tour section ---------- */
  var slotsByChapter = {};
  ready.forEach(function (s) {
    if (!s.chapter) return;
    (slotsByChapter[s.chapter] = slotsByChapter[s.chapter] || []).push(s);
  });
  var chapters = (M.chapters || []).filter(function (c) { return slotsByChapter[c.key]; });

  var tour = document.getElementById("tour");
  if (tour && chapters.length) {
    tour.hidden = false;
    var chipRow = tour.querySelector(".tour-chips");
    var stage = tour.querySelector(".tour-stage");
    var blurb = tour.querySelector(".tour-blurb");

    chapters.forEach(function (c, i) {
      var b = document.createElement("button");
      b.className = "chip" + (i === 0 ? " on" : "");
      b.type = "button";
      b.textContent = c.label;
      b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      b.addEventListener("click", function () {
        chipRow.querySelectorAll(".chip").forEach(function (x) {
          x.classList.remove("on"); x.setAttribute("aria-pressed", "false");
        });
        b.classList.add("on"); b.setAttribute("aria-pressed", "true");
        show(c);
      });
      chipRow.appendChild(b);
    });
    show(chapters[0]);

    /* nav link, only now that the tour exists */
    var navLinks = document.querySelector(".nav-links");
    if (navLinks && !navLinks.querySelector('a[href="#tour"]')) {
      var a = document.createElement("a");
      a.href = "#tour"; a.textContent = "See it";
      navLinks.insertBefore(a, navLinks.firstChild);
    }
  }

  function show(chapter) {
    if (blurb) blurb.textContent = chapter.blurb || "";
    stage.innerHTML = "";
    (slotsByChapter[chapter.key] || []).forEach(function (s) {
      stage.appendChild(card(s));
    });
    observeAmbient(stage);
  }

  function card(s) {
    var fig = document.createElement("figure");
    fig.className = "tour-card";
    var frame = document.createElement("div");
    frame.className = "shot-frame";
    frame.appendChild(bar(s));
    frame.appendChild(mediaEl(s, {}));
    fig.appendChild(frame);
    if (s.caption) {
      var fc = document.createElement("figcaption");
      fc.className = "shot-caption";
      fc.textContent = s.caption;
      fig.appendChild(fc);
    }
    return fig;
  }

  function bar(s) {
    var d = document.createElement("div");
    d.className = "shot-bar";
    d.innerHTML = "<i></i><i></i><i></i>";
    var label = document.createElement("span");
    label.textContent = s.id.replace(/-/g, " ") + (s.narrated ? " — sound on" : " — live capture");
    d.appendChild(label);
    return d;
  }

  function mediaEl(s, opts) {
    if (s.kind === "image") {
      var img = document.createElement("img");
      img.src = s.src; img.alt = s.caption || s.id; img.loading = "lazy";
      return img;
    }
    var ambient = (opts.ambient || s.ambient) && !s.narrated;
    if (ambient && !reduce) {
      var v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true;
      v.preload = "none"; v.dataset.ambient = "1";
      if (s.poster) v.poster = s.poster;
      v.src = s.src;
      v.setAttribute("aria-label", s.caption || s.id);
      return v;
    }
    /* narrated (or reduced motion): poster + play button → lightbox */
    var wrapEl = document.createElement("button");
    wrapEl.type = "button";
    wrapEl.className = "media-poster";
    wrapEl.setAttribute("aria-label", "Play: " + (s.caption || s.id));
    var bg = document.createElement("img");
    bg.src = s.poster || ""; bg.alt = ""; bg.loading = "lazy";
    wrapEl.appendChild(bg);
    var play = document.createElement("span");
    play.className = "play-badge"; play.textContent = "▶";
    wrapEl.appendChild(play);
    wrapEl.addEventListener("click", function () { lightbox(s); });
    return wrapEl;
  }

  /* ---------- ambient autoplay only while visible ---------- */
  function observeAmbient(root) {
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) { v.play().catch(function () {}); }
        else { v.pause(); }
      });
    }, { threshold: 0.35 });
    root.querySelectorAll('video[data-ambient="1"]').forEach(function (v) { io.observe(v); });
  }
  observeAmbient(document);

  /* ---------- lightbox ---------- */
  function lightbox(s) {
    var overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", s.caption || s.id);
    var inner = document.createElement("div");
    inner.className = "lightbox-inner";
    var v = document.createElement("video");
    v.src = s.src; v.controls = true; v.autoplay = true; v.playsInline = true;
    if (s.poster) v.poster = s.poster;
    inner.appendChild(v);
    if (s.caption) {
      var c = document.createElement("p");
      c.className = "shot-caption"; c.textContent = s.caption;
      inner.appendChild(c);
    }
    var x = document.createElement("button");
    x.className = "lightbox-close"; x.type = "button";
    x.setAttribute("aria-label", "Close"); x.textContent = "✕";
    inner.appendChild(x);
    overlay.appendChild(inner);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
    function close() {
      v.pause();
      overlay.remove();
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    }
    function onKey(e) { if (e.key === "Escape") close(); }
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    x.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    x.focus();
  }
})();
