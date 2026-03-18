<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
        <header class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 id="modal-title" class="text-lg font-semibold text-gray-800">Success</h2>
          <button
            type="button"
            class="p-2 text-[#1e3a5f] hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
            @click="$emit('close')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        
        <main class="px-6 py-8 text-center">
          <div class="mb-4" role="img" aria-label="Success checkmark">
            <svg class="w-16 h-16 mx-auto text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
          
          <p class="text-2xl font-bold text-green-600 mb-4">
            Thank You For Your Order!
          </p>
          <p class="text-gray-800 mb-2">
            Order #<span class="font-semibold text-[#1e3a5f]">{{ orderNumber }}</span> Has Been Placed
          </p>
          <p class="text-gray-600 text-sm">
            You Will Receive An Email Confirmation Shortly At Your Email
          </p>
        </main>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
  orderNumber: string
}

defineProps<Props>()

defineEmits<{
  close: []
}>()
</script>
