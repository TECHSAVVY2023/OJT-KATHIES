import { useRoute } from 'vue-router'

export function useCategoriesPage() {
  const route = useRoute()
  const { getProductsByCategory } = useProductData()

  const selectedCategoryName = computed(() => {
    const cat = route.query.category as string
    return cat ? decodeURIComponent(cat) : ''
  })

  const categoryProducts = computed(() => {
    if (!selectedCategoryName.value) return []
    return getProductsByCategory(selectedCategoryName.value).value
  })

  const categoryProductsRef = ref<HTMLElement | null>(null)

  watch(
    selectedCategoryName,
    (name) => {
      if (name) {
        nextTick(() => {
          categoryProductsRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      }
    },
    { flush: 'post' }
  )

  useHead({
    title: computed(() =>
      selectedCategoryName.value
        ? `${selectedCategoryName.value} | Categories | Kathie's Kitchen`
        : "Categories | Kathie's Kitchen"
    )
  })

  return {
    selectedCategoryName,
    categoryProducts,
    categoryProductsRef,
  }
}
