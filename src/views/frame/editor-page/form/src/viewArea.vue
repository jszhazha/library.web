<template>
  <Scrollbar>
    <div class="view-area">
      <div
        class="view-area-panel relative"
        :style="panelStyle"
        @drop="handleDrop"
        @dragover.prevent
        @dragenter="handleDragenter"
        @dragleave="handleDragleave"
      >
        <draggable v-for="item in pointData" :key="item.uuid" :uuid="item.uuid">
          <component :is="item.name" />
        </draggable>
      </div>
    </div>
  </Scrollbar>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, CSSProperties } from 'vue'
import { Scrollbar } from '/@/components/Scrollbar'
import { moduleList } from '../components/tools/index'
import { buildUUID } from '/@/utils/uuid'
import { Draggable } from '/@/lib/UI/'
import { pointStore } from '/@/store/modules/point'

export default defineComponent({
  components: { Scrollbar, Draggable, ...moduleList },
  setup() {
    // 面板样式
    const panelStyle = reactive<CSSProperties>({})

    // 在一个拖动过程中，释放鼠标键时触发此事件
    function handleDrop(event: DragEvent) {
      // 清除透明样式
      panelStyle.opacity = 1
      // 获取传来的数据
      const name = event.dataTransfer?.getData('name')
      // 获取数据位置
      const { offsetX, offsetY } = event
      // 计算位置
      const x = offsetX
      const y = offsetY
      // 添加数据
      pointStore.commitPointState({ x, y, uuid: buildUUID(), name: `${name}Module` })
    }

    // 当被鼠标拖动的对象进入其容器范围内时触发此事件
    function handleDragenter() {
      panelStyle.opacity = 0.7
    }

    // 当被鼠标拖动的对象离开其容器范围内时触发此事件
    function handleDragleave() {
      panelStyle.opacity = 1
    }

    // 拖拽数据信息
    const pointData = computed(() => pointStore.getPointState)

    return { pointData, handleDrop, panelStyle, handleDragenter, handleDragleave }
  }
})
</script>

<style lang="less" scoped>
.view-area {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 70px 0 70px;

  &-panel {
    width: 90%;
    min-height: 100%;
    background: #fff;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  }
}
</style>