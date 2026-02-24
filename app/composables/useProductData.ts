import type { ProductItem } from '~/types/catalog'
import productJson from '~/data/product.json'


const initialProducts = () => JSON.parse(JSON.stringify(productJson)) as ProductItem[]


export function useProductData() {
  const products = shallowRef<ProductItem[]>(initialProducts())

  const getProductById = (id: string) =>
    computed(() => products.value.find(p => p.id === id))

  const getProductsByCategory = (category: string) =>
    computed(() => products.value.filter(p => p.category === category))

  const getProductsByBrand = (brand: string) =>
    computed(() => products.value.filter(p => p.brand === brand))

  function addProduct(item: ProductItem) {
    if (products.value.some(p => p.id === item.id)) return
    products.value = [...products.value, item]
  }

  function updateProduct(id: string, patch: Partial<ProductItem>) {
    products.value = products.value.map(p =>
      p.id === id ? { ...p, ...patch } : p
    )
  }

  function deleteProduct(id: string) {
    products.value = products.value.filter(p => p.id !== id)
  }

  /** Generate a new unique product id (e.g. prod-011). */
  function nextProductId() {
    const nums = products.value
      .map(p => parseInt(p.id.replace(/\D/g, ''), 10))
      .filter(n => !Number.isNaN(n))
    const max = nums.length ? Math.max(...nums) : 0
    return `prod-${String(max + 1).padStart(3, '0')}`
  }

  return {
    products: readonly(products),
    getProductById,
    getProductsByCategory,
    getProductsByBrand,
    addProduct,
    updateProduct,
    deleteProduct,
    nextProductId
  }
}
