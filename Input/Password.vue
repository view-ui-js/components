<script>
import FormBox from "../FormBox.vue";
export default {
  emits: ["click"],
  components: { FormBox },
  props: {
    value: String,
    readonly: Boolean,
    name: String,
    label: String,
    placeholder: String,
  },
  setup(props) {
    return {
      input: props.value,
      edit: true,
      showLabel: props.name || props.label,
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
  <FormBox :label="label" :error="error">
    <div class="v-input">
      <input
        type="password"
        :readonly="readonly"
        :placeholder="placeholder"
        v-model="input"
        @input="$emit('input', input)"
        @change="$emit('change', input)"
        @focus="$emit('focus', input)"
        @click="$emit('click', input)"
        @blur="$emit('blur', input)"
      />
    </div>
  </FormBox>
</template>

<!-- <style lang="scss">
.v-input-password {

}
</style> -->