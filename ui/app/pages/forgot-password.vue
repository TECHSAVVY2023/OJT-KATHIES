<template>
  <div class="min-h-screen flex">
    <!-- Left: full-bleed background image (no blue bg) -->
    <div
      class="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gray-200"
      style="background-image: url('/images/s1.png'); background-size: cover; background-position: center;"
    />
    <div class="w-full lg:w-1/2 flex flex-col bg-white">
      <div class="flex justify-end p-6">
        <NuxtLink to="/signin" class="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100" aria-label="Back">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </NuxtLink>
      </div>
      <div class="flex-1 flex items-center justify-center px-6 pb-12">
        <div class="w-full max-w-md">
          <h1 class="text-2xl font-bold mb-1"><span class="text-[#1e3a5f]">Kathie's</span> <span class="text-red-500">Kitchen</span></h1>
          <p class="text-gray-700 mb-8">Reset your password</p>
          <form class="space-y-5" @submit.prevent="onSubmit">
            <div>
              <label for="forgot-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="forgot-email"
                v-model="email"
                type="email"
                placeholder="Enter your email"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
              >
            </div>
            <button type="submit" class="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors">
              Send reset link
            </button>
          </form>
          <p class="text-center text-gray-600 mt-6 text-sm">
            <NuxtLink to="/signin" class="text-[#1e3a5f] font-medium hover:underline">Back to Sign in</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
function onSubmit() {
  navigateTo('/signin')
}
useHead({ title: "Forgot Password | Kathie's Kitchen" })
</script>
