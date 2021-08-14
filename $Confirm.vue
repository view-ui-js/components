<template>
  <Dialog v-show="open" class="v-confirm" @close="Close">
    <template v-slot:header
      ><i class="vicon-bangzhu-plus-copy" />{{ title }}</template
    >
    {{ body }}
    <template v-slot:footer>
      <Button @click="Close">{{ cancelButton }}</Button>
      <Button :color="color" @click="Confirm">{{ confirmButton }}</Button>
    </template>
  </Dialog>
</template>

<script>
import * as Vue from "vue";
import Dialog from "./Dialog.vue";
import Button from "./Button.vue";
export default {
  components: { Dialog, Button },
  methods: {
    Confirm() {
      if (this.confirm) {
        this.confirm();
      }
      this.open = false;
    },
    Close() {
      if (this.close) {
        this.close();
      }
      this.open = false;
    },
  },
  install(app) {
    const _this = this;
    let instance;
    app.mixin({
      methods: {
        $confirm(options) {
          const data = {
            title: "Tips",
            color: "success",
            cancelButton: "Cancel",
            confirmButton: "Confirm",
            open: true,
          };
          if (typeof options === "object") {
            Object.assign(data, options);
            const { color, confirmButton } = options;
            if (color) {
              data.color = color;
            }
            if (confirmButton) {
              data.confirmButton = confirmButton;
            }
          } else {
            data.body = options;
          }
          if (instance) {
            Object.assign(instance, data);
          } else {
            const container = document.createElement("confirm");
            document.body.appendChild(container);
            instance = Vue.createApp({
              data() {
                return data;
              },
              ..._this,
            }).mount(container);
          }
        },
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.v-confirm {
  .v-dialog {
    .v-dialog-main {
      padding: 20px 15px;
      background-color: #fff;
    }
  }
}
</style>