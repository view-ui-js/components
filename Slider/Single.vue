<template>
  <div class="vi-slider">
    <div class="vi-slider-track" @mousedown="mousedown">
      <dir class="vi-slider-baseline">
        <div class="vi-slider-progress vt-main" :style="progress">
          <div class="vi-slider-button"></div>
          <div class="vi-slider-right">
            <Bubble
              class="vi-slider-bubble"
              ref="bubble"
              :gap="14"
              :border="false"
              >{{ scope[1] + unit }}</Bubble
            >
          </div>
        </div>
      </dir>
    </div>
    <div v-if="step" ref="gauge" class="vi-slider-gauge">
      <span v-for="(value, key) in ruler" :key="key">{{ value }}</span>
    </div>
  </div>
</template>

<script>
import mixing from "./mixing.js";
export default {
  name: "Slider",
  extends: mixing,
  data() {
    return {
      progress: {
        right: 0,
      },
    };
  },
  methods: {
    mousedown(event) {
      const { pageX } = event;

      this.lastPageX = pageX;
      this.x = pageX - this.left;

      this.progress.right = this.clientWidth - this.x + "px";
      this.scope = this.getScope(this.x);

      document.body.addEventListener("mousemove", this.mousemove);
      document.body.addEventListener("mouseup", this.mouseup);
    },
    mousemove(ev) {
      this.x += ev.pageX - this.lastPageX;
      this.lastPageX = ev.pageX;
      if (this.x >= 0 && this.x <= this.clientWidth) {
        this.progress.right = this.clientWidth - this.x + "px";
        this.scope = this.getScope(this.x);
      } else if (this.x < 0) {
        this.progress.right = this.clientWidth + "px";
        this.scope = [0, 0];
      } else if (this.x > this.clientWidth) {
        this.progress.right = "0px";
        const { min, max } = this;
        this.scope = { min, max };
      }
    },
    mouseup(ev) {
      this.$emit("input", this.scope);
      this.$emit("change", this.scope);
      document.body.removeEventListener("mousemove", this.mousemove);
      document.body.removeEventListener("mouseup", this.mouseup);
    },
    getScope(x) {
      const { min, max } = this;
      const value = (x / this.clientWidth) * max;
      return [min, Math.floor(value)];
    },
  },
  mounted() {
    this.$nextTick(() => {
      const { width, left } = this.$el.getBoundingClientRect();

      this.left = left;
      this.clientWidth = width;
      const [min, max] = this.range;

      // 还原
      const [v0, v1] = this.value;
      this.x1 = Math.floor((v1 / max) * this.clientWidth);
      this.progress.right = this.x1 + "px";

      if (this.step) {
        const { gauge } = this.$refs;
        const stepWidth = this.clientWidth / this.step;
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
      .vi-slider-track .vi-slider-button {
        border: 2px solid ${main.background} !important;
      }
      .vi-slider-track .vi-bubble-content{
         background-color: ${main.background} !important;
      }
      .vi-slider-track .vi-bubble-arrow-right:after{
         border-right-color: ${main.background} !important;
      }
      .vi-slider-track .vi-bubble-arrow-left:after{
         border-left-color: ${main.background} !important;
      }
      .vi-slider-track .vi-bubble-arrow-top:after{
         border-top-color: ${main.background} !important;
      }
      .vi-slider-track .vi-bubble-arrow-bottom:after{
         border-bottom-color: ${main.background} !important;
      }
    `;
  }
};
</script>

<style lang="scss">
.vi-slider-track {
  position: relative;
  width: 100%;
  padding: 6px 0;
  &:hover {
    .vi-slider-baseline {
      background-color: #cccccc;
    }
  }
  .vi-slider-baseline {
    height: 4px;
    background-color: #efefef;
    transition: background 0.15s ease-in-out;
    border-radius: 3px;
  }
  &:hover {
    cursor: pointer;
  }
  .vi-slider-progress {
    position: absolute;
    left: 0;
    height: inherit;
    border-radius: inherit;
    .vi-slider-button {
      position: absolute;
      z-index: 10;
      right: 0;
      top: -6px;
      width: 15px;
      height: 15px;
      margin-right: -7.5px;
      border-radius: 50%;
      background-color: #fff;
      transition: all 0.3s;
      &:hover {
        box-shadow: 0 0 0 5px rgba(24, 144, 255, 0.2);
      }
    }
    .vi-slider-right {
      position: absolute;
      right: 0;
    }
  }
}
</style>