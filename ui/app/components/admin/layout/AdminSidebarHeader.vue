<template>
  <div class="p-4 shrink-0 border-b border-[#D3DDFF]">
    <NuxtLink to="/admin" class="block">
      <div class="flex flex-col items-center text-center">
        <div class="w-14 h-14 rounded-full bg-[#D3DDFF] border border-[#20437B]/20 flex items-center justify-center overflow-hidden shrink-0 shadow-sm mx-auto mb-2">
          <img v-if="footer?.logo?.imagePath" :src="footer.logo.imagePath" alt="Kathie's Kitchen" class="w-10 h-10 object-contain">
          <span v-else class="text-2xl font-bold text-[#20437B]">K</span>
        </div>
        <span class="font-bold text-[#20437B] text-lg">Kathie's Kitchen</span>
        <div class="mt-2 rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wide bg-white/80 border border-[#20437B]/15">
          <span class="bg-gradient-to-r from-[#20437B] to-[#dc2626] bg-clip-text text-transparent">
            Bringing Home Closer, One Bite at a Time
          </span>
        </div>
        <span class="text-sm font-semibold text-[#20437B] mt-3 block">Admin Dashboard</span>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { footer } = useLandingData()
</script>
