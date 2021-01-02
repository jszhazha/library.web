<template>
  <div class="header-right-action">
    <slot />
    <Button type="primary" class="ml-8" @click="onLoginButton">
      登 录
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { Button } from "/@/lib/UI/"
import { useGo } from "/@/hooks/web/usePage"
import { PageEnum } from "/@/enums/pageEnum"

export default defineComponent({
  components: { Button },
  setup() {
    const pageGo = useGo()
    function onLoginButton() {
      pageGo({ name: PageEnum.BASE_LOGIN })
    }
    return { onLoginButton }
  }
})
</script>

<style lang="less" scoped>
.header-right-action {
  display: inline-flex;
  align-items: center;
}
</style>