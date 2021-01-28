import type { Menu as MenuType } from '/@/router/types'
import { defineComponent } from 'vue'
import { getMenus } from '/@/utils/helper/menu'
import { Tree } from 'ant-design-vue'

export default defineComponent({
  setup() {
    const menuItem: MenuType[] = getMenus()

    function renderMenuItem(menuList: MenuType[]) {
      return menuList.map((el) => {
        return (
          <Tree.TreeNode key={el.name}>
            {{
              title: () => el.title,
              default: () => renderMenuItem(el.children || [])
            }}
          </Tree.TreeNode>
        )
      })
    }

    return () => (
      <Tree blockNode={true} showLine={false} defaultExpandAll={true}>
        {{ default: () => renderMenuItem(menuItem) }}
      </Tree>

    )
  }
})
