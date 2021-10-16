import black from './themes/black.js';
import green from './themes/green.js';

export default {
   themes: { black, green },
   styleQueue: [],
   /**
    * 应用主题
    * @param {String} name 主题名称
    */
   use(name) {

      const theme = this.themes[name];

      this.current = theme;

      if (theme) {

         let element = document.getElementById('view-theme');

         if (!element) {
            element = document.createElement('style');
            element.id = 'view-theme';
            document.body.appendChild(element);
         }

         let style = ''
         for (const name in theme) {
            const { color, background } = theme[name];
            if (color && background) {
               style += `
               .vt-${name} {
                  color: ${color} !important;
                  background-color: ${background} !important;
               }`;
            } else if (color) {
               style += `
               .vt-${name} {
                  color: ${color} !important;
               }`;
            } else if (background) {
               style += `
               .vt-${name} {
                  background-color: ${background} !important;
               }`;
            }
         }

         for (const func of this.styleQueue) {
            style += func(theme);  // 输出组件内style函数
         }

         element.innerHTML = style;

         localStorage.theme = name;

      } else {

         throw new Error(`无效主题"${name}"`);

      }

   },
   /**
    * 添加自定义主题
    * @param {String} name 主题名称
    * @param {Object} options 配色参数
    */
    add(name, options) {

      this.themes[name] = options;

   }
}