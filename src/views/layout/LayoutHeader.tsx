import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';

export default defineComponent({
  name: 'DefaultLayoutHeader',
  setup() {
    console.log(import.meta.env)


    return () => {
      return (
        <Layout.Header class="dlayout-header">
          {() => (
            324
          )}
        </Layout.Header>
      )
    }
  }
})