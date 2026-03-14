<template>
  <div class="pc-catbrowse">
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
        @click="$emit('toggleCategory', cat.name)"
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
</template>

<script setup lang="ts">
const props = defineProps<{
  categoryCards: { name: string; image?: string }[]
  selectedCategories: string[]
}>()

defineEmits<{
  toggleCategory: [category: string]
}>()
</script>

<style scoped>
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
</style>
