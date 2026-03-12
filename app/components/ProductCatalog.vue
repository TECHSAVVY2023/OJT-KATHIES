<template>
  <div class="pc-root">

    <!-- ══ PAGE HEADER ══ -->
    <div class="pc-page-header">
      <div class="pc-page-header__inner">
        <h1 class="pc-page-header__title">Product Catalog</h1>
        <div class="pc-page-header__meta">
          <span class="pc-meta-chip pc-meta-chip--ghost">
            <span class="pc-meta-chip__dot" />
            {{ products.length }} Products
          </span>
          <span class="pc-meta-chip pc-meta-chip--solid">{{ categoryCards.length }} Categories</span>
        </div>
      </div>
    </div>

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
        <div class="pc-search-wrap">
          <div class="pc-search" :class="{ 'pc-search--active': searchFocused }">
            <span class="pc-search__icon">
              <svg viewBox="0 0 20 20" fill="none" class="w-4 h-4">
                <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="1.8"/>
                <path d="M13.5 13.5L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search products, brands, categories…"
              class="pc-search__input"
              @focus="searchFocused = true"
              @blur="searchFocused = false"
            />
            <transition name="fade-pill">
              <span v-if="searchQuery" class="pc-search__result-badge">
                {{ filteredProducts.length }} found
              </span>
            </transition>
            <button v-if="searchQuery" type="button" class="pc-search__clear" @click="searchQuery = ''" aria-label="Clear search">
              <svg viewBox="0 0 14 14" fill="none" class="w-3 h-3">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <!-- reset chip -->
          <div v-if="selectedCategories.length > 0" class="pc-toolbar-actions">
            <span class="pc-results-count">
              <strong>{{ filteredProducts.length }}</strong> result{{ filteredProducts.length !== 1 ? 's' : '' }}
            </span>
            <button type="button" class="pc-reset-btn" @click="clearAllFilters">
              <svg viewBox="0 0 14 14" fill="none" class="w-3 h-3">
                <path d="M2 7a5 5 0 1 0 1.5-3.5L2 2v3h3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Reset
            </button>
          </div>
        </div>

        <!-- ── CATEGORY BROWSER ── -->
        <div v-if="selectedCategories.length === 0" class="pc-catbrowse">
          <div class="pc-catbrowse__header">
            <div class="pc-catbrowse__line" />
            <span class="pc-catbrowse__label">Browse by Category</span>
            <div class="pc-catbrowse__line pc-catbrowse__line--fade" />
          </div>
          <div class="pc-catgrid">
            <button
              v-for="cat in categoryCards"
              :key="cat.name"
              type="button"
              class="pc-catcard"
              :class="selectedCategories.includes(cat.name) ? 'pc-catcard--active' : ''"
              @click="toggleCategory(cat.name)"
            >
              <span class="pc-catcard__img-wrap">
                <img v-if="cat.image" :src="cat.image" :alt="cat.name" class="pc-catcard__img" />
                <span v-else class="pc-catcard__icon [&_svg]:w-4 [&_svg]:h-4">
                  <CategoryIcon :name="cat.name" />
                </span>
              </span>
              <span class="pc-catcard__name">{{ cat.name }}</span>
              <span v-if="selectedCategories.includes(cat.name)" class="pc-catcard__check">
                <svg viewBox="0 0 10 10" fill="none" class="w-2.5 h-2.5">
                  <path d="M1.5 5l2.5 2.5L8.5 2.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <!-- ── PRODUCT GRID ── -->
        <div class="pc-grid">
          <ProductCard v-for="p in paginatedProducts" :key="p.id" :product="p" />
        </div>

        <p v-if="products.length === 0" class="pc-empty">No products loaded.</p>
        <p v-else-if="filteredProducts.length === 0" class="pc-empty">No products match your filters.</p>

        <!-- ── PAGINATION ── -->
        <div v-if="totalPages > 1" class="pc-pagination">
          <NuxtLink
            v-if="currentPage < totalPages"
            :to="paginationLink(currentPage + 1)"
            class="pc-page-link"
          >Next Page →</NuxtLink>
          <NuxtLink
            v-else-if="currentPage > 1"
            :to="paginationLink(currentPage - 1)"
            class="pc-page-link"
          >← Previous</NuxtLink>
          <span v-else />
          <div class="pc-page-controls">
            <button
              type="button"
              class="pc-page-btn"
              :disabled="currentPage <= 1"
              aria-label="Previous page"
              @click="currentPage = Math.max(1, currentPage - 1)"
            >←</button>
            <span class="pc-page-info">{{ currentPage }} / {{ totalPages }}</span>
            <button
              type="button"
              class="pc-page-btn"
              :disabled="currentPage >= totalPages"
              aria-label="Next page"
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
            >→</button>
          </div>
        </div>

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
const searchFocused = ref(false)

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

