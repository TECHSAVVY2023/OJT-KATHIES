<template>
  <div class="carousel-footer">
    <div class="progress-track">
      <div
        class="progress-fill"
        :style="{ width: `${((activeIndex + 1) / total) * 100}%` }"
      ></div>
    </div>
    <div class="cdots">
      <button
        v-for="(_, i) in total"
        :key="i"
        class="cdot"
        :class="{ 'cdot-active': i === activeIndex }"
        :aria-label="`Go to ${i + 1}`"
        @click="$emit('update:activeIndex', i)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activeIndex: number
  total: number
}>()

defineEmits<{
  (e: 'update:activeIndex', i: number): void
}>()
</script>

<style scoped>
.carousel-footer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 8px;
}

.progress-track {
  width: 100%; height: 2px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #0F76D3, #7DB8EC);
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
  box-shadow: 0 0 8px rgba(15,118,211,0.6);
}

.cdots {
  display: flex; justify-content: center;
  align-items: center; gap: 6px;
}

.cdot {
  width: 6px; height: 6px;
  border-radius: 9999px;
  background: rgba(255,255,255,0.18);
  border: none; cursor: pointer; padding: 0;
  transition: background 0.3s ease, width 0.3s ease, box-shadow 0.3s ease;
}
.cdot-active {
  width: 24px;
  background: #0F76D3;
  box-shadow: 0 0 10px rgba(15,118,211,0.65);
}
</style>
