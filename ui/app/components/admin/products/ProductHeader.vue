<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-[#20437B]">Products</h1>
      <p class="text-[#20437B]/80 mt-1">
        You have <strong class="text-[#20437B]">{{ productCountLabel }}</strong> Products Today
      </p>
    </div>
    <div class="flex items-center gap-2 shrink-0">
      <button
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#20437B] text-white font-medium hover:opacity-90 transition-opacity"
        @click="$emit('add-product')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        Add Product
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  productCountLabel: string
}

defineProps<Props>()

defineEmits<{
  'add-product': []
}>()
</script>
