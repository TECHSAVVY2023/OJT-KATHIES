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
            :class="{ 'font-semibold underline': isAboutPage(link.path) }"
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
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <!-- Left: About Us -->
            <div>
              <h2 class="inline-block text-white bg-[#1e3a5f] px-8 py-3 rounded-full font-bold text-lg shadow-md mb-6">
                About Us
              </h2>
              <p class="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                Welcome to Kathie’s Kitchen, your home for authentic Filipino flavors in South Africa. We are a Filipino grocery
                dedicated to bringing the taste of the Philippines closer to the Filipino community and to anyone who loves Filipino
                food.
              </p>
              <p class="text-gray-700 text-base md:text-lg leading-relaxed">
                Kathie’s Kitchen was created with a simple goal: to make it easier to find Filipino ingredients, snacks, and favorite
                homegrown products while living abroad. We understand how food connects people to memories, family, and culture,
                which is why we carefully select products that remind our customers of home.
              </p>
            </div>

            <!-- Right: Why Choose us – pill header + 2x2 grid, no card background -->
            <div>
              <h2 class="inline-block text-white bg-[#1e3a5f] px-8 py-3 rounded-full font-bold text-lg shadow-md mb-6">
                Why Choose us
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div
                  v-for="f in whyChooseUsGridOrder"
                  :key="f.id"
                  class="flex flex-col group transition-transform duration-200"
                >
                  <div class="w-12 h-12 flex-shrink-0 flex items-center justify-center text-[#1e3a5f] mb-3 transition-transform duration-200 group-hover:scale-110 group-hover:text-[#2563eb]">
                    <svg v-if="f.icon === 'quality-goods'" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <svg v-else-if="f.icon === 'easy-access'" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                    </svg>
                    <svg v-else-if="f.icon === 'authentic-taste'" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-else-if="f.icon === 'more-deals'" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    <span v-else class="text-2xl">◆</span>
                  </div>
                  <h3 class="font-bold text-[#1e3a5f] text-lg mb-1">{{ f.name }}</h3>
                  <p class="text-gray-600 text-sm leading-relaxed">{{ f.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const { header, whyChooseUs } = useLandingData()
const { itemCount: cartCount } = useCart()
const headerLogoError = ref(false)

// 2x2 grid order: Quality Goods, Authentic Taste | Easy Access, More Deals
const whyChooseUsGridOrder = computed(() => {
  const f = whyChooseUs.value?.features ?? []
  return [f[0], f[2], f[1], f[3]].filter(Boolean)
})

function isAboutPage(path: string) {
  return path === '/about'
}
</script>
