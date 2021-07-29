<template>
  <FormBox v-if="edit" :label="label" :error="error">
    <div class="vi-cascader" @click.stop="click">
      <input autocomplete="off" readonly="readonly" :placeholder="placeholder" :value="showValue" />
      <i class="vicon arrow" :class="{'arrow_up':open}">&#xe678;</i>
      <transition name="drop">
        <div v-if="open" class="cascader-drop" @click.stop>
          <template v-for="(column, index) of cascader">
            <ul :key="index">
              <li
                v-for="(value, key) in column"
                :key="key"
                :class="{'active': value.active}"
                @click.stop="select(index, key, value)"
              >
                {{value.label || value}}
                <i v-if="value.children" class="vicon arrow">&#xeb24;</i>
              </li>
            </ul>
          </template>
        </div>
      </transition>
    </div>
  </FormBox>
  <div v-else class="vi-form-box-preview">
    <span v-if="showLabel" class="vi-cascader-preview-label">{{showLabel}}: </span>
    <span class="vi-cascader-preview-value">{{showValue || '-'}}</span>
    <slot />
  </div>
</template>

<script>
export default {
  name: "Cascader",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    name: String,
    label: String,
    placeholder: String,
  },
  data() {
    const { options } = this;
    return {
      input: this.value,
      open: false,
      edit: true,
      cascader: [options],
      labels: [],
      error: "",
      showValue: "",
    };
  },
  computed: {
    showLabel() {
      return this.name || this.label;
    },
  },
  methods: {
    click(events) {
      if (this.open === false) {
        // 在document.body上添加一次性的click事件
        this.open = true;
        document.body.addEventListener(
          "click",
          () => {
            this.open = false;
          },
          {
            once: true,
          }
        );
      } else {
        this.open = false;
      }
    },
    select(column, key, value) {
      this.labels.splice(column);
      this.input.splice(column);
      this.cascader.splice(column + 1);
      this.labels.push(value.label);
      this.input.push(value.value);

      for (const item of this.cascader[column]) {
        item.active = false;
      }

      value.active = true;

      const { children } = value;

      if (children) {
        for (const item of children) {
          item.active = false;
        }
        this.cascader.push(children);
      } else {
        this.open = false;
      }

      this.showValue = this.labels.join(" / ");
      this.$emit("input", this.input);
    },
    // 初始化
    init() {
      const { options, value, cascader, labels } = this;
      let next = options;
      for (const v of value) {
        if (next) {
          for (const item of next) {
            const { label, children } = item;
            if (item.value === v) {
              item.active = true;
              labels.push(label);
              if (children) {
                cascader.push(children);
                next = children;
              } else {
                next = null;
              }
              break;
            }
          }
        }
      }
      this.showValue = labels.join(" / ");
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    options(value) {
      this.cascader = [value];
      this.init();
    },
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss">
@import "./style/var.scss";
.vi-cascader {
  position: relative;
  .select-drop-enter-from,
  .select-drop-leave-to {
    opacity: 0;
    li {
      padding: 0 8px;
    }
  }
  .select-drop-enter-active,
  .select-drop-leave-active {
    transition: all 0.16s ease-out;
    li {
      transition: padding 0.16s ease-out;
    }
  }
  .cascader-drop {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 120%;
    height: 260px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px #00000026;
    display: flex;
    ul {
      min-width: 120px;
      color: #666;
      border-right: 1px solid #e8e8e8;
      overflow: auto;
      li {
        position: relative;
        padding: 8px 30px 8px 8px;
        list-style: none;
        color: #989898;
        cursor: pointer;
        white-space: nowrap;
        &:hover {
          background-color: #f5f5f5;
        }
        &.active {
          color: $active;
          background-color: #f5f5f5;
        }
        > ul {
          display: none;
        }
        &:hover > ul {
          display: block !important;
        }
      }
    }
  }
}
</style>