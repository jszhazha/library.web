import type { App } from 'vue';
import OperationInfoPanel from '/@/components/OperationInfoPanel.vue'
import GlobalButton from "/@/components/GlobalButton.vue";
import GlobalInput from "/@/components/GlobalInput.vue";
import GlobalTabel from '/@/components/GlobalTabel.vue'
import GlobalCard from '/@/components/GlobalCard.vue'


export default class ComponentRegisterPlugin {
  static init(app: App): void {
    app.component('GlobalButton', GlobalButton)
    app.component('GlobalInput', GlobalInput)
    app.component('GlobalTabel', GlobalTabel)
    app.component('GlobalCard', GlobalCard)
    app.component("OperationInfoPanel", OperationInfoPanel)
  }
}