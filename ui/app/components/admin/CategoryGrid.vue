<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    <div
      v-for="cat in categories"
      :key="cat.id"
      class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div class="w-14 h-14 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
        <img v-if="cat.image" :src="cat.image" :alt="cat.name" class="w-full h-full object-cover" @error="(e) => (e.currentTarget!.style.display = 'none')" />
        <span v-else class="text-gray-400 text-xs">No img</span>
      </div>
      <span class="font-medium text-gray-900 text-sm truncate flex-1 min-w-0">{{ cat.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryItem } from '~/types/catalog'

defineProps<{ categories: CategoryItem[] }>()
</script>
