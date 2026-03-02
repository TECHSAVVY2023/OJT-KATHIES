<template>
  <section class="hero-section">
    <!-- Background layers -->
    <div class="hero-bg" aria-hidden="true">
      <div class="bg-orb orb-a"></div>
      <div class="bg-orb orb-b"></div>
      <div class="bg-orb orb-c"></div>
      <div class="bg-grid"></div>
    </div>

    <div class="hero-container">

      <!-- ── Left: Text block ── -->
      <div class="hero-text">
        <h1 class="hero-headline">
          <span class="headline-line line-1">Bringing <span class="headline-accent">Home</span> Closer,</span>
          <span class="headline-line line-2">One Bite at a Time</span>
        </h1>

        <p class="hero-tagline">
          {{ heroSection?.tagline || 'Shop your favorite Filipino snacks, sauces, noodles and pantry staples — right from the comfort of your home.' }}
        </p>

        <!-- Shiny CTA -->
        <div class="hero-cta-wrap">
          <NuxtLink
            :to="heroSection?.ctaButton?.path ?? '/products'"
            class="hero-cta-btn"
          >
            <span class="btn-ring"></span>
            <span class="btn-bg"></span>
            <span class="btn-shine"></span>
            <span class="btn-sparkle btn-sparkle-1"></span>
            <span class="btn-sparkle btn-sparkle-2"></span>
            <span class="btn-sparkle btn-sparkle-3"></span>
            <span class="btn-sparkle btn-sparkle-4"></span>
            <span class="btn-sparkle btn-sparkle-5"></span>
            <span class="btn-sparkle btn-sparkle-6"></span>
            <span class="btn-label">
              <svg class="btn-icon" viewBox="0 0 20 20" fill="none">
                <path d="M3 10h14M11 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ heroSection?.ctaButton?.label || 'Shop Now' }}
            </span>
          </NuxtLink>

          <div class="trust-badges">
            <span class="badge">🇵🇭 Authentic</span>
            <span class="badge-sep">·</span>
            <span class="badge">🚚 Fast Delivery</span>
            <span class="badge-sep">·</span>
            <span class="badge">⭐ Trusted Store</span>
          </div>
        </div>
      </div>

      <!-- ── Right: Premium Carousel ── -->
      <div class="carousel-section">

        <!-- Section label + counter -->
        <div class="carousel-header">
          <div class="carousel-label">
            <span class="label-dot"></span>
            <span class="label-text">Featured &amp; Trending</span>
          </div>
          <div class="cnav-counter">
            <span class="cnav-cur">{{ String(heroCarouselIndex + 1).padStart(2,'0') }}</span>
            <span class="cnav-sep">/</span>
            <span class="cnav-tot">{{ String(heroCarouselItems.length).padStart(2,'0') }}</span>
          </div>
        </div>

        <!-- PREMIUM CARD STACK CAROUSEL -->
        <div class="cstack-root">
          <div class="cstack-scene">
            <TransitionGroup name="card-slide" tag="div" class="cstack-stage">
              <NuxtLink
                v-for="(item, idx) in heroCarouselItems"
                :key="item.id"
                :to="item.buttonPath"
                class="cstack-card"
                :class="cardClass(idx)"
                :style="cardStyle(idx)"
                :tabindex="idx === heroCarouselIndex ? 0 : -1"
                :aria-hidden="idx !== heroCarouselIndex"
                @click.prevent="handleCardClick(idx, item.buttonPath)"
              >
                <!-- Image -->
                <div class="ccard-img-wrap">
                  <img
                    v-if="item.image || item.images?.length"
                    :src="item.image || item.images?.[0]"
                    :alt="item.name || item.buttonLabel || 'Product'"
                    class="ccard-img"
                    loading="lazy"
                  >
                  <div v-else class="ccard-placeholder">📦</div>

                  <!-- Bottom gradient -->
                  <div class="ccard-overlay"></div>

                  <!-- Hot badge -->
                  <div class="ccard-badge">
                    <span>🔥</span> Trending
                  </div>
                </div>

                <!-- Card footer -->
                <div class="ccard-footer">
                  <div class="ccard-info">
                    <p class="ccard-name">{{ item.name || item.buttonLabel }}</p>
                    <p class="ccard-sub">{{ item.category || 'Featured Product' }}</p>
                  </div>
                  <div class="ccard-btn">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </NuxtLink>
            </TransitionGroup>
          </div>

          <!-- Side nav arrows -->
          <button
            class="cstack-arrow cstack-prev"
            :class="{ 'cstack-disabled': heroCarouselIndex === 0 }"
            :disabled="heroCarouselIndex === 0"
            aria-label="Previous"
            @click="heroCarouselIndex = Math.max(0, heroCarouselIndex - 1)"
          >
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M13 4l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button
            class="cstack-arrow cstack-next"
            :class="{ 'cstack-disabled': heroCarouselIndex >= heroCarouselItems.length - 1 }"
            :disabled="heroCarouselIndex >= heroCarouselItems.length - 1"
            aria-label="Next"
            @click="heroCarouselIndex = Math.min(heroCarouselItems.length - 1, heroCarouselIndex + 1)"
          >
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Progress bar + dots -->
        <div class="carousel-footer">
          <div class="progress-track">
            <div
              class="progress-fill"
              :style="{ width: `${((heroCarouselIndex + 1) / heroCarouselItems.length) * 100}%` }"
            ></div>
          </div>
          <div class="cdots">
            <button
              v-for="(_, i) in heroCarouselItems"
              :key="i"
              class="cdot"
              :class="{ 'cdot-active': i === heroCarouselIndex }"
              :aria-label="`Go to ${i + 1}`"
              @click="heroCarouselIndex = i"
            />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const { heroSection } = useLandingData()
