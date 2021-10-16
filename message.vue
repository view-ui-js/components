<template>
  <div class="v-message">
    <i class="vicon" :class="`vicon-${type}`" />
    <span class="body">
      {{ body }}
    </span>
  </div>
</template>

<script>
import Message from "./Globale/Message.vue";
export default {
  add(options) {
    const { type = "", body = "", time = 3000 } = options;
    Message.add({
      data() {
        return {
          type,
          body,
        };
      },
      render: this.render,
      time,
    });
  },
  message(body, time) {
    this.add({ type: "info", body, time });
  },
  info(body, time) {
    this.add({ type: "info", body, time });
  },
  success(body, time) {
    this.add({ type: "success", body, time });
  },
  error(body, time) {
    this.add({ type: "error", body, time });
  },
  warning(body, time) {
    this.add({ type: "warning", body, time });
  },
  load(body, time) {
    this.add({
      type: "load",
      body,
      time,
    });
  },
};
</script>

<style lang="scss">
.v-message {
  position: relative;
  border-radius: 4px;
  padding: 16px 14px;
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
</style>
