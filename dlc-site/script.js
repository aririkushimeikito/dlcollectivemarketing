// DL Collective — off-canvas menu (vanilla JS)
(function () {
  var menu = document.querySelector('.dlc-menu');
  var backdrop = document.querySelector('.dlc-backdrop');
  var burger = document.querySelector('.dlc-burger');
  var close = document.querySelector('.dlc-close');
  if (!menu) return;
  function open() { menu.classList.add('open'); backdrop.classList.add('open'); menu.setAttribute('aria-hidden', 'false'); }
  function shut() { menu.classList.remove('open'); backdrop.classList.remove('open'); menu.setAttribute('aria-hidden', 'true'); }
  burger.addEventListener('click', open);
  close.addEventListener('click', shut);
  backdrop.addEventListener('click', shut);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') shut(); });
  // highlight the current page in the menu
  var here = location.pathname.split('/').pop() || 'index.html';
  menu.querySelectorAll('a').forEach(function (a) { a.classList.toggle('current', a.getAttribute('href') === here); });
})();
