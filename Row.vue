<template>
  <div class="v-row" :class="classOp">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Row",
  props: {
    justify: {
      type: String
    },
    align: {
      type: String
    }
  },
  data() {
    const classOp = {};
    if (this.justify) {
      classOp[`v-row-${this.justify}`] = this.justify;
    }
    if (this.align) {
      classOp[`v-row-cross-${this.align}`] = this.align;
    }
    return { classOp };
  },
  install(app) {
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
.v-row {
  display: flex;
  flex-direction: row;
  flex: 1;
  // 主轴
  &.v-row-flex-start {
    justify-content: flex-start;
  }
  &.v-row-flex-end {
    justify-content: flex-end;
  }
  &.v-row-center {
    justify-content: center;
  }
  &.v-row-space-between {
    justify-content: space-between;
  }
  &.v-row-space-around {
    justify-content: space-around;
  }
  // 交叉轴
  &.v-row-cross-flex-start {
    align-items: flex-start;
  }
  &.v-row-cross-flex-end {
    align-items: flex-end;
  }
  &.v-row-cross-center {
    align-items: center;
  }
  &.v-row-cross-baseline {
    align-items: baseline;
  }
  &.v-row-cross-stretch {
    align-items: stretch;
  }
}
</style>