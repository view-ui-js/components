<template>
  <FormBox ref="FormBox" :label="label">
    <div class="v-select" @click="click">
      <input :placeholder="placeholder" v-model="current" @change="change" />
      <i class="vicon arrow" :class="{ arrow_up: drop }">&#xe678;</i>
      <transition name="drop" appear>
        <ul v-show="drop">
          <slot />
        </ul>
      </transition>
    </div>
  </FormBox>
</template>

<script>
import extend from "./extends.js";
export default {
  extends: extend,
  methods: {
    change() {
      this.$emit("input", this.input);
    },
  },
};
</script>
