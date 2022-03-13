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
    this.queue = [form.children, to.children];
    for (const list of this.queue) {
      for (const element of list) {
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
  insert(target, reference) {
    this.target = target;
    const { left, top } = target.getBoundingClientRect();
    target.data = { left, top };
    const { to } = this;
    if (reference) {
      to.insertBefore(target, reference);
    } else {
      to.appendChild(target);
    }
    this.keep();
  }
  /**
   * 将队列保持在之前的位置
   * 受新插入元素的影响，周围的同级元素可能会出现空缺位移，需要为偏移元素添加过渡动效
   */
  keep() {

    const moves = [];

    for (const list of this.queue) {
      for (const element of list) {
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

    // 新插入元素保持原位
    const { target } = this;
    const { data, style } = target;
    const current = target.getBoundingClientRect();
    const left = data.left - current.left;
    const top = data.top - current.top;
    style.zIndex = 1;
    style.transition = 'unset';
    style.transform = `translate(${left}px, ${top}px)`;
    
  }
  /**
   * 应用动效，过渡到新的位置
   */
  play() {
    // 下一帧移除 transition、transform属性，让元素恢复原位
    requestAnimationFrame(() => {
      for (const { style } of this.moves) {
        style.transition = "";
        style.transform = "";
      }
      const { style } = this.target;
      style.transition = "";
      style.transform = "";
    });
  }
}