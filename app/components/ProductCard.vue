<template>
  <div
    class="product-card group"
    :class="{ 'product-card--out': !product.inStock }"
  >
    <!-- ── Badges ── -->
    <div class="product-card__badges">
      <span v-if="product.isNew" class="badge badge--new">
        <span class="badge__dot" />
        New
      </span>
      <span v-if="product.isSale" class="badge badge--sale">
        Sale
      </span>
    </div>

    <!-- ── Out of stock veil ── -->
    <div v-if="!product.inStock" class="product-card__veil">
      <span class="product-card__veil-label">Out of Stock</span>
    </div>

    <!-- ── Image ── -->
    <NuxtLink :to="`/product/${product.id}`" class="product-card__image-wrap">
      <div class="product-card__image-bg" />
      <img
        v-if="product.imageUrl"
        :src="product.imageUrl"
        :alt="product.name"
        class="product-card__image"
      >
      <span v-else class="product-card__image-fallback">🛒</span>
    </NuxtLink>

    <!-- ── Body ── -->
    <div class="product-card__body">
      <!-- Name -->
      <NuxtLink :to="`/product/${product.id}`" class="product-card__name-link">
        <h3 class="product-card__name">{{ product.name }}</h3>
      </NuxtLink>

      <!-- Price row -->
      <div class="product-card__price-row">
        <span class="product-card__price">{{ product.currency }}{{ product.price }}</span>
        <span
          class="product-card__stock"
          :class="product.inStock ? 'product-card__stock--in' : 'product-card__stock--out'"
        >
          <span class="product-card__stock-dot" />
          {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
        </span>
      </div>

      <!-- ── Actions ── -->
      <div class="product-card__actions">
        <!-- Quantity stepper -->
        <div class="qty-stepper">
          <button
            type="button"
            class="qty-stepper__btn"
            aria-label="Decrease quantity"
            :disabled="quantity <= 1"
            @click="quantity = Math.max(1, quantity - 1)"
          >
            <svg viewBox="0 0 12 12" fill="none" class="w-3 h-3">
              <path d="M2.5 6h7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>
          <span class="qty-stepper__value">{{ quantity }}</span>
          <button
            type="button"
            class="qty-stepper__btn"
            aria-label="Increase quantity"
            @click="quantity += 1"
          >
            <svg viewBox="0 0 12 12" fill="none" class="w-3 h-3">
              <path d="M6 2.5v7M2.5 6h7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Add to cart -->
        <button
          type="button"
          class="cart-btn"
          :class="{ 'cart-btn--added': justAdded, 'cart-btn--disabled': !product.inStock }"
          :disabled="!product.inStock"
          @click="addToCart"
        >
          <span class="cart-btn__inner">
            <!-- Default state -->
            <span class="cart-btn__default">
              <svg viewBox="0 0 20 20" fill="none" class="w-3.5 h-3.5 shrink-0">
                <path d="M2.5 2.5h1.75l2.45 9.35a1.25 1.25 0 001.2.9h6.35a1.25 1.25 0 001.2-.9l1.5-6.1H5.75" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="8.5" cy="16.5" r="1.25" fill="currentColor"/>
                <circle cx="14" cy="16.5" r="1.25" fill="currentColor"/>
              </svg>
              <span>Add to cart</span>
            </span>
            <!-- Added state -->
            <span class="cart-btn__added">
              <svg viewBox="0 0 16 16" fill="none" class="w-3.5 h-3.5 shrink-0">
                <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Added!</span>
            </span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductItem } from '~/types/catalog'

const props = defineProps<{
  product: ProductItem
}>()

const quantity = ref(props.product.defaultQuantity || 1)
const justAdded = ref(false)
const { addItem } = useCart()

function addToCart() {
  if (!props.product.inStock || justAdded.value) return
  addItem(props.product.id, quantity.value)
  justAdded.value = true
  setTimeout(() => { justAdded.value = false }, 1800)
}
</script>

<style scoped>
/* ══════════════════════════════════════════
   CARD SHELL — static, no movement
══════════════════════════════════════════ */
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 20px;
  border: 2px solid #edf0f5;
  overflow: hidden;
  transition:
    box-shadow 0.22s ease,
    border-color 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.product-card:hover {
  border-color: #1e3a5f;
  box-shadow:
    0 0 0 1.5px #1e3a5f,
    0 8px 24px rgba(30,58,95,0.13);
}
.product-card--out {
  opacity: 0.9;
}

/* ══════════════════════════════════════════
   BADGES
══════════════════════════════════════════ */
.product-card__badges {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 8px 3px 6px;
  border-radius: 20px;
  line-height: 1;
  backdrop-filter: blur(8px);
}

.badge--new {
  background: linear-gradient(135deg, #064e3b 0%, #047857 100%);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(4,120,87,0.4);
}
.badge__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #6ee7b7;
  animation: pulse-dot 2s ease infinite;
  flex-shrink: 0;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.75); }
}

