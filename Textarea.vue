<template>
  <FormBox v-if="edit" :label="label">
    <textarea
      class="vi-textarea"
      v-model="input"
      :placeholder="placeholder"
      :rows="rows"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="Input"
      @change="Change"
    ></textarea>
  </FormBox>
  <div v-else-if="value" class="vi-textarea-preview">
    <span v-if="label" class="vi-textarea-preview-label">{{label}}：</span>
    {{value}}
  </div>
  <div v-else class="vi-textarea-null">
    <div class="vi-textarea-null-row"></div>
    <div class="vi-textarea-null-row"></div>
    <div class="vi-textarea-null-row"></div>
    <div class="vi-textarea-null-row"></div>
  </div>
</template>

<script>
export default {
  name: "Textarea",
  props: {
    placeholder: {
      type: String,
    },
    value: {
      type: String,
    },
    label: {
      type: String,
    },
    rows: {
      type: [String, Number],
      default: 2,
    },
    maxlength: {
      type: [String, Number],
    },
    readonly: {
      type: Boolean,
    },
  },
  data() {
    return {
      input: this.value,
      edit: true,
      error: "",
    };
  },
  methods: {
    Input() {
      if (this.type === "number") {
        this.input = Number(this.input);
      }
      this.$emit("input", this.input);
    },
    Change() {
      this.$emit("change", this.input);
    },
  },
  watch: {
    value(value) {
      this.input = value;
    },
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.vi-textarea {
  padding: 10px 8px;
  width: 100%;
  // min-height: 150px;
  resize: vertical;
  overflow: hidden;
}
.vi-textarea-preview {
  white-space: pre-wrap;
  line-height: 40px;
}
.vi-textarea-null {
  width: 100%;
  .vi-textarea-null-row {
    height: 15px;
    background-color: #f5f5f5;
    margin: 15px 0;
    &:nth-child(1) {
      width: 340px;
    }
    &:nth-child(2),
    &:nth-child(3) {
      width: 100%;
    }
    &:nth-child(4) {
      width: 550px;
    }
  }
}
</style>