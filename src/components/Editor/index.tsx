import simplemde from 'simplemde'
import { defineComponent, onMounted, ref } from 'vue'

import 'simplemde/dist/simplemde.min.css'

export default defineComponent({
  setup() {
    const element = ref<HTMLElement>()

    onMounted(() => initialize())

    // 实例化
    function initialize() {
      const configs = {
        element: element.value
      }

      new simplemde(configs)
    }

    return () => <textarea ref={element} />
  }
})
