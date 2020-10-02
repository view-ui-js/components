<template>
  <transition name="fade" appear>
    <div class="vi-mask" ref="maskBox" @click="maskClick" @mousedown.stop>
      <div class="vi-dialog col" :style="style">
        <i class="vicon vi-dialog-close" @click="close">&#xe679;</i>
        <div v-if="title" class="vi-dialog-header">{{title}}</div>
        <div v-else-if="$slots.header" class="vi-dialog-header">
          <slot name="header"></slot>
        </div>
        <div class="vi-dialog-main col">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="vi-dialog-footer">
          <slot name="footer"></slot>
        </div>
        <div v-else-if="confirm" class="vi-dialog-footer">
          <Button @click="close">取消</Button>
          <Button color="success" @click="$emit('confirm')">确认</Button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    title: String,
    mask: Boolean,
    maskClose: Boolean,
    width: String,
    height: String,
  },
  data() {
    const { confirm } = this._events;
    const { width, height } = this;
    return {
      confirm,
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
  mounted() {
    document.body.appendChild(this.$el);
  },
  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>

<style lang="scss">
.vi-mask {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #bdbdbdc4;
  backdrop-filter: blur(2px);
  // vi-dialog容器过渡动画
  &.fade-enter .vi-dialog,
  &.fade-leave-to .vi-dialog {
    transform: scale(1.01);
  }
  &.fade-enter-active .vi-dialog,
  &.fade-leave-active .vi-dialog {
    transition: transform 0.3s ease;
  }
  &.vi-mask-hide {
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0);
  }
  .vi-dialog {
    position: relative;
    min-width: 300px;
    min-height: 200px;
    pointer-events: auto;
    background-color: #fff;
    border-radius: 2px;
    transition: all 0.3s ease;
    .vi-dialog-close {
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
    .vi-dialog-header {
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
    .vi-dialog-main {
      position: relative;
      background-color: #fff;
      overflow-y: auto;
      flex: 1;
    }
    .vi-dialog-footer {
      padding: 8px 5px;
      text-align: right;
      box-sizing: border-box;
      border-top: 1px solid #f5f5f5;
    }
  }
}
</style>