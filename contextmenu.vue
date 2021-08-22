<template>
  <div class="v-contextmenu" v-if="open" :style="style" @mousedown.capture.stop>
    <ul>
      <template v-for="(item, key) of menu">
        <li
          :class="{ disable: item.disable }"
          :key="key"
          @click="!item.disable && click(item)"
        >
          <i v-if="item.icon" :class="item.icon" />
          <span>{{ item.name }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import * as Vue from "vue";
export default {
  instance: undefined,
  data() {
    return {
      context: {},
      menu: [],
      open: true,
      init: true, // 初始状态，用于识别事件来源
      style: {},
    };
  },
  methods: {
    click(item) {
      this.open = false;
      item.action(this.context);
    },
    /**
     * contextmenu 事件
     */
    event(targetEvent) {
      const { clientX, clientY } = targetEvent;

      const menuRect = this.$el.getBoundingClientRect();
      const { innerWidth, innerHeight } = global;

      const style = {};

      // 宽度自适应
      if (clientX + menuRect.width > innerWidth) {
        style.left = innerWidth - menuRect.width + "px"; // 右浮动
      } else {
        style.left = clientX + "px"; // 正常
      }

      // 高度自适应
      if (clientY + menuRect.height > innerHeight) {
        style.top = innerHeight - menuRect.height + "px"; // 下浮动
      } else {
        style.top = clientY + "px"; // 正常
      }

      this.style = style;

      this.open = true;
    },
  },
  open(context, menu) {
    const { instance } = this;
    if (instance === undefined) {
      const container = document.createElement("contextmenu");
      document.body.appendChild(container);
      instance = Vue.createApp(this).mount(container);
    }
    Object.assign(instance, { context, menu });
    document.body.addEventListener(
      "mousedown",
      (ev) => {
        instance.open = false;
      },
      { once: true }
    );
    // document.body.addEventListener("contextmenu", function (event) {
    //   if (instance.init === true) {
    //     instance.init = false;
    //     instance.event(event);
    //   } else {
    //     instance.open = false;
    //   }
    //   event.preventDefault();
    // });
  },
};
</script>

<style lang="scss">
@import "./style/var.scss";
.v-contextmenu {
  position: fixed;
  z-index: 5000;
  color: #999;
  line-height: normal;
  user-select: none;
  border-radius: 8px;
  min-width: 120px;
  background-color: #fff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
  ul {
    // padding: 10px 0px;
    li {
      line-height: 36px;
      font-size: 14px;
      padding: 0 16px;
      cursor: pointer;
      color: #666;
      &:hover {
        background-color: #f0f0f0;
        color: $hover;
      }
      &.disable {
        color: #bbb;
        cursor: not-allowed;
      }
      i {
        font-size: 15px;
        padding-right: 6px;
      }
    }
  }
}
</style>