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
          <span class="font-bold text-lg">{{ header?.logo?.text }}</span>
        </NuxtLink>
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="link in header?.navLinks"
            :key="link.path"
            :to="link.path"
            class="hover:underline"
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
            v-for="link in header?.utilityLinks?.filter((l: { type: string }) => l.type === 'button')"
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
    <main class="container mx-auto px-4 py-8">
      <!-- Not found -->
      <div v-if="!product" class="max-w-md mx-auto text-center py-16">
        <p class="text-xl text-gray-600 mb-4">Product not found.</p>
        <NuxtLink to="/products" class="inline-flex items-center gap-1 text-[#2563eb] font-medium hover:underline">
          ← Back to products
        </NuxtLink>
      </div>

      <!-- Product detail (layout like reference: image left, info right, then reviews, then related) -->
      <template v-else>
        <NuxtLink to="/products" class="inline-flex items-center gap-1 text-[#1e3a5f] font-medium hover:underline mb-6">
          ← Back to products
        </NuxtLink>

        <!-- Main product block: image + info -->
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16">
          <!-- Product image -->
          <div class="lg:w-1/2 flex-shrink-0 bg-white rounded-2xl shadow-md p-6 flex items-center justify-center min-h-[320px]">
            <img
              :src="product.imageUrl"
              :alt="product.name"
              class="max-h-[360px] w-auto max-w-full object-contain"
            >
          </div>

          <!-- Product info -->
          <div class="lg:w-1/2 flex flex-col">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {{ product.name }}
            </h1>
            <p v-if="product.description" class="text-gray-600 mb-4 leading-relaxed">
              {{ product.description }}
            </p>
            <p class="text-3xl font-bold text-gray-900 mb-2">
              {{ product.currency }}{{ product.price }}
            </p>
            <p v-if="product.stockCount != null && product.inStock" class="text-sm text-gray-500 mb-4">
              {{ product.stockCount }} Left
            </p>
            <p v-else class="text-sm font-medium mb-4" :class="product.inStock ? 'text-green-600' : 'text-gray-500'">
              {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
            </p>

            <!-- Quantity + Add to cart -->
            <div class="flex flex-wrap items-center gap-4 mb-6">
              <div class="flex rounded-full border-2 border-gray-300 overflow-hidden bg-white">
                <button
                  type="button"
                  class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Decrease quantity"
                  @click="quantity = Math.max(1, quantity - 1)"
                >
                  −
                </button>
                <span class="min-w-[2.5rem] flex items-center justify-center text-sm font-medium text-gray-900">{{ quantity }}</span>
                <button
                  type="button"
                  class="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Increase quantity"
                  @click="quantity += 1"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                class="inline-flex items-center gap-2 px-6 py-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!product.inStock"
                @click="addToCart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add To Cart
              </button>
            </div>

            <!-- About Product link -->
            <a href="#reviews" class="text-sm text-[#2563eb] hover:underline mb-4 inline-block">
              About Product
            </a>

            <!-- Badges -->
            <div class="flex flex-wrap gap-3">
              <span
                v-if="product.isBestSeller"
                class="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1.5 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Best Seller Product
              </span>
              <span class="inline-flex items-center gap-1.5 text-green-700 text-sm font-medium px-3 py-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                100% satisfaction guarantee
              </span>
            </div>
          </div>
        </div>

        <!-- Customer Reviews: two-column layout (left: summary + bars, right: reviews list) -->
        <section id="reviews" class="mb-16">
          <div v-if="productReviews.length > 0" class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div class="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
              <!-- Left column: Customer Reviews -->
              <div class="p-6 md:p-8">
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                  Customer Reviews
                </h2>
                <p class="text-gray-700 mb-6">
                  Average rating: <span class="font-bold text-gray-900">{{ averageRating.toFixed(1) }}</span>
                  <span class="text-gray-500">({{ totalReviews }})</span>
                </p>
                <!-- Star distribution with outlined star icons + blue bars + count -->
                <div class="space-y-3 max-w-sm">
                  <div
                    v-for="star in [5, 4, 3, 2, 1]"
                    :key="star"
                    class="flex items-center gap-2"
                  >
                    <span class="text-sm text-gray-600 w-6">{{ star }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <div class="flex-1 min-w-0 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-[#2563eb] rounded-full transition-all"
                        :style="{ width: `${totalReviews ? (ratingCounts[star as 1|2|3|4|5] / totalReviews) * 100 : 0}%` }"
                      />
                    </div>
                    <span class="text-sm text-gray-500 shrink-0">• {{ formatReviewCount(ratingCounts[star as 1|2|3|4|5]) }}</span>
                  </div>
                </div>
              </div>

              <!-- Right column: Reviews -->
              <div class="p-6 md:p-8 flex flex-col">
                <div class="flex items-center justify-between gap-4 mb-6">
                  <h2 class="text-xl font-bold text-gray-900">
                    Reviews
                  </h2>
                  <select
                    v-model="reviewSort"
                    class="text-sm border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] outline-none cursor-pointer"
                  >
                    <option value="recent">
                      Recent
                    </option>
                    <option value="helpful">
                      Most Helpful
                    </option>
                    <option value="rating-desc">
                      Highest rating
                    </option>
                    <option value="rating-asc">
                      Lowest rating
                    </option>
                  </select>
                </div>
                <div class="space-y-6 overflow-auto">
                  <div
                    v-for="rev in sortedReviews"
                    :key="rev.id"
                    class="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                  >
                    <h3 class="font-bold text-gray-900 mb-2">{{ rev.title }}</h3>
                    <div class="flex items-center gap-0.5 mb-2">
                      <template v-for="i in 5" :key="i">
                        <svg
                          v-if="i <= Math.round(rev.rating)"
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-5 h-5 text-amber-500 shrink-0"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <svg
                          v-else
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-5 h-5 text-gray-300 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="1.5"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                      </template>
                    </div>
                    <p class="text-gray-600 text-sm leading-relaxed">{{ rev.text }}</p>
                    <p v-if="rev.author" class="text-gray-400 text-xs mt-2">{{ rev.author }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center text-gray-500">
            No reviews yet for this product.
          </div>
        </section>

        <!-- Products Related To This Item -->
        <section class="mb-12">
          <h2 class="text-xl font-bold text-gray-900 mb-6">
            Products Related To This Item
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ProductCard
              v-for="related in relatedProducts"
              :key="related.id"
              :product="related"
            />
          </div>
        </section>
      </template>
    </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductItem } from '~/types/catalog'

const route = useRoute()
const { header } = useLandingData()
const { itemCount: cartCount } = useCart()
const { getProductById, getProductsByCategory } = useProductData()
const { getReviewsByProductId, getAverageRating, getRatingCounts } = useReviewsData()

const product = computed(() => {
  const pid = (route.params.id as string) ?? ''
  return pid ? getProductById(pid).value : null
})

const productId = computed(() => (route.params.id as string) ?? '')
const productReviews = computed(() => getReviewsByProductId(productId.value).value)
const averageRating = computed(() => getAverageRating(productId.value).value)
const ratingCounts = computed(() => getRatingCounts(productId.value).value)
const totalReviews = computed(() => productReviews.value.length)

const reviewSort = ref<'recent' | 'helpful' | 'rating-desc' | 'rating-asc'>('recent')
const sortedReviews = computed(() => {
  const list = [...productReviews.value]
  if (reviewSort.value === 'rating-desc') return list.sort((a, b) => b.rating - a.rating)
  if (reviewSort.value === 'rating-asc') return list.sort((a, b) => a.rating - b.rating)
  return list
})

function formatReviewCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(2)}K`
  return String(n)
}

const relatedProducts = computed(() => {
  if (!product.value) return [] as ProductItem[]
  const byCategory = getProductsByCategory(product.value.category).value
  return byCategory.filter(p => p.id !== product.value!.id).slice(0, 4)
})

const headerLogoError = ref(false)
const quantity = ref(1)

const { addItem } = useCart()

function addToCart() {
  if (product.value) {
    addItem(product.value.id, quantity.value)
  }
}

useHead({
  title: computed(() => product.value ? `${product.value.name} | Kathie's Kitchen` : "Product | Kathie's Kitchen")
})
</script>
