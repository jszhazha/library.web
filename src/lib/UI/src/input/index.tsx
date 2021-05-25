import { defineComponent, inject } from 'vue'
import { Input } from 'ant-design-vue'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: (v: string): boolean => ['text', 'number'].includes(v)
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const instance = inject('editor-form') as (prop: string) => void

    // 	输入框内容变化时的回调
    function handlChange(e: InputEvent) {
      const value = (e.target! as HTMLInputElement).value
      emit('update:value', props.type === 'number' ? value.replace(/[^0-9]+/g, '') : value)
      // 传递改变数据
      instance(props.prop)
    }

    return () => <Input value={props.value} placeholder="请输入" onChange={handlChange} />
  }
})
