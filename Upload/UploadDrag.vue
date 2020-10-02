<template>
  <div class="vi-upload-drag">
    <div
      class="vi-upload-drag-box"
      @click="Add"
      @dragenter.stop.prevent="dragenter"
      @dragleave.stop.prevent="dragleave"
      @drop.stop.prevent="drop"
    >
      <i class="vicon icon-upload"></i> 点击或拖拽上传文件
    </div>

    <div class="vi-upload-item vi-upload-item-image" v-for="(item, key) of images" :key="key">
      <img :src="item.src" :title="item.name" />
      <div class="vi-upload-mask">
        <i class="vicon icon-chakan vi-upload-preview" @click="$ImgPreview(item.src)"></i>
        <i class="vicon vi-upload-delete" @click="Destroy(key)">&#xe679;</i>
      </div>
    </div>

    <input
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
  name: "UploadDrag",
  extends: base,
  methods: {
    dragenter(e) {
      e.target.style.color = "#44ac7d";
      e.target.style.borderColor = "#44ac7d";
    },
    dragleave(e) {
      e.target.style.color = null;
      e.target.style.borderColor = null;
    },
    drop(e) {
      e.target.style.color = null;
      e.target.style.borderColor = null;
      this.Change(e.dataTransfer.files);
    }
  },
  install(Vue, options){
    Vue.component(this.name, this);
  }
};

global.onload = function() {
  document.addEventListener(
    "dragover",
    function(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    false
  );
  document.addEventListener(
    "drop",
    function(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    false
  );
};
</script>

<style lang="scss">
.vi-upload-drag {
  .vi-upload-drag-box {
    border-style: dashed !important;
    border: 2px solid #dee5e7;
    color: #58666e;
    background-color: #fff;
    text-align: center;
    padding: 25px;
    cursor: pointer;
    margin-bottom: 10px;
    .vicon {
      font-size: 16px;
    }
  }
}
</style>
