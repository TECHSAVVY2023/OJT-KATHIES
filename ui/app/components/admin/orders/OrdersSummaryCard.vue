<template>
  <div class="bg-white rounded-xl border border-[#D3DDFF] p-5 shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <div class="w-10 h-10 rounded-lg bg-[#D3DDFF]/50 flex items-center justify-center shrink-0">
        <svg class="w-5 h-5 text-[#20437B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <select class="text-sm text-gray-500 border-0 bg-transparent pr-1 focus:ring-0 rounded cursor-pointer">
        <option>{{ timeRange }}</option>
      </select>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="metric in metrics" :key="metric.label">
        <p class="text-sm text-gray-500 mb-0.5">{{ metric.label }}</p>
        <p class="text-xl font-bold text-gray-900">{{ metric.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Metric {
  label: string
  value: number | string
}

interface Props {
  metrics: Metric[]
  timeRange?: string
}

withDefaults(defineProps<Props>(), {
  timeRange: 'This Week'
})
</script>
