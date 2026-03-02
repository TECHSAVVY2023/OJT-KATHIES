<template>
  <div class="page-root min-h-screen bg-[#EDF3FF]">
    <PageHeader active-path="/about" />

    <div class="pt-16">

      <!-- Hero Section -->
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

      <!-- Why Choose Us -->
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

      <!-- CTA Banner -->
      <section class="py-12 md:py-16 bg-[#EDF3FF]">
        <div class="container mx-auto px-6 max-w-4xl text-center">
          <div class="flex items-center justify-center gap-2 mb-4">
            <span class="w-5 h-0.5 bg-[#CE1126] inline-block rounded-full" />
            <span class="text-[#CE1126] text-xs font-semibold tracking-[0.18em] uppercase">Ready to explore?</span>
            <span class="w-5 h-0.5 bg-[#CE1126] inline-block rounded-full" />
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-[#083D6D] leading-tight mb-4">
            Taste the Philippines,<br class="hidden sm:block" /> right here in South Africa
          </h2>
          <p class="text-[#4A6080] text-sm mb-7 max-w-md mx-auto leading-relaxed">
            Authentic Filipino groceries and snacks, delivered to your door.
          </p>
          <a
            href="/shop"
            class="inline-flex items-center gap-2 bg-[#083D6D] hover:bg-[#0F76D3] text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-colors duration-200 tracking-wide"
          >
            Shop Now
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
const { aboutSection, whyChooseUs } = useLandingData()
const carouselIndex = ref(0)
const isMobile = ref(false)
const visibleCount = computed(() => (isMobile.value ? 1 : 3))
const aboutImages = computed(() => aboutSection.value?.images ?? ['/images/flip.png', '/images/ask.png', '/images/h1.png'])
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

const whyChooseUsGridOrder = computed(() => {
  const f = whyChooseUs.value?.features ?? []
  return [f[0], f[2], f[1], f[3]].filter(Boolean)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

.page-root,
.page-root * {
  font-family: 'Poppins', sans-serif;
}
</style>