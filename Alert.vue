<template>
  <div class="v-alert" :class="`v-alert-${type}`">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    color: String,
    type: String,
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.v-alert {
  margin: 10px;
  padding: 10px;
  border-radius: 3px;
  background-color: #fffbe6;
  border: 1px solid #fbedc0;
  &.v-alert-success {
    background-color: #f6ffed;
    border: 1px solid #daefca;
  }
  &.v-alert-error {
    background-color: #fff1f0;
    border: 1px solid #ffa39e;
  }
  &.v-alert-info {
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
  }
}
</style>