export default {
  data() {
    return { active: false, show: false };
  },
  methods: {
    action(item) {
      this.show = false;
      if (item.action) {
        item.action(item);
      } else if (item.path) {
        this.$router.push(item.path);
      }
    },
    mouseenter() {
      clearTimeout(this.timeId);
      this.active = true;
      this.show = true;
    },
    mouseleave() {
      clearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        this.show = false;
      }, 200);
    },
  },
  mounted() {
    const { parentNode } = this.$el;
    parentNode.addEventListener("mouseenter", this.mouseenter);
    parentNode.addEventListener("mouseleave", this.mouseleave);
  },
  watch: {
    active(vlaue) {
      if (vlaue === false) return;
      setTimeout(() => {
        this.$el.addEventListener("mouseenter", this.mouseenter);
        this.$el.addEventListener("mouseleave", this.mouseleave);
      }, 0);
    },
  },
}