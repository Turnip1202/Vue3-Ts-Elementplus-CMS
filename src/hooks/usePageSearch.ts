import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent> | null>(null)

  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }
  return [handleQueryClick, handleResetClick, pageContentRef]
}
