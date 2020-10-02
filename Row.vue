<template>
  <div class="vi-row" :class="classOp">
    <slot></slot>
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
      classOp[`vi-row-${this.justify}`] = this.justify;
    }
    if (this.align) {
      classOp[`vi-row-cross-${this.align}`] = this.align;
    }
    return { classOp };
  },
  install(Vue) {
    Vue.component(this.name, this);
  }
};
</script>

<style lang="scss">
.vi-row {
  display: flex;
  flex-direction: row;
  flex: 1;
  // 主轴
  &.vi-row-flex-start {
    justify-content: flex-start;
  }
  &.vi-row-flex-end {
    justify-content: flex-end;
  }
  &.vi-row-center {
    justify-content: center;
  }
  &.vi-row-space-between {
    justify-content: space-between;
  }
  &.vi-row-space-around {
    justify-content: space-around;
  }
  // 交叉轴
  &.vi-row-cross-flex-start {
    align-items: flex-start;
  }
  &.vi-row-cross-flex-end {
    align-items: flex-end;
  }
  &.vi-row-cross-center {
    align-items: center;
  }
  &.vi-row-cross-baseline {
    align-items: baseline;
  }
  &.vi-row-cross-stretch {
    align-items: stretch;
  }
}
</style>