<template>
  <div class="v-img" :class="{ 'v-img-radius': radius }">
    <div v-if="src" class="v-img-box">
      <img :src="src" />
    </div>
    <i v-else class="v-img-null" :class="icon" />
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
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.v-img {
  width: 50px;
  height: 50px;
  overflow: hidden;
  display: inline-block;
  &.v-img-radius {
    border-radius: 100px;
  }
  .v-img-box {
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
  .v-img-null {
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
