<script setup>
import ItemCarousel from '~/app/components/ItemCarousel.vue'
import HomeHero from '~/app/components/HomeHero.vue'
import { fallbackItems } from '~/data/FallBackItems'

const items = fallbackItems
</script>

<template>
  <div>
    <HomeHero :items="items" />
  </div>
</template>