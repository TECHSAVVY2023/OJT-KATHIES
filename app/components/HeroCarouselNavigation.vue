<template>
  <div class="carousel-nav">
    <!-- Thin progress bar -->
    <div class="progress-track">
      <div class="progress-fill" :style="{ width: progressWidth }"></div>
    </div>

    <!-- Dot indicators -->
    <div class="dots">
      <button
        v-for="(_, i) in totalSlides"
        :key="i"
        class="dot"
        :class="{ active: i === currentIndex }"
        @click="$emit('go-to-slide', i)"
        :aria-label="`Go to slide ${i + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentIndex: number
  totalSlides: number
}>()

defineEmits<{ 'go-to-slide': [index: number] }>()

const progressWidth = computed(() =>
  `${((props.currentIndex + 1) / props.totalSlides) * 100}%`
)
</script>

<style scoped>
.carousel-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 2px;
}

/* Progress bar */
.progress-track {
  height: 2px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #0F76D3, #7fc8f8);
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
  box-shadow: 0 0 8px rgba(15,118,211,0.6);
}

/* Dots */
.dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.22);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: width 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.dot.active {
  width: 22px;
  background: #0F76D3;
  box-shadow: 0 0 10px rgba(15,118,211,0.65);
}
</style>