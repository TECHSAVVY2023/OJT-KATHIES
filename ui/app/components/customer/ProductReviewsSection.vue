<template>
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
                  :style="{ width: `${totalReviews ? (ratingCounts[star as 1 | 2 | 3 | 4 | 5] / totalReviews) * 100 : 0}%` }"
                />
              </div>
              <span class="text-sm text-gray-500 shrink-0">• {{ formatReviewCount(ratingCounts[star as 1 | 2 | 3 | 4 | 5]) }}</span>
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
</template>

<script setup lang="ts">
import type { ProductReview } from '~/types/catalog'

const props = defineProps<{ productId: string }>()

const { getReviewsByProductId, getAverageRating, getRatingCounts } = useReviewsData()

const productReviews = computed(() => getReviewsByProductId(props.productId).value)
const averageRating = computed(() => getAverageRating(props.productId).value)
const ratingCounts = computed(() => getRatingCounts(props.productId).value)
const totalReviews = computed(() => productReviews.value.length)

const reviewSort = ref<'recent' | 'helpful' | 'rating-desc' | 'rating-asc'>('recent')
const sortedReviews = computed<ProductReview[]>(() => {
  const list = [...productReviews.value]
  if (reviewSort.value === 'rating-desc') return list.sort((a, b) => b.rating - a.rating)
  if (reviewSort.value === 'rating-asc') return list.sort((a, b) => a.rating - b.rating)
  return list
})

function formatReviewCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(2)}K`
  return String(n)
}
</script>

