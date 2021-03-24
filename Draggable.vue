<template>
  <div class="vi-draggable">
    <div
      class="vi-draggable-item"
      draggable="true"
      v-for="(item, index) of value"
      :key="index"
      @dragstart="dragstart($event, index)"
      @dragover="dragover($event, index)"
      @dragenter="dragenter($event, index)"
      @dragend="dragend($event, index)"
      @click="$emit('click', index, item)"
    >
      <slot :index="index" :item="item"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Draggable",
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    dragstart(event, key) {
      const { currentTarget } = event;
      currentTarget.style.opacity = 0.5;
      this.currentTarget = currentTarget;
      this.currentKey = key;
    },
    dragover(event) {
      event.preventDefault();
      event.stopPropagation();
    },
    dragenter(event, key) {
      const { currentTarget } = event;
      if (currentTarget !== this.currentTarget) {
        const { currentTarget: lastTarget, currentKey: lastKye } = this;

        const { value } = this;
        const item = value[lastKye];

        value.splice(lastKye, 1);
        value.splice(key, 0, item);

        lastTarget.style.opacity = "unset"; // 恢复上一个对象的透明度

        currentTarget.style.opacity = 0.5;
        this.currentTarget = currentTarget;
        this.currentKey = key;
      }
    },
    dragend() {
      this.currentTarget.style.opacity = "unset";
      this.$emit("input", this.value);
    }
  },
  install(app) {
    app.component(this.name, this);
  }
};
</script>
