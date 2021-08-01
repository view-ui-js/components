<template>
  <nav class="v-navbar">
    <div class="v-navbar-main vt-main">
      <slot name="top"></slot>
      <nav class="v-nav-menu-scroll">
        <template v-for="(value, path) in menu">
          <router-link
            :to="`/${path}`"
            :key="path"
            class="v-nav-menu-item vt-link-active vt-hover"
          >
            <i :class="value.icon" />
            <Tip>{{ value.name }}</Tip>
          </router-link>
        </template>
      </nav>
      <slot name="bottom"></slot>
    </div>
    <aside v-if="children" class="v-navbar-children vt-sub">
      <h3 v-if="current" class="title">
        <i :class="current.icon" />
        {{ current.name }}
        <span v-if="childrenName" class="childrenName">
          / {{ childrenName }}</span
        >
      </h3>
      <div class="v-navbar-children-main">
        <router-link
          class="vt-link-active2"
          v-for="(value, cpath) in children"
          :to="`/${prefix}/${cpath}`"
          :key="cpath"
        >
          <i v-if="value.icon" :class="value.icon" />
          <span>{{ value.name }}</span>
        </router-link>
      </div>
    </aside>
    <slot />
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    menu: Object,
  },
  data() {
    const { path } = this.$router.currentRoute;
    return this.setData(path);
  },
  methods: {
    setData(path) {
      const [, prefix, cpath] = path.split("/");
      const { menu } = this;
      const current = menu[prefix];

      const data = {
        prefix,
        current,
        children: null,
        childrenName: "",
      };

      if (current) {
        if (current.children) {
          data.children = current.children;
          if (cpath) {
            const currentChildren = current.children[cpath];
            data.childrenName = currentChildren && currentChildren.name;
          }
        }
      }

      return data;
    },
  },
  watch: {
    $route(currentRoute) {
      const data = this.setData(currentRoute.path);
      Object.assign(this, data);
    },
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.v-navbar {
  display: flex;
  height: 100%;
  flex: none;
  .v-navbar-main {
    // -webkit-app-region: drag; // electron 拖拽专用
    width: 50px;
    user-select: none;
    position: relative;
    z-index: 10000;
    .v-nav-menu-scroll {
      .v-nav-menu-item {
        height: 50px;
        position: relative;
        display: block;
        color: #ffffff;
        text-align: center;
        padding: 14px 0;
        i {
          font-size: 18px;
        }
      }
      .router-link-active {
        border-radius: 3px 0 0 3px;
        .v-menu {
          display: block;
        }
      }
      .router-link-active + a {
        border-radius: 0 0 3px 0;
      }
    }
  }
  .v-navbar-children {
    flex: none;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1000;
    width: 170px;
    h3 {
      flex: none;
      font-size: 16px;
      padding-left: 15px;
      height: 52px;
      line-height: 52px;
      color: #999999;
      white-space: nowrap;
      i {
        font-weight: normal;
      }
      .childrenName {
        font-size: 14px;
      }
    }
    .v-navbar-children-main {
      height: 100%;
      padding-bottom: 20px;
      overflow-y: overlay;
      margin-left: 10px;
      a {
        display: block;
        padding: 12px 0 12px 15px;
        font-size: 14px;
        text-align: initial;
        // margin-left: 8px;
        // border-radius: 3px 0 0 3px;
        i {
          margin-right: 8px;
          font-size: 18px;
        }
      }
      a.router-link-active {
        border-radius: 3px 0 0 3px;
      }
    }
  }
}
</style>
