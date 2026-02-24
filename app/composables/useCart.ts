/** Cart line: product id + quantity */
export interface CartItem {
  productId: string
  quantity: number
}

const CART_STORAGE_KEY = 'kathies-cart'

function loadCart(): CartItem[] {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[]
        return Array.isArray(parsed) ? parsed : []
      }
    } catch {
      // ignore
    }
  }
  return []
}

function saveCart(items: CartItem[]) {
  if (import.meta.client && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore
    }
  }
}

/** Dynamic cart state – add, remove, update quantity, persist to localStorage */
export function useCart() {
  const cartItems = ref<CartItem[]>(loadCart())

  watch(cartItems, (val) => {
    saveCart(val)
  }, { deep: true })

  const itemCount = computed(() =>
    cartItems.value.reduce((sum, i) => sum + i.quantity, 0)
  )

  const uniqueItemCount = computed(() => cartItems.value.length)

  function addItem(productId: string, quantity: number = 1) {
    const existing = cartItems.value.find(i => i.productId === productId)
    if (existing) {
      existing.quantity += quantity
    } else {
      cartItems.value = [...cartItems.value, { productId, quantity }]
    }
  }

  function removeItem(productId: string) {
    cartItems.value = cartItems.value.filter(i => i.productId !== productId)
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity < 1) {
      removeItem(productId)
      return
    }
    cartItems.value = cartItems.value.map(i =>
      i.productId === productId ? { ...i, quantity } : i
    )
  }

  function clearCart() {
    cartItems.value = []
  }

  return {
    cartItems: readonly(cartItems),
    itemCount,
    uniqueItemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }
}
