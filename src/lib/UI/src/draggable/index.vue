<template>
  <div class="draggable" @mousedown.stop.prevent="startEvent($event)">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  emits: ['on-move', 'on-end', 'on-start'],
  setup(props, { emit }) {
    // 开始位置
    let startX: number, startY: number, distanceX: number, distanceY: number
    // 鼠标按下
    function startEvent(event: Mouse) {
      // 判断鼠标按键
      if (event.button !== 0) return
      // 鼠标按下
      // this.isMove = true
      // 设置开始位置
      startX = event.pageX
      startY = event.pageY
      // 记录开始滚动条位置
      // this.startTop = this.screenTop
      // 设置移动事件 鼠标抬起事件
      document.addEventListener('mousemove', moveEvent, false)
      document.addEventListener('mouseup', endEvent, false)

      emit('on-start', { uuid: props.uuid })
    }

    // 拖拽移动事件
    function moveEvent(event: Mouse) {
      // 获取移动 时 x, y 位置
      const currentX = event.pageX
      const currentY = event.pageY
      // 计算 开始移动 到 此刻的 距离
      distanceX = currentX - startX
      distanceY = currentY - startY
      // 向父组件传递数据
      emit('on-move', { uuid: props.uuid, x: distanceX, y: distanceY })
    }

    // 拖拽结束事件
    function endEvent() {
      if (distanceX !== -1 && distanceY !== -1) {
        emit('on-end', { uuid: props.uuid, x: distanceX, y: distanceY })
      }
      // 清空数据
      distanceX = distanceY = -1

      // 移除移动事件 鼠标抬起事件
      document.removeEventListener('mousemove', moveEvent)
      document.removeEventListener('mouseup', endEvent)
    }


    return { startEvent }
  }
})
</script>

<style lang="less" scoped>
.draggable {
  position: absolute;
}
</style>
