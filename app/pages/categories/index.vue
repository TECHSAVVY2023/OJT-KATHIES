<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header (fixed on scroll) -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-[#1e3a5f] text-white shadow">
      <div class="container mx-auto px-4 flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
            <img
              v-if="header?.logo?.iconPath && !headerLogoError"
              :src="header.logo.iconPath"
              :alt="header?.logo?.text"
              class="w-8 h-8 object-contain"
              @error="headerLogoError = true"
            >
            <span v-else class="text-lg font-bold text-[#1e3a5f]">K</span>
          </div>
          <span class="font-bold text-lg">{{ header?.logo.text }}</span>
        </NuxtLink>
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="link in header?.navLinks"
            :key="link.path"
            :to="link.path"
            class="hover:underline"
            :class="{ 'font-semibold underline': isCategoriesPage(link.path) }"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
        <div class="flex items-center gap-4">
          <NuxtLink to="/cart" class="relative p-2 hover:bg-white/10 rounded flex items-center justify-center text-white" aria-label="Cart">
            <img v-if="header?.cartIconPath" :src="header.cartIconPath" alt="Cart" class="w-6 h-6 object-contain">
            <CartIcon v-else class="w-6 h-6 shrink-0" />
            <span v-if="cartCount > 0" class="absolute -top-0.5 -right-0.5 min-w-[1.25rem] h-5 px-1 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">{{ cartCount > 99 ? '99+' : cartCount }}</span>
          </NuxtLink>
          <NuxtLink
            v-for="link in header?.utilityLinks?.filter(l => l.type === 'button')"
            :key="link.path"
            :to="link.path"
            class="px-4 py-2 rounded bg-white/20 hover:bg-white/30"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </header>

    <div class="pt-16">
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

      <!-- Products for selected category (displayed below when a category is clicked) -->
      <section
        id="category-products"
        ref="categoryProductsRef"
        v-if="selectedCategoryName && categoryProducts.length > 0"
        class="py-12 bg-white scroll-mt-20"
      >
        <div class="container mx-auto px-4">
          <h2 class="text-2xl font-bold text-[#1e3a5f] mb-6">
            {{ selectedCategoryName }}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ProductCard
              v-for="product in categoryProducts"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>
      </section>
      <section
        id="category-products"
        ref="categoryProductsRef"
        v-else-if="selectedCategoryName && categoryProducts.length === 0"
        class="py-12 bg-white scroll-mt-20"
      >
        <div class="container mx-auto px-4 text-center text-gray-500">
          <p class="text-lg">No products found in {{ selectedCategoryName }}.</p>
        </div>
      </section>
    </div>
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
