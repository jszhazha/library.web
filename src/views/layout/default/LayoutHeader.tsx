import { defineComponent } from "vue"
import { Layout, Dropdown, Menu } from "ant-design-vue"
import LayoutBreadcrumb from "./LayoutBreadcrumb"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue"
import { menuStore } from "/@/store/modules/menu"
import { UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons-vue"

export default defineComponent({
  name: "DefaultLayoutHeader",
  setup() {
    return () => {
      // 处理点击折叠
      function handleTriggerClick() {
        if (menuStore.getCollapsedState) {
          menuStore.commitCollapsedState(false)
        } else {
          menuStore.commitCollapsedState(true)
        }
      }

      // 渲染下拉菜单
      function renderMenu() {
        return (
          <Menu>
            {() => (
              <>
                <Menu.Item>{() => [<UserOutlined />, "个人中心"]}</Menu.Item>
                <Menu.Item>{() => [<SettingOutlined />, "个人设置"]}</Menu.Item>
                <Menu.Divider />
                <Menu.Item>{() => [<LogoutOutlined />, "退出登录"]}</Menu.Item>
              </>
            )}
          </Menu>
        )
      }

      return (
        <Layout.Header class="layout-header">
          {() => (
            <div class="index-space-between">
              <div class="layout-header-left index-middle">
                <div class="header-trigger" onClick={handleTriggerClick}>
                  <MenuFoldOutlined class={[menuStore.getCollapsedState && "index-hidden"]} />
                  <MenuUnfoldOutlined class={[!menuStore.getCollapsedState && "index-hidden"]} />
                </div>
                <LayoutBreadcrumb />
              </div>
              <Dropdown placement="bottomCenter">
                {{
                  default: () => <div class="layout-header-right-action">admin</div>,
                  overlay: () => renderMenu()
                }}
              </Dropdown>
            </div>
          )}
        </Layout.Header>
      )
    }
  }
})
