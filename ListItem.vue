<template>
  <div
    class="v-list-item"
    @click="click"
    @dblclick="dblclick"
    @contextmenu="$emit('contextmenu', $event)"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "ListItem",
  emits: ["click"],
  install(app) {
    app.component(this.name, this);
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
    },
  },
};
</script>

<style lang="scss">
.v-list-item {
  width: 220px;
  height: 320px;
  margin: 8px;
  float: left;
  background-color: #fff;
  border-radius: 3px;
  color: #666;
  position: relative;
  user-select: none;
  &:hover {
    box-shadow: 0 1px 10px 0 #0000001f;
  }
}
</style>