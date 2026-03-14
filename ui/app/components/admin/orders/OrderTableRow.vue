<template>
  <tr class="border-t border-[#D3DDFF]/60 hover:bg-[#D3DDFF]/20 transition-colors">
    <td class="px-4 py-3 font-medium text-[#20437B]">{{ order.orderId }}</td>
    <td class="px-4 py-3 text-gray-700">{{ order.customerName }}</td>
    <td class="px-4 py-3">
      <div class="flex items-center gap-2">
        <ProductImage :src="order.productImage" :alt="order.productName" />
        <span class="text-gray-700">{{ order.productName }}</span>
      </div>
    </td>
    <td class="px-4 py-3 text-gray-600">{{ order.quantity }}</td>
    <td class="px-4 py-3 font-medium">{{ order.total }}</td>
    <td class="px-4 py-3 text-gray-600">{{ order.paymentMethod }}</td>
    <td class="px-4 py-3">
      <ActionDropdown 
        :options="statusOptions" 
        v-model="localStatus"
        @update:modelValue="(status: string) => handleStatusChange(status as OrderStatus)"
      />
    </td>
    <td class="px-4 py-3">
      <StatusBadge :status="order.status" />
    </td>
  </tr>
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
  order: Order
  statusOptions: OrderStatus[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'status-change': [orderId: string, status: OrderStatus]
}>()

const localStatus = ref(props.order.status)

const handleStatusChange = (newStatus: OrderStatus) => {
  emit('status-change', props.order.id, newStatus)
}
</script>
