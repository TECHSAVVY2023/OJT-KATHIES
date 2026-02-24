<template>
  <div class="min-h-screen flex">
    <!-- Left: full-bleed background image (no blue bg) -->
    <div
      class="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gray-200"
      style="background-image: url('/images/s1.png'); background-size: cover; background-position: center;"
    />

    <!-- Right: signup form -->
    <div class="w-full lg:w-1/2 flex flex-col bg-white">
      <div class="flex justify-end p-4 lg:p-6">
        <NuxtLink
          to="/"
          class="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          aria-label="Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </NuxtLink>
      </div>
      <div class="flex-1 flex items-center justify-center px-6 pb-12">
        <div class="w-full max-w-md">
          <h1 class="text-2xl font-bold mb-1">
            <span class="text-[#1e3a5f]">Kathie's</span>
            <span class="text-red-500"> Kitchen</span>
          </h1>
          <p class="text-gray-700 mb-8">Create your account!</p>

          <form class="space-y-5" @submit.prevent="onSubmit">
            <div>
              <label for="signup-username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                id="signup-username"
                v-model="form.username"
                type="text"
                placeholder="Enter your username"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
              >
            </div>
            <div>
              <label for="signup-phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                id="signup-phone"
                v-model="form.phone"
                type="tel"
                placeholder="Enter your phone"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
              >
            </div>
            <div>
              <label for="signup-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="signup-email"
                v-model="form.email"
                type="email"
                placeholder="Enter your email"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
              >
            </div>
            <div>
              <label for="signup-password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div class="relative">
                <input
                  id="signup-password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  class="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
                >
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  aria-label="Toggle password visibility"
                  @click="showPassword = !showPassword"
                >
                  <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
            <button
              type="submit"
              class="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors"
            >
              Sign Up
            </button>
          </form>

          <p class="text-center text-gray-500 my-6">Or</p>
          <button
            type="button"
            class="w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            @click="signUpWithGoogle"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </button>

          <p class="text-center text-gray-600 mt-8 text-sm">
            Already have an account?
            <NuxtLink to="/signin" class="text-[#1e3a5f] font-medium hover:underline">Login</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  username: '',
  phone: '',
  email: '',
  password: ''
})
const showPassword = ref(false)

function onSubmit() {
  navigateTo('/signin')
}

function signUpWithGoogle() {
  navigateTo('/signin')
}

useHead({ title: "Sign Up | Kathie's Kitchen" })
</script>
