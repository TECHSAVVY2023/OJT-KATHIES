<template>
  <form
    ref="contactFormRef"
    class="bg-white rounded-2xl border border-[#0F76D3]/12 shadow-sm shadow-[#083D6D]/4 p-6 md:p-8 space-y-4"
    @submit.prevent="onSubmit"
  >
    <div
      v-for="field in contactSection?.fields"
      :key="field.id"
      class="space-y-1.5"
    >
      <label :for="field.id" class="text-xs font-semibold text-[#083D6D] uppercase tracking-widest">
        {{ field.label }}
      </label>
      <input
        v-if="field.type !== 'textarea'"
        :id="field.id"
        :name="field.name"
        :type="field.type"
        :placeholder="field.placeholder"
        class="w-full bg-[#EDF3FF] border border-[#c8dcf5] rounded-xl px-4 py-3 text-sm text-[#083D6D] placeholder-[#7A95B0] font-medium focus:ring-2 focus:ring-[#0F76D3]/30 focus:border-[#0F76D3] outline-none transition-all"
      >
      <textarea
        v-else
        :id="field.id"
        :name="field.name"
        :placeholder="field.placeholder"
        rows="4"
        class="w-full bg-[#EDF3FF] border border-[#c8dcf5] rounded-xl px-4 py-3 text-sm text-[#083D6D] placeholder-[#7A95B0] font-medium resize-none focus:ring-2 focus:ring-[#0F76D3]/30 focus:border-[#0F76D3] outline-none transition-all"
      />
    </div>

    <button
      type="submit"
      class="w-full py-3.5 bg-[#083D6D] hover:bg-[#0F76D3] text-white font-semibold text-sm rounded-xl tracking-wide transition-colors duration-200 flex items-center justify-center gap-2"
    >
      {{ contactSection?.submitLabel ?? 'Send Message' }}
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </button>
  </form>
</template>

<script setup lang="ts">
defineProps<{
  contactSection: any
}>()

defineEmits<{
  submit: []
}>()

const contactFormRef = ref<HTMLFormElement>()
</script>