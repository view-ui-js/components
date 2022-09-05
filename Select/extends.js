import FormBox from "../FormBox.vue";

export default {
  components: { FormBox },
  props: {
    value: [String, Number, Boolean],
    label: String,
    placeholder: String,
    ready: Boolean,
  },
  data() {
    return {
      drop: false,
      current: '',
    };
  },
  methods: {
    click() {
      if (this.drop === false) {
        this.drop = true;
        setTimeout(() => {
          window.addEventListener("click", this.close, { once: true });
        }, 0);
      }
    },
    close() {

      this.drop = false;

    },
    select(value) {

      const { FormBox } = this.$refs;

      // console.log(FormBox);

      this.$nextTick(() => {
        // for (const item of FormBox.$children) {
        //   if (item.value === value) {
        //     item.active = true;
        //     this.current = item.label || value;
        //   } else {
        //     item.active = false;
        //   }
        // }
      });

      this.$emit("input", value);

    },
  },
  watch: {
    ready() {
      this.select(this.value);

    }
  },
};