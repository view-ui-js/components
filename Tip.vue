<template>
  <transition name="scale"
    ><keep-alive
      ><Bubble v-if="open" class="v-tip" :border="false" :placement="placement"
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
    return {
      open: false,
    };
  },
  methods: {
    mouseenter() {
      this.open = true;
    },
    mouseleave() {
      this.open = false;
    },
  },
  mounted() {
    this.$nextTick(() => {
      const { parentNode } = this.$el;
      parentNode.addEventListener("mouseenter", this.mouseenter);
      parentNode.addEventListener("mouseleave", this.mouseleave);
      parentNode.addEventListener("click", () => {
        this.open = false;
      });
    });
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>


<style lang="scss">
.v-tip {
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