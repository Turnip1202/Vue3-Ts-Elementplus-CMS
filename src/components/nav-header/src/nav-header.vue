<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <tk-breadcrumb :breadcrumbs="breadcrumbs"></tk-breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TkBreadcrumb from '@/base-ui/breadcrumb'
import { useStore } from '@/store'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { defineEmits, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import { useRoute } from 'vue-router'
const emit = defineEmits(['foldChange'])
const isFold = ref(false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}

const store = useStore()
//得到一个点击菜单 顺序的数组
const breadcrumbs = computed(() => {
  const userMenus = store.state.login.userMenus
  const route = useRoute()
  const currentPath = route.path
  return pathMapBreadcrumbs(userMenus, currentPath)
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
