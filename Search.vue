<template>
  <div class="v-search">
    <input
      v-model="data"
      type="text"
      :placeholder="placeholder"
      @focusout="emit('focusout')"
      @focus="emit('focus')"
      @input="emit('input')"
      @keyup.enter="emit('enter')"
    />
    <i class="vicon-search" @click="emit('submit')" />
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    value: String,
    placeholder: String,
    options: [Array, Object],
  },
  data() {
    return {
      data: this.value,
    };
  },
  methods: {
    emit(name) {
      this.$emit(name, this.data);
    },
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.v-search {
  display: flex;
  background-color: #efefef;
  border-radius: 50px;
  height: 36px;
  input {
    border-style: none;
    outline: none;
    flex: 1;
    background: none;
    padding: 0 18px 0px 18px;
  }
  i {
    padding: 11px 16px 11px 0;
    line-height: 100%;
    cursor: pointer;
    color: #868686;
    font-size: 15px;
  }
}
</style>