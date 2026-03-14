<template>
  <div class="min-h-screen flex">
    <!-- Left: full-bleed background image (no blue bg) -->
    <div
      class="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gray-200"
      style="background-image: url('/images/s1.png'); background-size: cover; background-position: center;"
    />

    <!-- Right: login form -->
    <div class="w-full lg:w-1/2 flex flex-col bg-white">
      <div class="flex justify-start p-4 lg:p-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          aria-label="Back to home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span class="text-sm font-medium">Back</span>
        </NuxtLink>
      </div>
      <div class="flex-1 flex items-center justify-center px-6 pb-12">
        <SigninForm @submit="onSubmit" @sign-in-with-google="signInWithGoogle" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Components are now in app/components/
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { login } = useAuth()

function onSubmit(form: any) {
  const result = login(form.email, form.password)
  if (result.success) {
    router.push('/admin')
  }
}

function signInWithGoogle() {
  // Handle Google sign-in logic here
  console.log('Google sign-in not implemented yet')
}
</script>