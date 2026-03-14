<template>
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
          <OrderTableRow
            v-for="order in orders"
            :key="order.id"
            :order="order"
            :status-options="statusOptions"
            @status-change="handleStatusChange"
          />
        </tbody>
      </table>
    </div>
    <p v-if="orders.length === 0" class="text-center text-gray-500 py-8">No orders match your search or filter.</p>
  </div>
</template>

<script setup lang="ts">
import type { OrderStatus } from '~/types/catalog'

interface Order {
  id: string
  orderId: string
  customerName: string
  productName: string
  productImage?: string
  quantity: number
  total: string
  paymentMethod: string
  status: OrderStatus
}

interface Props {
  orders: Order[]
  statusOptions: OrderStatus[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'status-change': [orderId: string, status: OrderStatus]
}>()

const handleStatusChange = (orderId: string, status: OrderStatus) => {
  emit('status-change', orderId, status)
}
</script>
