<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-[#20437B]">Orders</h1>
      <p class="text-[#20437B]/80 mt-1">
        You have <strong class="text-[#20437B]">{{ orderCountLabel }}</strong> Orders Today
      </p>
    </div>

    <!-- Summary cards: 2 cards (status overview + exceptions) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Left card: All Orders, Pending, Completed -->
      <div class="bg-white rounded-xl border border-[#D3DDFF] p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-lg bg-[#D3DDFF]/50 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-[#20437B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
          <select class="text-sm text-gray-500 border-0 bg-transparent pr-1 focus:ring-0 rounded cursor-pointer">
            <option>This Week</option>
          </select>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <p class="text-sm text-gray-500 mb-0.5">All Orders</p>
            <p class="text-xl font-bold text-gray-900">{{ counts.all }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-0.5">Pending</p>
            <p class="text-xl font-bold text-gray-900">{{ counts.pending }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-0.5">Completed</p>
            <p class="text-xl font-bold text-gray-900">{{ counts.completed }}</p>
          </div>
        </div>
      </div>
      <!-- Right card: Canceled, Returned, Damaged -->
      <div class="bg-white rounded-xl border border-[#D3DDFF] p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-lg bg-[#D3DDFF]/50 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-[#20437B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
          <select class="text-sm text-gray-500 border-0 bg-transparent pr-1 focus:ring-0 rounded cursor-pointer">
            <option>This Week</option>
          </select>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <p class="text-sm text-gray-500 mb-0.5">Canceled</p>
            <p class="text-xl font-bold text-gray-900">
              {{ counts.canceled }}
              <span class="text-sm font-medium text-red-600 ml-1">-20%</span>
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-0.5">Returned</p>
            <p class="text-xl font-bold text-gray-900">{{ counts.returned }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-0.5">Damaged</p>
            <p class="text-xl font-bold text-gray-900">{{ counts.damaged }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and filter -->
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="flex-1 relative">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search here"
          class="w-full pl-4 pr-10 py-2.5 border border-[#D3DDFF] rounded-lg text-sm focus:ring-2 focus:ring-[#20437B]/30 focus:border-[#20437B] outline-none"
        >
        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[#20437B]/50 pointer-events-none">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </span>
      </div>
      <select
        v-model="statusFilter"
        class="px-4 py-2.5 rounded-lg border border-[#D3DDFF] bg-white text-[#20437B] text-sm focus:ring-2 focus:ring-[#20437B]/30 outline-none min-w-[140px]"
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="In-Progress">In-Progress</option>
        <option value="Completed">Completed</option>
        <option value="Canceled">Canceled</option>
        <option value="Returned">Returned</option>
        <option value="Damaged">Damaged</option>
      </select>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm border border-[#D3DDFF] overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-[#D3DDFF]/50 text-[#20437B] font-semibold text-left">
              <th class="px-4 py-3">Order ID</th>
              <th class="px-4 py-3">Customer Name</th>
              <th class="px-4 py-3">Product Name</th>
              <th class="px-4 py-3">Quantity</th>
              <th class="px-4 py-3">Total</th>
              <th class="px-4 py-3">Payment Method</th>
              <th class="px-4 py-3">Action</th>
              <th class="px-4 py-3">Order Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in filteredOrders"
              :key="order.id"
              class="border-t border-[#D3DDFF]/60 hover:bg-[#D3DDFF]/20 transition-colors"
            >
              <td class="px-4 py-3 font-medium text-[#20437B]">{{ order.orderId }}</td>
              <td class="px-4 py-3 text-gray-700">{{ order.customerName }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                    <img v-if="order.productImage" :src="order.productImage" :alt="order.productName" class="w-full h-full object-contain" @error="(e) => (e.currentTarget!.style.display = 'none')">
                    <span v-else class="text-gray-400 text-xs">—</span>
                  </div>
                  <span class="text-gray-700">{{ order.productName }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-gray-600">{{ order.quantity }}</td>
              <td class="px-4 py-3 font-medium">{{ order.total }}</td>
              <td class="px-4 py-3 text-gray-600">{{ order.paymentMethod }}</td>
              <td class="px-4 py-3">
                <div class="relative" data-action-dropdown>
                  <button
                    type="button"
                    class="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg border border-[#D3DDFF] text-[#20437B] hover:bg-[#D3DDFF]/50 text-xs font-medium"
                    @click="toggleAction(order.id)"
                  >
                    {{ order.status }}
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div
                    v-if="openActionId === order.id"
                    class="absolute left-0 top-full mt-1 z-10 py-1 bg-white rounded-lg border border-[#D3DDFF] shadow-lg min-w-[120px]"
                    data-action-dropdown
                  >
                    <button
                      v-for="s in statusOptions"
                      :key="s"
                      type="button"
                      class="w-full text-left px-3 py-1.5 text-xs hover:bg-[#D3DDFF]/50 text-gray-700"
                      @click="setStatus(order.id, s); openActionId = null"
                    >
                      {{ s }}
                    </button>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3">
                <span
                  class="inline-block px-2.5 py-1 rounded-full text-xs font-medium"
                  :class="statusBadgeClass(order.status)"
                >
                  {{ order.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="filteredOrders.length === 0" class="text-center text-gray-500 py-8">No orders match your search or filter.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OrderStatus } from '~/types/catalog'

definePageMeta({ layout: 'admin' })

const { orders, updateOrderStatus, counts } = useOrdersData()

const searchQuery = ref('')
const statusFilter = ref('')
const openActionId = ref<string | null>(null)

const orderCountLabel = computed(() => {
  const n = orders.value.length
  return n >= 100 ? '100+' : String(n)
})

const statusOptions: OrderStatus[] = ['Pending', 'In-Progress', 'Completed', 'Canceled', 'Returned', 'Damaged']

const filteredOrders = computed(() => {
  let list = [...orders.value]
  const q = searchQuery.value?.trim().toLowerCase()
  if (q) {
    list = list.filter(
      (o) =>
        o.orderId.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.productName.toLowerCase().includes(q)
    )
  }
  if (statusFilter.value) {
    list = list.filter((o) => o.status === statusFilter.value)
  }
  return list
})

function statusBadgeClass(status: OrderStatus) {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'In-Progress':
      return 'bg-blue-100 text-blue-800'
    case 'Pending':
      return 'bg-amber-100 text-amber-800'
    case 'Canceled':
      return 'bg-red-100 text-red-800'
    case 'Returned':
      return 'bg-gray-100 text-gray-800'
    case 'Damaged':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function toggleAction(orderId: string) {
  openActionId.value = openActionId.value === orderId ? null : orderId
}

function setStatus(orderId: string, status: OrderStatus) {
  updateOrderStatus(orderId, status)
}

function closeOnClickOutside(e: MouseEvent) {
  if (openActionId.value && !(e.target as Element).closest('[data-action-dropdown]')) {
    openActionId.value = null
  }
}

onMounted(() => document.addEventListener('click', closeOnClickOutside))
onUnmounted(() => document.removeEventListener('click', closeOnClickOutside))

useHead({ title: "Orders | Admin | Kathie's Kitchen" })
</script>
