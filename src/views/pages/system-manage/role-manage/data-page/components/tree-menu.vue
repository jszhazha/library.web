<template>
  <Scrollbar class="tree-menu">
    <a-directory-tree
      v-model:checkedKeys="checkedKeys"
      checkable
      class="tree-menu"
      :disabled="readonly"
      :selected-keys="[]"
      :tree-data="treeData"
      :show-icon="false"
    />
  </Scrollbar>
</template>

<script lang="ts">
import type { Menu as MenuType } from '/@/router/types'
import { defineComponent, ref, unref, watch } from 'vue'
import { getMenus } from '/@/utils/helper/menu'
import { Scrollbar } from '/@/components/Scrollbar'
import { cloneDeep, debounce, keys, uniq } from 'lodash-es'
import service, { ModuleManage } from '/@/api/system-manage/module-manage'
import { message } from 'ant-design-vue'

interface TreeData extends MenuType {
  disabled?: boolean

  checkable?: boolean

  key?: string
}

export default defineComponent({
  components: { Scrollbar },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const loading = ref<boolean>(false)

    const treeData = ref<TreeData[]>([])

    const moudleData = ref<ModuleManage[]>([])

    const checkedKeys = ref<number[]>([])

    const isValueUpdateFromInner = ref<boolean>(false)

    const setAuthValue = debounce(() => {
      const checked = unref(checkedKeys)
      const data = unref(moudleData).filter((el) => checked.includes(el.id!))
      const authValue = data.map((el) => keys(JSON.parse(el.authorities!)))
      isValueUpdateFromInner.value = true
      emit('update:value', uniq(authValue.flat()))
    }, 1000)

    // 请求服务器数据
    async function fetchDataFromServer() {
      try {
        loading.value = true
        const { data } = await service.fecthList({ size: 1000 })
        moudleData.value = data.content
        treeData.value = handleTreeData(getMenus(false))
      } catch (err) {
        message.error(`数据加载失败: ${err.msg}`)
      } finally {
        loading.value = false
      }
    }

    // 处理tree数据
    function handleTreeData(source: TreeData[]) {
      const data: TreeData[] = []
      for (const item of source) {
        const value = cloneDeep(item)
        if (value.children) {
          value.children = handleTreeData(value.children)
        } else {
          const authData = moudleData.value.filter(({ name }) => name === value.name)
          value.children = authData.map((el) => {
            validChecked(el.authorities!, el.id!)
            return { path: '', key: el.id, title: el.description }
          })
        }
        data.push(value)
      }
      return data
    }

    // 检测是否选中
    function validChecked(authorities: string, id: number) {
      const auth = JSON.parse(authorities)
      if (keys(auth).every((name) => props.value.includes(name))) {
        checkedKeys.value.push(id)
      }
    }

    // 处理是否选中
    function handleChecked(source: TreeData[]) {
      for (const item of source) {
        if (item.children) {
          handleChecked(item.children)
        } else {
          const authData = moudleData.value.filter(({ id }) => id === item.key)
          authData.forEach((el) => validChecked(el.authorities!, el.id!))
        }
      }
    }

    watch(
      () => props.value,
      () => {
        if (loading.value) return
        if (isValueUpdateFromInner.value) {
          isValueUpdateFromInner.value = false
        } else {
          checkedKeys.value.splice(1, checkedKeys.value.length)
          handleChecked(treeData.value)
        }
      }
    )

    watch(() => checkedKeys.value, setAuthValue)

    fetchDataFromServer()

    return { treeData, checkedKeys }
  }
})
</script>

<style lang="less" scoped>
.tree-menu {
  height: 500px;
  background: var(--theme-background);
  border-radius: var(--public-order-radius);
}
</style>
