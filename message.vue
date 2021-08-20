<template>
  <div id="v-message-container">
    <transition-group name="fade">
      <div class="v-message" v-for="item of queue" :key="item.id">
        <i :class="`vicon-${item.type}`" />
        {{ item.body }}
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

    if (instance === undefined) {
      const container = document.createElement("notification");
      document.body.appendChild(container);
      instance = Vue.createApp(this).mount(container);
    }

    const id = incrementId++;

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
  },
  message(body, time) {
    this.open({ type: "info", body, time });
  },
  info(body, time) {
    this.open({ type: "info", body, time });
  },
  success(body, time) {
    this.open({ type: "success", body, time });
  },
  error(body, time) {
    this.open({ type: "error", body, time });
  },
  warning(body, time) {
    this.open({ type: "warning", body, time });
  },
  load(body, time) {
    this.open({
      type: "load",
      body,
      time,
    });
  },
};
</script>

<style lang="scss" scoped>
#v-message-container {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  .v-message {
    border-radius: 4px;
    padding: 10px 15px;
    margin: 10px;
    font-size: 14px;
    min-width: 220px;
    border: 1px solid #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    // color: #fff;
    background: #fff;
    pointer-events: auto;
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
}
</style>
