<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-[#083D6D]/40 backdrop-blur-sm px-4"
      @click="$emit('close')"
    >
      <div class="bg-white rounded-2xl shadow-2xl shadow-[#083D6D]/20 max-w-sm w-full p-8 text-center" @click.stop>
        <!-- Check icon -->
        <div class="w-14 h-14 rounded-full bg-[#EDF3FF] border border-[#0F76D3]/20 flex items-center justify-center mx-auto mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-[#0F76D3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-[#083D6D] mb-2">Message Sent!</h3>
        <p class="text-sm text-[#4A6080] mb-6 leading-relaxed">
          Thank you for reaching out. We'll get back to you as soon as possible.
        </p>
        <button
          type="button"
          class="w-full py-3 text-sm font-semibold text-white bg-[#083D6D] hover:bg-[#0F76D3] rounded-xl transition-colors duration-200"
          @click="$emit('close')"
        >
          Done
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
}>()

defineEmits<{
  close: []
}>()
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>