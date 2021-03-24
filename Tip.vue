<template>
  <transition name="fade"><Bubble v-if="open" className="vi-tip" :border="false" :placement="placement"><slot></slot></Bubble></transition>
</template>

<script>
import theme from "./theme.js";
export default {
  name: "Tip",
  props: {
    placement: {
      type: String,
      default: "right"
    }
  },
  data() {
    return {
      open: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      const { parentNode } = this.$el;
      parentNode.addEventListener("mouseenter", ev => {
        this.open = true;
      });
      parentNode.addEventListener("mouseleave", ev => {
        this.open = false;
      });
    });
  },
  style({ main }) {
    return `
      .vi-tip .vi-bubble-content{
         background-color: ${main.background} !important;
      }
      .vi-tip .vi-bubble-arrow-right:after{
         border-right-color: ${main.background} !important;
      }
      .vi-tip .vi-bubble-arrow-left:after{
         border-left-color: ${main.background} !important;
      }
      .vi-tip .vi-bubble-arrow-top:after{
         border-top-color: ${main.background} !important;
      }
      .vi-tip .vi-bubble-arrow-bottom:after{
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
