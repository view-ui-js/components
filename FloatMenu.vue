<template>
  <Bubble v-if="open" class="vi-float-menu" :gap="gap" placement="bottom">
    <ul class="vi-float-menu-items">
      <li class="vt-hover2" v-for="(item,key) of options" :key="key" @click="action(item)">
        <i :class="item.icon"></i>
        {{item.name}}
      </li>
    </ul>
  </Bubble>
</template>

<script>
export default {
  name: "FloatMenu",
  props: {
    options: {
      type: Array
    },
    gap: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    mouseenter() {
      this.open = true;
    },
    mouseleave() {
      this.open = false;
    },
    action(item) {
      this.open = false;
      if (item.action) {
        item.action(item);
      } else if (item.path) {
        this.$router.push(item.path);
      }
    }
  },
  mounted() {
    const { parentNode } = this.$el;
    parentNode.addEventListener("mouseenter", ev => {
      this.open = true;
    });
    parentNode.addEventListener("mouseleave", ev => {
      this.open = false;
    });
  },
  install(Vue) {
    Vue.component(this.name, this);
  }
};
</script>

<style lang="scss">
.vi-float-menu-items {
  padding: 8px 0 !important;
  line-height: 35px;
  li {
    font-size: 14px;
    padding: 0 15px 0 10px;
    cursor: pointer;
    list-style: none;
    .vicon {
      font-size: 15px;
    }
  }
}
</style>