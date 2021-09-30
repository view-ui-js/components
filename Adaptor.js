/**
 * V3版本接口兼容适配器，接口与V2一致
 */

import { createApp } from "vue";

/**
 * 创建V3组件实例
 * @param {Object} options 
 * @param {String} id 
 * @returns 组件实例
 */
function Component(options, el) {
  return createApp(options).mount(el);
}

export { Component };

export default { Component };
