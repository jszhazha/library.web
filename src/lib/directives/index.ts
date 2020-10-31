import type { App } from 'vue';
import setupTitle from './title'

export default class DirectivesRegisterPlugin {
  static init(app: App) {
    // 设置 标题
    setupTitle(app)
  }
}