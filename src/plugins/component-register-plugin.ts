import type { App } from 'vue'
import OperationInfoPanel from '/@/components/OperationInfoPanel.vue'
import GlobalButton from "/@/components/GlobalButton.vue"
import GlobalInput from "/@/components/GlobalInput.vue"
import GlobalTable from '/@/components/GlobalTable.vue'
import GlobalDataPage from '/@/components/GlobalDataPage.vue'
import GlobalCard from '/@/components/GlobalCard.vue'
import TableList from '/@/components/TableList/index.vue'
import ImportModal from '/@/components/ImportModal.vue'
import DownOutButton from '/@/components/DownOutButton.vue'
import InputWrap from '/@/components/InputWrap.vue'
import TextareaWrap from '/@/components/TextareaWrap.vue'
import PublicHeader from '/@/components/PublicHeader/index'
import Icon from '/@/components/Icon'
import SelectWrap from '/@/components/SelectWrap.vue'
import PaginationWrap from '/@/components/PaginationWrap.vue'
import DatePickerWrap from '/@/components/DatePickerWrap.vue'
import BookCategorySearchSelect from '/@/components/SearchSelect/BookCategory.vue'

export default class ComponentRegisterPlugin {
  static init(app: App): void {
    app.component('Icon', Icon).component('InputWrap', InputWrap)
    app.component('GlobalCard', GlobalCard).component('GlobalInput', GlobalInput)
    app.component("GlobalTable", GlobalTable).component('GlobalButton', GlobalButton)
    app.component('GlobalDataPage', GlobalDataPage).component("PublicHeader", PublicHeader)
    app.component('TableList', TableList).component('ImportModal', ImportModal)
    app.component("OperationInfoPanel", OperationInfoPanel).component('DownOutButton', DownOutButton)
    app.component("SelectWrap", SelectWrap).component("PaginationWrap", PaginationWrap)
    app.component('BookCategorySearchSelect', BookCategorySearchSelect)
    app.component('TextareaWrap', TextareaWrap).component('DatePickerWrap', DatePickerWrap)

  }
}