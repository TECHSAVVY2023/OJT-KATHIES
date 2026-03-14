<template>
  <div
    class="cstack-card"
    :style="cardStyle"
    :tabindex="isActive ? 0 : -1"
    :aria-hidden="!isActive"
    @click="$emit('view-product', product.id)"
  >
    <!-- Image -->
    <div class="ccard-img-wrap">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name || 'Product'"
        class="ccard-img"
        loading="lazy"
      >
      <div v-else class="ccard-placeholder">📦</div>

      <div class="ccard-overlay"></div>

      <div class="ccard-badge">
        <span>🔥</span> Trending
      </div>
    </div>

    <!-- Footer -->
    <div class="ccard-footer">
      <div class="ccard-info">
        <p class="ccard-name">{{ product.name }}</p>
        <p class="ccard-sub">{{ product.category }}</p>
      </div>
      <div class="ccard-btn">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: string
  name: string
  category: string
  image?: string
}

defineProps<{
  product: Product
  isActive: boolean
  cardStyle: Record<string, string | number>
}>()

defineEmits<{
  'view-product': [id: string]
}>()
</script>

<style scoped>
.cstack-card {
  position: absolute;
  top: 0;
  left: 50%;
  width: 260px;
  height: 360px;
  margin-left: -130px;
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

.cstack-card.is-adjacent { cursor: pointer; }
.cstack-card.is-adjacent:hover { opacity: 0.75 !important; }

/* Image */
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

.cstack-card.is-active:hover .ccard-img { transform: scale(1.06); }

.ccard-placeholder {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  font-size: 56px;
  background: rgba(255,255,255,0.05);
}

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
  animation: pulse-red 2s ease-in-out infinite;
}

/* Footer */
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

@keyframes pulse-red {
  0%,100% { box-shadow: 0 0 6px rgba(200,50,58,0.8); }
  50% { box-shadow: 0 0 16px rgba(200,50,58,1); }
}

@media (max-width: 640px) {
  .cstack-card { width: 220px; height: 310px; margin-left: -110px; }
}
</style>