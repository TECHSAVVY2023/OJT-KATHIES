<template>
  <div class="pc-search-wrap">
    <div class="pc-search" :class="{ 'pc-search--active': searchFocused }">
      <span class="pc-search__icon">
        <svg viewBox="0 0 20 20" fill="none" class="w-4 h-4">
          <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="1.8"/>
          <path d="M13.5 13.5L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </span>
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search products, brands, categories…"
        class="pc-search__input"
        @focus="searchFocused = true"
        @blur="searchFocused = false"
      />
      <transition name="fade-pill">
        <span v-if="searchQuery" class="pc-search__result-badge">
          {{ filteredProducts.length }} found
        </span>
      </transition>
      <button v-if="searchQuery" type="button" class="pc-search__clear" @click="clearSearch" aria-label="Clear search">
        <svg viewBox="0 0 14 14" fill="none" class="w-3 h-3">
          <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- reset chip -->
    <div v-if="showResetButton" class="pc-toolbar-actions">
      <span class="pc-results-count">
        <strong>{{ filteredProducts.length }}</strong> result{{ filteredProducts.length !== 1 ? 's' : '' }}
      </span>
      <button type="button" class="pc-reset-btn" @click="$emit('clearFilters')">
        <svg viewBox="0 0 14 14" fill="none" class="w-3 h-3">
          <path d="M2 7a5 5 0 1 0 1.5-3.5L2 2v3h3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Reset
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  searchQuery: string
  filteredProducts: any[]
  showResetButton: boolean
}>()

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'clearFilters': []
}>()

const searchFocused = ref(false)

const searchQuery = computed({
  get: () => props.searchQuery,
  set: (value: string) => emit('update:searchQuery', value)
})

function clearSearch() {
  emit('update:searchQuery', '')
}
</script>

<style scoped>
/* ══ SEARCH ══ */
.pc-search-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  position: sticky;
  top: 88px;
  z-index: 20;
}
.pc-search {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.2s ease;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(15,23,42,0.05);
}
.pc-search--active {
  border-color: #1e4f8c;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(30,79,140,0.08), 0 4px 16px rgba(30,79,140,0.08);
}
.pc-search__icon {
  position: absolute;
  left: 14px;
  color: #94a3b8;
  pointer-events: none;
  display: flex;
  transition: color 0.15s ease;
}
.pc-search--active .pc-search__icon { color: #1e4f8c; }
.pc-search__input {
  width: 100%;
  padding: 12px 100px 12px 42px;
  font-size: 0.84rem;
  font-weight: 500;
  color: #0f172a;
  background: transparent;
  border: none;
  outline: none;
  appearance: none;
  font-family: 'Instrument Sans', sans-serif;
}
.pc-search__input::placeholder { color: #94a3b8; font-weight: 400; }
.pc-search__input::-webkit-search-cancel-button { display: none; }
.pc-search__result-badge {
  position: absolute;
  right: 44px;
  font-size: 10px;
  font-weight: 700;
  color: #0f172a;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  padding: 2px 9px;
  white-space: nowrap;
  pointer-events: none;
  font-family: 'Syne', sans-serif;
  letter-spacing: 0.04em;
}
.pc-search__clear {
  position: absolute;
  right: 10px;
  width: 28px; height: 28px;
  border-radius: 8px;
  border: 1.5px solid #e2e8f0;
  background: #f8fafc;
  color: #64748b;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.13s ease;
}
.pc-search__clear:hover { background: #1e4f8c; color: #fff; border-color: #1e4f8c; }

.pc-toolbar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.pc-results-count {
  font-size: 11px;
  color: #64748b;
  white-space: nowrap;
  font-family: 'Instrument Sans', sans-serif;
}
.pc-results-count strong { color: #0f172a; font-weight: 700; }
.pc-reset-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  padding: 7px 13px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  font-family: 'Instrument Sans', sans-serif;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}
.pc-reset-btn:hover { background: #1e4f8c; color: #fff; border-color: #1e4f8c; }

.fade-pill-enter-active, .fade-pill-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.fade-pill-enter-from, .fade-pill-leave-to { opacity: 0; transform: scale(0.85); }
</style>
