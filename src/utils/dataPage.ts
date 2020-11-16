import { unref } from 'vue'
import { useRouter } from "vue-router";
import { parsePageModeFromString } from "/@/utils/helper/breadcrumb";
import { useMessage } from '/@/hooks/web/useMessage'
import { isBoolean } from "/@/utils/is";

interface DataPageMix {
  closePage: () => void
}

export function dataPageMix(): DataPageMix {
  const { back, currentRoute } = useRouter()
  const { query } = unref(currentRoute)
  const pageMode = parsePageModeFromString(query.mode as string);
  const { notification } = useMessage()
  let description = '记录的 ID 值不合法，要求非空并大于 0"'
  if (isBoolean(pageMode)) {
    description = '记录的 MODE 值不合法, 没有查询到该页面模式'
  }

  console.log(pageMode)
  notification.error({
    message: '错误',
    description,
  })


  const closePage = () => {
    back()
    console.log()
  }




  return { closePage }
}