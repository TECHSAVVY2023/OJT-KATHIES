<template>
  <div class="mb-8">
    <div class="flex items-center gap-2 mb-2">
      <span class="w-5 h-0.5 bg-[#CE1126] inline-block rounded-full" />
      <span class="text-[#CE1126] text-xs font-semibold tracking-[0.18em] uppercase">Your Order</span>
    </div>
    <h1 class="text-3xl font-bold text-[#083D6D]">Shopping Cart</h1>
    <p class="text-[#7A95B0] text-sm mt-1">
      {{ itemCount }} {{ itemCount === 1 ? 'item' : 'items' }} in your cart
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  itemCount: number
}>()
</script>