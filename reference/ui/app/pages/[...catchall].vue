<template>
    <div class="min-h-screen flex flex-col text-[#010024] bg-gradient-to-br from-[#FEF3E2] via-[#FAB12F] to-[#FA812F]">
        <!-- Header -->
        <header
            class="font-righteous py-3 px-6 flex justify-center items-center bg-white/70 backdrop-blur-sm shadow-md">
            <NuxtLink to="/">
                <div class="flex items-center gap-8">
                    <img :src="`${BASE_ASSETS_URL}/images/kathieslogo.png`" class="w-12 drop-shadow-lg rounded-full" />
                    <div>
                        <p class="text-xl font-extrabold tracking-wide">
                            Kathie’s <span class="text-[#DD0303] drop-shadow-sm">Kitchen</span>
                        </p>
                        <p class="font-kaushan text-xs text-gray-700">Bringing Home Closer, One Bite at a Time</p>
                    </div>
                </div>
            </NuxtLink>
        </header>

        <!-- Hero -->
        <main class="flex-1 flex items-center justify-center relative overflow-hidden">
            <!-- Background Images -->
            <transition-group name="fade" tag="div" class="absolute inset-0">
                <div v-for="(bg, i) in [currentBg]" :key="bg" class="absolute inset-0 bg-cover bg-center brightness-90"
                    :style="{ backgroundImage: `url(${bg})` }" />
            </transition-group>

            <!-- Overlay gradient -->
            <div class="absolute inset-0 bg-gradient-to-tr from-[#010024]/60 via-[#DD0303]/20 to-[#FA812F]/40" />

            <!-- Text -->
            <div class="relative z-10 text-center text-[#FEF3E2] px-6">
                <h1 class="font-righteous inline-block text-7xl md:text-6xl font-extrabold mb-6 tracking-wide 
         bg-gradient-to-r from-[#FAB12F] via-[#FA812F] to-[#DD0303] 
         bg-clip-text text-transparent drop-shadow-xl pb-10">
                    Coming Soon
                </h1>

                <p class="font-kaushan text-4xl md:text-3xl max-w-xl mx-auto mb-8 text-[#FEF3E2] drop-shadow-md">
                    We’re cooking up something flavorful and exciting. Stay tuned for Kathie’s Kitchen launch!
                </p>
            </div>
        </main>

        <!-- Footer -->
        <footer class="bg-[#010024] text-[#FEF3E2] py-6 text-center shadow-inner">
            <p class="text-sm">© 2025 Kathie’s Kitchen. All Rights Reserved.</p>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { BASE_ASSETS_URL } from '@/utils/api'

const heroimages = [
    "https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.kathieskitchen.com/images/bg/BG3.png",
    "https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.kathieskitchen.com/images/bg/BG4.jpg",
    "https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.kathieskitchen.com/images/bg/BG5.jpg",
    "https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.kathieskitchen.com/images/bg/BG6.png",
    "https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.kathieskitchen.com/images/bg/BG7.png",
];

const currentBg = ref(heroimages[0]);

function shuffleBackground() {
    setInterval(() => {
        let next;
        do {
            next = heroimages[Math.floor(Math.random() * heroimages.length)];
        } while (next === currentBg.value); // avoid repeating same image immediately

        currentBg.value = next;
    }, 5000);
}

onMounted(() => {
    // set a random bg immediately on mount
    currentBg.value = heroimages[Math.floor(Math.random() * heroimages.length)];
    shuffleBackground();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
