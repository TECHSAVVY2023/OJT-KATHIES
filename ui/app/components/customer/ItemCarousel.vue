<template>
  <div class="relative mx-auto w-full max-w-[1104px]">
    <div ref="scrollContainer" class="flex gap-x-4 overflow-x-auto scroll-smooth no-scrollbar">
      <div
        v-for="item in items"
        :key="item.id"
        class="w-[352px] flex-shrink-0"
      >
        <ItemCard :item="item" />
      </div>
    </div>

    <button
      @click="prev"
      class="absolute -left-6 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/80 px-3 py-2 shadow-md hover:bg-white"
    >
      ‹
    </button>
    <button
      @click="next"
      class="absolute -right-6 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/80 px-3 py-2 shadow-md hover:bg-white"
    >
      ›
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ItemCard from '~/app/components/ItemCard.vue'

const props = defineProps<{
  items: any[]
}>()

const scrollContainer = ref<HTMLElement | null>(null)
const currentIndex = ref(0)
const visibleItems = 3

function scrollToCurrent() {
  const container = scrollContainer.value
  if (!container || !container.children.length) return

  const firstCard = container.children[0] as HTMLElement
  const style = getComputedStyle(firstCard)
  const cardWidth = firstCard.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight)

  container.scrollTo({
    left: cardWidth * currentIndex.value,
    behavior: 'smooth',
  })
}

function prev() {
  if (currentIndex.value > 0) currentIndex.value--
  else currentIndex.value = Math.max(0, props.items.length - visibleItems)
  scrollToCurrent()
}

function next() {
  if (currentIndex.value < props.items.length - visibleItems) currentIndex.value++
  else currentIndex.value = 0
  scrollToCurrent()
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

