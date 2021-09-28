<template>
  <div
    v-show="mask"
    class="v-events-mask"
    @pointermove.stop="pointermove"
    @pointerup="pointerup"
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
    pointerdown(e) {
      if (e.button !== 0) return; // 仅限鼠标左键
      this.down = true;
      this.clientX = e.clientX;
      this.pointermovecb = undefined;
      this.pointerupcb = undefined;
      this.mask = true;
    },
    pointermove(e) {
      if (this.down === false) return;
      e.moveX = e.clientX - this.clientX;
      this.pointermovecb(e);
    },
    pointerup(e) {
      if (this.down === false) return;
      this.down = false;
      this.mask = false;
      e.moveX = e.clientX - this.clientX;
      this.pointerupcb(e);
      this.clientX = undefined;
    },
  },
  /**
   *鼠标按下时，激活遮罩层
   */
  pointerdown(e) {
    if (this.instance === undefined) {
      this.instance = Adaptor.Component(this, "v-events-mask-container");
    }
    this.instance.pointerdown(e);
  },
  /**
   * 注册 pointermove、pointerup 代理事件
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
