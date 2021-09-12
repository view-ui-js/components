<template>
  <transition-group class="list-transition" tag="div" :name="`list-${enter}`">
    <slot />
  </transition-group>
</template>

<script>
export default {
  name: "ListTransition",
  props: {
    enter: {
      type: String,
      default: "down",
    },
  },
};
</script>

// 在横向排版时应该使用 display: inline-block; position: absolute; 在不占用空间的状态下保持原位，目前还没有好的替代方案
// item不应该使用margin，否则会出现偏移

<style lang="scss">
.list-transition {
  > * {
    transition: all 0.4s;
  }
  > .list-down-enter-from,
  > .list-down-leave-to {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  > .list-up-enter-from,
  > .list-up-leave-to {
    opacity: 0;
    transform: translate3d(0, 20%, 0);
  }
  > .list-up-leave-active,
  > .list-down-leave-active {
    position: absolute !important;
  }
}
</style>
