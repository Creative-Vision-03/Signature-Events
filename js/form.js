/* ==========================================================================
   SIGNATURE EVENTS: ENQUIRY FORM  (contact.html only)
   --------------------------------------------------------------------------
   Sections
     1. Price and extras data      <- edit prices here
     2. Package, extras, price estimate
     3. Validation and submit
   The phone number and FORM_ENDPOINT live in js/settings.js.
   ========================================================================== */

(function () {
  "use strict";
  var SE = window.SE,
    $ = SE.$,
    $$ = SE.$$;
  var form = $("#enquiry-form");
  if (!form) return;

  /* ==========================================================================
     1. PRICE AND EXTRAS DATA
     Edit prices here AND in the pricing tables in packages.html.
     ========================================================================== */
  var PRICES = {
    classic: { 15: 220, 20: 270, 25: 320, 30: 370, 40: 470, 50: 570, 60: 670, 80: 870, 100: 1070, 150: 1570 },
    gold: { 15: 290, 20: 360, 25: 425, 30: 490, 40: 620, 50: 750, 60: 880, 80: 1140, 100: 1400, 150: 2050 },
    premium: {
      15: 340,
      20: 420,
      25: 500,
      30: 580,
      40: 740,
      50: 900,
      60: 1060,
      80: 1380,
      100: 1700,
      150: 2500,
    },
  };
  var NAMES = { classic: "Classic", gold: "Gold", premium: "Premium" };
  // [name, price, packages it is offered with]. Also edit the extras lists in packages.html.
  var EXTRAS = [
    ["Red Runner Carpet", 15, ["classic", "gold", "premium"]],
    ["White Runner Carpet", 25, ["classic", "gold", "premium"]],
    ["Personalised Dance Floor (2.4m × 2m)", 60, ["classic", "gold", "premium"]],
    ["Simple Welcome Sign", 15, ["classic", "gold"]],
    ["Clear Welcome Sign", 20, ["classic", "gold"]],
    ["Mirror Welcome Sign", 25, ["classic"]],
    ["Glass Cake Table", 5, ["classic", "gold", "premium"]],
    ["Pair of Stanchions", 15, ["gold", "premium"]],
    ["Chandelier", 20, ["gold", "premium"]],
    ["Premium High Table", 20, ["premium"]],
  ];
  var money = function (n) {
    return "$" + n.toLocaleString("en-US");
  };

  /* ==========================================================================
     2. PACKAGE, EXTRAS, PRICE ESTIMATE
     ========================================================================== */
  var pp = $("#pp"),
    eg = $("#eg"),
    xchecks = $("#xchecks"),
    est = $("#est"),
    ed = $("#ed");

  (function () {
    var d = new Date();
    ed.min =
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0");
  })();

  function refreshExtras() {
    var p = pp.value;
    var keep = {};
    $$("input:checked", xchecks).forEach(function (i) {
      keep[i.value] = 1;
    });
    xchecks.textContent = "";
    if (!p) {
      var s = document.createElement("span");
      s.style.cssText = "font-size:13px;color:rgba(247,244,237,.6)";
      s.textContent = "Select a package to see its extras.";
      xchecks.appendChild(s);
      return;
    }
    EXTRAS.forEach(function (x, i) {
      if (x[2].indexOf(p) < 0) return;
      var l = document.createElement("label"),
        c = document.createElement("input");
      c.type = "checkbox";
      c.name = "extras";
      c.value = x[0] + " (" + money(x[1]) + ")";
      c.id = "x" + i;
      if (keep[c.value]) c.checked = true;
      l.appendChild(c);
      l.appendChild(document.createTextNode(x[0] + " · " + money(x[1])));
      xchecks.appendChild(l);
    });
  }
  function refreshEst() {
    var p = pp.value,
      g = eg.value;
    if (p && g && g !== "Other" && PRICES[p][g]) {
      est.textContent =
        NAMES[p] +
        " package for " +
        g +
        " guests: " +
        money(PRICES[p][g]) +
        " (USD, transport not included).";
    } else if (p && g === "Other") {
      est.textContent = "For more than 150 guests, or if you are unsure, we will confirm the price with you.";
    } else {
      est.textContent = "";
    }
  }
  function setPackage(p) {
    if (p && PRICES[p]) pp.value = p;
    refreshExtras();
    refreshEst();
    SE.refreshWa(NAMES[pp.value]);
  }
  pp.addEventListener("change", function () {
    setPackage(pp.value);
    clearErr(pp);
  });
  eg.addEventListener("change", function () {
    refreshEst();
    clearErr(eg);
  });

  // Links such as contact.html?package=gold preselect that package.
  (function () {
    var m = /[?&]package=([a-z]+)/.exec(window.location.search);
    if (m && PRICES[m[1]]) setPackage(m[1]);
    else setPackage("");
  })();

  /* ==========================================================================
     3. VALIDATION AND SUBMIT
     ========================================================================== */
  function fieldOf(el) {
    return el.closest(".f");
  }
  function clearErr(el) {
    var f = fieldOf(el);
    if (f) f.classList.remove("bad");
  }
  function setBad(el, bad) {
    var f = fieldOf(el);
    if (f) f.classList.toggle("bad", bad);
    return bad;
  }
  $$("input,select,textarea", form).forEach(function (el) {
    el.addEventListener("input", function () {
      clearErr(el);
    });
  });
  function validate() {
    var bad = [];
    var req = ["fn", "ln", "el", "et", "eg", "pp"];
    req.forEach(function (id) {
      var el = document.getElementById(id);
      if (setBad(el, !el.value.trim())) bad.push(el);
    });
    var ph = $("#ph"),
      digits = ph.value.replace(/\D/g, "");
    if (setBad(ph, !(/^\+?[0-9\s\-()]+$/.test(ph.value.trim()) && digits.length >= 9 && digits.length <= 15)))
      bad.push(ph);
    var em = $("#em");
    if (setBad(em, !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim()))) bad.push(em);
    var dv = ed.value;
    if (setBad(ed, !dv || (ed.min && dv < ed.min))) bad.push(ed);
    return bad;
  }

  var status = $("#status"),
    send = $("#send");
  function showStatus(kind, nodes) {
    status.className = "status " + kind;
    status.textContent = "";
    (Array.isArray(nodes) ? nodes : [nodes]).forEach(function (n) {
      status.appendChild(typeof n === "string" ? document.createTextNode(n) : n);
    });
    status.hidden = false;
  }
  function collect() {
    var d = {};
    [
      "first_name",
      "last_name",
      "phone",
      "email",
      "event_type",
      "event_date",
      "event_location",
      "guests",
      "package",
      "message",
    ].forEach(function (k) {
      d[k] = form.elements[k].value.trim();
    });
    d.package_name = NAMES[d.package] || d.package;
    d.extras = $$("input[name=extras]:checked", form).map(function (i) {
      return i.value;
    });
    return d;
  }
  function waMessage(d) {
    var L = [
      "Hello Signature Events, I would like to enquire about an event.",
      "Name: " + d.first_name + " " + d.last_name,
      "Phone / WhatsApp: " + d.phone,
      "Email: " + d.email,
      "Event type: " + d.event_type,
      "Event date: " + d.event_date,
      "Location: " + d.event_location,
      "Guests: " + (d.guests === "Other" ? "More than 150 or not sure" : d.guests),
      "Package: " + d.package_name,
    ];
    var n = parseInt(d.guests, 10);
    if (PRICES[d.package] && PRICES[d.package][n]) L.push("Published package price: " + money(PRICES[d.package][n]));
    if (d.extras.length) L.push("Extras: " + d.extras.join(", "));
    if (d.message) L.push("Message: " + d.message);
    return L.join("\n");
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.hidden = true;
    var bad = validate();
    if (bad.length) {
      showStatus("error", "Please check the highlighted fields. Your answers have been kept.");
      bad[0].focus();
      return;
    }
    var d = collect();
    if (!SE.FORM_ENDPOINT) {
      var a = document.createElement("a");
      a.href = SE.waLink(waMessage(d));
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = "Open WhatsApp";
      a.style.fontWeight = "600";
      showStatus("", [
        "Your enquiry has not been sent yet. Online delivery is not set up on this site, so it is ready as a WhatsApp message. ",
        a,
        " and press send to deliver it to 0789571647.",
      ]);
      return;
    }
    send.disabled = true;
    send.textContent = "Sending…";
    fetch(SE.FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(d),
    })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r;
      })
      .then(function () {
        showStatus(
          "ok",
          "Thank you, " +
            d.first_name +
            ". Your enquiry has been sent. Signature Events will contact you on " +
            d.phone +
            ".",
        );
        form.reset();
        refreshExtras();
        refreshEst();
        SE.refreshWa();
      })
      .catch(function () {
        showStatus(
          "error",
          "Your enquiry could not be sent. Your answers are still here. Please try again, or message us on WhatsApp at 0789571647.",
        );
      })
      .then(function () {
        send.disabled = false;
        send.textContent = "Send enquiry";
      });
  });
})();
