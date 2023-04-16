<template>
  <div class="page-search">
    <tk-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </tk-form>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, defineEmits, reactive } from 'vue'
import TkForm from '@/base-ui/form'
const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])
// 1.由配置文件filed来决定，展示的栏目
const formItems = props.searchFormConfig.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) formOriginData[item.field] = ''
console.log(formOriginData)
const formData = ref(formOriginData)
// 2.点击重置
const handleResetClick = () => {
  // for (const key in formOriginData) {
  //   formData.value[`${key}`] = formOriginData[key]
  // }
  formData.value = formOriginData
  emit('resetBtnClick')
}
//3.当用户点击搜索(后端需要写模糊搜索)
const handleQueryClick = () => {
  emit('queryBtnClick', formData.value)
}
</script>

<style lang="less" scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
