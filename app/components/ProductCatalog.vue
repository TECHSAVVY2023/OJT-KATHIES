<template>
  <div class="catalog-root w-full py-8 flex flex-col lg:flex-row gap-8 px-6 lg:px-12 relative">

    <!-- ══ FILTER SIDEBAR ══ -->
    <aside
      v-if="selectedCategories.length > 0"
      ref="filterSidebar"
      class="filter-sidebar w-full shrink-0 lg:shrink-0 rounded-2xl border border-[#0F76D3]/15 bg-white shadow-lg shadow-[#083D6D]/8 transition-[width] lg:w-52 xl:w-56 lg:fixed lg:top-36 lg:z-40"
      :class="filterOpen ? '' : 'lg:w-14'"
      :style="Object.keys(sidebarStyle).length > 0 ? sidebarStyle : filterStyle"
    >
      <!-- Toggle -->
      <button
        type="button"
        class="w-full flex items-center justify-between gap-2 px-4 py-3.5 text-left rounded-t-2xl border-b border-[#EDF3FF] bg-[#EDF3FF] text-[#083D6D] hover:bg-[#dce8f9] transition-colors min-h-[2.75rem]"
        :aria-label="filterOpen ? 'Hide filters' : 'Show filters'"
        @click="filterOpen = !filterOpen"
      >
        <h2 class="font-bold text-[#083D6D] text-xs tracking-widest uppercase truncate" :class="{ 'lg:hidden': !filterOpen }">Filters</h2>
        <span class="text-[#0F76D3] text-xs shrink-0 transition-transform duration-200" :class="filterOpen ? 'rotate-180' : 'lg:mx-auto'">▼</span>
      </button>

      <div v-show="filterOpen" class="p-4 space-y-4 bg-white overflow-y-auto rounded-b-2xl" :style="filterContentStyle" @scroll="updateGradientPosition" style="-ms-overflow-style: none; scrollbar-width: none;" >

        <!-- Gradient Scroll Indicator -->
        <div 
          class="gradient-indicator" 
          :style="gradientStyle"
          v-if="showGradientIndicator"
        ></div>

        <!-- Applied -->
        <div class="space-y-2">
          <p class="text-[10px] text-[#7A95B0] font-semibold uppercase tracking-widest">Applied</p>
          <div class="flex flex-wrap gap-1.5 items-center">
            <span
              v-for="cat in selectedCategories"
              :key="cat"
              class="inline-flex items-center gap-1 bg-[#083D6D] text-white text-[10px] px-2.5 py-1 rounded-full font-medium"
            >
              {{ cat }}
              <button type="button" aria-label="Remove filter" class="hover:opacity-70 transition-opacity leading-none" @click="toggleCategory(cat)">×</button>
            </span>
            <button
              type="button"
              class="text-[10px] text-[#0F76D3] hover:text-[#083D6D] font-semibold transition-colors"
              @click="clearCategoryFilters"
            >
              Clear all
            </button>
          </div>
        </div>

        <!-- Category -->
        <div>
          <h3 class="font-semibold text-[#083D6D] text-[10px] mb-2.5 uppercase tracking-widest">Category</h3>
          <div class="flex flex-col gap-1">
            <button
              v-for="cat in filterCategories"
              :key="cat"
              type="button"
              class="filter-pill"
              :class="selectedCategories.includes(cat) ? 'filter-pill--active' : 'filter-pill--inactive'"
              @click="toggleCategory(cat)"
            >
              <span
                class="filter-pill__icon"
                :class="selectedCategories.includes(cat) ? 'filter-pill__icon--active' : ''"
              >
                <span class="flex items-center justify-center [&_svg]:w-3 [&_svg]:h-3">
                  <CategoryIcon :name="cat" />
                </span>
              </span>
              <span class="filter-pill__label truncate">{{ cat }}</span>
              <span v-if="selectedCategories.includes(cat)" class="filter-pill__badge">✓</span>
            </button>
          </div>
        </div>

        <!-- Stock -->
        <div class="border-t border-[#EDF3FF] pt-3">
          <button
            type="button"
            class="w-full flex items-center justify-between font-semibold text-[#083D6D] text-[10px] mb-2.5 uppercase tracking-widest"
            @click="stockOpen = !stockOpen"
          >
            Stock Status
            <span class="text-[#0F76D3] text-xs transition-transform" :class="{ 'rotate-180': stockOpen }">▼</span>
          </button>
          <div v-show="stockOpen" class="flex flex-col gap-1">
            <button type="button" class="filter-pill" :class="stockIn ? 'filter-pill--active' : 'filter-pill--inactive'" @click="stockIn = !stockIn">
              <span class="filter-pill__dot" :class="stockIn ? 'filter-pill__dot--active' : ''">
                <svg v-if="stockIn" viewBox="0 0 10 10" fill="none" class="w-2.5 h-2.5">
                  <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="filter-pill__label">In Stock</span>
            </button>
            <button type="button" class="filter-pill" :class="stockOut ? 'filter-pill--active' : 'filter-pill--inactive'" @click="stockOut = !stockOut">
              <span class="filter-pill__dot" :class="stockOut ? 'filter-pill__dot--active' : ''">
                <svg v-if="stockOut" viewBox="0 0 10 10" fill="none" class="w-2.5 h-2.5">
                  <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="filter-pill__label">Out of Stock</span>
            </button>
          </div>
        </div>

        <!-- Custom (New/Sale) -->
        <div class="border-t border-[#EDF3FF] pt-3">
          <h3 class="font-semibold text-[#083D6D] text-[10px] mb-2.5 uppercase tracking-widest">{{ customFilterLabel }}</h3>
          <div class="flex flex-col gap-1">
            <button type="button" class="filter-pill" :class="newArrivalOnly ? 'filter-pill--active' : 'filter-pill--inactive'" @click="newArrivalOnly = !newArrivalOnly">
              <span class="filter-pill__dot" :class="newArrivalOnly ? 'filter-pill__dot--active' : ''">
                <svg v-if="newArrivalOnly" viewBox="0 0 10 10" fill="none" class="w-2.5 h-2.5">
                  <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="filter-pill__label">New Arrival</span>
              <span v-if="newArrivalOnly" class="ml-auto text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full tracking-wide">NEW</span>
            </button>
            <button type="button" class="filter-pill" :class="saleOnly ? 'filter-pill--active' : 'filter-pill--inactive'" @click="saleOnly = !saleOnly">
              <span class="filter-pill__dot" :class="saleOnly ? 'filter-pill__dot--active' : ''">
                <svg v-if="saleOnly" viewBox="0 0 10 10" fill="none" class="w-2.5 h-2.5">
                  <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="filter-pill__label">Sale</span>
              <span v-if="saleOnly" class="ml-auto text-[9px] font-bold bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded-full tracking-wide">SALE</span>
            </button>
          </div>
        </div>

        <!-- Price -->
        <div class="border-t border-[#EDF3FF] pt-3">
          <h3 class="font-semibold text-[#083D6D] text-[10px] mb-2.5 uppercase tracking-widest">Price</h3>
          <div class="flex flex-col gap-1">
            <button
              v-for="pr in priceRanges"
              :key="pr.label"
              type="button"
              class="filter-pill"
              :class="selectedPriceMax === pr.max ? 'filter-pill--active' : 'filter-pill--inactive'"
              @click="selectedPriceMax = selectedPriceMax === pr.max ? null : pr.max"
            >
              <span class="filter-pill__radio" :class="selectedPriceMax === pr.max ? 'filter-pill__radio--active' : ''">
                <span v-if="selectedPriceMax === pr.max" class="filter-pill__radio-dot" />
              </span>
              <span class="filter-pill__label">{{ pr.label }}</span>
            </button>
          </div>
        </div>

      </div>
    </aside>

    <!-- Spacer -->
    <div
      v-if="selectedCategories.length > 0"
      class="hidden lg:block shrink-0 transition-[width] lg:w-52 xl:w-56"
      :class="filterOpen ? '' : 'lg:w-14'"
    />

    <!-- ══ MAIN CONTENT ══ -->
    <main class="flex-1 min-w-0">

      <!-- Catalog Header Row -->
      <div class="flex items-end justify-between gap-4 flex-wrap mb-5 pb-5 border-b border-[#0F76D3]/10">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="w-5 h-0.5 bg-[#CE1126] inline-block rounded-full" />
            <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#CE1126]">Our Collection</p>
          </div>
          <h2 class="text-2xl font-bold text-[#083D6D] leading-tight">Product Catalog</h2>
        </div>
        <!-- Stats chips -->
        <div class="flex items-center gap-2">
          <span class="bg-white border border-[#0F76D3]/15 text-[#083D6D] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            {{ products.length }} Products
          </span>
          <span class="bg-[#083D6D] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            {{ categoryCards.length }} Categories
          </span>
        </div>
      </div>

      <!-- ══ STICKY TOOLBAR ══ -->
      <div class="sticky top-24 z-20 mb-6 -mx-1 px-1">
        <div class="bg-white/95 backdrop-blur-md border border-[#0F76D3]/12 rounded-2xl shadow-sm shadow-[#083D6D]/5 px-4 py-3 flex items-center gap-3">

          <!-- Search -->
          <div class="catalog-search flex-1">
            <span class="catalog-search__icon">
              <svg viewBox="0 0 18 18" fill="none" class="w-4 h-4">
                <circle cx="7.5" cy="7.5" r="5.2" stroke="currentColor" stroke-width="1.7"/>
                <path d="M12 12L16.5 16.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search products or categories…"
              class="catalog-search__input"
            >
            <transition name="fade-pill">
              <span v-if="searchQuery" class="catalog-search__count">
                {{ filteredProducts.length }} found
              </span>
            </transition>
            <button
              v-if="searchQuery"
              type="button"
              class="catalog-search__clear"
              aria-label="Clear search"
              @click="searchQuery = ''"
            >
              <svg viewBox="0 0 14 14" fill="none" class="w-3 h-3">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <!-- Result count + reset when filtered -->
          <div v-if="selectedCategories.length > 0" class="flex items-center gap-2 flex-shrink-0">
            <span class="text-xs text-[#4A6080]">
              <strong class="text-[#083D6D] font-bold">{{ filteredProducts.length }}</strong> result{{ filteredProducts.length !== 1 ? 's' : '' }}
            </span>
            <button
              type="button"
              class="text-[11px] font-semibold text-[#4A6080] bg-[#EDF3FF] border border-[#0F76D3]/20 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-[#083D6D] hover:text-white hover:border-[#083D6D] transition-colors whitespace-nowrap"
              @click="clearAllFilters"
            >
              Reset
            </button>
          </div>

        </div>
      </div>

      <!-- ══ CATEGORY PICKER ══ -->
      <div v-if="selectedCategories.length === 0" class="mb-6">
        <div class="flex items-center gap-2 mb-3">
          <svg viewBox="0 0 16 16" fill="none" class="w-3.5 h-3.5 text-[#0F76D3] shrink-0">
            <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9"/>
            <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5"/>
            <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.5"/>
            <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.25"/>
          </svg>
          <span class="text-[11px] font-bold uppercase tracking-widest text-[#083D6D]/60">Browse by Category</span>
        </div>
        <div class="catalog-cats-grid">
          <button
            v-for="cat in categoryCards"
            :key="cat.name"
            type="button"
            class="cat-card"
            :class="selectedCategories.includes(cat.name) ? 'cat-card--active' : ''"
            @click="toggleCategory(cat.name)"
          >
            <span class="cat-card__img-wrap">
              <img v-if="cat.image" :src="cat.image" :alt="cat.name" class="cat-card__img">
              <span v-else class="cat-card__icon [&_svg]:w-4 [&_svg]:h-4">
                <CategoryIcon :name="cat.name" />
              </span>
            </span>
            <span class="cat-card__name">{{ cat.name }}</span>
            <span v-if="selectedCategories.includes(cat.name)" class="cat-card__check">
              <svg viewBox="0 0 10 10" fill="none" class="w-3 h-3">
                <path d="M1.5 5l2.5 2.5L8.5 2.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>
        </div>
      </div>

      <!-- ══ PRODUCT GRID ══ -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 py-6 max-w-6xl mx-auto">
        <ProductCard v-for="p in paginatedProducts" :key="p.id" :product="p" />
      </div>

      <p v-if="products.length === 0" class="text-center text-[#7A95B0] py-12 text-sm">No products loaded.</p>
      <p v-else-if="filteredProducts.length === 0" class="text-center text-[#7A95B0] py-12 text-sm">No products match your filters.</p>

      <!-- ══ PAGINATION ══ -->
      <div v-if="totalPages > 1" class="mt-8 flex flex-wrap items-center justify-between gap-4">
        <NuxtLink
          v-if="currentPage < totalPages"
          :to="paginationLink(currentPage + 1)"
          class="text-[#0F76D3] font-semibold text-sm hover:text-[#083D6D] transition-colors"
        >
          Next Page →
        </NuxtLink>
        <NuxtLink
          v-else-if="currentPage > 1"
          :to="paginationLink(currentPage - 1)"
          class="text-[#0F76D3] font-semibold text-sm hover:text-[#083D6D] transition-colors"
        >
          ← Previous
        </NuxtLink>
        <span v-else />
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="w-9 h-9 rounded-xl border border-[#0F76D3]/20 bg-white text-[#083D6D] flex items-center justify-center text-sm font-medium disabled:opacity-40 hover:bg-[#EDF3FF] transition-colors"
            :disabled="currentPage <= 1"
            aria-label="Previous page"
            @click="currentPage = Math.max(1, currentPage - 1)"
          >
            ←
          </button>
          <span class="text-xs text-[#4A6080] font-medium min-w-[4rem] text-center">
            {{ currentPage }} of {{ totalPages }}
          </span>
          <button
            type="button"
            class="w-9 h-9 rounded-xl border border-[#0F76D3]/20 bg-white text-[#083D6D] flex items-center justify-center text-sm font-medium disabled:opacity-40 hover:bg-[#EDF3FF] transition-colors"
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