.badge--sale {
  background: linear-gradient(135deg, #9f1239 0%, #e11d48 100%);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(225,29,72,0.4);
}

/* ══════════════════════════════════════════
   OUT OF STOCK VEIL
══════════════════════════════════════════ */
.product-card__veil {
  position: absolute;
  /* Only cover the image area, not the whole card */
  top: 0; left: 0; right: 0;
  height: 168px;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(248,250,252,0.45);
  pointer-events: none;
}
.product-card__veil-label {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #475569;
  background: rgba(255,255,255,0.88);
  border: 1.5px solid #cbd5e1;
  padding: 4px 10px;
  border-radius: 20px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
}

/* ══════════════════════════════════════════
   IMAGE
══════════════════════════════════════════ */
.product-card__image-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 168px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}
.product-card__image-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(150deg, #f4f7fb 0%, #e8eef6 100%);
}
.product-card__image {
  position: relative;
  z-index: 1;
  max-height: 138px;
  width: auto;
  max-width: 82%;
  object-fit: contain;
  transition:
    transform 0.35s cubic-bezier(0.34, 1.15, 0.64, 1),
    filter 0.3s ease;
  filter: drop-shadow(0 6px 14px rgba(0,0,0,0.10));
  transform: scale(1);
  transform-origin: center center;
}
.product-card:hover .product-card__image {
  transform: scale(1.10);
  filter: drop-shadow(0 8px 18px rgba(30,58,95,0.16));
}
.product-card__image-fallback {
  font-size: 3.5rem;
  position: relative;
  z-index: 1;
  transition: transform 0.35s cubic-bezier(0.34,1.15,0.64,1);
}
.product-card:hover .product-card__image-fallback {
  transform: scale(1.1);
}

/* ══════════════════════════════════════════
   BODY
══════════════════════════════════════════ */
.product-card__body {
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  flex: 1;
}

.product-card__name-link {
  display: block;
  text-decoration: none;
}
.product-card__name {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.15s ease;
}
.product-card__name-link:hover .product-card__name {
  color: #1e3a5f;
}

/* Price row */
.product-card__price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}
.product-card__price {
  font-size: 1.1rem;
  font-weight: 800;
  color: #1e3a5f;
  letter-spacing: -0.02em;
}
.product-card__stock {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.product-card__stock-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.product-card__stock--in {
  color: #059669;
}
.product-card__stock--in .product-card__stock-dot {
  background: #10b981;
  box-shadow: 0 0 0 2px rgba(16,185,129,0.2);
}
.product-card__stock--out {
  color: #94a3b8;
}
.product-card__stock--out .product-card__stock-dot {
  background: #cbd5e1;
}

/* ══════════════════════════════════════════
   ACTIONS ROW
══════════════════════════════════════════ */
.product-card__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
}

/* ── Quantity Stepper ── */
.qty-stepper {
  display: flex;
  align-items: center;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  background: #f8fafc;
  overflow: hidden;
  flex-shrink: 0;
}
.qty-stepper__btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  background: transparent;
  cursor: pointer;
  border: none;
  outline: none;
  transition: background 0.15s ease, color 0.15s ease;
}
.qty-stepper__btn:hover:not(:disabled) {
  background: #1e3a5f;
  color: #ffffff;
}
.qty-stepper__btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.qty-stepper__value {
  min-width: 28px;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: #1e293b;
  border-left: 1.5px solid #e2e8f0;
  border-right: 1.5px solid #e2e8f0;
  line-height: 32px;
  user-select: none;
}

/* ── Add to Cart Button ── */
.cart-btn {
  flex: 1;
  min-width: 0;
  height: 34px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  outline: none;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1e3a5f 0%, #2a5298 100%);
  box-shadow: 0 2px 8px rgba(30,58,95,0.3), inset 0 1px 0 rgba(255,255,255,0.12);
  transition: box-shadow 0.18s ease, transform 0.14s ease, background 0.18s ease;
}
.cart-btn:hover:not(.cart-btn--disabled):not(.cart-btn--added) {
  background: linear-gradient(135deg, #162d4a 0%, #1e3f80 100%);
  box-shadow: 0 4px 14px rgba(30,58,95,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
  transform: translateY(-1px);
}
.cart-btn:active:not(.cart-btn--disabled) {
  transform: translateY(0px);
  box-shadow: 0 1px 4px rgba(30,58,95,0.25);
}
.cart-btn--added {
  background: linear-gradient(135deg, #047857 0%, #059669 100%);
  box-shadow: 0 2px 10px rgba(5,150,105,0.4);
  cursor: default;
}
.cart-btn--disabled {
  background: #e2e8f0;
  box-shadow: none;
  cursor: not-allowed;
}

.cart-btn__inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

/* Default label */
.cart-btn__default {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  position: absolute;
  inset: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.cart-btn--added .cart-btn__default {
  opacity: 0;
  transform: translateY(-8px);
}
.cart-btn--disabled .cart-btn__default {
  color: #94a3b8;
}

/* Added label */
.cart-btn__added {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.cart-btn--added .cart-btn__added {
  opacity: 1;
  transform: translateY(0);
}
</style>