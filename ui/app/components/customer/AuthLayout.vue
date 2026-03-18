<template>
  <div class="min-h-screen flex gap-10">
    <!-- Left: full-bleed background image (no blue bg) -->
    <div
      class="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gray-200"
      style="background-image: url('/images/s1.png'); background-size: cover; background-position: center;"
    />

    <!-- Right: slot for form -->
    <div class="w-full lg:w-1/2 flex flex-col bg-white">
      <slot />
    </div>
  </div>
</template>