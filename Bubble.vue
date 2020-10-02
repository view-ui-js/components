<template>
  <div class="vi-bubble" :class="{ 'vi-bubble-border': border }" :style="style"><div class="vi-bubble-content"><slot></slot></div><div :class="'vi-bubble-arrow-' + direction" :style="arrow"></div></div>
</template>

<script>
export default {
  name: "Bubble",
  props: {
    placement: {
      type: String,
      default: "top"
    },
    border: {
      type: Boolean,
      default: true
    },
    gap: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      style: {},
      arrow: {},
      direction: "top"
    };
  },
  methods: {
    // 水平自适应，计算top、bottom横向坐标
    level() {
      const { left, right, width } = this.parentNode;
      const clientLeft = (width - this.clientWidth) / 2;
      // 左浮动
      if (-clientLeft > left) {
        this.style.left = 0;
        this.arrow = { left: width / 2 - 6 + "px" };
      } else if (right + -clientLeft > global.innerWidth) {
        // 右浮动
        this.style.right = 0;
        this.arrow = { right: width / 2 + "px" };
      } else {
        // 居中
        this.style.left = clientLeft + "px";
        this.arrow = { left: this.clientWidth / 2 - 6 + "px" };
      }
    },
    // 垂直自适应，计算left、right纵向坐标
    vertical() {
      const { top, bottom, height } = this.parentNode;
      const clientTop = (height - this.clientHeight) / 2;
      // 上浮动
      if (clientTop < -top) {
        this.style.top = 0;
        this.arrow = { top: height / 2 - 7 + "px" };
      }
      // 下浮动
      else if (bottom + -clientTop > global.innerHeight) {
        this.style.bottom = 0;
        this.arrow = { bottom: height / 2 + "px" };
      }
      // 垂直居中
      else {
        this.style.top = clientTop + "px";
        this.arrow = { top: this.clientHeight / 2 - 7 + "px" };
      }
    },
    top() {
      this.level();
      const { top, bottom, height } = this.parentNode;
      if (top > this.clientHeight) {
        this.direction = "top";
        this.style.top = -(this.clientHeight + this.gap) + "px";
      } else {
        this.direction = "bottom";
        this.style.top = height + this.gap + "px";
      }
    },
    bottom() {
      this.level();
      const { top, bottom, height } = this.parentNode;
      if (bottom + this.clientHeight < global.innerHeight) {
        this.direction = "bottom";
        this.style.top = height + this.gap + "px";
      } else {
        this.direction = "top";
        this.style.top = -(this.clientHeight + this.gap) + "px";
      }
    },
    left() {
      this.vertical();
      const { right, left, width } = this.parentNode;
      if (left > this.clientWidth) {
        this.direction = "left";
        this.style.left = -(this.clientWidth + this.gap) + "px";
      } else {
        this.direction = "right";
        this.style.left = width + this.gap + "px";
      }
    },
    right() {
      this.vertical();
      const { right, left, width } = this.parentNode;
      if (right + this.clientWidth < global.innerWidth) {
        this.direction = "right";
        this.style.left = width + this.gap + "px";
      } else {
        this.direction = "left";
        this.style.left = -(this.clientWidth + this.gap) + "px";
      }
    },
    initView() {
      const { parentNode, clientWidth, clientHeight } = this.$el;
      this.parentNode = parentNode.getBoundingClientRect();
      this.clientWidth = clientWidth;
      this.clientHeight = clientHeight;
      if (this[this.placement]) this[this.placement]();
    }
  },
  mounted() {
    this.initView();
  },
  install(Vue) {
    Vue.component(this.name, this);
  }
};
</script>

<style lang="scss">
@mixin arrow {
  position: absolute;
  &:after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
  }
}
.vi-bubble {
  position: absolute;
  z-index: 500;
  color: #999;
  line-height: normal;
  cursor: default;
  white-space: nowrap;
  .vi-bubble-content {
    background-color: #fff;
    border-radius: 2px;
  }
  .vi-bubble-arrow-left {
    @include arrow;
    right: 1px;
    &:after {
      left: 0px;
      border-left: 7px solid #ffffff;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
    }
  }
  .vi-bubble-arrow-right {
    @include arrow;
    left: -6px;
    &:after {
      top: 0;
      left: 0px;
      border-top: 6px solid transparent;
      border-right: 7px solid #ffffff;
      border-bottom: 6px solid transparent;
    }
  }
  .vi-bubble-arrow-top {
    @include arrow;
    &:after {
      top: -1px;
      left: 0px;
      border-top: 7px solid #ffffff;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
    }
  }
  .vi-bubble-arrow-bottom {
    @include arrow;
    top: -7px;
    &:after {
      top: 1px;
      left: 0px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 7px solid #ffffff;
    }
  }
}
@mixin border {
  position: absolute;
  &:before {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
  }
}
.vi-bubble-border {
  .vi-bubble-content {
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  }
  .vi-bubble-arrow-left {
    @include border;
    right: 1px;
    &:before {
      left: 1px;
      border-left: 7px solid #dedede;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
    }
  }
  .vi-bubble-arrow-right {
    @include border;
    left: -6px;
    &:before {
      top: 0;
      left: -1px;
      border-top: 6px solid transparent;
      border-right: 7px solid #dedede;
      border-bottom: 6px solid transparent;
    }
  }
  .vi-bubble-arrow-top {
    @include border;
    &:before {
      top: 0px;
      left: 0px;
      border-top: 7px solid #dedede;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
    }
  }
  .vi-bubble-arrow-bottom {
    @include border;
    top: -7px;
    &:before {
      top: 0px;
      left: 0px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 7px solid #dedede;
    }
  }
}
</style>