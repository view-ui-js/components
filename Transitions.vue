<template>
  <transition-group class="v-transitions" tag="div" :name="`v-tg-${enter}`">
    <slot />
  </transition-group>
</template>

<script>
export default {
  name: "Transitions",
  props: {
    // 进入方向
    enter: {
      type: String,
      default: "top",
    },
  },
};
</script>

// 在横向排版时应该使用 display: inline-block; position: absolute; 在不占用空间的状态下保持原位，目前还没有好的替代方案
// item 上避免使用 margin 属性，否则会出现偏移

<style lang="scss">
.v-transitions {
  > * {
    transition: all 0.4s;
  }
  > .v-tg-top-enter-from,
  > .v-tg-top-leave-to {
    opacity: 0;
    transform: translate3d(0, -50%, 0);
  }
  > .v-tg-bottom-enter-from,
  > .v-tg-bottom-leave-to {
    opacity: 0;
    transform: translate3d(0, 50%, 0);
  }
  > .v-tg-left-enter-from,
  > .v-tg-left-leave-to {
    opacity: 0;
    transform: translate3d(-50%, 0, 0);
  }
  > .v-tg-right-enter-from {
    opacity: 0;
    transform: translate3d(-30%, 0, 0);
  }
  > .v-tg-right-leave-to {
    opacity: 0;
    transform: translate3d(30%, 0, 0);
  }
  > .v-tg-left-enter-active,
  > .v-tg-right-enter-active,
  > .v-tg-top-enter-active,
  > .v-tg-bottom-enter-active {
    z-index: 0 !important;
  }
  > .v-tg-left-leave-active,
  > .v-tg-right-leave-active,
  > .v-tg-top-leave-active,
  > .v-tg-bottom-leave-active {
    position: absolute !important;
  }
}
</style>
