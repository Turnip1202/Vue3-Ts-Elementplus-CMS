<template>
  <div class="user">
    <page-search
      :search-form-config="searchFormConfig"
      @reset-btn-click="handleResetClick"
      @query-btn-click="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :content-table-config="contentTableConfig"
      page-name="users"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    ></page-content>
    <div class="page-modal">
      <page-modal
        ref="pageModalRef"
        page-name="users"
        :modal-table-config="modalConfigRef"
        :defaultInfo="defaultInfo"
      ></page-modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal/'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { usePageSearch } from '@/hooks/usePageSearch'
import { userPageModal } from '@/hooks/use-page-modal'
import { modalTableConfig } from './config/modal.config'
import { useStore } from '@/store'
import { computed } from 'vue'
const [handleQueryClick, handleResetClick, pageContentRef] = usePageSearch()
// 1.用来决定密码框的显示和隐藏
const newCallback = () => {
  const passwordItem = modalTableConfig.formItems.find(
    (item) => item.field === 'password'
  )
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  passwordItem!.isHidden = false
}
const editCallback = () => {
  const passwordItem = modalTableConfig.formItems.find(
    (item) => item.field === 'password'
  )
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  passwordItem!.isHidden = true
}
// 2.动态添加部门和角色列表
const store = useStore()
const modalConfigRef = computed(() => {
  const departmentItem = modalTableConfig.formItems.find(
    (item) => item.field === 'departmentId'
  )
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  departmentItem!.options = store.state.entireDepartment.map((item) => {
    return { title: item.name, value: item.id }
  })
  const roleItme = modalTableConfig.formItems.find(
    (item) => item.field === 'roleId'
  )
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  roleItme!.options = store.state.entireRole.map((item) => {
    return { title: item.name, value: item.id }
  })
  return modalTableConfig
})

// 3.调用hook获取公共变量和函数
const [pageModalRef, defaultInfo, handleEditData, handleNewData] =
  userPageModal(newCallback, editCallback)
</script>

<style scoped></style>
