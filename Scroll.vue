<template>
  <div class="vi-scroll">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Scroll",
  props: {},
  install(Vue) {
    Vue.component(this.name, this);
  }
};
</script>

<style lang="scss">
.vi-scroll {
  position: relative;
  width: $menuWidth;
  height: 100%;
}
</style>