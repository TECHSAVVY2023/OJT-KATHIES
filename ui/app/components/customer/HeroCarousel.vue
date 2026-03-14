<template>
  <div class="carousel-section">

    <!-- Header: label + counter -->
    <div class="carousel-header">
      <div class="carousel-label">
        <span class="label-dot"></span>
        <span class="label-text">Featured &amp; Trending</span>
      </div>
      <div class="cnav-counter">
        <span class="cnav-cur">{{ String(activeIndex + 1).padStart(2, '0') }}</span>
        <span class="cnav-sep">/</span>
        <span class="cnav-tot">{{ String(products.length).padStart(2, '0') }}</span>
      </div>
    </div>

    <!-- Card stack -->
    <div class="cstack-root">
      <div class="cstack-scene">
        <TransitionGroup name="card-slide" tag="div" class="cstack-stage">
          <HeroCarouselCard
            v-for="(product, idx) in products"
            :key="product.id"
            :product="product"
            :isActive="idx === activeIndex"
            :cardStyle="cardStyle(idx)"
            @view-product="handleCardClick(idx, product.id)"
          />
        </TransitionGroup>
      </div>

      <!-- Nav arrows -->
      <button
        class="cstack-arrow cstack-prev"
        :class="{ 'cstack-disabled': activeIndex === 0 }"
        :disabled="activeIndex === 0"
        aria-label="Previous"
        @click="activeIndex = Math.max(0, activeIndex - 1)"
      >
        <svg viewBox="0 0 20 20" fill="none">
          <path d="M13 4l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button
        class="cstack-arrow cstack-next"
        :class="{ 'cstack-disabled': activeIndex >= products.length - 1 }"
        :disabled="activeIndex >= products.length - 1"
        aria-label="Next"
        @click="activeIndex = Math.min(products.length - 1, activeIndex + 1)"
      >
        <svg viewBox="0 0 20 20" fill="none">
          <path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- Progress + dots -->
    <HeroCarouselNavigation
      :currentIndex="activeIndex"
      :totalSlides="products.length"
      @go-to-slide="activeIndex = $event"
    />

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import HeroCarouselCard from '../customer/HeroCarouselCard.vue'
import HeroCarouselNavigation from '../customer/HeroCarouselNavigation.vue'

interface Product {
  id: string
  name: string
  category: string
  image?: string
}

defineProps<{
  products: Product[]
}>()

const emit = defineEmits<{
  'view-product': [id: string]
}>()

const router = useRouter()
const activeIndex = ref(0)

function getRelativePos(idx: number) {
  return idx - activeIndex.value
}

function cardClass(idx: number) {
  const pos = getRelativePos(idx)
  if (pos === 0) return 'is-active'
  if (pos === 1 || pos === -1) return 'is-adjacent'
  if (pos === 2 || pos === -2) return 'is-far'
  return 'is-hidden'
}

function cardStyle(idx: number) {
  const pos = getRelativePos(idx)
  const abs = Math.abs(pos)

  if (abs === 0) {
    return { zIndex: 10, transform: 'translateX(0%) scale(1) rotateY(0deg)', opacity: 1, pointerEvents: 'auto' }
  }
  if (abs === 1) {
    const dir = pos > 0 ? 1 : -1
    return { zIndex: 7, transform: `translateX(${dir * 68}%) scale(0.85) rotateY(${dir * -12}deg)`, opacity: 0.55, pointerEvents: 'auto' }
  }
  if (abs === 2) {
    const dir = pos > 0 ? 1 : -1
    return { zIndex: 4, transform: `translateX(${dir * 105}%) scale(0.7) rotateY(${dir * -22}deg)`, opacity: 0.2, pointerEvents: 'none' }
  }
  return { zIndex: 0, transform: 'translateX(120%) scale(0.5)', opacity: 0, pointerEvents: 'none' }
}

function handleCardClick(idx: number, path: string) {
  if (idx === activeIndex.value) {
    emit('view-product', path)
  } else {
    activeIndex.value = idx
  }
}
</script>

<style scoped>
.carousel-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: fadeLeft 0.8s 0.3s ease both;
}

@keyframes fadeLeft {
  from { opacity: 0; transform: translateX(50px); }
  to   { opacity: 1; transform: translateX(0); }
}

.carousel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
}

.carousel-label { display: flex; align-items: center; gap: 8px; }

.label-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #C8323A;
  box-shadow: 0 0 9px rgba(200,50,58,0.9);
  animation: pulse-red 2s ease-in-out infinite;
}
.label-text {
  font-size: 11px; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(230,234,237,0.55);
}

.cnav-counter { display: flex; align-items: baseline; gap: 3px; user-select: none; }
.cnav-cur { font-size: 22px; font-weight: 700; color: #E6EAED; line-height: 1; }
.cnav-sep { font-size: 14px; color: rgba(230,234,237,0.25); font-weight: 300; margin: 0 2px; }
.cnav-tot { font-size: 13px; font-weight: 400; color: rgba(230,234,237,0.35); }

.cstack-root { position: relative; height: 380px; }

.cstack-scene {
  width: 100%; height: 100%;
  perspective: 1200px;
  perspective-origin: center center;
}

.cstack-stage { position: relative; width: 100%; height: 100%; }

/* Nav arrows */
.cstack-arrow {
  position: absolute;
  top: 50%; transform: translateY(-50%);
  width: 42px; height: 42px;
  border-radius: 50%;
  background: rgba(8,40,80,0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.15);
  color: #E6EAED;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; z-index: 20;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease, opacity 0.25s ease;
}
.cstack-arrow svg { width: 18px; height: 18px; }

.cstack-arrow:hover:not(.cstack-disabled) {
  background: #0F76D3;
  border-color: rgba(255,255,255,0.3);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 24px rgba(15,118,211,0.4);
}
.cstack-arrow.cstack-disabled { opacity: 0.2; cursor: not-allowed; }

.cstack-prev { left: -8px; }
.cstack-next { right: -8px; }

@keyframes pulse-red {
  0%,100% { box-shadow: 0 0 6px rgba(200,50,58,0.8); }
  50% { box-shadow: 0 0 16px rgba(200,50,58,1); }
}

@media (max-width: 1024px) {
  .cstack-root { height: 340px; }
}
@media (max-width: 640px) {
  .cstack-root { height: 320px; }
}
</style>