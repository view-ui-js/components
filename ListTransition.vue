<template>
  <transition-group
    class="transition-group"
    tag="div"
    :name="`list-${enter}`"
  >
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

<style lang="scss" scoped>
.transition-group:deep {
  > * {
    display: inline-block;
    transition: transform 0.3s ease;
  }
  > .list-down-enter-from,
  > .list-down-leave-to {
    opacity: 0;
    transform: translate3d(0, -80%, 0);
  }
  > .list-up-enter-from,
  > .list-up-leave-to {
    opacity: 0;
    transform: translate3d(0, 20%, 0);
  }
  > .list-up-enter-active,
  > .list-up-leave-active,
  > .list-down-enter-active,
  > .list-down-leave-active {
    transition: transform 0.25s, opacity 0.25s;
  }
  > .list-up-leave-active,
  > .list-down-leave-active {
    position: absolute !important;
  }
}
</style>
