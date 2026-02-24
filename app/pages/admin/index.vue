<template>
  <div class="space-y-6">
    <!-- Welcome - design colors #20437B and #D3DDFF -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-[#20437B]">
        Welcome, <span class="text-red-500">{{ user?.name ?? 'Admin' }}</span>
      </h1>
      <p class="text-[#20437B]/80 mt-1">
        You have <strong class="text-[#20437B]">{{ todayOrders }}</strong> Orders, Today.
      </p>
    </div>

    <!-- Stats cards - 4 cards with circular icons -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="(card, key) in statCards"
        :key="key"
        class="bg-white rounded-xl shadow-sm border border-[#D3DDFF] p-5 flex items-start gap-4"
      >
        <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-[#D3DDFF] text-[#20437B]">
          <!-- User -->
          <svg v-if="card.icon === 'user'" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
          <!-- Orders (document with check) -->
          <svg v-else-if="card.icon === 'orders'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          <!-- Box (delivered) -->
          <svg v-else-if="card.icon === 'box'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
          <!-- Chart (sales) -->
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
      <!-- Sales chart - left, larger -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class="flex flex-wrap justify-between items-start gap-4 mb-4">
          <div>
            <h2 class="font-bold text-gray-900">Sales</h2>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ salesTotal }}</p>
            <p class="text-sm text-green-600 mt-0.5">{{ salesChange }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-500">{{ salesChartYear }}</span>
            <span class="p-2 rounded-lg bg-gray-100 text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </span>
          </div>
        </div>
        <p class="text-xs text-gray-500 mb-3 text-right">• Sales</p>
        <div class="h-48 flex items-end gap-1">
          <div
            v-for="(point, i) in salesChart"
            :key="i"
            class="flex-1 flex flex-col items-center gap-1"
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

      <!-- Total orders chart - right, red bars -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-bold text-gray-900">Total orders</h2>
          <NuxtLink to="/admin/orders" class="text-sm text-[#20437B] font-medium hover:underline">View All</NuxtLink>
        </div>
        <div class="h-32 flex items-end gap-1">
          <div
            v-for="(point, i) in ordersChart"
            :key="i"
            class="flex-1 bg-red-500 rounded-t min-h-[4px] transition-all"
            :style="{ height: barHeight(ordersChart, point) + '%' }"
            :title="`${point.month}: ${point.value}`"
          />
        </div>
        <div class="flex gap-1 mt-2">
          <span v-for="(point, i) in ordersChart" :key="i" class="flex-1 text-[10px] text-gray-500 text-center truncate">{{ point.month }}</span>
        </div>
      </div>
    </div>

    <!-- Recent Transactions + Best Seller -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-5 flex justify-between items-center border-b border-gray-100">
          <h2 class="font-bold text-gray-900">Recent Transactions</h2>
          <NuxtLink to="/admin/orders" class="text-sm text-[#20437B] font-medium hover:underline">View All</NuxtLink>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-gray-50 text-left text-gray-600 font-medium">
                <th class="px-5 py-3">#</th>
                <th class="px-5 py-3">Order Details</th>
                <th class="px-5 py-3">Payment</th>
                <th class="px-5 py-3">Status</th>
                <th class="px-5 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="tx in recentTransactions"
                :key="tx.id"
                class="border-t border-gray-100 hover:bg-gray-50/50"
              >
                <td class="px-5 py-3">{{ tx.id }}</td>
                <td class="px-5 py-3">
                  <span class="font-medium text-gray-900">{{ tx.orderDetails }}</span>
                  <span class="block text-xs text-gray-500">{{ tx.orderTime }}</span>
                </td>
                <td class="px-5 py-3">
                  {{ tx.payment }}
                  <span class="block text-xs text-gray-500">{{ tx.transactionId }}</span>
                </td>
                <td class="px-5 py-3">
                  <span
                    class="inline-block px-2 py-0.5 rounded text-xs font-medium"
                    :class="{
                      'bg-green-100 text-green-800': tx.status === 'Success',
                      'bg-red-100 text-red-800': tx.status === 'Cancelled',
                      'bg-blue-100 text-blue-800': tx.status === 'Pending'
                    }"
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

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-5 flex justify-between items-center border-b border-gray-100">
          <h2 class="font-bold text-gray-900">Best Seller</h2>
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
    </div>

    <!-- Low Stock Products -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-5 flex justify-between items-center border-b border-gray-100">
        <h2 class="font-bold text-gray-900">Low Stock Products</h2>
        <NuxtLink to="/admin/products" class="text-sm text-[#20437B] font-medium hover:underline">View All</NuxtLink>
      </div>
      <ul class="divide-y divide-gray-100">
        <li
          v-for="item in lowStockProducts"
          :key="item.id"
          class="p-4 flex items-center gap-3 hover:bg-gray-50/50"
        >
          <div class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
            <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" class="w-full h-full object-contain">
            <span v-else class="text-xl">📦</span>
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-medium text-gray-900 truncate">{{ item.name }}</p>
            <p class="text-xs text-gray-500">{{ item.productId }} · In stock: {{ item.inStock }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const { user } = useAuth()
const {
  todayOrders,
  stats,
  salesChart,
  salesChartYear,
  salesTotal,
  salesChange,
  ordersChart,
  recentTransactions,
  bestSellers,
  lowStockProducts
} = useAdminDashboard()

const statCards = computed(() => {
  const s = stats.value
  return [
    { label: 'Total Users', value: s.totalUsers, change: s.totalUsersChange, icon: 'user' },
    { label: 'Total Orders', value: s.totalOrders, change: s.totalOrdersChange, icon: 'orders' },
    { label: 'Total Delivered', value: s.totalDelivered, change: s.totalDeliveredChange, icon: 'box' },
    { label: 'Total Sales', value: s.totalSales, change: s.totalSalesChange, icon: 'chart' }
  ]
})

function barHeight(data: { value: number }[], point: { value: number }) {
  const max = Math.max(...data.map(d => d.value), 1)
  return Math.round((point.value / max) * 100)
}

useHead({ title: "Admin Dashboard | Kathie's Kitchen" })
</script>
