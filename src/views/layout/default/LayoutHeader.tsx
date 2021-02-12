import { defineComponent, ref, unref } from 'vue'
import { Layout, Select } from 'ant-design-vue'
import LayoutBreadcrumb from './LayoutBreadcrumb'
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { menuStore } from '/@/store/modules/menu'
import DropMenu from '/@/components/PublicHeader/dropMenu.vue'
import { userStore } from '/@/store/modules/user'
import { getFilterFlatMenus } from '/@/utils/helper/menu'

export default defineComponent({
  name: 'DefaultLayoutHeader',
  setup() {
    return () => {
      const isSearch = ref<boolean>(false)

      const flatMenus = getFilterFlatMenus()

      // 处理点击折叠
      function handleTriggerClick() {
        if (menuStore.getCollapsedState) {
          menuStore.commitCollapsedState(false)
        } else {
          menuStore.commitCollapsedState(true)
        }
      }

      // 渲染搜索列表
      function renderSearchList() {
        return flatMenus.map((el) => {
          return <Select.Option value={el.meta?.title} />
        })
      }

      // 搜索菜单
      function onSearchClick() {
        return
      }

      return (
        <Layout.Header class="layout-header">
          {() => (
            <div class="index-space-between">
              <div class="layout-header-left index-middle">
                <div class="header-trigger" onClick={handleTriggerClick}>
                  <MenuFoldOutlined class={[menuStore.getCollapsedState && 'index-hidden']} />
                  <MenuUnfoldOutlined class={[!menuStore.getCollapsedState && 'index-hidden']} />
                </div>
                <LayoutBreadcrumb />
              </div>
              <div class="flex">
                <div>
                  <SearchOutlined onClick={onSearchClick} />
                  <Select
                    class={['no-border', unref(isSearch) ? 'w-200' : 'w-200']}
                    placeholder="搜索"
                    showSearch={true}
                    showArrow={false}
                  >
                    {() => renderSearchList()}
                  </Select>
                </div>
                <DropMenu placement="bottomCenter">
                  {{
                    default: () => (
                      <div class="layout-header-right-action">
                        {userStore.getUserInfoState?.username}
                      </div>
                    )
                  }}
                </DropMenu>
              </div>
            </div>
          )}
        </Layout.Header>
      )
    }
  }
})
