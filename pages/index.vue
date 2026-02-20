<template>
  <div>
    <!-- Hero section -->
  <section class="h-screen bg-gradient-to-b from-[#083D6D] to-[#0F76D3] flex flex-col justify-start items-center text-white pt-20">
  <h1 class="text-5xl font-bold font-sans text-center">
    Bringing home closer, one bite at a time 
  </h1>
  <p class="mt-4 text-xl text-center whitespace-nowrap">
    Authentic Filipino flavors, crafted with love and delivered fresh to your doorstep.
  </p>  
  <!-- Shop Now button -->
      <button class="mt-6 bg-[#E6EAED] hover:bg-gradient-to-b from-[#D3DDFF] to-[#7F8599] text-gray-900 font-semibold px-6 py-3 rounded-[24px] transition">
        SHOP NOW!
      </button>
</section>

    <!-- Secondary section -->
    <section class="min-h-screen bg-white flex items-center justify-center p-8">
      <p class="text-gray-800 font-sans text-lg">
        Scroll content line 1
      </p>
      <p v-for="n in 29" :key="n" class="text-gray-800 font-sans text-lg">
        Scroll content line {{ n + 1 }}
      </p>


    </section>
  </div>
</template>