const heroCarouselItems = computed(() => heroSection.value?.carouselProducts ?? [])
const heroCarouselIndex = ref(0)

// Card position relative to active
function getRelativePos(idx: number) {
  return idx - heroCarouselIndex.value
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
    return {
      zIndex: 10,
      transform: 'translateX(0%) scale(1) rotateY(0deg)',
      opacity: 1,
      pointerEvents: 'auto',
    }
  }
  if (abs === 1) {
    const dir = pos > 0 ? 1 : -1
    return {
      zIndex: 7,
      transform: `translateX(${dir * 68}%) scale(0.85) rotateY(${dir * -12}deg)`,
      opacity: 0.55,
      pointerEvents: 'auto',
    }
  }
  if (abs === 2) {
    const dir = pos > 0 ? 1 : -1
    return {
      zIndex: 4,
      transform: `translateX(${dir * 105}%) scale(0.7) rotateY(${dir * -22}deg)`,
      opacity: 0.2,
      pointerEvents: 'none',
    }
  }
  return {
    zIndex: 0,
    transform: 'translateX(120%) scale(0.5)',
    opacity: 0,
    pointerEvents: 'none',
  }
}

function handleCardClick(idx: number, path: string) {
  if (idx === heroCarouselIndex.value) {
    router.push(path)
  } else {
    heroCarouselIndex.value = idx
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

/* ═══════════════════════════════════════════════════════════
   SECTION & BACKGROUND
══════════════════════════════════════════════════════════ */
.hero-section {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(160deg, #061E35 0%, #083D6D 45%, #0F76D3 100%);
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.hero-bg { position: absolute; inset: 0; pointer-events: none; }

.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}
.orb-a {
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(15,118,211,0.25) 0%, transparent 70%);
  top: -200px; right: -200px;
}
.orb-b {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(8,61,109,0.6) 0%, transparent 70%);
  bottom: -150px; left: -100px;
}
.orb-c {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(200,50,58,0.12) 0%, transparent 70%);
  top: 40%; right: 18%;
}
.bg-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ═══════════════════════════════════════════════════════════
   LAYOUT
══════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════
   HERO TEXT
