<template>
  <div class="descriptions">
    <el-descriptions class="margin-top" :title="title" :column="column" border>
      <template v-for="(itemData, index) in tableDatas" :key="index">
        <el-descriptions-item>
          <template #label>{{ itemData.name }}</template>
          <el-tag size="small">{{ itemData.description }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import type { DescriptionProp } from '../types'
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  column: {
    type: Number,
    default: 1
  },
  tableDatas: {
    type: Array as PropType<DescriptionProp[]>,
    default: () => []
  }
})
</script>

<style scoped>
.description {
  margin-bottom: 20px;
}
</style>
