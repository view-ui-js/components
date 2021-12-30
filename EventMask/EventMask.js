import mask from './mask.js';

const isTouch ="ontouchstart" in document;

export default class {
  /**
   * 
   * @param {Element} el 事件绑定目标元素
   */
  constructor(el) {

    this.events = {};

    // 由于 touch 设备不存在目标脱离问题，所以不需要使用事件遮罩层
    if (isTouch) {

      el.addEventListener("touchstart", (e) => this.onstart(e, e.touches[0]));

      el.addEventListener("touchmove", (e) => this.onmove(e, e.touches[0]));

      el.addEventListener("touchend", (e) => this.onend(e, e));

    } else {

      this.down = false;

      el.addEventListener("mousedown", (e) => {

        if (e.button !== 0) return; // 仅限鼠标左键

        this.down = true;
        
        this.target = e.target;
        
        this.onstart(e, e);

        mask(this);

      });

    }

  }
  /**
   * 指针起始事件，参数初始化
   * @param {Event} e
   */
  onstart(e, point) {

    e.stopPropagation();

    this.start = point.clientX;
    this.last = point.clientX;
    this.move = null;
    this.emit('start', e);

  }
  /**
   * 指针移动事件
   * @param {Event} e 
   */
  onmove(e, point) {

    e.stopPropagation();

    this.move = point.clientX - this.last;

    this.emit('move', e);

    this.last = point.clientX;
    
  }
  /**
   * 指针释放事件
   */
  onend(e) {

    e.stopPropagation();

    this.emit('end', e);

  }
  /**
   * 注册事件
   */
  on(name, func) {

    if (func instanceof Function === false) return;

    let queue = this.events[name];

    if (!queue) {
      queue = this.events[name] = [];
    }

    queue.push(func);

  }
  /**
 * 发送事件
 * @param {String} name 发送事件名称
 * @param {Event} e 发送事件内容
 */
  emit(name, e) {

    const queue = this.events[name];

    if (queue) {
      for (const item of queue) item(e);
    }

  }
}
