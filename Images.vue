<template>
  <div
    v-if="edit"
    class="v-images"
    @mousedown.capture.stop
    @mousemove.capture.stop
    @mouseup.capture.stop
  >
    <Draggable
      v-if="images.length"
      :value="images"
      v-slot="{ index, item }"
      @click="preview"
    >
      <div class="v-images-item">
        <slot :item="item">
          <img draggable="false" :src="item.src" :title="item.name" />
          <input
            draggable="false"
            class="v-images-input"
            type="text"
            :placeholder="placeholder"
            v-model="item.name"
            @click.stop
          />
        </slot>
      </div>
      <i class="v-images-delete vicon-cha" @click.stop="destroy(index)" />
    </Draggable>
    <div v-show="images.length < max" class="v-images-add" @click="add">
      <i class="vicon-add" />
      <input
        ref="input"
        type="file"
        accept="image/*"
        name="file"
        multiple="multiple"
        @change="change($event.target.files)"
      />
    </div>
  </div>
  <div v-else class="v-images v-images-preview">
    <template v-if="value.length">
      <div
        class="v-images-item"
        v-for="(item, key) of value"
        :key="key"
        @click="preview(key)"
      >
        <img :src="item.src" />
      </div>
    </template>
    <div v-else class="v-image-null">
      <i class="vicon-tupian" />
    </div>
  </div>
</template>

<script>
import Draggable from "./Draggable.vue";
import imagePreview from "./imagePreview.vue";
export default {
  name: "Images",
  components: { Draggable },
  emits: ["input", "change"],
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    read: Boolean,
    max: {
      type: Number,
      default: 20,
    },
    title: String,
    placeholder: String,
  },
  data() {
    this.count = this.value.length;
    return {
      edit: this.read ? false : true,
      images: this.value,
    };
  },
  methods: {
    add() {
      this.$refs.input.click();
    },
    async change(files) {
      if (files.length) {
        for (const file of files) {
          // 将file转换为DataURL格式，可以通过<img src>直接显示
          const reader = new FileReader();
          reader.readAsDataURL(file);
          const src = await new Promise(function (resolve) {
            reader.onload = () => {
              resolve(reader.result);
            };
          });
          const item = { src, file };
          this.$emit("change", item);
          this.images.push(item);
        }
      }
      this.$refs.input.value = ""; // 初始化input值
    },
    destroy(key) {
      const item = this.images[key];
      if (item.file === undefined) {
        const value = [...this.value];
        value.splice(value.indexOf(item.src), 1);
        this.$emit("input", this.images);
      }
      this.images.splice(key, 1);
    },
    preview(index, item) {
      const { images, title } = this;
      imagePreview.open({ images, index, title });
    },
    /**
     * 供外部调用的图片上传接口
     */
    async upload(url) {
      // 生成FormData表单
      const formData = new FormData();
      const itemsFile = [];
      for (const item of this.images) {
        if (item.file) {
          formData.append("images", item.file);
          itemsFile.push(item);
        }
      }

      if (itemsFile.length) {
        // 文件提交
        await this.$options.network(url, formData).then((result) => {
          const { images } = result;
          for (const key in images) {
            const src = images[key];
            const item = itemsFile[key];
            item.src = src;
            delete item.file;
          }
          this.$emit("input", this.images);
        });
      }
    },
  },
  watch: {
    value(value) {
      this.images = value;
    },
    images() {
      this.$emit("input", this.images);
    },
  },
  install(app, network) {
    this.network = network;
    app.component(this.name, this);
  },
};
</script>


<style lang="scss" scoped>
.v-images {
  display: flex;
  user-select: none;
  flex-wrap: wrap;
  width: 100%;
  .v-draggable {
    display: contents;
    position: relative;
    .v-draggable-item {
      position: relative;
      box-sizing: border-box;
      background-color: #eee;
      border-radius: 3px;
      margin: 0 10px 10px 0;
      cursor: grab;
      .v-images-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90px;
        height: 90px;
        overflow: hidden;
        img {
          width: 100%;
        }
        .v-images-input {
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: #75757587;
          font-size: 12px;
          color: #fff;
          box-sizing: border-box;
          padding: 5px 5px;
          border: none;
          text-align: center;
          outline-style: none;
        }
      }
      .v-images-delete {
        display: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: absolute;
        right: -5px;
        top: -5px;
        background-color: #a2a2a2;
        width: 22px;
        height: 22px;
        border-radius: 50px;
        border: 2px solid #ffffff;
        color: #fff;
      }
      &:hover {
        .v-images-delete {
          display: flex;
        }
      }
    }
  }
  .v-images-add {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 3px;
    cursor: pointer;
    width: 90px;
    height: 90px;
    margin: 0 10px 10px 0;
    &:hover {
      background-color: #eeeeee;
    }
    i {
      color: #cccccc;
      font-size: 20px;
    }
    input {
      display: none;
    }
  }
}

.v-images-preview {
  .v-images-item {
    flex: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 90px;
    position: relative;
    box-sizing: border-box;
    background-color: #eee;
    border-radius: 3px;
    margin: 0 10px 10px 0;
    cursor: pointer;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .v-image-null {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eeeeee;
    color: #ccc;
    width: 90px;
    height: 90px;
  }
}
</style>