import { defineComponent, computed, unref, watch, ref } from "vue";
import { useGo } from "/@/hooks/web/usePage";
import { tabStore, TabItem } from "/@/store/modules/tab";

export default defineComponent({
  setup() {
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
        const lastChangeRoute = unref(value);
        activeKey.value = value.name as string;
        tabStore.commitAddTab(lastChangeRoute);
      },
      { immediate: true }
    );

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
              "index-stop-row",
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
