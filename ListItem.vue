<template>
  <div
    class="vi-list-item-box"
    @click="click"
    @dblclick="dblclick"
    @contextmenu="$emit('contextmenu', $event)"
  >
    <div class="vi-list-item">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  install(Vue) {
    Vue.component(this.name, this);
  },
  methods: {
    click(event) {
      this.timer = setTimeout(() => {
        this.$emit("click", event);
      }, 260);
    },
    dblclick(event) {
      clearTimeout(this.timer);
      this.$emit("dblclick", event);
    }
  }
};
</script>

<style lang="scss">
@import "./style/var.scss";
.vi-list-item-box {
  width: 25%;
  padding: 8px;
  float: left;
  .vi-list-item {
    width: 100%;
    padding: 8px 12px;
    background-color: #fff;
    // box-shadow: 0px 2px 5px #e8e8e8;
    border-radius: 3px;
    color: #666;
    position: relative;
    user-select: none;
    &:hover {
      box-shadow: 0 1px 10px 0 #0000001f;
    }
  }
}
</style>