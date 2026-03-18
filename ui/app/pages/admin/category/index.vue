<template>
  <div class="space-y-6">
    <!-- Header: Category title + Add Category button -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 class="text-2xl sm:text-3xl font-bold text-[#20437B]">Category</h1>
      <button
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#20437B] text-white font-medium hover:opacity-90 transition-opacity shrink-0"
        @click="openAdd"
        :disabled="isLoading"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        Add Category
      </button>
    </div>

    <!-- Error message -->
    <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
      <p class="font-medium">Error loading categories</p>
      <p class="text-sm">{{ error }}</p>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#20437B]"></div>
      <span class="ml-2 text-gray-600">Loading categories...</span>
    </div>

    <!-- Category grid: white cards with image + label (display only) -->
    <CategoryGrid v-if="!isLoading && !error" :categories="filteredCategories" />

    <CategoryTable
      v-if="!isLoading && !error"
      :categories="filteredCategories"
      v-model:searchQuery="searchQuery"
      @edit="openEdit"
      @delete="confirmDelete"
    />
    <!-- Add / Edit modal -->
    <CategoryModal
      v-model:show="showModal"
      :editing-item="editingItem"
      :initial-data="form"
      @save="saveItem"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import CategoryGrid from '~/components/admin/CategoryGrid.vue'
import CategoryTable from '~/components/admin/CategoryTable.vue'
import CategoryModal from '~/components/admin/CategoryModal.vue'
import { useAdminCategories } from '~/composables/useAdminCategories'

definePageMeta({ layout: 'admin' })

const {
  searchQuery,
  showModal,
  editingItem,
  form,
  filteredCategories,
  openAdd,
  openEdit,
  closeModal,
  saveItem,
  confirmDelete,
  isLoading,
  error
} = useAdminCategories()
</script>
