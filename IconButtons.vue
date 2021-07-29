<template>
  <div class="icon-buttons">
    <div class="icon-buttons-circle" :style="style"></div>
    <button
      class="icon-buttons-item"
      v-for="(item, name) in options"
      :class="{'icon-buttons-item-active':current === name}"
      :key="name"
      @click="click(item, name)"
    >
      <i :class="item.icon" />
      <Tip placement="top">{{item.name}}</Tip>
    </button>
  </div>
</template>

<script>
export default {
  name: "IconButtons",
  props: {
    options: Object,
    value: String
  },
  data() {
    const keys = Object.keys(this.options);
    function translate(key) {
      const index = keys.indexOf(key);
      return `translate(${index * 100}%, 0)`;
    }
    this.translate = translate;
    return {
      keys,
      current: this.value,
      style: { transform: translate(this.value) }
    };
  },
  methods: {
    click(item, name) {
      if (name !== this.current) {
        this.current = name;
        this.style.transform = this.translate(name);
        item.click(name);
      }
    }
  },
  install(app){
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
.icon-buttons {
  position: absolute;
  top: 10px;
  right: 14px;
  background-color: #f9f9f9;
  padding: 1px 2px;
  border-radius: 50px;
  height: 30px;
  border: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  .icon-buttons-item {
    position: relative;
    padding: 5px;
    color: #6e6e6e;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 100%;
    &:hover {
      background-color: #dadada;
    }
  }
  .icon-buttons-circle {
    transition: transform 0.3s ease;
    position: absolute;
    background-color: #bbbbbb;
    border-radius: 100%;
    width: 26px;
    height: 26px;
  }
  .icon-buttons-item-active {
    color: #fff;
  }
}
</style>