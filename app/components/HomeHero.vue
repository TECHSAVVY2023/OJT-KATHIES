<template>
  <section class="home-hero">
    <HeroBackground />

    <div class="hero-inner">
      <!-- LEFT: Headline + tagline + CTA + trust -->
      <div class="hero-left">
        <HeroText />

        <p class="hero-tagline">
          Authentic Filipino flavors, crafted with love and<br />
          delivered fresh to your doorstep.
        </p>

        <HeroCtaButton @cta-click="$emit('cta-click')" />

        <div class="trust-row">
          <span class="trust-item"><span class="t-emoji">🇵🇭</span> <span class="t-label">Authentic</span></span>
          <span class="trust-sep">·</span>
          <span class="trust-item"><span class="t-emoji">📦</span> <span class="t-label">Fast Delivery</span></span>
          <span class="trust-sep">·</span>
          <span class="trust-item"><span class="t-emoji">⭐</span> <span class="t-label">Trusted Store</span></span>
        </div>
      </div>

      <!-- RIGHT: Carousel -->
      <div class="hero-right">
        <HeroCarousel
          :products="products"
          @view-product="$emit('view-product', $event)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import HeroBackground from './HeroBackground.vue'
import HeroText from './HeroText.vue'
import HeroCtaButton from './HeroCtaButton.vue'
import HeroCarousel from './HeroCarousel.vue'

interface Product {
  id: string
  name: string
  category: string
  image?: string
}

defineProps<{
  products: Product[]
}>()

defineEmits<{
  'cta-click': []
  'view-product': [id: string]
}>()
</script>

<style scoped>
.home-hero {
  position: relative;
  /* Dark navy left → bright blue right — matches screenshot gradient */
  background: linear-gradient(105deg,
    #04111f 0%,
    #071e3d 20%,
    #0a3575 48%,
    #1265c0 72%,
    #1d82e8 88%,
    #2491f5 100%
  );
  min-height: 580px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 56px 0 48px;
}

.hero-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1380px;
  margin: 0 auto;
  padding: 0 60px;
  display: grid;
  /* Left: fixed text column; right: carousel fills remaining space */
  grid-template-columns: 460px 1fr;
  align-items: center;
  gap: 0;
}

/* ── LEFT ── */
.hero-left {
  display: flex;
  flex-direction: column;
  gap: 22px;
  color: #fff;
}

.hero-tagline {
  font-size: 15px;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  font-weight: 400;
}

.trust-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  flex-wrap: wrap;
}

.trust-sep {
  color: rgba(255, 255, 255, 0.22);
  font-size: 14px;
}

.trust-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

/* Make "PH" text look like the flag label in the screenshot */
.trust-item:first-child .t-label {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  font-size: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.t-emoji {
  font-size: 13px;
  line-height: 1;
}

.t-label {
  font-size: 12.5px;
}

/* ── RIGHT ── */
.hero-right {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 24px;
}

/* ── Responsive ── */
@media (max-width: 1100px) {
  .hero-inner {
    grid-template-columns: 380px 1fr;
    padding: 0 32px;
  }
}

@media (max-width: 880px) {
  .hero-inner {
    grid-template-columns: 1fr;
    padding: 0 24px;
    gap: 36px;
    text-align: center;
  }

  .hero-left { align-items: center; }
  .trust-row { justify-content: center; }
  .hero-right { padding-left: 0; justify-content: center; }
}

@media (max-width: 640px) {
  .home-hero { padding: 56px 0 36px; }
  .hero-inner { padding: 0 16px; gap: 28px; }
}
</style>