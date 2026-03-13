<template>
  <div class="page-root min-h-screen bg-[#EDF3FF]">
    <PageHeader active-path="/cart" />

    <div class="pt-16">
      <div class="container mx-auto px-6 py-8 max-w-6xl">

        <CartBackLink />
        <CartHeader :item-count="itemCount" />

        <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

          <!-- ══ LEFT: Cart Items ══ -->
          <div class="space-y-3">

            <!-- Empty state -->
            <CartEmptyState v-if="cartLines.length === 0" />

            <!-- Cart line items -->
            <CartItem
              v-for="line in cartLines"
              :key="line.product.id"
              :line="line"
              :line-description="lineDescription"
              @update-quantity="updateQuantity"
              @remove-item="removeItem"
            />

            <!-- Subtotal bar -->
            <CartSubtotal v-if="cartLines.length > 0" :item-count="itemCount" :subtotal="subtotal" />
          </div>

          <!-- ══ RIGHT: Order Summary ══ -->
          <CartOrderSummary v-if="cartLines.length > 0" :item-count="itemCount" :subtotal="subtotal" />

        </div>

        <!-- Recommendations -->
        <CartRecommendations :recommendations="recommendations" />

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

.page-root,
.page-root * {
  font-family: 'Poppins', sans-serif;
}
</style>