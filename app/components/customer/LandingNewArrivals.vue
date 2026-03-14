<template>
  <section class="bg-white py-16">
    <div class="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
      <div class="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 class="border-b-4 border-[#1e3a5f] pb-1 text-2xl font-bold text-red-600">
          New Arrivals
        </h2>
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search Product"
          class="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20 sm:w-64"
        >
      </div>

      <div class="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        <ProductCard
          v-for="p in productsForDisplay"
          :key="p.id"
          :product="p"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProductItem } from '~/types/catalog'

const { newArrivals } = useNewArrivalData()
const searchQuery = ref('')

const filteredNewArrivals = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return newArrivals.value
  return newArrivals.value.filter(
    p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  )
})

/** Map NewArrivalItem to ProductItem for ProductCard */
const productsForDisplay = computed((): ProductItem[] =>
  filteredNewArrivals.value.map(p => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    imageUrl: p.imageUrl,
    price: p.price,
    currency: p.currency,
    rating: p.rating,
    isNew: p.isNew,
    isSale: false,
    inStock: p.inStock,
    defaultQuantity: p.defaultQuantity ?? 1
  } as ProductItem))
)
</script>
