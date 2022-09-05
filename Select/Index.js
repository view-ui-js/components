import "./style.scss";
import { h } from 'vue';
import Select from "./Select.vue";
import Selects from "./Selects.vue";
import SelectEdit from "./SelectEdit.vue";
import Option from "./Option.vue";

export default {
  name: "Select",
  render() {
    const { edit, multiple } = this.$attrs;
    if (edit === true) {
      return h(SelectEdit);
    } else {
      return h(Select, this.$attrs, this.$slots);
    }
  },
  Option,
};
