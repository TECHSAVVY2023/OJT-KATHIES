<template>
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
        <span class="font-bold text-lg">{{ header?.logo?.text }}</span>
      </NuxtLink>
      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="link in header?.navLinks"
          :key="link.path"
          :to="link.path"
          class="hover:underline"
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
            v-for="link in utilityButtons"
            :key="link.path"
          :to="link.path"
          class="px-4 py-2 rounded bg-white/20 hover:bg-white/30"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { header } = useLandingData()
const { itemCount: cartCount } = useCart()
const headerLogoError = ref(false)
const utilityButtons = computed(() => header.value?.utilityLinks?.filter((l: { type: string }) => l.type === 'button') ?? [])
</script>
