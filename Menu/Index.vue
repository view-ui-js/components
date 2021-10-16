<template>
  <div class="v-menu v-menu-default row">
    <div
      class="v-menu-item flex"
      v-for="(item, k) of items"
      :key="k"
      :class="{ active: k == key }"
      @click="click(item, k)"
    >
      <div class="v-menu-content">
        <i v-if="item.icon" :class="item.icon" />
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import base from "./base.js";
export default {
  name: "Menu",
  extends: base,
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.v-menu-default {
  cursor: pointer;
  .active {
    color: var(--active-color);
  }
}
</style>