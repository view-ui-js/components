<template>
  <div class="vi-image" :class="{ 'vi-image-round': round }">
    <template v-if="edit">
      <div v-if="image.src" class="vi-image-edit" @click="preview">
        <div class="vi-image-box">
          <img :src="image.src" />
        </div>
        <i class="vi-image-delete vicon-cha" @click.stop="destroy" />
      </div>
      <div v-else class="vi-image-add" @click="add">
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
    <div v-else class="vi-image-show">
      <div v-if="image.src" class="vi-image-box" @click.stop="preview">
        <img :src="image.src" />
      </div>
      <i v-else class="vi-image-null vicon-tupian" />
    </div>
  </div>
</template>

<script>
export default {
  name: "vImage",
  props: {
    value: {
      type: String,
      default: ""
    },
    read: Boolean,
    round: Boolean
  },
  data() {
    return {
      edit: this.read ? false : true,
      image: { src: this.value }
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
          const src = await new Promise(function(resolve) {
            reader.onload = () => {
              resolve(reader.result);
            };
          });
          this.image = {
            file,
            src
          };
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
      this.$ImgPreview({
        images: [image],
        index: 0
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
        await this.$options.network(url, formData).then(data => {
          const [src] = data.image;
          this.image = { src };
          this.$emit("input", src);
        });
      }
    }
  },
  watch: {
    value(src) {
      this.image = { src };
    },
    read(value) {
      this.edit = value ? false : true;
    }
  },
  install(app, network) {
    this.network = network;
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
.vi-image {
  display: flex;
  user-select: none;
  flex-wrap: wrap;
  width: 90px;
  height: 90px;
  .vi-image-edit {
    flex: none;
    position: relative;
    margin: 0 10px 10px 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    background-color: #eee;
    border-radius: 3px;
    border: 1px solid #eaeaea;
    .vi-image-delete {
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
      .vi-image-delete {
        display: flex;
      }
    }
  }
  .vi-image-add {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
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
  .vi-image-show {
    width: 100%;
    height: 100%;
    .vi-image-null {
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
  .vi-image-box {
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
.vi-image-round {
  .vi-image-add,
  .vi-image-edit,
  .vi-image-box,
  .vi-image-show {
    border-radius: 100%;
  }
}
</style>
