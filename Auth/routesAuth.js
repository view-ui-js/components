const excludePath = ['', '*'];

const prevent = () => import('../Page/Prevent.vue');

/**
 * 递归路由配置项，根据权限过滤路由
 * @param {Array} routes 初始路由配置项
 * @param {Object} auth 授权规则
 * @param {Object} menu 经过权限验证后的导航菜单
 * @param {Object} parentsAuth 父级授权状态
 */
function recursive(routes, auth, menu) {

   for (const item of routes) {

      const { path, name, icon, children } = item;

      let authChildren;

      const menuChildren = {};

      if (auth) {

         authChildren = auth[path];

         if (authChildren) {

            if (name) {

               menu[path] = {
                  name,
                  icon,
                  children: (children ? menuChildren : null)
               };

            }

         } else if (excludePath.includes(path) === false) {

            item.component = prevent;

         }

      } else {

         item.component = prevent;

      }

      if (children) {

         recursive(children, authChildren, menuChildren);

      }

   }

}

/**
 * 根据auth配置改写routes对象，得到授权后routes
 * @param {Array} routes 路由配置选项
 * @param {Object} auth 权限配置
 */
export default function (routes, auth) {

   const menu = {};

   recursive(routes, auth, menu);

   return {
      menu,
      routes
   };

};