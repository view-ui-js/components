import "./style.scss";
import Bubble from "../Bubble.vue";

export default {
  components: { Bubble },
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Array,
      default() {
        return [0, 0];
      }
    },
    step: {
      type: Number,
      default: 5
    },
    unit: {
      type: String,
      default: ""
    },
    bubble: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return { scope: this.value, ruler: [] };
  },
  updated() {
    if (this.$refs.bubble) {
      this.$refs.bubble.initView();
    }
  }
};