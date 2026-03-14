<template>
  <div
    class="group relative flex flex-col rounded-2xl border-2 border-[#edf0f5] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-[box-shadow,border-color]"
    :class="!product.inStock ? 'opacity-90' : 'hover:border-[#1e3a5f] hover:shadow-[0_0_0_1.5px_#1e3a5f,0_8px_24px_rgba(30,58,95,0.13)]'"
  >
    <!-- Badges -->
    <div class="absolute left-2.5 top-2.5 z-10 flex flex-col gap-1.5">
      <span
        v-if="product.isNew"
        class="inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-emerald-900 to-emerald-600 px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_2px_8px_rgba(4,120,87,0.4)] backdrop-blur"
      >
        <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300 animate-ping" />
        New
      </span>
      <span
        v-if="product.isSale"
        class="inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-rose-900 to-rose-500 px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_2px_8px_rgba(225,29,72,0.4)] backdrop-blur"
      >
        Sale
      </span>
    </div>

    <!-- Out of stock veil -->
    <div
      v-if="!product.inStock"
      class="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-[168px] items-center justify-center bg-[rgba(248,250,252,0.45)]"
    >
      <span
        class="rounded-full border border-slate-300 bg-white/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-slate-600 shadow"
      >
        Out of Stock
      </span>
    </div>

    <!-- Image -->
    <NuxtLink
      :to="`/product/${product.id}`"
      class="relative flex h-[168px] shrink-0 items-center justify-center overflow-hidden"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-[#f4f7fb] to-[#e8eef6]" />
      <img
        v-if="product.imageUrl"
        :src="product.imageUrl"
        :alt="product.name"
        class="relative z-[1] max-h-[138px] w-auto max-w-[82%] transform-gpu object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.10)] transition duration-300 ease-[cubic-bezier(0.34,1.15,0.64,1)] group-hover:scale-[1.10] group-hover:drop-shadow-[0_8px_18px_rgba(30,58,95,0.16)]"
      >
      <span
        v-else
        class="relative z-[1] text-[3.5rem] transition-transform duration-300 ease-[cubic-bezier(0.34,1.15,0.64,1)] group-hover:scale-110"
      >
        🛒
      </span>
    </NuxtLink>

    <!-- Body -->
    <div class="flex flex-1 flex-col gap-1.5 px-3.5 pb-3.5 pt-3">
      <!-- Name -->
      <NuxtLink :to="`/product/${product.id}`" class="block no-underline">
        <h3
          class="line-clamp-2 text-[0.875rem] font-bold leading-snug text-slate-900 transition-colors duration-150 hover:text-[#1e3a5f]"
        >
          {{ product.name }}
        </h3>
      </NuxtLink>

      <!-- Price row -->
      <div class="flex items-center justify-between gap-1">
        <span class="text-[1.1rem] font-extrabold tracking-[-0.02em] text-[#1e3a5f]">
          {{ product.currency }}{{ product.price }}
        </span>
        <span
          class="inline-flex items-center gap-1 text-[11px] font-semibold tracking-[0.02em]"
          :class="product.inStock ? 'text-emerald-600' : 'text-slate-400'"
        >
          <span
            class="h-[7px] w-[7px] shrink-0 rounded-full"
            :class="product.inStock ? 'bg-emerald-500 shadow-[0_0_0_2px_rgba(16,185,129,0.2)]' : 'bg-slate-300'"
          />
          {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
        </span>
      </div>

      <!-- Actions -->
      <div class="mt-0.5 flex items-center gap-2">
        <!-- Quantity stepper -->
        <div
          class="flex shrink-0 items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
        >
          <button
            type="button"
            class="flex h-8 w-8 items-center justify-center border-0 bg-transparent text-slate-600 transition hover:bg-[#1e3a5f] hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Decrease quantity"
            :disabled="quantity <= 1"
            @click="quantity = Math.max(1, quantity - 1)"
          >
            <svg viewBox="0 0 12 12" fill="none" class="h-3 w-3">
              <path d="M2.5 6h7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </button>
          <span
            class="min-w-[28px] select-none border-x border-slate-200 text-center text-[0.8rem] font-bold leading-8 text-slate-800"
          >
            {{ quantity }}
          </span>
          <button
            type="button"
            class="flex h-8 w-8 items-center justify-center border-0 bg-transparent text-slate-600 transition hover:bg-[#1e3a5f] hover:text-white"
            aria-label="Increase quantity"
            @click="quantity += 1"
          >
            <svg viewBox="0 0 12 12" fill="none" class="h-3 w-3">
              <path
                d="M6 2.5v7M2.5 6h7"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        <!-- Add to cart -->
        <button
          type="button"
          class="relative flex h-[34px] min-w-0 flex-1 items-center justify-center overflow-hidden rounded-xl border-0 text-[0.72rem] font-bold uppercase tracking-[0.04em] outline-none transition-[background,box-shadow,transform] duration-200"
          :class="[
            !product.inStock
              ? 'cursor-not-allowed bg-slate-200 text-slate-400 shadow-none'
              : justAdded
                ? 'cursor-default bg-gradient-to-r from-emerald-700 to-emerald-500 text-white shadow-[0_2px_10px_rgba(5,150,105,0.4)]'
                : 'cursor-pointer bg-gradient-to-r from-[#1e3a5f] to-[#2a5298] text-white shadow-[0_2px_8px_rgba(30,58,95,0.3),inset_0_1px_0_rgba(255,255,255,0.12)] hover:from-[#162d4a] hover:to-[#1e3f80] hover:shadow-[0_4px_14px_rgba(30,58,95,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[0px]',
          ]"
          :disabled="!product.inStock"
          @click="addToCart"
        >
          <span class="relative flex h-full w-full items-center justify-center">
            <!-- Default label -->
            <span
              class="absolute inset-0 flex items-center justify-center gap-1.5 transition-all duration-200"
              :class="justAdded ? 'opacity-0 -translate-y-2' : ''"
            >
              <svg viewBox="0 0 20 20" fill="none" class="h-3.5 w-3.5 shrink-0">
                <path
                  d="M2.5 2.5h1.75l2.45 9.35a1.25 1.25 0 001.2.9h6.35a1.25 1.25 0 001.2-.9l1.5-6.1H5.75"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle cx="8.5" cy="16.5" r="1.25" fill="currentColor" />
                <circle cx="14" cy="16.5" r="1.25" fill="currentColor" />
              </svg>
              <span :class="!product.inStock ? 'text-slate-400' : ''">Add to cart</span>
            </span>

            <!-- Added label -->
            <span
              class="absolute inset-0 flex items-center justify-center gap-1.5 opacity-0 transition-all duration-200"
              :class="justAdded ? 'translate-y-0 opacity-100' : 'translate-y-2'"
            >
              <svg viewBox="0 0 16 16" fill="none" class="h-3.5 w-3.5 shrink-0">
                <path
                  d="M3 8l3.5 3.5L13 4"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
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
  setTimeout(() => {
    justAdded.value = false
  }, 1800)
}
</script>

