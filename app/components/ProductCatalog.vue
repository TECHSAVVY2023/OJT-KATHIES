<template>
  <div class="w-full py-8 flex flex-col lg:flex-row gap-8 pl-6 pr-6 lg:pl-12 lg:pr-12">
    <!-- Sidebar filters: only visible after user selects a category; sticky when shown -->
    <aside
      v-if="selectedCategories.length > 0"
      class="filter-sidebar w-full shrink-0 lg:shrink-0 rounded-xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/40 transition-[width] lg:w-48 xl:w-52 lg:self-start lg:sticky lg:top-20 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto"
      :class="filterOpen ? '' : 'lg:w-14'"
    >
      <button
        type="button"
        class="w-full flex items-center justify-between gap-2 px-3 py-3 text-left lg:rounded-t-xl border-b border-slate-100 bg-gradient-to-r from-slate-50 to-slate-100/80 text-slate-800 hover:from-slate-100 hover:to-slate-200/80 transition-colors min-h-[2.75rem]"
        :aria-label="filterOpen ? 'Hide filters' : 'Show filters'"
        @click="filterOpen = !filterOpen"
      >
        <h2 class="font-bold text-[#1e3a5f] text-sm truncate" :class="{ 'lg:hidden': !filterOpen }">Filters</h2>
        <span class="text-slate-500 text-sm shrink-0" :class="filterOpen ? 'rotate-180' : 'lg:mx-auto'">▼</span>
      </button>
      <div v-show="filterOpen" class="p-3 space-y-3 bg-white">
        <div class="space-y-1.5">
          <p class="text-xs text-slate-500 font-medium uppercase tracking-wide">Applied</p>
          <div class="flex flex-wrap gap-1.5 items-center">
            <span
              v-for="cat in selectedCategories"
              :key="cat"
              class="inline-flex items-center gap-1 bg-slate-800 text-white text-xs px-2.5 py-1 rounded-md font-medium"
            >
              {{ cat }}
              <button type="button" aria-label="Remove filter" class="hover:opacity-80 transition-opacity" @click="toggleCategory(cat)">×</button>
            </span>
            <button
              type="button"
              class="text-xs text-slate-500 hover:text-slate-700 font-medium transition-colors"
              @click="clearCategoryFilters"
            >
              Clear all
            </button>
          </div>
        </div>
        <div>
          <h3 class="font-semibold text-slate-700 text-xs mb-2 uppercase tracking-wide">Category</h3>
          <div class="flex flex-col gap-1.5">
            <button
              v-for="cat in filterCategories"
              :key="cat"
              type="button"
              class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs font-medium transition-all border"
              :class="selectedCategories.includes(cat)
                ? 'bg-[#1e3a5f] text-white border-[#1e3a5f] shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'"
              @click="toggleCategory(cat)"
            >
              <span class="flex-shrink-0 w-4 h-4 flex items-center justify-center [&_svg]:w-3.5 [&_svg]:h-3.5" :class="selectedCategories.includes(cat) ? 'text-white' : 'text-slate-500'">
                <CategoryIcon :name="cat" />
              </span>
              <span class="truncate">{{ cat }}</span>
            </button>
          </div>
        </div>
        <div class="border-t border-slate-100 pt-3">
          <button
            type="button"
            class="w-full flex items-center justify-between font-semibold text-slate-700 text-xs mb-2 uppercase tracking-wide"
            @click="stockOpen = !stockOpen"
          >
            Stock Status
            <span class="text-slate-400 transition-transform" :class="{ 'rotate-180': stockOpen }">▼</span>
          </button>
          <div v-show="stockOpen" class="space-y-2 pl-0.5">
            <label class="flex items-center gap-2.5 cursor-pointer text-sm text-slate-700 py-1 rounded-md px-2 -mx-2 hover:bg-slate-50 transition-colors">
              <input v-model="stockIn" type="checkbox" class="rounded border-slate-300 w-4 h-4 text-[#1e3a5f] focus:ring-[#1e3a5f]/30">
              <span>In Stock</span>
            </label>
            <label class="flex items-center gap-2.5 cursor-pointer text-sm text-slate-700 py-1 rounded-md px-2 -mx-2 hover:bg-slate-50 transition-colors">
              <input v-model="stockOut" type="checkbox" class="rounded border-slate-300 w-4 h-4 text-[#1e3a5f] focus:ring-[#1e3a5f]/30">
              <span>Out of Stock</span>
            </label>
          </div>
        </div>
        <div class="border-t border-slate-100 pt-3">
          <h3 class="font-semibold text-slate-700 text-xs mb-2 uppercase tracking-wide">{{ customFilterLabel }}</h3>
          <div class="space-y-2">
            <label class="flex items-center gap-2.5 cursor-pointer text-sm text-slate-700 py-1 rounded-md px-2 -mx-2 hover:bg-slate-50 transition-colors">
              <input v-model="newArrivalOnly" type="checkbox" class="rounded border-slate-300 w-4 h-4 text-[#1e3a5f] focus:ring-[#1e3a5f]/30">
              <span>New Arrival</span>
            </label>
            <label class="flex items-center gap-2.5 cursor-pointer text-sm text-slate-700 py-1 rounded-md px-2 -mx-2 hover:bg-slate-50 transition-colors">
              <input v-model="saleOnly" type="checkbox" class="rounded border-slate-300 w-4 h-4 text-[#1e3a5f] focus:ring-[#1e3a5f]/30">
              <span>Sale</span>
            </label>
          </div>
        </div>
        <div class="border-t border-slate-100 pt-3">
          <h3 class="font-semibold text-slate-700 text-xs mb-2 uppercase tracking-wide">Price</h3>
          <div class="space-y-2">
            <label
              v-for="pr in priceRanges"
              :key="pr.label"
              class="flex items-center gap-2.5 cursor-pointer text-sm text-slate-700 py-1.5 rounded-md px-2 -mx-2 hover:bg-slate-50 transition-colors"
            >
              <input v-model="selectedPriceMax" type="radio" :value="pr.max" name="priceRange" class="border-slate-300 w-4 h-4 text-[#1e3a5f] focus:ring-[#1e3a5f]/30">
              <span>{{ pr.label }}</span>
            </label>
          </div>
        </div>
      </div>
    </aside>

    <main class="flex-1 min-w-0">
      <div class="sticky top-16 z-20 -mt-1 pt-1 pb-4 -mx-1 px-1 bg-gray-50/95 backdrop-blur-sm mb-2">
        <h2 class="text-2xl font-bold text-slate-700 mb-1">Product Catalog</h2>
        <p class="text-gray-600 text-sm mb-4">Browse all our tasty finds. Choose a category to filter, or search.</p>

        <div class="flex items-center gap-2 mb-4">
        <div class="flex-1 relative">
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search categories or product"
            class="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#083D6D] focus:border-[#083D6D] outline-none"
          >
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">🔍</span>
          <button
            v-if="searchQuery"
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 w-6 h-6 flex items-center justify-center"
            aria-label="Clear search"
            @click="searchQuery = ''"
          >
            ×
          </button>
        </div>
      </div>

      <!-- Category cards: only visible when no category selected (filter hidden) -->
      <div
        v-if="selectedCategories.length === 0"
        class="rounded-xl border border-gray-200 bg-white shadow-sm p-4 mb-6"
      >
        <h3 class="text-xl font-semibold text-gray-700 mb-3 text-center">Categories</h3>
        <div class="flex flex-nowrap gap-3 overflow-x-auto pb-2 justify-center">
          <button
            v-for="cat in categoryCards"
            :key="cat.name"
            type="button"
            class="flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 min-w-[112px] flex-1 max-w-[140px] transition-all text-left shrink-0"
            :class="selectedCategories.includes(cat.name)
              ? 'border-[#083D6D] bg-[#083D6D]/10 text-[#1e3a5f]'
              : 'border-gray-200 bg-gray-50/80 text-gray-700 hover:border-[#083D6D]/50 hover:bg-[#E0EDFF]/50'"
            @click="toggleCategory(cat.name)"
          >
            <span v-if="cat.image" class="w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-white flex items-center justify-center">
              <img :src="cat.image" :alt="cat.name" class="w-full h-full object-cover">
            </span>
            <span v-else class="w-8 h-8 rounded-lg bg-[#E0EDFF] flex items-center justify-center shrink-0 [&_svg]:w-4 [&_svg]:h-4">
              <CategoryIcon :name="cat.name" />
            </span>
            <span class="font-medium text-xs truncate min-w-0">{{ cat.name }}</span>
          </button>
        </div>
      </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 py-8 px-2 max-w-6xl mx-auto">
        <ProductCard v-for="p in paginatedProducts" :key="p.id" :product="p" />
      </div>

      <p v-if="products.length === 0" class="text-center text-gray-500 py-12">No products loaded. Check that <code class="bg-gray-100 px-1">app/data/product.json</code> exists and is valid.</p>
      <p v-else-if="filteredProducts.length === 0" class="text-center text-gray-500 py-12">No products match your filters.</p>

      <!-- Pagination: "Next Page →" on left, "1 of 55" with arrows on right -->
      <div v-if="totalPages > 1" class="mt-8 flex flex-wrap items-center justify-between gap-4">
        <NuxtLink
          v-if="currentPage < totalPages"
          :to="paginationLink(currentPage + 1)"
          class="text-[#083D6D] font-medium hover:underline"
        >
          Next Page →
        </NuxtLink>
        <NuxtLink
          v-else-if="currentPage > 1"
          :to="paginationLink(currentPage - 1)"
          class="text-[#083D6D] font-medium hover:underline"
        >
          ← Previous
        </NuxtLink>
        <span v-else />
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="w-9 h-9 rounded border border-gray-300 flex items-center justify-center disabled:opacity-50 hover:bg-gray-50"
            :disabled="currentPage <= 1"
            aria-label="Previous page"
            @click="currentPage = Math.max(1, currentPage - 1)"
          >
            ←
          </button>
          <span class="text-sm text-gray-600 min-w-[4rem] text-center">
            {{ currentPage }} of {{ totalPages }}
          </span>
          <button
            type="button"
            class="w-9 h-9 rounded border border-gray-300 flex items-center justify-center disabled:opacity-50 hover:bg-gray-50"
            :disabled="currentPage >= totalPages"
            aria-label="Next page"
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
          >
            →
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { products } = useProductData()
const { categories } = useCategoriesData()
const { customFilterLabel, priceRanges } = useCatalogData()
const route = useRoute()

