<!-- app.vue -->
<template>
  <div >
    <NuxtPage />
  </div>
</template>

<script setup>
useHead({
  title: "Kathie's Kitchen",
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/images/KathiesIcon.png',
      sizes: '32x32',
    },
    {
      rel: 'apple-touch-icon',
      href: '/images/KathiesIcon.png',
    },
  ],
});
</script>