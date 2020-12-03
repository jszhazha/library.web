import { defineComponent } from "vue"
import config from "/@/config/"

export default defineComponent({
  props: {
    mainClass: {
      type: String,
      default: ""
    }
  },
  setup(props, { attrs }) {
    return () => (
      <div class={[attrs.class, "index-middle", "pbulic-header"]}>
        <div class={["pbulic-header-main", "index-middle", props.mainClass]}>
          <img src={config.logo} />
          <div class="pbulic-header-title">{config.title}</div>
        </div>
      </div>
    )
  },
})
