/**
 * 递归menu，用menu和auth新建新的权限配置实例
 * @param {Object} auth 权限配置
 * @param {Object} menu 导航菜单
 * @returns {Object} 包含auth状态的menu实例
 */
export default function recursive(auth = {}, menu) {

   const container = {};

   for (const key in menu) {

      const { name, icon, children } = menu[key];

      const itemNode = { name, icon };
      const authValue = auth[key];

      if (authValue) {

         itemNode.status = true;

         const auth = {};
         itemNode.auth = auth;

         for (const name in authValue) {
            const value = authValue[name];
            if (typeof value !== 'object') {
               auth[name] = value;
            }
         }

      } else {

         itemNode.status = false;

      }

      if (children) {
         itemNode.children = recursive(authValue, children);
      }

      container[key] = itemNode;
      
   }

   return container;

}