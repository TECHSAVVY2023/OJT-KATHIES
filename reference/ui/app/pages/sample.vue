<script setup>
const config = useRuntimeConfig()
const email = ref('')
const success = ref(false)
const errorMsg = ref('')

const submit = async () => {
  try {
    const res = await $fetch(`${config.public.apiBase}/subscribers/`, {
      method: 'POST',
      body: { email: email.value },
    })
    success.value = true
    email.value = ''
  } catch (error) {
    errorMsg.value = 'Something went wrong!'
    console.error(error)
  }
}
</script>

<template>
  <div class="p-4">
    <h2>Subscribe to our newsletter</h2>
    <input
      v-model="email"
      type="email"
      placeholder="Enter your email"
      class="border px-4 py-2 rounded"
    />
    <button
      @click="submit"
      class="bg-[#FA812F] text-white px-4 py-2 rounded ml-2"
    >
      Subscribe
    </button>

    <p v-if="success" class="text-green-600 mt-2">Subscribed successfully!</p>
    <p v-if="errorMsg" class="text-red-600 mt-2">{{ errorMsg }}</p>
  </div>
</template>
