<template>
  <div class="page-root min-h-screen bg-[#EDF3FF]">
    <PageHeader active-path="/about" />

    <div class="pt-16">
      <AboutHero />
      <AboutWhyChooseUs />
      <AboutCtaBanner />
    </div>
  </div>
</template>

<script setup lang="ts">
// Components are now in app/components/
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

.page-root,
.page-root * {
  font-family: 'Poppins', sans-serif;
}
</style>