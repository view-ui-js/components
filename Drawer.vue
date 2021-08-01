<template>
  <transition :name="`${position}-in`" appear>
    <div class="v-drawer" :class="'v-drawer-' +  position" :style="style">
      <i class="vicon close-button" @click="$emit('close', false)">&#xe679;</i>
      <slot />
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
  install(app) {
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
@import "style/var.scss";
.v-drawer {
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
.v-drawer-right {
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
}
.v-drawer-top {
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
}
.v-drawer-left {
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
}
.v-drawer-bottom {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300px;
}
</style>