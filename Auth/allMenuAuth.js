/**
 * 从原始menu中生成全部auth状态树，为新建角色提供初始状态
 * @param {Object} auth 容器对象
 * @param {Object} menu 导航菜单
 */
function recursive(allMenu, auth) {

    for (const name in allMenu) {
        const { children } = allMenu[name];
        if (auth[name] === undefined) {
            auth[name] = {}
        }
        if (children) {
            recursive(children, auth[name]);
        }
    }

    return auth;

}

export default function (allMenu) {

    const auth = {};

    recursive(allMenu, auth);

    return auth;

}
