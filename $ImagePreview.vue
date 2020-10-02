<template>
  <ImagePreview v-if="open" :images="images" :index="index" :title="title" @close="open=false"></ImagePreview>
</template>

<script>
import ImagePreview from "./ImagePreview.vue";
export default {
  components: { ImagePreview },
  data() {
    return {
      open: true,
      images: {},
      index: 0,
      title: ''
    };
  },
  install(Vue) {
    const Preview = Vue.extend(this);
    Vue.mixin({
      methods: {
        $ImgPreview({ images, index, title }) {
          new Preview({ data: { images, index, title } }).$mount();
        }
      }
    });
  }
};
</script>