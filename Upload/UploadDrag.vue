<template>
  <div class="v-upload-drag">
    <div
      class="v-upload-drag-box"
      @click="Add"
      @dragenter.stop.prevent="dragenter"
      @dragleave.stop.prevent="dragleave"
      @drop.stop.prevent="drop"
    >
      <i class="vicon icon-upload" /> 点击或拖拽上传文件
    </div>

    <div class="v-upload-item v-upload-item-image" v-for="(item, key) of images" :key="key">
      <img :src="item.src" :title="item.name" />
      <div class="v-upload-mask">
        <i class="vicon icon-chakan v-upload-preview" @click="$ImgPreview(item.src)" />
        <i class="vicon v-upload-delete" @click="Destroy(key)">&#xe679;</i>
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
  install(app, options){
    app.component(this.name, this);
  }
};

window.onload = function() {
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
.v-upload-drag {
  .v-upload-drag-box {
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
