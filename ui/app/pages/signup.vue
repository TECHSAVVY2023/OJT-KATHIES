<template>
  <AuthLayout>
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
    <div class="max-w-md mx-auto w-full">
      <p v-if="signupError" class="text-sm text-red-600 mb-4">{{ signupError }}</p>
      <SignupForm @submit="onSubmit" @sign-up-with-google="signUpWithGoogle" />
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
// Components are now in app/components/
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { signup } = useAuth()

const signupError = ref('')

async function onSubmit(formData: { username: string; phone: string; email: string; password: string }) {
  const result = await signup(formData.username, formData.phone, formData.email, formData.password)
  if (result.success) {
    signupError.value = ''
    router.push('/admin')
  } else {
    signupError.value = result.error || 'Signup failed. Please try again.'
  }
}

function signUpWithGoogle() {
  console.log('Google signup requested')
  // TODO: Implement Google OAuth signup here
}
</script>