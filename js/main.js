/* ==========================================================================
   SIGNATURE EVENTS: SHARED JAVASCRIPT  (loaded on every page)
   --------------------------------------------------------------------------
   Sections
     1. Helpers and WhatsApp links
     2. Mobile menu
     3. Falling petals background
     4. Scroll-up button, glass navbar, WhatsApp bubble
   Page-specific scripts:  js/form.js (contact page)   js/gallery.js (gallery page)
   ========================================================================== */

(function () {
  "use strict";
  var SE = window.SE;
  var $ = function (s, r) {
    return (r || document).querySelector(s);
  };
  var $$ = function (s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  };

  /* ==========================================================================
     1. HELPERS AND WHATSAPP LINKS
     Every link with data-wa, and the floating WhatsApp button, opens a chat.
     The contact page calls SE.refreshWa("Gold") to add the chosen package.
     ========================================================================== */
  SE.$ = $;
  SE.$$ = $$;
  SE.waLink = function (text) {
    return "https://wa.me/" + SE.WA + "?text=" + encodeURIComponent(text || SE.BASE_MSG);
  };
  SE.refreshWa = function (packageName) {
    var msg = SE.BASE_MSG + (packageName ? " I am interested in the " + packageName + " package." : "");
    var href = SE.waLink(msg);
    var floating = $("#wa");
    if (floating) floating.href = href;
    $$("[data-wa]").forEach(function (a) {
      a.href = href;
    });
  };
  SE.refreshWa();

  /* ==========================================================================
     2. MOBILE MENU
     ========================================================================== */
  var burger = $("#burger"),
    drawer = $("#drawer");
  function closeDrawer() {
    drawer.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
  }
  if (burger && drawer) {
    burger.addEventListener("click", function () {
      var o = drawer.classList.toggle("open");
      burger.setAttribute("aria-expanded", o);
      burger.setAttribute("aria-label", o ? "Close menu" : "Open menu");
    });
    $$("#drawer a").forEach(function (a) {
      a.addEventListener("click", closeDrawer);
    });
  }

  /* ==========================================================================
     3. FALLING PETALS BACKGROUND
     Change the number 6 in the for loop to change how many petals fall.
     ========================================================================== */
  (function () {
    var box = document.getElementById("petals");
    if (!box) return;
    var cols = [
      "linear-gradient(135deg,#F7E6DC,#E9C4B4)",
      "linear-gradient(135deg,#FBF1E6,#E8D3B5)",
      "linear-gradient(135deg,#F2D9CF,#DDB9A6)",
      "linear-gradient(135deg,#F9EBDD,#D9BE92)",
    ];
    for (var i = 0; i < 6; i++) {
      var d = document.createElement("span"),
        z = 18 + Math.random() * 16;
      d.className = "petal";
      d.style.cssText =
        "left:" +
        (6 + i * 16 + Math.random() * 8) +
        "%;width:" +
        z +
        "px;height:" +
        z * 1.25 +
        "px;background:" +
        cols[i % 4] +
        ";animation-duration:" +
        (26 + Math.random() * 16) +
        "s;animation-delay:-" +
        Math.random() * 34 +
        "s;--sw:" +
        ((Math.random() * 160 - 80) | 0) +
        "px";
      box.appendChild(d);
    }
  })();

  /* ==========================================================================
     4. SCROLL-UP BUTTON, GLASS NAVBAR, WHATSAPP BUBBLE
     ========================================================================== */
  var up = $("#up");
  var topbar = $("#top");
  function onScroll() {
    if (up) up.classList.toggle("show", window.scrollY > 500);
    if (topbar) topbar.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (up) {
    up.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var wa = $("#wa"),
    bubble = $("#bubble"),
    hideT;
  function pop() {
    bubble.classList.add("show");
    clearTimeout(hideT);
    hideT = setTimeout(function () {
      bubble.classList.remove("show");
    }, 5200);
  }
  if (wa && bubble) {
    setTimeout(pop, 1800);
    setInterval(pop, 14000);
    wa.addEventListener("mouseenter", pop);
    wa.addEventListener("focus", pop);
  }
})();
