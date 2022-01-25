// display 属性值 inline-block、block、flex 布局的文档流和特性存在差异，使用时需要注意。

// inline-block 的默认文档流是横向的，在横向布局过渡时较为友好。
// inline-block 在纵向布局时，当 position 值为 absolute 时，由于文档流为横向，会出现横向漂移问题，解决方案是为父元素设置纵向文档流，即 writing-mode: vertical-lr（最好是使用 block ）;

// block 的默认文档流为纵向,适合纵向排版，在不占用空间的状态下保持原位，目前还没有好的替代方案；

// flex 布局

// item 上使用 margin 属性会导致在计算元素位置时出现偏移，应尽量避免使用 margin;

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

<style lang="scss" >
.v-transitions {
  .v-tg-left-enter-active,
  .v-tg-right-enter-active,
  .v-tg-top-enter-active,
  .v-tg-bottom-enter-active {
    z-index: 0 !important; // 过渡期间
  }
  .v-tg-left-leave-active,
  .v-tg-right-leave-active,
  .v-tg-top-leave-active,
  .v-tg-bottom-leave-active {
    position: absolute !important; // 通过将 position 属性设置为 absolute， 可使元素脱离文档流
  }

  // .v-tg-top-move,
  // .v-tg-bottom-move,
  // .v-tg-left-move,
  // .v-tg-right-move {
  // }

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
