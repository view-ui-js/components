<template>
  <transition name="scale"
    ><keep-alive
      ><Bubble v-if="open" class="v-tip" :placement="placement"
        ><slot /></Bubble></keep-alive
  ></transition>
</template>

<script>
import Bubble from "./Bubble.vue";
export default {
  name: "Tip",
  components: { Bubble },
  props: {
    placement: {
      type: String,
      default: "top",
    },
  },
  data() {
    this.timeStamp = 0;
    return {
      open: false,
    };
  },
  methods: {
    mouseenter({ timeStamp }) {
      if (timeStamp - this.timeStamp > 200) {
        this.open = true;
      }
      this.timeStamp = timeStamp;
    },
    mouseleave({ timeStamp }) {
      this.timeStamp = timeStamp;
      this.open = false;
    },
  },
  mounted() {
    const { parentNode } = this.$el;
    parentNode.addEventListener("mouseenter", this.mouseenter);
    parentNode.addEventListener("mouseleave", this.mouseleave);
    // parentNode.addEventListener("mouseup", this.mouseleave);
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.v-tip {
  pointer-events: none;
  .v-bubble-content {
    color: var(--sub-color);
    padding: 8px 14px;
    background-color: var(--sub-background) !important;
  }
  .v-bubble-arrow {
    i {
      background-color: var(--sub-background) !important;
    }
  }
}
</style>
