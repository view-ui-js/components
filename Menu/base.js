import "./base.scss";

export default {
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  data() {
    let key;
    const { items } = this
    for (const k in items) {
      const item = items[k];
      if (item.active) {
        key = k;
        break;
      }
    }
    return { key };
  },
  methods: {
    click(item, key) {
      this.key = key;
      if (item.click) {
        item.click(item);
      }
    }
  }
}