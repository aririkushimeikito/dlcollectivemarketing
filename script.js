// DL Collective — off-canvas menu (vanilla JS)
(function () {
  var menu = document.querySelector('.dlc-menu');
  var backdrop = document.querySelector('.dlc-backdrop');
  var trigger = document.querySelector('.dlc-logo-trigger');
  var burger = document.querySelector('.dlc-burger');
  var close = document.querySelector('.dlc-close');
  if (!menu) return;
  function open() { menu.classList.add('open'); backdrop.classList.add('open'); document.body.classList.add('menu-open'); menu.setAttribute('aria-hidden', 'false'); }
  function shut() { menu.classList.remove('open'); backdrop.classList.remove('open'); document.body.classList.remove('menu-open'); menu.setAttribute('aria-hidden', 'true'); }
  // the logo opens the off-canvas navigation
  if (trigger) trigger.addEventListener('click', function (e) { e.preventDefault(); open(); });
  if (burger) burger.addEventListener('click', open);
  close.addEventListener('click', shut);
  backdrop.addEventListener('click', shut);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') shut(); });
  // highlight the current page in the menu (pretty URLs)
  function norm(p) { p = p.replace(/index\.html$/, ''); if (p.charAt(p.length - 1) !== '/') p += '/'; return p; }
  var here = norm(location.pathname);
  menu.querySelectorAll('a').forEach(function (a) {
    try { a.classList.toggle('current', norm(new URL(a.href).pathname) === here); } catch (e) {}
  });
})();

