<template>
  <div class="vi-form-box">
    <div v-if="label" class="vi-form-box-header">{{label}}</div>
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
.vi-form-box {
  position: relative;
  width: 49%;
  .vi-form-box-header {
    padding: 10px 0 5px 2px;
    display: block;
    .vi-form-box-error {
      float: right;
      color: #ff0000;
    }
  }
}
</style>