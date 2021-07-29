<template>
  <div class="vi-draggable-list">
    <Draggable v-if="list.length" v-model="list" v-slot="{ index, item }" @click="click">
      <slot :item="item"></slot>
      <i class="vi-draggable-list-delete vicon-cha" @click.stop="destroy(index)" />
    </Draggable>
    <div v-show="list.length < max" class="vi-draggable-list-add" @click="$emit('add')">
      <i class="vicon-jia" />
    </div>
  </div>
</template>

<script>
import Draggable from "./Draggable.vue";
export default {
  name: "DraggableList",
  components: { Draggable },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    max: {
      type: Number,
      default: 20
    },
    title: String
  },
  data() {
    return {
      list: this.value
    };
  },
  methods: {
    destroy(key) {
      this.list.splice(key, 1);
      this.$emit("input", this.list);
    },
    click(evnet, index, item) {
      this.$emit("click", index, item);
    }
  },
  install(app) {
    app.component(this.name, this);
  }
};
</script>


<style lang="scss">
.vi-draggable-list {
  // display: flex;
  // flex-wrap: wrap;
  user-select: none;
  width: 100%;
  .vi-draggable {
    // display: contents;
    position: relative;
    .vi-draggable-item {
      position: relative;
      box-sizing: border-box;
      background-color: #eee;
      border-radius: 3px;
      margin-bottom: 10px;
      cursor: grab;
      .vi-draggable-list-delete {
        display: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: absolute;
        right: -5px;
        top: -5px;
        background-color: #a2a2a2;
        width: 22px;
        height: 22px;
        border-radius: 50px;
        border: 2px solid #ffffff;
        color: #fff;
      }
      &:hover {
        .vi-draggable-list-delete {
          display: flex;
        }
      }
    }
  }
  .vi-draggable-list-add {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 3px;
    cursor: pointer;
    padding: 6px 0;
    &:hover {
      background-color: #eeeeee;
    }
    i {
      color: #cccccc;
      font-size: 30px;
    }
    input {
      display: none;
    }
  }
}
</style>