<template>
  <section class="text-white py-12" style="background: linear-gradient(180deg, #083D6D 0%, #0F76D3 100%);">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">
        {{ heroSection?.headline }}
      </h1>
      <p class="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
        {{ heroSection?.tagline }}
      </p>
      <NuxtLink
        :to="heroSection?.ctaButton?.path ?? '/products'"
        class="hero-cta-btn inline-block relative px-8 py-3 bg-white text-[#083D6D] font-bold rounded-lg border-2 border-[#083D6D] shadow transition-all duration-300 overflow-hidden"
      >
        <span class="relative z-10">{{ heroSection?.ctaButton?.label }}</span>
      </NuxtLink>
      <div class="relative max-w-5xl mx-auto mt-12 px-14">
        <div class="overflow-hidden">
          <div
            class="flex gap-5 transition-transform duration-300 ease-out"
            :style="{
              width: `${Math.max(100, (heroCarouselItems.length / heroCarouselVisible) * 100)}%`,
              transform: `translateX(-${heroCarouselIndex * (100 / heroCarouselItems.length) * heroCarouselVisible}%)`
            }"
          >
            <div
              v-for="item in heroCarouselItems"
              :key="item.id"
              class="flex-shrink-0 flex justify-center"
              :style="{ width: `${100 / Math.max(1, heroCarouselItems.length)}%` }"
            >
              <div class="w-full max-w-sm rounded-xl min-h-[260px] flex flex-col overflow-hidden bg-white/10 backdrop-blur">
                <div
                  v-if="item.image || (item.images?.length)"
                  class="w-full flex-1 min-h-[180px] overflow-hidden rounded-t-xl bg-white/5"
                >
                  <img
                    :src="item.image || item.images?.[0]"
                    :alt="item.name || item.buttonLabel || 'Hero'"
                    class="w-full h-full object-cover object-center"
                    loading="lazy"
                  >
                </div>
                <div class="p-4 flex justify-center">
                  <NuxtLink
                    :to="item.buttonPath"
                    class="inline-block px-6 py-2.5 bg-[#083D6D] text-white text-sm font-medium rounded text-center hover:bg-[#062c4f] transition-colors"
                  >
                    {{ item.buttonLabel }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="absolute -left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#083D6D] flex items-center justify-center text-white hover:bg-[#062c4f] disabled:opacity-30 disabled:pointer-events-none z-10"
          :disabled="heroCarouselIndex === 0"
          aria-label="Previous"
          @click="heroCarouselIndex = Math.max(0, heroCarouselIndex - 1)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          type="button"
          class="absolute -right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#083D6D] flex items-center justify-center text-white hover:bg-[#062c4f] disabled:opacity-30 disabled:pointer-events-none z-10"
          :disabled="heroCarouselIndex >= heroCarouselMaxIndex"
          aria-label="Next"
          @click="heroCarouselIndex = Math.min(heroCarouselMaxIndex, heroCarouselIndex + 1)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { heroSection } = useLandingData()
const heroCarouselVisible = 3
const heroCarouselItems = computed(() => heroSection.value?.carouselProducts ?? [])
const heroCarouselIndex = ref(0)
const heroCarouselMaxIndex = computed(() =>
  Math.max(0, heroCarouselItems.value.length - heroCarouselVisible)
)
</script>

<style scoped>
.hero-cta-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(6, 42, 77, 0.7),
    transparent
  );
  z-index: 1;
  pointer-events: none;
  animation: hero-shine-interval 3s ease-in-out infinite;
}
.hero-cta-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.5), 0 8px 25px rgba(0, 0, 0, 0.15);
}
.hero-cta-btn:hover::before {
  animation: hero-shine-hover 0.6s ease-out forwards;
}
@keyframes hero-shine-interval {
  0% { left: -100%; }
  12% { left: 150%; }
  13% { left: -100%; }
  100% { left: -100%; }
}
@keyframes hero-shine-hover {
  0% { left: -100%; }
  100% { left: 150%; }
}
</style>
