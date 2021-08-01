<template>
  <FormBox v-if="edit" :label="label">
    <div class="v-selects" @click="click">
      <div v-if="input.length" class="input-box">
        <span v-for="(item, key) of input" :key="key">
          {{ item }}
          <i class="vicon" @click="destroy(key, item)">&#xe679;</i>
        </span>
      </div>
      <div v-else class="input-box placeholder">{{placeholder}}</div>
      <i class="vicon arrow" :class="{ 'arrow_up': drop }">&#xe678;</i>
      <transition name="drop" appear>
        <ul v-if="drop">
          <li
            v-for="(value, key) in options"
            :key="key"
            :class="{'vt-active': active[value] }"
            @click="select(value)"
          >{{value}}</li>
        </ul>
      </transition>
    </div>
  </FormBox>
  <div v-else class="v-selects-preview">
    <span class="v-selects-preview-name">{{label}}：</span>
    <span v-for="(item, key) of input" :key="key">{{ item }}</span>
  </div>
</template>

<script>
import "./select.scss";
export default {
  name: "Selects",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    label: { type: String },
    placeholder: {
      type: String
    }
  },
  data() {
    const active = {};
    const { value } = this;
    for (const item of value) {
      active[item] = true;
    }
    return {
      drop: false,
      edit: true,
      input: value,
      active
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
      if (this.active[value]) {
        this.active[value] = false;
        const index = this.input.indexOf(value);
        this.input.splice(index, 1);
      } else {
        this.active[value] = true;
        this.input.push(value);
      }
      this.$emit("input", this.input);
    },
    destroy(key, value) {
      this.input.splice(key, 1);
      this.active[value] = false;
      this.$emit("input", this.input);
    }
  },
  install(app) {
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
.v-selects {
  user-select: none;
  height: 40px;
  .input-box {
    width: 100%;
    span {
      display: inline-block;
      margin: 4px;
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      background-color: #eee;
      color: #8c8c8c;
      border-radius: 3px;
      i {
        width: 13px;
        height: 13px;
        cursor: pointer;
        font-size: 13px;
        border-radius: 100%;
        background-color: #ffffff;
      }
    }
  }
  .placeholder {
    color: #ddd;
    padding: 0 8px;
    line-height: 40px;
  }
  ul {
    width: 100%;
    position: absolute;
    top: 110%;
    z-index: 1;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    li {
      padding: 8px;
      list-style: none;
      color: #989898;
      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
}

.v-selects-preview {
  line-height: 45px;
  width: 50%;
}
</style>