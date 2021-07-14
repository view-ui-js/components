<template>
  <div
    class="vi-bubble"
    :class="[direction]"
    :style="style"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <div class="vi-bubble-content">
      <slot></slot>
    </div>
    <div class="vi-bubble-arrow">
      <i :style="arrow" />
    </div>
  </div>
</template>

<script>
import theme from "./theme.js";
export default {
  name: "Bubble",
  props: {
    placement: {
      type: String,
      default: "top",
    },
    gap: {
      type: Number,
      default: 6,
    },
  },
  emits: ["mouseenter", "mouseleave"],
  data() {
    return {
      style: {},
      arrow: {},
      direction: "top",
    };
  },
  methods: {
    /**
     * 水平自适应
     */
    level() {
      const { parentRect, $el } = this;
      const { left, right, width } = parentRect;
      const bubbleCenter = ($el.clientWidth - width) / 2;
      const parentCenter = width / 2;
      if (left < bubbleCenter) {
        // 左靠齐
        this.style.left = left + "px";
        this.arrow = { left: parentCenter - 4 + "px" };
      } else if (window.innerWidth - right < bubbleCenter) {
        // 右靠齐
        this.style.right = window.innerWidth - right + "px";
        this.arrow = { right: parentCenter - 4 + "px" };
      } else {
        // 居中
        this.style.left = left - bubbleCenter + "px";
        this.arrow = {};
      }
    },
    /**
     * 垂直自适应
     */
    vertical() {
      const { clientHeight } = this.$el;
      const { top, bottom, height } = this.parentRect;
      const bubbleCenter = (clientHeight - height) / 2;
      const parentCenter = height / 2;
      if (top < bubbleCenter) {
        // 上浮动
        this.style.top = top;
        this.arrow = { top: parentCenter - 4 + "px" };
      } else if (window.innerHeight - bottom < bubbleCenter) {
        // 下浮动
        this.style.bottom = bottom;
        this.arrow = { bottom: parentCenter - 4 + "px" };
      } else {
        // 居中
        this.style.top = top - bubbleCenter + "px";
        this.arrow = {};
      }
    },
    top() {
      this.level();
      const { clientHeight } = this.$el;
      const { top, bottom } = this.parentRect;
      if (top > clientHeight) {
        this.direction = "top";
        this.style.top = top - clientHeight - this.gap + "px";
      } else {
        this.direction = "bottom";
        this.style.top = bottom + this.gap + "px";
      }
    },
    bottom() {
      this.level();
      const { clientHeight } = this.$el;
      const { top, bottom } = this.parentRect;
      if (window.innerHeight - bottom > clientHeight) {
        this.direction = "bottom";
        this.style.top = bottom + this.gap + "px";
      } else {
        this.direction = "top";
        this.style.top = top - clientHeight - this.gap + "px";
      }
    },
    right() {
      this.vertical();
      const { right, left } = this.parentRect;
      if (window.innerWidth - right > this.$el.clientWidth) {
        this.direction = "right";
        this.style.left = right + this.gap + "px";
      } else {
        this.direction = "left";
        this.style.left = left - this.$el.clientWidth - this.gap + "px";
      }
    },
    left() {
      this.vertical();
      const { right, left } = this.parentRect;
      if (left > this.$el.clientWidth) {
        this.direction = "left";
        this.style.left = left - this.$el.clientWidth - this.gap + "px";
      } else {
        this.direction = "right";
        this.style.left = right - this.gap + "px";
      }
    },
    /**
     * 页面初始化
     */
    init() {
      this.$nextTick(() => {
        this.isInit = true;
        this.parentRect = this.$parentNode.getBoundingClientRect();
        if (this[this.placement]) {
          this[this.placement]();
        }
      });
    },
  },
  mounted() {
    this.$parentNode = this.$el.parentNode;
    document.body.appendChild(this.$el);
    this.init();
  },
  activated() {
    if (this.isInit) {
      this.init();
    }
  },
  install(app) {
    app.component(this.name, this);
    theme.style(this.style);
  },
};
</script>

<style lang="scss">
.vi-bubble {
  position: fixed;
  z-index: 1000000;
  display: flex;
  color: #999;
  line-height: normal;
  .vi-bubble-content {
    font-size: 12px;
    background-color: #fff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    overflow: hidden;
  }
  @mixin arrow {
    display: flex;
    justify-content: center;
    position: relative;
    i {
      display: block;
      width: 8px;
      height: 8px;
      background-color: #fff;
      position: absolute;
      transform: rotate(45deg);
    }
  }
  &.left {
    .vi-bubble-arrow {
      @include arrow;
      flex-direction: column;
      width: 8px;
      i {
        left: -4px;
      }
    }
  }
  &.right {
    flex-direction: row-reverse;
    .vi-bubble-arrow {
      @include arrow;
      flex-direction: column;
      width: 8px;
      i {
        left: 4px;
      }
    }
  }
  &.top {
    flex-direction: column;
    .vi-bubble-arrow {
      @include arrow;
      height: 8px;
      i {
        top: -4px;
      }
    }
  }
  &.bottom {
    flex-direction: column-reverse;
    .vi-bubble-arrow {
      @include arrow;
      height: 8px;
      i {
        top: 4px;
      }
    }
  }
}
</style>