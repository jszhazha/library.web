import { defineComponent } from "vue"
import { Layout, Dropdown, Menu } from "ant-design-vue"
import LayoutBreadcrumb from "./LayoutBreadcrumb"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue"
import { menuStore } from "/@/store/modules/menu"
import { UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons-vue"
import { userStore } from "/@/store/modules/user"
import { useGo } from "/@/hooks/web/usePage"
import { PageEnum } from "/@/enums/pageEnum"

export default defineComponent({
  name: "DefaultLayoutHeader",
  setup() {
    return () => {
      const pageGo = useGo()

      // 处理点击折叠
      function handleTriggerClick() {
        if (menuStore.getCollapsedState) {
          menuStore.commitCollapsedState(false)
        } else {
          menuStore.commitCollapsedState(true)
        }
      }

      function handlemenuClick({ key }: { key: string }) {
        switch (key) {
          case "logout":
            userStore
              .logout()
              .then(() => {
                userStore.commitResetState()
                pageGo({ name: PageEnum.BASE_LOGIN })
              })
              .catch(() => {})
            break
          default:
            break
        }
      }

      // 渲染下拉菜单
      function renderMenu() {
        return (
          <Menu onClick={handlemenuClick}>
            {() => (
              <>
                <Menu.Item key="center">{() => [<UserOutlined />, "个人中心"]}</Menu.Item>
                <Menu.Item key="setting">{() => [<SettingOutlined />, "个人设置"]}</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">{() => [<LogoutOutlined />, "退出登录"]}</Menu.Item>
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
                  default: () => (
                    <div class="layout-header-right-action">
                      {userStore.getUserInfoState?.username}
                    </div>
                  ),
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
