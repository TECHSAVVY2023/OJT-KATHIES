<template>
  <section class="pt-10 sm:pt-12 pb-8 sm:pb-10">
    <div class="container mx-auto px-6 max-w-6xl">

      <!-- Eyebrow -->
      <div class="flex items-center gap-2 mb-6">
        <span class="w-5 h-0.5 bg-[#CE1126] inline-block rounded-full" />
        <span class="text-[#CE1126] text-xs font-semibold tracking-[0.18em] uppercase">Our Story</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        <!-- Left: Text -->
        <div class="order-1">
          <h1 class="text-4xl sm:text-5xl md:text-[3.25rem] font-bold text-[#083D6D] leading-[1.15] tracking-tight mb-6">
            Bringing the taste<br />
            of home to<br />
            <span class="text-[#0F76D3]">South Africa</span>
          </h1>
          <p class="text-[#4A6080] text-base leading-relaxed mb-4">
            Your home for authentic Filipino flavors in South Africa — because home should never feel too far.
          </p>
          <p class="text-[#4A6080] text-base leading-relaxed">
            We make it easy to find the Filipino ingredients, snacks, and products you love, right where you are.
          </p>
        </div>

        <!-- Right: Carousel -->
        <div class="order-2">
          <div class="relative">
            <div class="absolute -bottom-3 -right-3 w-full h-full bg-[#0F76D3]/10 rounded-2xl z-0" />
            <div class="relative z-10 overflow-hidden rounded-2xl shadow-lg shadow-[#083D6D]/10">
              <div
                class="flex gap-2 transition-transform duration-700 ease-out"
                :style="{ transform: `translateX(-${carouselIndex * (100 / visibleCount)}%)` }"
              >
                <div
                  v-for="(img, i) in aboutImages"
                  :key="img"
                  class="flex-shrink-0"
                  :class="visibleCount === 1 ? 'w-full min-w-full' : 'w-1/3 min-w-[33.333%]'"
                >
                  <div class="aspect-[3/4] overflow-hidden bg-[#C8DCEE]">
                    <img
                      :src="img"
                      :alt="`About Kathie's Kitchen ${i + 1}`"
                      class="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Dots -->
            <div v-if="aboutImages.length > visibleCount" class="flex justify-center gap-2 mt-4">
              <button
                v-for="i in totalCarouselPages"
                :key="i - 1"
                type="button"
                class="transition-all duration-300 rounded-full"
                :class="(i - 1) === carouselIndex
                  ? 'w-6 h-2 bg-[#083D6D]'
                  : 'w-2 h-2 bg-[#083D6D]/20 hover:bg-[#0F76D3]/50'"
                :aria-label="`Slide ${i}`"
                @click="carouselIndex = i - 1"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const carouselIndex = ref(0)
const isMobile = ref(false)
const visibleCount = computed(() => (isMobile.value ? 1 : 3))
const aboutImages = computed(() => ['/images/flip.png', '/images/ask.png', '/images/h1.png'])
const totalCarouselPages = computed(() => Math.max(1, aboutImages.value.length - visibleCount.value + 1))

function updateMobile() {
  if (typeof window !== 'undefined') isMobile.value = window.innerWidth < 640
}

let carouselTimer: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  updateMobile()
  window.addEventListener('resize', updateMobile)
  carouselTimer = setInterval(() => {
    const max = totalCarouselPages.value
    carouselIndex.value = (carouselIndex.value + 1) % max
  }, 4000)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateMobile)
  if (carouselTimer) clearInterval(carouselTimer)
})
</script>