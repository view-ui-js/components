<template>
  <div class="v-menu v-menu-default row">
    <div
      class="v-menu-item flex"
      v-for="(item, k) of items"
      :key="k"
      :class="{'active':k == key}"
      @click="click(item, k)"
    >
      <div class="v-menu-content">
        <i v-if="item.icon" :class="item.icon" />
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
import base from "./base.js";
import theme from "../theme.js";
export default {
  name: "Menu",
  extends: base,
  style({ main, active }) {
    return `
      .v-menu-default .active {
          color: ${active.color};
      }`;
  },
  install(app) {
    app.component(this.name, this);
    theme.style(this.style);
  }
};
</script>

<style lang="scss">
.v-menu-default {
  cursor: pointer;
}
</style>