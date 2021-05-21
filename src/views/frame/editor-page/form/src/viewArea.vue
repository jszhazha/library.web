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
          <component :is="item.name" :uuid="item.uuid" :title="item.uuid" />
        </draggable>

        <!-- 标线 -->
        <mark-line :uuid="curState.uuid" :move="curState.pos" @on-suck="setPointStyle" />
      </div>
    </div>
  </Scrollbar>
</template>

<script lang="ts">
import type { PointInfo } from '/@/lib/interface/PointInfo'
import { defineComponent, computed, reactive, CSSProperties, unref } from 'vue'
import { Scrollbar } from '/@/components/Scrollbar'
import { pointList } from '../components/tools/index'
import { buildUUID } from '/@/utils/uuid'
import { Draggable } from '/@/lib/UI/'
import { pointStore } from '/@/store/modules/point'
import { schemaList } from '../components/tools/schema'
import markLine from '../components/mark-line.vue'
import { assign, cloneDeep } from 'lodash-es'

interface CurState {
  // 选择鼠标指针浮动在其上的元素
  hover?: string
  // 是否移动
  isMove?: boolean
  // 唯一值
  uuid?: string
  // 当前位置
  pos?: Pick<PointInfo, 'x' | 'y' | 'width' | 'height'>
}

export default defineComponent({
  components: { Scrollbar, Draggable, ...pointList, markLine },
  setup() {
    // 面板样式
    const panelStyle = reactive<CSSProperties>({})
    // 拖拽数据信息
    const pointData = computed(() => pointStore.getPointState)
    // 拖拽数据样式
    const pointStyle = reactive<Indexable<CSSProperties>>({})
    // 当前状态
    const curState = reactive<CurState>({})

    // 在一个拖动过程中，释放鼠标键时触发此事件
    function handleDrag(event: DragEvent) {
      // 清除透明样式
      panelStyle.opacity = 1
      // 获取传来的数据
      const { name, offset } = JSON.parse(event.dataTransfer?.getData('tool') || '')
      // 获取数据位置
      const { offsetX, offsetY } = event
      // 计算位置 设置中间对齐
      const x = offsetX + offset.x
      const y = offsetY + offset.y
      // 唯一值
      const uuid = buildUUID()

      const schema = cloneDeep(schemaList[`${name}-point`])

      assign(schema, { x, y, uuid, name: `${name}-point` })

      // 设置样式
      pointStyle[uuid] = {}
      pointStyle[uuid].transform = `translate(${x}px,${y}px)`
      // 添加数据
      pointStore.commitAddPointState(schema)
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
      // 记录位置
      curState.pos = pos
      // 设置样式
      setPointStyle({ uuid, x: pos.x, y: pos.y })
    }

    // 处理移动结束
    function handleMoveEnd({ uuid }: { uuid: string; x: number; y: number }) {
      // 更新数据
      pointStore.commitUpdatePointState({ uuid, key: 'x', value: curState.pos?.x as never })
      pointStore.commitUpdatePointState({ uuid, key: 'y', value: curState.pos?.y as never })
      // 设置鼠标弹起
      curState.isMove = false
      curState.uuid = ''
    }

    // 处理移动开始
    function handleMoveStart({ uuid }: { uuid: string }) {
      // 设置鼠标按下
      curState.isMove = true
      curState.uuid = uuid
    }

    // 设置移动样式
    function setPointStyle({ uuid, x, y }: { uuid: string; x: number; y: number }) {
      curState.pos!.x = x
      curState.pos!.y = y
      // 设置样式
      pointStyle[uuid].transform = `translate(${x}px,${y}px)`
    }

    //  位置信息处理
    function handlePosition(pos: { x: number; y: number }, uuid: string) {
      const point = unref(pointData).find((el) => el.uuid === uuid)
      const x = pos.x + (point?.x || 0)
      const y = pos.y + (point?.y || 0)
      const width = point?.width
      const height = point?.height
      return { x, y, width, height }
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
      handleDragleave,
      setPointStyle
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
    border: 1px solid transparent;
    box-sizing: border-box;

    &[hover='true'] {
      cursor: move;
      border-color: @primary-color;
    }
  }
}
</style>
