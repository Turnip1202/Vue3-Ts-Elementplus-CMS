<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'

// 定义props
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const { setOptions } = useEchart(echartDivRef.value as HTMLElement)

  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
