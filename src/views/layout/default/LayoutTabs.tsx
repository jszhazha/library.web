import { defineComponent, computed, unref, watch, ref } from "vue";

import { tabStore, TabItem } from "/@/store/modules/tab";

export default defineComponent({
  setup() {
    const activeKey = ref<string>("");

    // 当前tab列表;
    const getTabsState = computed(() => {
      return tabStore.getTabsState;
    });

    watch(
      () => tabStore.getLastChangeRouteState,
      (value) => {
        const lastChangeRoute = unref(value);
        activeKey.value = value.name as string;
        tabStore.commitAddTab(lastChangeRoute);
      },
      { immediate: true }
    );

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
