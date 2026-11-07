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
      if (e.isIntersecting) { e.target.classList.add('anim-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
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
