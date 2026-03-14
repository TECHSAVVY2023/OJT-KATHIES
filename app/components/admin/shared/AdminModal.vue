<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="onClose">
      <div class="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-[#D3DDFF] flex items-center justify-between">
          <h2 class="text-lg font-bold text-[#20437B]">{{ title }}</h2>
          <button type="button" class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" aria-label="Close" @click="onClose">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6">
          <slot />
        </div>
        
        <div v-if="showFooter" class="flex justify-end gap-2 pt-6 mt-6 border-t border-[#D3DDFF]">
          <slot name="footer">
            <button type="button" class="px-4 py-2 rounded-lg border border-[#D3DDFF] text-[#20437B] hover:bg-[#D3DDFF]/50" @click="onClose">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 rounded-lg bg-[#20437B] text-white font-medium hover:opacity-90" @click="onSubmit">
              {{ submitText }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
  title: string
  submitText?: string
  showFooter?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Save',
  showFooter: true
})

const emit = defineEmits<{
  close: []
  submit: []
}>()

function onClose() {
  emit('close')
}

function onSubmit() {
  emit('submit')
}
</script>
