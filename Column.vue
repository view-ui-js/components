<template>
  <div class="vi-column">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Column",
  install(app) {
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
.vi-column {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>