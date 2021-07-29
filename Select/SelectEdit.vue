<template>
  <FormBox v-if="edit" ref="FormBox" :label="label">
    <div class="vi-select" @click="click">
      <input :placeholder="placeholder" v-model="current" @change="change" />
      <i class="vicon arrow" :class="{'arrow_up':drop}">&#xe678;</i>
      <transition name="drop" appear>
        <ul v-show="drop">
          <slot />
        </ul>
      </transition>
    </div>
  </FormBox>
  <div v-else class="vi-select-preview">
    <span class="vi-select-preview-name">{{label}}：</span>
    <span>{{current || '-'}}</span>
  </div>
</template>

<script>
import mixing from "./mixing.js";
export default {
  name: "SelectEdit",
  extends: mixing,
  methods: {
    change() {
      this.$emit("input", this.input);
    },
  },
};
</script>