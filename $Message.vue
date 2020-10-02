<template>
  <transition name="fade" appear>
    <div v-if="status" class="vi-message">
      <i :class="`vicon-${type}`"></i>
      {{ body }}
    </div>
  </transition>
</template>

<script>
let messageContainer;
export default {
  data() {
    return { status: true };
  },
  mounted() {
    messageContainer.appendChild(this.$el);
    setTimeout(() => {
      this.status = false;
    }, this.time);
  },
  install(Vue) {
    const Message = Vue.extend(this);
    function proxy(type, body = "", time = 1500) {
      if (!messageContainer) {
        messageContainer = document.createElement("div");
        messageContainer.id = "vi-message-container";
        document.body.appendChild(messageContainer);
      }
      new Message({ data: { type, body, time } }).$mount();
    }
    Vue.mixin({
      methods: {
        $message(body, time) {
          proxy("info", body, time);
        },
        $info(body, time) {
          proxy("info", body, time);
        },
        $success(body, time) {
          proxy("success", body, time);
        },
        $error(body, time) {
          proxy("error", body, time);
        },
        $warning(body, time) {
          proxy("warning", body, time);
        },
        $load(body, time) {
          proxy("load", body, time);
        },
      },
    });
  },
};
</script>

<style lang="scss">
#vi-message-container {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  .vi-message {
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
      // transition: transform 0.5s;
      // transform: rotate(90deg);
    }
  }
}
</style>
