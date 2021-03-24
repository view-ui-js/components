<template>
  <div class="vi-tab">
    <div class="vi-tab-header">
      <ul>
        <li
          v-for="(name,key) in tabsData"
          :key="key"
          @click="tabKey=key"
          :class="{'active':key===tabKey}"
        >{{name}}</li>
      </ul>
    </div>
    <div class="vi-tab-body" v-for="(name,key) in tabsData" :key="name" v-show="key===tabKey">
      <slot :name="key"></slot>
    </div>
  </div>
</template>

<script>
import theme from "./theme.js";
export default {
  name: "Tabs",
  props: {
    tabs: {
      type: Object
    }
  },
  data() {
    let tabsData = {};
    if (this.tabs) {
      tabsData = this.tabs;
    } else {
      const keys = Object.keys(this.$slots);
      for (const name of keys) {
        tabsData[name] = name;
      }
    }
    return {
      tabsData,
      tabKey: Object.keys(tabsData)[0]
    };
  },
  style({ main }) {
    return `
      .vi-tab-header li:hover {
          color: ${main.background};
      }
      .vi-tab-header li.active {
          color: ${main.background};
          border-bottom: 2px solid ${main.background};
      }
    `;
  },
  install(app) {
    app.component(this.name, this);
    theme.style(this.style);
  }
};
</script>

<style lang="scss">
.vi-tab {
  .vi-tab-header {
    z-index: 1;
    user-select: none;
    box-shadow: 1px 2px 2px #f3f3f3;
    ul {
      height: 45px;
      padding: 0 5px;
      li {
        height: 45px;
        float: left;
        padding: 10px 5px;
        margin: 0 10px;
        list-style: none;
        cursor: pointer;
      }
    }
  }
  .vi-tab-body {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>