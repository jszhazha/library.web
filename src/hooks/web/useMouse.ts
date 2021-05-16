

interface Mouse extends MouseEvent {
  button: 0 | 1 | 2
}

interface UseMouse {
  // 鼠标按下
  startEvent: () => void
}


export function useMouse(): UseMouse {
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
  }

  /**
    * @description 拖拽移动事件
    *
    */
  function moveEvent(event: Mouse) {
    // 获取移动 时 x, y 位置
    const currentX = event.pageX
    const currentY = event.pageY
    // 计算 开始移动 到 此刻的 距离
    distanceX = currentX - startX
    distanceY = currentY - startY
    this.$emit('on-move', { x: this.distanceX, y: this.distanceY })
  }

  /**
   * @description 拖拽结束事件
   *
   */
  function endEvent() {
    if (this.distanceX && this.distanceY) {
      this.$emit('on-end', { x: this.distanceX, y: this.distanceY + this.screenTop - this.startTop })
    }
    // 清空数据
    this.distanceX = ''
    this.distanceY = ''
    // 移除移动事件 鼠标抬起事件
    document.removeEventListener('mousemove', this.moveEvent)
    document.removeEventListener('mouseup', this.endEvent)
  },

  return { startEvent }
}