const gradientPosition = ref(50)
const showGradientIndicator = ref(false)

const filterSidebar = ref<HTMLElement | null>(null)
const filterHeight = ref(0)
const maxFilterHeight = ref('400px') // Fixed compact height
const sidebarStyle = ref({})
const isAtFooter = ref(false)

onMounted(() => {
  const cat = route.query.category as string
  if (cat) selectedCategories.value = [decodeURIComponent(cat)]
  updateFilterHeight()
  window.addEventListener('resize', updateFilterHeight)
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial check
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateFilterHeight)
  window.removeEventListener('scroll', handleScroll)
})

watch(filterOpen, () => {
  setTimeout(updateFilterHeight, 300)
})

function updateFilterHeight() {
  if (filterSidebar.value) {
    filterHeight.value = filterSidebar.value.offsetHeight
    maxFilterHeight.value = '400px' // Fixed compact height
    handleScroll() // Recalculate position
  }
}

function handleScroll() {
  if (!filterSidebar.value) return
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const sidebarHeight = filterSidebar.value.offsetHeight
  
  // Get the catalog root container boundaries
  const catalogRoot = document.querySelector('.catalog-root')
  if (!catalogRoot) return
  
  const catalogRect = catalogRoot.getBoundingClientRect()
  const catalogTop = catalogRect.top + scrollTop
  const catalogBottom = catalogRect.bottom + scrollTop
  
  // Detect navbar type and calculate appropriate offset
  const landingHeader = document.querySelector('[class*="fixed top-0"]')
  const navbarOffset = landingHeader ? 64 : 96 // LandingHeader = 64px, AppHeader = 96px
  
  // Calculate boundaries with navbar offset
  const topBoundary = catalogTop + navbarOffset + 20 // navbar + 20px margin
  const bottomBoundary = catalogBottom - sidebarHeight - 20 // 20px margin from bottom
  
  // Natural movement within boundaries - no fixed positioning
  if (scrollTop >= topBoundary && scrollTop <= bottomBoundary) {
    // Within boundaries - move naturally with scroll
    isAtFooter.value = false
    sidebarStyle.value = {
      position: 'absolute',
      top: `${scrollTop - catalogTop + navbarOffset + 20}px`, // Move with scroll but stay within bounds
      transition: 'none'
    }
  } else if (scrollTop > bottomBoundary) {
    // Past bottom boundary - stop at bottom
    isAtFooter.value = true
    sidebarStyle.value = {
      position: 'absolute',
      top: `${bottomBoundary - catalogTop}px`,
      transition: 'top 0.1s ease-out'
    }
  } else {
    // Above top boundary - stop at top with navbar offset
    isAtFooter.value = false
    sidebarStyle.value = {
      position: 'absolute',
      top: `${navbarOffset + 20}px`, // Stay below navbar
      transition: 'top 0.1s ease-out'
    }
  }
}

