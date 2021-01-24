import type { App } from 'vue';
import setupTitle from './title'
import clickAway from './clickAway'

export default class DirectivesRegisterPlugin {
  static init(app: App) {
    // 设置 标题
    setupTitle(app)

    // 检测单击事件是否在元素外部发生
    clickAway(app)
  }
}