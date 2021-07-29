<template>
  <DialogPage :title="Title" :icon="Icon" @close="$emit('close')">
    <slot />
    <template #sidebar>
      <Button fab v-for="(item, key) in Actions" :key="key" @click="item.click">
        <i :class="item.icon" />
        <Tip>{{item.name}}</Tip>
      </Button>
    </template>
  </DialogPage>
</template>

<script>
import DialogPage from "./DialogPage.vue";
export default {
  name: "FormPage",
  components: { DialogPage },
  props: {
    name: String,
    modes: {
      type: Object
    },
    current: {
      type: String
    },
    actions: {
      type: Array
    },
    edit: {
      type: Boolean,
      default: false
    },
    icon: String
  },
  data() {
    if (this.modes) {
      return this.initMode(this.current);
    } else if (this.actions) {
      return {
        Edit: this.edit,
        Title: this.title,
        Actions: this.actions,
        Icon: this.icon
      };
    }
  },
  methods: {
    initMode(current) {
      const mode = this.modes[current];
      if (!mode) {
        throw new Error(`${current}模式不存在`);
      }
      const { edit, title, name, icon, actions } = mode;
      return {
        Edit: edit,
        Title: title || `${name}${this.name}`,
        Icon: icon || this.icon,
        Actions: actions
      };
    },
    /**
     * 遍历Form组件（子组件只能是Form组件，通过调用Form组件的setEdit()，可批量改变表单控件状态）
     */
    traversal() {
      const { Edit } = this;
      this.$nextTick(function() {
        const slotsDefault = this.$slots.default;
        for (const item of slotsDefault) {
          const { componentInstance } = item;
          if (componentInstance) {
            componentInstance.setEdit && componentInstance.setEdit(Edit);
          }
        }
      });
    }
  },
  mounted() {
    this.traversal();
  },
  watch: {
    current(value) {
      const data = this.initMode(value);
      Object.assign(this, data);
      this.traversal();
    }
  },
  install(app) {
    app.component(this.name, this);
  }
};
</script>