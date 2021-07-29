<template>
  <div class="vi-scroll">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Scroll",
  props: {},
  install(app) {
    app.component(this.name, this);
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