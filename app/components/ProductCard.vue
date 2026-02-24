<template>
  <div class="group rounded-3xl bg-white p-4 shadow-md border border-gray-100 relative overflow-hidden min-w-0 transition-all duration-200 hover:border-[#1e3a5f] hover:shadow-lg hover:ring-2 hover:ring-[#1e3a5f]/20">
    <!-- New badge: only if product.isNew -->
    <span
      v-if="product.isNew"
      class="absolute top-3 left-3 bg-gradient-to-r from-green-600 to-green-400 text-white text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide z-10"
    >
      New
    </span>
    <!-- Wishlist heart -->
    <button
      type="button"
      class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors z-10"
      aria-label="Add to wishlist"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    </button>
    <!-- Product image (dynamic) – click goes to product detail -->
    <NuxtLink :to="`/product/${product.id}`" class="block h-[160px] flex items-center justify-center mt-1 mb-2 overflow-hidden shrink-0">
      <img
        v-if="product.imageUrl"
        :src="product.imageUrl"
        :alt="product.name"
        class="max-h-[160px] w-auto max-w-full object-contain transition-transform duration-300 ease-out group-hover:scale-110"
      >
      <span v-else class="text-5xl">🛒</span>
    </NuxtLink>
    <!-- Rating (dynamic, optional) -->
    <span
      v-if="product.rating != null"
      class="inline-flex items-center gap-0.5 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded-md mb-2"
    >
      {{ product.rating }}<span class="text-amber-500">★</span>
    </span>
    <!-- Product name (dynamic) – click goes to product detail -->
    <NuxtLink :to="`/product/${product.id}`" class="block mb-2">
      <p class="font-bold text-gray-900 truncate text-sm leading-tight hover:text-[#2563eb] hover:underline">
        {{ product.name }}
      </p>
    </NuxtLink>
    <!-- Price + Stock (dynamic) -->
    <div class="flex items-baseline justify-between gap-2 mb-3">
      <span class="text-xl font-bold text-gray-900">{{ product.currency }}{{ product.price }}</span>
      <span class="text-sm font-medium shrink-0" :class="product.inStock ? 'text-green-600' : 'text-gray-500'">
        {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
      </span>
    </div>
    <!-- Quantity + Add to Cart (min-w-0 so button stays visible in narrow cards) -->
    <div class="flex items-center gap-2 min-w-0">
      <div class="flex items-center rounded-full border-2 border-red-500 overflow-hidden bg-white shrink-0">
        <button
          type="button"
          class="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-lg font-medium hover:bg-red-600 transition-colors"
          aria-label="Decrease quantity"
          @click="quantity = Math.max(1, quantity - 1)"
        >
          −
        </button>
        <span class="min-w-[2rem] text-center text-sm font-medium text-gray-900">{{ quantity }}</span>
        <button
          type="button"
          class="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-lg font-medium hover:bg-red-600 transition-colors"
          aria-label="Increase quantity"
          @click="quantity += 1"
        >
          +
        </button>
      </div>
      <button
        type="button"
        class="flex-1 min-w-0 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium rounded-lg transition-colors truncate"
        :disabled="!product.inStock"
        @click="addToCart"
      >
        Add to cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductItem } from '~/types/catalog'

const props = defineProps<{
  product: ProductItem
}>()

const quantity = ref(props.product.defaultQuantity || 1)
const { addItem } = useCart()

function addToCart() {
  addItem(props.product.id, quantity.value)
}
</script>
