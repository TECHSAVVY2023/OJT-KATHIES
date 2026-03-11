<template>
  <section class="top-categories-section">
    <div class="bg-texture" aria-hidden="true"></div>
    <div class="bg-gradient-orb orb-1" aria-hidden="true"></div>
    <div class="bg-gradient-orb orb-2" aria-hidden="true"></div>
    <div class="bg-gradient-orb orb-3" aria-hidden="true"></div>

    <div class="container">
      <!-- Header -->
      <div class="section-header">
        <div class="header-left">
          <div class="eyebrow-row">
            <span class="eyebrow-dot"></span>
            <span class="eyebrow-label">Curated Collections</span>
          </div>
          <h2 class="section-title">
            Shop From
            <span class="title-accent">
              Top Categories
              <svg class="title-underline" viewBox="0 0 220 10" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M2 7C55 2 110 1.5 218 5" stroke="url(#blue-gradient)" stroke-width="3" stroke-linecap="round"/>
                <defs>
                  <linearGradient id="blue-gradient" x1="0" y1="0" x2="220" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#0F76D3" stop-opacity="0"/>
                    <stop offset="25%" stop-color="#0F76D3"/>
                    <stop offset="65%" stop-color="#C8323A"/>
                    <stop offset="100%" stop-color="#C8323A" stop-opacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
        </div>
        <NuxtLink to="/products" class="view-all-link">
          <span>Explore All</span>
          <svg class="link-arrow" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </div>

      <!-- Categories track -->
      <div class="categories-track">
        <div
          v-for="(cat, index) in categories"
          :key="cat.id"
          class="category-card"
          :style="{ '--delay': `${index * 65}ms` }"
        >
          <NuxtLink :to="`/categories?category=${encodeURIComponent(cat.name)}`" class="card-inner">
            <div class="card-image-wrap">
              <div class="image-ring-outer"></div>
              <div class="image-circle">
                <img v-if="cat.image" :src="cat.image" :alt="cat.name" class="cat-image">
                <span v-else class="cat-fallback">📦</span>
              </div>
              <div class="card-glow"></div>
              <div class="red-dot"></div>
            </div>
            <div class="card-label">
              <p class="cat-name">{{ cat.name }}</p>
              <span class="cat-arrow">→</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { categories } = useCategoriesData()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* ── Section ───────────────────────────────────────────────── */
.top-categories-section {
  position: relative;
  padding: 88px 0 76px;
  background: #0F4C81;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}

/* ── Ambient BG ────────────────────────────────────────────── */
.bg-texture {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230F76D3' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}

.bg-gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
}
.orb-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(15,118,211,0.22) 0%, transparent 70%);
  top: -250px; left: -150px;
}
.orb-2 {
  width: 450px; height: 450px;
  background: radial-gradient(circle, rgba(8,61,109,0.5) 0%, transparent 70%);
  bottom: -200px; right: -80px;
}
.orb-3 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(200,50,58,0.1) 0%, transparent 70%);
  top: 40%; right: 12%;
}

/* ── Container ─────────────────────────────────────────────── */
.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
}

/* ── Header ────────────────────────────────────────────────── */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 52px;
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
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #C8323A;
  box-shadow: 0 0 8px rgba(200,50,58,0.7);
}

.eyebrow-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #7DB8EC;
}

.section-title {
  font-size: clamp(24px, 3.5vw, 38px);
  font-weight: 700;
  line-height: 1.15;
  color: #E6EAED;
  margin: 0;
  letter-spacing: -0.01em;
}

.title-accent {
  position: relative;
  display: inline-block;
  color: #E6EAED;
}

.title-underline {
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 10px;
}

/* ── View All ──────────────────────────────────────────────── */
.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: #E6EAED;
  text-decoration: none;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.2);
  padding: 10px 22px;
  border-radius: 6px;
  transition: all 0.28s ease;
  position: relative;
  overflow: hidden;
}
.view-all-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.07);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.28s ease;
}
.view-all-link:hover::before { transform: scaleX(1); }
.view-all-link:hover {
  border-color: rgba(255,255,255,0.4);
  color: #fff;
  box-shadow: 0 0 20px rgba(15,118,211,0.2);
}
.link-arrow {
  width: 16px; height: 16px;
  transition: transform 0.28s ease;
}
.view-all-link:hover .link-arrow { transform: translateX(4px); }

