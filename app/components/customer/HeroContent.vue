<template>
  <div class="hero-text flex flex-col gap-6">
    <h1 class="hero-headline flex flex-col gap-1 text-left">
      <span class="headline-line line-1 block text-[clamp(36px,4.5vw,62px)] font-extrabold leading-tight tracking-[-0.03em] text-slate-100">
        Bringing <span class="headline-accent inline bg-gradient-to-r from-[#7DB8EC] via-[#E6EAED] to-[#C8323A] bg-clip-text text-transparent">Home</span> Closer,
      </span>
      <span class="headline-line line-2 block text-[clamp(36px,4.5vw,62px)] font-extrabold leading-tight tracking-[-0.03em] text-slate-100">
        One Bite at a Time
      </span>
    </h1>

    <p class="hero-tagline max-w-md text-[15px] leading-relaxed text-slate-200/70">
      {{ tagline || 'Shop your favorite Filipino snacks, sauces, noodles and pantry staples — right from the comfort of your home.' }}
    </p>

    <!-- Shiny CTA -->
    <div class="hero-cta-wrap mt-2 flex flex-col gap-3">
      <ShinyButton :href="ctaPath || '/products'" :label="ctaLabel || 'Shop Now'" />

      <div class="trust-badges">
        <span class="badge">🇵🇭 Authentic</span>
        <span class="badge-sep">·</span>
        <span class="badge">🚚 Fast Delivery</span>
        <span class="badge-sep">·</span>
        <span class="badge">⭐ Trusted Store</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tagline?: string
  ctaPath?: string
  ctaLabel?: string
}>()
</script>

<style scoped>
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

@keyframes fadeUp {
  from { opacity:0; transform:translateY(22px); }
  to   { opacity:1; transform:translateY(0); }
}
</style>
