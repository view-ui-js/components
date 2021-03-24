<template>
  <div class="vi-content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Content",
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.vi-content {
  display: flex;
  // flex-direction: column;
  flex: 1;
  background-color: #f8f8f8;
}
</style>