/**
  inline-block 与 block、flex 布局的文档流存在差异，使用时需要注意。
  inline-block 的默认文档流是横向的，在横向布局过渡时较为友好，但在纵向布局时，当 position 值 为 absolute 时，受到横向文档流影响，存在横向漂移问题，解决方案是为父元素设置纵向文档流，即 writing-mode: vertical-lr;
  block 的默认文档流为纵向,适合纵向排版，在不占用空间的状态下保持原位，目前还没有好的替代方案；
  item 上使用 margin 属性会导致元素偏移，应尽量避免使用 margin;
 */

<template>
  <transition-group class="v-transitions" tag="div" :name="name">
    <slot />
  </transition-group>
</template>

<script>
export default {
  name: "Transitions",
  props: {
    name: {
      type: String,
      default: "v-tg-top",
    },
  },
};
</script>

<style lang="scss" scoped>
.v-transitions:deep() > {
  .v-tg-left-enter-active,
  .v-tg-right-enter-active,
  .v-tg-top-enter-active,
  .v-tg-bottom-enter-active {
    transition: all 0.4s;
    z-index: 0 !important; // 过渡期间
  }
  .v-tg-left-leave-active,
  .v-tg-right-leave-active,
  .v-tg-top-leave-active,
  .v-tg-bottom-leave-active {
    transition: all 0.4s;
    position: absolute !important; // 通过将 position 属性设置为 absolute， 可使元素脱离文档流
  }
  .v-tg-top-move,
  .v-tg-bottom-move,
  .v-tg-left-move,
  .v-tg-right-move {
    transition: all 0.4s;
  }

  .v-tg-left-enter-from {
    opacity: 0;
    transform: translate3d(-30%, 0, 0);
  }
  .v-tg-left-leave-to {
    opacity: 0;
    transform: translate3d(30%, 0, 0);
  }

  .v-tg-right-enter-from {
    opacity: 0;
    transform: translate3d(-30%, 0, 0);
  }
  .v-tg-right-leave-to {
    opacity: 0;
    transform: translate3d(30%, 0, 0);
  }

  .v-tg-top-enter-from,
  .v-tg-top-leave-to {
    opacity: 0;
    transform: translate3d(0, -50%, 0);
  }

  .v-tg-bottom-enter-from,
  .v-tg-bottom-leave-to {
    opacity: 0;
    transform: translate3d(0, 50%, 0);
  }
}
</style>
