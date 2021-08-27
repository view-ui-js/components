<template>
  <div
    v-show="show"
    class="v-contextmenu"
    :style="style"
    @mousedown.capture.stop
  >
    <ul>
      <li
        v-for="(item, key) of menu"
        :key="key"
        :class="{ disable: item.disable }"
        @click="!item.disable && click(item)"
      >
        <i v-if="item.icon" :class="item.icon" />
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Adaptor from "./Adaptor.js";
let instance, active;
document.body.addEventListener("contextmenu", (e) => {
  if (active === true) {
    instance.show = true;
    instance.$nextTick(() => {
      instance.position(e);
    });
  } else if (instance) {
    instance.show = false;
  }
  active = false;
  e.preventDefault();
});
export default {
  data() {
    return {
      menu: [],
      show: true,
      style: {},
    };
  },
  methods: {
    click(item) {
      this.show = false;
      item.action(item);
    },
    /**
     * contextmenu 事件
     */
    position(e) {
      const { clientX, clientY } = e;

      let { innerWidth, innerHeight } = window;
      const style = {};
      const { $el } = this;

      innerWidth = innerWidth - 6;
      innerHeight = innerHeight - 6;

      // 横向自适应
      if (clientX + $el.clientWidth > innerWidth) {
        style.left = innerWidth - $el.clientWidth + "px"; // 右浮动
      } else {
        style.left = clientX + "px"; // 正常
      }

      // 纵向自适应
      if (clientY + $el.clientHeight > innerHeight) {
        style.top = clientY - $el.clientHeight + "px"; // 下浮动
      } else {
        style.top = clientY + "px"; // 正常
      }

      this.style = style;
    },
  },
  open(menu) {
    active = true;
    if (instance === undefined) {
      instance = Adaptor.Component(this);
    }
    Object.assign(instance, { menu });
    document.body.addEventListener(
      "mousedown",
      (e) => {
        instance.show = false;
      },
      { once: true }
    );
  },
};
</script>

<style lang="scss">
.v-contextmenu {
  position: fixed;
  z-index: 1000000;
  color: #999;
  line-height: normal;
  user-select: none;
  border-radius: 6px;
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
        color: var(--hover);
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