/* ── Track ─────────────────────────────────────────────────── */
.categories-track {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 10px;
  scrollbar-width: thin;
  scrollbar-color: rgba(15,118,211,0.25) transparent;
}
.categories-track::-webkit-scrollbar { height: 3px; }
.categories-track::-webkit-scrollbar-track { background: transparent; }
.categories-track::-webkit-scrollbar-thumb {
  background: rgba(15,118,211,0.3);
  border-radius: 2px;
}

/* ── Card ──────────────────────────────────────────────────── */
.category-card {
  flex-shrink: 0;
  animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
  animation-delay: var(--delay);
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  cursor: pointer;
}

/* ── Image wrap ────────────────────────────────────────────── */
.card-image-wrap {
  position: relative;
  width: 116px; height: 116px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-ring-outer {
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  border: 1.5px dashed rgba(15,118,211,0.2);
  transition: border-color 0.4s ease, transform 0.6s ease;
}
.card-inner:hover .image-ring-outer {
  border-color: rgba(15,118,211,0.45);
  transform: rotate(60deg);
}

.image-circle {
  width: 116px; height: 116px;
  border-radius: 50%;
  background: linear-gradient(145deg, #1A6DB5 0%, #0F5A9E 55%, #0A4880 100%);
  border: 1.5px solid rgba(255,255,255,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  z-index: 1;
  transition: border-color 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease;
  box-shadow:
    0 4px 20px rgba(0,0,0,0.2),
    inset 0 1px 0 rgba(255,255,255,0.12),
    inset 0 -1px 0 rgba(0,0,0,0.15);
}
.card-inner:hover .image-circle {
  border-color: rgba(255,255,255,0.35);
  transform: translateY(-5px) scale(1.05);
  box-shadow:
    0 16px 40px rgba(0,0,0,0.3),
    0 0 0 1px rgba(255,255,255,0.15),
    0 0 28px rgba(15,118,211,0.2),
    inset 0 1px 0 rgba(255,255,255,0.15);
}

.card-glow {
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(15,118,211,0.12) 0%, transparent 70%);
  opacity: 0;
  z-index: 0;
  transition: opacity 0.4s ease;
}
.card-inner:hover .card-glow { opacity: 1; }

/* Red accent dot */
.red-dot {
  position: absolute;
  top: 6px; right: 6px;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #C8323A;
  border: 2px solid #0F4C81;
  z-index: 3;
  box-shadow: 0 0 8px rgba(200,50,58,0.5);
  opacity: 0;
  transform: scale(0.4);
  transition: opacity 0.3s ease 0.05s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1) 0.05s;
}
.card-inner:hover .red-dot {
  opacity: 1;
  transform: scale(1);
}

.cat-image {
  width: 66%; height: 66%;
  object-fit: contain;
  transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));
}
.card-inner:hover .cat-image { transform: scale(1.13); }

.cat-fallback {
  font-size: 28px;
  position: relative;
  z-index: 2;
}

/* ── Label ─────────────────────────────────────────────────── */
.card-label {
  display: flex;
  align-items: center;
  gap: 4px;
}
.cat-name {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: rgba(230,234,237,0.7);
  opacity: 1;
  margin: 0;
  white-space: nowrap;
  transition: color 0.3s ease, opacity 0.3s ease;
}
.cat-arrow {
  font-size: 13px;
  color: #7DB8EC;
  opacity: 0;
  transform: translateX(-5px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.card-inner:hover .cat-name { color: #E6EAED; opacity: 1; }
.card-inner:hover .cat-arrow { opacity: 1; transform: translateX(0); }

/* ── Responsive ────────────────────────────────────────────── */
@media (max-width: 640px) {
  .top-categories-section { padding: 60px 0 52px; }
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 36px;
  }
}
</style>