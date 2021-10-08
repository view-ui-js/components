<template>
  <div class="col flex-auto v-table">
    <table class="v-table-head">
      <thead>
        <tr>
          <template v-for="(item, key) of columns">
            <th
              v-if="item.sort"
              :key="key"
              class="sort"
              :class="{ [orderType]: item.sort === orderField}"
              :style="{ width: item.width }"
              @click="order(item.sort)"
            >
              {{item.name}}
              <i class="vicon" />
            </th>
            <th v-else :key="key" :style="{ width: item.width }">{{item.name}}</th>
          </template>
        </tr>
      </thead>
    </table>
    <Loading :status="loading">
      <table class="v-table-tbody">
        <tbody>
          <slot v-for="(item, index) in data" :item="item" :index="index"></slot>
        </tbody>
      </table>
    </Loading>
  </div>
</template>

<script>
import Loading from "./Loading.vue";
export default {
  name: "Table",
  components: { Loading },
  props: {
    data: Array,
    loading: String,
    sort: String
  },
  data() {
    return {
      columns: [],
      orderField: this.sort, // 排序字段
      orderType: "desc" // 排序方向
    };
  },
  methods: {
    /**
     * 排序，仅适用于单字段排序，不支持多级排序
     */
    order(field) {
      this.orderField = field;
      if (this.orderType === "desc") {
        this.orderType = "asc";
      } else if (this.orderType === "asc") {
        this.orderType = "desc";
      }
      this.$emit("order", {
        field,
        type: this.orderType
      });
    }
  },
  mounted() {
    const columns = [];
    const [{ children }] = this.$scopedSlots.default({ item: {} });
    for (const item of children) {
      const { attrs, staticStyle } = item.data;
      const { name, sort } = attrs;
      let width = "auto";
      if (staticStyle && staticStyle.width) {
        width = staticStyle.width;
      }
      columns.push({ name, sort, width });
    }
    this.columns = columns;
  },
  install(app) {
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
.v-table {
  // 基础样式
  table {
    width: 100%;
    position: relative;
    border-collapse: collapse;
    color: #666;
    user-select: none;
    thead {
      border-bottom: 1px solid #eee;
      tr {
        th {
          font-size: 14px;
          text-align: left;
          color: #888;
        }
      }
    }

    tbody {
      tr {
        border-bottom: 1px dashed #e6e6e6;
        td {
          font-size: 13px;
        }
      }
    }

    tr {
      height: 50px;
      th,
      td {
        padding-left: 15px;
      }
    }
  }

  .v-table-head {
    position: sticky;
    top: 0;
    z-index: 5;
    background-color: #f8f8f8;
    thead {
      tr {
        th {
          &.sort {
            cursor: pointer;
            &:hover {
              color: var(--vc-active);
            }
            .vicon:after {
              content: "\e66b";
            }
          }

          &.asc {
            color: var(--vc-active);
            .vicon:after {
              content: "\e71c";
            }
          }

          &.desc {
            color: var(--vc-active);
            .vicon:after {
              content: "\eb28";
            }
          }
        }
      }
    }
  }

  .v-table-tbody {
    tbody {
      tr {
        &:hover {
          transform: translate3d(0, 0, 0);
          box-shadow: 0px 0px 15px #e2e2e2;
          background-color: #fefefe;
        }

        &.active-item {
          background-color: #ebfbe6;
        }

        &.disable {
          background-color: #ffffdf;
        }
      }
      tr.select {
        background-color: #ffffff !important;
      }
    }
  }
}
</style>