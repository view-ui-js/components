<template>
  <ul>
    <li
      v-for="(option,index) in options"
      :key="index"
      :class="setClass(option)"
      @click.stop="select(option,index)"
    >
      {{option.value || option}}
      <template v-if="option.children">
        <i class="vicon arrow">&#xeb24;</i>
        <CascaderItem
          :options="option.children"
          :active="setActive(option)"
          :pid="index"
          @select="select"
        ></CascaderItem>
      </template>
    </li>
  </ul>
</template>

<script>
// 级联菜单递归组件
export default {
  name: "CascaderItem",
  props: ["options", "active", "pid"],
  data() {
    return {
      value: "",
      subActive: null
    };
  },
  methods: {
    select(option, id, pid) {
      if (!option.children) {
        let parent = this.options[pid];
        if (parent) {
          this.$emit(
            "select",
            [parent.value, ...option],
            [pid, ...id],
            this.pid
          );
        } else {
          this.$emit("select", [option.value || option], [id], this.pid);
        }
      }
    },
    setClass(option) {
      const active = this.active;
      if (active) {
        const value = option.value || option;
        if (value) {
          if (value === active[0]) {
            return ["vt-active"];
          }
        }
      }
    },
    // 为了防止vue update死循环，临时用setClass代码分离出冗余setActive解决冲突
    setActive(option) {
      const active = this.active;
      if (active) {
        const value = option.value || option;
        if (value) {
          if (value === active[0]) {
            return active.slice(1);
          }
        }
      }
    }
  }
};
</script>