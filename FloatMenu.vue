<template>
  <transition name="scale" appear>
    <keep-alive>
      <Bubble v-if="open" class="v-float-menu" :gap="gap">
        <ul class="v-float-menu-items">
          <li
            v-for="(item, key) of options"
            class="vt-sub vt-hover"
            :class="{ 'vt-active': current == key }"
            :key="key"
            @click="select(item)"
          >
            <i :class="item.icon" />
            {{ item.name }}
          </li>
        </ul>
      </Bubble>
    </keep-alive>
  </transition>
</template>

<script>
import Bubble from "./Bubble.vue";
export default {
  name: "FloatMenu",
  components: { Bubble },
  props: {
    options: {
      type: Array,
    },
    current: {
      type: [String, Number],
    },
    gap: {
      type: Number
    },
  },
  data() {
    return { open: false };
  },
  methods: {
    select(item) {
      this.open = false;
      this.$emit("select", item);
    },
    pointerenter() {
      clearTimeout(this.timeId);
      this.open = true;
    },
    pointerleave() {
      clearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        this.open = false;
      }, 200);
    },
  },
  mounted() {
    const { parentNode } = this.$el;
    parentNode.addEventListener("pointerenter", this.pointerenter);
    parentNode.addEventListener("pointerleave", this.pointerleave);
  },
  watch: {
    open() {
      if (this.active === true) return;
      this.active = true;
      this.$nextTick(() => {
        this.$el.addEventListener("pointerenter", this.pointerenter);
        this.$el.addEventListener("pointerleave", this.pointerleave);
      });
    },
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.v-float-menu-items {
  min-width: 80px;
  line-height: 35px;
  padding: 6px 0;
  li {
    font-size: 14px;
    padding: 0 15px 0 15px;
    cursor: pointer;
    list-style: none;
    transition: all 0.1s ease;
    .vicon {
      font-size: 15px;
    }
  }
}
</style>