const filterStyle = computed(() => ({
  maxHeight: maxFilterHeight.value,
  overflowY: 'hidden' as const
}))

const filterContentStyle = computed(() => ({
  maxHeight: `calc(${maxFilterHeight.value} - 3.5rem)`,
  overflowY: 'auto' as const
}))

const categoryCards = computed(() => {
  const fromProducts = [...new Set(products.value.map(p => p.category))]
  const byName = new Map(categories.value.map(c => [c.name, { name: c.name, image: c.image }]))
  const fromCategories = categories.value.map(c => c.name)
  const allNames = [...new Set([...fromCategories, ...fromProducts])].sort()
  return allNames.map(name => ({ name, image: byName.get(name)?.image }))
})

const filterCategories = computed(() => {
  const fromProducts = [...new Set(products.value.map(p => p.category))]
  const fromCategories = categories.value.map(c => c.name)
  return [...new Set([...fromCategories, ...fromProducts])].sort()
})

const filteredProducts = computed(() => {
  let list = Array.isArray(products.value) ? [...products.value] : []
  const q = searchQuery.value.trim().toLowerCase()
  if (q) list = list.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.brand && p.brand.toLowerCase().includes(q))
  )
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

function updateGradientPosition(event: Event) {
  const target = event.target as HTMLElement
  const scrollTop = target.scrollTop
  const scrollHeight = target.scrollHeight
  const clientHeight = target.clientHeight
  
  // Calculate scroll percentage
  const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100
  gradientPosition.value = Math.max(0, Math.min(100, scrollPercentage))
  
  // Show indicator only if content is scrollable
  showGradientIndicator.value = scrollHeight > clientHeight
}

