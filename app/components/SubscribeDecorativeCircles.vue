<template>
  <div class="pointer-events-none absolute bottom-[-20px] left-1/2 z-[5] -translate-x-1/2">
    <div class="absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(15,118,211,0.15)] animate-[circle-pulse_4s_ease-in-out_infinite]" />
    <div class="absolute left-1/2 top-1/2 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[rgba(15,118,211,0.22)] bg-[radial-gradient(circle,rgba(15,118,211,0.06)_0%,transparent_70%)] animate-[circle-pulse_4s_0.6s_ease-in-out_infinite]" />
    <div class="absolute left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[rgba(15,118,211,0.3)] bg-[radial-gradient(circle,rgba(15,118,211,0.12)_0%,transparent_70%)] animate-[circle-pulse_4s_1.2s_ease-in-out_infinite]" />
  </div>
</template>

<style scoped>
@keyframes circle-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.04); }
}
</style>