<template>
  <div class="space-y-6">
    <!-- Header: title + subtitle + action buttons -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-[#20437B]">Coming Soon Products</h1>
        <p class="text-gray-600 mt-1">
          You have <strong class="text-orange-500">{{ productCountLabel }}</strong> Products Today
        </p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#20437B] text-white font-medium hover:opacity-90 transition-opacity"
          @click="openAdd"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          Add Product
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:opacity-90 transition-opacity"
          @click="onImport"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          Import Product
        </button>
      </div>
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

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm border border-[#D3DDFF] overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-[#D3DDFF]/50 text-[#20437B] font-semibold text-left">
              <th class="px-4 py-3 w-20">Image</th>
              <th class="px-4 py-3">Product Name</th>
              <th class="px-4 py-3 max-w-[280px]">Description</th>
              <th class="px-4 py-3 text-right w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in filteredItems"
              :key="item.id"
              class="border-t border-[#D3DDFF]/60 hover:bg-[#D3DDFF]/20 transition-colors"
            >
              <td class="px-4 py-3">
                <div class="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    v-if="item.productImage"
                    :src="item.productImage"
                    :alt="item.productBrand + ' ' + item.productFlavor"
                    class="w-full h-full object-contain"
                    @error="(e) => (e.currentTarget!.style.display = 'none')"
                  >
                  <span v-else class="text-gray-400 text-xs">No img</span>
                </div>
              </td>
              <td class="px-4 py-3 font-medium text-[#20437B]">
                {{ item.productBrand }} {{ item.productFlavor }}
              </td>
              <td class="px-4 py-3 text-gray-600 max-w-[280px] truncate" :title="item.description || productName(item)">
                {{ item.description || productName(item) }}
              </td>
              <td class="px-4 py-3 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button type="button" class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" aria-label="View" @click="openView(item)">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </button>
                  <button type="button" class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" aria-label="Edit" @click="openEdit(item)">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button type="button" class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" aria-label="Delete" @click="confirmDelete(item)">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="filteredItems.length === 0" class="text-center text-gray-500 py-8">No coming soon products match your search.</p>
    </div>

    <!-- View modal (same layout as Edit, read-only) -->
    <Teleport to="body">
      <div v-if="viewingItem" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeViewModal">
        <div class="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-[#D3DDFF] flex items-center justify-between">
            <h2 class="text-lg font-bold text-[#20437B]">View Coming Soon Product</h2>
            <button type="button" class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" aria-label="Close" @click="closeViewModal">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div class="p-6">
            <div class="flex flex-col sm:flex-row gap-6">
              <div class="flex-1 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <p class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg bg-gray-50/80 text-gray-900">{{ productName(viewingItem) }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <p class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg bg-gray-50/80 text-gray-900 whitespace-pre-wrap min-h-[4rem]">{{ viewingItem.description || productName(viewingItem) || '–' }}</p>
                </div>
              </div>
              <div class="flex flex-col items-center justify-center shrink-0">
                <div class="w-40 h-40 rounded-full border-2 border-dashed border-[#D3DDFF] flex flex-col items-center justify-center overflow-hidden bg-gray-50/50">
                  <img v-if="viewingItem.productImage" :src="viewingItem.productImage" :alt="productName(viewingItem)" class="w-full h-full object-cover">
                  <template v-else>
                    <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span class="text-sm text-gray-500">No image</span>
                  </template>
                </div>
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

    <!-- Add / Edit modal: only Image, Product name, Description -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeModal">
        <div class="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-[#D3DDFF]">
            <h2 class="text-lg font-bold text-[#20437B]">{{ editingItem ? 'Edit Coming Soon Product' : 'Add Coming Soon Product' }}</h2>
          </div>
          <form class="p-6" @submit.prevent="saveItem">
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
              </div>
              <div class="flex flex-col items-center justify-center shrink-0">
                <label class="cursor-pointer block">
                  <input ref="imageInputRef" type="file" accept="image/*" class="hidden" @change="onImageSelect">
                  <div class="w-40 h-40 rounded-full border-2 border-dashed border-[#D3DDFF] flex flex-col items-center justify-center gap-2 hover:border-[#20437B]/50 hover:bg-[#D3DDFF]/20 transition-colors overflow-hidden">
                    <img v-if="form.productImage" :src="form.productImage" alt="Product" class="w-full h-full object-cover">
                    <template v-else>
                      <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span class="text-sm text-gray-500">Upload Image</span>
                    </template>
                  </div>
                </label>
              </div>
            </div>
            <div class="flex justify-end gap-2 pt-6 mt-6 border-t border-[#D3DDFF]">
              <button type="button" class="px-4 py-2 rounded-lg border border-[#D3DDFF] text-[#20437B] hover:bg-[#D3DDFF]/50" @click="closeModal">Cancel</button>
              <button type="submit" class="px-4 py-2 rounded-lg bg-[#20437B] text-white font-medium hover:opacity-90">{{ editingItem ? 'Update' : 'Add' }} Product</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { UpcomingStockItem } from '~/types/catalog'

definePageMeta({ layout: 'admin' })

const { upcomingStocks, addUpcomingStock, updateUpcomingStock, deleteUpcomingStock, nextUpcomingId } = useUpcomingStocksData()

const searchQuery = ref('')
const showModal = ref(false)
const editingItem = ref<UpcomingStockItem | null>(null)
const viewingItem = ref<UpcomingStockItem | null>(null)

const defaultForm = () => ({
  productName: '',
  description: '',
  productImage: ''
})

const form = ref(defaultForm())
const imageInputRef = ref<HTMLInputElement | null>(null)

function onImageSelect(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !file.type.startsWith('image/')) return
  const reader = new FileReader()
  reader.onload = () => {
    form.value.productImage = reader.result as string
  }
  reader.readAsDataURL(file)
  input.value = ''
}

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
    })
  }
  closeModal()
}

function confirmDelete(item: UpcomingStockItem) {
  if (!import.meta.client) return
  const name = productName(item)
  if (confirm(`Delete "${name}"? This will remove it from the list.`)) {
    deleteUpcomingStock(item.id)
  }
}

function onImport() {
  if (!import.meta.client) return
  alert('Import Product: upload a file to bulk add coming soon products. (Not implemented in this demo.)')
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
