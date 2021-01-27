import type { Menu as MenuType } from '/@/router/types'
import { defineComponent } from 'vue'
import { getMenus } from '/@/utils/helper/menu'
import { Tree } from 'ant-design-vue'

export default defineComponent({
  setup() {
    const menuItem: MenuType[] = getMenus()

    function renderMenuItem(menuList: MenuType[]) {
      return menuList.map((el) => {
        if (el.children) {
          return (
            <Tree.TreeNode>
              {{
                title: () => el.title,
                default: () => renderMenuItem(el.children!)
              }}
            </Tree.TreeNode>
          )
        }

        return (
          <Tree.TreeNode>
            {{
              title: () => el.title
            }}
          </Tree.TreeNode>
        )
      })
    }

    return () => (
      <div class="bg-white w-260 br-8 pt-2">
        <Tree.DirectoryTree >
          {{ default: () => renderMenuItem(menuItem) }}
        </Tree.DirectoryTree>
      </div>
    )
  }
})
