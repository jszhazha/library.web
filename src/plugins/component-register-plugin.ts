import type { App } from 'vue';
import OperationInfoPanel from '/@/components/OperationInfoPanel.vue'
import GlobalButton from "/@/components/GlobalButton.vue";
import GlobalInput from "/@/components/GlobalInput.vue";
import GlobalTable from '/@/components/GlobalTable.vue'
import GlobalDataPage from '/@/components/GlobalDataPage.vue'
import GlobalCard from '/@/components/GlobalCard.vue';
import GlobalPopconfirm from '/@/components/GlobalPopconfirm.vue'
import TableList from '/@/components/TableList/index.vue';
import ImportModal from '/@/components/ImportModal.vue'
import Icon from '/@/components/Icon'

export default class ComponentRegisterPlugin {
  static init(app: App): void {
    app.component('Icon', Icon)
    app.component('GlobalCard', GlobalCard).component('GlobalInput', GlobalInput)
    app.component("GlobalTable", GlobalTable).component('GlobalButton', GlobalButton)
    app.component('GlobalDataPage', GlobalDataPage).component('GlobalPopconfirm', GlobalPopconfirm)
    app.component('TableList', TableList).component('ImportModal', ImportModal)
    app.component("OperationInfoPanel", OperationInfoPanel)

  }
}