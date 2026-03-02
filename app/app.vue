<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
    <NuxtRouteAnnouncer />
    <main class="flex-1 w-full min-w-0">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
    <!-- Footer (hidden on auth and admin pages) -->
    <footer v-if="!isAuthPage && !isAdminPage" class="bg-[#083D6D] text-white pb-[env(safe-area-inset-bottom)]">
      <div class="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10">
          <!-- Logo column - full width on mobile, spans 2 on larger -->
          <div class="col-span-2 sm:col-span-3 lg:col-span-1 lg:col-start-1">
            <div class="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center overflow-hidden mb-2 sm:mb-3 shrink-0">
                <img
                  v-if="footer?.logo?.imagePath && !logoImageError"
                  :src="footer.logo.imagePath"
                  :alt="footer.logo.text"
                  class="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                  @error="logoImageError = true"
                >
                <span v-else class="text-xl sm:text-2xl font-bold text-[#083D6D]">K</span>
              </div>
              <span class="text-base sm:text-lg font-bold text-white">{{ footer?.logo?.text }}</span>
              <span class="text-xs font-semibold text-red-500 uppercase tracking-wide mt-1">
                {{ footer?.logo?.tagline }}
              </span>
            </div>
          </div>
          <!-- Shop -->
          <div class="col-span-1">
            <h3 class="font-bold text-xs sm:text-sm uppercase tracking-wide mb-2 sm:mb-3 text-white/90">Shop</h3>
            <ul class="space-y-1.5 sm:space-y-2">
              <li v-for="link in footer?.shopLinks" :key="link.path">
                <NuxtLink :to="link.path" class="text-white/90 hover:text-white text-sm py-1 block touch-manipulation">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <!-- About -->
          <div class="col-span-1">
            <h3 class="font-bold text-xs sm:text-sm uppercase tracking-wide mb-2 sm:mb-3 text-white/90">About</h3>
            <ul class="space-y-1.5 sm:space-y-2">
              <li v-for="link in footer?.aboutLinks" :key="link.path">
                <NuxtLink :to="link.path" class="text-white/90 hover:text-white text-sm py-1 block touch-manipulation">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <!-- Contact Us -->
          <div class="col-span-2 sm:col-span-1">
            <h3 class="font-bold text-xs sm:text-sm uppercase tracking-wide mb-2 sm:mb-3 text-white/90">Contact Us</h3>
            <div class="space-y-2 text-sm text-white/90">
              <a :href="`tel:${footer?.phone?.replace(/\s/g, '')}`" class="flex items-center gap-2 hover:text-white py-1 touch-manipulation">
                <span class="w-5 h-5 flex items-center justify-center shrink-0">📞</span>
                <span class="break-all">{{ footer?.phone }}</span>
              </a>
              <a
                :href="`https://wa.me/${footer?.whatsapp?.replace(/[\s+]/g, '')}`"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-2 hover:text-white py-1 touch-manipulation"
              >
                <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                  />
                </svg>
                <span class="break-all">{{ footer?.whatsapp }}</span>
              </a>
            </div>
          </div>
          <!-- Social -->
          <div class="col-span-2 sm:col-span-1">
            <h3 class="font-bold text-xs sm:text-sm uppercase tracking-wide mb-2 sm:mb-3 text-white/90">Social</h3>
            <div class="flex flex-wrap gap-2 sm:gap-3">
              <a
                v-for="s in footer?.socialLinks"
                :key="s.id"
                :href="s.url"
                target="_blank"
                rel="noopener"
                class="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/25 active:bg-white/35 transition-colors touch-manipulation"
                :aria-label="s.name"
              >
                <span v-if="s.icon === 'facebook'" class="font-bold text-sm">f</span>
                <span v-else-if="s.icon === 'instagram'" class="text-sm">📷</span>
                <span v-else-if="s.icon === 'twitter'" class="text-sm">𝕏</span>
                <span v-else-if="s.icon === 'youtube'" class="text-sm">▶</span>
                <span v-else-if="s.icon === 'wordpress'" class="font-bold text-sm">W</span>
                <span v-else class="text-sm">•</span>
              </a>
            </div>
          </div>
          <!-- Subscribe -->
          <div class="col-span-2 sm:col-span-3 lg:col-span-1">
            <h3 class="font-bold text-xs sm:text-sm uppercase tracking-wide mb-2 sm:mb-3 text-white/90">Subscribe</h3>
            <form @submit.prevent="handleSubscribe" class="w-full">
              <div class="flex rounded-lg overflow-hidden bg-white/10 min-w-0">
                <input
                  v-model="subscribeEmail"
                  type="email"
                  placeholder="Your email"
                  class="flex-1 min-w-0 px-3 py-2.5 sm:py-2 text-sm text-gray-900 placeholder:text-gray-500 bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                >
                <button
                  type="submit"
                  class="px-4 py-2.5 sm:py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 active:bg-red-700 transition-colors shrink-0 touch-manipulation min-w-[70px]"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        <!-- Separator -->
        <div class="mt-8 sm:mt-10 pt-6 border-t border-[#0F76D3]/60" />
        <p class="text-center text-xs sm:text-sm text-white/90 px-2">
          {{ footer?.copyright }}
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { footer } = useLandingData()
const logoImageError = ref(false)

const subscribeEmail = ref('')
const { add: addSubscriber } = useSubscribers()
function handleSubscribe() {
  if (subscribeEmail.value.trim()) {
    addSubscriber(subscribeEmail.value)
    subscribeEmail.value = ''
  }
}

const isAuthPage = computed(() => {
  const path = route.path?.toLowerCase() || ''
  return path === '/signin' || path === '/signup' || path === '/forgot-password'
})
const isAdminPage = computed(() => (route.path || '').startsWith('/admin'))

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap' }
  ]
})
</script>
