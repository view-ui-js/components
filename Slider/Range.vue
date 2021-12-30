<template>
  <div class="v-slider">
    <div class="v-slider-range-track" @mousedown="mousedown">
      <div class="v-slider-baseline">
        <div
          class="v-slider-progress vt-main"
          :style="{ left, right, transition }"
        >
          <div class="v-slider-button v-slider-left">
            <!-- <Bubble
              v-if="bubble"
              class="v-slider-bubble"
              ref="bubble"
              :gap="14"
            >{{ scope[0] }}</Bubble>-->
          </div>
          <div class="v-slider-button v-slider-right">
            <!-- <Bubble
              v-if="bubble"
              class="v-slider-bubble"
              ref="bubble"
              :gap="14"
            >{{ scope[1] }}</Bubble>-->
          </div>
        </div>
      </div>
    </div>
    <div v-if="step" ref="gauge" class="v-slider-gauge">
      <span v-for="(value, key) in ruler" :key="key">{{ value }}</span>
    </div>
  </div>
</template>

<script>
import mixing from "./mixing.js";
export default {
  name: "SliderRange",
  extends: mixing,
  data() {
    return {
      left: 0,
      right: 0,
      pageLeft: 0, // 滑条相对文档左侧的距离
      transition: "",
      v1: 0,
      v2: 0,
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
     * 按下鼠标时确定静态点和动态点
     */
    mousedown(ev) {
      this.transition = "all 0.2s";
      const value = Math.floor(ev.pageX - this.pageLeft);
      // 限定区域内
      if (value >= 0 && value <= this.width) {
        // 小于左滑块
        if (value <= this.p1) {
          this.p1 = value;
          this.static = this.p2;
        }
        // 大于右滑块
        else if (value >= this.p2) {
          this.p2 = value;
          this.static = this.p1;
        }
        // 居间，使用偏置优先
        else {
          const spacing = Math.floor((this.p2 - this.p1) / 2);
          // 左偏移
          if (value - this.p1 < spacing) {
            this.p1 = value;
            this.static = this.p2;
          }
          // 右偏移
          else {
            this.p2 = value;
            this.static = this.p1;
          }
        }
      }
      // 下限约束
      else if (value < 0) {
        this.p1 = 0;
        this.static = this.p2;
      }
      // 上限约束
      else if (value > this.width) {
        this.p2 = this.width;
        this.static = this.p1;
      }
      this.left = this.p1 + "px";
      this.right = this.width - this.p2 + "px";

      this.scope = this.getScope(this.p1, this.p2);
      document.body.addEventListener("mousemove", this.mousemove);
      document.body.addEventListener("mouseup", this.mouseup);
    },
    /**
     * 两个坐标点中只有一个为动态，另外一个在鼠标释放前始终为静态
     * 静态点和动态点都需要且进行同步换向，否则会出现换向点抖动和错位问题
     */
    mousemove(ev) {
      this.transition = "none";
      const value = Math.floor(ev.pageX - this.pageLeft);
      // 限定区域内
      if (value >= 0 && value <= this.width) {
        if (value < this.static) {
          this.p1 = value;
          this.p2 = this.static;
        } else {
          this.p1 = this.static;
          this.p2 = value;
        }
      }

      // 下限约束
      else if (value < 0) {
        this.p1 = 0;
        this.p2 = this.static;
      }

      // 上限约束
      else if (value > this.width) {
        this.p1 = this.static;
        this.p2 = this.width;
      }

      this.left = this.p1 + "px";
      this.right = this.width - this.p2 + "px";

      this.scope = this.getScope(this.p1, this.p2);
    },
    mouseup(ev) {
      // change优先级高于input
      this.$emit("change", this.scope);
      this.$emit("input", this.scope);
      document.body.removeEventListener("mousemove", this.mousemove);
      document.body.removeEventListener("mouseup", this.mouseup);
    },
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
};
</script>

<style lang="scss" scoped>
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
      transition: all 0.2s;
      .v-slider-button {
        position: absolute;
        z-index: 10;
        top: -6px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        display: inline-block;
        background-color: #fff;
        transition: all 0.25s;
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
    .v-slider-button {
      border: 2px solid var(--main-background);
    }
    .v-bubble-content {
      background-color: var(--main-background) !important;
    }
    .v-bubble-arrow-right:after {
      border-right-color: var(--main-background) !important;
    }
    .v-bubble-arrow-left:after {
      border-left-color: var(--main-background) !important;
    }
    .v-bubble-arrow-top:after {
      border-top-color: var(--main-background) !important;
    }
    .v-bubble-arrow-bottom:after {
      border-bottom-color: var(--main-background) !important;
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