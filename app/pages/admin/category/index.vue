<template>
  <div class="space-y-6">
    <!-- Header: Category title + Add Category button -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 class="text-2xl sm:text-3xl font-bold text-[#20437B]">Category</h1>
      <button
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#20437B] text-white font-medium hover:opacity-90 transition-opacity shrink-0"
        @click="openAdd"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        Add Category
      </button>
    </div>

    <!-- Category grid: white cards with image + label (display only) -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="cat in filteredCategories"
        :key="cat.id"
        class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="w-14 h-14 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
          <img v-if="cat.image" :src="cat.image" :alt="cat.name" class="w-full h-full object-cover" @error="(e) => (e.currentTarget!.style.display = 'none')">
          <span v-else class="text-gray-400 text-xs">No img</span>
        </div>
        <span class="font-medium text-gray-900 text-sm truncate flex-1 min-w-0">{{ cat.name }}</span>
      </div>
    </div>

    <!-- Search -->
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

    <!-- Category table: detailed list with actions -->
    <div class="bg-white rounded-xl shadow-sm border border-[#D3DDFF] overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-[#D3DDFF]/50 text-[#20437B] font-semibold text-left">
              <th class="px-4 py-3">Category</th>
              <th class="px-4 py-3">Created Date</th>
              <th class="px-4 py-3">Order</th>
              <th class="px-4 py-3 text-right w-24">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="cat in filteredCategories"
              :key="cat.id"
              class="border-t border-[#D3DDFF]/60 hover:bg-[#D3DDFF]/20 transition-colors"
            >
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                    <img v-if="cat.image" :src="cat.image" :alt="cat.name" class="w-full h-full object-cover" @error="(e) => (e.currentTarget!.style.display = 'none')">
                    <span v-else class="text-gray-400 text-xs">—</span>
                  </div>
                  <span class="font-medium text-[#20437B]">{{ cat.name }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-gray-600">{{ cat.createdAt || '—' }}</td>
              <td class="px-4 py-3 text-gray-600">{{ cat.order ?? '—' }}</td>
              <td class="px-4 py-3 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button type="button" class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" aria-label="Edit" @click="openEdit(cat)">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button type="button" class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" aria-label="Delete" @click="confirmDelete(cat)">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="filteredCategories.length === 0" class="text-center text-gray-500 py-8">No categories match your search.</p>
    </div>

    <!-- Add / Edit modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeModal">
        <div class="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-[#D3DDFF]">
            <h2 class="text-lg font-bold text-[#20437B]">{{ editingItem ? 'Edit Category' : 'Add Category' }}</h2>
          </div>
          <form class="p-6 space-y-4" @submit.prevent="saveItem">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
              <input v-model="form.name" type="text" required class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none" placeholder="e.g. Instant Noodles" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input v-model="form.image" type="text" class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none" placeholder="/images/categories/..." />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Path</label>
              <input v-model="form.path" type="text" class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none" placeholder="/categories/instant-noodles" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
                <input v-model="form.createdAt" type="text" class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none" placeholder="01-01-2025" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Order</label>
                <input v-model.number="form.order" type="number" min="0" class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none" placeholder="25" />
              </div>
            </div>
            <div class="flex justify-end gap-2 pt-4">
              <button type="button" class="px-4 py-2 rounded-lg border border-[#D3DDFF] text-[#20437B] hover:bg-[#D3DDFF]/50" @click="closeModal">Cancel</button>
              <button type="submit" class="px-4 py-2 rounded-lg bg-[#20437B] text-white font-medium hover:opacity-90">{{ editingItem ? 'Update' : 'Add' }} Category</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { CategoryItem } from '~/types/catalog'

definePageMeta({ layout: 'admin' })

const { categories, addCategory, updateCategory, deleteCategory, nextCategoryId } = useCategoriesData()

const searchQuery = ref('')
const showModal = ref(false)
const editingItem = ref<CategoryItem | null>(null)

const defaultForm = (): Partial<CategoryItem> & { name: string; image: string; path: string } => ({
  name: '',
  image: '',
  path: '',
  createdAt: '01-01-2025',
  order: 0
})

const form = ref(defaultForm())

function openAdd() {
  editingItem.value = null
  form.value = defaultForm()
  showModal.value = true
}

function openEdit(item: CategoryItem) {
  editingItem.value = item
  form.value = {
    name: item.name,
    image: item.image,
    path: item.path,
    createdAt: item.createdAt ?? '',
    order: item.order ?? 0
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingItem.value = null
  form.value = defaultForm()
}

function saveItem() {
  const name = form.value.name!.trim()
  const image = form.value.image || ''
  const path = form.value.path?.trim() || `/categories/${name.toLowerCase().replace(/\s+/g, '-')}`
  const createdAt = form.value.createdAt || undefined
  const order = form.value.order ?? 0
  if (editingItem.value) {
    updateCategory(editingItem.value.id, { name, image, path, createdAt, order })
  } else {
    addCategory({ name, image, path, createdAt, order })
  }
  closeModal()
}

function confirmDelete(item: CategoryItem) {
  if (!import.meta.client) return
  if (confirm(`Delete category "${item.name}"? This will remove it from the list.`)) {
    deleteCategory(item.id)
  }
}

const filteredCategories = computed(() => {
  let list = [...categories.value]
  const q = searchQuery.value?.trim().toLowerCase()
  if (q) list = list.filter((c) => c.name.toLowerCase().includes(q))
  return list.sort((a, b) => (b.order ?? 0) - (a.order ?? 0))
})

useHead({ title: "Category | Admin | Kathie's Kitchen" })
</script>
