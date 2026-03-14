<template>
  <AdminLayout title="Analytics" subtitle="Track sales, orders, and performance over time.">
    <!-- Stats cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <AdminStatCard
        v-for="(card, key) in statCards"
        :key="key"
        :label="card.label"
        :value="card.value"
        :change="card.change"
        :icon="card.icon"
      />
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Sales chart -->
      <AdminChart
        title="Sales"
        subtitle="Monthly sales"
        :data="salesChart"
        type="bar"
        :total="salesTotal"
        :change="salesChange"
        :year="salesChartYear.toString()"
        class="lg:col-span-2"
      />

      <!-- Total orders chart -->
      <AdminChart
        title="Total orders"
        subtitle="By week"
        :data="ordersChart"
        type="bar"
        view-all-link="/admin/orders"
      />
    </div>

    <!-- Recent Transactions -->
    <AdminTable
      title="Recent Transactions"
      view-all-link="/admin/orders"
      :columns="transactionColumns"
      :data="recentTransactions"
      row-key="id"
    >
      <template #cell-status="{ value }">
        <span
          class="inline-block px-2.5 py-1 rounded-full text-xs font-medium"
          :class="value === 'Success' ? 'bg-green-100 text-green-800' : value === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'"
        >
          {{ value }}
        </span>
      </template>
    </AdminTable>

    <!-- Best Sellers & Low Stock -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-[#D3DDFF] overflow-hidden">
        <div class="p-5 border-b border-[#D3DDFF]/60">
          <h2 class="font-bold text-[#20437B]">Best Sellers</h2>
        </div>
        <ul class="divide-y divide-[#D3DDFF]/60">
          <li
            v-for="(item, i) in bestSellers"
            :key="item.id"
            class="p-4 flex items-center gap-3 hover:bg-[#D3DDFF]/10 transition-colors"
          >
            <span class="text-sm font-bold text-[#20437B] w-6">{{ i + 1 }}</span>
            <div class="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
              <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" class="w-full h-full object-cover">
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-medium text-gray-900 truncate">{{ item.name }}</p>
              <p class="text-xs text-gray-500">{{ item.price }} · {{ item.sales }} sales</p>
            </div>
          </li>
          <li v-if="bestSellers.length === 0" class="p-4 text-gray-500 text-sm">No data yet.</li>
        </ul>
      </div>
      <div class="bg-white rounded-xl shadow-sm border border-[#D3DDFF] overflow-hidden">
        <div class="p-5 border-b border-[#D3DDFF]/60">
          <h2 class="font-bold text-[#20437B]">Low Stock</h2>
        </div>
        <ul class="divide-y divide-[#D3DDFF]/60">
          <li
            v-for="item in lowStockProducts"
            :key="item.id"
            class="p-4 flex items-center gap-3 hover:bg-[#D3DDFF]/10 transition-colors"
          >
            <div class="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
              <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" class="w-full h-full object-cover">
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-medium text-gray-900 truncate">{{ item.name }}</p>
              <p class="text-xs text-gray-500">{{ item.productId }} · {{ item.inStock }} in stock</p>
            </div>
            <NuxtLink :to="`/admin/products`" class="text-xs text-[#20437B] font-medium hover:underline shrink-0">Restock</NuxtLink>
          </li>
          <li v-if="lowStockProducts.length === 0" class="p-4 text-gray-500 text-sm">All products are well stocked.</li>
        </ul>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from './shared/AdminLayout.vue'
import AdminStatCard from './shared/AdminStatCard.vue'
import AdminChart from './shared/AdminChart.vue'
import AdminTable from './shared/AdminTable.vue'

const {
  stats,
  salesChartYear,
  salesChart,
  salesTotal,
  salesChange,
  ordersChart,
  recentTransactions,
  bestSellers,
  lowStockProducts
} = useAdminDashboard()

const statCards = computed(() => {
  const s = stats.value
  if (!s) return []
  return [
    { label: 'Total Users', value: s.totalUsers, change: s.totalUsersChange, icon: 'user' as const },
    { label: 'Total Orders', value: s.totalOrders, change: s.totalOrdersChange, icon: 'orders' as const },
    { label: 'Total Delivered', value: s.totalDelivered, change: s.totalDeliveredChange, icon: 'box' as const },
    { label: 'Total Sales', value: s.totalSales, change: s.totalSalesChange, icon: 'chart' as const }
  ]
})

const transactionColumns = [
  { key: 'id', label: '#' },
  { key: 'orderDetails', label: 'Order Details' },
  { key: 'orderTime', label: 'Order Time' },
  { key: 'payment', label: 'Payment' },
  { key: 'status', label: 'Status' },
  { key: 'amount', label: 'Amount', class: 'text-right' }
]

function barHeight(data: { value: number }[], point: { value: number }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return Math.round((point.value / max) * 100)
}

useHead({ title: "Analytics | Admin | Kathie's Kitchen" })
</script>

