/* Fills the pages from FUNNEL_CONFIG (config.js), runs the sticky buy bar
   and sends the optional Meta Pixel events. No settings live in this file. */
(function () {
  "use strict";

  var C = window.FUNNEL_CONFIG || {};
  var doc = document;

  function each(selector, fn) {
    Array.prototype.forEach.call(doc.querySelectorAll(selector), fn);
  }

  function whatsappLink(message) {
    var number = String(C.whatsappNumber || "").replace(/\D/g, "");
    if (!number) return "";
    return "https://wa.me/" + number + (message ? "?text=" + encodeURIComponent(message) : "");
  }

  /* ---------- Links and text ---------- */

  if (C.checkoutUrl) {
    each("[data-cta]", function (a) { a.href = C.checkoutUrl; });
  }

  // WhatsApp links open the chat with a ready-made first message.
  each("[data-whatsapp]", function (a) {
    var link = whatsappLink(a.getAttribute("data-whatsapp"));
    if (link) a.href = link;
  });

  // data-link="booklineUrl" takes its address from the setting of the same name.
  each("[data-link]", function (a) {
    var url = C[a.getAttribute("data-link")];
    if (url) a.href = url;
  });

  // data-text="price" takes its text from the setting of the same name.
  each("[data-text]", function (el) {
    var value = C[el.getAttribute("data-text")];
    if (value !== undefined && value !== null && value !== "") el.textContent = value;
  });

  each("[data-email]", function (a) {
    if (!C.email) return;
    a.href = "mailto:" + C.email;
    a.textContent = C.email;
  });

  each("[data-year]", function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ---------- Offer countdown ----------
     Cycles of offerHours counted from offerStart: when one ends, the next
     one starts, and every visitor sees the same time left. */

  var unitEls = doc.querySelectorAll("[data-cd]");
  var clockEls = doc.querySelectorAll("[data-countdown]");
  if (unitEls.length || clockEls.length) {
    var cycle = (Number(C.offerHours) || 48) * 3600000;
    var start = Date.parse(C.offerStart || "");
    if (isNaN(start)) start = 0;

    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    var tick = function () {
      var left = cycle - (((Date.now() - start) % cycle) + cycle) % cycle;
      var secs = Math.floor(left / 1000);
      var parts = { h: pad(Math.floor(secs / 3600)), m: pad(Math.floor(secs % 3600 / 60)), s: pad(secs % 60) };
      Array.prototype.forEach.call(unitEls, function (el) { el.textContent = parts[el.getAttribute("data-cd")]; });
      Array.prototype.forEach.call(clockEls, function (el) { el.textContent = parts.h + ":" + parts.m + ":" + parts.s; });
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Sticky buy bar ----------
     Appears once the visitor has scrolled past the hero's buy button,
     and steps aside while another large buy button is on screen. */

  var bar = doc.getElementById("sticky-cta");
  if (bar) {
    var hero = doc.querySelector("[data-cta-hero]");
    var mains = doc.querySelectorAll("[data-cta-main]");

    if (hero && "IntersectionObserver" in window) {
      var passedHero = false;
      var mainOnScreen = [];

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.target === hero) {
            passedHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
          } else {
            mainOnScreen[Number(entry.target.getAttribute("data-cta-index"))] = entry.isIntersecting;
          }
        });
        bar.classList.toggle("is-visible", passedHero && mainOnScreen.indexOf(true) === -1);
      });

      observer.observe(hero);
      Array.prototype.forEach.call(mains, function (el, i) {
        el.setAttribute("data-cta-index", String(i));
        mainOnScreen[i] = false;
        observer.observe(el);
      });
    } else {
      bar.classList.add("is-visible");
    }
  }

  /* ---------- Meta (Facebook) Pixel ----------
     Sales page: PageView, ViewContent, and AddToCart on a buy click.
     The checkout reports the checkout and the purchase itself, so Purchase
     is sent from the thank-you page only when sendPurchase is true. */

  if (C.metaPixelId) {
    /* Meta Pixel base code */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, doc, "script", "https://connect.facebook.net/en_US/fbevents.js");

    var eventData = {
      value: C.purchaseValue,
      currency: C.purchaseCurrency,
      content_name: C.productName || document.title
    };

    var page = doc.body.getAttribute("data-page");

    window.fbq("init", String(C.metaPixelId));
    window.fbq("track", "PageView");
    if (page === "sales") window.fbq("track", "ViewContent", eventData);

    if (page === "thank-you" && C.sendPurchase) {
      // One Purchase per browser session, so a page refresh is not counted twice.
      var sent = false;
      try { sent = window.sessionStorage.getItem("cpmb-purchase") === "1"; } catch (e) { /* storage blocked */ }
      if (!sent) {
        window.fbq("track", "Purchase", eventData);
        try { window.sessionStorage.setItem("cpmb-purchase", "1"); } catch (e) { /* storage blocked */ }
      }
    }

    doc.addEventListener("click", function (event) {
      var link = event.target.closest ? event.target.closest("[data-cta]") : null;
      if (!link) return;
      window.fbq("track", "AddToCart", eventData);

      // Give the pixel a moment to send before leaving the page (plain clicks only).
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      setTimeout(function () { window.location.href = link.href; }, 300);
    });
  }
})();
