## view-ui

基于 vue 3.x 的轻量化的 ui 组件库

### Install

```
npm install view-ui@latest
```

### Usage

按需引入，可参考配置示例代码"./import_example.js"，进行批量配置。

```js
import app from "vue";
import tabs from "view-ui/tabs.vue";
import button from "view-ui/button.vue";
import theme from "view-ui/theme.js";

app.use(tabs);
app.use(button);

theme.use("black"); // 必须先添加组件，后定义主题，否则初始状态下无法获取动态样式
```

<!-- ## 安装说明

项目中使用jsx代替return函数，需要安装[babel-plugin-transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx)插件，在.babelrc文件中添加配置项。

针对vue-cli构建的项目，在安装jsx插件后，vue-loader可以正常解析.vue组件中的jsx代码。
如果项目中有使用.js类型组件需要手动将包含jsx语法的js文件所在目录添加到webpack.base.conf.js配置项中。

      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('packages'), resolve('test')]
      }
 -->

### 主题配色

view-ui 采用分级颜色主题配置方案，支持直接在组件内使用动态样式或扩展自定义主题配色方案

#### 示例

```js
{
  style({ main }) {
    return `
      .v-bubble-content{
         color: #fff;
         background-color: var(--main-background) !important;
      }
      .v-bubble-arrow-right:after{
         border-right-color: var(--main-background) !important;
      }
      .v-bubble-arrow-left:after{
         border-left-color: var(--main-background) !important;
      }
      .v-bubble-arrow-top:after{
         border-top-color: var(--main-background) !important;
      }
      .v-bubble-arrow-bottom:after{
         border-bottom-color: var(--main-background) !important;
      }
    `;
  }
}
```
