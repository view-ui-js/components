<template>
  <div class="vi-menu vi-menu-line row">
    <div class="vi-menu-item flex" v-for="(item, k) of items" :key="k">
      <div
        class="pointer"
        @click="click(item, k)"
        :class="{'active gc-border-bottom-2px':k == key}"
      >
        <i v-if="item.icon" :class="item.icon"></i>
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
import base from "./base";
import theme from "../theme.js";
export default {
  name: "MenuLine",
  extends: base,
  style({ active }) {
    return `
      .vi-menu-line .active:before {
        content: "";
        width: 50%;
        position: absolute;
        bottom: 0;
        height: 3px;
        background-color: ${active.color};
    }
    `;
  },
  install(Vue) {
    Vue.component(this.name, this);
    theme.style(this.style);
  }
};
</script>

<style lang="scss">
.vi-menu-line {
  .pointer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    padding: 0 15px;
  }
}
</style>