<template>
  <Loading :status="loading">
    <div class="vi-list">
      <slot name="befor"></slot>
      <slot v-for="(item, index) of list" :item="item" :index="index"></slot>
      <slot name="after"></slot>
    </div>
  </Loading>
</template>

<script>
import Loading from "./Loading.vue";
export default {
  name: "List",
  components: { Loading },
  props: {
    data: Array,
    loading: String
  },
  data() {
    return {
      list: this.data
    };
  },
  methods: {},
  mounted() {},
  watch: {
    data(value) {
      this.list = value;
      // console.log(value);
    }
  },
  install(Vue) {
    Vue.component(this.name, this);
  }
};
</script>

<style lang="scss">
@import "./style/var.scss";
.vi-list {
  margin: 6px;
}
</style>