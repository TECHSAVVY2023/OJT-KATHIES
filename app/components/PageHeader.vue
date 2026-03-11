<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-[#1e3a5f] text-white shadow">
    <div class="container mx-auto px-4 flex items-center justify-between h-16 min-w-0">
      <NuxtLink to="/" class="flex items-center gap-2 shrink-0 min-w-0">
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
        
        <span class="font-bold text-base sm:text-lg truncate">{{ header?.logo?.text }}</span>
      </NuxtLink>
      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="link in header?.navLinks"
          :key="link.path"
          :to="link.path"
          class="hover:underline"
          :class="{ 'font-semibold underline': isActive(link.path) }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      <div class="flex items-center gap-2 sm:gap-4 shrink-0">
        <NuxtLink to="/cart" class="relative p-2 hover:bg-white/10 rounded flex items-center justify-center text-white touch-manipulation" aria-label="Cart">
          <img v-if="header?.cartIconPath" :src="header.cartIconPath" alt="Cart" class="w-6 h-6 object-contain">
          <CartIcon v-else class="w-6 h-6 shrink-0" />
          <span v-if="cartCount > 0" class="absolute -top-0.5 -right-0.5 min-w-[1.25rem] h-5 px-1 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">{{ cartCount > 99 ? '99+' : cartCount }}</span>
        </NuxtLink>
        <NuxtLink
          v-for="link in utilityButtons"
          :key="link.path"
          :to="link.path"
          class="hidden sm:inline-flex px-4 py-2 rounded bg-white/20 hover:bg-white/30"
        >
          {{ link.label }}
        </NuxtLink>
        <button
          type="button"
          class="md:hidden p-2 -mr-2 rounded-lg hover:bg-white/10 touch-manipulation"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav v-show="mobileMenuOpen" class="md:hidden border-t border-white/20 bg-[#1e3a5f]">
        <div class="container mx-auto px-4 py-4 flex flex-col gap-1">
          <NuxtLink
            v-for="link in header?.navLinks"
            :key="link.path"
            :to="link.path"
            class="py-3 px-3 rounded-lg hover:bg-white/10 font-medium touch-manipulation"
            :class="{ 'bg-white/10 font-semibold': isActive(link.path) }"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
          <template v-for="link in utilityButtons" :key="link.path">
            <NuxtLink
              :to="link.path"
              class="sm:hidden py-3 px-3 rounded-lg hover:bg-white/10 font-medium bg-white/10 touch-manipulation"
              @click="mobileMenuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
          </template>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{ activePath?: string }>()
const { header } = useLandingData()
const { itemCount: cartCount } = useCart()
const headerLogoError = ref(false)
const mobileMenuOpen = ref(false)
const utilityButtons = computed(() => header.value?.utilityLinks?.filter((l: { type: string }) => l.type === 'button') ?? [])

function isActive(path: string) {
  return !!props.activePath && path === props.activePath
}
</script>
