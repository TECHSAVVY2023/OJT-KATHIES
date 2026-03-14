<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-[#20437B]">Orders</h1>
      <p class="text-[#20437B]/80 mt-1">
        You have <strong class="text-[#20437B]">{{ orderCountLabel }}</strong> Orders Today
      </p>
    </div>

    <!-- Summary cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <OrdersSummaryCard 
        :metrics="[
          { label: 'All Orders', value: counts.all },
          { label: 'Pending', value: counts.pending },
          { label: 'Completed', value: counts.completed }
        ]"
      />
      <OrdersSummaryCard 
        :metrics="[
          { label: 'Canceled', value: counts.canceled },
          { label: 'Returned', value: counts.returned },
          { label: 'Damaged', value: counts.damaged }
        ]"
      />
    </div>

    <!-- Search and filter -->
    <OrdersSearchFilter 
      v-model:search-query="searchQuery"
      v-model:status-filter="statusFilter"
    />

    <!-- Table -->
    <OrdersTable 
      :orders="filteredOrders"
      :status-options="statusOptions"
      @status-change="handleStatusChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { OrderStatus } from '~/types/catalog'

definePageMeta({ layout: 'admin' })

const { orders, updateOrderStatus, counts } = useOrdersData()

const searchQuery = ref('')
const statusFilter = ref('')

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

const handleStatusChange = (orderId: string, status: OrderStatus) => {
  updateOrderStatus(orderId, status)
}

useHead({ title: "Orders | Admin | Kathie's Kitchen" })
</script>
