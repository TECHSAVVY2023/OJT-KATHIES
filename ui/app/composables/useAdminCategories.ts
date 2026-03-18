import { computed, ref, onMounted } from 'vue'
import type { CategoryItem } from '~/types/catalog'

export function useAdminCategories() {
  const config = useRuntimeConfig()
  const categories = ref<CategoryItem[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

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

  function mapApiCategory(api: any): CategoryItem {
    const name = api.category_name || ''
    const image = api.category_image || ''
    const slug = name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'category'
    const createdAt = api.created_at ? new Date(api.created_at).toLocaleDateString() : undefined

    return {
      id: String(api.id),
      name,
      image,
      path: `/categories/${slug}`,
      order: 0,
      createdAt,
    }
  }

  async function loadCategories() {
    isLoading.value = true
    error.value = null
    try {
      const apiData = await $fetch(`${config.public.apiBase}/categories/`, {
        method: 'GET',
        cache: 'no-store',
      })

      const mappedCategories = Array.isArray(apiData) ? apiData.map(mapApiCategory) : []
      categories.value = mappedCategories
      console.log('Categories loaded:', mappedCategories.length)
    } catch (err) {
      console.error('loadCategories error', err)
      error.value = (err as Error)?.message || 'Unable to load categories'
      categories.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function addCategory(item: { name: string; image: string }) {
    try {
      const created = await $fetch(`${config.public.apiBase}/categories/`, {
        method: 'POST',
        body: {
          category_name: item.name,
          category_image: item.image,
        },
        cache: 'no-store',
      })

      console.log('Category added successfully:', created)

      // Add the new category directly to the array for immediate UI update
      if (created) {
        const newCategory = mapApiCategory(created)
        categories.value.push(newCategory)
        console.log('New category added to list:', newCategory)
      } else {
        // Fallback: reload all categories if response doesn't contain the new category
        await loadCategories()
      }
    } catch (err) {
      console.error('addCategory error', err)
      throw err
    }
  }

  async function updateCategory(id: string, patch: { name?: string; image?: string }) {
    try {
      const body: any = {}
      if (patch.name !== undefined) body.category_name = patch.name
      if (patch.image !== undefined) body.category_image = patch.image

      const updated = await $fetch(`${config.public.apiBase}/categories/${id}/`, {
        method: 'PUT',
        body,
        cache: 'no-store',
      })

      console.log('Category updated successfully:', updated)

      // Update the category directly in the array for immediate UI update (optimistic)
      if (updated) {
        const updatedCategory = mapApiCategory(updated)
        const index = categories.value.findIndex(cat => cat.id === id)
        if (index !== -1) {
          categories.value[index] = updatedCategory
          console.log('Category updated in list:', updatedCategory)
        }
      } else {
        // Fallback: reload all categories
        await loadCategories()
      }
    } catch (err) {
      console.error('updateCategory error', err)
      throw err
    }
  }

  async function deleteCategory(id: string) {
    try {
      await $fetch(`${config.public.apiBase}/categories/${id}/`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      console.log('Category deleted successfully')

      // Remove the category directly from the array for immediate UI update
      const index = categories.value.findIndex(cat => cat.id === id)
      if (index !== -1) {
        categories.value.splice(index, 1)
        console.log('Category removed from list')
      } else {
        // Fallback: reload all categories
        await loadCategories()
      }
    } catch (err) {
      console.error('deleteCategory error', err)
      throw err
    }
  }

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

  async function saveItem(formValue: typeof form.value) {
    const name = formValue.name!.trim()
    const image = formValue.image || ''

    try {
      if (editingItem.value) {
        await updateCategory(editingItem.value.id, { name, image })
      } else {
        await addCategory({ name, image })
      }

      closeModal()
    } catch (err) {
      console.error('saveItem error', err)
      // Don't close modal on error, let user try again
      alert('Failed to save category. Please try again.')
    }
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

  if (import.meta.client) {
    onMounted(() => {
      loadCategories()
    })
  }

  return {
    categories: readonly(categories),
    isLoading: readonly(isLoading),
    error: readonly(error),
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
  }
}
