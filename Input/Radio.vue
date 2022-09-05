<template>
  <div class="v-radio" @click="click">
    <div class="radio-circular" :class="{ 'radio-highlight': status }"></div>
    <span class="radio-label">
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: "Radio",
  props: ["value", "label"],
  data() {
    return {
      status: this.value == this.label,
    };
  },
  methods: {
    click() {
      this.status = true;
      this.$emit("input", this.label);
    },
  },
  watch: {
    value(value) {
      if (value !== this.label) {
        this.status = false;
      }
    },
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.v-radio {
  cursor: pointer;
  display: inline-block;
  padding: 9px 3px;
  .radio-circular {
    width: 16px;
    height: 16px;
    border-radius: 100%;
    border: 3px solid #d8d8d8;
    display: inline-block;
    align-items: center;
    justify-content: center;
    transition: all 0.1s linear;
  }
  .radio-highlight {
    border: 5px solid var(--active-color);
  }
  .radio-label {
    padding: 0 5px;
  }
}
</style>