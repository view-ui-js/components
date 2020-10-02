<template>
  <FormBox v-if="edit" :label="label" :error="error">
    <div class="vi-date-picker" @click.stop="click">
      <div class="vi-input">
        <input v-model="input" :placeholder="placeholder" readonly />
        <i class="vicon-riqi1"></i>
      </div>
      <BubbleFixe v-if="open" placement="bottom">
        <Date :value="ymd" @change="change"></Date>
      </BubbleFixe>
    </div>
  </FormBox>
  <div v-else-if="value" class="vi-input-preview">
    <span class="vi-input-preview-label">{{ label }}：</span>
    <span class="vi-input-preview-value">{{ setInput(value) }}</span>
  </div>
</template>

<script>
import dayjs from "dayjs";
import mixing from "./mixingDate.js";
import Date from "../Date/Index.vue";
import BubbleFixe from "../BubbleFixe.vue";
export default {
  extends: mixing,
  components: { BubbleFixe },
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "选择日期",
    },
    format: {
      type: String,
      default: "YYYY-MM-DD",
    },
  },
  data() {
    const data = {
      ymd: [],
      input: "",
      edit: true,
      error: "",
    };
    if (this.value) {
      data.ymd = this.dateParser(this.value);
      data.input = this.setInput(this.value);
    }
    return data;
  },
  methods: {
    setInput(dateString) {
      return dayjs(dateString).format(this.format);
    },
    change(ymd) {
      this.ymd = ymd;
      this.input = this.setInput(ymd.join("-"));
      this.$emit("input", this.input);
    },
  },
  install(Vue) {
    Vue.component(this.name, this);
    Vue.component(Date.name, Date);
  },
};
</script>

<style lang="scss">
.vi-date-picker {
  position: relative;
  height: 38px;
}
</style>