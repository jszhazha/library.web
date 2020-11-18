
import type { App } from 'vue';

import antUiPlugins from '/@/plugins/ant-ui-plugins'

import componentRegisterPlugin from '/@/plugins/component-register-plugin'

import ToastPlugins from '/@/plugins/toast-plugins'


export default class PluginsIniter {
  static init(app: App<Element>): void {
    // UI 按需加载
    antUiPlugins.init(app)

    // 全局组件注入
    componentRegisterPlugin.init(app)

    // 消息通知
    ToastPlugins.init(app)

  }
}