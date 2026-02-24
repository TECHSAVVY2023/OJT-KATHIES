<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-[#20437B]">Analytics</h1>
      <p class="text-[#20437B]/80 mt-1">
        Track sales, orders, and performance over time.
      </p>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="(card, key) in statCards"
        :key="key"
        class="bg-white rounded-xl shadow-sm border border-[#D3DDFF] p-5 flex items-start gap-4"
      >
        <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-[#D3DDFF] text-[#20437B]">
          <svg v-if="card.icon === 'user'" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
          <svg v-else-if="card.icon === 'orders'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          <svg v-else-if="card.icon === 'box'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-2xl font-bold text-gray-900">{{ card.value }}</p>
          <p class="text-sm font-medium text-gray-600 mt-0.5">{{ card.label }}</p>
          <p class="text-xs text-gray-500 mt-1">{{ card.change }}</p>
        </div>
      </div>
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Sales chart -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-[#D3DDFF] p-5">
        <div class="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div>
            <h2 class="font-bold text-[#20437B]">Sales</h2>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ salesTotal }}</p>
            <p class="text-sm text-green-600 mt-0.5">{{ salesChange }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">{{ salesChartYear }}</span>
            <span class="p-2 rounded-lg bg-[#D3DDFF]/50 text-[#20437B]">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </span>
          </div>
        </div>
        <p class="text-xs text-gray-500 mb-3 text-right">• Monthly sales</p>
        <div class="h-52 flex items-end gap-1">
          <div
            v-for="(point, i) in salesChart"
            :key="i"
            class="flex-1 flex flex-col items-center gap-1 group"
          >
            <div
              class="w-full bg-[#20437B] rounded-t min-h-[4px] transition-all hover:opacity-90"
              :style="{ height: barHeight(salesChart, point) + '%' }"
              :title="`${point.month}: ${point.value}`"
            />
          </div>
        </div>
        <div class="flex gap-1 mt-2">
          <span v-for="(point, i) in salesChart" :key="i" class="flex-1 text-[10px] text-gray-500 text-center truncate">{{ point.month }}</span>
        </div>
      </div>

      <!-- Total orders chart -->
      <div class="bg-white rounded-xl shadow-sm border border-[#D3DDFF] p-5">
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-bold text-[#20437B]">Total orders</h2>
          <NuxtLink to="/admin/orders" class="text-sm text-[#20437B] font-medium hover:underline">View All</NuxtLink>
        </div>
        <p class="text-xs text-gray-500 mb-3">• By week</p>
        <div class="h-40 flex items-end gap-1">
          <div
            v-for="(point, i) in ordersChart"
            :key="i"
            class="flex-1 flex flex-col items-center"
          >
            <div
              class="w-full bg-[#20437B]/80 rounded-t min-h-[4px] transition-all hover:opacity-90"
              :style="{ height: barHeight(ordersChart, point) + '%' }"
              :title="`${point.month}: ${point.value}`"
            />
          </div>
        </div>
        <div class="flex gap-1 mt-2">
          <span v-for="(point, i) in ordersChart" :key="i" class="flex-1 text-[10px] text-gray-500 text-center truncate">{{ point.month }}</span>
        </div>
      </div>
    </div>

    <!-- Recent Transactions -->
    <div class="bg-white rounded-xl shadow-sm border border-[#D3DDFF] overflow-hidden">
      <div class="p-5 flex justify-between items-center border-b border-[#D3DDFF]/60">
        <h2 class="font-bold text-[#20437B]">Recent Transactions</h2>
        <NuxtLink to="/admin/orders" class="text-sm text-[#20437B] font-medium hover:underline">View All</NuxtLink>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-[#D3DDFF]/30 text-[#20437B] font-semibold text-left">
              <th class="px-5 py-3">#</th>
              <th class="px-5 py-3">Order Details</th>
              <th class="px-5 py-3">Order Time</th>
              <th class="px-5 py-3">Payment</th>
              <th class="px-5 py-3">Status</th>
              <th class="px-5 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="tx in recentTransactions"
              :key="tx.id"
              class="border-t border-[#D3DDFF]/60 hover:bg-[#D3DDFF]/20 transition-colors"
            >
              <td class="px-5 py-3 font-medium">{{ tx.id }}</td>
              <td class="px-5 py-3 text-gray-700">{{ tx.orderDetails }}</td>
              <td class="px-5 py-3 text-gray-600">{{ tx.orderTime }}</td>
              <td class="px-5 py-3 text-gray-600">{{ tx.payment }}</td>
              <td class="px-5 py-3">
                <span
                  class="inline-block px-2.5 py-1 rounded-full text-xs font-medium"
                  :class="tx.status === 'Success' ? 'bg-green-100 text-green-800' : tx.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'"
                >
                  {{ tx.status }}
                </span>
              </td>
              <td class="px-5 py-3 text-right font-medium">{{ tx.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

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
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

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

function barHeight(data: { value: number }[], point: { value: number }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return Math.round((point.value / max) * 100)
}

useHead({ title: "Analytics | Admin | Kathie's Kitchen" })
</script>
