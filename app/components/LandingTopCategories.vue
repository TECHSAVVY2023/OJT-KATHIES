<template>
  <section class="py-16" style="background-color: #CBD7E8;">
    <div class="container mx-auto px-4 text-center">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold">
          <span class="text-gray-700">Shop From </span>
          <span class="text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-0.5">Top Categories</span>
        </h2>
        <NuxtLink to="/products" class="text-[#1e3a5f] font-medium shrink-0">
          View All →
        </NuxtLink>
      </div>
      <div class="flex gap-8 overflow-x-auto pb-4 justify-center">
        <div
          v-for="cat in categories"
          :key="cat.id"
          class="flex-shrink-0 text-center group"
        >
          <NuxtLink :to="cat.path" class="block">
            <div class="w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden p-1 transition-colors group-hover:ring-2 group-hover:ring-[#1e3a5f] group-hover:bg-[#1e3a5f]/5">
              <img v-if="cat.image" :src="cat.image" :alt="cat.name" class="w-full h-full object-contain transition-transform duration-300 ease-out group-hover:scale-110">
              <span v-else class="text-3xl">📦</span>
            </div>
            <p class="mt-3 text-sm font-medium text-gray-700 group-hover:text-[#1e3a5f] transition-colors">{{ cat.name }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { categories } = useCategoriesData()
</script>
