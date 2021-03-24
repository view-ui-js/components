<template>
  <FormBox v-if="edit" :label="label" :error="error">
    <div class="vi-input">
      <div class="vi-input-before">
        <slot name="before"></slot>
      </div>
      <input
        type="number"
        :readonly="readonly"
        :placeholder="placeholder"
        v-model.number="input"
        @input="$emit('input', input)"
        @change="$emit('change', input)"
        @focus="$emit('focus', input)"
        @click="$emit('click', input)"
        @blur="$emit('blur', input)"
      />
      <div class="vi-input-after">
        <slot name="after">
          <i v-if="icon" :class="icon"></i>
          <span v-if="unit" class="vi-input-unit">{{ unit }}</span>
        </slot>
      </div>
    </div>
  </FormBox>
  <div v-else-if="value" class="vi-input-preview">
    <i v-if="icon" :class="icon"></i>
    <span v-else-if="showLabel" class="vi-input-preview-label"
      >{{ showLabel }}：</span
    >
    <span class="vi-input-preview-value">{{ value }}</span>
    <span v-if="unit" class="vi-input-preview-unit">{{ unit }}</span>
  </div>
</template>

<script>
import FormBox from "../FormBox.vue";
export default {
  name: "NumberText",
  components: { FormBox },
  props: {
    value: Number,
    readonly: Boolean,
    name: String,
    label: String,
    icon: String,
    unit: String,
    placeholder: String,
  },
  data() {
    return {
      input: this.value,
      edit: true,
      showLabel: this.name || this.label,
      error: "",
    };
  },
  methods: {},
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