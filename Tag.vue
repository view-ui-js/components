<template>
  <FormBox class="w100" v-if="edit" :label="label" :error="error">
    <div class="vi-tag">
      <transition-group class="vi-tag-group" tag="div" name="fade">
        <template v-for="(item, index) of tags">
          <span class="vi-tag-item" :key="item">
            {{item}}
            <i class="vicon" @click="destroy(index)">&#xe679;</i>
          </span>
        </template>
      </transition-group>
      <input
        class="vi-tag-input"
        :placeholder="placeholder"
        ref="input"
        type="text"
        v-model="input"
        @keyup.enter="enter"
        @blur="blur"
      />
    </div>
  </FormBox>
  <div v-else-if="value.length" class="vi-tag-preview">
    <span v-if="label" class="vi-tag-preview-label">{{label}}：</span>
    <span class="vi-tag-preview-item" v-for="item of value" :key="item">{{item}}</span>
  </div>
</template>

<script>
export default {
  name: "Tag",
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    label: {
      type: String
    },
    name: {
      type: String
    },
    placeholder: {
      type: String,
      default: "输入自定义标签名"
    }
  },
  data() {
    return {
      tags: this.value,
      input: "",
      edit: true,
      error: ""
    };
  },
  methods: {
    destroy(key) {
      this.tags.splice(key, 1);
      this.$emit("input", this.tags);
    },
    enter(ev) {
      ev.target.blur();
      ev.target.focus();
      this.$emit("input", this.tags);
    },
    blur(ev) {
      const value = ev.target.value;
      if (value === "") return;
      if (this.tags.includes(value)) {
        return this.$error(`"${value}"标签已存在`);
      }
      this.tags.push(value);
      this.input = "";
      this.$emit("input", this.tags);
    }
  },
  install(Vue) {
    Vue.component(this.name, this);
  }
};
</script>

<style lang="scss">
.vi-tag {
  display: flex;
  user-select: none;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  height: 40px;
  overflow: hidden;
  width: 100%;
  .vi-tag-group {
    white-space: nowrap;
    // overflow-x: scroll;
    .vi-tag-item {
      display: inline-block;
      margin: 4px;
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #8c8c8c;
      border-radius: 3px;
      user-select: none;
      background-color: #eee;
      .vicon {
        cursor: pointer;
        font-size: 13px;
        border-radius: 100%;
        background-color: #ffffff;
      }
    }
  }
  .vi-tag-input {
    width: 125px;
    flex: 1;
    border: none;
  }
}
.vi-tag-preview {
  height: 50px;
  line-height: 45px;
  width: 50%;
  .vi-tag-preview-item {
    border: 1px solid #e6e6e6;
    border-radius: 50px;
    padding: 3px 10px;
    margin-right: 10px;
    font-size: 13px;
  }
}
</style>
