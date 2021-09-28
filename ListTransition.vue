<template>
  <transition-group class="v-transition-group" tag="div" :name="`group-${enter}`">
    <slot />
  </transition-group>
</template>

<script>
export default {
  name: "ListTransition",
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
// item上避免使用margin属性，否则会出现偏移

<style lang="scss">
.v-transition-group {
  > * {
    transition: all 0.4s;
  }
  > .group-top-enter-from,
  > .group-top-leave-to {
    opacity: 0;
    transform: translate3d(0, -40%, 0);
  }
  > .group-bottom-enter-from,
  > .group-bottom-leave-to {
    opacity: 0;
    transform: translate3d(0, 40%, 0);
  }
  > .group-left-enter-from,
  > .group-left-leave-to {
    opacity: 0;
    transform: translate3d(-40%, 0, 0);
  }
  > .group-right-enter-from,
  > .group-right-leave-to {
    opacity: 0;
    transform: translate3d(40%, 0, 0);
  }
  > .group-left-leave-active,
  > .group-right-leave-active,
  > .group-top-leave-active,
  > .group-bottom-leave-active {
    position: absolute !important;
  }
}
</style>
