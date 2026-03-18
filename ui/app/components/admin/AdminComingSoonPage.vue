<template>
  <AdminLayout>
    <template #title>Coming Soon Products</template>
    <template #subtitle>
      You have <strong class="text-orange-500">{{ productCountLabel }}</strong> Products Today
    </template>
    
    <template #default>
      <!-- Action button -->
      <div class="flex items-center gap-2 shrink-0">
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#20437B] text-white font-medium hover:opacity-90 transition-opacity"
          @click="openAdd"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          Add Product
        </button>
      </div>
      
      <!-- Search bar -->
      <div class="relative">
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
      
      <!-- Products table -->
      <AdminTable
        :columns="productColumns"
        :data="filteredItems"
        row-key="id"
        empty-message="No coming soon products match your search."
      >
        <template #cell-image="{ row }">
          <div class="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
            <img
              v-if="row.productImage"
              :src="row.productImage"
              :alt="row.productBrand + ' ' + row.productFlavor"
              class="w-full h-full object-contain"
              @error="(e: Event) => { const target = e.target as HTMLImageElement; target.style.display = 'none' }"
            >
            <span v-else class="text-gray-400 text-xs">No img</span>
          </div>
        </template>
        
        <template #cell-productName="{ row }">
          <span class="font-medium text-[#20437B]">
            {{ row.productBrand }} {{ row.productFlavor }}
          </span>
        </template>
        
        <template #cell-description="{ row }">
          <span class="text-gray-600 truncate" :title="row.description || productName(row)">
            {{ row.description || productName(row) }}
          </span>
        </template>
        
        <template #cell-actions="{ row }">
          <div class="flex items-center justify-end gap-1">
            <button type="button" class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" aria-label="View" @click="openView(row)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </button>
            <button type="button" class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" aria-label="Edit" @click="openEdit(row)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </button>
            <button type="button" class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" aria-label="Delete" @click="confirmDelete(row)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </template>
      </AdminTable>
    </template>
  </AdminLayout>

  <!-- View modal (same layout as Edit, read-only) -->
  <AdminModal
    :show="!!viewingItem"
    title="View Coming Soon Product"
    @close="closeViewModal"
  >
    <div class="flex flex-col sm:flex-row gap-6">
      <div class="flex-1 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
          <p class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg bg-gray-50/80 text-gray-900">{{ productName(viewingItem!) }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <p class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg bg-gray-50/80 text-gray-900 whitespace-pre-wrap min-h-[4rem]">{{ viewingItem?.description || productName(viewingItem!) || '–' }}</p>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center shrink-0">
        <div class="w-40 h-40 rounded-full border-2 border-dashed border-[#D3DDFF] flex flex-col items-center justify-center overflow-hidden bg-gray-50/50">
          <img v-if="viewingItem?.productImage" :src="viewingItem.productImage" :alt="productName(viewingItem!)" class="w-full h-full object-cover">
          <template v-else>
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span class="text-sm text-gray-500">No image</span>
          </template>
        </div>
      </div>
    </div>
    
    <template #footer>
      <button type="button" class="px-4 py-2 rounded-lg border border-[#D3DDFF] text-[#20437B] hover:bg-[#D3DDFF]/50" @click="closeViewModal">Close</button>
      <button type="button" class="px-4 py-2 rounded-lg bg-[#20437B] text-white font-medium hover:opacity-90" @click="viewToEdit">Edit Product</button>
    </template>
  </AdminModal>

  <!-- Add / Edit modal: only Image, Product name, Description -->
  <AdminModal
    :show="showModal"
    :title="editingItem ? 'Edit Coming Soon Product' : 'Add Coming Soon Product'"
    :submit-text="editingItem ? 'Update Product' : 'Add Product'"
    @close="closeModal"
    @submit="saveItem"
  >
    <form @submit.prevent="saveItem">
      <div class="flex flex-col sm:flex-row gap-6">
        <div class="flex-1 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input v-model="form.productName" type="text" required class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none" placeholder="e.g. 555 Tuna Caldereta" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="form.description" rows="4" class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none" placeholder="Short description..."></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Image Path</label>
            <input
              v-model="form.productImage"
              type="text"
              class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none"
              placeholder="/images/products/..."
            />
          </div>
        </div>
        <div class="flex flex-col items-center justify-center shrink-0">
          <div class="w-40 h-40 rounded-full border-2 border-dashed border-[#D3DDFF] flex flex-col items-center justify-center gap-2 hover:border-[#20437B]/50 hover:bg-[#D3DDFF]/20 transition-colors overflow-hidden">
            <img v-if="form.productImage" :src="form.productImage" alt="Product" class="w-full h-full object-cover">
            <template v-else>
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span class="text-sm text-gray-500">Paste an image path</span>
            </template>
          </div>
        </div>
      </div>
    </form>
  </AdminModal>
