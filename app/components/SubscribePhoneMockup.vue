<template>
  <div class="relative flex min-h-[420px] items-center justify-center lg:min-h-[480px]" aria-hidden="true">
    <div class="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(125,184,236,0.2)] bg-[radial-gradient(circle,rgba(125,184,236,0.18)_0%,rgba(77,184,255,0.08)_50%,transparent_75%)] animate-[bg-circle-breathe_5s_ease-in-out_infinite]" />
    <div class="pointer-events-none absolute h-[280px] w-[280px] rounded-full blur-[50px] bg-[radial-gradient(circle,rgba(15,118,211,0.25)_0%,transparent_70%)]" />

    <SubscribeNotifications />
    <SubscribePhone />
    <SubscribeDecorativeCircles />
  </div>
</template>

<script setup lang="ts">
import SubscribeNotifications from './SubscribeNotifications.vue'
import SubscribePhone from './SubscribePhone.vue'
import SubscribeDecorativeCircles from './SubscribeDecorativeCircles.vue'
</script>

<style scoped>
@keyframes bg-circle-breathe {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
  50% { transform: translate(-50%, -50%) scale(1.06); opacity: 1; }
}
</style>