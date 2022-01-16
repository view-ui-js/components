<template>
  <div class="v-form">
    <div class="v-form-header">
      <h4 v-if="name">
        {{ name }}
        <span v-if="status === true" class="remark">{{ remark }}</span>
      </h4>
    </div>
    <div class="v-form-main">
      <slot />
    </div>
    <div v-if="confirm" class="v-form-footer">
      <!-- <Button @click="close">取消</Button> -->
      <Button color="success" @click="$emit('confirm')">确认</Button>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  name: "Form",
  components: { Button },
  props: {
    name: {
      type: String,
    },
    remark: {
      type: String,
    },
    // 强制优先编辑模式
    edit: {
      type: Boolean,
    },
  },
  data() {
    // const { confirm } = this._events;
    return {
      confirm: false,
      status: true,
    };
  },
  methods: {
    /**
     * 遍历表单控件，批量修改状态
     */
    setEdit(status) {
      if (this.edit) status = this.edit;
      this.status = status;
      for (const name in this.$refs) {
        // item.edit = status;
      }
    },
  },
  mounted() {
    this.setEdit(true);
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.v-form {
  position: relative;
  padding-bottom: 10px;
  &:hover {
    background-color: #fbfbfb;
  }
  .v-form-header {
    margin: 0px 28px;
    padding: 12px 0 12px 0;
    h4 {
      position: relative;
      font-size: 15px;
      &:before {
        content: "";
        display: block;
        position: absolute;
        left: -10px;
        top: 5px;
        width: 3px;
        height: 12px;
        background-color: #777;
      }
      .remark {
        font-size: 13px;
        font-weight: normal;
      }
    }
  }
  .v-form-main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0px 10px;
  }
  .v-form-footer {
    padding: 8px 20px;
    text-align: right;
    box-sizing: border-box;
  }
}
</style>