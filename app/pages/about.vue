<template>
  <div class="min-h-screen bg-white">
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
      <!-- About Us – two columns: left = auto carousel, right = info -->
      <section class="pt-8 pb-10 md:pt-10 md:pb-12 border-b border-slate-100">
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <!-- Left: 3 visible images, auto carousel -->
            <div class="overflow-hidden">
              <div class="relative overflow-hidden">
                <div
                  class="flex gap-3 transition-transform duration-500 ease-out"
                  :style="{
                    transform: `translateX(-${carouselIndex * (100 / 3)}%)`
                  }"
                >
                  <div
                    v-for="(img, i) in aboutImages"
                    :key="img"
                    class="flex-shrink-0 w-1/3"
                    :style="{ minWidth: '33.333%' }"
                  >
                    <div class="aspect-[3/4] overflow-hidden bg-slate-100 rounded-lg">
                      <img
                        :src="img"
                        :alt="`About Kathie's Kitchen ${i + 1}`"
                        class="w-full h-full object-cover"
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="aboutImages.length > 3" class="flex justify-center gap-1.5 mt-3">
                <button
                  v-for="i in totalCarouselPages"
                  :key="i - 1"
                  type="button"
                  class="h-1 w-6 transition-colors"
                  :class="(i - 1) === carouselIndex ? 'bg-[#1e3a5f]' : 'bg-slate-200'"
                  :aria-label="`Slide ${i}`"
                  @click="carouselIndex = i - 1"
                />
              </div>
            </div>
            <!-- Right: info -->
            <div>
              <h1 class="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight mb-4">
                About Us
              </h1>
              <p class="text-slate-600 text-base md:text-lg leading-relaxed mb-6">
                Welcome to Kathie's Kitchen, your home for authentic Filipino flavors in South Africa.
              </p>
              <p class="text-slate-600 text-base leading-relaxed">
                Kathie's Kitchen was created with a simple goal: to make it easier to find Filipino ingredients, snacks, and favorite
                homegrown products while living abroad. We are a Filipino grocery dedicated to bringing the taste of the Philippines
                closer to the Filipino community and to anyone who loves Filipino food.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Choose Us – below info -->
      <section class="py-10 md:py-14 bg-slate-50/50">
        <div class="container mx-auto px-4 max-w-5xl">
          <h2 class="text-slate-800 font-bold text-xl mb-12 pb-2 border-b-2 border-[#1e3a5f] w-fit">
            Why Choose Us
          </h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div
              v-for="f in whyChooseUsGridOrder"
              :key="f.id"
              class="flex flex-col"
            >
              <div class="w-11 h-11 flex-shrink-0 flex items-center justify-center text-[#1e3a5f] mb-4">
                <svg v-if="f.icon === 'quality-goods'" xmlns="http://www.w3.org/2000/svg" class="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <svg v-else-if="f.icon === 'easy-access'" xmlns="http://www.w3.org/2000/svg" class="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                </svg>
                <svg v-else-if="f.icon === 'authentic-taste'" xmlns="http://www.w3.org/2000/svg" class="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-else-if="f.icon === 'more-deals'" xmlns="http://www.w3.org/2000/svg" class="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <span v-else class="text-2xl">◆</span>
              </div>
              <h3 class="font-semibold text-slate-800 text-base mb-1">{{ f.name }}</h3>
              <p class="text-slate-600 text-sm leading-relaxed">{{ f.description }}</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
const { header, aboutSection, whyChooseUs } = useLandingData()
const { itemCount: cartCount } = useCart()
const headerLogoError = ref(false)
const VISIBLE = 3
const carouselIndex = ref(0)

const aboutImages = computed(() => aboutSection.value?.images ?? ['/images/flip.png', '/images/ask.png', '/images/h1.png'])
const totalCarouselPages = computed(() => Math.max(1, aboutImages.value.length - VISIBLE + 1))

let carouselTimer: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  carouselTimer = setInterval(() => {
    const max = totalCarouselPages.value
    carouselIndex.value = (carouselIndex.value + 1) % max
  }, 4000)
})
onUnmounted(() => {
  if (carouselTimer) clearInterval(carouselTimer)
})

const whyChooseUsGridOrder = computed(() => {
  const f = whyChooseUs.value?.features ?? []
  return [f[0], f[2], f[1], f[3]].filter(Boolean)
})

function isAboutPage(path: string) {
  return path === '/about'
}
</script>

