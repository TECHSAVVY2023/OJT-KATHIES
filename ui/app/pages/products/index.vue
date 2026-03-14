<template>
  <div class="page-root min-h-screen bg-[#EDF3FF]">
    <PageHeader active-path="/products" />

    <div class="pt-16">
      <!-- Banner — flush right under navbar, no gap -->
      <div class="w-full overflow-hidden">
        <img
          src="/images/h1.png"
          alt="Kathie's Kitchen product catalog"
          class="w-full object-cover object-center max-h-[200px] sm:max-h-[280px] md:max-h-[360px]"
        >
      </div>

      <!-- Product Catalog -->
      <ProductCatalog />
    </div>
  </div>
</template>

<script setup lang="ts">
const { heroSection } = useLandingData()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
.page-root, .page-root * { font-family: 'Poppins', sans-serif; }
</style>