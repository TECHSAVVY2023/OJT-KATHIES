<template>
  <!-- Display mode for table rows -->
  <div v-if="mode === 'display'" class="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="w-full h-full object-contain"
      @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
    >
    <span v-else class="text-gray-400 text-xs">No img</span>
  </div>

  <!-- Circular display mode for modals -->
  <div v-else-if="mode === 'circular-display'" class="w-40 h-40 rounded-full border-2 border-dashed border-[#D3DDFF] flex flex-col items-center justify-center overflow-hidden bg-gray-50/50">
    <img v-if="src" :src="src" :alt="alt" class="w-full h-full object-cover">
    <template v-else>
      <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span class="text-sm text-gray-500">No image</span>
    </template>
  </div>

  <!-- Upload mode for forms -->
  <label v-else-if="mode === 'upload'" class="cursor-pointer block">
    <input ref="imageInputRef" type="file" accept="image/*" class="hidden" @change="onImageSelect">
    <div class="w-40 h-40 rounded-full border-2 border-dashed border-[#D3DDFF] flex flex-col items-center justify-center gap-2 hover:border-[#20437B]/50 hover:bg-[#D3DDFF]/20 transition-colors overflow-hidden">
      <img v-if="src" :src="src" :alt="alt" class="w-full h-full object-cover">
      <template v-else>
        <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-sm text-gray-500">Upload Image</span>
      </template>
    </div>
  </label>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

interface Props {
  src?: string
  alt?: string
  mode: 'display' | 'circular-display' | 'upload'
}

const props = defineProps<Props>()

const imageInputRef = ref<HTMLInputElement | null>(null)

const emit = defineEmits<{
  'update:src': [value: string]
}>()

function onImageSelect(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !file.type.startsWith('image/')) return
  
  const reader = new FileReader()
  reader.onload = () => {
    emit('update:src', reader.result as string)
  }
  reader.readAsDataURL(file)
  input.value = ''
}

// Expose the file input ref for programmatic access
defineExpose({
  imageInputRef
})
</script>
