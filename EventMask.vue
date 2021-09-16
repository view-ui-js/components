<template>
  <div
    v-show="mask"
    class="v-events-mask"
    @mousemove.stop="mousemove"
    @mouseup="mouseup"
  ></div>
</template>

<script>
/** 通用可视区遮罩层，单例组件 */
import Adaptor from "./Adaptor.js";
export default {
  instance: undefined,
  down: false,
  data() {
    return { mask: false };
  },
  methods: {
    mousedown(e) {
      if (e.button !== 0) return; // 仅限鼠标左键
      this.down = true;
      this.clientX = e.clientX;
      this.mousemovecb = undefined;
      this.mouseupcb = undefined;
      this.mask = true;
    },
    mousemove(e) {
      if (this.down === false) return;
      e.moveX = e.clientX - this.clientX;
      this.mousemovecb(e);
    },
    mouseup(e) {
      if (this.down === false) return;
      this.down = false;
      this.mask = false;
      e.moveX = e.clientX - this.clientX;
      this.mouseupcb(e);
      this.clientX = undefined;
    },
  },
  /**
   *鼠标按下时，激活遮罩层
   */
  mousedown(e) {
    if (this.instance === undefined) {
      this.instance = Adaptor.Component(this, "v-events-mask-container");
    }
    this.instance.mousedown(e);
  },
  /**
   * 注册 mousemove、mouseup 代理事件
   */
  on(name, cb) {
    this.instance[`${name}cb`] = cb;
  },
};
</script>

<style lang="scss" scoped>
.v-events-mask {
  position: fixed;
  z-index: 10000000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
