<template>
  <div class="v-slider">
    <div class="v-slider-range-track" @mousedown="mousedown">
      <div class="v-slider-baseline">
        <div class="v-slider-progress vt-main" :style="{ left, right }">
          <v-bubble
            v-if="bubble"
            class="v-slider-bubble"
            ref="bubble"
            :border="false"
            :gap="14"
          >{{ scope[0] + ' - ' + scope[1] + unit }}</v-bubble>
          <div class="v-slider-button v-slider-left"></div>
          <div class="v-slider-button v-slider-right"></div>
        </div>
      </div>
    </div>
    <div v-if="step" ref="gauge" class="v-slider-gauge">
      <span v-for="(value, key) in ruler" :key="key">{{value}}</span>
    </div>
  </div>
</template>

<script>
import base from "./base.js";
import theme from "../theme.js";
export default {
  name: "ViSliderRange",
  extends: base,
  data() {
    return {
      left: 0,
      right: 0,
      pageLeft: 0, // 滑条相对文档左侧的距离
      v1: 0,
      v2: 0
    };
  },
  methods: {
    getScope(x1, x2) {
      const { max } = this;
      const v1 = x1 !== 0 ? (x1 / this.width) * max : 0;
      const v2 = x2 !== 0 ? (x2 / this.width) * max : 0;
      return [Math.floor(v1), Math.floor(v2)];
    },
    /**
     * 限位器
     */
    Limiter(ev, callback) {
      const value = Math.floor(ev.pageX - this.pageLeft);

      // 限定区域内
      if (value >= 0 && value <= this.width) {
        callback(value);
      }
      // 下限约束
      else if (value < 0) {
        this.p1 = value;
        this.left = "0px";
      }
      // 上限约束
      else if (value > this.width) {
        this.p2 = value;
        this.right = "0px";
      }

      this.scope = this.getScope(this.p1, this.p2);
    },
    mousedown(ev) {
      this.Limiter(ev, value => {
        // 小于左滑块
        if (value <= this.p1) {
          this.p1 = value;
          this.left = value + "px";
          this.static = this.p2;
        }
        // 大于右滑块
        else if (value >= this.p2) {
          this.p2 = value;
          this.right = this.width - this.p2 + "px";
          this.static = this.p1;
        }
        // 居间，使用偏置优先
        else {
          const spacing = Math.floor((this.p2 - this.p1) / 2);
          // 左偏移
          if (value - this.p1 < spacing) {
            this.p1 = value;
            this.left = value + "px";
            this.static = this.p2;
          }
          // 右偏移
          else {
            this.p2 = value;
            this.right = this.width - this.p2 + "px";
            this.static = this.p1;
          }
        }
      });
      document.body.addEventListener("mousemove", this.mousemove);
      document.body.addEventListener("mouseup", this.mouseup);
    },
    mousemove(ev) {
      // 两个标点中只有一个为动态，以静态标点的位置作为换向点
      // 为了防止换向抖动，因该同时设置left和right值，并使用static值对其中一个值进行初始化
      this.Limiter(ev, value => {
        if (value < this.static) {
          this.p1 = value;
          this.p2 = this.static;
        } else {
          this.p1 = this.static;
          this.p2 = value;
        }
        this.left = this.p1 + "px";
        this.right = this.width - this.p2 + "px";
      });
    },
    mouseup(ev) {
      // change优先级高于input
      this.$emit("change", this.scope);
      this.$emit("input", this.scope);
      document.body.removeEventListener("mousemove", this.mousemove);
      document.body.removeEventListener("mouseup", this.mouseup);
    }
  },
  mounted() {
    // 初始状态赋值
    this.$nextTick(() => {
      const { width, left } = this.$el.getBoundingClientRect();

      this.pageLeft = left;
      this.width = width;

      const { min, max } = this;
      const [v1, v2] = this.value;

      this.p1 = Math.floor(((v1 - min) / max) * width);
      this.p2 = Math.floor(((v2 - min) / max) * width);

      this.left = this.p1 + "px";
      this.right = width - this.p2 + "px";

      // 生成标尺数组
      if (this.step) {
        const { gauge } = this.$refs;
        const stepWidth = width / this.step;
        gauge.style.width = width + stepWidth + "px";
        gauge.style.marginLeft = `-${stepWidth / 2}px`;
        const stepValue = max / this.step;
        for (let i = min; i <= max; i += stepValue) {
          this.ruler.push(i);
        }
      }
    });
  },
  style({ main }) {
    return `
      .v-slider-baseline .v-slider-button {
        border: 2px solid ${main.background};
      }
      .v-slider-baseline .v-bubble-content{
         background-color: ${main.background} !important;
      }
      .v-slider-baseline .v-bubble-arrow-right:after{
         border-right-color: ${main.background} !important;
      }
      .v-slider-baseline .v-bubble-arrow-left:after{
         border-left-color: ${main.background} !important;
      }
      .v-slider-baseline .v-bubble-arrow-top:after{
         border-top-color: ${main.background} !important;
      }
      .v-slider-baseline .v-bubble-arrow-bottom:after{
         border-bottom-color: ${main.background} !important;
      }
    `;
  },
  install(app) {
    app.component(this.name, this);
    theme.style(this.style);
  }
};
</script>

<style lang="scss">
@import "../style/var.scss";
.v-slider-range-track {
  width: 100%;
  padding: 6px 0;
  .v-slider-baseline {
    position: relative;
    width: 100%;
    height: 4px;
    background-color: #efefef;
    border-radius: 3px;
    transition: background 0.15s;
    .v-slider-progress {
      position: absolute;
      left: 0;
      right: 0;
      height: 4px;
      .v-slider-button {
        position: absolute;
        z-index: 10;
        top: -6px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        display: inline-block;
        background-color: #fff;
        transition: all 0.3s;
        transform: translate(-50%, 0%);
        &:hover {
          box-shadow: 0 0 0 5px rgba(24, 144, 255, 0.2);
        }
      }
      .v-slider-left {
        left: 0;
      }
      .v-slider-right {
        left: 100%;
      }
    }
  }
  &:hover {
    cursor: pointer;
    .v-slider-baseline {
      background-color: #cccccc;
    }
  }
}
</style>