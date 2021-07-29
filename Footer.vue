<template>
  <div class="vi-footer">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    name: String
  },
  install(app) {
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
@import "./style/var.scss";
.vi-footer {
  display: flex;
  flex: none;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
  height: 50px;
  background-color: #fff;
  padding: 0 12px;
}
</style>