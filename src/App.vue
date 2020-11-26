<template>
  <config-provider :locale="zhCN">
    <router-view />
  </config-provider>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { ConfigProvider } from "ant-design-vue";
import { useConfigProvider } from "./useApp";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import moment from "moment";
import "./utils/browser";

moment.locale("zh-cn");
export default defineComponent({
  components: { ConfigProvider },
  setup() {
    const { transformCellText } = useConfigProvider();

    return {
      zhCN,
      transformCellText,
    };
  },
});
</script>
