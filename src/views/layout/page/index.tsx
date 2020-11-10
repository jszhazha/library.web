import { defineComponent, Transition } from "vue";
import { RouterView, RouteLocation } from "vue-router";
import "./index.less";

export default defineComponent({
  setup() {
    return () => (
      <RouterView>
        {{
          default: ({
            Component,
            route,
          }: {
            Component: any;
            route: RouteLocation;
          }) => {
            return (
              <Transition name="fade-slide" mode="out-in">
                {() => <Component key={route.path} />}
              </Transition>
            );
          },
        }}
      </RouterView>
    );
  },
});
