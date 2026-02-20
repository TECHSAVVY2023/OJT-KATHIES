<template>
  <div class="relative w-full max-w-[1104px] mx-auto">
    <!-- Scrollable container -->
    <div ref="scrollContainer" class="flex overflow-x-auto scroll-smooth no-scrollbar gap-x-4">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex-shrink-0 w-[352px]"
      >
        <ItemCard :item="item" />
      </div>
    </div>

    <!-- Prev / Next Buttons -->
    <button
      @click="prev"
      class="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow-md z-10"
    >
      ‹
    </button>
    <button
      @click="next"
      class="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow-md z-10"
    >
      ›
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ItemCard from './ItemCard.vue'

defineProps({
  items: {
    type: Array,
    required: true
  }
})

const scrollContainer = ref(null)
const currentIndex = ref(0)
const visibleItems = 3

function scrollToCurrent() {
  const container = scrollContainer.value
  if (!container || container.children.length === 0) return

  const firstCard = container.children[0]
  const style = getComputedStyle(firstCard)
  const cardWidth = firstCard.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight)

  container.scrollTo({
    left: cardWidth * currentIndex.value,
    behavior: 'smooth'
  })
}

function prev() {
  if (currentIndex.value > 0) currentIndex.value--
  else currentIndex.value = Math.max(0, items.length - visibleItems)
  scrollToCurrent()
}

function next() {
  if (currentIndex.value < items.length - visibleItems) currentIndex.value++
  else currentIndex.value = 0
  scrollToCurrent()
}
</script>

<style>
/* Hide horizontal scrollbar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>