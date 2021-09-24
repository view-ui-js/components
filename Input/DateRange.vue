<template>
  <div class="v-date-range" @click.stop="click">
    <input
      v-model="input"
      type="text"
      placeholder="开始日期"
      vicon="&#xe628;"
      range
    >
    <input
      v-model="input"
      type="text"
      placeholder="结束日期"
      vicon="&#xe628;"
      range
    >
    <Bubble v-if="open" class="v-date-range-box" placement="bottom">
      <DateRange :value="pickerA" @change="change('A', $event)"></DateRange>
      <DateRange :value="pickerB" @change="change('B', $event)"></DateRange>
    </Bubble>
  </div>
</template>

<script>
import mixing from "./mixingDate.js";
import InputNumber from "./Number.vue";
import Bubble from "../Bubble.vue";
export default {
  extends: mixing,
  components: { InputNumber, Bubble },
  props: {
    value: {
      type: Array,
    },
  },
  data() {
    let [start, end] = this.value;

    if (start) {
      start = this.dateParser(start);
    } else {
      // start不存在时用当前时间填充，不标亮日
      const [y, m] = this.getYMD(new Date());
      start = [y, m];
    }

    let [y, m] = start;

    if (end) {
      end = this.dateParser(end);
    } else {
      // end不存在时，用start加一个月填充，不标亮日
      end = [y, m + 1];
    }

    let pickerA;
    let pickerB;

    // 判断是否跨月
    if (start[1] === end[1]) {
      // 同月
      pickerA = [start, end];
      pickerB = [
        [y, m + 1],
        [y, m + 1],
      ];
    } else {
      // 跨月
      pickerA = [start, [start[0], start[1], 32]];
      pickerB = [[end[0], end[1], 0], end];
    }

    const input = [this.formatDate(...start), this.formatDate(...end)];
    return {
      input,
      pickerA,
      pickerB,
    };
  },
  methods: {
    change(ID, sets) {
      const length = sets.length;
      if (length === 1) {
        // console.log(sets);
      } else if (length === 2) {
        const [start, end] = sets;
        if (this.comparisonYMD(end, start)) {
          this["picker" + ID] = [start, end];
        } else {
          this["picker" + ID] = [end, start];
        }
        //   if (ID === "A") {
        //     this.pickerB = [];
        //   } else if (ID === "B") {
        //     this.pickerA = [];
        //   }
        this.open = false;
      }
    },
    comparisonYMD(arrA, arrB) {
      for (let key in arrA) {
        const item1 = arrA[key];
        const item2 = arrB[key];
        if (item1 > item2) {
          return true;
        } else if (item1 < item2) {
          return false;
        }
      }
    },
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
.v-date-range {
  position: relative;
  height: 38px;
  .v-date:nth-child(1) {
    border-right: 1px solid #ebeef5;
  }
}
</style>