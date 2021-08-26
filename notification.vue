<template>
  <ListTransition>
    <div class="v-notification vertical" v-for="item of queue" :key="item.id">
      <h4 v-if="item.title"><i class="vicon-info" /> {{ item.title }}</h4>
      <div class="body">{{ item.body }}</div>
      <div class="actions">
        <button
          v-if="item.confirm"
          class="confirm"
          @click="item.confirm(item.id)"
        >
          Confirm
        </button>
      </div>
      <i class="ficon-cha close center" @click="close(item.id)" />
    </div>
  </ListTransition>
</template>

<script>
import Adaptor from "./Adaptor.js";
import ListTransition from "./ListTransition.vue";
export default {
  instance: undefined,
  incrementId: 0,
  components: { ListTransition },
  data() {
    return { queue: [] };
  },
  methods: {
    close(id) {
      const { queue } = this;
      for (const index in queue) {
        const item = queue[index];
        if (item.id === id) {
          queue.splice(index, 1);
        }
      }
    },
  },
  open(options) {
    const { title = "", body = "", time, confirm } = options;
    if (this.instance === undefined) {
      this.instance = Adaptor.Component(this, "v-notification-container");
    }

    const id = this.incrementId++;

    this.instance.queue.push({
      id,
      title,
      body,
      time,
      confirm,
    });

    if (time) {
      setTimeout(() => {
        this.instance.close(id);
      }, time);
    }

    return id;
  },
  close(id) {
    this.instance.close(id);
  },
};
</script>

<style >
#v-notification-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
@media screen and (min-width: 500px) {
  #v-notification-container {
    left: unset;
    width: 400px;
  }
}
</style>

<style lang="scss" scoped>
.v-notification {
  position: relative;
  width: 100%;
  margin: 6px;
  font-size: 14px;
  border: 1px solid #fff;
  border-radius: 4px;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
    0 9px 28px 8px #0000000d;
  // color: #fff;
  background: #fff;
  pointer-events: auto;
  padding: 16px;
  .body {
    margin: 6px 0;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    .confirm {
      background-color: #1890ff;
      padding: 8px 10px;
      border-radius: 3px;
      color: #fff;
      cursor: pointer;
    }
  }
  .close {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 8px;
    right: 8px;
    font-size: 18px;
    color: #999;
    cursor: pointer;
    &:hover {
      color: #666;
    }
  }
  h4 {
    padding-bottom: 10px;
    i {
      display: inline-block;
      margin-right: 3px;
      &:before {
        content: "\e753";
        color: #1890ff;
      }
    }
  }
}
</style>
