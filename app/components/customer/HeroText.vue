<template>
  <div class="hero-text">
    <h1 class="hero-headline">
      <span class="headline-line line-1">Bringing <span class="headline-accent">Home</span> Closer,</span>
      <span class="headline-line line-2">One Bite at a Time</span>
    </h1>

    <p class="hero-tagline">
      {{ tagline }}
    </p>

    <div class="hero-cta-wrap">
      <HeroCtaButton :to="ctaPath" :label="ctaLabel" />
      <HeroTrustBadges />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroCtaButton from '../customer/HeroCtaButton.vue'
import HeroTrustBadges from '../customer/HeroTrustBadges.vue'

defineProps<{
  tagline: string
  ctaPath: string
  ctaLabel: string
}>()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

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
  font-family: 'Poppins', sans-serif;
}

.line-1 { animation: fadeUp 0.7s 0.1s ease both; }
.line-2 { animation: fadeUp 0.7s 0.22s ease both; }

.headline-accent {
  display: inline;
  background: linear-gradient(90deg, #7DB8EC, #E6EAED, #4db8ff, #C8323A);
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: text-shimmer 5s 1s linear infinite;
}

.hero-tagline {
  font-size: 15px;
  font-family: 'Poppins', sans-serif;
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

@keyframes text-shimmer {
  0%   { background-position: 0% center; }
  100% { background-position: 200% center; }
}
@keyframes fadeUp {
  from { opacity:0; transform:translateY(22px); }
  to   { opacity:1; transform:translateY(0); }
}

@media (max-width: 1024px) {
  .hero-cta-wrap { align-items: center; }
  .headline-line { text-align: center; }
  .hero-tagline { margin: 0 auto; }
}
@media (max-width: 640px) {
  .headline-line { font-size: clamp(30px, 8vw, 42px); }
}
</style>