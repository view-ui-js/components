<template>
   <div class="vi-date" @click.stop>
      <div class="vi-date-show">
         <i class="vicon" @click="switchMonth(-1)">&#xeb2a;</i>
         <span>{{year}} 年 {{month}} 月</span>
         <i class="vicon" @click="switchMonth(1)">&#xe6b7;</i>
      </div>
      <div class="vi-date-week">
         <span>一</span>
         <span>二</span>
         <span>三</span>
         <span>四</span>
         <span>五</span>
         <span>六</span>
         <span>日</span>
      </div>
      <div class="vi-date-days" @click="selectDate" @mouseover="mouseover">
         <ul class="vi-date-line" v-for="(date,key) of dates" :key="key">
            <li v-for="(item,key) of date" :key="key" :class="item.class">
               <span>{{item.date}}</span>
            </li>
         </ul>
      </div>
   </div>
</template>

<script>
export default {
  name: "DateRange",
  props: {
    value: {
      type: Array
    }
  },
  beforeCreate() {
    this.sets = [];
    this.setsString = [];
  },
  data() {
    return {
      date: this.value,
      dates: {},
      year: "",
      month: ""
    };
  },
  methods: {
    getYMD(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      return [year, month + 1, day];
    },
    nweDate(y, m = 0, d = 1) {
      return new Date(y, m - 1, d);
    },
    generate(year, month, day) {
      const nowDate = new Date();

      const [nowYear, nowMonth, nowDay] = this.getYMD(nowDate);

      // 没有指定日期，使用当前日期填充
      if (!year) {
        year = nowYear;
        month = nowMonth;
        day = nowDay;
        this.$emit("change", [year, month, day]);
      }

      this.year = year;

      this.month = month;

      // 开始时间（本月初）
      const startDate = this.nweDate(year, month);

      // 本月初星期, 将0~6周日至周六，转为1~7周一至周日
      const startDay = startDate.getDay() || 7;

      // 切换到上月截止时间
      startDate.setMilliseconds(-1);

      // 上个月截止日（上月天数）
      const lastEndDate = startDate.getDate();

      //  上个月填充日期
      let prevMonth = 6;
      if (startDay !== 1) {
        prevMonth = startDay - 2;
      }

      const dates = [];

      for (let i = lastEndDate - prevMonth; i <= lastEndDate; i++) {
        dates.push({
          date: i,
          class: "vi-date-prev-month"
        });
      }

      // 下个月初
      const endDate = this.nweDate(year, month + 1);

      // 切换到本月截止时间（减1毫秒）
      endDate.setMilliseconds(-1);

      // 本月截止日（本月天数）
      const nextEndDate = endDate.getDate();

      const ymString = `${year}-${month}-`;
      const ymNowString = `${nowYear}-${nowMonth}-`;

      const [start] = this.sets;
      const ymStartString = `${start[0]}-${start[1]}-`;

      // 本月日期
      for (let i = 1; i <= nextEndDate; i++) {
        const data = { date: i };

        // 点亮当日
        if (i === nowDay) {
          if (ymString === ymNowString) {
            data.class = "vi-date-select";
          }
        }

        // 点亮选区、选中日
        if (ymString === ymStartString) {
          if (i > this.startDay && i < this.endDay) {
            data.class = "vi-date-background";
          } else if (i === this.startDay) {
            data.class = "vi-date-prominent vi-date-start";
          } else if (i === this.endDay) {
            data.class = "vi-date-prominent vi-date-end";
          }
        }

        dates.push(data);
      }

      //  下个月填充日期
      const nextMonth = 42 - dates.length;
      if (nextMonth) {
        for (let i = 1; i <= nextMonth; i++) {
          dates.push({
            date: i,
            class: "vi-date-next-month"
          });
        }
      }

      // 分组显示
      const datesGroup = [];
      for (let i = 0; i < dates.length; i += 7) {
        const item = dates.slice(i, i + 7);
        datesGroup.push(item);
      }

      this.dates = datesGroup;
    },
    /**
     * 切换月份
     */
    switchMonth(value) {
      // 新建持久化monthDate，保持月份状态不丢失
      if (!this.monthDate) {
        this.monthDate = this.nweDate(this.year, this.month);
      }
      const month = this.monthDate.getMonth();
      this.monthDate.setMonth(month + value);
      const y_m_d = this.getYMD(this.monthDate);
      this.generate(...y_m_d);
    },
    /**
     * 保存输入、输出日期
     */
    setCurrent(year, month, day) {
      if (this.sets.length >= 2) {
        this.sets = [];
        this.setsString = [];
      }
      this.sets.push([year, month, day]);
      this.setsString.push([year, month, day].join("-"));
    },
    /**
     * 事件元素过滤器
     */
    eventFilter(ev) {
      let className;
      let { localName, innerText } = ev.target;
      if (localName === "span") {
        className = ev.target.parentNode.className;
      } else if (localName === "li") {
        className = ev.target.className;
      } else {
        return;
      }
      innerText = Number(innerText)
      return { className, innerText };
    },
    /**
     * 选择日期
     */
    selectDate(ev) {
      const el = this.eventFilter(ev);
      if (el) {
        const { className, innerText } = el;
        // 跨月份切换
        if (className === "vi-date-prev-month") {
          this.month -= 1;
        } else if (className === "vi-date-next-month") {
          this.month += 1;
        }
        const currentDate = this.nweDate(this.year, this.month, innerText);
        const ymd = this.getYMD(currentDate);

        this.setCurrent(...ymd);
        this.generate(...ymd);
        this.$emit("change", this.sets);
        // 更新monthDate，确保在选择月份时不改变原currentDate
        this.monthDate = new Date(currentDate);
        this.mouseover(ev);
      }
    },
    /**
     * 移动鼠标选取范围（事件代理）
     */
    mouseover(ev) {
      const el = this.eventFilter(ev);
      if (!el) return;

      const { className, innerText } = el;

      // 只有在单点状态下才需要新建选区
      if (this.sets.length === 1) {
        let [[year, month, day]] = this.sets;

        // 通过className来区分不同的选区
        if (className === "vi-date-prev-month") {
          this.startDay = 0;
          this.endDay = day;
        } else if (className === "vi-date-next-month") {
          this.startDay = day;
          this.endDay = 32;
        } else if (innerText > day) {
          this.startDay = day;
          this.endDay = innerText;
        } else if (innerText < day) {
          this.startDay = innerText;
          this.endDay = day;
        } else {
          this.startDay = innerText;
          this.endDay = innerText;
        }

        this.updateView(this.startDay, this.endDay);
      }
    },
    /**
     * 更新视图状态
     */
    updateView(startDay, endDay) {
      for (const row of this.dates) {
        for (const item of row) {
          if (item.class === "vi-date-prev-month") {
          } else if (item.class === "vi-date-next-month") {
          } else {
            if (item.date > startDay && item.date < endDay) {
              this.$set(item, "class", "vi-date-background");
            } else if (item.date === startDay) {
              this.$set(item, "class", "vi-date-prominent vi-date-start");
            } else if (item.date === endDay) {
              this.$set(item, "class", "vi-date-prominent vi-date-end");
            } else {
              this.$set(item, "class", "");
            }
          }
        }
      }
    }
  },
  created() {
    const [start, end] = this.date;
    this.startDay = start[2];
    this.endDay = end[2];
    this.setCurrent(...start);
    this.setCurrent(...end);
    this.generate(...start);
  },
  install(Vue){
    Vue.component(this.name, this);
  }
};
</script>

<style lang="scss">
@import "../style/var.scss";
.vi-date-range {
  .vi-date-background {
    background-color: #ebfff6;
  }
  .vi-date-start {
    background-color: #ebfff6;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
  }
  .vi-date-end {
    background-color: #ebfff6;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
  }
}
</style>