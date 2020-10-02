import "./common.scss";
import Text from "./Text.vue";
import Date from "./Date.vue";
import DateRange from "./DateRange.vue";
import Number from "./Number.vue";
import NumberRange from "./NumberRange.vue";

export default {
  name: "Input",
  functional: true,
  props: {
    type: {
      type: String,
      default: "text",
    },
    range: Boolean,
  },
  render(createElement, context) {
    const { props, data, children } = context;
    const { type, range } = props;
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
    return createElement(Component, data, children);
  },
  install(Vue) {
    Vue.component("Input", this);
  }
};
