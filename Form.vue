<template>
  <div class="vi-form">
    <div class="vi-form-header">
      <h4 v-if="name">
        {{ name }}
        <span v-if="status === true" class="remark">{{ remark }}</span>
      </h4>
    </div>
    <div class="vi-form-main">
      <slot></slot>
    </div>
    <div v-if="confirm" class="vi-form-footer">
      <!-- <Button @click="close">取消</Button> -->
      <Button color="success" @click="$emit('confirm')">确认</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Form",
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
    const { confirm } = this._events;
    return {
      confirm,
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
      for (const item of this.$children) {
        item.edit = status;
      }
    },
  },
  mounted() {
    this.setEdit(true);
  },
  install(Vue) {
    Vue.component(this.name, this);
  },
};
</script>

<style lang="scss">
.vi-form {
  position: relative;
  padding-bottom: 10px;
  &:hover {
    background-color: #fbfbfb;
  }
  .vi-form-header {
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
  .vi-form-main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0px 20px;
  }
  .vi-form-footer {
    padding: 8px 20px;
    text-align: right;
    box-sizing: border-box;
  }
}
</style>