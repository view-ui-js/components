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
export default {
  data() {
    return { queue: [] };
  },
  install(app) {
    let instance;
    const timer = () => {
      const { queue } = instance;
      if (queue.length) {
        timer.active = true;
        const [first] = queue;
        setTimeout(() => {
          queue.shift();
          timer();
        }, first.time);
      } else {
        timer.active = false;
      }
    };
    timer.active = false;
    let id = 0;
    const proxy = (type, body, time = 1500) => {
      if (!instance) {
        const container = document.createElement("message");
        document.body.appendChild(container);
        instance = Vue.createApp(this).mount(container);
      }

      instance.queue.push({
        id: id++,
        type,
        body,
        time,
      });

      if (timer.active === false) {
        timer();
      }
    };

    app.mixin({
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
