<template>
  <div class="space-y-1">
    <p class="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#20437B]/60">{{ title }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>
