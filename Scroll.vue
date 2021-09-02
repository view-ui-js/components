<template>
  <div
    class="scroll"
    :class="{ 'scroll-snap': scrollSnap }"
    @mousedown="mousedown"
    @click.capture="click"
    @scroll="scroll"
  >
    <slot />
  </div>
</template>

<script>
const target = {};
const isTouch = "ontouchstart" in document;
if (!isTouch) {
  document.addEventListener("mousedown", function (e) {
    target.down = true;
    target.move = false;
    const { $el } = target;
    if ($el) {
      target.scrollLeft = $el.scrollLeft;
      target.scrollMax = $el.scrollWidth - $el.clientWidth;
      target.startX = e.x;
      target.clientX = e.clientX;
      e.preventDefault();
    }
  });
  document.addEventListener("mousemove", function (e) {
    const { down, $el } = target;
    if (down && $el) {
      if (!target.move) {
        target.move = true;
        // document.body.style.cursor = "grabbing";
      }
      const moveX = e.clientX - target.clientX;
      const scrollLeft = target.scrollLeft - moveX;
      if (scrollLeft < 0) {
        target.clientX = e.clientX;
        target.scrollLeft = 0;
      } else if (scrollLeft > target.scrollMax) {
        target.clientX = e.clientX;
        target.scrollLeft = target.scrollMax;
      }
      $el.scroll(scrollLeft, 0);
    }
    e.preventDefault();
  });
  document.addEventListener("mouseup", function () {
    target.down = false;
    target.$el = null;
    // document.body.style.cursor = "";
  });
}
export default {
  name: "Scroll",
  props: {
    snap: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return { scrollSnap: isTouch && this.snap };
  },
  methods: {
    // 按下鼠标时，切换目标滚动元素
    mousedown(e) {
      target.$el = e.currentTarget;
    },
    click(e) {
      if (target.move) {
        e.stopPropagation();
        e.preventDefault();
      }
    },
    scroll() {
      this.$emit("scroll", this.$el);
    },
  },
  mounted() {
    // this.$el.scrollTo(0, 0);
    // this.scroll();
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped>
.scroll {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  position: relative;
  transform: translate3d(0, 0, 0);
  // touch-action: pan-x;
  &.scroll-snap {
    scroll-snap-type: x mandatory;
    > * {
      scroll-snap-align: start;
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>