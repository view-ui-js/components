<template>
  <Dropdown :name="activeName">
    <ul class="v-dropdown-select" @click.stop>
      <li
        v-for="(value,name) of options"
        :key="name"
        :class="{'active':name===activeName}"
        @click.stop="select(name,value)"
      >{{name}}</li>
    </ul>
  </Dropdown>
</template>

<script>
export default {
  name: "DropdownSelect",
  props: {
    name: {
      type: String,
      default: "默认"
    },
    options: {
      type: Object
    },
    gap: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activeName: this.name
    };
  },
  methods: {
    select(name, value) {
      if (this.activeName === name) {
        this.activeName = null;
        this.$emit("change", {});
      } else {
        this.activeName = name;
        this.$emit("change", { name, value });
      }
      document.body.click();
    },
    _Reset() {
      this.activeName = undefined;
    }
  },
  install(app) {
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
.v-dropdown-select {
  // padding: 8px 0px;
  // line-height: 36px;
  // white-space: nowrap;
  li {
    font-size: 14px;
    cursor: pointer;
    padding: 0 26px;
    &.active {
      background-color: #f0f0f0;
      color: var(--active);
      &:before {
        font-family: "vicon";
        content: "\e600";
        position: absolute;
        left: 6px;
      }
      &:hover {
        &:before {
          content: "\e679";
        }
      }
    }
    &:hover {
      background-color: #f7f7f7;
      color: var(--hover);
    }
  }
}
</style>