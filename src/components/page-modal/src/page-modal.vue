<template>
  <div>
    <el-dialog
      title="新建用户"
      v-model="centerDialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <tk-form
        v-bind="modalTableConfig"
        v-model:model-value="formData"
      ></tk-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineExpose } from 'vue'
import TkForm from '@/base-ui/form'
import { useStore } from '@/store'
const props = defineProps({
  modalTableConfig: {
    type: Object,
    required: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String,
    required: true
  }
})
const centerDialogVisible = ref(false)
const formData = ref<any>({})
defineExpose({
  formData,
  centerDialogVisible
})
watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalTableConfig.formItems) {
      formData.value[item.field] = newValue[item.field]
    }
  }
)
const store = useStore()
const handleConfirmClick = () => {
  centerDialogVisible.value = true
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    store.dispatch('system/editPageDataAction', {
      pageName: props.pageName,
      editData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id
    })
  } else {
    // 新建
    store.dispatch('system/createPageDataAction', {
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo }
    })
  }
}
</script>

<style lang="less" scoped></style>
