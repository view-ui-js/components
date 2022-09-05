<template>
  <FormBox v-if="edit" :label="label" :error="error">
    <div class="v-input-range">
      <i v-if="icon" :class="icon" />
      <input v-model="input[0]" type="number" :placeholder="placeholder[0]" @input="min" />
      <span>至</span>
      <input type="number" v-model="input[1]" :placeholder="placeholder[1]" @input="max" />
    </div>
  </FormBox>
  <div v-else class="v-input-preview">
    <i v-if="icon" :class="icon" />
    <span v-else class="v-input-preview-label">{{label}}：</span>
    <span class="v-input-preview-value">{{value[0]}} - {{value[1]}}</span>
    <span class="v-input-preview-unit">{{unit}}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    placeholder: {
      type: Array,
      default() {
        return ["最小值", "最大值"];
      }
    },
    label: String,
    icon: String,
    unit: String
  },
  data() {
    return {
      input: this.value || [],
      edit: true,
      error: ""
    };
  },
  methods: {
    min() {
      this.input[0] = Number(this.input[0]);
      this.$emit("input", this.input);
    },
    max() {
      this.input[1] = Number(this.input[1]);
      this.$emit("input", this.input);
    }
  },
  watch: {
    value(value) {
      this.input = value;
    }
  },
  created() {
    // if (this.jsIcon) {
    //   this.jsIcon = this.jsIcon.replace(/&#x/, "\\u");
    //   this.jsIcon = this.jsIcon.replace(/;/, "");
    //   this.jsIcon = eval('"' + this.jsIcon + '"');
    // }
  }
};
</script>

<style lang="scss">
.v-input-range {
  input {
    width: 45%;
  }
  span {
    display: inline-block;
    line-height: 37px;
  }
}
</style>