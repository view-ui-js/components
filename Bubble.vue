<script>
export default {
  name: "Bubble",
  props: {
    placement: {
      type: String,
      default: "top",
    },
    gap: {
      type: Number,
      default: 0,
    },
  },
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
    const { $el, $attrs } = this;

    this.$parentNode = $el.parentNode;

    if ($attrs.onMouseenter) {
      $el.addEventListener("mouseenter", (e) => $attrs.onMouseenter(e));
    }
    if ($attrs.onMouseleave) {
      $el.addEventListener("mouseleave", (e) => $attrs.onMouseleave(e));
    }

    document.body.appendChild($el);

    this.init();
  },
  activated() {
    if (this.isInit) this.init();
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<template>
  <div class="v-bubble" :class="[direction]" :style="style">
    <div class="v-bubble-content">
      <slot />
    </div>
    <div class="v-bubble-arrow">
      <i :style="arrow" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-bubble {
  position: fixed;
  z-index: 1000000;
  display: flex;
  color: #999;
  line-height: normal;
  .v-bubble-content {
    max-width: 200px;
    font-size: 12px;
    line-height: 20px;
    background-color: #fff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    overflow: hidden;
  }
  @mixin arrow {
    display: flex;
    justify-content: center;
    position: relative;
    overflow: hidden;
    i {
      display: block;
      width: 8px;
      height: 8px;
      background-color: #fff;
      position: absolute;
      transform: rotate(45deg);
      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
    }
  }
  &.left {
    transform-origin: 100% 50%;
    .v-bubble-arrow {
      @include arrow;
      flex-direction: column;
      width: 8px;
      i {
        left: -4px;
      }
    }
  }
  &.right {
    transform-origin: 0% 50%;
    flex-direction: row-reverse;
    .v-bubble-arrow {
      @include arrow;
      flex-direction: column;
      width: 8px;
      i {
        left: 4px;
      }
    }
  }
  &.top {
    transform-origin: 50% 100%;
    flex-direction: column;
    .v-bubble-arrow {
      @include arrow;
      height: 8px;
      i {
        top: -4px;
      }
    }
  }
  &.bottom {
    transform-origin: 50% 0%;
    flex-direction: column-reverse;
    .v-bubble-arrow {
      @include arrow;
      height: 8px;
      i {
        top: 4px;
      }
    }
  }
}
</style>
