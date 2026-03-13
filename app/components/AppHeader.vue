<script setup>
import { headerData } from '~/data/headerData.js'
</script>

<template>
  <header class="bg-navbar-bg shadow-md">
    <div class="mx-auto flex h-24 max-w-[1104px] items-center justify-between px-4 sm:px-8">
      <div class="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full">
        <img
          :src="headerData.logo"
          alt="Logo"
          class="h-16 w-16 rounded-full object-cover"
        />
      </div>

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

      <div class="flex items-center space-x-4">
        <template v-for="btn in headerData.buttons" :key="btn.url">
          <NuxtLink
            v-if="btn.show && btn.name === 'Sign In'"
            :to="btn.url"
            class="group relative inline-flex items-center rounded-[4px] bg-white px-5 py-2 font-semibold text-navbar-bg transition hover:bg-blue-700"
          >
            <span>{{ btn.name }}</span>
            <span
              class="absolute right-0 h-0 w-0 border-l-8 border-t-8 border-b-8 border-l-white border-t-transparent border-b-transparent group-hover:border-l-blue-700"
            ></span>
          </NuxtLink>

          <button
            v-else-if="btn.show"
            class="flex items-center justify-center text-navtext hover:text-white"
          >
            <img
              v-if="btn.icon"
              :src="btn.icon"
              :alt="btn.name"
              class="h-6 w-6"
            />
            <span v-else>{{ btn.name }}</span>
          </button>
        </template>
      </div>
    </div>
  </header>
</template>

