(function () {
  'use strict';

  // Celé karty / sekce s data-href fungují jako odkaz
  document.querySelectorAll('[data-href]').forEach(function (el) {
    var href = el.getAttribute('data-href');
    if (!href || href === '#' || el.classList.contains('u-back-to-top')) return;
    el.style.cursor = 'pointer';
    el.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      location.href = href;
    });
  });

  // Šipky u posuvné galerie log (na kraji se skryjí)
  document.querySelectorAll('.u-layout-horizontal').forEach(function (box) {
    var strip = box.querySelector('.u-repeater, .u-gallery-inner');
    var prev = box.querySelector('.u-gallery-nav-prev');
    var next = box.querySelector('.u-gallery-nav-next');
    if (!strip || !(prev || next)) return;
    function update() {
      var max = strip.scrollWidth - strip.clientWidth - 1;
      if (prev) prev.style.display = strip.scrollLeft > 0 ? '' : 'none';
      if (next) next.style.display = strip.scrollLeft < max ? '' : 'none';
    }
    [prev, next].forEach(function (nav) {
      if (!nav) return;
      nav.addEventListener('click', function (e) {
        e.preventDefault();
        var dir = nav === prev ? -1 : 1;
        strip.scrollBy({ left: dir * strip.clientWidth * 0.8, behavior: 'smooth' });
      });
    });
    strip.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  // Zvětšení obrázků v galerii certifikátů
  var lightbox;
  function closeLightbox() {
    if (lightbox) { lightbox.remove(); lightbox = null; }
  }
  document.querySelectorAll('.u-lightbox .u-gallery-item img').forEach(function (img) {
    img.addEventListener('click', function () {
      closeLightbox();
      lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      var big = document.createElement('img');
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      lightbox.appendChild(big);
      lightbox.addEventListener('click', closeLightbox);
      document.body.appendChild(lightbox);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // Tlačítko "nahoru"
  var up = document.querySelector('.u-back-to-top');
  if (up) {
    function toggleUp() { up.style.display = window.scrollY > 300 ? 'block' : 'none'; }
    window.addEventListener('scroll', toggleUp, { passive: true });
    toggleUp();
    up.style.cursor = 'pointer';
    up.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
