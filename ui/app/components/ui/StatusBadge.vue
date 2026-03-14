<template>
  <span
    class="inline-block px-2.5 py-1 rounded-full text-xs font-medium"
    :class="statusClass"
  >
    {{ status }}
  </span>
</template>

<script setup lang="ts">
import type { OrderStatus } from '~/types/catalog'

interface Props {
  status: OrderStatus
}

const props = defineProps<Props>()

const statusClass = computed(() => {
  switch (props.status) {
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
})
</script>
