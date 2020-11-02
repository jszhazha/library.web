import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
import config from "/@/config/";


export default defineComponent({
  name: 'DefaultLayoutSider',
  setup() {


    return () => {
      return (
        <Layout.Sider theme="light" class="layout-sider" width="260">
          {() => (
            <div class="layout-sider-header index-center-middle">
              <img src={config.logo} class="dlayout-header-logo" />
              <div class="dlayout-header-left-title">{config.title}</div>
            </div>
          )}
        </Layout.Sider>
      )
    }
  }
})