const gradientStyle = computed(() => ({
  position: 'absolute' as const,
  top: 0,
  right: '2px',
  width: '4px',
  height: '100%',
  background: `linear-gradient(
    180deg,
    transparent 0%,
    rgba(15, 118, 211, 0.2) ${Math.max(0, gradientPosition.value - 10)}%,
    rgba(15, 118, 211, 0.8) ${gradientPosition.value}%,
    rgba(15, 118, 211, 0.2) ${Math.min(100, gradientPosition.value + 10)}%,
    transparent 100%
  )`,
  borderRadius: '4px',
  pointerEvents: 'none' as const,
  transition: 'background 0.1s ease'
}))

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

.catalog-root, .catalog-root * {
  font-family: 'Poppins', sans-serif;
}

/* ════════ FILTER SIDEBAR ════════ */
.filter-sidebar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.filter-sidebar::-webkit-scrollbar { 
  display: none; 
}

.filter-sidebar .overflow-y-auto::-webkit-scrollbar {
  display: none;
}

.filter-sidebar.lg\:fixed {
  position: fixed;
  top: 9rem;
  margin-left: 0;
  z-index: 40;
  transition: width 0.3s ease;
}

/* ════════ FILTER PILLS ════════ */
.filter-pill {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 10px;
  border-radius: 10px;
  border: 1.5px solid transparent;
  font-size: 0.72rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
  outline: none;
}
.filter-pill--inactive {
  background: #EDF3FF;
  border-color: #c8dcf5;
  color: #4A6080;
}
.filter-pill--inactive:hover {
  background: #dce8f9;
  border-color: #0F76D3;
  color: #083D6D;
}
.filter-pill--active {
  background: #083D6D;
  border-color: #083D6D;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(8,61,109,0.22);
}
.filter-pill--active:hover {
  background: #0a4a82;
}

