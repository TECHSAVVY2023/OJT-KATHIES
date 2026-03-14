<template>
  <Teleport to="body">
    <div v-if="product" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="$emit('close')">
      <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-[#D3DDFF] flex items-center justify-between">
          <h2 class="text-lg font-bold text-[#20437B]">View Product</h2>
          <button type="button" class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" aria-label="Close" @click="$emit('close')">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="p-6">
          <div class="flex flex-col sm:flex-row gap-6">
            <!-- Left: read-only fields (same layout as Edit) -->
            <div class="flex-1 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <p class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg bg-gray-50/80 text-gray-900">{{ product.name }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg bg-gray-50/80 text-gray-900 whitespace-pre-wrap min-h-[4.5rem]">{{ product.description || '–' }}</p>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <p class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg bg-gray-50/80 text-gray-900">{{ product.category || '–' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <p class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg bg-gray-50/80 text-gray-900">{{ product.stockCount ?? product.defaultQuantity ?? 0 }}</p>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                <div class="flex items-center gap-2">
                  <span class="text-gray-500 text-sm">{{ product.currency }}</span>
                  <p class="flex-1 px-3 py-2 border border-[#D3DDFF] rounded-lg bg-gray-50/80 text-gray-900">{{ product.price }}</p>
                </div>
              </div>
            </div>
            <!-- Right: Image (circular, read-only) -->
            <div class="flex flex-col items-center justify-center shrink-0">
              <AdminProductImage 
                :src="product.imageUrl" 
                :alt="product.name" 
                mode="circular-display"
              />
              <p class="text-xs text-gray-400 mt-2 text-center">or paste URL in edit</p>
            </div>
          </div>
          <div class="flex justify-end gap-2 pt-6 mt-6 border-t border-[#D3DDFF]">
            <button type="button" class="px-4 py-2 rounded-lg border border-[#D3DDFF] text-[#20437B] hover:bg-[#D3DDFF]/50" @click="$emit('close')">Close</button>
            <button type="button" class="px-4 py-2 rounded-lg bg-[#20437B] text-white font-medium hover:opacity-90" @click="$emit('edit', product)">Edit Product</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { ProductItem } from '~/types/catalog'

interface Props {
  product: ProductItem | null
}

defineProps<Props>()

defineEmits<{
  close: []
  edit: [product: ProductItem]
}>()
</script>
