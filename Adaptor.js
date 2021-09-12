/**
 * V3版本接口兼容适配器，接口与V2一致
 */

import * as Vue from "vue";

/**
 * 创建V3组件实例
 * @param {*} options 
 * @returns 组件实例
 */
function Component(options, id) {
  const container = document.createElement('section');
  if (id) {
    container.id = id;
  }
  document.body.appendChild(container);
  return Vue.createApp(options).mount(container);
}

export { Component };

export default { Component };