.filter-pill__icon {
  flex-shrink: 0;
  width: 20px; height: 20px;
  border-radius: 6px;
  background: #dce8f9;
  border: 1.5px solid #b8d0ec;
  display: flex; align-items: center; justify-content: center;
  color: #4A6080;
  transition: all 0.15s ease;
}
.filter-pill__icon--active {
  background: rgba(255,255,255,0.18);
  border-color: rgba(255,255,255,0.35);
  color: #fff;
}

.filter-pill__dot {
  flex-shrink: 0;
  width: 15px; height: 15px;
  border-radius: 4px;
  border: 1.5px solid #b8d0ec;
  background: #fff;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s ease;
  color: #fff;
}
.filter-pill__dot--active {
  background: rgba(255,255,255,0.22);
  border-color: rgba(255,255,255,0.45);
}

.filter-pill__radio {
  flex-shrink: 0;
  width: 15px; height: 15px;
  border-radius: 50%;
  border: 1.5px solid #b8d0ec;
  background: #fff;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s ease;
}
.filter-pill__radio--active {
  background: rgba(255,255,255,0.22);
  border-color: rgba(255,255,255,0.5);
}
.filter-pill__radio-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #fff;
  animation: dot-pop 0.18s cubic-bezier(0.34,1.56,0.64,1) forwards;
}
@keyframes dot-pop {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}
.filter-pill__label { flex: 1; line-height: 1.2; }
.filter-pill__badge { font-size: 9px; opacity: 0.7; margin-left: auto; }

