<template>
  <div class="page-content">
    <tk-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleNewClick"
          >新建用户</el-button
        >
      </template>
      <!-- 列表中的插槽 -->
      <template #status="user_scope">
        <el-button
          size="mini"
          plain
          :type="user_scope.row.enable ? 'success' : 'danger'"
          >{{ user_scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="user_scope">
        <strong>{{ $fliters.formatTime(user_scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="user_scope">
        <strong>{{ $fliters.formatTime(user_scope.row.updateAt) }}</strong>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            icon="el-icon-edit"
            size="mini"
            type="text"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            icon="el-icon-delete"
            size="mini"
            type="text"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 在page-content中定义动态插入的剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </tk-table>
  </div>
</template>

<script lang="ts" setup>
import TkTable from '@/base-ui/table'
import { defineProps, computed, ref, watch, defineEmits } from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'

const props = defineProps({
  contentTableConfig: {
    type: Object,
    required: true
  },
  pageName: {
    //根据不同页面进行对应数据的请求
    type: String,
    required: true
  }
})

// 0.获取操作的权限
const isCreate = usePermission(props.pageName as string, 'create')
const isUpdate = usePermission(props.pageName as string, 'update')
const isDelete = usePermission(props.pageName as string, 'delete')
const isQuery = usePermission(props.pageName as string, 'query')
console.log('isCreate', isCreate)

// 1.双向绑定pageInfo
const pageInfo = ref({ currentPage: 1, pageSize: 10 })
watch(pageInfo, () => {
  getPageData()
})
//2.发送网络请求
const store = useStore()
const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return
  // 根据传来的配置，进行相应数据的请求
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}
defineExpose({
  getPageData
})
getPageData()
//3.对取得的数据进行计算更新
const dataList = computed(() =>
  store.getters[`system/pageListData`](props.pageName)
)
const dataCount = computed(() =>
  store.getters[`system/pageListCount`](props.pageName)
)
// 4.获取其他的动态插槽名称
const otherPropSlots = props.contentTableConfig?.propList.filter(
  (item: any) => {
    switch (item.slotName) {
      case 'status': {
        return false
      }
      case 'createAt': {
        return false
      }
      case 'updateAt': {
        return false
      }
      case 'handler': {
        return false
      }
    }
    return true
  }
)
// 5.删除/编辑/新建操作
const handleDeleteClick = (item: any) => {
  console.log(item)
  store.dispatch('system/deletePageDataAction', {
    pageName: props.pageName,
    id: item.id
  })
}
const emit = defineEmits(['newBtnClick', 'editBtnClick'])

const handleNewClick = () => {
  emit('newBtnClick')
}
const handleEditClick = (item: any) => {
  emit('editBtnClick', item)
}
</script>

<style lang="less" scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
