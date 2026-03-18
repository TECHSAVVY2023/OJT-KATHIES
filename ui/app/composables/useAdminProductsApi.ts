import type { ProductItem } from '~/types/catalog'

type DjangoProduct = {
  id: number
  product_name: string
  description: string
  price: string | number
  product_image: string | null
  status: 'In Stock' | 'Out of Stock' | string
  category?: string
  stockCount?: number
  created_at?: string
}

function toNumber(v: unknown): number {
  const n = typeof v === 'number' ? v : Number(v)
  return Number.isFinite(n) ? n : 0
}

function fromDjango(p: DjangoProduct): ProductItem {
  const inStock = p.status === 'In Stock'
  const stockCount = typeof p.stockCount === 'number' ? p.stockCount : undefined

  return {
    id: String(p.id),
    name: p.product_name,
    brand: '',
    category: p.category ?? '',
    imageUrl: p.product_image || '/images/placeholder.png',
    price: toNumber(p.price),
    currency: 'R',
    rating: undefined,
    isNew: false,
    isSale: false,
    inStock,
    defaultQuantity: 1,
    stockCount,
    description: p.description ?? ''
  }
}

function toDjangoBody(patch: Partial<ProductItem>) {
  return {
    product_name: patch.name,
    description: patch.description ?? '',
    price: patch.price ?? 0,
    product_image: patch.imageUrl ?? '',
    status: patch.inStock === false ? 'Out of Stock' : 'In Stock',
    category_name: patch.category ?? '',
    quantity: patch.stockCount ?? 0,
  }
}

export function useAdminProductsApi() {
  const config = useRuntimeConfig()
  const base = computed(() => `${config.public.apiBase}/products/`)

  const products = ref<ProductItem[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function refresh() {
    isLoading.value = true
    error.value = null
    try {
      const res = await $fetch<DjangoProduct[]>(base.value, {
        method: 'GET',
        cache: 'no-store'
      })
      products.value = res.map(fromDjango)
    } catch (e: any) {
      error.value = e?.data?.detail || e?.message || 'Failed to load products'
    } finally {
      isLoading.value = false
    }
  }

  async function createProduct(payload: Partial<ProductItem>) {
    error.value = null
    const created = await $fetch<DjangoProduct>(base.value, {
      method: 'POST',
      body: toDjangoBody(payload),
      cache: 'no-store',
    })
    products.value = [fromDjango(created), ...products.value]
    return fromDjango(created)
  }

  async function updateProduct(id: string, patch: Partial<ProductItem>) {
    error.value = null
    const updated = await $fetch<DjangoProduct>(`${base.value}${id}/`, {
      method: 'PATCH',
      body: toDjangoBody(patch),
      cache: 'no-store',
    })
    const mapped = fromDjango(updated)
    products.value = products.value.map(p => (p.id === id ? mapped : p))
    return mapped
  }

  async function deleteProduct(id: string) {
    error.value = null
    await $fetch(`${base.value}${id}/`, {
      method: 'DELETE',
      cache: 'no-store'
    })
    products.value = products.value.filter(p => p.id !== id)
  }

  return {
    products: readonly(products),
    isLoading: readonly(isLoading),
    error: readonly(error),
    refresh,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}

