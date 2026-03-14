<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div v-if="title || subtitle">
      <h1 class="text-2xl sm:text-3xl font-bold text-[#20437B]">{{ title }}</h1>
      <p v-if="subtitle" class="text-[#20437B]/80 mt-1">{{ subtitle }}</p>
    </div>
    
    <!-- Page Content -->
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
}

defineProps<Props>()
</script>
