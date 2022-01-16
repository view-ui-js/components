<template>
  <FormBox v-if="edit" class="w100" :label="label" :error="error">
    <div class="v-tag">
      <transition-group class="v-tag-group" tag="div" name="fade">
        <span class="v-tag-item" v-for="(item, index) of tags" :key="item">
          {{ item }}
          <i class="vicon" @click="destroy(index)">&#xe679;</i>
        </span>
      </transition-group>
      <input
        class="v-tag-input"
        :placeholder="placeholder"
        ref="input"
        type="text"
        v-model="input"
        @keyup.enter="enter"
        @blur="blur"
      />
    </div>
  </FormBox>
  <div v-else-if="value.length" class="v-tag-preview">
    <span v-if="label" class="v-tag-preview-label">{{ label }}：</span>
    <span class="v-tag-preview-item" v-for="item of value" :key="item">{{
      item
    }}</span>
  </div>
</template>

<script>
import FormBox from "./FormBox.vue";
export default {
  name: "Tag",
  components: { FormBox },
  emits: ["input"],
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    label: {
      type: String,
    },
    name: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "输入自定义标签名",
    },
  },
  data() {
    return {
      tags: this.value,
      input: "",
      edit: true,
      error: "",
    };
  },
  methods: {
    destroy(key) {
      this.tags.splice(key, 1);
      this.$emit("input", this.tags);
    },
    enter(e) {
      e.target.blur();
      e.target.focus();
      this.$emit("input", this.tags);
    },
    blur(e) {
      const value = e.target.value;
      if (value === "") return;
      if (this.tags.includes(value)) {
        // return this.$error(`"${value}"标签已存在`);
      }
      this.tags.push(value);
      this.input = "";
      this.$emit("input", this.tags);
    },
  },
  install(app) {
    app.component(this.name, this);
  },
};
</script>

<style lang="scss" scoped>
.v-tag {
  display: flex;
  user-select: none;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 3px;
  height: 40px;
  overflow: hidden;
  width: 100%;
  .v-tag-group {
    white-space: nowrap;
    // overflow-x: scroll;
    .v-tag-item {
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
  .v-tag-input {
    width: 125px;
    flex: 1;
    border: none;
  }
}
.v-tag-preview {
  height: 50px;
  line-height: 45px;
  width: 50%;
  .v-tag-preview-item {
    border: 1px solid #e6e6e6;
    border-radius: 50px;
    padding: 3px 10px;
    margin-right: 10px;
    font-size: 13px;
  }
}
</style>