/* ══ PAGE HEADER ══ */
.pc-page-header {
  padding: 48px 40px 36px;
  border-bottom: 1px solid #e8eaf0;
  background: linear-gradient(180deg, #ffffff 0%, #f6f7f9 100%);
  position: relative;
  overflow: hidden;
}
.pc-page-header::before {
  content: '';
  position: absolute;
  top: -80px; right: -80px;
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(14,98,198,0.05) 0%, transparent 70%);
  pointer-events: none;
}
.pc-page-header__inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}
.pc-page-header__eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.pc-eyebrow-line {
  width: 24px; height: 1px;
  background: #1e4f8c;
  flex-shrink: 0;
}
.pc-eyebrow-line--fade {
  width: 48px;
  background: linear-gradient(to right, rgba(30,79,140,0.4), transparent);
}
.pc-eyebrow-text {
  font-family: 'Syne', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #1e4f8c;
}
.pc-page-header__title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 800;
  color: #1e4f8c;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0;
}
.pc-page-header__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.pc-meta-chip {
  font-family: 'Syne', sans-serif;
  font-size: 11px;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 999px;
  letter-spacing: 0.03em;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.pc-meta-chip--ghost {
  background: #fff;
  border: 1.5px solid #e2e8f0;
  color: #475569;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.pc-meta-chip--solid {
  background: #1e4f8c;
  color: #fff;
  box-shadow: 0 4px 14px rgba(30,79,140,0.25);
}
.pc-meta-chip__dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 2px rgba(16,185,129,0.2);
  flex-shrink: 0;
  animation: pulse-dot 2s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 2px rgba(16,185,129,0.2); }
  50% { box-shadow: 0 0 0 4px rgba(16,185,129,0.15); }
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

