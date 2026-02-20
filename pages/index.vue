<script setup>
import ItemCarousel from '~/components/ItemCarousel.vue'
import { fallbackItems } from '~/data/FallBackItems'

const items = fallbackItems
</script>

<template>
  <div>
    <!-- Hero section -->
    <section class="min-h-screen bg-gradient-to-b from-[#083D6D] to-[#0F76D3] flex flex-col items-center text-white pt-20">
      <h1 class="text-5xl font-bold font-sans text-center">
        Bringing home closer, one bite at a time
      </h1>

      <p class="mt-4 text-xl text-center max-w-2xl">
        Authentic Filipino flavors, crafted with love and delivered fresh to your doorstep.
      </p>

      <!-- Shop Now button -->
      <button class="mt-4 bg-[#E6EAED] hover:bg-gradient-to-b from-[#D3DDFF] to-[#7F8599] text-gray-900 font-semibold px-6 py-3 rounded-[24px] transition">
        SHOP NOW!
      </button>
      
      <!-- Optional: Carousel directly under hero content -->
      <div class="w-full max-w-[1104px] mt-12">
        <ItemCarousel :items="items" />
      </div>
    </section>

    
  </div>
</template>