// Shrink header + white background on scroll
(function () {
  function onScroll() { document.body.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Scroll-reveal entrance animations (fade + rise, staggered per section)
// Content fades/rises in as each section scrolls into view (respects reduced-motion).
(function () {
  if (!('IntersectionObserver' in window)) return;
  try { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; } catch (e) {}
  var main = document.querySelector('main');
  if (!main) return;
  document.documentElement.classList.add('anim-on');
  var items = [];
  var secs = main.querySelectorAll('section');
  if (!secs.length) secs = [main];
  Array.prototype.forEach.call(secs, function (sec) {
    // heroes already have their own entrance / background motion
    if (sec.matches && (sec.matches('.dlc-hero') || sec.matches('.index-s1'))) return;
    var inner = sec.querySelector ? sec.querySelector(':scope > .inner') : null;
    // case-study pages: one very tall section — reveal its groups one by one
    if (!inner && sec.matches && sec.matches('.gs-main')) inner = sec.querySelector(':scope > .hm-stage');
    var group = (inner && inner.children.length)
      ? Array.prototype.slice.call(inner.children)
      : [sec];
    group.forEach(function (el, i) {
      el.classList.add('anim-item');
      el.style.transitionDelay = Math.min(i * 90, 450) + 'ms';
      items.push(el);
    });
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      // reveal once 12% of the element is in view, or — for elements taller than the
      // viewport, which can never reach 12% — once the visible part fills 30% of it
      var vh = window.innerHeight || document.documentElement.clientHeight || 0;
      var visible = e.intersectionRect ? e.intersectionRect.height : 0;
      if (e.intersectionRatio >= 0.12 || visible >= vh * 0.3) { e.target.classList.add('anim-in'); io.unobserve(e.target); }
    });
  }, { threshold: [0, 0.03, 0.06, 0.09, 0.12], rootMargin: '0px 0px -8% 0px' });
  items.forEach(function (el) { io.observe(el); });
})();

// Hero image slideshow (auto-advancing)
(function () {
  var track = document.querySelector('.hero-track');
  if (!track) return;
  var slides = track.children;
  var n = slides.length;
  if (n < 1) return;
  // size the track + slides to the number of slides so it works for any count
  track.style.width = (n * 100) + '%';
  for (var k = 0; k < n; k++) {
    slides[k].style.flex = '0 0 ' + (100 / n) + '%';
    slides[k].style.width = (100 / n) + '%';
  }
  if (n < 2) return;
  var i = 0, step = 100 / n;
  setInterval(function () {
    i = (i + 1) % n;
    track.style.transform = 'translateX(-' + (i * step) + '%)';
  }, 4500);
})();

// Auto-contrast: the fixed logo and the fixed social icons turn black over light
// sections and white over dark sections/photos, based on what is painted
// underneath them at their current scroll position.
(function () {
  var logo = document.querySelector('.hm-logo, .dlc-header [class*="hdr-2"]');
  var social = document.querySelector('.hm-social, .dlc-side-social');
  if (!logo && !social) return;
  var fixedRoots = [document.querySelector('.hm-header, .dlc-header'), social].filter(Boolean);
  function inFixed(el) { for (var i = 0; i < fixedRoots.length; i++) { if (fixedRoots[i].contains(el)) return true; } return false; }
  function lum(c) {
    var m = /rgba?\(([^)]+)\)/.exec(c || ''); if (!m) return null;
    var p = m[1].split(',').map(parseFloat);
    if (p.length > 3 && p[3] === 0) return null;
    return (0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2]) / 255;
  }
  function clamp(v, a, b) { return Math.min(Math.max(v, a), b); }
  // a tiny reusable canvas to read pixel brightness from images/videos
  var _c, _ctx;
  function ctx() {
    if (!_c) { _c = document.createElement('canvas'); _ctx = _c.getContext('2d', { willReadFrequently: true }); }
    return _ctx;
  }
  // parse object-position / background-position into 0..1 fractions [x, y]
  function parsePos(v) {
    var parts = (v || '50% 50%').trim().split(/\s+/);
    if (parts.length === 1) parts[1] = 'center';
    function conv(p) {
      if (p === 'left' || p === 'top') return 0;
      if (p === 'right' || p === 'bottom') return 1;
      if (p === 'center') return 0.5;
      var pct = /^(-?\d+(?:\.\d+)?)%$/.exec(p); if (pct) return clamp(parseFloat(pct[1]) / 100, 0, 1);
      return 0.5;
    }
    return [conv(parts[0]), conv(parts[1])];
  }
  // average brightness of a small patch of a source image/video at viewport point (x,y)
  function sampleSource(src, nw, nh, r, fit, posStr, x, y) {
    if (!nw || !nh || r.width <= 0 || r.height <= 0) return null;
    var pos = parsePos(posStr);
    var fx = clamp((x - r.left) / r.width, 0, 1), fy = clamp((y - r.top) / r.height, 0, 1);
    var sx, sy;
    if (fit === 'cover' || fit === 'contain') {
      var scale = fit === 'cover' ? Math.max(r.width / nw, r.height / nh) : Math.min(r.width / nw, r.height / nh);
      sx = (fx * r.width + (nw * scale - r.width) * pos[0]) / scale;
      sy = (fy * r.height + (nh * scale - r.height) * pos[1]) / scale;
    } else { sx = fx * nw; sy = fy * nh; }
    sx = clamp(sx, 0, nw - 1); sy = clamp(sy, 0, nh - 1);
    var patch = Math.max(6, Math.round(Math.min(nw, nh) * 0.06));
    var ox = clamp(sx - patch / 2, 0, Math.max(0, nw - patch));
    var oy = clamp(sy - patch / 2, 0, Math.max(0, nh - patch));
    try {
      var c = ctx(); _c.width = 1; _c.height = 1;
      c.drawImage(src, ox, oy, patch, patch, 0, 0, 1, 1);
      var d = c.getImageData(0, 0, 1, 1).data;
      if (d[3] === 0) return null;
      return (0.2126 * d[0] + 0.7152 * d[1] + 0.0722 * d[2]) / 255;
    } catch (e) { return null; }
  }
  function mediaLum(el, x, y) {
    var cs = getComputedStyle(el);
    if (el.tagName === 'IMG') return sampleSource(el, el.naturalWidth, el.naturalHeight, el.getBoundingClientRect(), cs.objectFit, cs.objectPosition, x, y);
    return sampleSource(el, el.videoWidth, el.videoHeight, el.getBoundingClientRect(), cs.objectFit, cs.objectPosition, x, y);
  }
  // background-image: load the url once (cached) and sample it like an <img>
  var bgCache = {};
  function getBg(url) {
    if (bgCache[url]) return bgCache[url];
    var o = { img: new Image(), ready: false };
    o.img.onload = function () { o.ready = true; schedule(); };
    o.img.onerror = function () { o.ready = 'error'; };
    o.img.src = url;
    bgCache[url] = o;
    return o;
  }
  function bgLum(el, cs, x, y) {
    var m = /url\((['"]?)(.*?)\1\)/.exec(cs.backgroundImage); if (!m) return null;
    var o = getBg(m[2]); if (o.ready !== true) return null;
    var size = cs.backgroundSize || 'auto';
    var fit = size.indexOf('contain') > -1 ? 'contain' : 'cover';
    return sampleSource(o.img, o.img.naturalWidth, o.img.naturalHeight, el.getBoundingClientRect(), fit, cs.backgroundPosition, x, y);
  }
  // luminance (0..1) of whatever is painted under a single point, or null.
  // Prefer a full-bleed background (the section / hero image) over narrow
  // elements floating on it (testimonial cards, badges), so a light card on a
  // dark section doesn't flip the fixed logo to black.
  function lumAt(x, y) {
    var els = document.elementsFromPoint ? document.elementsFromPoint(x, y) : [];
    var vw = window.innerWidth || document.documentElement.clientWidth || 1;
    var fallback = null; // nearest readable narrow element, used only if nothing full-bleed is found
    for (var i = 0; i < els.length; i++) {
      var el = els[i]; if (inFixed(el)) continue;
      var tag = el.tagName, l;
      var wide = el.getBoundingClientRect().width >= vw * 0.9;
      if (tag === 'IMG' || tag === 'VIDEO') {
        l = mediaLum(el, x, y);
        if (l !== null) { if (wide) return l; if (fallback === null) fallback = l; }
        continue; // unreadable / narrow — look at what's behind it
      }
      if (tag === 'CANVAS' || tag === 'IFRAME') { if (wide) return 0.12; if (fallback === null) fallback = 0.12; continue; }
      var cs = getComputedStyle(el);
      if (cs.backgroundImage && cs.backgroundImage.indexOf('url(') > -1) {
        l = bgLum(el, cs, x, y);
        if (l !== null) { if (wide) return l; if (fallback === null) fallback = l; continue; }
      }
      l = lum(cs.backgroundColor);
      if (l !== null) { if (wide) return l; if (fallback === null) fallback = l; }
    }
    return fallback;
  }
  // average brightness over a grid of points across the element, so a single
  // dark/light speckle behind the logo doesn't flip the whole colour
  function apply(prefix, el) {
    if (!el) return;
    var r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    var xs = [0.15, 0.5, 0.85], ys = [0.3, 0.7], sum = 0, cnt = 0;
    for (var a = 0; a < xs.length; a++) {
      for (var b = 0; b < ys.length; b++) {
        var x = clamp(r.left + r.width * xs[a], 1, window.innerWidth - 1);
        var y = clamp(r.top + r.height * ys[b], 1, window.innerHeight - 1);
        var l = lumAt(x, y);
        if (l !== null) { sum += l; cnt++; }
      }
    }
    var onLight = document.body.classList.contains(prefix + '-on-light');
    var onDark = document.body.classList.contains(prefix + '-on-dark');
    if (!cnt) {
      // nothing readable under the logo (image still loading, etc.) — keep the
      // current colour instead of snapping to a default, so it never gets stuck wrong
      if (!onLight && !onDark) document.body.classList.add(prefix + '-on-dark');
      return;
    }
    var avg = sum / cnt;
    // small hysteresis band around the midpoint: enough to stop flicker on
    // busy / mid-tone images, but tight so the colour still flips when the
    // background clearly crosses from light to dark (and vice-versa)
    var light = onLight ? avg >= 0.45 : avg >= 0.55;
    document.body.classList.toggle(prefix + '-on-light', light);
    document.body.classList.toggle(prefix + '-on-dark', !light);
  }
  var queued = false;
  function update() { queued = false; apply('logo', logo); apply('social', social); }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  setTimeout(update, 300);
  // the hero slideshow swaps the background behind the fixed logo/icons without a
  // scroll, so re-sample as each slide slides in and once it settles
  var heroTrack = document.querySelector('.hero-track');
  if (heroTrack) {
    heroTrack.addEventListener('transitionend', function (e) { if (e.propertyName === 'transform') schedule(); });
    try {
      // the slideshow advances by changing the track's inline transform; follow it
      // with a few samples across the 1s slide so the colour keeps up, not just at the end
      new MutationObserver(function () {
        schedule();
        for (var t = 160; t <= 1000; t += 180) setTimeout(schedule, t);
      }).observe(heroTrack, { attributes: true, attributeFilter: ['style'] });
    } catch (e) {}
  }
})();

/* sound on/off toggle for autoplaying phone reels on the case-study pages */
(function () {
  var wraps = document.querySelectorAll('.gs-phone-video');
  Array.prototype.forEach.call(wraps, function (wrap) {
    var v = wrap.querySelector('video');
    var btn = wrap.querySelector('.gs-mute');
    if (!v || !btn) return;
    function sync() {
      wrap.classList.toggle('is-unmuted', !v.muted);
      btn.setAttribute('aria-label', v.muted ? 'Unmute video' : 'Mute video');
    }
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      v.muted = !v.muted;
      if (!v.muted && v.paused) { v.play(); }
      sync();
    });
    v.addEventListener('volumechange', sync);
    sync();
  });
})();

// Touch devices: "scroll-hover" — reveal each card's hover state as it passes
// the vertical centre of the viewport (services tiles + portfolio cards), since
// there is no pointer to hover with. Pointer devices keep the real :hover.
(function () {
  try { if (!window.matchMedia('(hover:none)').matches) return; } catch (e) { return; }
  if (!('IntersectionObserver' in window)) return;
  var cards = document.querySelectorAll('.sv-grid .sv-tile, .pw-gallery .pw-card');
  if (!cards.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { e.target.classList.toggle('is-active', e.isIntersecting); });
  }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });
  Array.prototype.forEach.call(cards, function (c) { io.observe(c); });
})();
