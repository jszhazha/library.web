<template>
  <div class="draggable" @mousedown.stop.prevent="startMove($event, 'mouse')">
    <slot />
    <div class="ew absolute size" @mousedown.stop.prevent="startMove($event, 'ew')" />
    <div class="ns absolute size" @mousedown.stop.prevent="startMove($event, 'ns')" />
    <div class="se absolute size" @mousedown.stop.prevent="startMove($event, 'se')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type Type = 'mouse' | 'ew' | 'ns' | 'se'

export default defineComponent({
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  emits: ['on-move', 'on-end', 'on-start', 'on-resize'],
  setup(props, { emit }) {
    // 开始位置
    let startX: number, startY: number, distanceX: number, distanceY: number
    // 事件名称

    let eventType: Type
    // 鼠标按下
    function startMove(event: Mouse, name: Type) {
      // 判断鼠标按键
      if (event.button !== 0) return
      // 鼠标按下
      // this.isMove = true
      // 设置开始位置
      startX = event.pageX
      startY = event.pageY
      // 事件类型
      eventType = name
      // 记录开始滚动条位置
      // this.startTop = this.screenTop
      // 设置移动事件 鼠标抬起事件
      document.addEventListener('mousemove', moving, false)
      document.addEventListener('mouseup', endMove, false)

      emit('on-start', { uuid: props.uuid, type: eventType })
    }

    // 拖拽移动事件
    function moving(event: Mouse) {
      // 获取移动 时 x, y 位置
      const currentX = event.pageX
      const currentY = event.pageY
      // 计算 开始移动 到 此刻的 距离
      distanceX = currentX - startX
      distanceY = currentY - startY

      emit('on-move', { uuid: props.uuid, x: distanceX, y: distanceY, type: eventType })
    }

    // 拖拽结束事件
    function endMove() {
      emit('on-end', { uuid: props.uuid, x: distanceX, y: distanceY, type: eventType })

      // 清空数据
      distanceX = distanceY = 0

      // 移除移动事件 鼠标抬起事件
      document.removeEventListener('mousemove', moving)
      document.removeEventListener('mouseup', endMove)
    }

    return { startMove }
  }
})
</script>

<style lang="less" scoped>
.draggable {
  position: absolute;
}

.ew {
  top: 50%;
  right: 0;
  cursor: ew-resize;
  transform: translateY(-50%) rotate(315deg);
}

.ns {
  bottom: 0;
  left: 50%;
  cursor: ns-resize;
  transform: translateX(-50%) rotate(45deg);
}

.se {
  right: 0;
  bottom: 0;
  cursor: se-resize;
}

.size {
  width: 5px;
  height: 5px;
  border-right: 2px solid rgba(0, 0, 0, 0.4);
  border-bottom: 2px solid rgba(0, 0, 0, 0.4);
}
</style>
