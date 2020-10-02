<template>
  <div class="center default-box">
    <slot>
      无访问权限
    </slot>
  </div>
</template>

<style lang="scss">
.default-box {
  background: #f8f8f8;
  i {
    font-size: 100px;
    color: #ccc;
  }
}
</style>