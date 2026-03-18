import type { ProductItem } from '~/types/catalog'

export function useProductDetailPage() {
  const route = useRoute()
  const { getProductById, getProductsByCategory } = useProductData()
  const { addItem } = useCart()

  const productId = computed(() => String(route.params.id ?? ''))

  const product = computed(() => {
    const pid = productId.value
    return pid ? getProductById(pid).value ?? null : null
  })

  const quantity = ref(1)

  watch(
    product,
    p => {
      quantity.value = Math.max(1, p?.defaultQuantity ?? 1)
    },
    { immediate: true }
  )

  const relatedProducts = computed(() => {
    if (!product.value) return [] as ProductItem[]
    const byCategory = getProductsByCategory(product.value.category).value
    return byCategory.filter(p => p.id !== product.value!.id).slice(0, 4)
  })

  function addToCart() {
    if (!product.value) return
    addItem(product.value.id, quantity.value)
  }

  useHead({
    title: computed(() =>
      product.value ? `${product.value.name} | Kathie's Kitchen` : "Product | Kathie's Kitchen"
    )
  })

  return {
    productId,
    product,
    quantity,
    relatedProducts,
    addToCart
  }
}

