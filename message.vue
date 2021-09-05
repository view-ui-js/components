<template>
  <ListTransition class="v-message-box">
    <div class="v-message-padding" v-for="item of queue" :key="item.id">
      <div class="v-message">
        <i class="vicon" :class="`vicon-${item.type}`" />
        <span class="body">
          {{ item.body }}
        </span>
      </div>
    </div>
  </ListTransition>
</template>

<script>
import Adaptor from "./Adaptor.js";
import ListTransition from "./ListTransition.vue";
let instance;
let incrementId = 0;
export default {
  components: { ListTransition },
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
      instance = Adaptor.Component(this, "v-message-container");
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

<style lang="scss">
#v-message-container {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  width: 400px;
}
</style>

<style lang="scss" scoped>
.v-message-box {
  padding-top: 6px;
  .v-message-padding {
    padding: 6px;
    width: 100%;
    .v-message {
      position: relative;
      border-radius: 4px;
      padding: 18px 20px;
      font-size: 14px;
      border: 1px solid #fff;
      box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
      background: #fff;
      pointer-events: auto;
      .vicon {
        vertical-align: middle;
        font-size: 20px;
        margin-right: 8px;
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
        vertical-align: middle;
      }
    }
  }
}
</style>
