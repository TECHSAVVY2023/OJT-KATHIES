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
        <SignupForm @submit="onSubmit" @sign-up-with-google="signUpWithGoogle" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Components are now in app/components/

function onSubmit(formData: { username: string; phone: string; email: string; password: string }) {
  console.log('Signup form submitted:', formData)
  // TODO: Implement signup logic here
}

function signUpWithGoogle() {
  console.log('Google signup requested')
  // TODO: Implement Google OAuth signup here
}
</script>