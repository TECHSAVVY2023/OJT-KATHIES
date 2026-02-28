<template>
  <div class="space-y-6">
    <!-- Header: title + subtitle + action buttons -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-[#20437B]">Products</h1>
        <p class="text-[#20437B]/80 mt-1">
          You have <strong class="text-[#20437B]">{{ productCountLabel }}</strong> Products Today
        </p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#20437B] text-white font-medium hover:opacity-90 transition-opacity"
          @click="showAddModal = true"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          Add Product
        </button>
      </div>
    </div>

    <!-- Search and filters -->
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="flex-1 relative">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search here"
          class="w-full pl-4 pr-10 py-2.5 border border-[#D3DDFF] rounded-lg text-sm focus:ring-2 focus:ring-[#20437B]/30 focus:border-[#20437B] outline-none"
        >
        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[#20437B]/50 pointer-events-none">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </span>
      </div>
      <div class="flex flex-wrap gap-2">
        <select
          v-model="statusFilter"
          class="px-4 py-2.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 text-sm font-medium focus:ring-2 focus:ring-amber-300 outline-none"
        >
          <option value="">All Status</option>
          <option value="in">In Stock</option>
          <option value="out">Out of Stock</option>
        </select>
        <select
          v-model="categoryFilter"
          class="px-4 py-2.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm font-medium focus:ring-2 focus:ring-emerald-300 outline-none"
        >
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.name">
            {{ cat.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm border border-[#D3DDFF] overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-[#D3DDFF]/50 text-[#20437B] font-semibold text-left">
              <th class="px-4 py-3 w-20">Image</th>
              <th class="px-4 py-3">Product Name</th>
              <th class="px-4 py-3 max-w-[200px]">Description</th>
              <th class="px-4 py-3">Category</th>
              <th class="px-4 py-3">Price</th>
              <th class="px-4 py-3">Quantity</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3 text-right w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in paginatedProducts"
              :key="product.id"
              class="border-t border-[#D3DDFF]/60 hover:bg-[#D3DDFF]/20 transition-colors"
            >
              <!-- Product Image (separate column) -->
              <td class="px-4 py-3">
                <div class="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    v-if="product.imageUrl"
                    :src="product.imageUrl"
                    :alt="product.name"
                    class="w-full h-full object-contain"
                    @error="(e) => (e.currentTarget!.style.display = 'none')"
                  >
                  <span v-else class="text-gray-400 text-xs">No img</span>
                </div>
              </td>
              <!-- Product Name (separate column) -->
              <td class="px-4 py-3 font-medium text-[#20437B]">
                {{ product.name }}
              </td>
              <td class="px-4 py-3 text-gray-600 max-w-[200px] truncate" :title="product.description">
                {{ product.description || '–' }}
              </td>
              <td class="px-4 py-3 text-gray-600">
                {{ product.category }}
              </td>
              <td class="px-4 py-3 font-medium">
                {{ product.currency }}{{ product.price }}
              </td>
              <td class="px-4 py-3">
                {{ product.stockCount ?? product.defaultQuantity ?? 0 }}
              </td>
              <td class="px-4 py-3">
                <span
                  class="inline-block px-2.5 py-1 rounded-full text-xs font-medium"
                  :class="product.inStock ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'"
                >
                  {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
                </span>
              </td>
              <td class="px-4 py-3 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button type="button" class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" aria-label="View" @click="openView(product)">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </button>
                  <button type="button" class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" aria-label="Edit" @click="openEdit(product)">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button type="button" class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" aria-label="Delete" @click="confirmDelete(product)">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-4 py-3 border-t border-[#D3DDFF]/60 flex flex-wrap items-center justify-between gap-2">
        <p class="text-sm text-gray-600">
          Showing {{ rangeStart }}-{{ rangeEnd }} of {{ filteredProducts.length }} products
        </p>
        <div class="flex items-center gap-1">
          <button
            type="button"
            class="p-2 rounded-lg border border-[#D3DDFF] text-[#20437B] hover:bg-[#D3DDFF]/50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            :disabled="currentPage <= 1"
            @click="currentPage--"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <template v-for="p in visiblePages" :key="p">
            <button
              v-if="p !== '...'"
              type="button"
              class="min-w-[32px] h-8 rounded-lg font-medium transition-colors"
              :class="p === currentPage ? 'bg-[#20437B] text-white' : 'text-[#20437B] hover:bg-[#D3DDFF]/50'"
              @click="currentPage = p"
            >
              {{ p }}
            </button>
            <span v-else class="px-1 text-gray-400">...</span>
          </template>
          <button
            type="button"
            class="p-2 rounded-lg border border-[#D3DDFF] text-[#20437B] hover:bg-[#D3DDFF]/50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            :disabled="currentPage >= totalPages"
            @click="currentPage++"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- View Product modal (same layout as Edit, read-only) -->
    <Teleport to="body">
      <div v-if="viewingProduct" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeViewModal">
        <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-[#D3DDFF] flex items-center justify-between">
            <h2 class="text-lg font-bold text-[#20437B]">View Product</h2>
            <button type="button" class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" aria-label="Close" @click="closeViewModal">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div class="p-6">
            <div class="flex flex-col sm:flex-row gap-6">
              <!-- Left: read-only fields (same layout as Edit) -->
              <div class="flex-1 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <p class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg bg-gray-50/80 text-gray-900">{{ viewingProduct.name }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <p class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg bg-gray-50/80 text-gray-900 whitespace-pre-wrap min-h-[4.5rem]">{{ viewingProduct.description || '–' }}</p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <p class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg bg-gray-50/80 text-gray-900">{{ viewingProduct.category || '–' }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <p class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg bg-gray-50/80 text-gray-900">{{ viewingProduct.stockCount ?? viewingProduct.defaultQuantity ?? 0 }}</p>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500 text-sm">{{ viewingProduct.currency }}</span>
                    <p class="flex-1 px-3 py-2 border border-[#D3DDFF] rounded-lg bg-gray-50/80 text-gray-900">{{ viewingProduct.price }}</p>
                  </div>
                </div>
              </div>
              <!-- Right: Image (circular, read-only) -->
              <div class="flex flex-col items-center justify-center shrink-0">
                <div class="w-40 h-40 rounded-full border-2 border-dashed border-[#D3DDFF] flex flex-col items-center justify-center overflow-hidden bg-gray-50/50">
                  <img v-if="viewingProduct.imageUrl" :src="viewingProduct.imageUrl" :alt="viewingProduct.name" class="w-full h-full object-cover">
                  <template v-else>
                    <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span class="text-sm text-gray-500">No image</span>
                  </template>
                </div>
                <p class="text-xs text-gray-400 mt-2 text-center">or paste URL in edit</p>
              </div>
            </div>
            <div class="flex justify-end gap-2 pt-6 mt-6 border-t border-[#D3DDFF]">
              <button type="button" class="px-4 py-2 rounded-lg border border-[#D3DDFF] text-[#20437B] hover:bg-[#D3DDFF]/50" @click="closeViewModal">Close</button>
              <button type="button" class="px-4 py-2 rounded-lg bg-[#20437B] text-white font-medium hover:opacity-90" @click="viewToEdit">Edit Product</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Add / Edit Product modal -->
    <Teleport to="body">
      <div v-if="showAddModal || editingProduct" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeModal">
        <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-[#D3DDFF] flex items-center justify-between">
            <h2 class="text-lg font-bold text-[#20437B]">{{ editingProduct ? 'Edit Product' : 'Add Product' }}</h2>
            <button type="button" class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" aria-label="Close" @click="closeModal">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <form class="p-6" @submit.prevent="saveProduct">
            <div class="flex flex-col sm:flex-row gap-6">
              <!-- Left: form fields -->
              <div class="flex-1 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input v-model="form.name" type="text" required class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none" placeholder="e.g. Pancit Canton Hot & Spicy" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea v-model="form.description" rows="3" class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none" placeholder="A bold and fiery instant noodle packed with savory flavor..."></textarea>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select v-model="form.category" class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none">
                      <option value="">Select</option>
                      <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <select v-model.number="form.stockCount" class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none">
                      <option v-for="n in 101" :key="n" :value="n - 1">{{ n - 1 }}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500 text-sm">{{ form.currency }}</span>
                    <input v-model.number="form.price" type="number" min="0" step="0.01" required class="flex-1 px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none" placeholder="0" />
                  </div>
                </div>
              </div>
              <!-- Right: Upload Image (circular) -->
              <div class="flex flex-col items-center justify-center shrink-0">
                <label class="cursor-pointer block">
                  <input ref="imageInputRef" type="file" accept="image/*" class="hidden" @change="onImageSelect">
                  <div class="w-40 h-40 rounded-full border-2 border-dashed border-[#D3DDFF] flex flex-col items-center justify-center gap-2 hover:border-[#20437B]/50 hover:bg-[#D3DDFF]/20 transition-colors overflow-hidden">
                    <img v-if="form.imageUrl" :src="form.imageUrl" :alt="form.name" class="w-full h-full object-cover">
                    <template v-else>
                      <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span class="text-sm text-gray-500">Upload Image</span>
                    </template>
                  </div>
                </label>
                <p class="text-xs text-gray-400 mt-2 text-center">or paste URL in edit</p>
              </div>
            </div>
            <div class="flex justify-end gap-2 pt-6 mt-6 border-t border-[#D3DDFF]">
              <button type="button" class="px-4 py-2 rounded-lg border border-[#D3DDFF] text-[#20437B] hover:bg-[#D3DDFF]/50" @click="closeModal">Cancel</button>
              <button type="submit" class="px-4 py-2 rounded-lg bg-[#20437B] text-white font-medium hover:opacity-90">{{ editingProduct ? 'Update Product' : 'Create Product' }}</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { ProductItem } from '~/types/catalog'

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

const defaultForm = (): Partial<ProductItem> & { name: string; price: number; currency: string; imageUrl: string } => ({
  name: '',
  brand: '',
  category: '',
  imageUrl: '',
  price: 0,
  currency: 'R',
  rating: 4.8,
  isNew: true,
  isSale: false,
  inStock: true,
  defaultQuantity: 1,
  stockCount: 0,
  description: ''
})

const form = ref(defaultForm())
const imageInputRef = ref<HTMLInputElement | null>(null)

function onImageSelect(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !file.type.startsWith('image/')) return
  const reader = new FileReader()
  reader.onload = () => {
    form.value.imageUrl = reader.result as string
  }
  reader.readAsDataURL(file)
  input.value = ''
}

function closeModal() {
  showAddModal.value = false
  editingProduct.value = null
  form.value = defaultForm()
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
  form.value = {
    name: product.name,
    brand: product.brand,
    category: product.category,
    imageUrl: product.imageUrl,
    price: product.price,
    currency: product.currency,
    rating: product.rating,
    isNew: product.isNew,
    isSale: product.isSale ?? false,
    inStock: product.inStock,
    defaultQuantity: product.defaultQuantity,
    stockCount: product.stockCount ?? product.defaultQuantity,
    description: product.description ?? ''
  }
}

function saveProduct() {
  if (editingProduct.value) {
    updateProduct(editingProduct.value.id, {
      name: form.value.name!,
      brand: form.value.brand,
      category: form.value.category,
      imageUrl: form.value.imageUrl!,
      price: form.value.price!,
      currency: form.value.currency!,
      rating: form.value.rating,
      isNew: form.value.isNew,
      isSale: form.value.isSale,
      inStock: form.value.inStock,
      defaultQuantity: form.value.defaultQuantity ?? 1,
      stockCount: form.value.stockCount,
      description: form.value.description
    })
  } else {
    const id = nextProductId()
    addProduct({
      id,
      name: form.value.name!,
      brand: form.value.brand ?? '',
      category: form.value.category ?? '',
      imageUrl: form.value.imageUrl || '/images/placeholder.png',
      price: form.value.price ?? 0,
      currency: form.value.currency ?? 'R',
      rating: form.value.rating,
      isNew: form.value.isNew ?? true,
      isSale: form.value.isSale ?? false,
      inStock: form.value.inStock ?? true,
      defaultQuantity: form.value.defaultQuantity ?? 1,
      stockCount: form.value.stockCount,
      description: form.value.description
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
