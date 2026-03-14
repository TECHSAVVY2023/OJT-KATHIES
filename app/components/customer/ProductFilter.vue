<template>
  <aside class="pf-root">

    <!-- ── HEADER ── -->
    <div class="pf-header">
      <span class="pf-header__left">
        <span class="pf-header__icon">
          <svg viewBox="0 0 18 18" fill="none" class="w-3.5 h-3.5">
            <path d="M2 4h14M5 9h8M8 14h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </span>
        <span class="pf-header__title">Filters</span>
        <span v-if="activeCount > 0" class="pf-header__badge">{{ activeCount }}</span>
      </span>
    </div>

    <!-- ── BODY ── -->
    <div class="pf-body">

      <!-- Active filter chips -->
      <div v-if="selectedCategories.length > 0" class="pf-section">
        <p class="pf-label">Active</p>
        <div class="pf-chips">
          <span v-for="cat in selectedCategories" :key="cat" class="pf-chip">
            <span class="pf-chip__text">{{ cat }}</span>
            <button type="button" class="pf-chip__remove" @click="toggleCategory(cat)" :aria-label="`Remove ${cat}`">
              <svg viewBox="0 0 10 10" fill="none" class="w-2 h-2">
                <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </button>
          </span>
          <button type="button" class="pf-clearall" @click="clearAll">Clear all</button>
        </div>
      </div>

      <div v-if="selectedCategories.length > 0" class="pf-rule" />

      <!-- Categories -->
      <div class="pf-section">
        <p class="pf-label">Category</p>
        <div class="pf-pills">
          <button
            v-for="cat in filterCategories"
            :key="cat"
            type="button"
            class="pf-pill"
            :class="selectedCategories.includes(cat) ? 'pf-pill--on' : 'pf-pill--off'"
            @click="toggleCategory(cat)"
          >
            <span class="pf-pill__icon" :class="selectedCategories.includes(cat) ? 'pf-pill__icon--on' : ''">
              <span class="flex items-center justify-center [&_svg]:w-3 [&_svg]:h-3">
                <CategoryIcon :name="cat" />
              </span>
            </span>
            <span class="pf-pill__label">{{ cat }}</span>
            <span v-if="selectedCategories.includes(cat)" class="pf-pill__check">
              <svg viewBox="0 0 10 10" fill="none" class="w-2.5 h-2.5">
                <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div class="pf-rule" />

      <!-- Price Range -->
      <div class="pf-section pf-section--last">
        <p class="pf-label">Price Range</p>
        <div class="pf-pills">
          <button
            v-for="pr in priceRanges"
            :key="pr.label"
            type="button"
            class="pf-pill"
            :class="selectedPriceMax === pr.max ? 'pf-pill--on' : 'pf-pill--off'"
            @click="$emit('update:selectedPriceMax', selectedPriceMax === pr.max ? null : pr.max)"
          >
            <span class="pf-pill__radio" :class="selectedPriceMax === pr.max ? 'pf-pill__radio--on' : ''">
              <span v-if="selectedPriceMax === pr.max" class="pf-pill__radio-dot" />
            </span>
            <span class="pf-pill__label">{{ pr.label }}</span>
          </button>
        </div>
      </div>

    </div>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps<{
  filterCategories: string[]
  selectedCategories: string[]
  selectedPriceMax: number | null
  priceRanges: { label: string; max: number }[]
}>()

const emit = defineEmits<{
  'update:selectedCategories': [v: string[]]
  'update:selectedPriceMax': [v: number | null]
}>()

const activeCount = computed(() => {
  let n = props.selectedCategories.length
  if (props.selectedPriceMax != null) n++
  return n
})

function toggleCategory(cat: string) {
  const list = props.selectedCategories.includes(cat)
    ? props.selectedCategories.filter(c => c !== cat)
    : [...props.selectedCategories, cat]
  emit('update:selectedCategories', list)
}

