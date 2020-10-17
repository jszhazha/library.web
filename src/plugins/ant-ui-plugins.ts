
import type { App } from 'vue';

import { Button } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


export default class AntUiPlugins {
  static init(app: App<Element>): void {
    app.use(Button)
  }
}