export default {
  name: "-jsx",
  props: ["content", "tag"],
  data() {
    return {
      status: false,
      style: {}
    };
  },
  render() {
    return (
      <div class="vi-tip" onmouseenter={this.mouseenter} onmouseleave={this.mouseleave}>
        5555
      </div>
    );
  },
  methods: {
    mouseenter(event) {
      let target = event.target;
      let left = target.getBoundingClientRect().left;
      let top = target.getBoundingClientRect().top;
      let width = target.clientWidth;
      this.style = {
        top: top + "px",
        left: left + width + 6 + "px"
      };
      this.status = true;
    },
    mouseleave() {
      this.status = false;
    }
  }
};