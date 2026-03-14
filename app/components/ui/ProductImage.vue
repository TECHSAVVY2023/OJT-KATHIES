<template>
  <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
    <img 
      v-if="src" 
      :src="src" 
      :alt="alt" 
      class="w-full h-full object-contain" 
      @error="handleImageError"
    >
    <span v-else class="text-gray-400 text-xs">—</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src?: string
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'Product image'
})

const handleImageError = (e: Event) => {
  const img = e.currentTarget as HTMLImageElement
  img.style.display = 'none'
}
</script>
