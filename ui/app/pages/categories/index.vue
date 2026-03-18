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
            <CategoryCard
              v-for="cat in categories"
              :key="cat.id"
              :category="cat"
              :is-selected="selectedCategoryName === cat.name"
            />
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
const { categories } = useCategoriesData()
const { selectedCategoryName, categoryProducts, categoryProductsRef } = useCategoriesPage()
</script>
