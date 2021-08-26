<template>
  <div id="v-message-container">
    <transition-group name="page">
      <div class="v-message" v-for="item of queue" :key="item.id">
        <i class="vicon" :class="`vicon-${item.type}`" />
        <span class="body">
          {{ item.body }}
        </span>
      </div>
    </transition-group>
  </div>
</template>

<script>
import Adaptor from "./Adaptor.js";
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
      instance = Adaptor.Component(this);
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
  z-index: 10000;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  .v-message {
    display: inline-block;
    transition: all 0.3s ease;
    border-radius: 4px;
    padding: 18px 20px;
    margin: 10px;
    font-size: 14px;
    min-width: 300px;
    border: 1px solid #fff;
    box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
    background: #fff;
    pointer-events: auto;
    .vicon {
      vertical-align: middle;
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
    .body {
      margin-left: 8px;
    }
  }
  .page-enter-active,
  .page-leave-active {
    transition: transform 0.3s, opacity 0.3s;
  }
  .page-enter-from,
  .page-leave-to {
    transform: translate3d(0, -80%, 0);
    opacity: 0;
  }
  .page-leave-active {
    position: absolute;
  }
}
</style>
