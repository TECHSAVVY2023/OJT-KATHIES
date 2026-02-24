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
            :class="{ 'font-semibold underline': isContactPage(link.path) }"
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
    <!-- Get in touch – form + map placeholder (data from landing.json) -->
    <section class="py-16 bg-gradient-to-br from-white via-[#eef3ff] to-white">
      <div class="container mx-auto px-4">
        <div class="mb-8">
          <h2 class="text-3xl md:text-4xl font-extrabold mb-2">
            <span class="text-gray-900">{{ contactSection?.title }} </span>
            <span class="text-blue-600">{{ contactSection?.highlight }}</span>
          </h2>
          <p class="text-gray-600">
            {{ contactSection?.subtitle }}
          </p>
        </div>
        <div class="grid lg:grid-cols-2 gap-10 items-start">
          <!-- Left: white rounded form card -->
          <form
            ref="contactFormRef"
            class="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-4"
            @submit.prevent="onSubmit"
          >
            <div
              v-for="field in contactSection?.fields"
              :key="field.id"
              class="space-y-1"
            >
              <label :for="field.id" class="text-sm font-medium text-gray-700">
                {{ field.label }}
              </label>
              <input
                v-if="field.type !== 'textarea'"
                :id="field.id"
                :name="field.name"
                :type="field.type"
                :placeholder="field.placeholder"
                class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
              >
              <textarea
                v-else
                :id="field.id"
                :name="field.name"
                :placeholder="field.placeholder"
                rows="4"
                class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm resize-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
              />
            </div>
            <button
              type="submit"
              class="w-full py-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold rounded-xl uppercase tracking-wide transition-colors"
            >
              {{ contactSection?.submitLabel }}
            </button>
          </form>
          <!-- Right: Google Maps embed, or map image, or placeholder -->
          <div class="bg-white rounded-3xl shadow-lg overflow-hidden min-h-[320px] aspect-[4/3] flex items-center justify-center">
            <iframe
              v-if="contactSection?.mapEmbedUrl"
              :src="contactSection.mapEmbedUrl"
              width="100%"
              height="100%"
              style="border:0; min-height: 320px;"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Map - Cape Town, Western Cape, South Africa"
              class="w-full h-full min-h-[320px]"
            />
            <img
              v-else-if="contactSection?.mapImage"
              :src="contactSection.mapImage"
              alt="Map - Cape Town, Western Cape, South Africa"
              class="w-full h-full object-contain"
            >
            <div v-else class="flex flex-col items-center justify-center gap-2 text-gray-400 p-8">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span class="font-medium text-gray-500">Map</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact page success popup -->
    <div
      v-if="contactSuccess"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div class="bg-white rounded-xl shadow-xl max-w-sm w-[90%] p-6 text-center">
        <h3 class="text-lg font-bold text-[#1e3a5f] mb-2">
          Message sent successfully
        </h3>
        <p class="text-sm text-gray-600 mb-4">
          Thank you for getting in touch. We&apos;ll get back to you as soon as possible.
        </p>
        <button
          type="button"
          class="px-4 py-2 text-sm font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-md"
          @click="contactSuccess = false"
        >
          OK
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { header, contactSection } = useLandingData()
const { itemCount: cartCount } = useCart()
const headerLogoError = ref(false)

const contactFormRef = ref<HTMLFormElement | null>(null)
const contactSuccess = ref(false)

function isContactPage(path: string) {
  return path === '/contact'
}

function onSubmit() {
  contactSuccess.value = true
  contactFormRef.value?.reset()
}
</script>
