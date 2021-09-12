/**
 * FLIP列表穿梭过渡封装
 */

export default class Flip {
  constructor({ form, to }) {
    this.form = form;
    this.to = to;
    this.queue = [form, to];
    for (const item of this.queue) {
      for (const element of item.children) {
        const { offsetLeft, offsetTop } = element;
        element.data = { offsetLeft, offsetTop };
      }
    }
  }
  /**
   * 迁移dom
   */
  move(target, referenceNode) {
    this.target = target;
    const { left, top } = target.getBoundingClientRect();
    target.data = { left, top };
    const { to } = this;
    if (referenceNode) {
      to.insertBefore(target, referenceNode);
    } else {
      to.appendChild(target);
    }
  }
  /**
   * 保持在之前的位置
   */
  keep() {
    const moves = [];
    this.moves = moves;
    for (const item of this.queue) {
      for (const element of item.children) {
        const { data, offsetLeft, offsetTop } = element;
        const left = data.offsetLeft - offsetLeft;
        const top = data.offsetTop - offsetTop;
        if (left || top) {
          element.style.zIndex = "";
          element.style.transition = 'unset';
          element.style.transform = `translate(${left}px, ${top}px)`;
          moves.push(element);
        }
      }
    }

    const { target } = this;
    const { data } = target;
    const current = target.getBoundingClientRect();
    const left = data.left - current.left;
    const top = data.top - current.top;
    target.style.zIndex = 1;
    target.style.transition = 'unset';
    target.style.transform = `translate(${left}px, ${top}px)`;
  }
  /**
   * 下一帧应用动效，复原原位
   */
  play() {
    requestAnimationFrame(() => {
      for (const element of this.moves) {
        element.style.transition = "";
        element.style.transform = "";
      }
      const { target } = this;
      target.style.transition = "";
      target.style.transform = "";
    });
  }
}