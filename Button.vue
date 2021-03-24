<template>
  <button class="vi-button" :class="cssClass" :type="type" :style="style" @click.prevent="click">
    <slot></slot>
  </button>
</template>

<script>
import theme from "./theme.js";
export default {
  name: "Button",
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
    cssClass.push(`vi-button-${this.size}`);
    if (this.fab) {
      cssClass.push(`vi-button-fab`);
    }
    if (this.disable) {
      cssClass.push(`vi-button-disable`);
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
.vi-button {
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
  &.vi-button-medium {
    padding: 0px 16px;
    height: 33px;
    font-size: 14px;
  }
  &.vi-button-small {
    padding: 0px 12px;
    height: 30px;
    font-size: 13px;
  }
  &.vi-button-disable {
    background-color: #f5f5f5;
    color: #a5a5a5;
    cursor: not-allowed;
    &:hover {
      background-color: #f5f5f5;
    }
  }
  &.vi-button-fab {
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