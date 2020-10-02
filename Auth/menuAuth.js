/**
 * 递归带有auth的menu对象，生成auth状态树
 */
function recursive(menu, container) {

   for (const name in menu) {

      const value = menu[name];
      const { status, children } = value;

      if (status) {
         if (container[name] === undefined) {
            container[name] = {};
         }
         if (children) {
            recursive(children, container[name]);
         }
      }

   }

}

/**
 * 从auth menu中获取并生成auth状态树，用于新建auth树
 * @param {Object} menu 导航菜单
 */
export default function (menu) {

   const auth = {};

   recursive(menu, auth);

   return auth;

}