<template>
  <div class="v-slider">
    <div class="v-slider-range-track" @mousedown="mousedown">
      <div class="v-slider-baseline">
        <div ref="left" class="v-slider-button v-slider-left"></div>
        <div ref="right" class="v-slider-button v-slider-right"></div>
        <div class="v-slider-progress vt-main" :style="progress">
          <v-bubble
            v-if="bubble"
            class="v-slider-bubble"
            ref="bubble"
            :gap="14"
            >{{ scope[0] + " - " + scope[1] + unit }}</v-bubble
          >
        </div>
      </div>
    </div>
    <div v-if="step" ref="gauge" class="v-slider-gauge">
      <span v-for="(value, key) in ruler" :key="key">{{ value }}</span>
    </div>
  </div>
</template>

<script>
import base from "./base.js";
export default {
  name: "SliderRange",
  extends: base,
  data() {
    return {
      progress: {
        left: 0,
        right: 0,
      },
      x1: 0,
      x2: 0,
    };
  },
  methods: {
    getMoveX(ev) {
      // console.log(this.startPageX, ev.pageX, this.targetX);
      return ev.pageX - this.startPageX + this.targetX;
    },
    getScope(x1, x2) {
      const max = this.range[1];
      const v1 = x1 !== 0 ? (x1 / this.clientWidth) * max : 0;
      const v2 = x2 !== 0 ? (x2 / this.clientWidth) * max : 0;
      return [Math.floor(v1), Math.floor(v2)];
    },
    mousedown(ev) {
      document.body.addEventListener("mousemove", this.mousemove);
      document.body.addEventListener("mouseup", this.mouseup);
      const { target, pageX } = ev;
      this.target = target;
      this.targetX = target.offsetLeft;
      this.startPageX = pageX;
    },
    mousemove(ev) {
      const x1 = this.getMoveX(ev);
      if (x1 >= 0 && x1 <= this.clientWidth) {
        // 小于重合点
        if (x1 <= this.x2) {
          this.x1 = x1;
        } else {
          // 切换Bottom
          this.x1 = this.x2;
          this.target.style.left = this.x1 + "px";
          this.progress.left = this.x1 + "px";
          this.$mousemove = this.rightMousemove;
          this.scope = this.getScope(this.x1, this.x2);
          this.target = this.$refs.right;
          return;
        }
      } else if (x1 < 0) {
        this.x1 = 0;
      } else if (x1 > this.clientWidth) {
        this.x1 = this.clientWidth;
      }
      this.scope = this.getScope(this.x1, this.x2);
      this.target.style.left = this.x1 + "px";
      this.progress.left = this.x1 + "px";
    },
    leftMousemove(ev) {},
    rightMousemove(ev) {
      const x2 = this.getMoveX(ev);
      if (x2 >= 0 && x2 <= this.clientWidth) {
        // 大于重合点
        if (x2 >= this.x1) {
          this.x2 = x2;
          this.progress.right = this.clientWidth - this.x2 + "px";
        } else {
          // 切换Bottom
          this.x2 = this.x1;
          this.target.style.left = this.x2 + "px";
          this.progress.right = this.clientWidth - this.x2 + "px";
          this.$mousemove = this.leftMousemove;
          this.scope = this.getScope(this.x1, this.x2);
          this.target = this.$refs.left;
          return;
        }
      } else if (x2 < 0) {
        this.x2 = 0;
        this.progress.right = this.clientWidth + "px";
      } else if (x2 > this.clientWidth) {
        this.x2 = this.clientWidth;
        this.progress.right = 0;
      }
      this.scope = this.getScope(this.x1, this.x2);
      this.target.style.left = this.x2 + "px";
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
    this.$nextTick(() => {
      this.clientWidth = this.$el.clientWidth;
      const [min, max] = this.range;

      const [v1, v2] = this.value;
      this.x1 = Math.floor((v1 / max) * this.clientWidth);
      this.x2 = Math.floor((v2 / max) * this.clientWidth);
      const { left, right, gauge } = this.$refs;

      // 还原值
      this.progress.left = this.x1 + "px";
      this.progress.right = this.clientWidth - this.x2 + "px";
      left.style.left = this.x1 + "px";
      right.style.left = this.x2 + "px";

      // 生成标尺数组
      if (this.step) {
        const stepWidth = this.clientWidth / this.step;
        gauge.style.width = this.clientWidth + stepWidth + "px";
        gauge.style.marginLeft = `-${stepWidth / 2}px`;
        const stepValue = max / this.step;
        for (let i = min; i <= max; i += stepValue) {
          this.ruler.push(i);
        }
      }
    });
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.v-slider-range-track {
  width: 100%;
  padding: 6px 0;
  .v-slider-baseline {
    position: relative;
    width: 100%;
    height: 4px;
    background-color: #efefef;
    border-radius: 3px;
    transition: background 0.15s ease-in-out;
    .v-slider-button {
      position: absolute;
      z-index: 10;
      top: -6px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      display: inline-block;
      background-color: #fff;
      transform: translate(-50%, 0%);
      border: 2px solid var(--main-background);
      &:hover {
        border: 2px solid var(--active-color);
      }
    }
    .v-slider-left {
      left: 0;
    }
    .v-slider-right {
      left: 100%;
    }
    .v-slider-progress {
      position: absolute;
      left: 0;
      right: 0;
      height: 4px;
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