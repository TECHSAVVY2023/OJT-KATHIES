<template>
  <AdminLayout>
    <template #title>
      Welcome, <span class="text-red-500">{{ user?.name ?? 'Admin' }}</span>
    </template>
    <template #subtitle>
      You have <strong class="text-[#20437B]">{{ todayOrders }}</strong> Orders, Today.
    </template>

    <!-- Stats cards - 4 cards with circular icons -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <AdminStatCard
        v-for="(card, key) in statCards"
        :key="key"
        :label="card.label"
        :value="card.value"
        :icon="card.icon"
      />
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Sales chart - left, larger -->
      <AdminChart
        title="Sales"
        subtitle="Sales"
        :data="salesChart"
        type="line"
        :total="salesTotal"
        :year="String(salesChartYear)"
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

    <!-- Recent Transactions + Best Seller -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Recent Transactions -->
    <AdminTable
      title="Recent Transactions"
      view-all-link="/admin/orders"
      :columns="transactionColumns"
      :data="recentTransactions"
      row-key="id"
      class="lg:col-span-2"
    >
      <template #cell-orderDetails="{ row }">
        <span class="font-medium text-gray-900">{{ row.orderDetails }}</span>
        <span class="block text-xs text-gray-500">{{ row.orderTime }}</span>
      </template>
      <template #cell-payment="{ row }">
        {{ row.payment }}
        <span class="block text-xs text-gray-500">{{ row.transactionId }}</span>
      </template>
      <template #cell-status="{ value }">
        <span
          class="inline-block px-2 py-0.5 rounded text-xs font-medium"
          :class="{
            'bg-green-100 text-green-800': value === 'Success',
            'bg-red-100 text-red-800': value === 'Cancelled',
            'bg-blue-100 text-blue-800': value === 'Pending'
          }"
        >
          {{ value }}
        </span>
      </template>
    </AdminTable>

      <div class="space-y-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="p-5 flex justify-between items-center border-b border-gray-100">
            <h2 class="font-bold text-gray-900">{{ bestSellers.length === 1 ? 'Best Seller' : 'Best Sellers' }}</h2>
            <NuxtLink to="/admin/products" class="text-sm text-[#20437B] font-medium hover:underline">View All</NuxtLink>
          </div>
          <ul class="divide-y divide-gray-100">
            <li
              v-for="item in bestSellers"
              :key="item.id"
              class="p-4 flex items-center gap-3 hover:bg-gray-50/50"
            >
              <div class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" class="w-full h-full object-contain">
                <span v-else class="text-xl">📦</span>
              </div>
              <div class="min-w-0 flex-1">
                <p class="font-medium text-gray-900 truncate">{{ item.name }}</p>
                <p class="text-xs text-gray-500">{{ item.price }} · Sales {{ item.sales }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="p-5 flex justify-between items-center border-b border-gray-100">
            <h2 class="font-bold text-gray-900">Subscribers</h2>
            <NuxtLink to="/admin/subscribe" class="text-sm text-[#20437B] font-medium hover:underline">View All</NuxtLink>
          </div>
          <ul class="divide-y divide-gray-100">
            <li
              v-for="sub in recentSubscribers"
              :key="sub.id"
              class="p-4 flex items-center gap-3 hover:bg-gray-50/50"
            >
              <div class="w-10 h-10 rounded-full bg-[#D3DDFF]/50 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-[#20437B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div class="min-w-0 flex-1">
                <p class="font-medium text-gray-900 truncate">{{ sub.email }}</p>
                <p class="text-xs text-gray-500">{{ formatSubscriberDate(sub.subscribedAt) }}</p>
              </div>
            </li>
          </ul>
          <p v-if="recentSubscribers.length === 0" class="p-4 text-center text-sm text-gray-500">No subscribers yet</p>
        </div>
      </div>
    </div>

    <!-- Low Stock Products -->
    <AdminTable
      title="Low Stock Products"
      view-all-link="/admin/products"
      :columns="lowStockColumns"
      :data="lowStockProducts"
      row-key="id"
    >
      <template #cell-name="{ row }">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
            <img v-if="row.imageUrl" :src="row.imageUrl" :alt="row.name" class="w-full h-full object-contain">
            <span v-else class="text-xl">📦</span>
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-medium text-gray-900 truncate">{{ row.name }}</p>
            <p class="text-xs text-gray-500">{{ row.productId }} · In stock: {{ row.inStock }}</p>
          </div>
        </div>
      </template>
    </AdminTable>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from './shared/AdminLayout.vue'
import AdminStatCard from './shared/AdminStatCard.vue'
import AdminChart from './shared/AdminChart.vue'
import AdminTable from './shared/AdminTable.vue'

const { user } = useAuth()
const {
  todayOrders,
  stats,
  salesChart,
  salesChartYear,
  salesTotal,
  ordersChart,
  recentTransactions,
  bestSellers,
  lowStockProducts
} = useAdminDashboard()

const { subscribers } = useSubscribers()
const recentSubscribers = computed(() => [...subscribers.value].slice(-5).reverse())

function formatSubscriberDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return iso
  }
}

const statCards = computed(() => {
  const s = stats.value
  return [
    { label: 'Total Users', value: s.totalUsers, icon: 'user' },
    { label: 'Total Orders', value: s.totalOrders, icon: 'orders' },
    { label: 'Total Delivered', value: s.totalDelivered, icon: 'box' },
    { label: 'Total Sales', value: s.totalSales, icon: 'chart' }
  ]
})

function barHeight(data: { value: number }[], point: { value: number }) {
  const max = Math.max(...data.map(d => d.value), 1)
  return Math.round((point.value / max) * 100)
}

const transactionColumns = [
  { key: 'id', label: '#' },
  { key: 'orderDetails', label: 'Order Details' },
  { key: 'payment', label: 'Payment' },
  { key: 'status', label: 'Status' },
  { key: 'amount', label: 'Amount', class: 'text-right' }
]

const lowStockColumns = [
  { key: 'name', label: 'Product' }
]

useHead({ title: "Admin Dashboard | Kathie's Kitchen" })
</script>

