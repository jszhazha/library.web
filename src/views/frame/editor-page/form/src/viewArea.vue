<template>
  <Scrollbar>
    <div class="view-area">
      <div
        class="view-area-panel relative"
        :style="panelStyle"
        @drop="handleDrag"
        @dragover.prevent
        @dragenter="handleDragenter"
        @dragleave="handleDragleave"
      >
        <!-- 拖拽组件 -->
        <draggable
          v-for="item in pointData"
          :key="item.uuid"
          class="view-item"
          :uuid="item.uuid"
          :style="pointStyle[item.uuid]"
          :hover="curState.hover === item.uuid"
          @on-end="handleMoveEnd"
          @on-move="handleMove"
          @on-start="handleMoveStart"
          @mouseenter="mouseenter(item.uuid)"
          @mouseleave="mouseleave"
        >
          <component :is="item.name" />
        </draggable>

        <!-- 标线 -->
        <mark-line />
      </div>
    </div>
  </Scrollbar>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, CSSProperties, unref } from 'vue'
import { Scrollbar } from '/@/components/Scrollbar'
import { moduleList } from '../components/tools/index'
import { buildUUID } from '/@/utils/uuid'
import { Draggable } from '/@/lib/UI/'
import { pointStore } from '/@/store/modules/point'
import markLine from '../components/mark-line.vue'

export default defineComponent({
  components: { Scrollbar, Draggable, ...moduleList, markLine },
  setup() {
    // 面板样式
    const panelStyle = reactive<CSSProperties>({})
    // 拖拽数据信息
    const pointData = computed(() => pointStore.getPointState)
    // 拖拽数据样式
    const pointStyle = reactive<Indexable<CSSProperties>>({})
    // 当前状态
    const curState = reactive<{ hover?: string; isMove?: boolean }>({})

    // 在一个拖动过程中，释放鼠标键时触发此事件
    function handleDrag(event: DragEvent) {
      // 清除透明样式
      panelStyle.opacity = 1
      // 获取传来的数据
      const { name, offset } = JSON.parse(event.dataTransfer?.getData('tool') || '')
      // 获取数据位置
      const { offsetX, offsetY } = event
      // 计算位置
      const x = offsetX - offset.x
      const y = offsetY - offset.y
      console.log(x, y)
      // 唯一值
      const uuid = buildUUID()
      // 设置样式
      pointStyle[uuid] = {}
      pointStyle[uuid].transform = `translate(${x}px,${y}px)`
      // 添加数据
      pointStore.commitAddPointState({ x, y, uuid, name: `${name}Module` })
    }

    // 当被鼠标拖动的对象进入其容器范围内时触发此事件
    function handleDragenter() {
      panelStyle.opacity = 0.7
    }

    // 当被鼠标拖动的对象离开其容器范围内时触发此事件
    function handleDragleave() {
      panelStyle.opacity = 1
    }

    // 处理移动
    function handleMove({ uuid, x, y }: { uuid: string; x: number; y: number }) {
      const pos = handlePosition({ x, y }, uuid)
      // 设置样式
      pointStyle[uuid].transform = `translate(${pos.x}px,${pos.y}px)`
    }

    // 处理移动结束
    function handleMoveEnd({ uuid, x, y }: { uuid: string; x: number; y: number }) {
      const pos = handlePosition({ x, y }, uuid)
      // 更新数据
      pointStore.commitUpdatePointState({ uuid, key: 'x', value: pos.x as never })
      pointStore.commitUpdatePointState({ uuid, key: 'y', value: pos.y as never })
      // 设置鼠标弹起
      curState.isMove = false
    }

    // 处理移动开始
    function handleMoveStart({}: { uuid: string }) {
      // 设置鼠标按下
      curState.isMove = true
    }

    //  位置信息处理
    function handlePosition(pos: { x: number; y: number }, uuid: string) {
      const point = unref(pointData).find((el) => el.uuid === uuid)
      const x = pos.x + (point?.x || 0)
      const y = pos.y + (point?.y || 0)
      return { x, y }
    }

    // 处理鼠标进入
    function mouseenter(uuid: string) {
      !curState.isMove && (curState.hover = uuid)
    }

    // 处理鼠标离开
    function mouseleave() {
      !curState.isMove && (curState.hover = '')
    }

    return {
      curState,
      pointData,
      pointStyle,
      panelStyle,
      mouseenter,
      mouseleave,
      handleMove,
      handleMoveEnd,
      handleMoveStart,
      handleDrag,
      handleDragenter,
      handleDragleave
    }
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

  .view-item {
    border: 2px solid transparent;

    &[hover='true'] {
      cursor: move;
      border-color: @primary-color;
    }
  }
}
</style>
