(function () {
  "use strict";

  document.documentElement.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Demo: one video at a time. The chosen video plays while it is on screen. */

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".switch [role=tab]"));
  var panels = tabs.map(function (tab) {
    return document.getElementById(tab.getAttribute("aria-controls"));
  });
  var onScreen = false;

  function play(video) {
    if (reduceMotion) return;
    var started = video.play();
    if (started && started.catch) started.catch(function () {});
  }

  function select(index, restart) {
    tabs.forEach(function (tab, i) {
      var chosen = i === index;
      var video = panels[i].querySelector("video");
      tab.setAttribute("aria-selected", chosen ? "true" : "false");
      panels[i].hidden = !chosen;
      if (!chosen) {
        video.pause();
      } else if (onScreen) {
        if (restart) video.currentTime = 0;
        play(video);
      }
    });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { select(i, true); });
  });
  if (tabs.length) select(0, false);

  var demo = document.getElementById("demo");
  if (demo && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      onScreen = entries[0].isIntersecting;
      panels.forEach(function (panel) {
        var video = panel.querySelector("video");
        if (onScreen && !panel.hidden) play(video); else video.pause();
      });
    }, { threshold: 0.4 }).observe(demo);
  }

  /* Copy the BibTeX entry. */

  var copyButton = document.getElementById("copy-bibtex");
  if (copyButton) {
    copyButton.addEventListener("click", function () {
      var source = document.getElementById("bibtex");
      var done = function () {
        copyButton.textContent = "Copied";
        setTimeout(function () { copyButton.textContent = "Copy"; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(source.textContent).then(done, function () {});
      } else {
        var range = document.createRange();
        range.selectNodeContents(source);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        if (document.execCommand("copy")) done();
      }
    });
  }
})();
