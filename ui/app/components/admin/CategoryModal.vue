<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="close">
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-[#D3DDFF]">
          <h2 class="text-lg font-bold text-[#20437B]">{{ editingItem ? 'Edit Category' : 'Add Category' }}</h2>
        </div>
        <form class="p-6 space-y-4" @submit.prevent="onSave">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
            <input v-model="localForm.name" type="text" required class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none" placeholder="e.g. Instant Noodles" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input v-model="localForm.image" type="text" class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none" placeholder="/images/categories/..." />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Path</label>
            <input v-model="localForm.path" type="text" class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none" placeholder="/categories/instant-noodles" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
              <input v-model="localForm.createdAt" type="text" class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none" placeholder="01-01-2025" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <input v-model.number="localForm.order" type="number" min="0" class="w-full px-3 py-2 border border-[#D3DDFF] rounded-lg focus:ring-2 focus:ring-[#20437B]/30 outline-none" placeholder="25" />
            </div>
          </div>
          <div class="flex justify-end gap-2 pt-4">
            <button type="button" class="px-4 py-2 rounded-lg border border-[#D3DDFF] text-[#20437B] hover:bg-[#D3DDFF]/50" @click="close">Cancel</button>
            <button type="submit" class="px-4 py-2 rounded-lg bg-[#20437B] text-white font-medium hover:opacity-90">{{ editingItem ? 'Update' : 'Add' }} Category</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { CategoryItem } from '~/types/catalog'

const props = defineProps<{
  show: boolean
  editingItem: CategoryItem | null
  initialData: Partial<CategoryItem> & { name: string; image: string; path: string }
}>()

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'save', payload: CategoryForm): void
}>()

type CategoryForm = Partial<CategoryItem> & { name: string; image: string; path: string }

const localForm = ref<CategoryForm>({ ...props.initialData })

watch(
  () => props.initialData,
  (next) => {
    localForm.value = { ...next }
  },
  { deep: true }
)

function close() {
  emit('close')
}

function onSave() {
  emit('save', localForm.value)
}
</script>
