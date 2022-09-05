<script>
import extend from "./extends.js";
export default {
  extends: extend,
  mounted() {
    this.select(this.value);
  },
};
</script>

<template>
  <FormBox v-if="ready === false" ref="FormBox" :label="label">
    <div class="v-select" @click="click">
      <div v-if="current" class="show-current">{{ current }}</div>
      <div v-else class="show-current placeholder">{{ placeholder }}</div>
      <i class="vicon arrow" :class="{ arrow_up: drop }">&#xe678;</i>
      <transition name="select-drop" appear>
        <ul v-show="drop">
          <slot />
        </ul>
      </transition>
    </div>
  </FormBox>
  <div v-else class="v-select-preview">
    <span class="v-select-preview-name">{{ label }}：</span>
    <span>{{ current || "-" }}</span>
  </div>
</template>
