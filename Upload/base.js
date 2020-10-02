import "./style.scss";

export default {
   props: {
      value: {
         type: Array,
         default() {
            return [];
         }
      },
      accept: {
         type: String,
         default: "image/*"
      },
      multiple: {
         type: String,
         default: null
      },
      max: {
         type: Number,
         default: 20
      }
   },
   // 测试发现在使用mixins方式混合data属性时，data属性只在首次渲染时数据绑定有效，之后视图会始终保持首次加载时的状态
   // 针对这个bug的临时解决方法是将data放到组件内部，不参与mixins混合
   data() {
      const images = [];
      for (const src of this.value) {
         images.push({ src });
      }
      return { images };
   },
   methods: {
      Add() {
         this.$refs.input.click();
      },
      // change不会删除文件
      async Change(files) {
         if (files.length) {
            for (const file of files) {
               const { name, type } = file;
               // 将file转换为DataURL格式，通过img src直接显示
               const reader = new FileReader();
               reader.readAsDataURL(file);
               const src = await new Promise(function (resolve, reject) {
                  reader.onload = () => {
                     resolve(reader.result);
                  };
               });
               this.images.push({ file, name, type, src });
            }
         }
         // 初始化input值
         this.$refs.input.value = "";
      },
      Destroy(key) {
         const item = this.images[key];
         if (!item.file) {
            const value = [...this.value];
            value.splice(value.indexOf(item.src), 1);
            this.$emit("input", value);
         }
         this.images.splice(key, 1);
      },
      async submit(url) {
         // 生成FormData表单
         let formData;
         for (const item of this.images) {
            if (item.file) {
               if (!formData) {
                  formData = new FormData();
               }
               formData.append("files", item.file);
            }
         }
         // 文件提交
         if (formData) {
            const images = await this.post(url, formData).catch(error => {
               this.$error("文件上传失败");
            });
            if (images) {
               this.$emit("input", [...this.value, ...images]);
               // 上传成功后删除file，避免提交数据失败后重复上传
               for (const item of this.images) {
                  if (item.file) {
                     delete item.file;
                  }
               }
            }
         }
      }
   }
};