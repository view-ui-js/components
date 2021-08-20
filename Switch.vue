<template>
  <div
    class="v-switch"
    :class="{ 'v-switch-open': status, 'v-switch-disable': disable }"
    @click="click"
    @dblclick.stop
  >
    <div class="v-switch-circle"></div>
  </div>
</template>

<script>
import theme from "./theme.js";
export default {
  name: "Switch",
  emits: ["click"],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    name: {
      type: String,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      edit: true,
      status: this.value,
    };
  },
  watch: {
    value(value) {
      this.status = value;
    },
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
    },
  },
  style({ active }) {
    return `
      .v-switch.v-switch-open {
        background-color: ${active.color};
      }
      .v-switch-open .v-switch-circle {
        border: 1px solid ${active.color};
      }
    `;
  },
  install(app) {
    app.component(this.name, this);
    theme.style(this.style);
  },
};
</script>

<style lang="scss">
.v-switch {
  width: 36px;
  height: 20px;
  display: block;
  border-radius: 20px;
  background-color: #dedede;
  cursor: pointer;
  user-select: none;
  transition: all 0.1s ease;
  &.v-switch-disable {
    cursor: not-allowed;
    opacity: 0.6;
  }
  .v-switch-circle {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    border: 1px solid #e2e2e2;
    background-color: #ffffff;
    transition: all 0.1s ease;
  }
  &.v-switch-open {
    .v-switch-circle {
      transform: translateX(80%);
    }
  }
}
</style>