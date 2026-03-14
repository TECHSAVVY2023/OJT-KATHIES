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
          <span class="font-bold text-lg">{{ header?.logo?.text }}</span>
        </NuxtLink>
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="link in header?.navLinks"
            :key="link.path"
            :to="link.path"
            class="hover:underline"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
        <div class="flex items-center gap-4">
          <NuxtLink to="/cart" class="relative p-2 hover:bg-white/10 rounded flex items-center justify-center text-white" aria-label="Cart">
            <img v-if="header?.cartIconPath" :src="header.cartIconPath" alt="Cart" class="w-6 h-6 object-contain">
            <CartIcon v-else class="w-6 h-6 shrink-0" />
            <span v-if="cartCount > 0" class="absolute -top-0.5 -right-0.5 min-w-[1.25rem] h-5 px-1 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">{{ cartCount > 99 ? '99+' : cartCount }}</span>
          </NuxtLink>
          <NuxtLink
            v-for="link in header?.utilityLinks?.filter((l: { type: string }) => l.type === 'button')"
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

      <!-- Empty cart -->
      <div v-if="cartLines.length === 0" class="max-w-md mx-auto text-center py-16 bg-white rounded-2xl border border-gray-100">
        <p class="text-xl text-gray-600 mb-4">Your cart is empty.</p>
        <NuxtLink to="/cart" class="inline-block text-[#2563eb] font-medium hover:underline mr-4">View cart</NuxtLink>
        <NuxtLink to="/products" class="inline-block text-[#2563eb] font-medium hover:underline">Continue shopping</NuxtLink>
      </div>

      <div v-else class="flex justify-center">
        <div class="grid md:grid-cols-[1fr_400px] gap-10 items-start w-full max-w-5xl mx-auto">
          <!-- Left: Delivery method + Shipping address -->
          <div class="space-y-8">
          <!-- Delivery Method -->
          <div class="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Delivery Method</h2>
            <div class="flex gap-6">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="deliveryMethod"
                  type="radio"
                  name="delivery"
                  value="ship"
                  class="w-4 h-4 text-[#1e3a5f] border-gray-300 focus:ring-[#1e3a5f]"
                >
                <span class="text-gray-900 font-medium">Ship</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="deliveryMethod"
                  type="radio"
                  name="delivery"
                  value="pickup"
                  class="w-4 h-4 text-[#1e3a5f] border-gray-300 focus:ring-[#1e3a5f]"
                >
                <span class="text-gray-900 font-medium">Pick up</span>
              </label>
            </div>
          </div>

          <!-- Shipping Address -->
          <div class="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">Shipping Address</h2>
            <form id="checkout-form" class="space-y-4" @submit.prevent="placeOrder">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
                    placeholder="First Name"
                  >
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
                    placeholder="Last Name"
                  >
                </div>
              </div>
              <div>
                <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Country / Region</label>
                <select
                  id="country"
                  v-model="form.country"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none bg-white"
                >
                  <option value="">Select country</option>
                  <option value="ZA">South Africa</option>
                  <option value="PH">Philippines</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                </select>
              </div>
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  id="address"
                  v-model="form.address"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
                  placeholder="Address"
                >
              </div>
              <div>
                <label for="apartment" class="block text-sm font-medium text-gray-700 mb-1">Apartment, Suite, etc.</label>
                <input
                  id="apartment"
                  v-model="form.apartment"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
                  placeholder="Apartment, Suite, etc."
                >
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    id="city"
                    v-model="form.city"
                    type="text"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
                    placeholder="City"
                  >
                </div>
                <div>
                  <label for="province" class="block text-sm font-medium text-gray-700 mb-1">Province</label>
                  <select
                    id="province"
                    v-model="form.province"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none bg-white"
                  >
                    <option value="">Select province</option>
                    <option value="Gauteng">Gauteng</option>
                    <option value="Western Cape">Western Cape</option>
                    <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                    <option value="Eastern Cape">Eastern Cape</option>
                  </select>
                </div>
                <div>
                  <label for="postalCode" class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    id="postalCode"
                    v-model="form.postalCode"
                    type="text"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
                    placeholder="Postal Code"
                  >
                </div>
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
                  placeholder="Phone"
                >
              </div>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  v-model="saveInfo"
                  type="checkbox"
                  class="w-4 h-4 rounded border-gray-300 text-[#1e3a5f] focus:ring-[#1e3a5f]"
                >
                <span class="text-sm text-gray-700">Save This Information For Next Time</span>
              </label>
            </form>
          </div>

          <!-- Actions -->
          <div class="flex flex-wrap items-center justify-between gap-4">
            <NuxtLink to="/cart" class="inline-flex items-center gap-1.5 text-[#1e3a5f] font-medium hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back To Cart
            </NuxtLink>
            <button
              type="submit"
              @click.prevent="placeOrder"
              form="checkout-form"
              class="px-8 py-3.5 bg-[#1e3a5f] hover:bg-[#162d47] text-white font-semibold rounded-xl transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>

        <!-- Right: Order summary -->
        <aside class="md:sticky md:top-24">
          <div class="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <div class="border-b border-gray-200 pb-4 mb-4">
              <h2 class="text-lg font-bold text-gray-900">
                Order Summary ({{ itemCount }} {{ itemCount === 1 ? 'Item' : 'Items' }})
              </h2>
            </div>
            <div class="space-y-4 mb-6 max-h-[320px] overflow-y-auto">
              <div
                v-for="line in cartLines"
                :key="line.product.id"
                class="flex gap-3 items-start"
              >
                <div class="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    :src="line.product.imageUrl"
                    :alt="line.product.name"
                    class="w-full h-full object-contain"
                  >
                </div>
                <div class="flex-1 min-w-0 flex flex-col">
                  <div class="flex items-start justify-between gap-2">
                    <p class="font-medium text-gray-900 truncate">{{ line.product.name }}</p>
                    <div class="relative shrink-0">
                      <button
                        type="button"
                        class="p-1 text-gray-400 hover:text-gray-600 rounded"
                        aria-label="Options"
                        @click.stop="toggleLineMenu(line.product.id)"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                      </button>
                      <div
                        v-if="openLineMenu === line.product.id"
                        class="absolute right-0 top-full mt-1 py-1 bg-white rounded-lg shadow-lg border border-gray-100 z-10 min-w-[120px]"
                        @click.stop
                      >
                        <NuxtLink
                          :to="`/product/${line.product.id}`"
                          class="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Edit
                        </NuxtLink>
                        <button
                          type="button"
                          class="block w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                          @click="removeItem(line.product.id); openLineMenu = null"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-500 mt-0.5">Quantity: {{ line.quantity }}</p>
                </div>
                <p class="font-bold text-gray-900 shrink-0 text-right">{{ line.product.currency }}{{ line.product.price * line.quantity }}</p>
              </div>
            </div>
            <div class="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div class="flex justify-between text-gray-600">
                <span>Items Total ({{ itemCount }})</span>
                <span>R{{ subtotal }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Discounts</span>
                <span>-R00,00</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>R{{ subtotal }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>R00,00</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Duties & Taxes</span>
                <span>R00,00</span>
              </div>
            </div>
            <div class="border-t border-gray-200 mt-4 pt-4 flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>R{{ subtotal }}</span>
            </div>
            <div class="mt-6 pt-4 border-t border-gray-100 flex items-start gap-3">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </span>
              <div>
                <p class="font-semibold text-gray-900">Buyer Protection</p>
                <p class="text-sm text-gray-600">We Keep Your Information And Payment Safe</p>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-100 flex items-start gap-3">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                </svg>
              </span>
              <div>
                <p class="font-semibold text-gray-900">Help</p>
                <p class="text-sm text-gray-600">Help Center, Disputes & Reports, Buyer Protection, Report IPR Infringement, Regulated Information</p>
              </div>
            </div>
          </div>
        </aside>
        </div>
      </div>
    </div>

    <!-- Thank You success modal -->
    <Teleport to="body">
      <div
        v-if="showThankYouModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click.self="closeThankYouModal"
      >
        <div class="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <span class="text-lg font-semibold text-gray-800">Success</span>
            <button
              type="button"
              class="p-2 text-[#1e3a5f] hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
              @click="closeThankYouModal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="px-6 py-8 text-center">
            <p class="text-2xl font-bold text-green-600 mb-4">
              Thank You For Your Order!
            </p>
            <p class="text-gray-800 mb-2">
              Order #<span class="font-semibold text-[#1e3a5f]">{{ orderNumber }}</span> Has Been Placed
            </p>
            <p class="text-gray-600 text-sm">
              You Will Receive An Email Confirmation Shortly At Your Email
            </p>
          </div>
        </div>
      </div>
    </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
const { header } = useLandingData()
const { products } = useProductData()
const { cartItems, itemCount, removeItem, clearCart } = useCart()

const headerLogoError = ref(false)
const cartCount = computed(() => itemCount.value)

const cartLines = computed(() => {
  const list: { product: import('~/types/catalog').ProductItem; quantity: number }[] = []
  for (const item of cartItems.value) {
    const product = products.value.find(p => p.id === item.productId)
    if (product) list.push({ product, quantity: item.quantity })
  }
  return list
})

const subtotal = computed(() =>
  cartLines.value.reduce((sum, line) => sum + line.product.price * line.quantity, 0)
)

const deliveryMethod = ref<'ship' | 'pickup'>('ship')
const saveInfo = ref(false)
const openLineMenu = ref<string | null>(null)
const showThankYouModal = ref(false)
const orderNumber = ref('')

const CHECKOUT_STORAGE_KEY = 'kathies-checkout-form'

const form = ref({
  firstName: '',
  lastName: '',
  country: '',
  address: '',
  apartment: '',
  city: '',
  province: '',
  postalCode: '',
  phone: ''
})

let closeMenu: () => void
onMounted(() => {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    try {
      const saved = localStorage.getItem(CHECKOUT_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as typeof form.value
        if (parsed && typeof parsed === 'object') {
          form.value = { ...form.value, ...parsed }
        }
      }
    } catch {
      // ignore
    }
  }
  closeMenu = () => { openLineMenu.value = null }
  document.addEventListener('click', closeMenu)
})
onUnmounted(() => {
  if (typeof closeMenu !== 'undefined') document.removeEventListener('click', closeMenu)
})

function toggleLineMenu(productId: string) {
  openLineMenu.value = openLineMenu.value === productId ? null : productId
}

function placeOrder() {
  if (saveInfo.value && import.meta.client && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(form.value))
    } catch {
      // ignore
    }
  }
  orderNumber.value = String(Math.floor(100000000 + Math.random() * 900000000))
  clearCart()
  showThankYouModal.value = true
}

function closeThankYouModal() {
  showThankYouModal.value = false
  navigateTo('/')
}

useHead({ title: "Checkout | Kathie's Kitchen" })
</script>
