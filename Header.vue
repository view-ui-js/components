<template>
  <div class="v-header">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Header",
  install(app) {
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
@import "./style/var.scss";
.v-header {
  display: flex;
  flex: none;
  justify-content: space-between;
  padding: 0 12px;
  align-items: center;
  height: 52px;
  background-color: #fff;
  z-index: 10;
}
</style>