/* Scroll-controlled semantic three-layer illustration. */
(() => {
  "use strict";
  const scene = document.getElementById("world-scene");
  if (!scene) return;
  const layers = [...scene.querySelectorAll(".meaning-layer")];
  const labels = () => layers.map((el) => el.querySelector(".meaning-copy strong")?.textContent || "");
  const state = { renderer: "semantic-css-3d", progress: 0, active: 0, reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches };
  const setActive = (input) => {
    const active = Math.max(0, Math.min(2, Math.round(Number(input) || 0)));
    state.active = active;
    scene.dataset.active = String(active);
    layers.forEach((el, i) => { el.classList.toggle("is-focused", i === active); el.setAttribute("aria-pressed", String(i === active)); });
    const h = document.getElementById("meaning-active");
    if (h) h.textContent = labels()[active];
  };
  const setProgress = (value) => {
    state.progress = Math.max(0, Math.min(1, Number(value) || 0));
    scene.querySelector(".meaning-connection")?.style.setProperty("--progress", String(state.progress));
  };
  const setPaused = (value) => { state.reducedMotion = Boolean(value); };
  window.Layers3D = { state, setActive, setProgress, setPaused };
  setActive(0);
  setProgress(0);
})();