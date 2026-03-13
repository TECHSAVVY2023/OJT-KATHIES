<template>
  <section class="hero-section">
    <HeroBg />

    <div class="hero-container">
      <!-- Left: Text block -->
      <HeroText
        :tagline="heroSection?.tagline || 'Shop your favorite Filipino snacks, sauces, noodles and pantry staples — right from the comfort of your home.'"
        :cta-path="heroSection?.ctaButton?.path ?? '/products'"
        :cta-label="heroSection?.ctaButton?.label || 'Shop Now'"
      />

      <!-- Right: Carousel -->
      <HeroCarousel :products="heroCarouselItems" />
    </div>
  </section>
</template>

<script setup lang="ts">
import HeroBg from './HeroBg.vue'
import HeroText from './HeroText.vue'
import HeroCarousel from './HeroCarousel.vue'

const { heroSection } = useLandingData()
const heroCarouselItems = computed(() => heroSection.value?.carouselProducts ?? [])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

.hero-section {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(160deg, #061E35 0%, #083D6D 45%, #0F76D3 100%);
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.hero-container {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 40px 80px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  align-items: center;
  gap: 60px;
}

@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 52px;
    padding: 80px 32px 60px;
    text-align: center;
  }
}

@media (max-width: 640px) {
  .hero-container { padding: 70px 20px 50px; }
}
</style>