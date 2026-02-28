<template>
  <div>
      <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-10">
        <span class="text-[#1e3a5f]">Frequently Asked </span>
        <span class="text-red-600">Questions</span>
      </h2>
      <div class="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] gap-10 items-start">
        <div class="flex flex-col">
          <div class="relative inline-block group">
            <div class="overflow-hidden rounded-[2.5rem] shadow-xl transform transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:ring-4 group-hover:ring-[#1e3a5f]/10">
              <img
                :src="faqSection?.infoBackgroundImage || '/images/ask.png'"
                alt="Kathie's Kitchen – Filipino sari-sari store in South Africa"
                class="w-full h-auto object-contain"
              >
            </div>
            <div class="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="Kathie's Kitchen logo"
                class="w-14 h-14 object-contain"
              >
            </div>
          </div>
        </div>
        <div class="space-y-3">
          <div
            v-for="faq in faqSection?.faqs"
            :key="faq.id"
            class="bg-[#083D6D] text-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
          >
            <button
              type="button"
              class="w-full flex items-center justify-between px-5 py-4 text-left"
              @click="toggleFaq(faq.id)"
            >
              <span class="font-medium">{{ faq.question }}</span>
              <span class="ml-4 shrink-0 transition-transform duration-300" :class="{ 'rotate-180': openId === faq.id }">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-[500px] opacity-100"
              leave-active-class="transition-all duration-300 ease-in"
              leave-from-class="max-h-[500px] opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <div
                v-show="openId === faq.id"
                class="overflow-hidden"
              >
                <div class="px-5 pb-4 pt-0 text-sm bg-[#052b4d]">
                  {{ faq.answer }}
                </div>
              </div>
            </Transition>
          </div>
          <p class="text-gray-600 text-sm mt-2">
            Can&apos;t find your question?
          </p>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1e3a5f] hover:bg-[#083D6D] text-white text-sm font-medium rounded-lg transition-colors w-fit"
          >
            Contact Us
          </NuxtLink>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
const { faqSection } = useLandingData()
const openId = ref<string | null>(null)
function toggleFaq(id: string) {
  openId.value = openId.value === id ? null : id
}
</script>
