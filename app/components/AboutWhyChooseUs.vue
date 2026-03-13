<template>
  <section class="py-10 md:py-14 bg-white">
    <div class="container mx-auto px-6 max-w-6xl">

      <!-- Header -->
      <div class="mb-12">
        <div class="flex items-center gap-2 mb-3">
          <span class="w-5 h-0.5 bg-[#CE1126] inline-block rounded-full" />
          <span class="text-[#CE1126] text-xs font-semibold tracking-[0.18em] uppercase">What sets us apart</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-[#083D6D]">
          Why Choose Kathie's Kitchen
        </h2>
      </div>

      <!-- Cards -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          v-for="(f, idx) in whyChooseUsGridOrder"
          :key="f.id"
          class="group bg-[#EDF3FF] rounded-xl p-7 flex flex-col cursor-default transition-all duration-300 hover:bg-[#083D6D] hover:shadow-xl hover:shadow-[#083D6D]/15 hover:-translate-y-1"
        >
          <!-- Icon wrapper -->
          <div class="w-11 h-11 rounded-lg bg-white flex items-center justify-center text-[#0F76D3] mb-5 shadow-sm group-hover:bg-[#0F76D3] group-hover:text-white transition-colors duration-300">
            <svg v-if="f.icon === 'quality-goods'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <svg v-else-if="f.icon === 'easy-access'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
            </svg>
            <svg v-else-if="f.icon === 'authentic-taste'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else-if="f.icon === 'more-deals'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span v-else class="text-base">◆</span>
          </div>

          <h3 class="font-semibold text-[#083D6D] text-sm mb-2 group-hover:text-white transition-colors duration-300">
            {{ f.name }}
          </h3>
          <p class="text-[#4A6080] text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
            {{ f.description }}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLandingData } from '~/composables/useLandingData'

const { whyChooseUs } = useLandingData()

const whyChooseUsGridOrder = computed(() => {
  const features = whyChooseUs.value?.features ?? []
  const ordered = [features[0], features[2], features[1], features[3]]

  // Filter out any undefined items and keep type narrowing for template usage
  return ordered.filter(
    (item): item is NonNullable<typeof item> => Boolean(item)
  )
})
</script>