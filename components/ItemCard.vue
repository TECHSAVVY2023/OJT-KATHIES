<template>
  <div class="relative w-full aspect-[4/5] rounded-[16px] overflow-hidden shadow-lg group">
    <!-- Item image -->
    <img
      :src="item.image"
      :alt="item.name"
      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />

    <!-- Gradient overlay on hover -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
    >
      <h3 class="text-white font-bold text-lg leading-snug">{{ item.name }}</h3>
      <p class="text-white text-sm mt-1">{{ item.description }}</p>
      <button
        class="mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-[16px] transition"
      >
        Buy Now
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
    // expects { name: String, description: String, image: String }
  }
})
</script>