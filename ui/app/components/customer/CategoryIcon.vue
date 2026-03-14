<template>
  <span class="inline-flex items-center justify-center">
    <!-- Instant Noodles -->
    <svg v-if="iconType === 'instant-noodles'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16" />
    </svg>
    <!-- In-The-Can / Canned Goods: can -->
    <svg v-else-if="iconType === 'can'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
    <!-- Sarsa: bottle -->
    <svg v-else-if="iconType === 'sarsa'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
    <!-- Packet Seasoning -->
    <svg v-else-if="iconType === 'packet-seasoning'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
    <!-- Chips & Biscuits -->
    <svg v-else-if="iconType === 'chips-biscuits'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
      <circle cx="16" cy="8" r="1" fill="currentColor" />
      <circle cx="12" cy="14" r="1" fill="currentColor" />
    </svg>
    <!-- Ready to cook -->
    <svg v-else-if="iconType === 'ready-to-cook'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <!-- Halo Halo Ingredients -->
    <svg v-else-if="iconType === 'halo-halo'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h8" />
    </svg>
    <!-- Meal to go -->
    <svg v-else-if="iconType === 'meal-to-go'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
    <!-- Default -->
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{ name: string }>()

const iconType = computed(() => {
  const n = (props.name || '').toLowerCase().replace(/\s+/g, ' ')
  if (n.includes('instant') && n.includes('noodle')) return 'instant-noodles'
  if (n.includes('in-the-can') || n.includes('canned')) return 'can'
  if (n.includes('sarsa')) return 'sarsa'
  if (n.includes('packet') && n.includes('seasoning')) return 'packet-seasoning'
  if (n.includes('chips') && n.includes('biscuit')) return 'chips-biscuits'
  if (n.includes('ready') && n.includes('cook')) return 'ready-to-cook'
  if (n.includes('halo') && n.includes('ingredient')) return 'halo-halo'
  if (n.includes('meal') && n.includes('go')) return 'meal-to-go'
  return 'default'
})
</script>
