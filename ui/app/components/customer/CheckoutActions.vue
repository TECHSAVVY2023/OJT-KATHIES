<template>
  <footer class="flex flex-wrap items-center justify-between gap-4 mt-8">
    <NuxtLink to="/cart" class="inline-flex items-center gap-1.5 text-[#1e3a5f] font-medium hover:underline">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Back To Cart
    </NuxtLink>
    <button
      type="submit"
      @click.prevent="$emit('place-order')"
      form="checkout-form"
      class="px-8 py-3.5 bg-[#1e3a5f] hover:bg-[#162d47] text-white font-semibold rounded-xl transition-colors"
    >
      Place Order
    </button>
  </footer>
</template>

<script setup lang="ts">
defineEmits<{
  'place-order': []
}>()
</script>