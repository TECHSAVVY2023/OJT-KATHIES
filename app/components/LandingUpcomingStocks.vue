<template>
  <section class="upcoming-section">
    <div class="container">

      <!-- Header -->
      <div class="section-header">
        <div class="header-left">
          <div class="eyebrow-row">
            <span class="eyebrow-dot"></span>
            <span class="eyebrow-label">What's Coming</span>
          </div>
          <h2 class="section-title">
            Upcoming
            <span class="title-accent">
              Stocks
              <svg class="title-underline" viewBox="0 0 140 10" fill="none" preserveAspectRatio="none">
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

        <div class="page-counter">
          <span class="page-current">{{ String(currentIndex + 1).padStart(2, '0') }}</span>
          <span class="page-sep">/</span>
          <span class="page-total">{{ String(totalPages).padStart(2, '0') }}</span>
        </div>
      </div>

      <!-- Carousel -->
      <div class="carousel-root">
        <div class="carousel-viewport">
          <div
            class="carousel-track"
            :style="{ transform: `translateX(-${currentIndex * (100 / CAROUSEL_VISIBLE)}%)` }"
          >
            <div
              v-for="(p, idx) in list"
              :key="p.id"
              class="carousel-slide"
              :class="{ 'is-active': isVisible(idx) }"
            >
              <div class="stock-card">
                <!-- Image -->
                <div class="card-image-wrap">
                  <img
                    v-if="p.productImage"
                    :src="p.productImage"
                    :alt="p.productFlavor"
                    class="card-image"
                  >
                  <span v-else class="card-fallback">📦</span>
                  <div class="card-overlay" aria-hidden="true"></div>

                  <!-- Vivid Soon badge -->
                  <div class="coming-badge">
                    <span class="badge-dot"></span>
                    Coming Soon
                  </div>
                </div>

                <!-- Card body text -->
                <div class="card-footer">
                  <p class="card-name">{{ p.productFlavor || 'New Arrival' }}</p>
                  <p class="card-desc">{{ p.productDescription || 'Stay tuned — this product is arriving soon to our shelves.' }}</p>
                  <div class="card-bottom">
                    <span class="card-category">{{ p.categoryName || 'Upcoming' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Nav -->
        <button
          class="nav-btn nav-prev"
          :class="{ 'is-disabled': currentIndex === 0 }"
          :disabled="currentIndex === 0"
          aria-label="Previous"
          @click="currentIndex = Math.max(0, currentIndex - 1)"
        >
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M13 5l-5 5 5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button
          class="nav-btn nav-next"
          :class="{ 'is-disabled': currentIndex >= maxIndex }"
          :disabled="currentIndex >= maxIndex"
          aria-label="Next"
          @click="currentIndex = Math.min(maxIndex, currentIndex + 1)"
        >
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M7 5l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Dots -->
      <div class="dots-row">
        <button
          v-for="i in totalPages"
          :key="i - 1"
          class="dot"
          :class="{ 'dot-active': (i - 1) === currentIndex }"
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

/* ── Section ─────────────────────────────────────────────────── */
.upcoming-section {
  padding: 88px 0 80px;
  background: #ffffff;
  font-family: 'Poppins', sans-serif;
}

/* ── Container ───────────────────────────────────────────────── */
.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
}

/* ── Header ──────────────────────────────────────────────────── */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 48px;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.eyebrow-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.eyebrow-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #C8323A;
  box-shadow: 0 0 8px rgba(200,50,58,0.6);
  flex-shrink: 0;
}

.eyebrow-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #0F76D3;
}

.section-title {
  font-size: clamp(24px, 3.5vw, 38px);
  font-weight: 700;
  line-height: 1.15;
  color: #083D6D;
  margin: 0;
  letter-spacing: -0.01em;
}

.title-accent {
  position: relative;
  display: inline-block;
  color: #083D6D;
}

.title-underline {
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 10px;
}

/* ── Page counter ────────────────────────────────────────────── */
.page-counter {
  display: flex;
  align-items: baseline;
  gap: 4px;
  user-select: none;
}

