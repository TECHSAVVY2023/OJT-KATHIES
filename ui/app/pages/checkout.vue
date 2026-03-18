<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header (fixed on scroll) -->
    <CheckoutHeader />

    <main class="pt-16">
      <div class="container mx-auto px-4 py-8">
        <nav aria-label="Breadcrumb">
          <NuxtLink to="/products" class="inline-flex items-center gap-1.5 text-[#1e3a5f] font-medium hover:underline mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Shopping Continue
          </NuxtLink>
        </nav>

        <!-- Empty cart -->
        <section v-if="cartLines.length === 0" class="max-w-md mx-auto text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p class="text-xl text-gray-600 mb-4">Your cart is empty.</p>
          <div class="space-x-4">
            <NuxtLink to="/cart" class="inline-block text-[#2563eb] font-medium hover:underline">View cart</NuxtLink>
            <NuxtLink to="/products" class="inline-block text-[#2563eb] font-medium hover:underline">Continue shopping</NuxtLink>
          </div>
        </section>

        <section v-else class="flex justify-center">
          <div class="grid md:grid-cols-[1fr_400px] gap-10 items-start w-full max-w-5xl mx-auto">
            <!-- Left: Delivery method + Shipping address -->
            <div>
              <CheckoutShippingForm
                v-model:delivery-method="deliveryMethod"
                v-model:save-info="saveInfo"
                v-model:form="form"
                @place-order="placeOrder"
              />

              <!-- Actions -->
              <footer class="flex flex-wrap items-center justify-between gap-4 mt-8">
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
              </footer>
            </div>

            <!-- Right: Order summary -->
            <CheckoutOrderSummary
              :cart-lines="cartLines"
              :item-count="itemCount"
              :subtotal="subtotal"
              :open-line-menu="openLineMenu"
              @toggle-line-menu="toggleLineMenu"
              @remove-item="removeItem"
            />
          </div>
        </section>
      </div>
    </main>

    <!-- Thank You success modal -->
    <CheckoutThankYouModal
      :show="showThankYouModal"
      :order-number="orderNumber"
      @close="closeThankYouModal"
    />
  </div>
</template>

<script setup lang="ts">
const { products } = useProductData()
const { cartItems, itemCount, removeItem, clearCart } = useCart()

const cartCount = computed(() => itemCount.value)

const cartLines = computed(() => {
  const list: { product: import('~/types/catalog').ProductItem; quantity: number }[] = []
  for (const item of cartItems.value) {
    const product = products.value.find(p => p.id === item.productId)
    if (product) list.push({ product: { ...product } as import('~/types/catalog').ProductItem, quantity: item.quantity })
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
