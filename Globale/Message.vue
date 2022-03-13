<template>
  <transition-group name="tg-top">
    <div
      class="v-message-item"
      v-for="component of components"
      :key="component.id"
    >
      <component :is="component" />
    </div>
  </transition-group>
</template>

<script>
import { markRaw } from "vue";
import Adaptor from "../Adaptor.js";

// Container.addEventListener("click", () => {
//   Container.style.display = "none";
// });

export default {
  instance: undefined,
  id: 0,
  data() {
    return {
      show: false,
      components: [],
    };
  },
  methods: {
    close(id) {
      const { components } = this;
      for (const index in components) {
        const component = components[index];
        if (component.id === id) {
          components.splice(index, 1);
        }
      }
    },
  },
  add(component) {
    if (this.instance === undefined) {
      const Container = document.createElement("section");
      Container.id = "v-message-layer";
      document.body.appendChild(Container);
      this.instance = Adaptor.Component(this, Container);
    }

    const id = this.id++;

    component.id = id;

    this.instance.components.unshift(markRaw(component));

    const { time } = component;

    if (time) {
      setTimeout(() => {
        this.instance.close(id);
      }, time);
    }

    this.instance.show = true;

    return id;
  },
  close(id) {
    this.instance.close(id);
  },
};
</script>

<style lang="scss">
#v-message-layer {
  position: fixed;
  z-index: 1000000;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding-top: 5px;
}
@media screen and (min-width: 390px) {
  #v-message-layer {
    width: 390px;
  }
}
</style>

<style lang="scss" scoped>
.v-message-item {
  padding: 6px;
  width: 100%;
  transition: all 0.4s;
}
</style>