// State
const searchQuery = ref('')
const selectedCategories = ref<string[]>([])
const newArrivalOnly = ref(false)
const saleOnly = ref(false)
const stockIn = ref(true)
const stockOut = ref(false)
const stockOpen = ref(true)
const selectedPriceMax = ref<number | null>(null)
const filterOpen = ref(true)
const currentPage = ref(1)
const PAGE_SIZE = 12

// Init from URL
onMounted(() => {
  const cat = route.query.category as string
  if (cat) selectedCategories.value = [decodeURIComponent(cat)]
})

// Category cards: dynamic from products + categories.json (name + image)
const categoryCards = computed(() => {
  const fromProducts = [...new Set(products.value.map(p => p.category))]
  const byName = new Map(categories.value.map(c => [c.name, { name: c.name, image: c.image }]))
  const fromCategories = categories.value.map(c => c.name)
  const allNames = [...new Set([...fromCategories, ...fromProducts])].sort()
  return allNames.map(name => ({
    name,
    image: byName.get(name)?.image
  }))
})

// Sidebar category list (same sources, for filter checkboxes)
const filterCategories = computed(() => {
  const fromProducts = [...new Set(products.value.map(p => p.category))]
  const fromCategories = categories.value.map(c => c.name)
  return [...new Set([...fromCategories, ...fromProducts])].sort()
})