function clearAll() {
  emit('update:selectedCategories', [])
  emit('update:selectedPriceMax', null)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Sans:wght@400;500;600&display=swap');

.pf-root {
  font-family: 'Instrument Sans', sans-serif;
  width: 256px;
  border-radius: 20px;
  background: #fff;
  border: 1.5px solid #c3d5ea;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(30,79,140,0.1), 0 1px 4px rgba(30,79,140,0.06);
}

/* ── HEADER ── */
.pf-header {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 14px 16px;
  background: #1e4f8c;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px 18px 0 0;
  min-height: 52px;
}
.pf-header__left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.pf-header__icon {
  width: 30px; height: 30px;
  border-radius: 9px;
  background: rgba(255,255,255,0.14);
  border: 1px solid rgba(255,255,255,0.2);
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  flex-shrink: 0;
}
.pf-header__title {
  font-family: 'Syne', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #fff;
}
.pf-header__badge {
  font-size: 10px;
  font-weight: 700;
  background: #fff;
  color: #1e4f8c;
  border-radius: 999px;
  padding: 1px 7px;
  line-height: 1.5;
}

/* ── BODY ── */
.pf-body {
  background: #fff;
  border-radius: 0 0 18px 18px;
}

.pf-section { padding: 14px 16px 0; }
.pf-section--last { padding-bottom: 16px; }

.pf-rule {
  margin: 14px 16px 0;
  height: 1px;
  background: #f1f5f9;
}

.pf-label {
  font-family: 'Syne', sans-serif;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #94a3b8;
  margin-bottom: 0;
}

/* Active Chips */
.pf-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
  align-items: center;
}
.pf-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #1e4f8c;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 999px;
}
.pf-chip__text { line-height: 1.4; }
.pf-chip__remove {
  display: flex; align-items: center; justify-content: center;
  width: 14px; height: 14px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.2);
  color: #fff;
  cursor: pointer;
  transition: background 0.13s ease;
}
.pf-chip__remove:hover { background: rgba(255,255,255,0.35); }
.pf-clearall {
  font-size: 10px;
  font-weight: 600;
  color: #64748b;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.13s ease;
}
.pf-clearall:hover { color: #1e4f8c; }

/* ── PILLS ── */
.pf-pills {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
}
.pf-pill {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 7px 10px;
  border-radius: 10px;
  border: 1.5px solid transparent;
  font-size: 0.72rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
  outline: none;
  font-family: 'Instrument Sans', sans-serif;
}
.pf-pill--off {
  background: #f8fafc;
  border-color: #e2e8f0;
  color: #475569;
}
.pf-pill--off:hover {
  background: #eef3f9;
  border-color: #c3d5ea;
  color: #1e4f8c;
}
.pf-pill--on {
  background: #1e4f8c;
  border-color: #1e4f8c;
  color: #fff;
  box-shadow: 0 2px 10px rgba(30,79,140,0.22);
}
.pf-pill--on:hover { background: #1a4479; }

.pf-pill__icon {
  flex-shrink: 0;
  width: 22px; height: 22px;
  border-radius: 7px;
  background: #e2e8f0;
  border: 1.5px solid #cbd5e1;
  display: flex; align-items: center; justify-content: center;
  color: #64748b;
  transition: all 0.15s ease;
}
.pf-pill__icon--on {
  background: rgba(255,255,255,0.18);
  border-color: rgba(255,255,255,0.3);
  color: #fff;
}
.pf-pill__radio {
  flex-shrink: 0;
  width: 16px; height: 16px;
  border-radius: 50%;
  border: 1.5px solid #cbd5e1;
  background: #fff;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s ease;
}
.pf-pill--on .pf-pill__radio {
  background: rgba(255,255,255,0.2);
  border-color: rgba(255,255,255,0.4);
}
.pf-pill__radio-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #fff;
  animation: dot-pop 0.18s cubic-bezier(0.34,1.56,0.64,1) forwards;
}
@keyframes dot-pop {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.pf-pill__label { flex: 1; line-height: 1.2; }
.pf-pill__check { color: rgba(255,255,255,0.7); flex-shrink: 0; display: flex; }
</style>