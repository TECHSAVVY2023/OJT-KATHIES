<template>
  <div class="min-h-screen bg-gray-50">
    <PageHeader />

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

        <ProductReviewsSection :product-id="productId" />

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
const { productId, product, quantity, relatedProducts, addToCart } = useProductDetailPage()
</script>
