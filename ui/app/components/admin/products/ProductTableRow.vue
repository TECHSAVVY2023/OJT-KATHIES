<template>
  <tr class="border-t border-[#D3DDFF]/60 hover:bg-[#D3DDFF]/20 transition-colors">
    <!-- Product Image -->
    <td class="px-4 py-3">
      <AdminProductImage :src="product.imageUrl" :alt="product.name" mode="display" />
    </td>
    
    <!-- Product Name -->
    <td class="px-4 py-3 font-medium text-[#20437B]">
      {{ product.name }}
    </td>
    
    <!-- Description -->
    <td class="px-4 py-3 text-gray-600 max-w-[200px] truncate" :title="product.description">
      {{ product.description || '–' }}
    </td>
    
    <!-- Category -->
    <td class="px-4 py-3 text-gray-600">
      {{ product.category }}
    </td>
    
    <!-- Price -->
    <td class="px-4 py-3 font-medium">
      {{ product.currency }}{{ product.price }}
    </td>
    
    <!-- Quantity -->
    <td class="px-4 py-3">
      {{ product.stockCount ?? product.defaultQuantity ?? 0 }}
    </td>
    
    <!-- Status -->
    <td class="px-4 py-3">
      <span
        class="inline-block px-2.5 py-1 rounded-full text-xs font-medium"
        :class="product.inStock ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'"
      >
        {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
      </span>
    </td>
    
    <!-- Actions -->
    <td class="px-4 py-3 text-right">
      <div class="flex items-center justify-end gap-1">
        <button 
          type="button" 
          class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" 
          aria-label="View" 
          @click="$emit('view', product)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
        <button 
          type="button" 
          class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" 
          aria-label="Edit" 
          @click="$emit('edit', product)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button 
          type="button" 
          class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
          aria-label="Delete" 
          @click="$emit('delete', product)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { ProductItem } from '~/types/catalog'

interface Props {
  product: ProductItem
}

defineProps<Props>()

defineEmits<{
  view: [product: ProductItem]
  edit: [product: ProductItem]
  delete: [product: ProductItem]
}>()
</script>
