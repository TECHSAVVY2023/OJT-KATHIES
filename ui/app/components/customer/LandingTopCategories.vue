<template>
  <section class="relative overflow-hidden bg-[#0F4C81] py-[88px] pb-[76px] font-sans">
    <!-- Ambient BG -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 opacity-100 bg-topcat-texture"
    />
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -left-[150px] -top-[250px] h-[600px] w-[600px] rounded-full blur-[90px] bg-[radial-gradient(circle,rgba(15,118,211,0.22)_0%,transparent_70%)]"
    />
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -bottom-[200px] -right-[80px] h-[450px] w-[450px] rounded-full blur-[90px] bg-[radial-gradient(circle,rgba(8,61,109,0.5)_0%,transparent_70%)]"
    />
    <div
      aria-hidden="true"
      class="pointer-events-none absolute right-[12%] top-[40%] h-[300px] w-[300px] rounded-full blur-[90px] bg-[radial-gradient(circle,rgba(200,50,58,0.1)_0%,transparent_70%)]"
    />

    <div class="mx-auto w-full max-w-[1240px] px-6 sm:px-8">
      <!-- Header -->
      <div class="mb-[52px] flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <div class="flex flex-col gap-2.5">
          <div class="flex items-center gap-2">
            <span class="h-1.5 w-1.5 rounded-full bg-[#C8323A] shadow-[0_0_8px_rgba(200,50,58,0.7)]" />
            <span class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#7DB8EC]">Curated Collections</span>
          </div>
          <h2 class="text-[clamp(24px,3.5vw,38px)] font-bold leading-[1.15] tracking-[-0.01em] text-[#E6EAED]">
            Shop From
            <span class="relative inline-block text-[#E6EAED]">
              Top Categories
              <svg class="absolute -bottom-1.5 left-0 h-[10px] w-full" viewBox="0 0 220 10" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M2 7C55 2 110 1.5 218 5" stroke="url(#blue-gradient)" stroke-width="3" stroke-linecap="round"/>
                <defs>
                  <linearGradient id="blue-gradient" x1="0" y1="0" x2="220" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#0F76D3" stop-opacity="0"/>
                    <stop offset="25%" stop-color="#0F76D3"/>
                    <stop offset="65%" stop-color="#C8323A"/>
                    <stop offset="100%" stop-color="#C8323A" stop-opacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>
        </div>
        <NuxtLink
          to="/products"
          class="group relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-white/20 bg-white/10 px-[22px] py-2.5 text-[12.5px] font-medium tracking-[0.04em] text-[#E6EAED] transition hover:border-white/40 hover:text-white hover:shadow-[0_0_20px_rgba(15,118,211,0.2)]"
        >
          <span class="absolute inset-0 origin-left scale-x-0 bg-white/10 transition-transform duration-300 group-hover:scale-x-100" />
          <span>Explore All</span>
          <svg class="relative z-[1] h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>
      </div>

      <!-- Categories track -->
      <div class="flex gap-6 overflow-x-auto pb-2.5 [scrollbar-width:thin] [scrollbar-color:rgba(15,118,211,0.25)_transparent] [&::-webkit-scrollbar]:h-[3px] [&::-webkit-scrollbar-thumb]:rounded-sm [&::-webkit-scrollbar-thumb]:bg-[rgba(15,118,211,0.3)] [&::-webkit-scrollbar-track]:bg-transparent">
        <div
          v-for="(cat, index) in categories"
          :key="cat.id"
          class="shrink-0 animate-[fadeUp_0.5s_cubic-bezier(0.22,1,0.36,1)_both]"
          :style="{ animationDelay: `${index * 65}ms` }"
        >
          <NuxtLink :to="`/products?category=${encodeURIComponent(cat.name)}`" class="group flex cursor-pointer flex-col items-center gap-3.5 no-underline">
            <div class="relative flex h-[116px] w-[116px] items-center justify-center">
              <div class="absolute inset-[-5px] rounded-full border border-dashed border-[rgba(15,118,211,0.2)] transition duration-500 group-hover:rotate-[60deg] group-hover:border-[rgba(15,118,211,0.45)]" />
              <div
                class="relative z-[1] flex h-[116px] w-[116px] items-center justify-center overflow-hidden rounded-full border border-white/15 bg-[linear-gradient(145deg,#1A6DB5_0%,#0F5A9E_55%,#0A4880_100%)] shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.15)] transition duration-300 [transform:translateZ(0)] group-hover:-translate-y-[5px] group-hover:scale-[1.05] group-hover:border-white/35 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.15),0_0_28px_rgba(15,118,211,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]"
              >
                <img
                  v-if="cat.image"
                  :src="cat.image"
                  :alt="cat.name"
                  class="relative z-[2] h-[66%] w-[66%] object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition duration-300 group-hover:scale-[1.13]"
                >
                <span v-else class="relative z-[2] text-[28px]">📦</span>
              </div>
              <div class="pointer-events-none absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(15,118,211,0.12)_0%,transparent_70%)] opacity-0 transition duration-300 group-hover:opacity-100" />
              <div class="pointer-events-none absolute right-1.5 top-1.5 z-[3] h-2.5 w-2.5 scale-[0.4] rounded-full border-2 border-[#0F4C81] bg-[#C8323A] opacity-0 shadow-[0_0_8px_rgba(200,50,58,0.5)] transition duration-300 group-hover:scale-100 group-hover:opacity-100" />
            </div>
            <div class="flex items-center gap-1">
              <p class="m-0 whitespace-nowrap text-xs font-medium tracking-[0.02em] text-[rgba(230,234,237,0.7)] transition duration-300 group-hover:text-[#E6EAED]">
                {{ cat.name }}
              </p>
              <span class="translate-x-[-5px] text-[13px] text-[#7DB8EC] opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">→</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { categories } = useCategoriesData()
</script>

<style scoped>
.bg-topcat-texture {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230F76D3' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/svg%3E");
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>