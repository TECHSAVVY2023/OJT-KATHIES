<template>
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
          <ProductTableRow
            v-for="product in products"
            :key="product.id"
            :product="product"
            @view="$emit('view', $event)"
            @edit="$emit('edit', $event)"
            @delete="$emit('delete', $event)"
          />
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-items="totalItems"
      :range-start="rangeStart"
      :range-end="rangeEnd"
      @page-change="$emit('page-change', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { ProductItem } from '~/types/catalog'

interface Props {
  products: ProductItem[]
  currentPage: number
  totalPages: number
  totalItems: number
  rangeStart: number
  rangeEnd: number
}

defineProps<Props>()

defineEmits<{
  view: [product: ProductItem]
  edit: [product: ProductItem]
  delete: [product: ProductItem]
  'page-change': [page: number]
}>()
</script>
