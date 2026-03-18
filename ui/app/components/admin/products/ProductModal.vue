<template>
  <Teleport to="body">
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="$emit('close')">
      <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-[#D3DDFF] flex items-center justify-between">
          <h2 class="text-lg font-bold text-[#20437B]">{{ isEditing ? 'Edit Product' : 'Add Product' }}</h2>
          <button type="button" class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" aria-label="Close" @click="$emit('close')">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form class="p-6" @submit.prevent="handleSubmit">
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
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Image Path</label>
                <input
                  v-model="form.imageUrl"
                  type="text"
                  class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none"
                  placeholder="/images/products/..."
                />
              </div>
            </div>
            <!-- Right: Preview Image (circular) -->
            <div class="flex flex-col items-center justify-center shrink-0">
              <AdminProductImage 
                :src="form.imageUrl" 
                :alt="form.name" 
                mode="circular-display"
              />
              <p class="text-xs text-gray-400 mt-2 text-center">Paste an image path (like Category)</p>
            </div>
          </div>
          <div class="flex justify-end gap-2 pt-6 mt-6 border-t border-[#D3DDFF]">
            <button type="button" class="px-4 py-2 rounded-lg border border-[#D3DDFF] text-[#20437B] hover:bg-[#D3DDFF]/50" @click="$emit('close')">Cancel</button>
            <button type="submit" class="px-4 py-2 rounded-lg bg-[#20437B] text-white font-medium hover:opacity-90">{{ isEditing ? 'Update Product' : 'Create Product' }}</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { ProductItem } from '~/types/catalog'
import type { CategoryItem } from '~/types/catalog'

interface Props {
  isVisible: boolean
  isEditing: boolean
  editingProduct: ProductItem | null
  categories: readonly CategoryItem[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  save: [product: Partial<ProductItem>]
}>()

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

// Initialize form when editing product changes
watch(() => props.editingProduct, (product) => {
  if (product) {
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
  } else {
    form.value = defaultForm()
  }
}, { immediate: true })

function handleSubmit() {
  emit('save', form.value)
}
</script>
