import { defineComponent } from "vue";
// import { useFullContent } from '/@/hooks/web/useFullContent';
import { Layout, Affix } from "ant-design-vue";
import LayoutHeader from "./LayoutHeader";
import LayoutSider from "./LayoutSider";
import LayoutContent from "./LayoutContent";

import "./index.less";

export default defineComponent({
  name: "DefaultLayout",
  setup() {
    // 获取项目配置
    // useFullContent();

    return () => {
      return (
        <Layout class="default-layout">
          {() => (
            <>
              <LayoutSider />
              <Layout>
                {() => (
                  <>
                    <Affix offsetTop={1}>{() => <LayoutHeader />}</Affix>
                    <LayoutContent />
                  </>
                )}
              </Layout>
            </>
          )}
        </Layout>
      );
    };
  },
});
