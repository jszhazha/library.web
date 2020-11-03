import type { AppRouteRecordRaw } from '/@/router/types';
import { defineComponent, ref, onMounted } from 'vue';
import { Layout, Menu } from 'ant-design-vue';
import { getMenus } from '/@/router/routes/';
import config from "/@/config/";


export default defineComponent({
  name: 'DefaultLayoutSider',
  setup() {
    const flatMenusRef = ref<AppRouteRecordRaw[]>([])

    // console.log(menus.value)

    onMounted(() => {
      genMenus()
    })

    function genMenus() {
      const flatChildren = getMenus()
      flatMenusRef.value = flatChildren
    }



    return () => {
      return (
        <Layout.Sider theme="light" class="layout-sider" width="260">
          {() => (
            <>
              <div class="layout-sider-header index-center-middle">
                <img src={config.logo} class="layout-sider-header-logo" />
                <div class="layout-sider-header-title">{config.title}</div>
              </div>
              <div>
                {/* <Menu>
                  {() => (
                    // { flatMenusRef.value }
                  )}
                </Menu> */}
              </div>
            </>
          )}
        </Layout.Sider>
      )
    }
  }
})