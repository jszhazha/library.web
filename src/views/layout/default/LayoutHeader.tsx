import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';


export default defineComponent({
  name: 'DefaultLayoutHeader',
  setup() {


    return () => {
      return (
        <Layout.Header class="dlayout-header">
          {() => (
            <div class="index-space-between">
              <div class="dlayout-header-left index-middle">
                首页
              </div>
              <div>
                admin
              </div>
            </div>
          )}
        </Layout.Header>
      )
    }
  }
})