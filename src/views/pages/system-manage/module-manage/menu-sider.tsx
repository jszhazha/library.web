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

    function onSelect(selectedKeys: string[]) {
      console.log(selectedKeys)
    }
    return () => (
      <Tree blockNode={false} showLine={false} showIcon={false} onSelect={onSelect}>
        {{ default: () => renderMenuItem(menuItem) }}
      </Tree>
    )
  }
})
