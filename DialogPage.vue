<template>
  <transition name="fade" appear>
    <section class="v-float-mask" ref="maskBox" @mousedown.stop>
      <div class="v-dialog-page vertical">
        <header class="v-dialog-page-header">
          <i :class="icon" />
          {{title}}
        </header>
        <main class="v-dialog-page-main">
          <slot />
        </main>
        <aside class="v-dialog-page-sidebar">
          <slot name="sidebar"></slot>
        </aside>
      </div>
      <i class="vicon v-dialog-page-close" @click="close">&#xe679;</i>
    </section>
  </transition>
</template>

<script>
export default {
  name: "DialogPage",
  props: {
    title: String,
    icon: String
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  mounted() {
    document.body.appendChild(this.$el);
  },
  install(app) {
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
.v-float-mask {
  position: fixed;
  z-index: 50000;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #bdbdbdc4;
  backdrop-filter: blur(2px);
  padding-top: 12px;
  // v-dialog-page容器过渡动画
  &.fade-enter .v-dialog-page,
  &.fade-leave-to .v-dialog-page {
    transform: translate(0, 100%);
  }
  &.fade-enter-active .v-dialog-page,
  &.fade-leave-active .v-dialog-page {
    transition: transform 0.35s ease;
  }
  &.mask-hide {
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0);
  }
  .v-dialog-page {
    position: relative;
    width: 800px;
    height: 100%;
    pointer-events: auto;
    background-color: #fff;
    border-radius: 3px 3px 0 0;
    transition: all 0.25s ease;
    overflow: visible;
    .v-dialog-page-header {
      flex: none;
      padding: 15px;
      font-size: 16px;
      color: #888888;
      font-weight: bold;
      border-bottom: 1px solid #eee;
      i {
        font-size: 17px;
      }
    }
    .v-dialog-page-main {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      padding-bottom: 20px;
      // background-color: #fbfbfb;
    }
    .v-dialog-page-sidebar {
      position: absolute;
      right: -70px;
      top: 10px;
      width: 45px;
      button {
        margin-bottom: 20px;
        width: 35px;
        height: 35px;
      }
    }
  }
  .v-dialog-page-close {
    position: fixed;
    top: 16px;
    right: 15px;
    z-index: 100;
    width: 35px;
    height: 35px;
    font-size: 24px;
    cursor: pointer;
    color: #565656;
    transition: transform 0.5s;
    background-color: #e2e2e2;
    border-radius: 100%;
    padding: 5px;
    &:hover {
      transform: rotate(90deg);
    }
  }
}
</style>