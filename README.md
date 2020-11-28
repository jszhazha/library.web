## Next 介绍

> 当前分支, 完成基本功能. 开发新的网站, 可以从当前分支开发.

## 项目配置项

```sh
# 文章标题
VITE_GLOB_APP_TITLE = 图书馆

# 端口号
VITE_PORT = 3200

# 浏览器是否打开
VITE_OPEN = true

# 路径
VITE_PUBLIC_PATH = /

# 跨域路由
VITE_PROXY = [ ["/api", "http://localhost:3000" ] ]
```

# 菜单颜色配置

```css
:root {
  --sider-dark-background: #191a23;
  --sider-dark-sub-background: #101117;
}
```

# 菜单设置

```js
{
  // 菜单宽度
  menuWidth: 260,

  // 菜单是否收起状态
  collapsed: false,

  // 收缩宽度
  collapsedWidth: 49
}
```

# 路由设置

```ts

  /** 
   * 所有路由以 name 字段 作为 key 值,在注册路由时,所以 name 必须是唯一的, 将会拼接 layout.name + routes.name
   * 以个人中心为例 拼接后的 name: account-manage-center
  */
const routers: AppRouteModule = {
  layout: {
    path: '/account-manage',
    name: 'account-manage',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: '/account-manage/center',
    meta: {
      title: '个人管理',
      icon: 'ant-design:user-outlined'
    },
  },

  routes: [
    {
      path: "center",
      name: 'center',
      component: (): unknown => import(`/@/views/pages/account-mange/center/index.vue`),
      meta: {
        title: '个人中心'
      },
    },
    {
      path: "setting",
      name: 'setting',
      component: (): unknown => import(`/@/views/pages/account-mange/setting/index.vue`),
      meta: {
        title: '个人设置'
      },
    },
  ]
}

```

### META 配置
```ts
  // meta 配置
  {
    // 标题
    title?: string;

    // 忽略身份验证
    ignoreAuth?: boolean;

    // 角色信息
    roles?: RoleEnum[];

    // 缓存页面
    KeepAlive?: boolean,

    // 忽略标签缓存
    ignoreKeepAlive?: boolean;

    // 菜单隐藏
    hideInMenu?: boolean

    // 图标
    icon?: string;

    // 固定标签
    affix?: boolean
  }
```
