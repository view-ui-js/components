<template>
  <!-- 当页数大于1时才显示分页 -->
  <div class="v-paging" v-if="this.pages > 1">
    <span class="previous" @click="previous">
      <i class="vicon">&#xeb25;</i>
    </span>
    <template v-for="value in list">
      <span :key="value" :class="{ 'vt-main':value === page }" @click="change(value)">{{value}}</span>
    </template>
    <span class="next" @click="next">
      <i class="vicon">&#xeb24;</i>
    </span>
  </div>
</template>

<script>
/**
 * total {Number} 数据总量
 * limit {Number} 单页数量限制
 * current {Number} 当前分页
 */
export default {
  name: "Pagination",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 20,
    },
    current: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      page: 1,
      pages: 0,
      list: [],
    };
  },
  methods: {
    // 上一步，只要page不小于5，就允许回退
    previous() {
      if (this.page > 5) {
        // 起始位置
        const before = this.getStart();
        const after = before - 5;
        this.page = after;
        this.generate(after);
        this.$emit("change", this.page);
      }
    },
    // 选择分页
    change(page) {
      this.page = page;
      this.$emit("change", this.page);
    },
    // 下一步，限制最大值
    next() {
      const before = this.getStart();
      const after = before + 5;
      if (after < this.pages) {
        this.page = after;
        this.generate(after);
        this.$emit("change", this.page);
      }
    },
    // 生成分页
    generate(start) {
      // 末尾特殊处理
      let surplus = this.pages - start;
      surplus = surplus > 4 ? 4 : surplus;
      const end = start + surplus;
      // 生成分页数组
      const list = [];
      for (let i = start; i <= end; i++) {
        list.push(i);
      }
      // 赋值到视图
      this.list = list;
    },
    // 获取当前分页的起始位置
    getStart() {
      return this.page - (this.page % 5 || 5) + 1;
    },
    /**
     * 初始化分页
     */
    initView({ total, limit, current }) {
      this.page = current || this.current; // 当前分页
      this.pages = Math.ceil((total || this.total) / (limit || this.limit)); // 总分页数
      if (this.pages > 1) {
        this.generate(this.getStart());
      }
    },
  },
  watch: {
    total(total) {
      this.initView({
        total,
        current: 1,
      });
    },
    current(current) {
      this.initView({ current });
    },
    limit(limit) {
      this.initView({ limit });
    },
  },
  created() {
    this.initView({});
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
@import "style/var.scss";
.v-paging {
  user-select: none;
  span {
    display: inline-block;
    margin: 0 3px;
    cursor: pointer;
    text-align: center;
    width: 28px;
    height: 28px;
    line-height: 28px;
    border-radius: 3px;
    transition: all 0.2s ease;
    &:hover {
      background-color: #f5f5f5;
    }
  }
  .active {
    color: #fff;
  }
}
</style>