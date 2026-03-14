import type { CategoryItem } from '~/types/catalog'
import categoriesJson from '~/data/categories.json'

/** Birahon ang data gikan sa categories.json – whatever you put in that JSON gets to the frontend */
export function useCategoriesData() {
  const categories = shallowRef<CategoryItem[]>(JSON.parse(JSON.stringify(categoriesJson)) as CategoryItem[])

  function addCategory(item: Omit<CategoryItem, 'id'>) {
    const id = nextCategoryId(item.name)
    categories.value = [...categories.value, { ...item, id }]
  }

  function updateCategory(id: string, patch: Partial<CategoryItem>) {
    categories.value = categories.value.map((c) =>
      c.id === id ? { ...c, ...patch } : c
    )
  }

  function deleteCategory(id: string) {
    categories.value = categories.value.filter((c) => c.id !== id)
  }

  function nextCategoryId(name: string) {
    const slug = name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'category'
    let id = `cat-${slug}`
    let n = 1
    while (categories.value.some((c) => c.id === id)) {
      id = `cat-${slug}-${++n}`
    }
    return id
  }

  return {
    categories: readonly(categories),
    addCategory,
    updateCategory,
    deleteCategory,
    nextCategoryId
  }
}