.page-current {
  font-size: 28px;
  font-weight: 700;
  color: #083D6D;
  line-height: 1;
}

.page-sep {
  font-size: 16px;
  color: rgba(8,61,109,0.25);
  font-weight: 300;
  margin: 0 2px;
}

.page-total {
  font-size: 15px;
  font-weight: 400;
  color: rgba(8,61,109,0.35);
}

/* ── Carousel ────────────────────────────────────────────────── */
.carousel-root {
  position: relative;
}

.carousel-viewport {
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

/* ── Slide ───────────────────────────────────────────────────── */
.carousel-slide {
  flex: 0 0 calc(25% - 12px);
  margin: 0 6px;
  opacity: 0.4;
  transform: scale(0.96);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.carousel-slide.is-active {
  opacity: 1;
  transform: scale(1);
}

/* ── Stock card ──────────────────────────────────────────────── */
.stock-card {
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #E6EAED;
  box-shadow: 0 2px 16px rgba(8,61,109,0.07), 0 1px 4px rgba(8,61,109,0.04);
  transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.35s ease;
  cursor: pointer;
}

.stock-card:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: rgba(15,118,211,0.25);
  box-shadow: 0 20px 48px rgba(8,61,109,0.12), 0 0 0 1px rgba(15,118,211,0.12);
}

/* ── Card image ──────────────────────────────────────────────── */
.card-image-wrap {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: #F0F4F8;
}

.card-image {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.stock-card:hover .card-image {
  transform: scale(1.07);
}

.card-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 52px;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(8,61,109,0.3) 0%, transparent 55%);
  opacity: 0;
  transition: opacity 0.35s ease;
}
.stock-card:hover .card-overlay { opacity: 1; }

/* ── Coming Soon badge — vivid red, always visible ───────────── */
.coming-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #C8323A;
  border-radius: 20px;
  padding: 5px 12px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ffffff;
  box-shadow: 0 3px 14px rgba(200,50,58,0.45);
}

.badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #ffffff;
  flex-shrink: 0;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.6); }
}

/* ── Card footer ─────────────────────────────────────────────── */
.card-footer {
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.card-name {
  font-size: 13.5px;
  font-weight: 600;
  color: #083D6D;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s ease;
}

.stock-card:hover .card-name { color: #0F76D3; }

.card-desc {
  font-size: 11.5px;
  font-weight: 400;
  color: #6B7F95;
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}

.card-category {
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #0F76D3;
}

/* ── Nav buttons ─────────────────────────────────────────────── */
.nav-btn {
  position: absolute;
  top: 42%;
  transform: translateY(-50%);
  width: 44px; height: 44px;
  border-radius: 50%;
  background: #ffffff;
  border: 1.5px solid #E6EAED;
  color: #083D6D;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 12px rgba(8,61,109,0.1);
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
}

.nav-btn svg { width: 18px; height: 18px; }

.nav-btn:hover:not(.is-disabled) {
  background: #083D6D;
  border-color: #083D6D;
  color: #ffffff;
  transform: translateY(-50%) scale(1.08);
  box-shadow: 0 6px 20px rgba(8,61,109,0.22);
}

.nav-btn.is-disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-prev { left: -22px; }
.nav-next { right: -22px; }

/* ── Dots ────────────────────────────────────────────────────── */
.dots-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
}

.dot {
  width: 8px; height: 8px;
  border-radius: 9999px;
  background: #D1DAE5;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.3s ease, width 0.3s ease, box-shadow 0.3s ease;
}

.dot-active {
  width: 28px;
  background: #0F76D3;
  box-shadow: 0 0 10px rgba(15,118,211,0.35);
}

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .carousel-slide { flex: 0 0 calc(33.333% - 12px); }
}

@media (max-width: 640px) {
  .upcoming-section { padding: 60px 0 52px; }
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 32px;
  }
  .carousel-slide { flex: 0 0 calc(80% - 12px); }
  .nav-prev { left: -14px; }
  .nav-next { right: -14px; }
}
</style>