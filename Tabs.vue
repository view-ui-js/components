<template>
  <div class="v-tab">
    <div class="v-tab-header">
      <ul>
        <li
          v-for="(name, key) in tabsData"
          :key="key"
          @click="tabKey = key"
          :class="{ active: key === tabKey }"
        >
          {{ name }}
        </li>
      </ul>
    </div>
    <div
      class="v-tab-body"
      v-for="(name, key) in tabsData"
      :key="name"
      v-show="key === tabKey"
    >
      <slot :name="key"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    tabs: {
      type: Object,
    },
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
      tabKey: Object.keys(tabsData)[0],
    };
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.v-tab {
  .v-tab-header {
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
    li:hover {
      color: var(--main-background);
    }
    li.active {
      color: var(--main-background);
      border-bottom: 2px solid var(--main-background);
    }
  }
  .v-tab-body {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>