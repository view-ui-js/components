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
    <div class="vi-date-days" @click="selectDate">
      <ul class="vi-date-line" v-for="(date, key) of dates" :key="key">
        <li v-for="(item,key) of date" :key="key" :class="item.class">
          <span>{{item.date}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "./style.scss";
import theme from "../theme.js";
export default {
  name: "Date",
  props: {
    value: Array
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

      // 本月日期
      for (let i = 1; i <= nextEndDate; i++) {
        const data = { date: i };

        // 突显当日
        if (i === nowDay) {
          if (year === nowYear && month === nowMonth) {
            data.class = "vi-date-select";
          }
        }

        // 突出选中项
        if (i === this.setDay) {
          if (year === this.setYear && month === this.setMonth) {
            data.class = "vi-date-prominent";
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

      // 分段显示
      const groupDates = [];
      for (let i = 0; i < dates.length; i += 7) {
        const item = dates.slice(i, i + 7);
        groupDates.push(item);
      }

      this.dates = groupDates;
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
     * 选择日期
     */
    selectDate(ev) {
      const { className, localName, innerText } = ev.target;
      if (localName === "span") {
        // 跨月份切换
        if (className === "vi-date-prev-month") {
          this.month -= 1;
        } else if (className === "vi-date-next-month") {
          this.month += 1;
        }
        this.currentDate = this.nweDate(this.year, this.month, innerText);
        // 同步更新monthDate，确保在选择月份时不改变原currentDate
        this.monthDate = new Date(this.currentDate);
        const ymd = this.getYMD(this.currentDate);
        this.setCurrent(...ymd);
        this.generate(...ymd);
        this.$emit("change", ymd);
      }
    },
    /**
     * 保存输入、输出日期
     */
    setCurrent(year, month, day) {
      this.setYear = year;
      this.setMonth = month;
      this.setDay = day;
    }
  },
  created() {
    this.setCurrent(...this.date);
    this.generate(...this.date);
  },
  style({ main }) {
    return `
      .vi-date-show .vicon:hover {
          color: ${main.background};
      }
      .vi-date-days li:hover, .vi-date-days li.vi-date-select {
          color: ${main.background};
      }
      .vi-date-days .vi-date-prominent span {
          background-color: ${main.background};
      }
    `;
  },
  install(app) {
    app.component(this.name, this);
    theme.style(this.style);
  }
};
</script>
