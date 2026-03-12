<template>
  <!-- ROOT SCROLL CONTAINER -->
  <div class="min-h-screen flex flex-col bg-[#FEF3E2]">

    <!-- Fixed Navbar -->
    <Navbar />

    <!-- Main scrollable content -->
    <main class="flex-1 pt-[96px]">
      <!-- 96px = navbar height -->
      <slot />
    </main>

    <Footer />
  </div>
</template>
