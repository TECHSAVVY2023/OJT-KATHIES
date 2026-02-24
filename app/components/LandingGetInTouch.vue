<template>
  <div class="mt-16 grid md:grid-cols-2 gap-10 items-center">
    <div>
      <h2 class="text-3xl md:text-4xl font-extrabold mb-2">
        <span class="text-gray-900">{{ contactSection?.title }} </span>
        <span class="text-blue-600">{{ contactSection?.highlight }}</span>
      </h2>
      <p class="text-gray-600 mb-8">
        {{ contactSection?.subtitle }}
      </p>
      <form
        ref="formRef"
        class="bg-white/90 rounded-3xl shadow-lg p-6 space-y-4"
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
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          >
          <textarea
            v-else
            :id="field.id"
            :name="field.name"
            :placeholder="field.placeholder"
            rows="4"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold rounded-md uppercase tracking-wide"
        >
          {{ contactSection?.submitLabel }}
        </button>
      </form>
    </div>
    <div class="w-full flex justify-center items-stretch">
      <div class="w-full rounded-3xl overflow-hidden shadow-lg bg-white aspect-[4/3] min-h-[280px] flex items-center justify-center">
        <iframe
          v-if="contactSection?.mapEmbedUrl"
          :src="contactSection.mapEmbedUrl"
          width="100%"
          height="100%"
          style="border:0; min-height: 280px;"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Map - Cape Town, Western Cape, South Africa"
          class="w-full h-full min-h-[280px]"
        />
        <img
          v-else
          :src="contactSection?.mapImage"
          alt="Map - Cape Town, Western Cape, South Africa"
          class="w-full h-full object-contain"
        >
      </div>
    </div>
  </div>

  <!-- Success popup -->
  <div
    v-if="success"
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
        @click="success = false"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { contactSection } = useLandingData()
const formRef = ref<HTMLFormElement | null>(null)
const success = ref(false)

function onSubmit() {
  success.value = true
  formRef.value?.reset()
}
</script>
