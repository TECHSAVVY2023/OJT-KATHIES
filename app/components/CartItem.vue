<template>
  <div class="bg-white rounded-2xl border border-[#0F76D3]/12 p-4 sm:p-5 flex flex-wrap sm:flex-nowrap gap-4 items-center shadow-sm shadow-[#083D6D]/4 hover:shadow-md hover:shadow-[#083D6D]/8 transition-shadow">
    <!-- Product image -->
    <div class="w-16 h-16 sm:w-[72px] sm:h-[72px] flex-shrink-0 rounded-xl overflow-hidden bg-[#EDF3FF] border border-[#c8dcf5] flex items-center justify-center">
      <img
        :src="line.product.imageUrl"
        :alt="line.product.name"
        class="w-full h-full object-contain p-1"
      >
    </div>

    <!-- Name + description -->
    <div class="flex-1 min-w-0">
      <h3 class="font-semibold text-[#083D6D] text-sm leading-tight truncate">{{ line.product.name }}</h3>
      <p class="text-[#7A95B0] text-xs truncate mt-0.5">{{ lineDescription(line.product) }}</p>
    </div>

    <!-- Qty selector -->
    <div class="flex items-center rounded-xl bg-[#083D6D] overflow-hidden shrink-0">
      <button
        type="button"
        class="w-9 h-9 flex items-center justify-center text-white hover:bg-white/10 transition-colors text-lg leading-none"
        aria-label="Decrease"
        @click="$emit('updateQuantity', line.product.id, line.quantity - 1)"
      >
        −
      </button>
      <span class="min-w-[2rem] text-center text-sm font-semibold text-white">{{ line.quantity }}</span>
      <button
        type="button"
        class="w-9 h-9 flex items-center justify-center text-white hover:bg-white/10 transition-colors text-lg leading-none"
        aria-label="Increase"
        @click="$emit('updateQuantity', line.product.id, line.quantity + 1)"
      >
        +
      </button>
    </div>

    <!-- Price -->
    <span class="font-bold text-[#083D6D] shrink-0 w-16 text-right text-sm">{{ line.product.currency }}{{ (line.product.price * line.quantity).toFixed(2) }}</span>

    <!-- Delete -->
    <button
      type="button"
      class="p-2 text-[#CE1126]/50 hover:text-[#CE1126] hover:bg-rose-50 rounded-lg transition-colors flex-shrink-0"
      aria-label="Remove from cart"
      @click="$emit('removeItem', line.product.id)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  line: any
  lineDescription: (product: any) => string
}>()

defineEmits<{
  updateQuantity: [productId: string, quantity: number]
  removeItem: [productId: string]
}>()
</script>