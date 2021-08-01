<template>
  <div ref="buttons" class="v-buttons" @click="click">
    <slot />
  </div>
</template>

<script>
import theme from "./theme.js";
export default {
  name: "Buttons",
  props: {
    color: {
      type: String
    },
    size: {
      type: String,
      default: "medium"
    }
  },
  data() {
    return {};
  },
  methods: {
    click({ target }) {
      if (target !== this.$refs.buttons) {
        for (const item of this.$slots.default) {
          const { classList } = item.elm;
          classList.remove("vt-active");
        }
        target.classList.add("vt-active");
      }
    }
  },
  install(app) {
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
.v-buttons {
  display: flex;
  height: 38px;
  background-color: #efefef;
  border-radius: 50px;
  overflow: hidden;
  border: 1px solid #eee;
  user-select: none;
  > * {
    padding: 0 15px;
    flex: auto;
    cursor: pointer;
    color: #8c8c8c;
    border-radius: 100px;
    &:hover {
      color: #4fc08d !important;
      background-color: #f8f8f8 !important;
    }
    * {
      pointer-events: none;
    }
  }
  .vt-active {
    font-weight: bold;
  }
}
</style>