══════════════════════════════════════════════════════════ */
.hero-text {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-headline {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
}

.headline-line {
  display: block;
  font-size: clamp(36px, 4.5vw, 62px);
  font-weight: 800;
  line-height: 1.1;
  color: #E6EAED;
  letter-spacing: -0.03em;
}

.line-1 { animation: fadeUp 0.7s 0.1s ease both; }
.line-2 { animation: fadeUp 0.7s 0.22s ease both; }
.line-3 { animation: fadeUp 0.7s 0.34s ease both; }

.headline-accent {
  display: inline;
  background: linear-gradient(90deg, #7DB8EC, #E6EAED, #4db8ff, #C8323A);
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: text-shimmer 5s 1s linear infinite;
}

@keyframes text-shimmer {
  0%   { background-position: 0% center; }
  100% { background-position: 200% center; }
}

.hero-tagline {
  font-size: 15px;
  color: rgba(230,234,237,0.62);
  line-height: 1.78;
  max-width: 420px;
  margin: 0;
  animation: fadeUp 0.7s 0.44s ease both;
}

.hero-cta-wrap {
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: fadeUp 0.7s 0.54s ease both;
}

.trust-badges {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.badge { font-size: 12px; font-weight: 500; color: rgba(230,234,237,0.55); }
.badge-sep { color: rgba(255,255,255,0.18); font-size: 12px; }

/* ═══════════════════════════════════════════════════════════
   SHINY SHOP NOW BUTTON
══════════════════════════════════════════════════════════ */
.hero-cta-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 16px 40px;
  border-radius: 14px;
  overflow: hidden;
  isolation: isolate;
  cursor: pointer;
  text-decoration: none;
  width: fit-content;
  box-shadow:
    0 0 0 1px rgba(15,118,211,0.6),
    0 4px 24px rgba(8,61,109,0.5),
    0 1px 0 rgba(255,255,255,0.12) inset;
  animation: btn-outer-pulse 4s ease-in-out infinite;
  transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease;
}

.btn-bg {
  position: absolute; inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, #0a2a50 0%, #083D6D 35%, #0b5499 65%, #083D6D 100%);
  background-size: 200% 200%;
  animation: btn-bg-shift 6s ease-in-out infinite;
  z-index: 0;
}
.btn-ring {
  position: absolute; inset: -2px;
  border-radius: calc(14px + 2px);
  background: conic-gradient(from var(--ring-angle,0deg), #0F76D3,#4db8ff,#fff,#4db8ff,#0F76D3,#083D6D,#0F76D3);
  z-index: -1;
  animation: btn-ring-spin 3s linear infinite;
}
.btn-ring::after {
  content: ''; position: absolute; inset: 2px;
  border-radius: 14px; background: #083D6D;
}
.btn-shine {
  position: absolute; inset: 0;
  border-radius: inherit;
  background: linear-gradient(110deg,transparent 0%,transparent 28%,rgba(255,255,255,0.06) 38%,rgba(150,210,255,0.55) 48%,rgba(255,255,255,0.9) 52%,rgba(150,210,255,0.55) 57%,rgba(255,255,255,0.06) 65%,transparent 75%,transparent 100%);
  transform: translateX(-200%) skewX(-15deg);
  z-index: 2; pointer-events: none;
  animation: btn-shine-interval 3.5s cubic-bezier(0.4,0,0.2,1) infinite;
}
.btn-sparkle {
  position: absolute; width: 4px; height: 4px;
  border-radius: 50%; background: #fff;
  box-shadow: 0 0 6px 2px rgba(150,210,255,0.8);
  z-index: 3; pointer-events: none; opacity: 0;
}
.btn-sparkle-1 { top:20%;left:12%;animation:btn-sparkle-pop 4s .2s ease-in-out infinite; }
.btn-sparkle-2 { top:60%;left:70%;animation:btn-sparkle-pop 4s .6s ease-in-out infinite; }
.btn-sparkle-3 { top:25%;left:85%;animation:btn-sparkle-pop 4s 1s ease-in-out infinite; }
.btn-sparkle-4 { top:70%;left:25%;animation:btn-sparkle-pop 4s 1.4s ease-in-out infinite; }
.btn-sparkle-5 { top:40%;left:50%;animation:btn-sparkle-pop 4s 1.8s ease-in-out infinite; }
.btn-sparkle-6 { top:75%;left:88%;animation:btn-sparkle-pop 4s .9s ease-in-out infinite; }

.btn-label {
  position: relative; z-index: 10;
  display: flex; align-items: center; gap: 10px;
  color: #fff; font-family: 'Poppins',sans-serif;
  font-size: 14px; font-weight: 600;
  letter-spacing: 0.1em; text-transform: uppercase;
}
.btn-icon { width: 18px; height: 18px; transition: transform 0.3s ease; }

.hero-cta-btn:hover {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 0 0 2px rgba(77,184,255,0.8),0 8px 40px rgba(8,61,109,0.65),0 0 60px rgba(15,118,211,0.4);
}
.hero-cta-btn:hover .btn-icon { transform: translateX(4px); }
.hero-cta-btn:hover .btn-shine { animation: btn-shine-fast 1.2s ease-out forwards; }
.hero-cta-btn:active { transform: translateY(0) scale(0.98); }

/* ═══════════════════════════════════════════════════════════
   CAROUSEL SECTION
══════════════════════════════════════════════════════════ */
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

/* Header */
.carousel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
}

.carousel-label {
  display: flex; align-items: center; gap: 8px;
}
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

.cnav-counter {
  display: flex; align-items: baseline; gap: 3px;
  user-select: none;
}
.cnav-cur {
  font-size: 22px; font-weight: 700;
  color: #E6EAED; line-height: 1;
}
.cnav-sep {
  font-size: 14px; color: rgba(230,234,237,0.25);
  font-weight: 300; margin: 0 2px;
}
.cnav-tot {
  font-size: 13px; font-weight: 400;
  color: rgba(230,234,237,0.35);
}

/* ── STACK SCENE ─────────────────────────────────────────── */
.cstack-root {
  position: relative;
  height: 380px;
}

.cstack-scene {
  width: 100%;
  height: 100%;
  perspective: 1200px;
  perspective-origin: center center;
}

.cstack-stage {
  position: relative;
  width: 100%;
  height: 100%;
}

/* ── Individual card in stack ── */
.cstack-card {
  position: absolute;
  top: 0;
  left: 50%;
  width: 260px;
  height: 360px;
  margin-left: -130px; /* center */
  border-radius: 22px;
  overflow: hidden;
  text-decoration: none;
  cursor: pointer;
  transition:
    transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1),
    opacity 0.55s ease,
    box-shadow 0.4s ease,
    border-color 0.4s ease;
  transform-origin: center center;
  transform-style: preserve-3d;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.05);
  will-change: transform, opacity;
}

