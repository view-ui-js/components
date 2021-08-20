<template>
  <button class="v-button" :class="cssClass" :type="type" :style="style" @click.prevent="click">
    <slot />
  </button>
</template>

<script>
import theme from "./theme.js";
export default {
  name: "Button",
  emits:["click"],
  props: {
    color: {
      type: String
    },
    size: {
      type: String,
      default: "medium"
    },
    type: {
      type: String,
      default: "button"
    },
    disable: Boolean,
    flat: Boolean,
    fab: Boolean
  },
  data() {
    const style = {};
    const cssClass = [];
    const color = this.color;
    if (color) {
      const { current } = theme;
      if (current[color]) {
        cssClass.push(`vt-${color}`);
      }
      if (this.flat) {
        style.backgroundColor = "transparent";
      } else {
        style.color = "#fff";
      }
    } else {
      if (this.flat) {
        style.backgroundColor = "transparent";
      }
    }
    cssClass.push(`v-button-${this.size}`);
    if (this.fab) {
      cssClass.push(`v-button-fab`);
    }
    if (this.disable) {
      cssClass.push(`v-button-disable`);
    }
    return {
      cssClass,
      style
    };
  },
  methods: {
    click(ev) {
      if (!this.disable) {
        this.$emit("click", ev);
      }
    }
  },
  install(app) {
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
.v-button {
  position: relative;
  display: inline-block;
  border-radius: 3px;
  border: none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  margin: 0 3px;
  outline: none;
  color: #8c8c8c;
  background-color: #fff;
  border: 1px solid #eaeaea;
  user-select: none;
  transition: filter 0.25s;
  &:hover {
    filter: brightness(1.03);
  }
  &.v-button-medium {
    padding: 0px 16px;
    height: 33px;
    font-size: 14px;
  }
  &.v-button-small {
    padding: 0px 12px;
    height: 30px;
    font-size: 13px;
  }
  &.v-button-disable {
    background-color: #f5f5f5;
    color: #a5a5a5;
    cursor: not-allowed;
    &:hover {
      background-color: #f5f5f5;
    }
  }
  &.v-button-fab {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    padding: 0px;
    font-size: 20px;
    i {
      font-size: 18px;
    }
  }
}
</style>