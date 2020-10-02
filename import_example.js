/**
 * 所有组件加载配置实例，通过修改该模板来实现最小化加载
 */

import "view-ui/style/";
import "view-ui/icon/vicon.css";
import 'view-template/appbar/style.scss';
import 'view-template/list/style.scss';

import Vue from 'vue';

// 按钮
import button from 'view-ui/button.vue';

Vue.use(button);

// 弹层
import dialog from 'view-ui/dialog.vue';
import $confirm from 'view-ui/$confirm.vue';

Vue.use(dialog);
Vue.use($confirm);

// 表单
import cascader from 'view-ui/cascader/cascader.vue';
import select from 'view-ui/select/select.vue';
import selectEdit from 'view-ui/select/select-edit.vue';
import radio from 'view-ui/radio.vue';

Vue.use(cascader);
Vue.use(select);
Vue.use(selectEdit);
Vue.use(radio);

// 输入框
import input from 'view-ui/input/index.vue';
import inputRange from 'view-ui/input/range.vue';

Vue.use(input);
Vue.use(inputRange);

// 上传
import upload from 'view-ui/Upload/upload.vue';
import uploadDrag from 'view-ui/upload/upload-drag.vue';
import axios from 'axios';

const uploadConfig = {
   "filePath": 'http://file.dev.me/',
   /**
    * upload组件的数据提交函数
    * @param {String} url 图片上传地址
    * @param {Object} formData 要上传的图片FormData
    * @returns {Array} 上传成功后的rul数组
    */
   async post(url, formData) {
      const { data } = await axios.post(url, formData);
      return data.files;
   },
}

Vue.use(upload, uploadConfig);
Vue.use(uploadDrag, uploadConfig);

// 图片
import imageUpload from 'view-ui/image/upload.vue';
import imagePreview from 'view-ui/image/preview.vue';
import $imagePreview from 'view-ui/image/$preview.vue';

Vue.use(imageUpload);
Vue.use(imagePreview);
Vue.use($imagePreview);

// 气泡
import bubble from 'view-ui/bubble/bubble.vue';

Vue.use(bubble);

// 滑块
import slider from "view-ui/slider/slider.vue";
import sliderRange from "view-ui/slider/slider-range.vue";

Vue.use(slider);
Vue.use(sliderRange);

// 消息框
import $message from 'view-ui/$message.vue';

Vue.use($message);

// tab选项卡
import tabs from 'view-ui/tabs.vue';

Vue.use(tabs);

// 加载进度条
import loading from 'view-ui/loading.vue';

Vue.use(loading);

// 侧栏抽屉
import drawer from 'view-ui/drawer.vue';

Vue.use(drawer);

// tip提示框
import Tip from 'view-ui/Tip.vue';

Vue.use(Tip);

// 浮动菜单
import floatMenu from 'view-ui/float-menu.vue';

Vue.use(floatMenu);

// 下拉菜单
import dropdown from 'view-ui/dropdown/';
import dropdownMenu from 'view-ui/dropdown/menu.vue';
import dropdownRange from 'view-ui/dropdown/range.vue';

Vue.use(dropdown);
Vue.use(dropdownMenu);
Vue.use(dropdownRange);

// 分页
import paging from 'view-ui/paging.vue';

Vue.use(paging);

// 主导航
import navbar from 'view-ui/navbar.vue';

Vue.use(navbar);

// 子导航
import subNav from 'view-ui/SubNav.vue';

Vue.use(subNav);

// 右键菜单
import $contextmenu from 'view-ui/$contextmenu.vue';

Vue.use($contextmenu);

// 日期
import dateInline from 'view-ui/date/inline.vue';
import dateInlineRange from 'view-ui/date/inline-range.vue';
import datePicker from 'view-ui/date/picker.vue';
import datePickerRange from 'view-ui/date/picker-range.vue';

Vue.use(dateInline);
Vue.use(dateInlineRange);
Vue.use(datePicker);
Vue.use(datePickerRange);

import tag from 'view-ui/tag.vue';

Vue.use(tag);

import _switch from 'view-ui/switch.vue';

Vue.use(_switch);

import menu from 'view-ui/menu/';
import menuLine from 'view-ui/menu/line';

Vue.use(menu);
Vue.use(menuLine);

import theme from 'view-ui/theme.js';

export default theme;