<template>
  <div class="flex flex-col gap-[22px] lg:items-start items-center lg:text-left text-center">
    <h2 class="m-0 text-[clamp(36px,4vw,56px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#E6EAED]">
      Don't Miss<br>
      <span class="bg-[linear-gradient(90deg,#4db8ff,#E6EAED,#7DB8EC,#fff)] bg-clip-text text-transparent [background-size:300%] animate-[text-shimmer_5s_1s_linear_infinite]">a Bite!</span>
    </h2>

    <p class="m-0 max-w-[420px] text-[14.5px] leading-[1.78] text-[rgba(230,234,237,0.6)]">
      Be the first to know when new Filipino favorites hit our shelves — exclusive deals, new arrivals, and seasonal promos, straight to your inbox.
    </p>

    <SubscribeForm />
  </div>
</template>

<script setup lang="ts">
import SubscribeForm from '../customer/SubscribeForm.vue'
</script>

<style scoped>
@keyframes text-shimmer {
  0%   { background-position: 0% center; }
  100% { background-position: 300% center; }
}
</style>