/**
 * Ceylon Tour Range — mockup interactions
 * Reveal-on-scroll, nav shadow, tab switching. Presentation only; no app logic.
 */
(function () {
  "use strict";

  // Reveal-on-scroll
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });

  // Nav shadow on scroll
  var nav = document.querySelector(".nav");
  if (nav) {
    window.addEventListener("scroll", function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    });
  }

  // Tab groups (visual only)
  document.querySelectorAll(".tabs").forEach(function (group) {
    group.querySelectorAll(".tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        group.querySelectorAll(".tab").forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
      });
    });
  });

  // Chip toggles (visual only)
  document.querySelectorAll(".chip[data-toggle]").forEach(function (chip) {
    chip.addEventListener("click", function () { chip.classList.toggle("active"); });
  });
})();
