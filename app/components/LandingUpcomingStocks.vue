<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-[#1e3a5f] text-center mb-10">
        Upcoming Stocks
      </h2>
      <div class="relative max-w-7xl mx-auto px-14">
        <div class="overflow-hidden w-full">
          <div
            class="flex gap-4 transition-transform duration-300 ease-out"
            :style="{
              width: `${Math.max(100, (list.length / CAROUSEL_VISIBLE) * 100)}%`,
              transform: `translateX(-${currentIndex * (400 / Math.max(4, list.length))}%)`
            }"
          >
            <div
              v-for="p in list"
              :key="p.id"
              class="flex-shrink-0 flex justify-center"
              :style="{ width: `${100 / Math.max(1, list.length)}%` }"
            >
              <div class="group w-full rounded-2xl overflow-hidden shadow-lg flex flex-col bg-white">
                <div class="relative px-3 pt-4 flex items-end justify-center flex-1 min-h-[180px] bg-amber-900/5 overflow-hidden">
                  <img
                    v-if="p.productImage"
                    :src="p.productImage"
                    :alt="p.productFlavor"
                    class="w-full h-auto max-h-[200px] object-contain object-bottom drop-shadow-2xl transition-transform duration-300 ease-out group-hover:scale-110"
                  >
                  <span v-else class="text-5xl">📦</span>
                </div>
                <div
                  class="relative mt-auto px-4 pt-2 pb-4 rounded-b-2xl"
                  style="background: linear-gradient(180deg, #083D6D 0%, #0F76D3 100%);"
                >
                  <p class="text-white text-xs font-medium uppercase tracking-wide mb-3 line-clamp-2">
                    {{ p.description || `${p.productBrand} ${p.productFlavor}` }}
                  </p>
                  <NuxtLink
                    :to="p.buttonPath"
                    class="block w-full text-center py-3 text-white font-bold text-sm uppercase rounded-xl transition-opacity hover:opacity-95"
                    style="background: linear-gradient(180deg, #e8b84a 0%, #c9942e 50%, #a67c20 100%); box-shadow: 0 2px 8px rgba(0,0,0,0.2);"
                  >
                    {{ p.buttonText }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="absolute -left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white disabled:opacity-30 disabled:pointer-events-none z-10"
          style="background-color: #083D6D;"
          :disabled="currentIndex === 0"
          aria-label="Previous"
          @click="currentIndex = Math.max(0, currentIndex - 1)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          class="absolute -right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white disabled:opacity-30 disabled:pointer-events-none z-10"
          style="background-color: #083D6D;"
          :disabled="currentIndex >= maxIndex"
          aria-label="Next"
          @click="currentIndex = Math.min(maxIndex, currentIndex + 1)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div class="flex justify-center gap-2.5 mt-6">
          <button
            v-for="i in totalPages"
            :key="i - 1"
            type="button"
            class="w-2.5 h-2.5 rounded-full transition-colors"
            :class="(i - 1) === currentIndex ? 'bg-[#1e3a5f]' : 'bg-gray-300'"
            :aria-label="`Go to page ${i}`"
            @click="currentIndex = i - 1"
          />
        </div>
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
</script>
