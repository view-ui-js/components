<template>
  <li :class="{ 'vt-active': active }" @click="select(value)">
    <slot>{{ label || value }}</slot>
  </li>
</template>

<script>
export default {
  name: "Option",
  props: {
    label: {
      type: String,
    },
    value: {
      type: [String, Number, Boolean],
    },
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    select(value) {
      // 由于Option与Select组件之间隔了一层FormBox组件，所以需要跨多个父级
      // 虽然在使用时Select与Option之间看起来是直接父子级关系，但 vue 实际是按最终插槽插入的节点计算父子关系
      this.$parent.$parent.$parent.select(value);
    },
  },
};
</script>
