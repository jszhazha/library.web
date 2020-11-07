import { defineComponent } from "vue";
import { Layout } from "ant-design-vue";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "DefaultLayoutContent",
  setup() {
    return () => {
      return <Layout.Content>{() => <RouterView />}</Layout.Content>;
    };
  },
});
