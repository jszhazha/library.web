import type { App } from 'vue';
import GlobalButton from "/@/components/GlobalButton.vue";
import GlobalInput from "/@/components/GlobalInput.vue";


export default class ComponentRegisterPlugin {
  static init(app: App): void {
    app.component('GlobalButton', GlobalButton)
    app.component('GlobalInput', GlobalInput)
  }
}