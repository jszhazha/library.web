import type { Menu as MenuType } from '/@/router/types';
import { defineComponent, reactive } from 'vue';
import { Layout, Menu } from 'ant-design-vue';
import { getMenus, menuHasChildren } from '/@/utils/menuHelp';
import config from "/@/config/";
import { MenuState } from './type'


export default defineComponent({
  name: 'DefaultLayoutSider',
  setup() {

    const menuItem: MenuType[] = getMenus()
    const menuState = reactive<Partial<MenuState>>({
      selectedKeys: [],
      mode: 'inline',
      isAppMenu: true,
    })

    // 处理点击菜单
    function handleMenuClick(menu: MenuType) {
      const { path } = menu;
      menuState.selectedKeys = [path];
    }

    // 渲染菜单
    function renderMenuItem(menuList?: MenuType[],) {
      if (!menuList) return;
      return menuList.map((menu) => {
        const { title, path, hideInMenu } = menu
        if (hideInMenu) return
        if (!menuHasChildren(menu)) {
          return (
            <Menu.Item key={path} onClick={handleMenuClick.bind(null, menu)}>
              {() => [
                <div>
                  {title}
                </div>
              ]}
            </Menu.Item>
          )
        }
        return (
          <Menu.SubMenu key={path}>
            {{
              title: () => title,
              default: () => renderMenuItem(menu.children)
            }}
          </Menu.SubMenu>
        )
      })
    }


    // 渲染根菜单
    function renderMenu() {
      const { selectedKeys, mode, isAppMenu, } = menuState;
      return (
        <Menu
          mode={mode}
          forceSubMenuRender={isAppMenu}
          selectedKeys={selectedKeys}
          class="layout-sider-menu"
        >
          {{ default: () => renderMenuItem(menuItem) }}
        </Menu>
      )
    }



    return () => {
      return (
        <Layout.Sider theme="light" class="layout-sider" width="260" >
          {() => (
            <>
              <div class="layout-sider-header index-center-middle">
                <img src={config.logo} class="layout-sider-header-logo" />
                <div class="layout-sider-header-title">{config.title}</div>
              </div>
              <div>
                {renderMenu()}
              </div>
            </>
          )}
        </Layout.Sider >
      )
    }
  }
})