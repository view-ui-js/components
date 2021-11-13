// import "./style.scss";

export default {
   data() {
      return { open: false };
   },
   methods: {
      click(events) {
         if (this.open === false) {
            this.open = true;
            document.body.addEventListener("click", e => (this.open = false), {
               once: true
            });
         }
      },
      /**
       * 从字符串中提取YMD
       * @param {string} originDate 
       */
      dateParser(originDate = '') {
         const ymd = originDate.match(/(\d{4})\D(\d{1,2})\D(\d{1,2})/);
         if (ymd) {
            const [, y, m, d] = ymd;
            return [Number(y), Number(m), Number(d)];
         } else {
            return [];
         }
      },
      /**
       * 生成中文日期格式字符串
       * @param {*} year 
       * @param {*} month 
       * @param {*} date 
       */
      formatDate(year, month, date) {
         if (month < 10) month = "0" + month;
         if (date < 10) date = "0" + date;
         return `${year}年${month}月${date}`;
      },
      /**
       * 获取Date实例的YMD
       * @param {*} date 
       */
      getYMD(date) {
         const year = date.getFullYear();
         const month = date.getMonth();
         const day = date.getDate();
         return [year, month + 1, day];
      },
      /**
       * 通过YMD新建Date实例
       * @param {*} y 
       * @param {*} m 
       * @param {*} d 
       */
      nweDate(y, m = 0, d = 1) {
         return new Date(y, m - 1, d);
      },
      comparisonYMD(arrA, arrB) {
         for (const key in arrA) {
            const item1 = arrA[key]
            const item2 = arrB[key]
            if (item1 > item2) {
               return true
            } else if (item1 < item2) {
               return false
            }
         }
      }
   }
};