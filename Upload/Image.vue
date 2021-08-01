<template>
  <div class="v-upload">
    <div class="upload-box upload-img" v-for="(item, key) of images" :key="key">
      <img :src="item.src" :title="item.name" />
      <div class="v-upload-mask">
        <i class="vicon icon-chakan preview" @click="$ImgPreview(item.src)" />
        <i class="vicon del" @click="Destroy(key)">&#xe679;</i>
      </div>
    </div>

    <div v-show="images.length < max" class="upload-box upload-add" @click="Add">
      <i class="vicon">&#xe61f;</i>
    </div>

    <input
      class="upload-input"
      ref="input"
      type="file"
      :accept="accept"
      name="file"
      :multiple="multiple"
      @change="Change($event.target.files)"
    />
  </div>
</template>

<script>
import base from "./base.js";
export default {
  name: "Upload",
  extends: base,
  install(app, options){
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
.v-upload {
  display: inline-block;
}
</style>
