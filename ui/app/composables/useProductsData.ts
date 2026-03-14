import type { ProductItem } from '~/types/catalog'
import productJson from '~/data/product.json'

/** Birahon ang products data gikan sa product.json (alias for useProductData) */
export function useProductsData() {
  const products = shallowRef<ProductItem[]>(productJson as ProductItem[])

  const getProductById = (id: string) =>
    computed(() => products.value.find(p => p.id === id))

  const getProductsByCategory = (category: string) =>
    computed(() => products.value.filter(p => p.category === category))

  const getProductsByBrand = (brand: string) =>
    computed(() => products.value.filter(p => p.brand === brand))

  return {
    products: readonly(products),
    getProductById,
    getProductsByCategory,
    getProductsByBrand
  }
}
