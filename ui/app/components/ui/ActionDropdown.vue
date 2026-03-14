<template>
  <div class="relative" data-action-dropdown>
    <button
      type="button"
      class="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg border border-[#D3DDFF] text-[#20437B] hover:bg-[#D3DDFF]/50 text-xs font-medium"
      @click="toggleDropdown"
    >
      {{ modelValue }}
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div
      v-if="isOpen"
      class="absolute left-0 top-full mt-1 z-10 py-1 bg-white rounded-lg border border-[#D3DDFF] shadow-lg min-w-[120px]"
      data-action-dropdown
    >
      <button
        v-for="option in options"
        :key="option"
        type="button"
        class="w-full text-left px-3 py-1.5 text-xs hover:bg-[#D3DDFF]/50 text-gray-700"
        @click="selectOption(option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  options: string[]
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: string) => {
  emit('update:modelValue', option)
  isOpen.value = false
}

const closeOnClickOutside = (e: MouseEvent) => {
  if (isOpen.value && !(e.target as Element).closest('[data-action-dropdown]')) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', closeOnClickOutside))
onUnmounted(() => document.removeEventListener('click', closeOnClickOutside))
</script>
