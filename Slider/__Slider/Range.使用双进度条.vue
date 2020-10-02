<template>
   <div class="vi-slider-range">
      <div class="vi-slider-line">
         <div class="vi-slider-button vi-slider-left" @mousedown="mousedown($event,'left')"></div>
         <div class="vi-slider-button vi-slider-right" @mousedown="mousedown($event,'right')"></div>
         <div class="vi-slider-progress vi-slider-progress-left" :style="leftProgress"></div>
         <div class="vi-slider-progress vi-slider-progress-rtght" :style="rightProgress"></div>
      </div>
      <div class="vi-slider-gauge">
         <span v-for="(value,key) in ruler" :key="key">{{value}}</span>
         <span style="flex: none">不限</span>
      </div>
   </div>
</template>

<script>
export default {
  name: "ViSliderRange",
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      ruler: [],
      leftProgress: {
        width: 0
      },
      rightProgress: {
        width: 0
      }
    };
  },
  methods: {
    mousedown(ev, type) {
      this.type = type;
      this.progress = this[type + "Progress"];
      document.body.addEventListener("mousemove", this.mousemove);
      document.body.addEventListener("mouseup", this.mouseup);
      this.startX = ev.pageX;
      this.target = ev.target;
      this.targetX = ev.target.offsetLeft;
      this.clientWidth = this.$el.clientWidth;
    },
    mousemove(ev) {
      if (this.type === "left") {
        let moveX = this.targetX + (ev.pageX - this.startX);
        if (moveX >= 0 && moveX <= this.clientWidth) {
          this.target.style.left = moveX + "px";
          this.progress.width = moveX + "px";
        } else if (moveX < 0) {
          this.target.style.left = 0;
          this.progress.width = 0;
        } else if (moveX > this.clientWidth) {
          this.target.style.left = this.clientWidth + "px";
          this.progress.width = this.clientWidth + "px";
        }
      } else {
        let moveX = this.targetX + (ev.pageX - this.startX);
        if (moveX >= 0 && moveX <= this.clientWidth) {
          this.target.style.left = moveX + "px";
          this.progress.width = this.clientWidth - moveX + "px";
        } else if (moveX < 0) {
          this.target.style.left = 0;
          this.progress.width = this.clientWidth + "px";
        } else if (moveX > this.clientWidth) {
          this.target.style.left = this.clientWidth + "px";
          this.progress.width = 0;
        }
      }
    },
    mouseup(ev) {
      document.body.removeEventListener("mousemove", this.mousemove);
      document.body.removeEventListener("mouseup", this.mouseup);
    }
  },
  created() {
    this.$nextTick(() => {
      for (let i = this.min; i <= this.max; i += this.step) {
        this.ruler.push(i);
      }
    });
    window.addEventListener("resize", function(ev) {});
  }
};
</script>

<style lang="scss">
@import "../style/var.scss";
.vi-slider-range {
  position: relative;
  width: 100%;
  padding-top: 10px;
  .vi-slider-line {
    width: 100%;
    height: 5px;
    background-color: $active;
    position: absolute;
    .vi-slider-button {
      position: absolute;
      z-index: 10;
      top: -5px;
      width: 15px;
      height: 15px;
      border: 2px solid $active;
      border-radius: 50%;
      display: inline-block;
      background-color: #fff;
      transform: translate(-50%, 0%);
    }
    .vi-slider-left {
      left: 0;
    }
    .vi-slider-right {
      left: 100%;
    }
  }
  .vi-slider-progress {
    width: 100%;
    height: 5px;
    background-color: #f5f5f5;
    position: absolute;
  }
  .vi-slider-progress-left {
    left: 0;
  }
  .vi-slider-progress-rtght {
    right: 0;
  }
  .vi-slider-gauge {
    display: flex;
    width: 100%;
    margin: 15px 0 10px 0;
    color: #888;
    span {
      flex: 1;
    }
  }
}
</style>