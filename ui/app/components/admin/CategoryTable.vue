<template>
  <div class="bg-white rounded-xl shadow-sm border border-[#D3DDFF] overflow-hidden">
    <div class="relative">
      <input
        :value="props.searchQuery"
        @input="onInput"
        type="search"
        placeholder="Search here"
        class="w-full pl-4 pr-10 py-2.5 border border-[#D3DDFF] rounded-lg text-sm focus:ring-2 focus:ring-[#20437B]/30 focus:border-[#20437B] outline-none"
      />
      <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[#20437B]/50 pointer-events-none">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </span>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-[#D3DDFF]/50 text-[#20437B] font-semibold text-left">
            <th class="px-4 py-3">Category</th>
            <th class="px-4 py-3">Created Date</th>
            <th class="px-4 py-3">Order</th>
            <th class="px-4 py-3 text-right w-24">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="cat in props.categories"
            :key="cat.id"
            class="border-t border-[#D3DDFF]/60 hover:bg-[#D3DDFF]/20 transition-colors"
          >
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                  <img
  v-if="cat.image"
  :src="cat.image"
  :alt="cat.name"
  class="w-full h-full object-cover"
  @error="(e) => { const img = e.currentTarget as HTMLImageElement; img.style.display = 'none' }"
/>
                  <span v-else class="text-gray-400 text-xs">—</span>
                </div>
                <span class="font-medium text-[#20437B]">{{ cat.name }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-gray-600">{{ cat.createdAt || '—' }}</td>
            <td class="px-4 py-3 text-gray-600">{{ cat.order ?? '—' }}</td>
            <td class="px-4 py-3 text-right">
              <div class="flex items-center justify-end gap-1">
                <button type="button" class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" aria-label="Edit" @click="$emit('edit', cat)">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button type="button" class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" aria-label="Delete" @click="$emit('delete', cat)">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="props.categories.length === 0" class="text-center text-gray-500 py-8">No categories match your search.</p>
  </div>
</template>

<script setup lang="ts">
import type { CategoryItem } from '~/types/catalog'

const props = defineProps<{
  categories: CategoryItem[]
  searchQuery: string
}>()

const emit = defineEmits<{
  (event: 'edit', item: CategoryItem): void
  (event: 'delete', item: CategoryItem): void
  (event: 'update:searchQuery', value: string): void
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement | null
  if (!target) return
  emit('update:searchQuery', target.value)
}
</script>
