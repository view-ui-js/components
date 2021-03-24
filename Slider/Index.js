// import "./style.scss";

import Single from "./Single.vue";
import Range from "./Range.vue";
import theme from "../theme.js";

export default {
  functional: true,
  props: {
    range: Boolean,
  },
  render(createElement, context) {
    const { props, data, children } = context;
    const { range } = props;
    let Component;
    if (range) {
      Component = Range;
    } else {
      Component = Single;
    }
    return createElement(Component, data, children);
  },
  install(app) {
    theme.style(Single.style);
    theme.style(Range.style);
    app.component("Slider", this);
  }
};
