<template>
  <span class="vi-bubble-fixe-hide">
    <div
      class="vi-bubble-fixe"
      :class="className"
      :style="style"
      @mouseenter="$emit('mouseenter')"
      @mouseleave="$emit('mouseleave')"
    >
      <div class="vi-bubble-fixe-content">
        <slot></slot>
      </div>
      <div :class="'vi-bubble-fixe-arrow-' + direction" :style="arrow"></div>
    </div>
  </span>
</template>

<script>
export default {
  name: "BubbleFixe",
  props: {
    placement: {
      type: String,
      default: "top"
    },
    gap: {
      type: Number,
      default: 10
    },
    className: ""
  },
  data() {
    return {
      style: {},
      arrow: {},
      direction: "top"
    };
  },
  methods: {
    // 水平自适应，用于横向定位
    level() {
      const { left, right, width } = this.parentNode;
      const widthCenter = (this.bubble.width - width) / 2;
      if (left < widthCenter) {
        // 左浮动
        this.style.left = 0;
        this.arrow = { left: left + width / 2 - 6 + "px" };
      } else if (global.innerWidth < right + widthCenter) {
        // 右浮动
        this.style.right = 0;
        this.arrow = {
          right: global.innerWidth - right + width / 2 + "px"
        };
      } else {
        // 居中
        this.style.left = left - widthCenter + "px";
        this.arrow = { left: this.bubble.width / 2 - 6 + "px" };
      }
    },
    // 垂直自适应，用于纵向定位
    vertical() {
      let { top, bottom, height } = this.parentNode;
      let heightCenter = (this.bubble.height - height) / 2;
      if (top < heightCenter) {
        // 上浮动
        this.style.top = 0;
        this.arrow = { top: top + height / 2 - 7 + "px" };
      } else if (global.innerHeight < bottom + heightCenter) {
        // 下浮动
        this.style.bottom = 0;
        this.arrow = {
          bottom: global.innerHeight - bottom + height / 2 + "px"
        };
      } else {
        // 垂直居中
        this.style.top = top - heightCenter + "px";
        this.arrow = { top: this.bubble.height / 2 - 7 + "px" };
      }
    },
    top() {
      this.level();
      const { top, bottom, height } = this.parentNode;
      if (top > this.bubble.height) {
        this.direction = "top";
        this.style.top = top - this.bubble.height - this.gap + "px";
      } else {
        this.direction = "bottom";
        this.style.top = bottom + this.gap + "px";
      }
    },
    bottom() {
      this.level();
      const { top, bottom, height } = this.parentNode;
      if (global.innerHeight - bottom > this.bubble.height) {
        this.direction = "bottom";
        this.style.top = bottom + this.gap + "px";
      } else {
        this.direction = "top";
        this.style.top = top - this.bubble.height - this.gap + "px";
      }
    },
    right() {
      this.vertical();
      const { right, left, width } = this.parentNode;
      if (global.innerWidth - right > this.bubble.width) {
        this.direction = "right";
        this.style.left = right + this.gap + "px";
      } else {
        this.direction = "left";
        this.style.left = left - this.bubble.width - this.gap + "px";
      }
    },
    left() {
      this.vertical();
      const { right, left, width } = this.parentNode;
      if (left > this.bubble.width) {
        this.direction = "left";
        this.style.left = left - this.bubble.width - this.gap + "px";
      } else {
        this.direction = "right";
        this.style.left = right - this.gap + "px";
      }
    },
    initView() {
      this.parentNode = this.$el.parentNode.getBoundingClientRect();
      this.bubble = this.childNode.getBoundingClientRect();
      this[this.placement]();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.parentNode = this.$el.parentNode.getBoundingClientRect();
      // Vue中在使用appendChild方法改变节点位置后，再次渲染时父节点parentNode位置不会被初始化。
      // 暂时使用隐藏节点作为锚点，避免appendChild后再也回不去。
      this.childNode = this.$el.childNodes[0];
      document.body.appendChild(this.childNode);
      this.bubble = this.childNode.getBoundingClientRect();
      if (this[this.placement]) this[this.placement]();
    });
  },
  destroyed() {
    // Vue不会自动销毁已移动至组件外部的子节点，需要开发者自行管理组件外部的子节点
    //  document.body.removeChild(this.childNode);
    this.childNode.remove();
  },
  install(Vue) {
    Vue.component(this.name, this);
  }
};
</script>

<style lang="scss">
.vi-bubble-fixe-hide {
  display: none;
}
.vi-bubble-fixe {
  position: fixed;
  z-index: 2000;
  color: #999;
  line-height: normal;
  .vi-bubble-fixe-content {
    background-color: #fff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  @mixin arrow {
    position: absolute;
    height: 7px;
    width: 7px;
    &:before {
      content: "";
      width: 0;
      height: 0;
      position: absolute;
    }
    &:after {
      content: "";
      width: 0;
      height: 0;
      position: absolute;
    }
  }
  .vi-bubble-fixe-arrow-left {
    @include arrow;
    right: -7px;
    &:before {
      left: 1px;
      border-left: 7px solid #dedede;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
    }
    &:after {
      border-left: 7px solid #ffffff;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
    }
  }
  .vi-bubble-fixe-arrow-right {
    @include arrow;
    left: -7px;
    &:before {
      left: -1px;
      border-top: 6px solid transparent;
      border-right: 7px solid #dedede;
      border-bottom: 6px solid transparent;
    }
    &:after {
      border-top: 6px solid transparent;
      border-right: 7px solid #ffffff;
      border-bottom: 6px solid transparent;
    }
  }
  .vi-bubble-fixe-arrow-top {
    @include arrow;
    bottom: -7px;
    &:before {
      left: -1px;
      border-top: 7px solid #dedede;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
    }
    &:after {
      border-top: 7px solid #ffffff;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
    }
  }
  .vi-bubble-fixe-arrow-bottom {
    @include arrow;
    top: -7px;
    &:before {
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid #dedede;
    }
    &:after {
      top: 1px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 7px solid #ffffff;
    }
  }
}
</style>