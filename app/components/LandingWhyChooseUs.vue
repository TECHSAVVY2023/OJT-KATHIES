<template>
  <section id="why-choose-us" class="wcu-section">
    <div class="container">

      <!-- Header -->
      <div class="section-header">
        <h2 class="section-title">{{ whyChooseUs?.title || 'Your Trusted Filipino Store' }}</h2>
        <p class="section-subtitle">Authentic Filipino products — delivered with care, right to your door.</p>
      </div>

      <!-- Grid -->
      <div class="wcu-grid">

        <!-- Left features -->
        <div class="features-col">
          <div
            v-for="(f, i) in whyChooseUs?.features?.slice(0, 2)"
            :key="f.id"
            class="feature-item"
            :style="{ '--d': `${i * 80}ms` }"
          >
            <div class="feature-icon-wrap">
              <LandingWhyChooseUsIcon :icon="f.icon" />
            </div>
            <div>
              <h3 class="feature-name">{{ f.name }}</h3>
              <p class="feature-desc">{{ f.description }}</p>
            </div>
          </div>
        </div>

        <!-- Center flip card -->
        <div class="flip-col">
          <div class="ring ring-1" aria-hidden="true" />
          <div class="ring ring-2" aria-hidden="true" />
          <button
            type="button"
            class="flip-trigger"
            :aria-pressed="flipped"
            aria-label="Flip card"
            @click="flipped = !flipped"
          >
            <div class="flip-inner" :class="{ 'is-flipped': flipped }">

              <!-- Front -->
              <div class="flip-face flip-front">
                <div class="flip-image-frame">
                  <img
                    v-if="!imgError"
                    :src="whyChooseUs?.centerImage || '/images/flip.png'"
                    alt="Kathie's Kitchen products"
                    class="flip-image"
                    @error="imgError = true"
                  >
                  <div v-else class="flip-fallback">
                    <span style="font-size:34px">🍜</span>
                    <p class="fallback-title">Kathie's Kitchen</p>
                    <p class="fallback-sub">Filipino Sari-Sari Store</p>
                  </div>
                </div>
                <div class="flip-hint">
                  <svg viewBox="0 0 16 16" fill="none" style="width:10px;height:10px;flex-shrink:0">
                    <path d="M8 3v5l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                  Tap to flip
                </div>
              </div>

              <!-- Back -->
              <div class="flip-face flip-back">
                <div class="flip-back-content">
                  <div class="back-icon">🏪</div>
                  <h3 class="back-title">Kathie's Kitchen</h3>
                  <p class="back-tagline">Filipino Sari-Sari · South Africa</p>
                  <div class="back-divider" />
                  <ul class="back-list">
                    <li class="back-item"><span class="back-bullet" />Authentic Filipino online grocery &amp; food shop</li>
                    <li class="back-item"><span class="back-bullet" />Snacks, noodles, pantry staples &amp; more</li>
                    <li class="back-item"><span class="back-bullet" />Nationwide delivery across South Africa</li>
                  </ul>
                </div>
              </div>

            </div>
          </button>
        </div>

        <!-- Right features -->
        <div class="features-col">
          <div
            v-for="(f, i) in whyChooseUs?.features?.slice(2, 4)"
            :key="f.id"
            class="feature-item"
            :style="{ '--d': `${i * 80}ms` }"
          >
            <div class="feature-icon-wrap">
              <LandingWhyChooseUsIcon :icon="f.icon" />
            </div>
            <div>
              <h3 class="feature-name">{{ f.name }}</h3>
              <p class="feature-desc">{{ f.description }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { whyChooseUs } = useLandingData()
const flipped = ref(false)
const imgError = ref(false)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.wcu-section {
  padding: 68px 0 62px;
  background: #fff;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ── Header ── */
.section-header {
  text-align: center;
  margin-bottom: 52px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.section-title {
  font-size: clamp(22px, 2.4vw, 28px);
  font-weight: 700;
  color: #083D6D;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.section-subtitle {
  font-size: 14px;
  color: #6B7F95;
  max-width: 420px;
  margin: 0;
  line-height: 1.65;
}

/* ── Grid ── */
.wcu-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 44px;
}

/* ── Feature col ── */
.features-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

/* ── Feature item ── */
.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  max-width: 250px;
  animation: fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) both;
  animation-delay: var(--d);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.feature-icon-wrap {
  width: 52px; height: 52px;
  border-radius: 14px;
  background: #EDF3FF;
  border: 1px solid rgba(15,118,211,0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #083D6D;
  flex-shrink: 0;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.25s, box-shadow 0.25s;
}

.feature-item:hover .feature-icon-wrap {
  transform: scale(1.1) rotate(-4deg);
  background: linear-gradient(135deg, #083D6D, #0F76D3);
  color: #fff;
  box-shadow: 0 6px 18px rgba(8,61,109,0.2);
  border-color: transparent;
}

.feature-name {
  font-size: 14.5px;
  font-weight: 600;
  color: #083D6D;
  margin: 0 0 3px;
  transition: color 0.2s;
}
.feature-item:hover .feature-name { color: #0F76D3; }

.feature-desc {
  font-size: 12.5px;
  color: #6B7F95;
  margin: 0;
  line-height: 1.6;
}

/* ── Flip col ── */
.flip-col {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 310px;
  height: 378px;
  flex-shrink: 0;
}

.ring {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  top: 50%; left: 50%;
}
.ring-1 {
  width: 294px; height: 294px;
  border: 1.5px dashed rgba(15,118,211,0.13);
  transform: translate(-50%,-50%);
  animation: spin 22s linear infinite;
}
.ring-2 {
  width: 350px; height: 350px;
  border: 1px solid rgba(200,50,58,0.07);
  transform: translate(-50%,-50%);
  animation: spin 32s linear infinite reverse;
}
@keyframes spin {
  to { transform: translate(-50%,-50%) rotate(360deg); }
}

.flip-trigger {
  position: relative;
  z-index: 1;
  width: 264px;
  height: 334px;
  perspective: 1100px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.flip-inner {
  position: relative;
  width: 100%; height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.4,0.2,0.2,1);
  border-radius: 22px;
}
.flip-inner.is-flipped { transform: rotateY(180deg); }

.flip-face {
  position: absolute;
  inset: 0;
  border-radius: 22px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  overflow: hidden;
}

/* Front */
.flip-front {
  background: #fff;
  border: 1.5px solid rgba(15,118,211,0.18);
  box-shadow: 0 6px 28px rgba(8,61,109,0.1), 0 2px 6px rgba(8,61,109,0.06);
  transition: border-color 0.25s, box-shadow 0.25s;
}
.flip-trigger:hover .flip-front {
  border-color: rgba(15,118,211,0.38);
  box-shadow: 0 12px 40px rgba(8,61,109,0.14), 0 0 0 3px rgba(15,118,211,0.06);
}

.flip-image-frame { width: 100%; height: 100%; overflow: hidden; }
.flip-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.45s ease; }
.flip-trigger:hover .flip-image { transform: scale(1.04); }

.flip-fallback {
  width: 100%; height: 100%;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 5px;
  background: linear-gradient(135deg, #EDF3FF, #dce8f9);
  text-align: center; padding: 20px;
}
.fallback-title { font-size: 15px; font-weight: 700; color: #083D6D; margin: 0; }
.fallback-sub   { font-size: 11px; color: #0F76D3; margin: 0; }

.flip-hint {
  position: absolute;
  bottom: 10px; left: 50%;
  transform: translateX(-50%);
  display: inline-flex; align-items: center; gap: 4px;
  background: rgba(8,61,109,0.68);
  backdrop-filter: blur(6px);
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 9px; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: #fff; white-space: nowrap;
  transition: opacity 0.25s;
}
.flip-inner.is-flipped .flip-hint { opacity: 0; pointer-events: none; }

/* Back */
.flip-back {
  transform: rotateY(180deg);
  background: linear-gradient(145deg, #083D6D 0%, #0a4d88 55%, #0F76D3 100%);
  border: 1.5px solid rgba(255,255,255,0.1);
  box-shadow: 0 6px 28px rgba(8,61,109,0.22);
  display: flex; align-items: center; justify-content: center;
}

.flip-back-content {
  padding: 28px 22px;
  text-align: center;
  display: flex; flex-direction: column;
  align-items: center;
  gap: 8px;
}

.back-icon  { font-size: 32px; }
.back-title { font-size: 17px; font-weight: 700; color: #fff; margin: 0; letter-spacing: -0.02em; }
.back-tagline {
  font-size: 10px; font-weight: 500;
  letter-spacing: 0.07em; text-transform: uppercase;
  color: rgba(255,255,255,0.5); margin: 0;
}
.back-divider {
  width: 34px; height: 2px;
  background: linear-gradient(90deg, #0F76D3, #CE1126);
  border-radius: 2px; margin: 2px 0;
}
.back-list {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column;
  gap: 9px; text-align: left; width: 100%;
}
.back-item {
  display: flex; align-items: flex-start; gap: 8px;
  font-size: 11.5px; color: rgba(225,232,240,0.85); line-height: 1.5;
}
.back-bullet {
  flex-shrink: 0; margin-top: 4px;
  width: 5px; height: 5px; border-radius: 50%;
  background: #CE1126;
  box-shadow: 0 0 5px rgba(206,17,38,0.55);
}

/* ── Responsive ── */
@media (max-width: 860px) {
  .wcu-grid { grid-template-columns: 1fr; justify-items: center; gap: 22px; }
  .features-col { flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 16px; }
  .feature-item { max-width: 200px; }
  .flip-col { order: -1; }
}

@media (max-width: 520px) {
  .wcu-section { padding: 48px 0 44px; }
  .flip-trigger { width: 230px; height: 292px; }
  .flip-col { width: 268px; height: 322px; }
  .ring-1 { width: 248px; height: 248px; }
  .ring-2 { width: 296px; height: 296px; }
}
</style>