const appliedFiltersCount = computed(() => {
  return selectedCategories.value.length + (newArrivalOnly.value ? 1 : 0) + (saleOnly.value ? 1 : 0) +
    (stockIn.value && !stockOut.value ? 1 : 0) + (stockOut.value && !stockIn.value ? 1 : 0) +
    (selectedPriceMax.value != null ? 1 : 0)
})

// Filtered list: when no category selected, only search applies; when category selected, sidebar filters apply too
const filteredProducts = computed(() => {
  const source = products.value
  let list = Array.isArray(source) ? [...source] : []
  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.brand && p.brand.toLowerCase().includes(q))
    )
  }
  if (selectedCategories.value.length) {
    list = list.filter(p => selectedCategories.value.includes(p.category))
    if (newArrivalOnly.value) list = list.filter(p => p.isNew)
    if (saleOnly.value) list = list.filter(p => p.isSale === true)
    if (stockIn.value && !stockOut.value) list = list.filter(p => p.inStock)
    if (stockOut.value && !stockIn.value) list = list.filter(p => !p.inStock)
    if (!stockIn.value && !stockOut.value) list = []
    if (selectedPriceMax.value != null) list = list.filter(p => p.price <= selectedPriceMax.value!)
  }
  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / PAGE_SIZE)))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredProducts.value.slice(start, start + PAGE_SIZE)
})

watch([selectedCategories, newArrivalOnly, saleOnly, stockIn, stockOut, selectedPriceMax, searchQuery], () => {
  currentPage.value = 1
})

function toggleCategory(cat: string) {
  if (selectedCategories.value.includes(cat)) {
    selectedCategories.value = selectedCategories.value.filter(c => c !== cat)
  } else {
    selectedCategories.value = [...selectedCategories.value, cat]
  }
}

function clearCategoryFilters() {
  selectedCategories.value = []
  currentPage.value = 1
}

function clearAllFilters() {
  selectedCategories.value = []
  newArrivalOnly.value = false
  saleOnly.value = false
  stockIn.value = true
  stockOut.value = false
  selectedPriceMax.value = null
  searchQuery.value = ''
  currentPage.value = 1
}

function paginationLink(page: number) {
  const q = { ...route.query, page: String(page) }
  return { path: '/products', query: q }
}
</script>

<style scoped>
/* Hide scrollbar in filter sidebar – scrolling still works via mouse/trackpad */
.filter-sidebar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.filter-sidebar::-webkit-scrollbar {
  display: none;
}
</style>
