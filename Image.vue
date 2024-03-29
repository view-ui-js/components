<template>
  <div class="v-image" :class="{ 'v-image-round': round }">
    <template v-if="edit">
      <div v-if="image.src" class="v-image-edit" @click="preview">
        <div class="v-image-box">
          <img :src="image.src" />
        </div>
        <i class="v-image-delete vicon-cha" @click.stop="destroy" />
      </div>
      <div v-else class="v-image-add" @click="add">
        <i class="vicon-add" />
        <input
          ref="input"
          type="file"
          accept="image/*"
          name="file"
          @change="change($event.target.files)"
        />
      </div>
    </template>
    <div v-else class="v-image-show">
      <div v-if="image.src" class="v-image-box" @click.stop="preview">
        <img :src="image.src" />
      </div>
      <i v-else class="v-image-null vicon-tupian" />
    </div>
  </div>
</template>

<script>
import imagePreview from "./imagePreview.vue";
export default {
  name: "Image",
  props: {
    src: {
      type: String,
      default: "",
    },
    read: Boolean,
    round: Boolean,
  },
  data() {
    return {
      edit: this.read ? false : true,
      image: { src: this.src },
    };
  },
  methods: {
    add() {
      this.$refs.input.click();
    },
    async change(files) {
      if (files.length) {
        for (const file of files) {
          // 将file转换为DataURL格式，通过img src直接显示
          const reader = new FileReader();
          reader.readAsDataURL(file);
          const src = await new Promise(function (resolve) {
            reader.onload = () => {
              resolve(reader.result);
            };
          });
          this.image = { file, src };
        }
      }
      this.$refs.input.value = ""; // 初始化input值
    },
    destroy() {
      this.image = {};
      this.$emit("input", "");
    },
    preview() {
      const { image } = this;
      imagePreview.open({
        images: [image],
        index: 0,
      });
    },
    /**
     * 供外部调用的图片上传接口
     */
    async upload(url) {
      const { file } = this.image;
      if (file) {
        const formData = new FormData(); // 生成FormData表单
        formData.append("image", file);
        await this.$options.network(url, formData).then((data) => {
          const [src] = data.image;
          this.image = { src };
          this.$emit("input", src);
        });
      }
    },
  },
  watch: {
    src(src) {
      this.image = { src };
    },
    read(value) {
      this.edit = value ? false : true;
    },
  },
  install(app, network) {
    this.network = network;
    app.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped>
.v-image {
  display: flex;
  user-select: none;
  flex-wrap: wrap;
  width: 80px;
  height: 80px;
  .v-image-edit {
    flex: none;
    position: relative;
    margin: 0 10px 10px 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    background-color: #eee;
    border-radius: 3px;
    border: 1px solid #eaeaea;
    .v-image-delete {
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
      .v-image-delete {
        display: flex;
      }
    }
  }
  .v-image-add {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f3f3f3c7;
    border-radius: 3px;
    cursor: pointer;
    width: 100%;
    height: 100%;
    color: #afb3b4;
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
  .v-image-show {
    width: 100%;
    height: 100%;
    .v-image-null {
      display: flex;
      justify-content: center;
      align-items: center;
      // border-radius: 100px;
      background-color: #eeeeee;
      color: #ccc;
      width: 100%;
      height: 100%;
    }
  }
  .v-image-box {
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
    overflow: hidden;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
}
.v-image-round {
  .v-image-add,
  .v-image-edit,
  .v-image-box,
  .v-image-show {
    border-radius: 100%;
  }
}
</style>
