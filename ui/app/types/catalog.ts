/** product.json – full product catalog item */
export interface ProductItem {
  id: string
  name: string
  brand: string
  category: string
  variant?: string
  imageUrl: string
  /** Optional extra images for detail page gallery */
  images?: readonly string[]
  price: number
  currency: string
  rating?: number
  isNew: boolean
  isSale?: boolean
  inStock: boolean
  defaultQuantity: number
  /** Long description for product detail page */
  description?: string
  /** Display stock count e.g. "12 Left" */
  stockCount?: number
  /** Best seller badge on detail page */
  isBestSeller?: boolean
}

/** reviews.json – product review */
export interface ProductReview {
  id: string
  productId: string
  title: string
  rating: number
  text: string
  author?: string
  date?: string
}

/** catalog.json – filter config for Product Catalog page */
export interface CatalogFiltersConfig {
  customFilterLabel: string
  priceRanges: { label: string; max: number }[]
}

/** newarrival.json – new arrival item (same shape as ProductItem for display) */
export interface NewArrivalItem {
  id: string
  name: string
  brand: string
  category: string
  imageUrl: string
  price: number
  currency: string
  rating: number
  isNew: boolean
  inStock: boolean
  defaultQuantity: number
}

/** categories.json – category item */
export interface CategoryItem {
  id: string
  name: string
  image: string
  path: string
  /** Display order (admin). */
  order?: number
  /** Created date e.g. 01-01-2025 (admin). */
  createdAt?: string
}

/** Customer status for admin customer list */
export type CustomerStatus = 'Active' | 'Inactive'

/** customers.json – admin customer list item */
export interface CustomerItem {
  id: string
  name: string
  phone: string
  age: number
  status: CustomerStatus
  profileImage?: string
  /** Customer details (sidebar): registration date e.g. 15.01.2025 */
  registrationDate?: string
  /** Last purchase date e.g. 10.01.2025 */
  lastPurchase?: string
  totalOrders?: number
  completedOrders?: number
  canceledOrders?: number
}

/** Order status for admin order list */
export type OrderStatus = 'Pending' | 'In-Progress' | 'Completed' | 'Canceled' | 'Returned' | 'Damaged'

/** orders.json – admin order list item */
export interface OrderItem {
  id: string
  orderId: string
  customerName: string
  productName: string
  productImage: string
  quantity: number
  total: string
  paymentMethod: string
  status: OrderStatus
}

/** upcomingstocks.json – upcoming stock carousel item */
export interface UpcomingStockItem {
  id: string
  headerSmallText?: string
  headerLargeText?: string
  headerBgClass: string
  productBrand: string
  productFlavor: string
  productImage: string
  description?: string
  buttonText: string
  buttonPath: string
}
