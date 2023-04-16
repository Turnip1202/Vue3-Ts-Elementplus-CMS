<template>
  <el-form label-width="60px">
    <el-form-item label="手机号" prop="num">
      <el-input v-model="phone.num" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input v-model="phone.code" />
        <el-button type="primary" class="get-btn">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ElForm } from 'element-plus'
import { reactive, ref, defineExpose } from 'vue'
const phone = reactive({
  num: '',
  code: ''
})
const formRef = ref<InstanceType<typeof ElForm>>()
const phoneLoginAction = (arg: { code: number }) => {
  console.log('手机登录', arg)
}
defineExpose({ phoneLoginAction })
</script>

<style scoped>
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