</template>

<script setup lang="ts">
import type { UpcomingStockItem } from '~/types/catalog'

const { upcomingStocks, addUpcomingStock, updateUpcomingStock, deleteUpcomingStock, nextUpcomingId, refresh } = useUpcomingStocksData()

const productColumns = [
  { key: 'image', label: 'Image', class: 'w-20' },
  { key: 'productName', label: 'Product Name' },
  { key: 'description', label: 'Description', class: 'max-w-[280px]' },
  { key: 'actions', label: 'Actions', class: 'text-right w-28' }
]

const searchQuery = ref('')
const showModal = ref(false)
const editingItem = ref<UpcomingStockItem | null>(null)
const viewingItem = ref<UpcomingStockItem | null>(null)

onMounted(() => {
  refresh()
})

const defaultForm = () => ({
  productName: '',
  description: '',
  productImage: ''
})

const form = ref(defaultForm())

function productName(item: UpcomingStockItem) {
  return item.productFlavor ? `${item.productBrand} ${item.productFlavor}` : item.productBrand
}

function openAdd() {
  editingItem.value = null
  form.value = defaultForm()
  showModal.value = true
}

function openView(item: UpcomingStockItem) {
  viewingItem.value = item
}

function closeViewModal() {
  viewingItem.value = null
}

function viewToEdit() {
  if (viewingItem.value) {
    openEdit(viewingItem.value)
    closeViewModal()
  }
}

function openEdit(item: UpcomingStockItem) {
  editingItem.value = item
  form.value = {
    productName: item.productFlavor ? `${item.productBrand} ${item.productFlavor}` : item.productBrand,
    description: item.description ?? '',
    productImage: item.productImage
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingItem.value = null
  form.value = defaultForm()
}

function saveItem() {
  const name = form.value.productName.trim()
  const image = form.value.productImage || ''
  const description = form.value.description?.trim() || undefined
  if (editingItem.value) {
    updateUpcomingStock(editingItem.value.id, {
      productBrand: name,
      productFlavor: '',
      productImage: image,
      description
    }).then(() => {
      refresh()
    }).catch((error) => {
      console.error('Failed to update coming soon product:', error)
      alert('Failed to update product. Please try again.')
    })
  } else {
    addUpcomingStock({
      headerBgClass: 'bg-emerald-800',
      productBrand: name,
      productFlavor: '',
      productImage: image,
      description,
      buttonText: 'Upcoming Stock',
      buttonPath: '/products'
    }).then(() => {
      refresh()
    }).catch((error) => {
      console.error('Failed to add coming soon product:', error)
      alert('Failed to add product. Please try again.')
    })
  }
  closeModal()
}

function confirmDelete(item: UpcomingStockItem) {
  if (!import.meta.client) return
  const name = productName(item)
  if (confirm(`Delete "${name}"? This will remove it from the list.`)) {
    deleteUpcomingStock(item.id).then(() => {
      refresh()
    }).catch((error) => {
      console.error('Failed to delete coming soon product:', error)
      alert('Failed to delete product. Please try again.')
    })
  }
}

const productCountLabel = computed(() => {
  const n = upcomingStocks.value.length
  return n >= 100 ? '100+' : String(n)
})

const filteredItems = computed(() => {
  const list = [...upcomingStocks.value]
  const q = searchQuery.value?.trim().toLowerCase()
  if (!q) return list
  return list.filter(
    (p) =>
      p.productBrand.toLowerCase().includes(q) ||
      p.productFlavor.toLowerCase().includes(q) ||
      (p.description?.toLowerCase().includes(q))
  )
})

useHead({ title: "Coming Soon Products | Admin | Kathie's Kitchen" })
</script>

