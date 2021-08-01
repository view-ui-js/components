<template>
  <div class="v-form-box">
    <div v-if="label" class="v-form-box-header">{{label}}</div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "FormBox",
  props: {
    label: {
      type: String
    },
    error: {
      type: String
    }
  }
};
</script>

<style lang="scss">
.v-form-box {
  position: relative;
  width: 49%;
  .v-form-box-header {
    padding: 10px 0 5px 2px;
    display: block;
    .v-form-box-error {
      float: right;
      color: #ff0000;
    }
  }
}
</style>