import type { App } from 'vue';
import { useAuthorities } from '/@/hooks/web/useAuthorities';
import { isString } from '/@/utils/is';




export default function (app: App) {
  app.directive('showByAuth', {
    mounted(el: Element, { value }) {
      // 空 或者 不是字符串
      if (!value || !isString(value)) return
      // 结果
      const result = useAuthorities([value])

      if (result) return


      el.remove()

    }
  })
}