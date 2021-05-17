<template>
  <div
    v-for="line in lines"
    v-show="lineStatus[line]"
    :key="line"
    class="line"
    :class="line.includes('x') ? 'xline' : 'yline'"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, PropType, watch } from 'vue'
import { pointStore } from '/@/store/modules/point'

type line = 'xt' | 'xc' | 'xb' | 'yl' | 'yc' | 'yr'

export default defineComponent({
  props: {
    move: {
      type: Object as PropType<{ x?: number; y?: number }>,
      default: () => ({})
    }
  },
  setup(props) {
    // 相距 dff 像素将自动吸附
    const diff = 3
    // 分别对应三条横线和三条竖线
    const lines = ref<line[]>(['xt', 'xc', 'xb', 'yl', 'yc', 'yr'])
    // 线条状态
    const lineStatus = reactive<{ [key: string]: boolean }>({})
    // 拖拽数据信息
    const pointData = computed(() => pointStore.getPointState)

    // 展示线条
    function showLine() {
      
    }

    watch(
      () => props.move,
      () => showLine()
    )

    return { lines, lineStatus }
  }
})
</script>

<style lang="less" scoped>
.line {
  position: absolute;
  background: #0050b3;
}

.xline {
  width: 100%;
  height: 1px;
}

.yline {
  width: 1px;
  height: 100%;
}
</style>
