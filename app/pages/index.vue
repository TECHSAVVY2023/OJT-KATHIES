<template>
  <div class="min-h-screen bg-gray-50">
    <LandingHeader />
    <div class="pt-16">
      <LandingHero />
      <LandingWhyChooseUs />
      <LandingTopCategories />
      <LandingNewArrivals />
      <LandingUpcomingStocks />
      <!-- FAQ + Get in touch (same section) -->
      <section id="faq" class="py-16 bg-gradient-to-br from-white via-[#eef3ff] to-white">
        <div class="container mx-auto px-4">
          <LandingFaq />
          <LandingGetInTouch />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// Landing page: composition of section components only.
// All section logic lives in app/components/Landing*.vue
</script>
