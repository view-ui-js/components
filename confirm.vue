<template>
  <Dialog v-show="open" class="v-confirm" @close="onClose">
    <template v-slot:header
      ><i class="vicon-bangzhu-plus-copy" />{{ title }}</template
    >
    {{ body }}
    <template v-slot:footer>
      <Button @click="onClose">{{ cancelButton }}</Button>
      <Button :color="color" @click="onConfirm">{{ confirmButton }}</Button>
    </template>
  </Dialog>
</template>

<script>
import * as Vue from "vue";
import Dialog from "./Dialog.vue";
import Button from "./Button.vue";
export default {
  instance: undefined,
  components: { Dialog, Button },
  methods: {
    onConfirm() {
      if (this.confirm) {
        this.confirm(this);
      }
      this.open = false;
    },
    onClose() {
      if (this.close) {
        this.close();
      }
      this.open = false;
    },
  },
  open(options) {
    const data = {
      title: "Tips",
      color: "success",
      cancelButton: "Cancel",
      confirmButton: "Confirm",
      open: true,
    };
    if (typeof options === "object") {
      Object.assign(data, options);
    } else {
      data.body = options;
    }
    if (this.instance) {
      Object.assign(this.instance, data);
    } else {
      const container = document.createElement("confirm");
      document.body.appendChild(container);
      this.instance = Vue.createApp({
        data() {
          return data;
        },
        ...this,
      }).mount(container);
    }
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