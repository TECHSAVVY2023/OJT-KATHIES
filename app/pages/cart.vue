<template>
  <div class="page-root min-h-screen bg-[#EDF3FF]">
    <PageHeader active-path="/cart" />

    <div class="pt-16">
      <div class="container mx-auto px-6 py-8 max-w-6xl">

        <!-- Back link -->
        <NuxtLink to="/products" class="inline-flex items-center gap-1.5 text-[#0F76D3] text-sm font-medium hover:text-[#083D6D] transition-colors mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Continue Shopping
        </NuxtLink>

        <!-- Page header -->
        <div class="mb-8">
          <div class="flex items-center gap-2 mb-2">
            <span class="w-5 h-0.5 bg-[#CE1126] inline-block rounded-full" />
            <span class="text-[#CE1126] text-xs font-semibold tracking-[0.18em] uppercase">Your Order</span>
          </div>
          <h1 class="text-3xl font-bold text-[#083D6D]">Shopping Cart</h1>
          <p class="text-[#7A95B0] text-sm mt-1">
            {{ itemCount }} {{ itemCount === 1 ? 'item' : 'items' }} in your cart
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

          <!-- ══ LEFT: Cart Items ══ -->
          <div class="space-y-3">

            <!-- Empty state -->
            <div v-if="cartLines.length === 0" class="bg-white rounded-2xl border border-[#0F76D3]/12 p-16 text-center shadow-sm">
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

            <!-- Cart line items -->
            <div
              v-for="line in cartLines"
              :key="line.product.id"
              class="bg-white rounded-2xl border border-[#0F76D3]/12 p-4 sm:p-5 flex flex-wrap sm:flex-nowrap gap-4 items-center shadow-sm shadow-[#083D6D]/4 hover:shadow-md hover:shadow-[#083D6D]/8 transition-shadow"
            >
              <!-- Product image -->
              <div class="w-16 h-16 sm:w-[72px] sm:h-[72px] flex-shrink-0 rounded-xl overflow-hidden bg-[#EDF3FF] border border-[#c8dcf5] flex items-center justify-center">
                <img
                  :src="line.product.imageUrl"
                  :alt="line.product.name"
                  class="w-full h-full object-contain p-1"
                >
              </div>

              <!-- Name + description -->
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-[#083D6D] text-sm leading-tight truncate">{{ line.product.name }}</h3>
                <p class="text-[#7A95B0] text-xs truncate mt-0.5">{{ lineDescription(line.product) }}</p>
              </div>

              <!-- Qty selector -->
              <div class="flex items-center rounded-xl bg-[#083D6D] overflow-hidden shrink-0">
                <button
                  type="button"
                  class="w-9 h-9 flex items-center justify-center text-white hover:bg-white/10 transition-colors text-lg leading-none"
                  aria-label="Decrease"
                  @click="updateQuantity(line.product.id, line.quantity - 1)"
                >
                  −
                </button>
                <span class="min-w-[2rem] text-center text-sm font-semibold text-white">{{ line.quantity }}</span>
                <button
                  type="button"
                  class="w-9 h-9 flex items-center justify-center text-white hover:bg-white/10 transition-colors text-lg leading-none"
                  aria-label="Increase"
                  @click="updateQuantity(line.product.id, line.quantity + 1)"
                >
                  +
                </button>
              </div>

              <!-- Price -->
              <span class="font-bold text-[#083D6D] shrink-0 w-16 text-right text-sm">{{ line.product.currency }}{{ (line.product.price * line.quantity).toFixed(2) }}</span>

              <!-- Delete -->
              <button
                type="button"
                class="p-2 text-[#CE1126]/50 hover:text-[#CE1126] hover:bg-rose-50 rounded-lg transition-colors flex-shrink-0"
                aria-label="Remove from cart"
                @click="removeItem(line.product.id)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            <!-- Subtotal bar -->
            <div
              v-if="cartLines.length > 0"
              class="bg-white rounded-2xl border border-[#0F76D3]/12 px-6 py-4 flex items-center justify-between shadow-sm"
            >
              <span class="text-[#4A6080] text-sm font-medium">Subtotal ({{ itemCount }} {{ itemCount === 1 ? 'item' : 'items' }})</span>
              <span class="text-xl font-bold text-[#083D6D]">R {{ subtotal.toFixed(2) }}</span>
            </div>
          </div>

          <!-- ══ RIGHT: Order Summary ══ -->
          <aside v-if="cartLines.length > 0" class="lg:sticky lg:top-24">
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

        </div>

        <!-- Recommendations -->
        <section v-if="recommendations.length > 0" class="mt-14 pt-10 border-t border-[#0F76D3]/10">
          <div class="flex items-center gap-2 mb-6">
            <span class="w-5 h-0.5 bg-[#CE1126] inline-block rounded-full" />
            <h2 class="text-lg font-bold text-[#083D6D]">You Might Also Like</h2>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <ProductCard v-for="p in recommendations" :key="p.id" :product="p" />
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { products } = useProductData()
const { cartItems, itemCount, removeItem, updateQuantity } = useCart()

const cartLines = computed(() => {
  const list: { product: import('~/types/catalog').ProductItem; quantity: number }[] = []
  for (const item of cartItems.value) {
    const product = products.value.find(p => p.id === item.productId)
    if (product) list.push({ product, quantity: item.quantity })
  }
  return list
})

const subtotal = computed(() => {
  return cartLines.value.reduce((sum, line) => sum + line.product.price * line.quantity, 0)
})

function lineDescription(product: import('~/types/catalog').ProductItem) {
  if (product.description) return product.description.slice(0, 50) + (product.description.length > 50 ? '...' : '')
  if (product.variant) return product.variant
  return product.category
}

const recommendations = computed(() => {
  const inCartIds = new Set(cartItems.value.map(i => i.productId))
  return products.value.filter(p => !inCartIds.has(p.id)).slice(0, 4)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

.page-root, .page-root * {
  font-family: 'Poppins', sans-serif;
}
</style>