import { h } from 'vue';
import "./common.scss";
import text from "./Text.vue";
import date from "./Date.vue";
import daterange from "./DateRange.vue";
import number from "./Number.vue";
import numberrange from "./NumberRange.vue";
import password from "./Password.vue";
import radio from "./Radio.vue";

const types = {
  text,
  date,
  daterange,
  number,
  numberrange,
  password,
  radio
};

export default {
  name: "Input",
  render() {
    const { type, range } = this.$attrs;
    let Component = types[type];
    if (Component) {
      if (range) {
        Component = types[type + range]
      }
    } else {
      Component = Text;
    }

    // if (type === 'text') {
    //   Component = Text;
    // } else if (type === 'date') {
    //   if (range) {
    //     Component = DateRange;
    //   } else {
    //     Component = Date;
    //   }
    // } else if (type === 'number') {
    //   if (range) {
    //     Component = NumberRange;
    //   } else {
    //     Component = Number;
    //   }
    // }

    return h(Component);
  }
};