/* Active center card */
.cstack-card.is-active {
  box-shadow:
    0 24px 80px rgba(0,0,0,0.45),
    0 0 0 1.5px rgba(15,118,211,0.5),
    0 0 60px rgba(15,118,211,0.18);
  border-color: rgba(15,118,211,0.4);
}

.cstack-card.is-active:hover {
  box-shadow:
    0 32px 100px rgba(0,0,0,0.55),
    0 0 0 2px rgba(15,118,211,0.7),
    0 0 80px rgba(15,118,211,0.25);
}

/* Adjacent cards */
.cstack-card.is-adjacent {
  cursor: pointer;
}
.cstack-card.is-adjacent:hover {
  opacity: 0.75 !important;
}

/* ── Card image ── */
.ccard-img-wrap {
  position: relative;
  width: 100%;
  height: 78%;
  overflow: hidden;
}

.ccard-img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.5s ease;
}

.cstack-card.is-active:hover .ccard-img {
  transform: scale(1.06);
}

.ccard-placeholder {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  font-size: 56px;
  background: rgba(255,255,255,0.05);
}

/* Gradient overlay */
.ccard-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    to top,
    rgba(5,15,30,0.92) 0%,
    rgba(5,15,30,0.2) 40%,
    transparent 65%
  );
  pointer-events: none;
}

/* Trending badge */
.ccard-badge {
  position: absolute;
  top: 12px; left: 12px;
  display: inline-flex; align-items: center; gap: 4px;
  background: rgba(200,50,58,0.88);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 9px; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: #fff;
  box-shadow: 0 3px 12px rgba(200,50,58,0.4);
}

/* Card footer */
.ccard-footer {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: linear-gradient(to top, rgba(6,20,40,0.95) 0%, rgba(6,20,40,0.7) 100%);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(255,255,255,0.06);
}

.ccard-info { flex: 1; min-width: 0; }

.ccard-name {
  font-size: 13px; font-weight: 600;
  color: #E6EAED; margin: 0;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  transition: color 0.25s ease;
}

