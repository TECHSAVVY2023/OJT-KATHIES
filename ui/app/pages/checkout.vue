<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header (fixed on scroll) -->
    <CheckoutHeader />

    <main class="pt-16">
      <div class="container mx-auto px-4 py-8">
        <CheckoutBreadcrumb />

        <!-- Empty cart -->
        <CheckoutEmptyCart v-if="cartLines.length === 0" />

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
              <CheckoutActions @place-order="placeOrder" />
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
const {
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
} = useCheckout()

const { itemCount, removeItem } = useCart()

useHead({ title: "Checkout | Kathie's Kitchen" })
</script>
