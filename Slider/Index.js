// import "./style.scss";
import { h } from 'vue';
import Single from "./Single.vue";
import Range from "./Range.vue";

export default {
  props: {
    range: Boolean,
  },
  render() {
    const { $attrs } = this;
    const { range } = $attrs;
    let Component;
    if (range) {
      Component = Range;
    } else {
      Component = Single;
    }
    return h(Component);
  }
};
