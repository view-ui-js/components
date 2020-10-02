<template>
  <Dialog v-if="open" class="vi-confirm" @close="Close">
    <template v-slot:header><i class='vicon-bangzhu-plus-copy'></i>提示</template>
    {{body}}
    <template v-slot:footer>
      <Button @click="Close">取消</Button>
      <Button :color="color" @click="Confirm">{{buttonText}}</Button>
    </template>
  </Dialog>
</template>

<script>
export default {
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
    }
  },
  mounted() {
    // 确保element已挂载完成，否则在初次显示时没有过渡动效
    this.open = true;
  },
  install(Vue) {
    const Component = Vue.extend(this);
    let component;
    Vue.mixin({
      methods: {
        $confirm(options) {
          // 单实例组件在每次执行前需要初始化data中的所有参数，否则会因为状态共享而出现混乱
          const data = {
            open: false,
            color: "success",
            buttonText: "确认"
          };
          if (typeof options === "object") {
            Object.assign(data, options);
            const { color, buttonText } = options;
            if (color) {
              data.color = color;
            }
            if (buttonText) {
              data.buttonText = buttonText;
            }
          } else {
            data.body = options;
          }
          // 持久化单例组件，全局共用一个实例。(改为多实例模式只要去掉实例判断即可，也不存在过渡失效问题)
          if (component) {
            data.open = true;
            Object.assign(component, data); // 更新已缓存的组件
          } else {
            // 初次加载时data.open应为false，等待$el挂载后通过mounted方法切换v-show，否则首次出场过渡动效不会执行
            // 此组件通过事件动态挂载，初次加载生命周期有别于路由内嵌组件
            component = new Component({ data }).$mount();
          }
        }
      }
    });
  }
};
</script>

<style lang="scss">
.vi-confirm {
  .vi-dialog {
    .vi-dialog-main {
      padding: 20px 15px;
      background-color: #fff;
    }
  }
}
</style>