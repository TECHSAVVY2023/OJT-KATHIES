<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header (fixed on scroll) -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-[#1e3a5f] text-white shadow">
      <div class="container mx-auto px-4 flex items-center justify-between h-16">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
            <img
              v-if="header?.logo?.iconPath && !headerLogoError"
              :src="header.logo.iconPath"
              :alt="header?.logo?.text"
              class="w-8 h-8 object-contain"
              @error="headerLogoError = true"
            >
            <span v-else class="text-lg font-bold text-[#1e3a5f]">K</span>
          </div>
          <span class="font-bold text-lg">{{ header?.logo.text }}</span>
        </NuxtLink>
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="link in header?.navLinks"
            :key="link.path"
            :to="link.path"
            class="hover:underline"
            :class="{ 'font-semibold underline': $route.path === '/cart' && link.path === '/cart' }"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
        <div class="flex items-center gap-4">
          <NuxtLink to="/cart" class="relative p-2 hover:bg-white/10 rounded flex items-center justify-center text-white" aria-label="Cart">
            <img v-if="header?.cartIconPath" :src="header.cartIconPath" alt="Cart" class="w-6 h-6 object-contain">
            <CartIcon v-else class="w-6 h-6 shrink-0" />
            <span v-if="itemCount > 0" class="absolute -top-0.5 -right-0.5 min-w-[1.25rem] h-5 px-1 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
              {{ itemCount > 99 ? '99+' : itemCount }}
            </span>
          </NuxtLink>
          <NuxtLink
            v-for="link in header?.utilityLinks?.filter(l => l.type === 'button')"
            :key="link.path"
            :to="link.path"
            class="px-4 py-2 rounded bg-white/20 hover:bg-white/30"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </header>

    <div class="pt-16">
    <div class="container mx-auto px-4 py-8">
      <NuxtLink to="/products" class="inline-flex items-center gap-1.5 text-[#1e3a5f] font-medium hover:underline mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Shopping Continue
      </NuxtLink>

      <h1 class="text-2xl font-bold text-gray-900 mb-1">Shopping cart</h1>
      <p class="text-gray-600 text-sm mb-8">
        You have {{ itemCount }} {{ itemCount === 1 ? 'item' : 'items' }} in your cart
      </p>

      <div class="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
        <!-- Left: Cart items -->
        <div class="space-y-4">
          <div
            v-for="line in cartLines"
            :key="line.product.id"
            class="bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex flex-wrap sm:flex-nowrap gap-4 items-center"
          >
            <!-- Circular product image -->
            <div class="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                :src="line.product.imageUrl"
                :alt="line.product.name"
                class="w-full h-full object-contain"
              >
            </div>
            <!-- Name + description -->
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-gray-900 truncate">{{ line.product.name }}</h3>
              <p class="text-gray-500 text-sm truncate mt-0.5">{{ lineDescription(line.product) }}</p>
            </div>
            <!-- Dark blue quantity selector -->
            <div class="flex items-center rounded-lg bg-[#1e3a5f] overflow-hidden shrink-0">
              <button
                type="button"
                class="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                aria-label="Decrease"
                @click="updateQuantity(line.product.id, line.quantity - 1)"
              >
                −
              </button>
              <span class="min-w-[2.5rem] text-center text-sm font-medium text-white">{{ line.quantity }}</span>
              <button
                type="button"
                class="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                aria-label="Increase"
                @click="updateQuantity(line.product.id, line.quantity + 1)"
              >
                +
              </button>
            </div>
            <!-- Price -->
            <span class="font-bold text-gray-900 shrink-0 w-14 text-right">{{ line.product.currency }}{{ line.product.price }}</span>
            <!-- Delete -->
            <button
              type="button"
              class="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Remove from cart"
              @click="removeItem(line.product.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <p v-if="cartLines.length === 0" class="text-center text-gray-500 py-12 bg-white rounded-2xl border border-gray-100">
            Your cart is empty. <NuxtLink to="/products" class="text-[#2563eb] font-medium hover:underline">Continue shopping</NuxtLink>
          </p>

          <!-- Subtotal bar -->
          <div
            v-if="cartLines.length > 0"
            class="bg-white rounded-2xl shadow-md border border-gray-100 px-6 py-4 flex items-center justify-between"
          >
            <span class="text-gray-700 font-medium">Subtotal ({{ itemCount }} {{ itemCount === 1 ? 'Item' : 'Items' }})</span>
            <span class="text-xl font-bold text-gray-900">R {{ subtotal }}</span>
          </div>
        </div>

        <!-- Right: Order summary -->
        <aside v-if="cartLines.length > 0" class="lg:sticky lg:top-24">
          <div class="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <div class="border-b border-gray-200 pb-4 mb-4">
              <h2 class="text-lg font-bold text-gray-900 text-center">Order Summary</h2>
            </div>
            <div class="border-b border-gray-200 mb-4">
              <div class="space-y-2.5 text-sm pb-4">
                <div class="flex justify-between text-gray-600">
                  <span>Items Total ({{ itemCount }})</span>
                  <span>R{{ subtotal }}</span>
                </div>
                <div class="flex justify-between text-gray-600">
                  <span>Discounts</span>
                  <span>-R00</span>
                </div>
                <div class="flex justify-between font-medium text-gray-900">
                  <span>Subtotal</span>
                  <span>R{{ subtotal }}</span>
                </div>
                <div class="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>R00</span>
                </div>
                <div class="flex justify-between text-gray-600">
                  <span>Duties & Taxes</span>
                  <span>R00</span>
                </div>
              </div>
            </div>
            <div class="flex justify-between text-lg font-bold text-gray-900 mb-6">
              <span>Total</span>
              <span>R {{ subtotal }}</span>
            </div>
            <NuxtLink
              to="/checkout"
              class="block w-full py-3.5 bg-[#1e3a5f] hover:bg-[#162d47] text-white font-semibold text-center rounded-xl transition-colors"
            >
              Proceed To Checkout
            </NuxtLink>

            <!-- Payment Details -->
            <div class="mt-6 pt-4 border-t border-gray-200">
              <h3 class="text-sm font-bold text-gray-900 mb-2">Payment Details</h3>
              <p class="text-xs text-gray-600 mb-3">
                Payment will be completed at checkout. We accept the following methods:
              </p>
              <div class="flex gap-3 items-center flex-wrap">
                <span class="inline-flex items-center justify-center w-12 h-8 bg-gray-100 rounded border border-gray-200 text-gray-600 text-xs font-medium">GPay</span>
                <span class="inline-flex items-center justify-center w-12 h-8 bg-blue-50 rounded border border-blue-100 text-blue-700 text-xs font-medium">VISA</span>
                <span class="inline-flex items-center justify-center w-12 h-8 bg-orange-50 rounded border border-orange-100 text-orange-700 text-xs font-medium">MC</span>
                <span class="inline-flex items-center justify-center w-14 h-8 bg-blue-50 rounded border border-blue-100 text-blue-800 text-xs font-medium">PayPal</span>
              </div>
              <p class="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
                Secure payment at checkout
              </p>
            </div>
          </div>
        </aside>
      </div>

      <!-- Recommendations -->
      <section v-if="recommendations.length > 0" class="mt-16 pt-10 border-t border-gray-200">
        <h2 class="text-xl font-bold text-gray-900 text-center mb-8">Recommendations</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <ProductCard
            v-for="p in recommendations"
            :key="p.id"
            :product="p"
          />
        </div>
      </section>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { header } = useLandingData()
const { products } = useProductData()
const { cartItems, itemCount, uniqueItemCount, removeItem, updateQuantity } = useCart()

const headerLogoError = ref(false)

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
