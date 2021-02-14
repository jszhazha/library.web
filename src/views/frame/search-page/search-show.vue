<template>
  <div>21</div>
</template>

<script lang="ts">
import { defineComponent, unref } from 'vue'
import { useRouter } from 'vue-router'
import service from '/@/api/anonymous'
import { validData } from '/@/utils/regExp'

export default defineComponent({
  setup() {
    const { currentRoute } = useRouter()

    async function fetchDataByService() {
      const { params } = unref(currentRoute)
      console.log(params.id)
      if (!validData({ data: params.id as string, rule: 'digital' })) return
      const { data } = await service.fecthBookByAny(parseInt(params.id as string))
      console.log(data)
    }

    fetchDataByService()

    return {}
  }
})
</script>

<style lang="less" scoped></style>
