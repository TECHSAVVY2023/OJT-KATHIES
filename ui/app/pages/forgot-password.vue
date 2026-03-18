<template>
  <AuthLayout>
    <div class="flex justify-end p-6">
      <NuxtLink to="/signin" class="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100" aria-label="Back">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
      </NuxtLink>
    </div>
    <ForgotPasswordForm @submit="onSubmit" />
  </AuthLayout>
</template>

<script setup lang="ts">
function onSubmit(form: { email: string }) {
  console.log('Forgot password form submitted:', form)
  navigateTo('/signin')
}
useHead({ title: "Forgot Password | Kathie's Kitchen" })
</script>
