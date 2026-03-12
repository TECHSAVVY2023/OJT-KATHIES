<!-- /pages/admin/login.vue -->
<script setup>
import { adminLogin } from '~/composables/useAdminAuth'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'blank'
})

const router = useRouter()
const username = ref('')
const password = ref('')

const login = async () => {
  try {
    await adminLogin(username.value, password.value)
    router.push('/admin/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
    alert('Invalid credentials')
  }
}
</script>


<template>
  <div class="min-h-screen flex items-center justify-center bg-[#FEF3E2] text-[#010024]">
    <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-4 text-center">Admin Login</h1>
      <form @submit.prevent="login" class="space-y-3">
        <input v-model="username" placeholder="Username" class="w-full p-2 border rounded" />
        <input v-model="password" type="password" placeholder="Password" class="w-full p-2 border rounded" />
        <button type="submit"
          class="w-full bg-[#FA812F] hover:bg-[#010024] text-white py-2 rounded-lg font-medium">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

