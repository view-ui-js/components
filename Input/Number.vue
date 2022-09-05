<script>
import FormBox from "../FormBox.vue";
export default {
  // name: "NumberText",
  emits: ["click"],
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
  watch: {
    value(value) {
      this.input = value;
    },
  }
};
</script>

<template>
  <FormBox v-if="edit" :label="label" :error="error">
    <div class="v-input">
      <div class="v-input-before">
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
      <div class="v-input-after">
        <slot name="after">
          <i v-if="icon" :class="icon" />
          <span v-if="unit" class="v-input-unit">{{ unit }}</span>
        </slot>
      </div>
    </div>
  </FormBox>
  <div v-else-if="value" class="v-input-preview">
    <i v-if="icon" :class="icon" />
    <span v-else-if="showLabel" class="v-input-preview-label"
      >{{ showLabel }}：</span
    >
    <span class="v-input-preview-value">{{ value }}</span>
    <span v-if="unit" class="v-input-preview-unit">{{ unit }}</span>
  </div>
</template>