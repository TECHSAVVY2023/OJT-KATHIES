import type { AdminDashboardData } from '~/types/admin'
import dashboardJson from '~/data/adminDashboard.json'

export function useAdminDashboard() {
  const { products } = useProductData()

  const dashboard = shallowRef<AdminDashboardData>(dashboardJson as AdminDashboardData)

  const bestSellers = computed(() => {
    const fromJson = dashboard.value.bestSellers
    if (fromJson && fromJson.length > 0) return fromJson
    return products.value
      .filter(p => p.isBestSeller)
      .slice(0, 5)
      .map(p => ({
        id: p.id,
        name: p.name,
        imageUrl: p.imageUrl,
        price: `${p.currency}${p.price}`,
        sales: (p as { sales?: number }).sales ?? 6547
      }))
  })

  const lowStockProducts = computed(() => {
    const fromJson = dashboard.value.lowStockProducts
    if (fromJson && fromJson.length > 0) return fromJson
    return products.value
      .filter(p => (p.stockCount ?? 0) <= 25 && (p.stockCount ?? 0) > 0)
      .sort((a, b) => (a.stockCount ?? 0) - (b.stockCount ?? 0))
      .slice(0, 5)
      .map(p => ({
        id: p.id,
        name: p.name,
        imageUrl: p.imageUrl,
        productId: `#${p.id.replace(/\D/g, '').padStart(6, '0')}`,
        inStock: p.stockCount ?? 0
      }))
  })

  return {
    todayOrders: computed(() => dashboard.value.todayOrders ?? '100+'),
    stats: computed(() => dashboard.value.stats),
    salesChartYear: computed(() => dashboard.value.salesChartYear),
    salesChart: computed(() => dashboard.value.salesChart),
    salesTotal: computed(() => dashboard.value.salesTotal),
    salesChange: computed(() => dashboard.value.salesChange),
    ordersChart: computed(() => dashboard.value.ordersChart),
    recentTransactions: computed(() => dashboard.value.recentTransactions),
    bestSellers,
    lowStockProducts
  }
}
