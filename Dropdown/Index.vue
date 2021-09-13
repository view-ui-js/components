<template>
  <div class="v-dropdown" @click="click">
    <div class="v-dropdown-select" :class="{'active':name && name!==oneName}">
      {{name || oneName}}
      <i class="vicon arrow" :class="{'arrow_up':open}">&#xe678;</i>
    </div>
    <transition name="scale">
      <Bubble v-if="open" placement="bottom" :gap="gap">
        <slot />
      </Bubble>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    name: {
      type: String
    },
    gap: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      oneName: this.oneName || this.name,
      open: false
    };
  },
  methods: {
    click(events) {
      if (this.open === false) {
        this.open = true;
        setTimeout(() => {
          window.addEventListener("click", this.close, { once: true });
        }, 0);
      }
    },
    close(events) {
      this.open = false;
    }
  },
  install(app) {
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
.v-dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
  padding: 10px;
  &:hover,
  .active {
    color: var(--v-active);
  }
  .v-dropdown-select {
    position: relative;
    padding-right: 18px;
    .arrow {
      position: absolute;
      top: 4px;
      right: 0px;
      transition: all 0.25s ease;
      font-size: 12px;
      &.arrow_up {
        transform: rotate(180deg);
      }
    }
  }
}
</style>