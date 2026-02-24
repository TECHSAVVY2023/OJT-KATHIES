<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header (fixed on scroll) -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-[#1e3a5f] text-white shadow">
      <div class="container mx-auto px-4 flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
            <img
              v-if="header?.logo?.iconPath && !headerLogoError"
              :src="header.logo.iconPath"
              :alt="header?.logo?.text"
              class="w-8 h-8 object-contain"
              @error="headerLogoError = true"
            >
            <span v-else class="text-lg font-bold text-[#1e3a5f]">K</span>
          </div>
          <span class="font-bold text-lg">{{ header?.logo.text }}</span>
        </NuxtLink>
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="link in header?.navLinks"
            :key="link.path"
            :to="link.path"
            class="hover:underline"
            :class="{ 'font-semibold underline': isProductsPage(link.path) }"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
        <div class="flex items-center gap-4">
          <NuxtLink to="/cart" class="relative p-2 hover:bg-white/10 rounded flex items-center justify-center text-white" aria-label="Cart">
            <img v-if="header?.cartIconPath" :src="header.cartIconPath" alt="Cart" class="w-6 h-6 object-contain">
            <CartIcon v-else class="w-6 h-6 shrink-0" />
            <span v-if="cartCount > 0" class="absolute -top-0.5 -right-0.5 min-w-[1.25rem] h-5 px-1 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">{{ cartCount > 99 ? '99+' : cartCount }}</span>
          </NuxtLink>
          <NuxtLink
            v-for="link in header?.utilityLinks?.filter(l => l.type === 'button')"
            :key="link.path"
            :to="link.path"
            class="px-4 py-2 rounded bg-white/20 hover:bg-white/30"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </header>

    <div class="pt-16">
    <!-- Catalog hero: image below navbar (images/h1.png), tagline from landing.json -->
    <section class="bg-white">
      <div class="container mx-auto px-4 pt-6 pb-2 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-[#1e3a5f]">
          {{ heroSection?.headline }}
        </h2>
      </div>
      <div class="w-full max-w-6xl mx-auto px-4 pb-8">
        <img
          src="/images/h1.png"
          alt="Kathie's Kitchen product catalog"
          class="w-full rounded-2xl object-cover shadow-lg max-h-[420px]"
        >
      </div>
    </section>

    <!-- Product catalog: all product logic lives in ProductCatalog.vue -->
    <ProductCatalog />
    </div>
  </div>
</template>

<script setup lang="ts">
const { header, heroSection } = useLandingData()
const { itemCount: cartCount } = useCart()
const headerLogoError = ref(false)

function isProductsPage(path: string) {
  return path === '/products' || path === '/products/'
}
</script>