/* ════════ SEARCH BAR ════════ */
.catalog-search {
  position: relative;
  display: flex;
  align-items: center;
  background: #EDF3FF;
  border: 1.5px solid #c8dcf5;
  border-radius: 12px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  overflow: hidden;
}
.catalog-search:focus-within {
  border-color: #0F76D3;
  box-shadow: 0 0 0 3px rgba(15,118,211,0.1);
  background: #fff;
}
.catalog-search__icon {
  position: absolute;
  left: 13px;
  color: #7A95B0;
  pointer-events: none;
  display: flex;
  transition: color 0.15s ease;
}
.catalog-search:focus-within .catalog-search__icon { color: #0F76D3; }
.catalog-search__input {
  width: 100%;
  padding: 10px 100px 10px 40px;
  font-size: 0.82rem;
  font-weight: 500;
  color: #083D6D;
  background: transparent;
  border: none;
  outline: none;
  appearance: none;
  font-family: 'Poppins', sans-serif;
}
.catalog-search__input::placeholder { color: #7A95B0; font-weight: 400; }
.catalog-search__input::-webkit-search-cancel-button { display: none; }
.catalog-search__count {
  position: absolute;
  right: 38px;
  font-size: 10px;
  font-weight: 700;
  color: #083D6D;
  background: #dce8f9;
  border: 1px solid #b8d0ec;
  border-radius: 20px;
  padding: 2px 8px;
  white-space: nowrap;
  pointer-events: none;
  font-family: 'Poppins', sans-serif;
}
.catalog-search__clear {
  position: absolute;
  right: 9px;
  width: 24px; height: 24px;
  border-radius: 7px;
  border: none;
  background: #c8dcf5;
  color: #4A6080;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background 0.13s ease, color 0.13s ease;
}
.catalog-search__clear:hover { background: #083D6D; color: #fff; }

.fade-pill-enter-active, .fade-pill-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.fade-pill-enter-from, .fade-pill-leave-to { opacity: 0; transform: scale(0.8); }

/* ════════ CATEGORY GRID ════════ */
.catalog-cats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}
@media (min-width: 640px)  { .catalog-cats-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); } }
@media (min-width: 1024px) { .catalog-cats-grid { grid-template-columns: repeat(8, minmax(0, 1fr)); } }

.cat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px 6px;
  border-radius: 14px;
  border: 1.5px solid #c8dcf5;
  background: #fff;
  color: #4A6080;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  min-width: 0;
  font-family: 'Poppins', sans-serif;
}
.cat-card:hover {
  border-color: #0F76D3;
  background: #EDF3FF;
  color: #083D6D;
  box-shadow: 0 3px 12px rgba(8,61,109,0.1);
  transform: translateY(-1px);
}
.cat-card--active {
  background: #083D6D;
  border-color: #083D6D;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(8,61,109,0.25);
}
.cat-card--active:hover {
  background: #0a4a82;
  transform: translateY(-1px);
}
.cat-card__img-wrap {
  width: 34px; height: 34px;
  border-radius: 50%;
  overflow: hidden;
  background: #EDF3FF;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  border: 1.5px solid rgba(0,0,0,0.05);
}
.cat-card--active .cat-card__img-wrap { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.12); }
.cat-card__img { width: 100%; height: 100%; object-fit: cover; }
.cat-card__icon { display: flex; align-items: center; justify-content: center; color: #0F76D3; }
.cat-card--active .cat-card__icon { color: #fff; }
.cat-card__name { line-height: 1.1; text-align: center; word-break: break-word; }
.cat-card__check {
  width: 18px; height: 18px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center;
  color: #fff; flex-shrink: 0;
}
</style>