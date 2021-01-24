import Easymde from 'easymde'
import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { assign } from 'lodash-es'

import 'easymde/dist/easymde.min.css'

import 'font-awesome/css/font-awesome.css'

import './index.less'

interface ChangeObj {
  origin: string
}

export default defineComponent({
  props: {
    value: {
      type: String,
      default: undefined
    },
    lineCount: {
      type: Number,
      default: undefined
    },
    configs: {
      type: Object,
      default: () => {
        return {}
      }
    },
    simplemde: {
      type: Object as PropType<Easymde>,
      default: () => {
        return {}
      }
    }
  },
  emits: ['update:value', 'update:lineCount', 'update:simplemde'],
  setup(props, { emit }) {
    const element = ref<HTMLElement>()

    const root = ref<HTMLElement>()

    const isValueUpdateFromInner = ref<Boolean>(false)

    const simplemde = ref<Easymde>()

    onMounted(() => initialize())

    // 实例化
    function initialize() {
      const configs = {
        element: element.value,
        autoDownloadFontAwesome: false,
        toolbarTips: false,
        maxHeight: `${((root.value?.clientHeight||15) - 32)}px`
      }

      assign(configs, props.configs)

      simplemde.value = new Easymde(configs)

      Easymde.toggleSideBySide(simplemde.value)

      emit('update:simplemde', simplemde.value)

      bindingEvents()
    }

    // 绑定事件
    function bindingEvents() {
      simplemde.value?.codemirror.on('change', (_instance: unknown, changeObj: ChangeObj) => {
        if (changeObj.origin === 'setValue') {
          return
        }

        handleInput(simplemde.value?.value() as string)

        handleRowCount(simplemde.value?.codemirror.lineCount())
      })
    }

    // 用户输入
    function handleInput(val: string) {
      isValueUpdateFromInner.value = true
      emit('update:value', val)
    }

    // 统计行数
    function handleRowCount(count: number) {
      emit('update:lineCount', count)
    }

    watch(
      () => props.value,
      (val) => {
        if (isValueUpdateFromInner.value) {
          isValueUpdateFromInner.value = false
        } else {
          simplemde.value?.value(val)
        }
      }
    )

    return () => (
      <div ref={root} class="public-editor">
        <textarea class="" ref={element} />
      </div>
    )
  }
})
