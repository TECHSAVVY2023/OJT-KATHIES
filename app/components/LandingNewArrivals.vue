<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 class="text-2xl font-bold text-red-600 border-b-4 border-[#1e3a5f] pb-1">
          New Arrivals
        </h2>
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search Product"
          class="px-4 py-2 border rounded-lg w-full sm:w-64"
        >
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div
          v-for="p in filteredNewArrivals"
          :key="p.id"
          class="group rounded-3xl bg-white p-4 shadow-md border border-gray-100 relative overflow-hidden transition-all duration-200 hover:border-[#1e3a5f] hover:shadow-lg hover:ring-2 hover:ring-[#1e3a5f]/20"
        >
          <span
            v-if="p.isNew"
            class="absolute top-3 left-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm z-10"
          >
            New
          </span>
          <button
            type="button"
            class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors z-10"
            aria-label="Add to wishlist"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
          <div class="h-[160px] flex items-center justify-center mt-1 mb-2 overflow-hidden shrink-0">
            <img
              v-if="p.imageUrl"
              :src="p.imageUrl"
              :alt="p.name"
              class="max-h-[160px] w-auto max-w-full object-contain transition-transform duration-300 ease-out group-hover:scale-110"
            >
            <span v-else class="text-5xl">🛒</span>
          </div>
          <p class="font-bold text-gray-900 truncate text-sm leading-tight mb-2">
            {{ p.name }}
          </p>
          <div class="flex items-baseline justify-between gap-2 mb-3">
            <span class="text-xl font-bold text-gray-900">{{ p.currency }}{{ p.price }}</span>
            <span class="text-sm font-medium text-green-600 shrink-0">In Stock</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center rounded-full border border-slate-300 overflow-hidden bg-slate-50 shrink-0">
              <button
                type="button"
                class="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-medium hover:bg-slate-300 transition-colors"
                aria-label="Decrease quantity"
                @click="setQty(p.id, getQty(p.id) - 1)"
              >
                −
              </button>
                <span class="min-w-[1.75rem] text-center text-xs font-medium text-gray-900">{{ getQty(p.id) }}</span>
              <button
                type="button"
                class="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-medium hover:bg-slate-300 transition-colors"
                aria-label="Increase quantity"
                @click="setQty(p.id, getQty(p.id) + 1)"
              >
                +
              </button>
            </div>
            <button
              type="button"
              class="flex-1 py-2 px-2.5 bg-[#1e3a5f] hover:bg-[#083D6D] text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
              @click="addToCart(p.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { newArrivals } = useNewArrivalData()
const { addItem } = useCart()

const searchQuery = ref('')
const quantities = ref<Record<string, number>>({})

const filteredNewArrivals = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return newArrivals.value
  return newArrivals.value.filter(
    p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  )
})

function getQty(id: string) {
  return quantities.value[id] ?? 1
}
function setQty(id: string, qty: number) {
  const n = Math.max(1, Math.floor(qty))
  quantities.value = { ...quantities.value, [id]: n }
}
function addToCart(productId: string) {
  addItem(productId, getQty(productId))
}
</script>
