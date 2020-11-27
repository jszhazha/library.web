import {  onMounted } from "vue";
import { parsePageModeFromString, PageMode } from "/@/utils/helper/breadcrumb";
import { isBoolean, isString, isStrNum } from "/@/utils/is";
import useToast from "/@/components/Toast";


export interface QueryRoute {
  id?: string;

  mode: string;
}


// 检查路由是否合法 并返回页面模式
export function checkDataRouter(query: QueryRoute): number {
  const { id, mode } = query;
  // 解析路由
  const pageMode = parsePageModeFromString(mode);
  // 设置报错内容
  let description: string | boolean = false;
  // 判断 mode , id 是否正确
  if (isBoolean(pageMode)) {
    description = "记录的 MODE 值不合法, 请修改后再次尝试";
  } else if (pageMode.mode !== PageMode.new && !isStrNum(id!)) {
    description = "记录的 ID 值不合法, 请修改后再次尝试";
  }
  // 判断 description 类型 字符串 -> 弹出提示框
  if (isString(description)) {
    onMounted(() => useToast.error(description));
  }
  // 输出结果
  return isBoolean(pageMode) ? PageMode.view : pageMode.mode;
}