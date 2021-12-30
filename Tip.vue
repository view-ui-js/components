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
    return {
      open: false,
    };
  },
  methods: {
    pointerenter() {
      this.open = true;
    },
    pointerleave() {
      this.open = false;
    }
  },
  mounted() {
    const { parentNode } = this.$el;
    parentNode.addEventListener("pointerenter", this.pointerenter);
    parentNode.addEventListener("pointerleave", this.pointerleave);
    parentNode.addEventListener("mouseup", this.pointerleave);
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