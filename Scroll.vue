<template>
  <div class="scroll" :class="{ 'scroll-snap': scrollSnap }"><slot /></div>
</template>

<script>
import EventMask from "./EventMask/EventMask.js";
export default {
  name: "Scroll",
  props: {
    snap: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return { scrollSnap: this.snap };
  },
  mounted() {
    const { $el } = this;
    const eventMask = new EventMask($el);
    eventMask.on("move", (e) => {
      if (e.touches) return;
      $el.scroll($el.scrollLeft - eventMask.move, 0);
    });
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
  touch-action: pan-x pan-y !important;
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