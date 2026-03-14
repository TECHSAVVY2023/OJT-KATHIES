<template>
  <div class="bg-white rounded-2xl border border-[#0F76D3]/12 px-6 py-4 flex items-center justify-between shadow-sm">
    <span class="text-[#4A6080] text-sm font-medium">Subtotal ({{ itemCount }} {{ itemCount === 1 ? 'item' : 'items' }})</span>
    <span class="text-xl font-bold text-[#083D6D]">R {{ subtotal.toFixed(2) }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  itemCount: number
  subtotal: number
}>()
</script>