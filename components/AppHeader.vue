<script setup>
import { headerData } from '~/data/headerData.js'
</script>

<template>
  <header class="bg-navbar-bg shadow-md">
    <div class="max-w-[1104px] mx-auto flex items-center justify-between h-24 px-4 sm:px-8">

  <!-- Logo -->
<div class="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
  <img 
    :src="headerData.logo" 
    alt="Logo" 
    class="w-16 h-16 object-cover rounded-full" 
  />
</div>


      <!-- Navigation links -->
      <nav class="flex space-x-6">
        <NuxtLink
          v-for="link in headerData.navLinks"
          :key="link.url"
          :to="link.url"
          class="text-navtext hover:text-white hover:underline"
        >
          {{ link.name }}
        </NuxtLink>
      </nav>

      <!-- Right side buttons -->
      <div class="flex items-center space-x-4">

        <template v-for="btn in headerData.buttons" :key="btn.url">

          <!-- Special triangular button for Sign In -->
          <NuxtLink
            v-if="btn.show && btn.name === 'Sign In'"
            :to="btn.url"
            class="relative inline-flex items-center px-5 py-2 bg-white text-navbar-bg font-semibold group hover:bg-blue-700 transition rounded-[4px]"
          >
            <span>{{ btn.name }}</span>
            <!-- Triangle on the right -->
            <span
              class="absolute right-0 w-0 h-0 border-t-6 border-b-6 border-l-6 border-t-transparent border-b-transparent border-l-white"
            ></span>
          </NuxtLink>

          <!-- Other buttons (Cart, etc.) -->
          <button
            v-else-if="btn.show"
            class="text-navtext hover:text-white flex items-center justify-center"
          >
            <img
              v-if="btn.icon"
              :src="btn.icon"
              :alt="btn.name"
              class="w-6 h-6"
            />
            <span v-else>{{ btn.name }}</span>
          </button>

        </template>

      </div>
    </div>
  </header>
</template>
