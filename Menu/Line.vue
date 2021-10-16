<template>
  <div class="v-menu v-menu-line row">
    <div class="v-menu-item flex" v-for="(item, k) of items" :key="k">
      <div
        class="pointer"
        @click="click(item, k)"
        :class="{ 'active gc-border-bottom-2px': k == key }"
      >
        <i v-if="item.icon" :class="item.icon" />
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import base from "./base";
export default {
  name: "MenuLine",
  extends: base,
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.v-menu-line {
  .pointer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    padding: 0 15px;
    .active:before {
      content: "";
      width: 50%;
      position: absolute;
      bottom: 0;
      height: 3px;
      background-color: var(--active-color);
    }
  }
}
</style>