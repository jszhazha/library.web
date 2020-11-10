import type { Menu as MenuType } from "/@/router/types";
import { defineComponent, reactive, unref, computed, watch } from "vue";
import { Layout, Menu } from "ant-design-vue";
import {
  getMenus,
  getFlatMenus,
  getAllParentPath,
  menuHasChildren,
} from "/@/utils/menuHelp";
import { useRouter } from "vue-router";
import config from "/@/config/";
import { MenuState } from "./type";
import router from "/@/router";

export default defineComponent({
  name: "DefaultLayoutSider",
  setup() {
    const { currentRoute } = useRouter();
    const menuItem: MenuType[] = getMenus();
    const menuState = reactive<Partial<MenuState>>({
      selectedKeys: [],
      mode: "inline",
      isAppMenu: true,
      openKeys: [],
    });

    // 处理点击菜单 -> 导航 跳转
    function handleMenuClick(menu: { key: string }) {
      const { key } = menu;
      menuState.selectedKeys = [key];
      router.push(key);
    }

    // 处理菜单改变
    function handleMenuChange() {
      const flatItems = getFlatMenus();
      const findMenu = flatItems.find(
        (menu) => menu.path === unref(currentRoute).path
      );
      if (findMenu) {
        menuState.openKeys = getAllParentPath(flatItems, findMenu.path!);
        menuState.selectedKeys = [findMenu.path!];
      }
    }

    const getOpenKeys = computed(() => {
      return menuState.openKeys;
    });

    // 处理打开菜单
    function handleOpenChange(openKeys: string[]): void {
      menuState.openKeys = openKeys;
    }

    // 渲染菜单
    function renderMenuItem(menuList?: MenuType[]) {
      if (!menuList) return;
      return menuList.map((menu) => {
        const { title, path, hideInMenu } = menu;
        if (hideInMenu) return;
        if (!menuHasChildren(menu)) {
          return <Menu.Item key={path}>{() => [<div>{title}</div>]}</Menu.Item>;
        }
        return (
          <Menu.SubMenu key={path}>
            {{
              title: () => title,
              default: () => renderMenuItem(menu.children),
            }}
          </Menu.SubMenu>
        );
      });
    }

    watch(
      () => currentRoute.value.name,
      () => {
        handleMenuChange();
      }
    );

    // 渲染根菜单
    function renderMenu() {
      const { selectedKeys, mode, isAppMenu } = menuState;
      return (
        <Menu
          mode={mode}
          onOpenChange={handleOpenChange}
          onClick={handleMenuClick}
          forceSubMenuRender={isAppMenu}
          selectedKeys={selectedKeys}
          openKeys={unref(getOpenKeys)}
          class="layout-sider-menu"
        >
          {{ default: () => renderMenuItem(menuItem) }}
        </Menu>
      );
    }

    handleMenuChange();

    return () => {
      return (
        <Layout.Sider theme="light" class="layout-sider" width="260">
          {() => (
            <>
              <div class="layout-sider-header index-center-middle">
                <img src={config.logo} class="layout-sider-header-logo" />
                <div class="layout-sider-header-title">{config.title}</div>
              </div>
              <div>{renderMenu()}</div>
            </>
          )}
        </Layout.Sider>
      );
    };
  },
});
