<template>
  <FormBox v-if="edit" :label="label" :error="error">
    <div class="v-category" @click.stop="click">
      <input
        autocomplete="off"
        readonly="readonly"
        :placeholder="placeholder"
        :value="inputValue"
      />
      <i class="vicon arrow" :class="{ arrow_up: open }">&#xe678;</i>
      <transition name="drop">
        <div v-if="open" class="category-drop">
          <Item :options="options" :active="value" @select="select" />
        </div>
      </transition>
    </div>
  </FormBox>
  <div v-else class="v-category-preview">{{ value.join(" / ") }}</div>
</template>

<script>
import Item from "./Item.vue";
export default {
  name: "Category",
  components: { Item },
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    placeholder: String,
    label: {
      type: String,
    },
  },
  data() {
    return {
      open: false,
      edit: true,
      error: "",
      inputValue: this.value.join(" / "),
      category: [],
    };
  },
  methods: {
    // 点击时在两种状态间循环切换
    click(events) {
      if (this.open === false) {
        // 在document.body上添加一次性的click事件
        this.open = true;
        document.body.addEventListener("click", (ev) => (this.open = false), {
          once: true,
        });
      } else {
        this.open = false;
      }
    },
    select(option, keys) {
      this.open = false;
      this.inputValue = option.join(" / ");
      this.$emit("input", option);
    },
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.v-category {
  position: relative;
  .select-drop-enter-from,
  .select-drop-leave-to {
    opacity: 0;
    li {
      padding: 0 8px;
    }
  }
  .select-drop-enter-active,
  .select-drop-leave-active {
    transition: all 0.16s ease-out;
    li {
      transition: padding 0.16s ease-out;
    }
  }
  .category-drop {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 120%;
    // height: 300px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px #00000026;
    ul {
      display: inline-block;
      position: relative;
      min-width: 120px;
      height: 300px;
      // left: 100%;
      // top: 0;
      color: #666;
      border-right: 1px solid #e8e8e8;
      overflow: auto;
      // overflow-x: visible;
      // overflow-y: scroll;
      li {
        position: relative;
        padding: 8px;
        list-style: none;
        color: #989898;
        cursor: pointer;
        &:hover {
          background-color: #f5f5f5;
        }
        &.active {
          color: var(--c-active);
        }
        > ul {
          display: none;
        }
        &:hover > ul {
          display: block !important;
        }
      }
    }
  }
}
</style>