/* ══ SEARCH ══ */
.pc-search-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  position: sticky;
  top: 88px;
  z-index: 20;
}
.pc-search {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.2s ease;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(15,23,42,0.05);
}
.pc-search--active {
  border-color: #1e4f8c;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(30,79,140,0.08), 0 4px 16px rgba(30,79,140,0.08);
}
.pc-search__icon {
  position: absolute;
  left: 14px;
  color: #94a3b8;
  pointer-events: none;
  display: flex;
  transition: color 0.15s ease;
}
.pc-search--active .pc-search__icon { color: #1e4f8c; }
.pc-search__input {
  width: 100%;
  padding: 12px 100px 12px 42px;
  font-size: 0.84rem;
  font-weight: 500;
  color: #0f172a;
  background: transparent;
  border: none;
  outline: none;
  appearance: none;
  font-family: 'Instrument Sans', sans-serif;
}
.pc-search__input::placeholder { color: #94a3b8; font-weight: 400; }
.pc-search__input::-webkit-search-cancel-button { display: none; }
.pc-search__result-badge {
  position: absolute;
  right: 44px;
  font-size: 10px;
  font-weight: 700;
  color: #0f172a;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  padding: 2px 9px;
  white-space: nowrap;
  pointer-events: none;
  font-family: 'Syne', sans-serif;
  letter-spacing: 0.04em;
}
.pc-search__clear {
  position: absolute;
  right: 10px;
  width: 28px; height: 28px;
  border-radius: 8px;
  border: 1.5px solid #e2e8f0;
  background: #f8fafc;
  color: #64748b;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.13s ease;
}
.pc-search__clear:hover { background: #1e4f8c; color: #fff; border-color: #1e4f8c; }

.pc-toolbar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.pc-results-count {
  font-size: 11px;
  color: #64748b;
  white-space: nowrap;
  font-family: 'Instrument Sans', sans-serif;
}
.pc-results-count strong { color: #0f172a; font-weight: 700; }
.pc-reset-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  padding: 7px 13px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  font-family: 'Instrument Sans', sans-serif;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}
.pc-reset-btn:hover { background: #1e4f8c; color: #fff; border-color: #1e4f8c; }

.fade-pill-enter-active, .fade-pill-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.fade-pill-enter-from, .fade-pill-leave-to { opacity: 0; transform: scale(0.85); }

/* ══ CATEGORY BROWSER ══ */
.pc-catbrowse { margin-bottom: 32px; }
.pc-catbrowse__header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}
.pc-catbrowse__line {
  flex-shrink: 0;
  width: 28px; height: 1px;
  background: #1e4f8c;
}
.pc-catbrowse__line--fade {
  flex: 1;
  background: linear-gradient(to right, rgba(30,79,140,0.2), transparent);
}
.pc-catbrowse__label {
  font-family: 'Syne', sans-serif;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #64748b;
  white-space: nowrap;
}

/* ── Category Grid ── */
.pc-catgrid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}
@media (min-width: 640px)  { .pc-catgrid { grid-template-columns: repeat(6, minmax(0, 1fr)); } }
@media (min-width: 1024px) { .pc-catgrid { grid-template-columns: repeat(8, minmax(0, 1fr)); } }

.pc-catcard {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  padding: 14px 8px 12px;
  border-radius: 16px;
  border: 1.5px solid #e8eaf0;
  background: #fff;
  color: #475569;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
  min-width: 0;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.pc-catcard::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  opacity: 0;
  transition: opacity 0.2s ease;
  border-radius: 15px;
}
.pc-catcard:hover::after { opacity: 1; }
.pc-catcard:hover {
  border-color: #1e4f8c;
  color: #1e4f8c;
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(30,79,140,0.12);
}
.pc-catcard--active {
  background: #1e4f8c;
  border-color: #1e4f8c;
  color: #fff;
  box-shadow: 0 8px 24px rgba(30,79,140,0.25);
  transform: translateY(-2px);
}
.pc-catcard--active::after { display: none; }
.pc-catcard--active:hover { background: #1a4479; }

.pc-catcard__img-wrap {
  position: relative;
  z-index: 1;
  width: 40px; height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: #f1f5f9;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  border: 1.5px solid #e2e8f0;
  transition: all 0.2s ease;
}
.pc-catcard:hover .pc-catcard__img-wrap { border-color: #cbd5e1; }
.pc-catcard--active .pc-catcard__img-wrap { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.2); }
.pc-catcard__img { width: 100%; height: 100%; object-fit: cover; }
.pc-catcard__icon { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; color: #64748b; }
.pc-catcard--active .pc-catcard__icon { color: #fff; }
.pc-catcard__name { position: relative; z-index: 1; line-height: 1.2; text-align: center; word-break: break-word; }
.pc-catcard__check {
  position: relative; z-index: 1;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: rgba(255,255,255,0.18);
  display: flex; align-items: center; justify-content: center;
  color: #fff; flex-shrink: 0;
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

/* ══ PAGINATION ══ */
.pc-pagination {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.pc-page-link {
  font-family: 'Syne', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #1e4f8c;
  text-decoration: none;
  transition: opacity 0.15s ease;
}
.pc-page-link:hover { opacity: 0.65; }
.pc-page-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}
.pc-page-btn {
  width: 38px; height: 38px;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  background: #fff;
  color: #475569;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: 'Instrument Sans', sans-serif;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}
.pc-page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.pc-page-btn:not(:disabled):hover { background: #1e4f8c; color: #fff; border-color: #1e4f8c; }
.pc-page-info {
  font-family: 'Syne', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #94a3b8;
  min-width: 3.5rem;
  text-align: center;
}

@media (max-width: 1023px) {
  .pc-layout { padding: 24px 20px 0; }
  .pc-page-header { padding: 32px 20px 24px; }
  .pc-filter-col, .pc-filter-spacer { display: none; }
}
</style>