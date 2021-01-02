import { defineComponent } from "vue"
import HeaderLeft from "./HeaderLeft.vue"
import HeaderRight from "./HeaderRight.vue"

export default defineComponent({
  setup(_props, { slots }) {
    return () => (
      <header class="index-space-between p-2 pr-10 pl-4">
        <HeaderLeft>{() => slots.left && slots.left()}</HeaderLeft>
        <HeaderRight>{() => slots.right && slots.right()}</HeaderRight>
      </header>
    )
  }
})