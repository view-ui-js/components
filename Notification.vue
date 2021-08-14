<template>
  <div id="v-notification-container">
    <transition-group name="right">
      <div class="v-notification level" v-for="item of queue" :key="item.id">
        <div v-if="item.type" class="type-icon">
          <i :class="`vicon-${item.type}`" />
        </div>
        <div class="main vertical">
          <h4 v-if="item.title">{{ item.title }}</h4>
          <div class="body">{{ item.body }}</div>
          <div class="actions">
            <div
              v-if="item.confirm"
              class="confirm"
              @click="item.confirm(item.id)"
            >
              Confirm
            </div>
          </div>
        </div>
        <i class="ficon-cha close center" @click="close(item.id)" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import * as Vue from "vue";
let instance;
let incrementId = 0;
export default {
  data() {
    return { queue: [] };
  },
  methods: {
    close(id) {
      const { queue } = instance;
      for (const index in queue) {
        const item = queue[index];
        if (item.id === id) {
          queue.splice(index, 1);
        }
      }
    },
  },
  open(options) {
    const { type = "", title = "", body = "", time = 3000, confirm } = options;
    if (!instance) {
      const container = document.createElement("notification");
      document.body.appendChild(container);
      instance = Vue.createApp(this).mount(container);
    }

    const id  = incrementId++;

    instance.queue.push({
      id,
      type,
      title,
      body,
      time,
      confirm,
    });

    if (time) {
      setTimeout(() => {
        instance.close(id);
      }, time);
    }

    return id;
  },
  close(id) {
    instance.close(id);
  },
};
</script>

<style lang="scss" scoped>
#v-notification-container {
  position: fixed;
  right: 0;
  top: 50px;
  z-index: 10;
  width: 400px;
  .v-notification {
    position: relative;
    // padding: 10px 15px;
    margin: 10px;
    font-size: 14px;
    border: 1px solid #fff;
    border-radius: 4px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    // color: #fff;
    background: #fff;
    pointer-events: auto;
    .type-icon {
      flex: none;
      display: flex;
      justify-content: flex-end;
      width: 34px;
      padding-top: 16px;
      i {
        font-size: 20px;
      }
      .vicon-info:before {
        content: "\e753";
        color: #1890ff;
      }
      .vicon-success:before {
        content: "\e602";
        color: #52c41a;
      }
      .vicon-warning:before {
        content: "\e613";
        color: #faad14;
      }
      .vicon-error:before {
        content: "\e728";
        color: #f5222d;
      }
      .vicon-load:before {
        content: "\e608";
        color: #000;
      }
    }
    .main {
      padding: 16px;
      .actions {
        display: flex;
        justify-content: flex-end;
        .confirm {
          background-color: #1890ff;
          padding: 6px 8px;
          border-radius: 3px;
          color: #fff;
        }
      }
    }
    .close {
      position: absolute;
      width: 30px;
      height: 30px;
      top: 4px;
      right: 4px;
      font-size: 16px;
      color: #999;
      cursor: pointer;
      &:hover {
        color: #666;
      }
    }
    h4 {
      padding-bottom: 10px;
    }
    // .description {
    //   padding-top: 10px;
    // }
  }
}
</style>
