<template>
  <transition :name="`${position}-in`" appear>
    <div class="vi-drawer" :class="'vi-drawer-' +  position" :style="style">
      <i class="vicon close-button" @click="$emit('close', false)">&#xe679;</i>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Drawer",
  props: {
    position: {
      type: String,
      default: "right"
    }
  },
  data() {
    const { position } = this;
    return {
      style: { [position]: 0 }
    };
  },
  install(Vue) {
    Vue.component(this.name, this);
  }
};
</script>

<style lang="scss">
@import "style/var.scss";
.vi-drawer {
  position: fixed;
  z-index: 1000;
  background-color: #ffffff;
  .close-button {
    position: absolute;
    z-index: 10;
    right: 15px;
    top: 11px;
    color: #909090;
    font-size: 28px;
    cursor: pointer;
    transition: transform 0.5s;
    &:hover {
      transform: rotate(90deg);
    }
  }
}
.vi-drawer-right {
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
}
.vi-drawer-top {
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
}
.vi-drawer-left {
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
}
.vi-drawer-bottom {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300px;
}
</style>