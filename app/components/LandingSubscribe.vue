<template>
  <section class="relative overflow-hidden bg-[linear-gradient(140deg,#061E35_0%,#083D6D_50%,#0F4C81_100%)] py-16 sm:py-16 lg:py-24 [font-family:Poppins,sans-serif]">
    <SubscribeBackground />

    <div class="relative z-[1] mx-auto grid w-full max-w-[1160px] grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
      <!-- ── Left: Copy + Form ── -->
      <SubscribeContent />

      <!-- ── Right: Phone mockup ── -->
      <SubscribePhoneMockup />
    </div>
  </section>
</template>

<script setup lang="ts">
import SubscribeBackground from './SubscribeBackground.vue'
import SubscribeContent from './SubscribeContent.vue'
import SubscribePhoneMockup from './SubscribePhoneMockup.vue'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
</style>