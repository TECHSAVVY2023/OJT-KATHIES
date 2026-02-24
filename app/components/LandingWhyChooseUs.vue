<template>
  <section id="why-choose-us" class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="flex justify-center mb-12">
        <h2 class="text-xl font-bold text-white bg-[#1e3a5f] px-8 py-3 rounded-full">
          {{ whyChooseUs?.title }}
        </h2>
      </div>
      <div class="grid md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto text-center">
        <div class="space-y-10 flex flex-col items-center">
          <div
            v-for="f in whyChooseUs?.features?.slice(0, 2)"
            :key="f.id"
            class="flex flex-col items-center text-center group transition-transform duration-200"
          >
            <div class="w-14 h-14 flex-shrink-0 flex items-center justify-center text-[#1e3a5f] mb-2 transition-transform duration-200 group-hover:scale-110 group-hover:text-[#2563eb]">
              <LandingWhyChooseUsIcon :icon="f.icon" />
            </div>
            <h3 class="font-bold text-[#1e3a5f] text-lg">{{ f.name }}</h3>
            <p class="text-gray-900 text-sm mt-1">{{ f.description }}</p>
          </div>
        </div>
        <div class="flex justify-center">
          <button
            type="button"
            class="flip-card-trigger w-full max-w-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a5f] focus-visible:ring-offset-2 rounded-[3rem]"
            :aria-pressed="flipped"
            aria-label="Flip to see what Kathie's Kitchen is"
            @click="flipped = !flipped"
          >
            <div class="flip-card-inner relative w-full rounded-[3rem]" :class="{ 'flip-card-flipped': flipped }">
              <div class="flip-card-front absolute inset-0 w-full h-full rounded-[3rem] border-2 border-[#5b9bd5] overflow-hidden bg-white min-h-[280px]">
                <img
                  v-if="!imgError"
                  :src="whyChooseUs?.centerImage || '/images/flip.png'"
                  alt="Kathie's Kitchen products"
                  class="w-full h-full object-cover"
                  @error="imgError = true"
                >
                <div v-else class="text-center text-[#1e3a5f]">
                  <p class="font-bold text-lg">Kathie's Kitchen</p>
                  <p class="text-sm mt-1">Filipino Sari-Sari Store</p>
                  <p class="text-xs mt-0.5">IN SOUTH AFRICA</p>
                </div>
              </div>
              <div class="flip-card-back absolute inset-0 w-full rounded-[3rem] border-2 border-[#5b9bd5] bg-white overflow-hidden min-h-[280px] flex items-center justify-center p-6">
                <div class="max-w-sm mx-auto text-center text-gray-800">
                  <h3 class="text-lg font-bold text-[#1e3a5f] mb-3">What Kathie's Kitchen Is</h3>
                  <ul class="list-disc list-inside text-sm space-y-1 text-left">
                    <li>A Filipino online grocery / food shop</li>
                    <li>Provides Filipino snacks, noodles, and pantry items</li>
                    <li>Serves customers in South Africa through delivery and online orders.</li>
                  </ul>
                </div>
              </div>
            </div>
          </button>
        </div>
        <div class="space-y-10 flex flex-col items-center">
          <div
            v-for="f in whyChooseUs?.features?.slice(2, 4)"
            :key="f.id"
            class="flex flex-col items-center text-center group transition-transform duration-200"
          >
            <div class="w-14 h-14 flex-shrink-0 flex items-center justify-center text-[#1e3a5f] mb-2 transition-transform duration-200 group-hover:scale-110 group-hover:text-[#2563eb]">
              <LandingWhyChooseUsIcon :icon="f.icon" />
            </div>
            <h3 class="font-bold text-[#1e3a5f] text-lg">{{ f.name }}</h3>
            <p class="text-gray-900 text-sm mt-1">{{ f.description }}</p>
          </div>
        </div>
      </div>
      <p class="text-center text-gray-500 text-sm mt-4">Click the center image to flip</p>
    </div>
  </section>
</template>

<script setup lang="ts">
const { whyChooseUs } = useLandingData()
const flipped = ref(false)
const imgError = ref(false)
</script>

<style scoped>
.flip-card-trigger { perspective: 1000px; min-height: 320px; }
.flip-card-inner { position: relative; width: 100%; min-height: 320px; transition: transform 0.6s; transform-style: preserve-3d; }
.flip-card-inner.flip-card-flipped { transform: rotateY(180deg); }
.flip-card-front, .flip-card-back { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.flip-card-back { transform: rotateY(180deg); }
</style>
