/**
 * FLIP 跨元素列表穿梭过渡动效
 */

export default class Flip {
  /**
   * 过渡前保存元素的初始位置
   * @param {Element} form 父元素
   * @param {Element} to 父元素
   */
  constructor(form, to) {
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
   * 插入元素并保持原位，元素位置发生改变后视图不会实时响应，下一帧刷新前视图不会更新
   * @param {Element} el 目标元素
   * @param {Element} reference  迁移参照元素
   */
  insert(el, reference) {
    this.el = el;
    const { left, top } = el.getBoundingClientRect();
    el.data = { left, top };
    const { to } = this;
    if (reference) {
      to.insertBefore(el, reference);
    } else {
      to.appendChild(el);
    }
    this.keep();
  }
  /**
   * 保持在之前的位置
   * 受新插入元素的影响，周围的同级元素可能会出现空缺位移，需要为偏移元素添加过渡动效
   */
  keep() {

    const moves = [];
    for (const { children } of this.queue) {
      for (const element of children) {
        const { data, offsetLeft, offsetTop, style } = element;
        const left = data.offsetLeft - offsetLeft;
        const top = data.offsetTop - offsetTop;
        if (left || top) {
          style.zIndex = "";
          style.transition = 'unset';
          style.transform = `translate(${left}px, ${top}px)`;
          moves.push(element);
        }
      }
    }

    this.moves = moves;

    // 插入元素保持
    const { el } = this;
    const { data, style } = el;
    const current = el.getBoundingClientRect();
    const left = data.left - current.left;
    const top = data.top - current.top;
    style.zIndex = 1;
    style.transition = 'unset';
    style.transform = `translate(${left}px, ${top}px)`;
    
  }
  /**
   * 应用动效，复原原位
   */
  play() {
    // 下一帧移除 transition、transform属性，让元素恢复原位
    requestAnimationFrame(() => {
      for (const { style } of this.moves) {
        style.transition = "";
        style.transform = "";
      }
      const { style } = this.el;
      style.transition = "";
      style.transform = "";
    });
  }
}