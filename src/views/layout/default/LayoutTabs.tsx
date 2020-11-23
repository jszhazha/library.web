import type { AppRouteRecordRaw } from "/@/router/types";
import { defineComponent, computed, unref, watch, ref } from "vue";
import { useGo } from "/@/hooks/web/usePage";
import { tabStore, TabItem } from "/@/store/modules/tab";
import router from "/@/router";

export default defineComponent({
  setup() {
    let isAddAffix = false;
    const activeKey = ref<string>("");
    const pageGo = useGo();

    // 当前tab列表;
    const getTabsState = computed(() => {
      return tabStore.getTabsState;
    });

    // 监听路由变化
    watch(
      () => tabStore.getLastChangeRouteState,
      (value) => {
        if (!isAddAffix) {
          addAffixTabs();
          isAddAffix = true;
        }
        const lastChangeRoute = unref(value);
        activeKey.value = value.name as string;
        tabStore.commitAddTab(lastChangeRoute);
      },
      { immediate: true }
    );

    function filterAffixTabs(routes: AppRouteRecordRaw[]) {
      return routes.filter((route) => route.meta.affix);
    }
    /**
     * @description: 设置固定tabs
     */
    function addAffixTabs(): void {
      const affixTabs = filterAffixTabs((router.getRoutes() as unknown) as AppRouteRecordRaw[]);
      for (const tab of affixTabs) {
        tabStore.commitAddTab(tab);
      }
    }

    // 处理点击
    function handleChange(item: TabItem) {
      activeKey.value = item.name as string;
      pageGo(item as any, false);
    }

    function renderTabs() {
      return unref(getTabsState).map((item: TabItem) => {
        const key = item.name as string;
        return (
          <div
            key={key}
            class={[
              "default-tabs-item",
              "index-hidden-newline",
              activeKey.value === key ? "index-selected" : "",
            ]}
            onClick={handleChange.bind(null, item)}
          >
            {item.meta!.title}
          </div>
        );
      });
    }

    return () => (
      <div class="default-tabs">
        <div class="default-tabs-left">{renderTabs()}</div>
      </div>
    );
  },
});
