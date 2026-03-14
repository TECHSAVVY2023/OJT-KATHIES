<template>
  <div class="flex flex-col sm:flex-row gap-3">
    <div class="flex-1 relative">
      <input
        :model-value="searchQuery"
        @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        type="search"
        placeholder="Search here"
        class="w-full pl-4 pr-10 py-2.5 border border-[#D3DDFF] rounded-lg text-sm focus:ring-2 focus:ring-[#20437B]/30 focus:border-[#20437B] outline-none"
      >
      <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[#20437B]/50 pointer-events-none">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </span>
    </div>
    <div class="flex flex-wrap gap-2">
      <select
        :model-value="statusFilter"
        @change="$emit('update:statusFilter', ($event.target as HTMLSelectElement).value)"
        class="px-4 py-2.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 text-sm font-medium focus:ring-2 focus:ring-amber-300 outline-none"
      >
        <option value="">All Status</option>
        <option value="in">In Stock</option>
        <option value="out">Out of Stock</option>
      </select>
      <select
        :model-value="categoryFilter"
        @change="$emit('update:categoryFilter', ($event.target as HTMLSelectElement).value)"
        class="px-4 py-2.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm font-medium focus:ring-2 focus:ring-emerald-300 outline-none"
      >
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.name">
          {{ cat.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryItem } from '~/types/catalog'

interface Props {
  searchQuery: string
  statusFilter: string
  categoryFilter: string
  categories: readonly CategoryItem[]
}

defineProps<Props>()

defineEmits<{
  'update:searchQuery': [value: string]
  'update:statusFilter': [value: string]
  'update:categoryFilter': [value: string]
}>()
</script>
