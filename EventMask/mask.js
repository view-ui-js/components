const el = document.createElement("section");

el.style = 'position: fixed; z-index: 10000000; inset: 0px; display: none;';

const { style } = el;

let pointer;

if ("ontouchstart" in document) {

  // el.addEventListener('touchmove', e => pointer.onmove(e, e.touches[0]), false);
  // el.addEventListener('touchend', e => pointer.onend(e), false);

} else {

  el.addEventListener("mousemove", e => {
    if (pointer.down === false) return;
    pointer.onmove(e, e);
  }, false);
  el.addEventListener("mouseup", e => {
    style.display = 'none';
    pointer.down = false;
    if (pointer.gesture === null) {
      pointer.target.click();
    }
    pointer.onend(e);
  }, false);

}

document.body.appendChild(el);

export default function (instance) {
  pointer = instance;
  style.display = '';
}