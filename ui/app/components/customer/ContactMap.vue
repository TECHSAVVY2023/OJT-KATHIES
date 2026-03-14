<template>
  <div class="sticky top-24">
    <div class="bg-white border border-[#0F76D3]/12 shadow-sm shadow-[#083D6D]/4 overflow-hidden">
      <!-- Map label bar -->
      <div class="px-5 py-4 border-b border-[#EDF3FF] flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-[#EDF3FF] flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#0F76D3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        </div>
        <div>
          <p class="text-xs font-bold text-[#083D6D]">Our Location</p>
          <p class="text-[11px] text-[#7A95B0]">Cape Town, Western Cape, South Africa</p>
        </div>
      </div>

      <!-- Map embed -->
      <div class="aspect-[4/3] min-h-[280px] sm:min-h-[360px] w-full">
        <iframe
          v-if="contactSection?.mapEmbedUrl"
          :src="contactSection.mapEmbedUrl"
          width="100%"
          height="100%"
          style="border:0; min-height: 280px;"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  contactSection: any
}>()
</script>