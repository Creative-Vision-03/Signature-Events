/* ==========================================================================
   SIGNATURE EVENTS: GALLERY LIGHTBOX  (gallery.html only)
   --------------------------------------------------------------------------
   Click a photo to open it full size. Arrow keys and Escape work too.
   To add a photo, add another <button data-lb="N"> in gallery.html.
   ========================================================================== */

(function () {
  "use strict";
  var $ = window.SE.$,
    $$ = window.SE.$$;
  var lb = $("#lb"),
    lbimg = $("#lbimg"),
    idx = 0,
    last = null;
  if (!lb) return;

  function items() {
    return $$("#grid button");
  }
  function show(i) {
    var it = items();
    idx = (i + it.length) % it.length;
    var im = $("img", it[idx]);
    lbimg.src = im.currentSrc || im.src;
    lbimg.alt = im.alt;
  }
  items().forEach(function (b) {
    b.addEventListener("click", function () {
      last = b;
      lb.classList.add("open");
      show(items().indexOf(b));
      $(".x", lb).focus();
    });
  });
  function close() {
    lb.classList.remove("open");
    if (last) last.focus();
  }
  $(".x", lb).addEventListener("click", close);
  $(".pv", lb).addEventListener("click", function () {
    show(idx - 1);
  });
  $(".nx", lb).addEventListener("click", function () {
    show(idx + 1);
  });
  lb.addEventListener("click", function (e) {
    if (e.target === lb) close();
  });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
})();
