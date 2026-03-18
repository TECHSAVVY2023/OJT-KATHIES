import type { UpcomingStockItem } from '~/types/catalog'
import upcomingstocksJson from '~/data/upcomingstocks.json'

type DjangoComingSoonProduct = {
  id: number
  coming_soon_name: string
  description?: string | null
  coming_soon_image?: string | null
  coming_soon_date?: string | null
  product_id?: number | null
  created_at?: string | null
}

function mapToUpcomingStock(item: DjangoComingSoonProduct): UpcomingStockItem {
  const name = item.coming_soon_name || ''
  const description = item.description || ''

  // Keep the existing UI shape; this can be adjusted if you add separate "brand" and "flavor" fields later.
  return {
    id: String(item.id),
    headerBgClass: 'bg-emerald-800',
    productBrand: name,
    productFlavor: '',
    productImage: item.coming_soon_image || '',
    description,
    buttonText: 'Upcoming Stock',
    buttonPath: '/products',
  }
}

/** Birahon ang data gikan sa upcomingstocks.json – whatever you put in that JSON gets to the frontend */
export function useUpcomingStocksData() {
  const config = useRuntimeConfig()
  const baseUrl = `${config.public.apiBase}/coming-soon-products/`

  const upcomingStocks = shallowRef<UpcomingStockItem[]>(JSON.parse(JSON.stringify(upcomingstocksJson)) as UpcomingStockItem[])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function refresh() {
    isLoading.value = true
    error.value = null

    try {
      const res = await $fetch<DjangoComingSoonProduct[]>(baseUrl, {
        method: 'GET',
        cache: 'no-store',
      })
      upcomingStocks.value = res.map(mapToUpcomingStock)
    } catch (e: any) {
      // Keep local fallback data if API isn't available.
      error.value = e?.data?.detail || e?.message || 'Failed to load coming soon products'
      if (!upcomingStocks.value.length) {
        upcomingStocks.value = JSON.parse(JSON.stringify(upcomingstocksJson)) as UpcomingStockItem[]
      }
    } finally {
      isLoading.value = false
    }
  }

  async function addUpcomingStock(item: Omit<UpcomingStockItem, 'id'>) {
    error.value = null
    const payload = {
      coming_soon_name: item.productBrand,
      description: item.description || '',
      coming_soon_image: item.productImage || '',
    }
    const created = await $fetch<DjangoComingSoonProduct>(baseUrl, {
      method: 'POST',
      body: payload,
      cache: 'no-store',
    })
    const mapped = mapToUpcomingStock(created)
    upcomingStocks.value = [mapped, ...upcomingStocks.value]
    return mapped
  }

  async function updateUpcomingStock(id: string, patch: Partial<UpcomingStockItem>) {
    error.value = null
    const payload: Record<string, unknown> = {}
    if (patch.productBrand !== undefined) payload.coming_soon_name = patch.productBrand
    if (patch.description !== undefined) payload.description = patch.description
    if (patch.productImage !== undefined) payload.coming_soon_image = patch.productImage

    const updated = await $fetch<DjangoComingSoonProduct>(`${baseUrl}${id}/`, {
      method: 'PATCH',
      body: payload,
      cache: 'no-store',
    })
    const mapped = mapToUpcomingStock(updated)
    upcomingStocks.value = upcomingStocks.value.map((p) => (p.id === id ? mapped : p))
    return mapped
  }

  async function deleteUpcomingStock(id: string) {
    error.value = null
    await $fetch(`${baseUrl}${id}/`, {
      method: 'DELETE',
      cache: 'no-store',
    })
    upcomingStocks.value = upcomingStocks.value.filter((p) => p.id !== id)
  }

  function nextUpcomingId() {
    const nums = upcomingStocks.value
      .map((p) => parseInt(p.id.replace(/\D/g, ''), 10))
      .filter((n) => !Number.isNaN(n))
    const max = nums.length ? Math.max(...nums) : 0
    return `ups-${String(max + 1).padStart(3, '0')}`
  }

  return {
    upcomingStocks: readonly(upcomingStocks),
    isLoading: readonly(isLoading),
    error: readonly(error),
    refresh,
    addUpcomingStock,
    updateUpcomingStock,
    deleteUpcomingStock,
    nextUpcomingId,
  }
}
