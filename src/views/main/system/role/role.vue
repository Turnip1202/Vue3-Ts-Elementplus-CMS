<template>
  <div class="role">
    <page-search :search-form-config="searchFormConfig"></page-search>
    <page-content
      :content-table-config="contentTableConfig"
      page-name="role"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    ></page-content>
    <page-modal
      :other-info="otherInfo"
      :modal-table-config="modalTableConfig"
      page-name="role"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, nextTick } from 'vue'
import PageSearch from '@/components/page-search/src/page-search.vue'
import PageContent from '@/components/page-content/src/page-content.vue'
import PageModal from '@/components/page-modal'
import { userPageModal } from '@/hooks/use-page-modal'
import { searchFormConfig } from './config/searchFormConfig'
import { contentTableConfig } from './config/contentTableConfig'
import { modalTableConfig } from './config/modal.config'
import { useStore } from '@/store'
import { ElTree } from 'element-plus'
import { menuMapLeafKeys } from '@/utils/map-menus'
// 3.调用hook获取公共变量和函数
const elTreeRef = ref<InstanceType<typeof ElTree>>()
const editCallback = (item: any) => {
  const leafKeys = menuMapLeafKeys(item.menuList)
  nextTick(() => {
    console.log(elTreeRef.value)
    elTreeRef.value?.setCheckedKeys(leafKeys, false)
  })
}
const [pageModalRef, defaultInfo, handleEditData, handleNewData] =
  userPageModal(undefined, editCallback)

const store = useStore()
const menus = computed(() => store.state.entireMenu)
const otherInfo = ref({})
const handleCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = { menuList }
}
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
