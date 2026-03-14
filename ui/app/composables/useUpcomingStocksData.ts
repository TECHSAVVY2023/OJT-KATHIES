import type { UpcomingStockItem } from '~/types/catalog'
import upcomingstocksJson from '~/data/upcomingstocks.json'

/** Birahon ang data gikan sa upcomingstocks.json – whatever you put in that JSON gets to the frontend */
export function useUpcomingStocksData() {
  const upcomingStocks = shallowRef<UpcomingStockItem[]>(JSON.parse(JSON.stringify(upcomingstocksJson)) as UpcomingStockItem[])

  function addUpcomingStock(item: Omit<UpcomingStockItem, 'id'>) {
    const id = nextUpcomingId()
    upcomingStocks.value = [...upcomingStocks.value, { ...item, id }]
  }

  function updateUpcomingStock(id: string, patch: Partial<UpcomingStockItem>) {
    upcomingStocks.value = upcomingStocks.value.map((p) =>
      p.id === id ? { ...p, ...patch } : p
    )
  }

  function deleteUpcomingStock(id: string) {
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
    addUpcomingStock,
    updateUpcomingStock,
    deleteUpcomingStock,
    nextUpcomingId
  }
}
