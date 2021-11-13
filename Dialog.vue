<template>
  <transition name="fade" appear>
    <div class="v-mask" ref="maskBox" @click="maskClick" @pointerdown.stop>
      <div class="v-dialog col" :style="style">
        <i class="vicon v-dialog-close" @click="close">&#xe679;</i>
        <div v-if="title" class="v-dialog-header">{{ title }}</div>
        <div v-else-if="$slots.header" class="v-dialog-header">
          <slot name="header"></slot>
        </div>
        <div class="v-dialog-main col">
          <slot />
        </div>
        <div v-if="$slots.footer" class="v-dialog-footer">
          <slot name="footer"></slot>
        </div>
        <div v-else-if="onConfirm" class="v-dialog-footer">
          <Button @click="close">取消</Button>
          <Button color="success" @click="$emit('confirm')">确认</Button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "Dialog",
  components: { Button },
  props: {
    title: String,
    mask: Boolean,
    maskClose: Boolean,
    width: String,
    height: String,
  },
  emits: ["confirm", "close"],
  data() {
    const { onConfirm } = this.$attrs;
    const { width, height } = this;
    return {
      onConfirm,
      style: { width, height },
    };
  },
  methods: {
    maskClick(event) {
      if (this.maskClose === true) {
        // 事件来源判断，只有事件来源于自身才触发
        if (event.target === this.$refs.maskBox) {
          this.close();
        }
      }
    },
    close() {
      this.$emit("close");
    },
  },
  // mounted() {
  //   document.body.appendChild(this.$el);
  // },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.v-mask {
  position: fixed;
  z-index: 50000;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  // background-color: #bdbdbdc4;
  // backdrop-filter: blur(2px);
  background-color: #25262db2;

  // v-dialog内部容器过渡动画
  &.fade-enter-active .v-dialog,
  &.fade-leave-active .v-dialog {
    transition: transform 0.25s cubic-bezier(0.59, 1.25, 0.84, 1.18);
  }
  &.fade-enter-from .v-dialog,
  &.fade-leave-to .v-dialog {
    transform: scale(0.9);
  }
  &.v-mask-hide {
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0);
  }
  .v-dialog {
    position: relative;
    min-width: 300px;
    min-height: 200px;
    pointer-events: auto;
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.25s ease;
    .v-dialog-close {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 10000;
      cursor: pointer;
      font-size: 22px;
      color: #828282;
      transition: transform 0.5s;
      &:hover {
        transform: rotate(90deg);
      }
    }
    .v-dialog-header {
      padding: 12px;
      font-size: 16px;
      color: #828282;
      flex: none;
      z-index: 1;
      i {
        margin-right: 5px;
        font-size: 18px;
      }
    }
    .v-dialog-main {
      position: relative;
      background-color: #fff;
      overflow-y: auto;
      flex: 1;
    }
    .v-dialog-footer {
      padding: 8px 5px;
      text-align: right;
      box-sizing: border-box;
      border-top: 1px solid #f5f5f5;
    }
  }
}
</style>