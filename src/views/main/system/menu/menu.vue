<template>
  <div class="menu">
    <PageContent
      :content-table-config="contentTableConfig"
      page-name="menu"
    ></PageContent>
  </div>
</template>

<script lang="ts" setup>
import { contentTableConfig } from './config/content.config'
import PageContent from '@/components/page-content'
</script>

<style scoped></style>
