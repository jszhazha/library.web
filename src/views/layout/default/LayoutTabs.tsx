import type { AppRouteRecordRaw } from "/@/router/types";
import { defineComponent, computed, unref, watch, ref } from "vue";
import { useGo } from "/@/hooks/web/usePage";
import { tabStore, TabItem } from "/@/store/modules/tab";
import router from "/@/router";
import { Tabs } from "ant-design-vue";

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
      const affixTabs = filterAffixTabs(
        (router.getRoutes() as unknown) as AppRouteRecordRaw[]
      );
      for (const tab of affixTabs) {
        tabStore.commitAddTab(tab);
      }
    }

    // 处理点击
    function handleChange(name: string) {
      activeKey.value = name;
      pageGo(
        unref(getTabsState).find((item: TabItem) => item.name === name) as any,
        false
      );
    }

    function renderTabs() {
      return unref(getTabsState).map((item: TabItem) => {
        const key = item.name as string;
        return (
          <Tabs.TabPane key={key} closable={!item.meta!.affix}>
            {{
              tab: () => item.meta!.title,
            }}
          </Tabs.TabPane>
        );
      });
    }

    return () => (
      <div class="default-tabs">
        <Tabs
          type="card"
          size="small"
          hideAdd={true}
          tabBarGutter={6}
          activeKey={unref(activeKey)}
          onChange={handleChange}
        >
          {() => renderTabs()}
        </Tabs>
      </div>
    );
  },
});
