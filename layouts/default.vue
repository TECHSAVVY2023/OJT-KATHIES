<template>
  <div class="layout bg-white min-h-screen flex flex-col">
    <AppHeader />

    <!-- Main content slot -->
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup>
import AppHeader from '~/components/AppHeader.vue'
</script>

<style>
/* You can remove padding here and handle spacing per section instead */
</style>
