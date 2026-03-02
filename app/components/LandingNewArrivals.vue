<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-6 sm:px-8 lg:px-12">
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
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
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
