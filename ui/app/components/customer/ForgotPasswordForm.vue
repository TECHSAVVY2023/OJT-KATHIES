<template>
  <div class="flex-1 flex items-center justify-center px-6 pb-12">
    <div class="w-full max-w-md">
      <h1 class="text-2xl font-bold mb-1"><span class="text-[#1e3a5f]">Kathie's</span> <span class="text-red-500">Kitchen</span></h1>
      <p class="text-gray-700 mb-8">Reset your password</p>
      <form class="space-y-5" @submit.prevent="$emit('submit', { email })">
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
</template>

<script setup lang="ts">
const email = ref('')
</script>