<template>
  <aside class="lg:sticky lg:top-24">
    <div class="bg-white rounded-2xl border border-[#0F76D3]/12 shadow-sm shadow-[#083D6D]/4 overflow-hidden">

      <!-- Summary header -->
      <div class="bg-[#083D6D] px-6 py-4">
        <h2 class="text-white font-bold text-base">Order Summary</h2>
      </div>

      <div class="p-6 space-y-5">
        <!-- Line items -->
        <div class="space-y-3 text-sm">
          <div class="flex justify-between text-[#4A6080]">
            <span>Items Total ({{ itemCount }})</span>
            <span>R{{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-[#4A6080]">
            <span>Discounts</span>
            <span class="text-emerald-600 font-medium">-R0.00</span>
          </div>
          <div class="flex justify-between text-[#4A6080]">
            <span>Shipping</span>
            <span>R0.00</span>
          </div>
          <div class="flex justify-between text-[#4A6080]">
            <span>Duties & Taxes</span>
            <span>R0.00</span>
          </div>
        </div>

        <!-- Total -->
        <div class="flex justify-between items-center pt-4 border-t border-[#EDF3FF]">
          <span class="font-bold text-[#083D6D]">Total</span>
          <span class="text-2xl font-bold text-[#083D6D]">R {{ subtotal.toFixed(2) }}</span>
        </div>

        <!-- Checkout button -->
        <NuxtLink
          to="/checkout"
          class="block w-full py-3.5 bg-[#083D6D] hover:bg-[#0F76D3] text-white font-semibold text-sm text-center rounded-xl transition-colors duration-200"
        >
          Proceed to Checkout →
        </NuxtLink>

        <!-- Payment methods -->
        <div class="pt-4 border-t border-[#EDF3FF]">
          <p class="text-[10px] font-semibold text-[#7A95B0] uppercase tracking-widest mb-3">Accepted Payments</p>

          <div class="grid grid-cols-2 gap-2">
            <!-- GCash -->
            <div class="flex items-center gap-2.5 bg-[#EDF3FF] border border-[#c8dcf5] rounded-xl px-3 py-2.5">
              <div class="w-7 h-7 rounded-lg bg-[#007AFF] flex items-center justify-center flex-shrink-0">
                <span class="text-white text-[9px] font-black leading-none">G</span>
              </div>
              <div>
                <p class="text-[11px] font-bold text-[#083D6D] leading-none">GCash</p>
                <p class="text-[9px] text-[#7A95B0] mt-0.5">Online</p>
              </div>
            </div>

            <!-- Visa -->
            <div class="flex items-center gap-2.5 bg-[#EDF3FF] border border-[#c8dcf5] rounded-xl px-3 py-2.5">
              <div class="w-7 h-7 rounded-lg bg-[#1A1F71] flex items-center justify-center flex-shrink-0">
                <span class="text-white text-[8px] font-black italic leading-none tracking-tight">VISA</span>
              </div>
              <div>
                <p class="text-[11px] font-bold text-[#083D6D] leading-none">Visa</p>
                <p class="text-[9px] text-[#7A95B0] mt-0.5">Credit / Debit</p>
              </div>
            </div>

            <!-- Mastercard -->
            <div class="flex items-center gap-2.5 bg-[#EDF3FF] border border-[#c8dcf5] rounded-xl px-3 py-2.5">
              <div class="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <span class="absolute left-1 w-4 h-4 rounded-full bg-[#EB001B] opacity-90" />
                <span class="absolute right-1 w-4 h-4 rounded-full bg-[#F79E1B] opacity-90" />
              </div>
              <div>
                <p class="text-[11px] font-bold text-[#083D6D] leading-none">Mastercard</p>
                <p class="text-[9px] text-[#7A95B0] mt-0.5">Credit / Debit</p>
              </div>
            </div>

            <!-- Bank Transfer -->
            <div class="flex items-center gap-2.5 bg-[#EDF3FF] border border-[#c8dcf5] rounded-xl px-3 py-2.5">
              <div class="w-7 h-7 rounded-lg bg-[#083D6D] flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
              </div>
              <div>
                <p class="text-[11px] font-bold text-[#083D6D] leading-none">Bank Transfer</p>
                <p class="text-[9px] text-[#7A95B0] mt-0.5">EFT / Online</p>
              </div>
            </div>
          </div>

          <!-- Secure note -->
          <div class="flex items-center gap-1.5 mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
            </svg>
            <p class="text-[10px] text-[#7A95B0]">Secure & encrypted checkout</p>
          </div>
        </div>

      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  itemCount: number
  subtotal: number
}>()
</script>