<template>
  <div class="px-4 py-3 border-t border-[#D3DDFF]/60 flex flex-wrap items-center justify-between gap-2">
    <p class="text-sm text-gray-600">
      Showing {{ rangeStart }}-{{ rangeEnd }} of {{ totalItems }} products
    </p>
    <div class="flex items-center gap-1">
      <button
        type="button"
        class="p-2 rounded-lg border border-[#D3DDFF] text-[#20437B] hover:bg-[#D3DDFF]/50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        :disabled="currentPage <= 1"
        @click="$emit('page-change', currentPage - 1)"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <template v-for="page in visiblePages" :key="page">
        <button
          v-if="page !== '...'"
          type="button"
          class="min-w-[32px] h-8 rounded-lg font-medium transition-colors"
          :class="page === currentPage ? 'bg-[#20437B] text-white' : 'text-[#20437B] hover:bg-[#D3DDFF]/50'"
          @click="$emit('page-change', page as number)"
        >
          {{ page }}
        </button>
        <span v-else class="px-1 text-gray-400">...</span>
      </template>
      
      <button
        type="button"
        class="p-2 rounded-lg border border-[#D3DDFF] text-[#20437B] hover:bg-[#D3DDFF]/50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        :disabled="currentPage >= totalPages"
        @click="$emit('page-change', currentPage + 1)"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
  rangeStart: number
  rangeEnd: number
  perPage?: number
}

const props = defineProps<Props>()

defineEmits<{
  'page-change': [page: number]
}>()

const visiblePages = computed(() => {
  const total = props.totalPages
  const cur = props.currentPage
  
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  
  const pages: (number | string)[] = []
  if (cur <= 4) {
    pages.push(1, 2, 3, 4, '...', total)
  } else if (cur >= total - 3) {
    pages.push(1, '...', total - 3, total - 2, total - 1, total)
  } else {
    pages.push(1, '...', cur - 1, cur, cur + 1, '...', total)
  }
  
  return pages
})
</script>
