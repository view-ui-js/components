<template>
  <ImagePreview v-if="open" :images="images" :index="index" :title="title" @close="open=false"></ImagePreview>
</template>

<script>
import { defineComponent } from 'vue'
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
  install(app) {
    const Preview = defineComponent(this);
    app.mixin({
      methods: {
        $ImgPreview({ images, index, title }) {
          new Preview({ data: { images, index, title } }).$mount();
        }
      }
    });
  }
};
</script>