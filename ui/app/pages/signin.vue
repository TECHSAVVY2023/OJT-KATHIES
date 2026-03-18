<template>
  <AuthLayout>
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
    <SigninForm @submit="onSubmit" @sign-in-with-google="signInWithGoogle" />
  </AuthLayout>
</template>

<script setup lang="ts">
// Components are now in app/components/
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { login } = useAuth()

async function onSubmit(form: any) {
  const result = await login(form.email, form.password)
  if (result.success) {
    router.push('/admin')
  }
}

function signInWithGoogle() {
  // Handle Google sign-in logic here
  console.log('Google sign-in not implemented yet')
}
</script>