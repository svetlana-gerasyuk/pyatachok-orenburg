/* Пятачок: лёгкий параллакс за курсором и реакции на клик. Без зависимостей. */
(function () {
  var pig = document.querySelector(".pig"); if (!pig) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var stage = pig.querySelector(".pig__stage"), raf = 0, tx = 0, ty = 0, sy = 0, my = 0;
  function apply() { raf = 0; stage.style.setProperty("--px", tx.toFixed(1) + "px"); stage.style.setProperty("--py", (my + sy).toFixed(1) + "px"); }
  function ask() { if (!raf) raf = requestAnimationFrame(apply); }
  window.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch") return;
    tx = (e.clientX / innerWidth - .5) * -16; my = (e.clientY / innerHeight - .5) * -10; ask();
  }, { passive: true });
  window.addEventListener("scroll", function () { sy = -Math.min(scrollY, 700) * .06; ask(); }, { passive: true });
  pig.addEventListener("click", function () {
    pig.classList.remove("is-jump", "is-wink"); void pig.offsetWidth;
    pig.classList.add("is-jump", "is-wink");
    setTimeout(function () { pig.classList.remove("is-jump", "is-wink"); }, 700);
  });
})();
