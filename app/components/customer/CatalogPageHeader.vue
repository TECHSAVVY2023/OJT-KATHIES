<template>
  <div class="pc-page-header">
    <div class="pc-page-header__inner">
      <h1 class="pc-page-header__title">{{ title }}</h1>
      <div class="pc-page-header__meta">
        <span class="pc-meta-chip pc-meta-chip--ghost">
          <span class="pc-meta-chip__dot" />
          {{ productsCount }} Products
        </span>
        <span class="pc-meta-chip pc-meta-chip--solid">{{ categoriesCount }} Categories</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  productsCount: number
  categoriesCount: number
}>()
</script>

<style scoped>
/* ══ PAGE HEADER ══ */
.pc-page-header {
  padding: 48px 40px 36px;
  border-bottom: 1px solid #e8eaf0;
  background: linear-gradient(180deg, #ffffff 0%, #f6f7f9 100%);
  position: relative;
  overflow: hidden;
}
.pc-page-header::before {
  content: '';
  position: absolute;
  top: -80px; right: -80px;
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(14,98,198,0.05) 0%, transparent 70%);
  pointer-events: none;
}
.pc-page-header__inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}
.pc-page-header__title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 800;
  color: #1e4f8c;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0;
}
.pc-page-header__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.pc-meta-chip {
  font-family: 'Syne', sans-serif;
  font-size: 11px;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 999px;
  letter-spacing: 0.03em;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.pc-meta-chip--ghost {
  background: #fff;
  border: 1.5px solid #e2e8f0;
  color: #475569;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.pc-meta-chip--solid {
  background: #1e4f8c;
  color: #fff;
  box-shadow: 0 4px 14px rgba(30,79,140,0.25);
}
.pc-meta-chip__dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 2px rgba(16,185,129,0.2);
  flex-shrink: 0;
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 2px rgba(16,185,129,0.2); }
  50% { box-shadow: 0 0 0 4px rgba(16,185,129,0.15); }
}
</style>
