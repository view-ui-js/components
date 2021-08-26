<template>
  <div class="v-scroll">
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
.v-scroll {
  position: relative;
  height: 100%;
}
</style>