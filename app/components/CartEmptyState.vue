<template>
  <div class="bg-white rounded-2xl border border-[#0F76D3]/12 p-16 text-center shadow-sm">
    <div class="w-16 h-16 rounded-2xl bg-[#EDF3FF] flex items-center justify-center mx-auto mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-[#0F76D3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    </div>
    <p class="text-[#083D6D] font-semibold mb-1">Your cart is empty</p>
    <p class="text-[#7A95B0] text-sm mb-5">Add some Filipino favorites to get started.</p>
    <NuxtLink to="/products" class="inline-flex items-center gap-2 bg-[#083D6D] hover:bg-[#0F76D3] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors">
      Browse Products
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </NuxtLink>
  </div>
</template>