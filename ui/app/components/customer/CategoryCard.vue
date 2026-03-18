<template>
  <NuxtLink
    :to="`/categories?category=${encodeURIComponent(category.name)}`"
    class="group bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-lg hover:border-[#1e3a5f] hover:bg-[#1e3a5f]/5 transition-all"
    :class="{ 'ring-2 ring-[#1e3a5f] border-[#1e3a5f]': isSelected }"
  >
    <div class="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden mb-4 group-hover:scale-105 transition-transform">
      <img
        v-if="category.image"
        :src="category.image"
        :alt="category.name"
        class="w-full h-full object-contain"
      />
      <span v-else class="text-4xl">📦</span>
    </div>
    <p class="font-semibold text-gray-900 group-hover:text-[#1e3a5f] transition-colors">
      {{ category.name }}
    </p>
    <span class="text-xs text-gray-500 mt-1">View products →</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { CategoryItem } from '~/types/catalog'

defineProps<{
  category: CategoryItem
  isSelected?: boolean
}>()
</script>
