<template>
  <div class="trust-badges">
    <span class="badge">🇵🇭 Authentic</span>
    <span class="badge-sep">·</span>
    <span class="badge">🚚 Fast Delivery</span>
    <span class="badge-sep">·</span>
    <span class="badge">⭐ Trusted Store</span>
  </div>
</template>

<style scoped>
.trust-badges {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.badge { font-size: 12px; font-weight: 500; color: rgba(230,234,237,0.55); }
.badge-sep { color: rgba(255,255,255,0.18); font-size: 12px; }

@media (max-width: 1024px) {
  .trust-badges { justify-content: center; }
}
</style>
