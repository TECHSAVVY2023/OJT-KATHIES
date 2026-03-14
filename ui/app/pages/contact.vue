<template>
  <div class="page-root min-h-screen bg-[#EDF3FF]">
    <PageHeader active-path="/contact" />

    <div class="pt-16">
      <section class="py-14 md:py-20">
        <div class="container mx-auto px-6 max-w-6xl">

          <!-- Header -->
          <div class="mb-10">
            <div class="flex items-center gap-2 mb-3">
              <span class="w-5 h-0.5 bg-[#CE1126] inline-block rounded-full" />
              <span class="text-[#CE1126] text-xs font-semibold tracking-[0.18em] uppercase">Contact Us</span>
            </div>
            <h1 class="text-3xl sm:text-4xl font-bold text-[#083D6D] leading-tight">
              {{ contactSection?.title }}
              <span class="text-[#0F76D3]"> {{ contactSection?.highlight }}</span>
            </h1>
            <p v-if="contactSection?.subtitle" class="text-[#4A6080] text-base mt-2 max-w-lg">
              {{ contactSection?.subtitle }}
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            <!-- Left: Contact Info + Form -->
            <div class="space-y-6">
              <ContactForm :contact-section="contactSection" @submit="onSubmit" />
            </div>

            <!-- Right: Map -->
            <ContactMap :contact-section="contactSection" />

          </div>
        </div>
      </section>
    </div>

    <!-- Success Modal -->
    <Transition name="modal">
      <div
        v-if="contactSuccess"
        class="fixed inset-0 z-50 flex items-center justify-center bg-[#083D6D]/40 backdrop-blur-sm px-4"
      >
        <div class="bg-white rounded-2xl shadow-2xl shadow-[#083D6D]/20 max-w-sm w-full p-8 text-center">
          <!-- Check icon -->
          <div class="w-14 h-14 rounded-full bg-[#EDF3FF] border border-[#0F76D3]/20 flex items-center justify-center mx-auto mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-[#0F76D3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-[#083D6D] mb-2">Message Sent!</h3>
          <p class="text-sm text-[#4A6080] mb-6 leading-relaxed">
            Thank you for reaching out. We'll get back to you as soon as possible.
          </p>
          <button
            type="button"
            class="w-full py-3 text-sm font-semibold text-white bg-[#083D6D] hover:bg-[#0F76D3] rounded-xl transition-colors duration-200"
            @click="contactSuccess = false"
          >
            Done
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { contactSection } = useLandingData()

const contactSuccess = ref(false)

function onSubmit() {
  contactSuccess.value = true
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

.page-root, .page-root * {
  font-family: 'Poppins', sans-serif;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>
                    title="Map - Cape Town, Western Cape, South Africa"
                    class="w-full h-full"
                  />
                  <img
                    v-else-if="contactSection?.mapImage"
                    :src="contactSection.mapImage"
                    alt="Map - Cape Town, Western Cape, South Africa"
                    class="w-full h-full object-cover"
                  >
                  <div v-else class="w-full h-full min-h-[280px] flex flex-col items-center justify-center gap-3 text-[#7A95B0] bg-[#EDF3FF]">
                    <div class="w-14 h-14 rounded-2xl bg-white border border-[#c8dcf5] flex items-center justify-center shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-[#0F76D3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <p class="text-sm font-medium text-[#4A6080]">Map coming soon</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>

    <!-- Success Modal -->
    <Transition name="modal">
      <div
        v-if="contactSuccess"
        class="fixed inset-0 z-50 flex items-center justify-center bg-[#083D6D]/40 backdrop-blur-sm px-4"
      >
        <div class="bg-white rounded-2xl shadow-2xl shadow-[#083D6D]/20 max-w-sm w-full p-8 text-center">
          <!-- Check icon -->
          <div class="w-14 h-14 rounded-full bg-[#EDF3FF] border border-[#0F76D3]/20 flex items-center justify-center mx-auto mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-[#0F76D3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-[#083D6D] mb-2">Message Sent!</h3>
          <p class="text-sm text-[#4A6080] mb-6 leading-relaxed">
            Thank you for reaching out. We'll get back to you as soon as possible.
          </p>
          <button
            type="button"
            class="w-full py-3 text-sm font-semibold text-white bg-[#083D6D] hover:bg-[#0F76D3] rounded-xl transition-colors duration-200"
            @click="contactSuccess = false"
          >
            Done
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { contactSection } = useLandingData()

const contactFormRef = ref<HTMLFormElement | null>(null)
const contactSuccess = ref(false)

function onSubmit() {
  contactSuccess.value = true
  contactFormRef.value?.reset()
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

.page-root, .page-root * {
  font-family: 'Poppins', sans-serif;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>