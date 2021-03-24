<template>
  <div id="vi-message-container">
    <transition-group name="fade">
      <div class="vi-message" v-for="item of queue" :key="item.id">
        <i :class="`vicon-${item.type}`"></i>
        {{ item.body }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default {
  data() {
    return { queue: [] };
  },
  mounted() {
    document.body.appendChild(this.$el);
  },
  install(app) {
    let instance;
    let id = 0;
    const timer = () => {
      const { queue } = instance;
      if (queue.length) {
        timer.status = true;
        const [first] = queue;
        setTimeout(() => {
          queue.shift();
          timer();
        }, first.time);
      } else {
        timer.status = false;
      }
    };
    timer.status = false;
    const proxy = (type, body, time = 1500) => {
      if (!instance) {
        const Message = defineComponent(this);
        instance = new Message().$mount();
      }
      instance.queue.push({
        id: id++,
        type,
        body,
        time,
      });
      if (timer.status === false) {
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
    }
  }
}
</style>
