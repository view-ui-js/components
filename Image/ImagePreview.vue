<template>
  <transition name="fade" appear>
    <div class="v-image-preview" ref="maskBox" @click="$emit('close')">
      <div v-if="title" class="v-image-preview-header">
        <div class="v-image-preview-title">{{title}}</div>
      </div>
      <div class="v-image-preview-main">
        <img v-if="image" class="v-image-preview-img" :src="image.src" @click.stop />
      </div>
      <div v-if="images.length > 1" class="v-image-preview-map">
        <img
          v-for="(item,key) of images"
          :key="key"
          :class="{'v-image-preview-highlight':item===image}"
          :src="item.src"
          @click.stop
          @mouseover="mouseover(item)"
        />
      </div>
      <div v-if="image.name" class="v-image-preview-footer">{{image.name}}</div>
      <i class="v-image-preview-close vicon-cha" />
    </div>
  </transition>
</template>

<script>
export default {
  name: "ImagePreview",
  props: {
    images: Array,
    index: {
      type: Number,
      default: 0
    },
    title: String
  },
  data() {
    return {
      image: {}
    };
  },
  methods: {
    mouseover(image) {
      this.image = image;
    }
  },
  mounted() {
    const { images, index } = this;
    this.image = images[index];
    document.body.appendChild(this.$el);
  },
  install(app) {
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
.fade-enter .v-image-preview-img,
.fade-leave-to .v-image-preview-img {
  transform: scale(1.02);
}
.fade-enter-active .v-image-preview-img,
.fade-leave-active .v-image-preview-img {
  transition: transform 0.25s ease;
}
.v-image-preview {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #2f2f2ff2;
  color: #fff;
  font-size: 13px;
  .v-image-preview-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 40px;
    flex: none;
    text-align: center;
    background-color: #00000017;
    .v-image-preview-title {
      padding: 10px 0 0 20px;
      font-size: 15px;
      color: #656565;
    }
  }
  .v-image-preview-main {
    overflow: hidden;
    text-align: center;
    width: 100%;
    .v-image-preview-img {
      height: 100%;
    }
  }
  .v-image-preview-map {
    position: absolute;
    width: 80px;
    display: flex;
    right: 0;
    align-items: center;
    padding: 10px;
    background-color: #00000024;
    border-radius: 5px 0 0 5px;
    flex-direction: column;
    img {
      width: 100%;
      margin: 8px 0;
      cursor: pointer;
      opacity: 0.5;
      border-radius: 3px;
      &.v-image-preview-highlight {
        opacity: 1;
      }
    }
  }
  .v-image-preview-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45px;
    z-index: 100;
    flex: none;
    background-color: #00000024;
    text-align: center;
    padding-top: 15px;
    box-sizing: border-box;
  }
  .v-image-preview-close {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 32px;
    position: fixed;
    top: 16px;
    right: 15px;
    z-index: 1000;
    color: #ffffff;
    box-sizing: content-box;
    transition: transform 0.5s;
    &:hover {
      transform: rotate(90deg);
    }
  }
}
</style>