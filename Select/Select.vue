<template>
  <FormBox v-if="edit" ref="FormBox" :label="label">
    <div class="vi-select" @click="click">
      <div v-if="current" class="show-current">{{current}}</div>
      <div v-else class="show-current placeholder">{{placeholder}}</div>
      <i class="vicon arrow" :class="{ 'arrow_up': drop }">&#xe678;</i>
      <transition name="select-drop" appear>
        <ul v-show="drop">
          <slot></slot>
        </ul>
      </transition>
    </div>
  </FormBox>
  <div v-else class="vi-select-preview">
    <span class="vi-select-preview-name">{{label}}：</span>
    <span>{{ current || '-' }}</span>
  </div>
</template>

<script>
import mixing from "./mixing.js";
export default {
  name: "Select",
  extends: mixing,
  mounted() {
    this.select(this.value);
  },
  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>