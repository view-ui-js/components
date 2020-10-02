<template>
  <div
    class="vi-switch"
    :class="{'vi-switch-open':status, 'vi-switch-disable':disable}"
    @click="click"
    @dblclick.stop
  >
    <div class="vi-switch-circle"></div>
  </div>
</template>

<script>
import theme from "./theme.js";
export default {
  name: "vSwitch",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    name: {
      type: String
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      edit: true,
      status: this.value
    };
  },
  watch: {
    value(value) {
      this.status = value;
    }
  },
  methods: {
    click(event) {
      this.$emit("click", this.status);
      if (this.disable) return;
      const { confirm } = this.$listeners;
      if (confirm) {
        this.$emit("confirm", !this.status);
      } else {
        this.status = !this.status;
        this.$emit("input", this.status);
      }
    }
  },
  style({ active }) {
    return `
      .vi-switch.vi-switch-open {
        background-color: ${active.color};
      }
      .vi-switch-open .vi-switch-circle {
        border: 1px solid ${active.color};
      }
    `;
  },
  install(Vue) {
    Vue.component(this.name, this);
    theme.style(this.style);
  }
};
</script>

<style lang="scss">
.vi-switch {
  width: 36px;
  height: 20px;
  display: block;
  border-radius: 20px;
  background-color: #dedede;
  cursor: pointer;
  user-select: none;
  transition: all 0.1s ease;
  &.vi-switch-disable {
    cursor: not-allowed;
    opacity: 0.6;
  }
  .vi-switch-circle {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    border: 1px solid #e2e2e2;
    background-color: #ffffff;
    transition: all 0.1s ease;
  }
  &.vi-switch-open {
    .vi-switch-circle {
      transform: translateX(80%);
    }
  }
}
</style>