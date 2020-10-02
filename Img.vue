<template>
  <div class="vi-img" :class="{ 'vi-img-radius': radius }">
    <div v-if="src" class="vi-img-box">
      <img :src="src" />
    </div>
    <i v-else class="vi-img-null" :class="icon"></i>
  </div>
</template>

<script>
export default {
  name: "Img",
  props: {
    src: String,
    icon: {
      type: String,
      default: "vicon-tupian",
    },
    radius: Boolean,
  },
  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>

<style lang="scss">
.vi-img {
  width: 50px;
  height: 50px;
  overflow: hidden;
  display: inline-block;
  &.vi-img-radius {
    border-radius: 100px;
  }
  .vi-img-box {
    flex: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    background-color: #eee;
    border-radius: 3px;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
    }
  }
  .vi-img-null {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eeeeee;
    color: #ccc;
    width: 100%;
    height: 100%;
  }
}
</style>
