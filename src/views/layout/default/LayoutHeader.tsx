import { defineComponent } from "vue";
import { Layout } from "ant-design-vue";
import LayoutBreadcrumb from "./LayoutBreadcrumb";

export default defineComponent({
  name: "DefaultLayoutHeader",
  setup() {
    return () => {
      return (
        <Layout.Header class="layout-header">
          {() => (
            <div class="index-space-between">
              <div class="dlayout-header-left index-middle">
                <LayoutBreadcrumb />
              </div>
              <div>admin</div>
            </div>
          )}
        </Layout.Header>
      );
    };
  },
});
