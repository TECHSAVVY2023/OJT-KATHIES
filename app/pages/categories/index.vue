<template>
  <div class="min-h-screen bg-gray-50">
    <main class="pt-6 md:pt-10">
      <section class="py-12 md:py-16 bg-[#CBD7E8]">
        <div class="container mx-auto px-4">
          <h1 class="text-3xl md:text-4xl font-bold text-center mb-4">
            <span class="text-gray-700">Shop by </span>
            <span class="text-[#1e3a5f] border-b-2 border-[#1e3a5f] pb-0.5">Category</span>
          </h1>
          <p class="text-gray-600 text-center max-w-xl mx-auto mb-10">
            Browse our range of authentic Filipino products by category.
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            <NuxtLink
              v-for="cat in categories"
              :key="cat.id"
              :to="`/categories?category=${encodeURIComponent(cat.name)}`"
              class="group bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-lg hover:border-[#1e3a5f] hover:bg-[#1e3a5f]/5 transition-all"
              :class="{ 'ring-2 ring-[#1e3a5f] border-[#1e3a5f]': selectedCategoryName === cat.name }"
            >
              <div class="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden mb-4 group-hover:scale-105 transition-transform">
                <img
                  v-if="cat.image"
                  :src="cat.image"
                  :alt="cat.name"
                  class="w-full h-full object-contain"
                >
                <span v-else class="text-4xl">📦</span>
              </div>
              <p class="font-semibold text-gray-900 group-hover:text-[#1e3a5f] transition-colors">
                {{ cat.name }}
              </p>
              <span class="text-xs text-gray-500 mt-1">View products →</span>
            </NuxtLink>
          </div>
        </div>
      </section>

      <section
        id="category-products"
        ref="categoryProductsRef"
        v-if="selectedCategoryName"
        class="py-12 bg-white scroll-mt-20"
      >
        <div class="container mx-auto px-4">
          <template v-if="categoryProducts.length">
            <h2 class="mb-6 text-2xl font-bold text-[#1e3a5f]">
              {{ selectedCategoryName }}
            </h2>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ProductCard
                v-for="product in categoryProducts"
                :key="product.id"
                :product="product"
              />
            </div>
          </template>
          <p
            v-else
            class="text-center text-lg text-gray-500"
          >
            No products found in {{ selectedCategoryName }}.
          </p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { header } = useLandingData()
const { categories } = useCategoriesData()
const { getProductsByCategory } = useProductData()
const { itemCount: cartCount } = useCart()

const headerLogoError = ref(false)

const selectedCategoryName = computed(() => {
  const cat = route.query.category as string
  return cat ? decodeURIComponent(cat) : ''
})

const categoryProducts = computed(() => {
  if (!selectedCategoryName.value) return []
  return getProductsByCategory(selectedCategoryName.value).value
})

const categoryProductsRef = ref<HTMLElement | null>(null)

watch(selectedCategoryName, (name) => {
  if (name) {
    nextTick(() => {
      categoryProductsRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
}, { flush: 'post' })

function isCategoriesPage(path: string) {
  return path === '/categories' || path === '/categories/'
}

useHead({
  title: computed(() =>
    selectedCategoryName.value
      ? `${selectedCategoryName.value} | Categories | Kathie's Kitchen`
      : "Categories | Kathie's Kitchen"
  )
})
</script>
