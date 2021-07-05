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
      default: 10,
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
     * 水平自适应，用于横向定位
     */
    level() {
      const { parentRect, bubbleRect } = this;
      const { left, right, width } = parentRect;
      const center = (bubbleRect.width - width) / 2;
      // console.log(bubbleRect);
      if (left < center) {
        // 左靠齐
        this.style.left = left + "px";
        this.arrow = { left: width / 2 - 4 + "px" };
      } else if (window.innerWidth - right < center) {
        // 右靠齐
        this.style.right = window.innerWidth - right + "px";
        this.arrow = { right: width / 2 - 4 + "px" };
      } else {
        // 居中
        this.style.left = left - center + "px";
        this.arrow = { left: width / 2 - 4 + "px" };
      }
    },
    /**
     * 垂直自适应，用于纵向定位
     */
    vertical() {
      let { top, bottom, height } = this.parentRect;
      let heightCenter = (this.bubbleRect.height - height) / 2;
      if (top < heightCenter) {
        // 上浮动
        this.style.top = 0;
        this.arrow = { top: top + height / 2 - 8 + "px" };
      } else if (window.innerHeight < bottom + heightCenter) {
        // 下浮动
        this.style.bottom = 0;
        this.arrow = {
          bottom: window.innerHeight - bottom + height / 2 + "px",
        };
      } else {
        // 垂直居中
        this.style.top = top - heightCenter + "px";
        this.arrow = { top: this.bubbleRect.height / 2 - 8 + "px" };
      }
    },
    top() {
      this.level();
      const { top, bottom } = this.parentRect;
      if (top > this.bubbleRect.height) {
        this.direction = "top";
        this.style.top = top - this.bubbleRect.height - this.gap + "px";
      } else {
        this.direction = "bottom";
        this.style.top = bottom + this.gap + "px";
      }
    },
    bottom() {
      this.level();
      const { top, bottom } = this.parentRect;
      if (window.innerHeight - bottom > this.bubbleRect.height) {
        this.direction = "bottom";
        this.style.top = bottom + this.gap + "px";
      } else {
        this.direction = "top";
        this.style.top = top - this.bubbleRect.height - this.gap + "px";
      }
    },
    right() {
      this.vertical();
      const { right, left } = this.parentRect;
      if (window.innerWidth - right > this.bubbleRect.width) {
        this.direction = "right";
        this.style.left = right + this.gap + "px";
      } else {
        this.direction = "left";
        this.style.left = left - this.bubbleRect.width - this.gap + "px";
      }
    },
    left() {
      this.vertical();
      const { right, left } = this.parentRect;
      if (left > this.bubbleRect.width) {
        this.direction = "left";
        this.style.left = left - this.bubbleRect.width - this.gap + "px";
      } else {
        this.direction = "right";
        this.style.left = right - this.gap + "px";
      }
    },
    /**
     * 页面初始化
     */
    init() {
      this.parentRect = this.$parentNode.getBoundingClientRect();
      this.bubbleRect = this.$el.getBoundingClientRect();
      if (this[this.placement]) this[this.placement]();
    },
  },
  mounted() {
    this.$parentNode = this.$el.parentNode;
    document.body.appendChild(this.$el);
    this.$nextTick(() => {
      this.init();
    });
  },
  activated() {
    this.init();
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
    flex-direction: column;
    flex-direction: row-reverse;
    .vi-bubble-arrow {
      @include arrow;
      height: 8px;
      i {
        top: -4px;
      }
    }
  }
}
</style>