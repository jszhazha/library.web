<template>
  <Scrollbar>
    <div class="view-area">
      <div class="view-area-panel" @drop="handleDrop" @dragover.prevent>
        <!-- 123 -->
        <component :is="itme.name" v-for="itme in dataItem" :key="itme.uuid" />
      </div>
    </div>
  </Scrollbar>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { Scrollbar } from '/@/components/Scrollbar'
import { moduleList } from '../components/tools/index'
import { buildUUID } from '/@/utils/uuid'

interface DataItem {
  // 唯一值
  uuid: string

  // 模块名称
  name: string
}

export default defineComponent({
  components: { Scrollbar, ...moduleList },
  setup() {
    // 数据
    const dataItem = reactive<DataItem[]>([])
    // 添加模块名称, 视图渲染数据
    const addModule = (data: DataItem) => dataItem.push(data)

    // 在一个拖动过程中，释放鼠标键时触发此事件
    function handleDrop(event: DragEvent) {
      // 获取传来的数据
      const name = event.dataTransfer?.getData('name')
      // 添加数据
      addModule({ uuid: buildUUID(), name: `${name}Module` })
    }

    return { dataItem, handleDrop }
  }
})
</script>

<style lang="less" scoped>
.view-area {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 70px 0 70px;

  &-panel {
    width: 90%;
    min-height: 700px;
    background: #fff;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  }
}
</style>