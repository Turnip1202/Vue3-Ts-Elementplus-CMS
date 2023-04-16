<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { defineProps } from 'vue'
import { IBreadcrumb } from '../types'
const props = defineProps({
  breadcrumbs: {
    type: Array as PropType<IBreadcrumb[]>
  }
})
</script>

<style lang="less" scoped></style>
