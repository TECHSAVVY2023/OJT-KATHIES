<template>
  <div class="bg-white rounded-xl shadow-sm border border-[#D3DDFF] p-5">
    <div class="flex flex-wrap justify-between items-start gap-4 mb-4">
      <div>
        <h2 class="font-bold text-[#20437B]">{{ title }}</h2>
        <p v-if="total" class="text-2xl font-bold text-gray-900 mt-1">{{ total }}</p>
        <p v-if="change" class="text-sm text-green-600 mt-0.5">{{ change }}</p>
      </div>
      <div v-if="year" class="flex items-center gap-2">
        <span class="text-sm text-gray-500">{{ year }}</span>
        <span class="p-2 rounded-lg bg-[#D3DDFF]/50 text-[#20437B]">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </span>
      </div>
    </div>
    
    <p class="text-xs text-gray-500 mb-3 text-right">• {{ subtitle }}</p>
    
    <!-- Bar Chart -->
    <div v-if="type === 'bar'" class="h-52 flex items-end gap-1">
      <div
        v-for="(point, i) in data"
        :key="i"
        class="flex-1 flex flex-col items-center gap-1 group"
      >
        <div
          class="w-full bg-[#20437B] rounded-t min-h-[4px] transition-all hover:opacity-90"
          :style="{ height: barHeight(data, point) + '%' }"
          :title="`${point.month}: ${point.value}`"
        />
      </div>
    </div>
    
    <!-- Line Chart -->
    <div v-else-if="type === 'line'" class="h-48 relative">
      <svg class="w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke="#20437B"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          :points="linePoints"
        />
      </svg>
    </div>
    
    <div class="flex gap-1 mt-2">
      <span v-for="(point, i) in data" :key="i" class="flex-1 text-[10px] text-gray-500 text-center truncate">{{ point.month }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ChartPoint {
  month: string
  value: number
}

interface Props {
  title: string
  subtitle?: string
  data: ChartPoint[]
  type: 'bar' | 'line'
  total?: string | number
  change?: string
  year?: string
  viewAllLink?: string
}

const props = defineProps<Props>()

function barHeight(data: ChartPoint[], point: ChartPoint) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return Math.round((point.value / max) * 100)
}

const linePoints = computed(() => {
  if (props.type !== 'line' || !props.data?.length) return ''
  const max = Math.max(...props.data.map(d => d.value), 1)
  const pad = 8
  const w = 200 - pad * 2
  const h = 120 - pad * 2
  return props.data.map((p, i) => {
    const x = pad + (props.data!.length > 1 ? (i / (props.data!.length - 1)) * w : w / 2)
    const y = pad + h - (p.value / max) * h
    return `${x},${y}`
  }).join(' ')
})
</script>
