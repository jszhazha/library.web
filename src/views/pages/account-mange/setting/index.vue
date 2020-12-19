<template>
  <div class="wrap ml-4 mr-4 mb-4 pt-4 pb-4 pr-4">
    <div class="left">
      <a-menu v-model:selectedKeys="selectedKeys" @click="handleClick">
        <a-menu-item key="base">
          基本设置
        </a-menu-item>
        <a-menu-item key="security">
          安全设置
        </a-menu-item>
        <a-menu-item key="custom">
          个性化设置
        </a-menu-item>
        <a-menu-item key="binding">
          账户绑定
        </a-menu-item>
      </a-menu>
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { useRouter } from "vue-router"
import { useGo } from "/@/hooks/web/usePage"

const INDEX_NAME = "account-manage-setting"

export default defineComponent({
  setup() {
    const selectedKeys = ref<string[]>()
    const { currentRoute } = useRouter()
    const currentName = currentRoute.value.name as string
    const pageGo = useGo()
    selectedKeys.value = [currentName.replace(new RegExp(`${INDEX_NAME}-`), "")]

    // 处理菜单点击
    function handleClick({ keyPath }: { keyPath: string[] }) {
      selectedKeys.value = keyPath
      pageGo({ name: `${INDEX_NAME}-${keyPath[0]}` })
    }

    return {
      selectedKeys,
      handleClick
    }
  }
})
</script>

<style lang="less" scoped>
.wrap {
  display: flex;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.left {
  width: 224px;
  border-right: 1px solid #e8e8e8;
}

.right {
  flex: 1;
}

.ant-menu-item-selected::after {
  opacity: 1;
  transform: scaleY(1);
}
</style>
