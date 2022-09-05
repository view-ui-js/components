<script>
import Dialog from "./Dialog.vue";
import Button from "./Button.vue";
import Adaptor from "./Adaptor.js";
export default {
  name: "confirm",
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
      const el = document.createElement("section");
      document.body.appendChild(el);
      this.instance = Adaptor.Component(
        {
          data() {
            return data;
          },
          ...this,
        },
        el
      );
    }
  },
};
</script>

<template>
  <Dialog v-show="open" class="v-confirm" @close="onClose">
    <template v-slot:header>{{ title }}</template>
    {{ body }}
    <template v-slot:footer>
      <Button @click="onClose">{{ cancelButton }}</Button>
      <Button :color="color" @click="onConfirm">{{ confirmButton }}</Button>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.v-confirm {
  :deep(.v-dialog) {
    .v-dialog-main {
      padding: 8px 15px 0px 15px;
      background-color: #fff;
    }
  }
}
</style>