.cstack-card.is-active:hover .ccard-name { color: #7DB8EC; }

.ccard-sub {
  font-size: 10.5px; font-weight: 400;
  color: rgba(230,234,237,0.4);
  margin: 2px 0 0;
  text-transform: uppercase; letter-spacing: 0.06em;
}

.ccard-btn {
  flex-shrink: 0;
  width: 32px; height: 32px;
  border-radius: 50%;
  background: rgba(15,118,211,0.25);
  border: 1px solid rgba(15,118,211,0.4);
  display: flex; align-items: center; justify-content: center;
  color: #7DB8EC;
  transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
}
.ccard-btn svg { width: 14px; height: 14px; }

.cstack-card.is-active:hover .ccard-btn {
  background: #0F76D3;
  color: #fff;
  transform: translateX(3px);
}

/* ── Nav arrows ── */
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

/* ── Footer: progress + dots ── */
.carousel-footer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 8px;
}

.progress-track {
  width: 100%; height: 2px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #0F76D3, #7DB8EC);
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
  box-shadow: 0 0 8px rgba(15,118,211,0.6);
}

.cdots {
  display: flex; justify-content: center;
  align-items: center; gap: 6px;
}

.cdot {
  width: 6px; height: 6px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.18);
  border: none; cursor: pointer; padding: 0;
  transition: background 0.3s ease, width 0.3s ease, box-shadow 0.3s ease;
}
.cdot-active {
  width: 24px;
  background: #0F76D3;
  box-shadow: 0 0 10px rgba(15,118,211,0.65);
}

/* ═══════════════════════════════════════════════════════════
   KEYFRAMES
══════════════════════════════════════════════════════════ */
@keyframes pulse-red {
  0%,100% { box-shadow: 0 0 6px rgba(200,50,58,0.8); }
  50% { box-shadow: 0 0 16px rgba(200,50,58,1); }
}
@keyframes fadeUp {
  from { opacity:0; transform:translateY(22px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes btn-bg-shift {
  0%   { background-position:0% 50%; }
  50%  { background-position:100% 50%; }
  100% { background-position:0% 50%; }
}
@keyframes btn-ring-spin {
  from { --ring-angle:0deg; }
  to   { --ring-angle:360deg; }
}
@keyframes btn-shine-interval {
  0%    { transform:translateX(-200%) skewX(-15deg); opacity:1; }
  40%   { transform:translateX(200%) skewX(-15deg); opacity:1; }
  40.1% { transform:translateX(200%) skewX(-15deg); opacity:0; }
  100%  { transform:translateX(-200%) skewX(-15deg); opacity:0; }
}
@keyframes btn-shine-fast {
  0%   { transform:translateX(-200%) skewX(-15deg); opacity:1; }
  100% { transform:translateX(200%) skewX(-15deg); opacity:1; }
}
@keyframes btn-sparkle-pop {
  0%   { opacity:0; transform:scale(0); }
  30%  { opacity:0; transform:scale(0); }
  38%  { opacity:1; transform:scale(1.5); }
  46%  { opacity:.7; transform:scale(1); }
  55%  { opacity:0; transform:scale(0); }
  100% { opacity:0; transform:scale(0); }
}
@keyframes btn-outer-pulse {
  0%,100% { box-shadow:0 0 0 1px rgba(15,118,211,.6),0 4px 24px rgba(8,61,109,.5); }
  50%      { box-shadow:0 0 0 3px rgba(77,184,255,.5),0 6px 32px rgba(8,61,109,.7),0 0 30px rgba(15,118,211,.25); }
}
@property --ring-angle {
  syntax: '<angle>'; initial-value: 0deg; inherits: false;
}

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════════════════════ */
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 52px;
    padding: 80px 32px 60px;
    text-align: center;
  }
  .hero-cta-wrap { align-items: center; }
  .trust-badges { justify-content: center; }
  .headline-line { text-align: center; }
  .hero-tagline { margin: 0 auto; }
  .cstack-root { height: 340px; }
}

@media (max-width: 640px) {
  .hero-container { padding: 70px 20px 50px; }
  .headline-line { font-size: clamp(30px, 8vw, 42px); }
  .cstack-card { width: 220px; height: 310px; margin-left: -110px; }
  .cstack-root { height: 320px; }
  .hero-cta-btn { padding: 14px 28px; }
}
</style>