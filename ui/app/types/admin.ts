export interface AdminStats {
  totalUsers: number
  totalUsersChange: string
  totalOrders: number
  totalOrdersChange: string
  totalDelivered: number
  totalDeliveredChange: string
  totalSales: string
  totalSalesChange: string
}

export interface ChartPoint {
  month: string
  value: number
}

export interface RecentTransaction {
  id: number
  orderDetails: string
  orderTime: string
  payment: string
  transactionId: string
  status: string
  amount: string
}

export interface BestSellerItem {
  id: string
  name: string
  imageUrl?: string
  price: string
  sales: number
}

export interface LowStockProduct {
  id: string
  name: string
  imageUrl?: string
  productId: string
  inStock: number
}

export interface AdminDashboardData {
  todayOrders?: string
  stats: AdminStats
  salesChartYear: number
  salesChart: ChartPoint[]
  salesTotal: string
  salesChange: string
  ordersChart: ChartPoint[]
  recentTransactions: RecentTransaction[]
  bestSellers: BestSellerItem[]
  lowStockProducts: LowStockProduct[]
}
