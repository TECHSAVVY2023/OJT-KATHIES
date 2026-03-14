<template>
  <section class="py-[88px] pb-20 bg-white font-[Poppins,sans-serif]">
    <div class="max-w-[1240px] mx-auto px-8">

      <!-- Header -->
      <div class="flex justify-between items-end mb-12 max-sm:flex-col max-sm:items-start max-sm:gap-4 max-sm:mb-8">
        <div class="flex flex-col gap-[10px]">
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[#C8323A] shadow-[0_0_8px_rgba(200,50,58,0.6)] shrink-0"></span>
            <span class="text-[11px] font-medium tracking-[0.22em] uppercase text-[#0F76D3]">What's Coming</span>
          </div>
          <h2 class="text-[clamp(24px,3.5vw,38px)] font-bold leading-[1.15] text-[#083D6D] m-0 tracking-[-0.01em]">
            Upcoming
            <span class="relative inline-block text-[#083D6D]">
              Stocks
              <svg class="absolute -bottom-1.5 left-0 w-full h-[10px]" viewBox="0 0 140 10" fill="none" preserveAspectRatio="none">
                <path d="M2 7C35 2 70 1.5 138 5" stroke="url(#red-blue-grad)" stroke-width="3" stroke-linecap="round"/>
                <defs>
                  <linearGradient id="red-blue-grad" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#0F76D3" stop-opacity="0"/>
                    <stop offset="30%" stop-color="#0F76D3"/>
                    <stop offset="70%" stop-color="#C8323A"/>
                    <stop offset="100%" stop-color="#C8323A" stop-opacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
        </div>

        <div class="flex items-baseline gap-1 select-none">
          <span class="text-[28px] font-bold text-[#083D6D] leading-none">{{ String(currentIndex + 1).padStart(2, '0') }}</span>
          <span class="text-base text-[rgba(8,61,109,0.25)] font-light mx-0.5">/</span>
          <span class="text-[15px] font-normal text-[rgba(8,61,109,0.35)]">{{ String(totalPages).padStart(2, '0') }}</span>
        </div>
      </div>

      <!-- Carousel -->
      <div class="relative">
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform"
            :style="{ transform: `translateX(-${currentIndex * (100 / CAROUSEL_VISIBLE)}%)` }"
          >
            <div
              v-for="(p, idx) in list"
              :key="p.id"
              class="flex-[0_0_calc(20%-12px)] mx-[6px] opacity-40 scale-[0.96] transition-[opacity,transform] duration-400 ease-[ease]
                     lg:flex-[0_0_calc(25%-12px)]
                     max-sm:flex-[0_0_calc(70%-12px)]"
              :class="{ '!opacity-100 !scale-100': isVisible(idx) }"
            >
              <div class="rounded-2xl overflow-hidden bg-white border border-[#E6EAED]
                          shadow-[0_2px_16px_rgba(8,61,109,0.07),0_1px_4px_rgba(8,61,109,0.04)]
                          transition-[transform,box-shadow,border-color] duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                          cursor-pointer group">

                <!-- Image -->
                <div class="relative aspect-[4/3] overflow-hidden bg-[#F0F4F8]">
                  <img
                    v-if="p.productImage"
                    :src="p.productImage"
                    :alt="p.productFlavor"
                    class="w-full h-full object-cover block transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.07]"
                  >
                  <span v-else class="absolute inset-0 flex items-center justify-center text-[52px]">📦</span>
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-[rgba(8,61,109,0.3)] to-transparent opacity-0 transition-opacity duration-[350ms] ease-[ease] group-hover:opacity-100"
                    aria-hidden="true"
                  ></div>

                  <!-- Coming Soon badge -->
                  <div class="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-[#C8323A] rounded-[20px] px-3 py-[5px]
                              text-[10px] font-bold tracking-[0.1em] uppercase text-white
                              shadow-[0_3px_14px_rgba(200,50,58,0.45)]">
                    <span class="w-1.5 h-1.5 rounded-full bg-white shrink-0 badge-dot-pulse"></span>
                    Coming Soon
                  </div>
                </div>

                <!-- Card body text -->
                <div class="px-3 pt-2.5 pb-3 flex flex-col gap-1">
                  <p class="text-[12px] font-semibold text-[#083D6D] m-0 truncate transition-colors duration-300 group-hover:text-[#0F76D3]">
                    {{ p.productFlavor || 'New Arrival' }}
                  </p>
                  <p class="text-[10.5px] font-normal text-[#6B7F95] m-0 leading-[1.5] line-clamp-2">
                    {{ p.productDescription || 'Stay tuned — this product is arriving soon to our shelves.' }}
                  </p>
                  <div class="flex items-center justify-between mt-0.5">
                    <span class="text-[10px] font-medium tracking-[0.06em] uppercase text-[#0F76D3]">
                      {{ p.categoryName || 'Upcoming' }}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- Nav Prev -->
        <button
          class="absolute top-[42%] -translate-y-1/2 left-[-22px] max-sm:left-[-14px]
                 w-11 h-11 rounded-full bg-white border border-[#E6EAED] text-[#083D6D]
                 flex items-center justify-center cursor-pointer z-10
                 shadow-[0_2px_12px_rgba(8,61,109,0.1)]
                 transition-[background,border-color,color,transform,box-shadow,opacity] duration-[250ms] ease-[ease]
                 hover:not-disabled:bg-[#083D6D] hover:not-disabled:border-[#083D6D] hover:not-disabled:text-white
                 hover:not-disabled:-translate-y-1/2 hover:not-disabled:scale-[1.08]
                 hover:not-disabled:shadow-[0_6px_20px_rgba(8,61,109,0.22)]
                 disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="currentIndex === 0"
          aria-label="Previous"
          @click="currentIndex = Math.max(0, currentIndex - 1)"
        >
          <svg class="w-[18px] h-[18px]" viewBox="0 0 20 20" fill="none">
            <path d="M13 5l-5 5 5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Nav Next -->
        <button
          class="absolute top-[42%] -translate-y-1/2 right-[-22px] max-sm:right-[-14px]
                 w-11 h-11 rounded-full bg-white border border-[#E6EAED] text-[#083D6D]
                 flex items-center justify-center cursor-pointer z-10
                 shadow-[0_2px_12px_rgba(8,61,109,0.1)]
                 transition-[background,border-color,color,transform,box-shadow,opacity] duration-[250ms] ease-[ease]
                 hover:not-disabled:bg-[#083D6D] hover:not-disabled:border-[#083D6D] hover:not-disabled:text-white
                 hover:not-disabled:-translate-y-1/2 hover:not-disabled:scale-[1.08]
                 hover:not-disabled:shadow-[0_6px_20px_rgba(8,61,109,0.22)]
                 disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="currentIndex >= maxIndex"
          aria-label="Next"
          @click="currentIndex = Math.min(maxIndex, currentIndex + 1)"
        >
          <svg class="w-[18px] h-[18px]" viewBox="0 0 20 20" fill="none">
            <path d="M7 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Dots -->
      <div class="flex justify-center items-center gap-2 mt-7">
        <button
          v-for="i in totalPages"
          :key="i - 1"
          class="w-2 h-2 rounded-full bg-[#D1DAE5] border-none cursor-pointer p-0
                 transition-[background,width,box-shadow] duration-300 ease-[ease]"
          :class="{ '!w-7 !bg-[#0F76D3] shadow-[0_0_10px_rgba(15,118,211,0.35)]': (i - 1) === currentIndex }"
          :aria-label="`Go to page ${i}`"
          @click="currentIndex = i - 1"
        />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const { upcomingStocks: list } = useUpcomingStocksData()

const CAROUSEL_VISIBLE = 4
const currentIndex = ref(0)
const maxIndex = computed(() => Math.max(0, list.value.length - CAROUSEL_VISIBLE))
const totalPages = computed(() => Math.max(1, Math.ceil(list.value.length / CAROUSEL_VISIBLE)))

function isVisible(idx: number) {
  return idx >= currentIndex.value && idx < currentIndex.value + CAROUSEL_VISIBLE
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.35; transform: scale(0.6); }
}

.badge-dot-pulse {
  animation: pulse-dot 2s ease-in-out infinite;
}
</style>