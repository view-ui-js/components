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
export default {
  name: "Switch",
  emits: ["click", "input"],
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
    click() {
      if (this.disable) return;
      this.status = !this.status;
      this.$emit("click", this.status);
      const { $attrs } = this;
      if ($attrs.onConfirm) {
        $attrs.onConfirm(!this.status);
      } else {
        this.$emit("input", this.status);
      }
    },
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped>
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
    border: 1px solid var(--active-color);
  }
  &.v-switch-open {
    background-color: var(--active-color);
    .v-switch-circle {
      transform: translateX(80%);
    }
  }
}
</style>