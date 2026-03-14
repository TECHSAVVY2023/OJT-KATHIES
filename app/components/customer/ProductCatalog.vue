<template>
  <div class="pc-root">

    <!-- ══ PAGE HEADER ══ -->
    <CatalogPageHeader 
      title="Product Catalog"
      :products-count="products.length"
      :categories-count="categoryCards.length"
    />

    <!-- ══ LAYOUT ══ -->
    <div class="pc-layout">

      <!-- ── STICKY FILTER SIDEBAR ── -->
      <div
        v-if="selectedCategories.length > 0"
        class="pc-filter-col"
        ref="filterSpacerRef"
      >
        <div ref="filterInnerRef" :style="filterStyle">
          <ProductFilter
            :filterCategories="filterCategories"
            v-model:selectedCategories="selectedCategories"
            v-model:selectedPriceMax="selectedPriceMax"
            :priceRanges="priceRanges"
          />
        </div>
      </div>

      <!-- ── MAIN ── -->
      <main class="pc-main">

        <!-- ── SEARCH BAR ── -->
        <SearchBar 
          v-model:search-query="searchQuery"
          :filtered-products="filteredProducts"
          :show-reset-button="selectedCategories.length > 0"
          @clear-filters="clearAllFilters"
        />

        <!-- ── CATEGORY BROWSER ── -->
        <CategoryBrowser 
          v-if="selectedCategories.length === 0"
          :category-cards="categoryCards"
          :selected-categories="selectedCategories"
          @toggle-category="toggleCategory"
        />

        <!-- ── PRODUCT GRID ── -->
        <div class="pc-grid">
          <ProductCard v-for="p in paginatedProducts" :key="p.id" :product="p" />
        </div>

        <p v-if="products.length === 0" class="pc-empty">No products loaded.</p>
        <p v-else-if="filteredProducts.length === 0" class="pc-empty">No products match your filters.</p>

        <!-- ── PAGINATION ── -->
        <PaginationControls 
          v-model:current-page="currentPage"
          :total-pages="totalPages"
          :pagination-link="paginationLink"
        />

      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { products } = useProductData()
const { categories } = useCategoriesData()
const { priceRanges } = useCatalogData()
const route = useRoute()

const searchQuery = ref('')
const selectedCategories = ref<string[]>([])
const selectedPriceMax = ref<number | null>(null)
const currentPage = ref(1)
const PAGE_SIZE = 12

// ── Sticky Filter ──────────────────────────────────────────────
const filterSpacerRef = ref<HTMLElement | null>(null)
const filterInnerRef  = ref<HTMLElement | null>(null)
const filterStyle     = ref<Record<string, string>>({})

const NAV_H  = 96   // height of your fixed navbar
const GAP    = 20   // gap below navbar and above footer

function updateFilterPos() {
  const spacer = filterSpacerRef.value
  const inner  = filterInnerRef.value
  if (!spacer || !inner) return

  const scrollY   = window.scrollY
  const filterH   = inner.offsetHeight
  const spacerTop = spacer.getBoundingClientRect().top + scrollY
  const spacerH   = spacer.offsetHeight

  // Footer boundary — stop before footer
  const footer    = document.querySelector('footer') as HTMLElement | null
  const footerTop = footer
    ? footer.getBoundingClientRect().top + scrollY
    : document.documentElement.scrollHeight

  const fixedTop  = NAV_H + GAP                        // how far from top of viewport
  const stopAt    = footerTop - GAP - filterH           // absolute Y where filter must stop

  if (scrollY + fixedTop <= spacerTop) {
    // Haven't scrolled past the filter's natural start yet — sit at top
    filterStyle.value = { position: 'absolute', top: '0px', left: '0px', width: '256px' }
  } else if (scrollY + fixedTop >= stopAt) {
    // Would pass footer — pin just above it (absolute inside spacer)
    const pinnedTop = stopAt - spacerTop
    filterStyle.value = { position: 'absolute', top: `${Math.max(0, pinnedTop)}px`, left: '0px', width: '256px' }
  } else {
    // Fixed to viewport — this is the "sticky" state
    const leftPx = spacer.getBoundingClientRect().left
    filterStyle.value = {
      position: 'fixed',
      top:      `${fixedTop}px`,
      left:     `${leftPx}px`,
      width:    '256px',
      zIndex:   '40',
    }
  }
}

onMounted(() => {
  const cat = route.query.category as string
  if (cat) selectedCategories.value = [decodeURIComponent(cat)]
  window.addEventListener('scroll', updateFilterPos, { passive: true })
  window.addEventListener('resize', updateFilterPos, { passive: true })
  nextTick(updateFilterPos)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateFilterPos)
  window.removeEventListener('resize', updateFilterPos)
})

watch(selectedCategories, () => nextTick(updateFilterPos))
// ──────────────────────────────────────────────────────────────

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
    if (selectedPriceMax.value != null) list = list.filter(p => p.price <= selectedPriceMax.value!)
  }
  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / PAGE_SIZE)))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredProducts.value.slice(start, start + PAGE_SIZE)
})

watch([selectedCategories, selectedPriceMax, searchQuery], () => {
  currentPage.value = 1
})

function toggleCategory(cat: string) {
  selectedCategories.value = selectedCategories.value.includes(cat)
    ? selectedCategories.value.filter(c => c !== cat)
    : [...selectedCategories.value, cat]
}

function clearAllFilters() {
  selectedCategories.value = []
  selectedPriceMax.value = null
  searchQuery.value = ''
  currentPage.value = 1
}

function paginationLink(page: number) {
  return { path: '/products', query: { ...route.query, page: String(page) } }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

/* ══ ROOT ══ */
.pc-root {
  font-family: 'Instrument Sans', sans-serif;
  background: #f6f7f9;
  min-height: 100vh;
  color: #0f172a;
  padding: 0 0 80px;
}

/* ══ LAYOUT ══ */
.pc-layout {
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 40px 0;
  display: flex;
  gap: 28px;
  align-items: flex-start;
}

.pc-filter-col {
  flex-shrink: 0;
  width: 256px;
  position: relative;   /* positioning context for absolute children */
  align-self: stretch;  /* fills full column height so stopAt calc works */
}
.pc-main {
  flex: 1;
  min-width: 0;
}

/* ══ PRODUCT GRID ══ */
.pc-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  padding-bottom: 8px;
}
@media (min-width: 640px) { .pc-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (min-width: 1024px) { .pc-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }

.pc-empty {
  text-align: center;
  color: #94a3b8;
  padding: 64px 0;
  font-size: 0.9rem;
  font-family: 'Instrument Sans', sans-serif;
}

@media (max-width: 1023px) {
  .pc-layout { padding: 24px 20px 0; }
  .pc-filter-col, .pc-filter-spacer { display: none; }
}
</style>