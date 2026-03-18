import type { ProductItem } from '~/types/catalog'

export function useCheckout() {
  const { products } = useProductData()
  const { cartItems, itemCount, removeItem, clearCart } = useCart()

  const cartLines = computed(() => {
    const list: { product: ProductItem; quantity: number }[] = []
    for (const item of cartItems.value) {
      const product = products.value.find(p => p.id === item.productId)
      if (product) list.push({ product: { ...product } as ProductItem, quantity: item.quantity })
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

  return {
    cartLines,
    subtotal,
    deliveryMethod,
    saveInfo,
    openLineMenu,
    showThankYouModal,
    orderNumber,
    form,
    toggleLineMenu,
    placeOrder,
    closeThankYouModal
  }
}