<template>
  <Dialog v-if="open" class="vi-preview" @close="open=false">
    <img ref="img" :width="width" :height="height" :src="src" />
  </Dialog>
</template>

<script>
export default {
  data() {
    return {
      width: "auto",
      height: "auto",
      src: undefined,
      open: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      const { innerWidth, innerHeight } = global;
      const { naturalWidth, naturalHeight } = this.$refs.img;
      if (innerWidth - naturalWidth < 0) {
        this.width = innerWidth + "px";
      }
      if (innerHeight - naturalHeight < 0) {
        this.height = innerHeight + "px";
      }
    });
  },
  install(Vue) {
    const Component = Vue.extend(this);
    Vue.mixin({
      methods: {
        $ImgPreview(src) {
          if (src) {
            new Component({ data: { open: true, src } }).$mount();
          }
        }
      }
    });
  }
};
</script>