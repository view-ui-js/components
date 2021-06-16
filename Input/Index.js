import "./common.scss";
import Text from "./Text.vue";
import Date from "./Date.vue";
import DateRange from "./DateRange.vue";
import Number from "./Number.vue";
import NumberRange from "./NumberRange.vue";
import { h } from 'vue';

export default {
  name: "Input",
  props: {
    type: {
      type: String,
      default: "text",
    },
    range: Boolean,
  },
  render() {
    const { $props } = this;
    const { type, range } = $props;
    let Component;
    if (type === 'text') {
      Component = Text;
    } else if (type === 'date') {
      if (range) {
        Component = DateRange;
      } else {
        Component = Date;
      }
    } else if (type === 'number') {
      if (range) {
        Component = NumberRange;
      } else {
        Component = Number;
      }
    } else {
      Component = Text;
    }
    const { data, children } = this;
    return h(Component, data, children);
  },
  install(app) {
    app.component("Input", this);
  }
};
