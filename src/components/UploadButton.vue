<template>
  <div @click="openFile">
    <input ref="inputRef" type="file" :accept="accept" class="display-none" @change="handleFiles">
    <a-button><LoadingOutlined v-if="loading" />{{ title }}</a-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { userStore } from '/@/store/modules/user'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '批量导入'
    },
    accept: {
      type: String,
      default: ''
    }
  },
  emits: ['on-batch-import'],
  setup(_props, { emit }) {
    const inputRef = ref<{ click: () => void; files: Blob[] }>()

    const loading = ref<boolean>(false)

    // 设置上传的请求头部
    const headers = computed(() => {
      return { [userStore.getTokenState?.headerName as string]: userStore.getTokenState?.token }
    })

    // 打开选中文件
    function openFile() {
      inputRef.value?.click()
    }

    // 出来文件
    function handleFiles() {
      const file = inputRef.value?.files[0]
      const formData = new FormData()
      formData.append('file', file as Blob)
      emit('on-batch-import', formData)
    }

    return { headers, inputRef, loading, openFile, handleFiles }
  }
})
</script>

<style lang="less" scoped></style>
