<template>
  <div class="space-y-6">
    <!-- Header: title + subtitle + action buttons -->
    <ProductHeader 
      :product-count-label="productCountLabel" 
      @add-product="showAddModal = true" 
    />

    <!-- Search and filters -->
    <ProductFilters 
      v-model:search-query="searchQuery"
      v-model:status-filter="statusFilter"
      v-model:category-filter="categoryFilter"
      :categories="categories"
    />

    <!-- Table -->
    <ProductTable 
      :products="paginatedProducts"
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-items="filteredProducts.length"
      :range-start="rangeStart"
      :range-end="rangeEnd"
      @view="openView"
      @edit="openEdit"
      @delete="confirmDelete"
      @page-change="currentPage = $event"
    />

    <!-- View Product modal -->
    <ViewProductModal 
      :product="viewingProduct" 
      @close="closeViewModal" 
      @edit="viewToEdit" 
    />

    <!-- Add / Edit Product modal -->
    <ProductModal 
      :is-visible="showAddModal || !!editingProduct"
      :is-editing="!!editingProduct"
      :editing-product="editingProduct"
      :categories="categories"
      @close="closeModal"
      @save="saveProduct"
    />
  </div>
</template>

<script setup lang="ts">
import type { ProductItem, CategoryItem } from '~/types/catalog'

definePageMeta({ layout: 'admin' })

const { products, addProduct, updateProduct, deleteProduct, nextProductId } = useProductData()
const { categories } = useCategoriesData()

const searchQuery = ref('')
const statusFilter = ref('')
const categoryFilter = ref('')
const currentPage = ref(1)
const perPage = 10
const showAddModal = ref(false)
const editingProduct = ref<ProductItem | null>(null)
const viewingProduct = ref<ProductItem | null>(null)

function closeModal() {
  showAddModal.value = false
  editingProduct.value = null
}

function openView(product: ProductItem) {
  viewingProduct.value = product
}

function closeViewModal() {
  viewingProduct.value = null
}

function viewToEdit() {
  if (viewingProduct.value) {
    openEdit(viewingProduct.value)
    closeViewModal()
  }
}

function openEdit(product: ProductItem) {
  editingProduct.value = product
}

function saveProduct(productData: Partial<ProductItem>) {
  if (editingProduct.value) {
    updateProduct(editingProduct.value.id, productData)
  } else {
    const id = nextProductId()
    addProduct({
      id,
      name: productData.name!,
      brand: productData.brand ?? '',
      category: productData.category ?? '',
      imageUrl: productData.imageUrl || '/images/placeholder.png',
      price: productData.price ?? 0,
      currency: productData.currency ?? 'R',
      rating: productData.rating,
      isNew: productData.isNew ?? true,
      isSale: productData.isSale ?? false,
      inStock: productData.inStock ?? true,
      defaultQuantity: productData.defaultQuantity ?? 1,
      stockCount: productData.stockCount,
      description: productData.description
    })
  }
  closeModal()
  if (!editingProduct.value) currentPage.value = Math.max(1, totalPages.value)
}

function confirmDelete(product: ProductItem) {
  if (!import.meta.client) return
  if (confirm(`Delete "${product.name}"? This will remove it from the list.`)) {
    deleteProduct(product.id)
    const total = totalPages.value
    if (currentPage.value > total) currentPage.value = Math.max(1, total)
  }
}

const productCountLabel = computed(() => {
  const n = products.value.length
  return n >= 100 ? '100+' : String(n)
})

const filteredProducts = computed(() => {
  let list = [...products.value] as ProductItem[]

  const q = searchQuery.value?.trim().toLowerCase()
  if (q) {
    list = list.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
    )
  }

  if (statusFilter.value === 'in') list = list.filter(p => p.inStock)
  if (statusFilter.value === 'out') list = list.filter(p => !p.inStock)
  if (categoryFilter.value) list = list.filter(p => p.category === categoryFilter.value)

  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / perPage)))

const paginatedProducts = computed(() => {
  const list = filteredProducts.value
  const start = (currentPage.value - 1) * perPage
  return list.slice(start, start + perPage)
})

const rangeStart = computed(() => (currentPage.value - 1) * perPage + 1)
const rangeEnd = computed(() =>
  Math.min(currentPage.value * perPage, filteredProducts.value.length)
)

const visiblePages = computed(() => {
  const total = totalPages.value
  const cur = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | string)[] = []
  if (cur <= 4) {
    pages.push(1, 2, 3, 4, '...', total)
  } else if (cur >= total - 3) {
    pages.push(1, '...', total - 3, total - 2, total - 1, total)
  } else {
    pages.push(1, '...', cur - 1, cur, cur + 1, '...', total)
  }
  return pages
})

watch([searchQuery, statusFilter, categoryFilter], () => {
  currentPage.value = 1
})

useHead({ title: "Products | Admin | Kathie's Kitchen" })
</script>
