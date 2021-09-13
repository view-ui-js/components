<template>
  <Dropdown :name="activeName">
    <div class="v-dropdown-range" @click.stop>
      <div class="v-dropdown-range-options">
        <span
          v-for="(item,index) of options"
          :key="index"
          @click="Option(item, item[0]+'-'+item[1] + unit)"
          :class="{'active':item===activeItem}"
        >{{item[0]+'-'+item[1]+unit}}</span>
        <span :class="{'active':activeItem && !activeItem[1]}" @click="More()">{{range[1]+unit}}以上</span>
        <span :class="{'active':!activeItem}" @click="Option()">不限</span>
      </div>
      <div class="v-dropdown-range-customize">
        <span>自定义{{name}} (单位:{{unit}})</span>
        <Button :disable="disable" class="fr" size="small" color="success" @click="Confirm">确定</Button>
      </div>
      <div class="v-dropdown-range-slider">
        <SliderRange
          :min="min"
          :max="max"
          v-model="model"
          :step="step"
          :unit="unit"
          @change="Change"
        ></SliderRange>
      </div>
    </div>
  </Dropdown>
</template>

<script>
export default {
  name: "DropdownRange",
  props: {
    name: {
      type: String,
      default: "默认"
    },
    value: {
      type: Array,
      default() {
        return [0, 100];
      }
    },
    step: {
      type: Number
    },
    unit: {
      type: String,
      default: ""
    },
    options: {
      type: Array
    }
  },
  data() {
    const [minArray] = this.options;
    const maxArray = this.options[this.options.length - 1];
    return {
      min: minArray[0],
      max: maxArray[1],
      model: this.value,
      activeName: this.name,
      activeItem: undefined,
      range: [this.options[0][0], this.options[this.options.length - 1][1]],
      disable: true
    };
  },
  methods: {
    Option(value, name) {
      if (value) {
        this.$emit("change", value);
        this.model = value;
      } else {
        this.$emit("change", null);
        this.model = this.range;
      }
      this.activeName = name;
      this.activeItem = value;
      this.disable = true;
      document.body.click();
    },
    More() {
      let value = [this.range[1], undefined];
      this.$emit("change", value);
      this.activeName = value[0] + this.unit + "以上";
      this.activeItem = value;
      this.model = this.range;
      document.body.click();
    },
    Confirm() {
      this.$emit("change", this.value);
      this.activeName = this.value[0] + "-" + this.value[1] + this.unit;
      this.activeItem = this.value;
      this.disable = true;
      document.body.click();
    },
    Change(data) {
      if (data[0] !== this.model[0] || data[1] !== this.model[1]) {
        this.disable = false;
        this.$emit("input", data);
      }
    },
    _Reset() {
      this.disable = true;
      this.model = this.range;
      this.activeName = undefined;
      this.activeItem = undefined;
    }
  },
  install(app) {
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
.v-dropdown-range {
  width: 300px;
  padding: 15px 13px;
  font-size: 13px;
  .v-dropdown-range-options {
    display: flex;
    flex-wrap: wrap;
    span {
      padding: 6px;
      display: inline-block;
      margin: 8px 0px;
      cursor: pointer;
      width: 33%;
      &:hover {
        color: var(--v-active);
      }
    }
  }
  .v-dropdown-range-customize {
    margin: 12px 0 12px 0;
    span {
      display: inline-block;
      padding: 6px;
    }
  }
  .v-dropdown-range-slider {
    padding: 0 10px 10px 10px;
  }
}
</style>
