<template>
  <div class="mb-10">
    <div class="flex items-center gap-2 mb-3">
      <span class="w-5 h-0.5 bg-[#CE1126] inline-block rounded-full" />
      <span class="text-[#CE1126] text-xs font-semibold tracking-[0.18em] uppercase">Contact Us</span>
    </div>
    <h1 class="text-3xl sm:text-4xl font-bold text-[#083D6D] leading-tight">
      {{ contactSection?.title }}
      <span class="text-[#0F76D3]"> {{ contactSection?.highlight }}</span>
    </h1>
    <p v-if="contactSection?.subtitle" class="text-[#4A6080] text-base mt-2 max-w-lg">
      {{ contactSection?.subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  contactSection: any
}>()
</script>