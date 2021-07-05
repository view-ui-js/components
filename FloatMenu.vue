<template>
  <transition name="scale" appear>
    <keep-alive>
      <Bubble v-if="show" class="vi-float-menu" :gap="gap" placement="bottom">
        <ul class="vi-float-menu-items">
          <li
            class="vt-hover2"
            v-for="(item, key) of options"
            :key="key"
            @click="action(item)"
          >
            <i :class="item.icon"></i>
            {{ item.name }}
          </li>
        </ul>
      </Bubble>
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: "FloatMenu",
  props: {
    options: {
      type: Array,
    },
    gap: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return { show: false };
  },
  methods: {
    action(item) {
      this.show = false;
      if (item.action) {
        item.action(item);
      } else if (item.path) {
        this.$router.push(item.path);
      }
    },
    mouseenter() {
      clearTimeout(this.timeId);
      this.show = true;
    },
    mouseleave() {
      clearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        this.show = false;
      }, 200);
    },
  },
  mounted() {
    const { parentNode } = this.$el;
    parentNode.addEventListener("mouseenter", this.mouseenter);
    parentNode.addEventListener("mouseleave", this.mouseleave);
  },
  watch: {
    show() {
      if (this.active === true) return;
      this.active = true;
      this.$nextTick(() => {
        this.$el.addEventListener("mouseenter", this.mouseenter);
        this.$el.addEventListener("mouseleave", this.mouseleave);
      });
    },
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.vi-float-menu-items {
  min-width: 80px;
  line-height: 35px;
  padding: 6px 0;
  li {
    font-size: 14px;
    padding: 0 15px 0 15px;
    cursor: pointer;
    list-style: none;
    .vicon {
      font-size: 15px;
    }
  }
}
</style>