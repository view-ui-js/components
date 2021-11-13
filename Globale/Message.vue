<template>
  <ListTransition class="v-message-box" v-show="show">
    <div
      class="v-message-padding"
      v-for="component of components"
      :key="component.id"
    >
      <component :is="component" />
    </div>
  </ListTransition>
</template>

<script>
import { markRaw } from "vue";
import Adaptor from "../Adaptor.js";
import ListTransition from "../ListTransition.vue";
// import EventMask from "./EventMask.vue";

const Container = document.createElement("section");

// Container.addEventListener("click", () => {
//   Container.style.display = "none";
// });

Container.id = "v-message-container";

document.body.appendChild(Container);

export default {
  instance: undefined,
  id: 0,
  components: { ListTransition },
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
#v-message-container {
  position: fixed;
  z-index: 100000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  transition: all 0.25s;
  pointer-events: none;
}
</style>

<style lang="scss" scoped>
.v-message-box {
  padding-top: 6px;
  position: relative;
  width: 100%;
  .v-message-padding {
    padding: 6px;
    width: 100%;
  }
}
@media screen and (min-width: 425px) {
  .v-message-box {
    width: 425px;
  }
}
</style>
