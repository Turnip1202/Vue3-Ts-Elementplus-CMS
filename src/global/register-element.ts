import { App } from 'vue'
import 'element-plus/lib/theme-chalk/base.css'
import {
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElRadio,
  ElTabPane,
  ElTabs,
  ElContainer,
  ElAside,
  ElMain,
  ElHeader,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElCol,
  ElRow,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElCard,
  ElDescriptions,
  ElDescriptionsItem
} from 'element-plus'

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElMain,
  ElHeader,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElCol,
  ElRow,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElImage,
  ElDialog,
  ElTree,
  ElCard,
  ElDescriptions,
  ElDescriptionsItem
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}