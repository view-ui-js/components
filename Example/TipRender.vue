<script>
export default {
  name: "Tip",
  props: ["content", "tag"],
  data() {
    return {
      status: false,
      style: {}
    };
  },
  render(h) {
    let tip;
    if (this.status) {
      let content = this.content || this.$slots.content;
      tip = h("div", { class: "tip", style: this.style }, content);
      tip = h("transition", { props: { name: "fade" } }, [tip]);
    }
    return h(
      this.tag || "div",
      {
        class: "v-tip",
        on: {
          pointerenter: this.pointerenter,
          mouseleave: this.mouseleave
        }
      },
      [this.$slots.default, tip]
    );
  },
  methods: {
    pointerenter(event) {
      const target = event.target;
      const left = target.getBoundingClientRect().left;
      const top = target.getBoundingClientRect().top;
      const width = target.clientWidth;
      this.style = {
        top: top + "px",
        left: left + width + 6 + "px"
      };
      this.status = true;
    },
    mouseleave() {
      this.status = false;
    }
  },
  install(app){
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
.v-tip {
  display: inline-block;
  .tip {
    position: fixed;
    z-index: 100;
    border-radius: 2px;
    background-color: #4fc08d;
    padding: 5px 10px;
    margin-top: 10px;
    font-size: 12px;
    color: #fff;
    min-width: 50px;
    max-width: 200px;
    transition: opacity 0.2s ease;
     &:before {
       position: absolute;
       right: 99%;
       top: 25%;
       content: "";
       width: 0;
       height: 0;
       border-top: 6px solid transparent;
       border-bottom: 6px solid transparent;
       border-right: 7px solid #4fc08d;
     }
  }
}
</style>