<template>
  <div v-if="totalPages > 1" class="pc-pagination">
    <NuxtLink
      v-if="currentPage < totalPages"
      :to="paginationLink(currentPage + 1)"
      class="pc-page-link"
    >Next Page →</NuxtLink>
    <NuxtLink
      v-else-if="currentPage > 1"
      :to="paginationLink(currentPage - 1)"
      class="pc-page-link"
    >← Previous</NuxtLink>
    <span v-else />
    <div class="pc-page-controls">
      <button
        type="button"
        class="pc-page-btn"
        :disabled="currentPage <= 1"
        aria-label="Previous page"
        @click="$emit('update:currentPage', Math.max(1, currentPage - 1))"
      >←</button>
      <span class="pc-page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button
        type="button"
        class="pc-page-btn"
        :disabled="currentPage >= totalPages"
        aria-label="Next page"
        @click="$emit('update:currentPage', Math.min(totalPages, currentPage + 1))"
      >→</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
  paginationLink: (page: number) => any
}>()

defineEmits<{
  'update:currentPage': [page: number]
}>()
</script>

<style scoped>
/* ══ PAGINATION ══ */
.pc-pagination {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.pc-page-link {
  font-family: 'Syne', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #1e4f8c;
  text-decoration: none;
  transition: opacity 0.15s ease;
}
.pc-page-link:hover { opacity: 0.65; }
.pc-page-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}
.pc-page-btn {
  width: 38px; height: 38px;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  background: #fff;
  color: #475569;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: 'Instrument Sans', sans-serif;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}
.pc-page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.pc-page-btn:not(:disabled):hover { background: #1e4f8c; color: #fff; border-color: #1e4f8c; }
.pc-page-info {
  font-family: 'Syne', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #94a3b8;
  min-width: 3.5rem;
  text-align: center;
}
</style>
