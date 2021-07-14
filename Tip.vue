<template>
  <transition name="scale"
    ><keep-alive
      ><Bubble v-if="open" class="vi-tip" :border="false" :placement="placement"
        ><slot></slot></Bubble></keep-alive
  ></transition>
</template>

<script>
import theme from "./theme.js";
export default {
  name: "Tip",
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
    theme.style(({ main }) => {
      const { background } = main;
      return `
      .vi-tip .vi-bubble-content {
         color: #fff;
         padding: 8px 14px;
         background-color: ${background} !important;
      }
      .vi-tip .vi-bubble-arrow i {
         background-color: ${background} !important;
      }
      .vi-tip .vi-bubble-arrow i {
         background-color: ${background} !important;
      }
      .vi-tip .vi-bubble-arrow i {
         background-color: ${background} !important;
      }
      .vi-tip .vi-bubble-arrow i {
         background-color: ${background} !important;
      }
    `;
    });
  },
};
</script>
