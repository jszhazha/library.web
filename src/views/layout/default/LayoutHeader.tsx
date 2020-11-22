import { defineComponent } from "vue";
import { Layout } from "ant-design-vue";
import LayoutBreadcrumb from "./LayoutBreadcrumb";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import { menuStore } from "/@/store/modules/menu";

export default defineComponent({
  name: "DefaultLayoutHeader",
  setup() {
    return () => {
      // 处理点击折叠
      function handleTriggerClick() {
        if (menuStore.getCollapsedState) {
          menuStore.commitCollapsedState(false);
        } else {
          menuStore.commitCollapsedState(true);
        }
      }


      return (
        <Layout.Header class="layout-header">
          {() => (
            <div class="index-space-between">
              <div class="layout-header-left index-middle">
                <div class="header-trigger" onClick={handleTriggerClick}>
                  <MenuFoldOutlined
                    class={[menuStore.getCollapsedState && "index-hidden"]}
                  />
                  <MenuUnfoldOutlined
                    class={[!menuStore.getCollapsedState && "index-hidden"]}
                  />
                </div>
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
