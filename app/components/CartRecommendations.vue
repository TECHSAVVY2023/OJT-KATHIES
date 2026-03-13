<template>
  <section class="mt-14 pt-10 border-t border-[#0F76D3]/10">
    <div class="flex items-center gap-2 mb-6">
      <span class="w-5 h-0.5 bg-[#CE1126] inline-block rounded-full" />
      <h2 class="text-lg font-bold text-[#083D6D]">You Might Also Like</h2>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <ProductCard v-for="p in recommendations" :key="p.id" :product="p" />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  recommendations: any[]
}>()
</script>