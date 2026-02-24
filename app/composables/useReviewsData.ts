import type { ProductReview } from '~/types/catalog'
import reviewsJson from '~/data/reviews.json'

/** Birahon ang reviews gikan sa reviews.json */
export function useReviewsData() {
  const reviews = shallowRef<ProductReview[]>(reviewsJson as ProductReview[])

  const getReviewsByProductId = (productId: string) =>
    computed(() => reviews.value.filter(r => r.productId === productId))

  const getAverageRating = (productId: string) =>
    computed(() => {
      const list = reviews.value.filter(r => r.productId === productId)
      if (list.length === 0) return 0
      return list.reduce((a, r) => a + r.rating, 0) / list.length
    })

  const getRatingCounts = (productId: string) =>
    computed(() => {
      const list = reviews.value.filter(r => r.productId === productId)
      const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      list.forEach(r => {
        const star = Math.round(r.rating) as 1 | 2 | 3 | 4 | 5
        if (star >= 1 && star <= 5) counts[star]++
      })
      return counts
    })

  return {
    reviews: readonly(reviews),
    getReviewsByProductId,
    getAverageRating,
    getRatingCounts
  }
}
