<script lang="ts">
import type { Menu as MenuType } from '/@/router/types'
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'
import { getMenus } from '/@/utils/helper/menu'
import { Tree } from 'ant-design-vue'

export default defineComponent({
  setup() {
    const menuItem: MenuType[] = getMenus()

    function renderMenuItem(menuList: MenuType[]): VNode[] {
      return menuList.map((el) => {
        return h(
          Tree.TreeNode,
          { props: { key: el.name, title: el.title } },
          {
            default: () => renderMenuItem(el.children || [])
          }
        )
      })
    }

    console.log(renderMenuItem(menuItem))

    return () =>
      h(Tree.DirectoryTree, {}, { default: () => renderMenuItem(menuItem) })
  }
})
</script>

<style lang="less" scoped></style>
