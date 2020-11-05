import type { AppRouteRecordRaw } from '/@/router/types';
import { defineComponent, watch, unref, ref, TransitionGroup } from 'vue';
import { useRouter } from 'vue-router'
import { Breadcrumb, BreadcrumbItem } from '/@/components/Breadcrumb/'


export default defineComponent({
  setup() {
    const { currentRoute } = useRouter();
    const itemList = ref<AppRouteRecordRaw[]>([]);


    // 路由发送变换
    function getBreadcrumb() {
      const { matched } = unref(currentRoute);
      const matchedList = matched.filter((item) => item.meta && item.meta.title);
      itemList.value = (matchedList as unknown) as AppRouteRecordRaw[]
    }

    // 监听路由发生变化
    watch(
      currentRoute,
      () => {
        getBreadcrumb();
      },
      {
        immediate: true
      }
    )





    return () => (
      <Breadcrumb>
        {() => (
          <TransitionGroup name="breadcrumb" >
            {() => unref(itemList).map(el => {
              console.log(el)
              return (
                <BreadcrumbItem key={el.path}>
                  {() => el.meta.title}
                </BreadcrumbItem>
              )
            })}
          </TransitionGroup>
        )}
      </Breadcrumb>
    )
  }
})


