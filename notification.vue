<template>
  <div class="v-notification vertical">
    <h4 v-if="title"><i class="vicon-info" /> {{ title }}</h4>
    <i class="ficon-cha close center" @click="close" />
    <div v-if="body" class="body">{{ body }}</div>
    <div class="actions">
      <button v-if="showConfirm" class="confirm" @click="confirm">
        Confirm
      </button>
    </div>
  </div>
</template>

<script>
import Message from "./Globale/Message.vue";
export default {
  add(options) {
    const { title = "", body = "", time, confirm, close } = options;

    return Message.add({
      data() {
        return {
          title,
          body,
          showConfirm: Boolean(confirm),
        };
      },
      methods: {
        close() {
          Message.close(this.$options.id);
          if (close) close();
        },
        confirm() {
          Message.close(this.$options.id);
          if (confirm) confirm();
        },
      },
      render: this.render,
      time,
    });
  },
};
</script>

<style lang="scss">
.v-notification {
  position: relative;
  padding: 16px 14px;
  font-size: 14px;
  // border: 1px solid #fff;
  border-radius: 12px;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
    0 9px 28px 8px #0000000d;
  // color: #fff;
  background: #ffffff99;
  backdrop-filter: blur(6px);
  pointer-events: auto;
  h4 {
    font-weight: unset;
    i {
      display: inline-block;
      font-size: 18px;
      margin-right: 3px;
      &:before {
        content: "\e753";
        color: #1890ff;
      }
    }
  }
  .close {
    position: absolute;
    top: 8px;
    right: 0;
    padding: 10px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    &:hover {
      color: #f80000;
    }
  }
  .body {
    margin-top: 14px;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    .confirm {
      margin-top: 20px;
      background-color: #1890ff;
      padding: 8px 10px;
      border-radius: 3px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
