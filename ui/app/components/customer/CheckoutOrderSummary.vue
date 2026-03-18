<template>
  <aside class="md:sticky md:top-24">
    <section class="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <header class="border-b border-gray-200 pb-4 mb-4">
        <h2 class="text-lg font-bold text-gray-900">
          Order Summary ({{ itemCount }} {{ itemCount === 1 ? 'Item' : 'Items' }})
        </h2>
      </header>
      
      <div class="space-y-4 mb-6 max-h-[320px] overflow-y-auto" role="list">
        <article
          v-for="line in cartLines"
          :key="line.product.id"
          class="flex gap-3 items-start"
          role="listitem"
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
              <h3 class="font-medium text-gray-900 truncate">{{ line.product.name }}</h3>
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
                    @click="handleRemoveItem(line.product.id); openLineMenu = null"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <p class="text-sm text-gray-500 mt-0.5">Quantity: {{ line.quantity }}</p>
          </div>
          
          <p class="font-bold text-gray-900 shrink-0 text-right">{{ line.product.currency }}{{ line.product.price * line.quantity }}</p>
        </article>
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
      
      <footer class="border-t border-gray-200 mt-4 pt-4 flex justify-between text-lg font-bold text-gray-900">
        <span>Total</span>
        <span>R{{ subtotal }}</span>
      </footer>
      
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
    </section>
  </aside>
</template>

<script setup lang="ts">
interface Props {
  cartLines: { product: import('~/types/catalog').ProductItem; quantity: number }[]
  itemCount: number
  subtotal: number
  openLineMenu: string | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'toggle-line-menu': [productId: string]
  'remove-item': [productId: string]
}>()


function toggleLineMenu(productId: string) {
  emit('toggle-line-menu', productId)
}

function handleRemoveItem(productId: string) {
  emit('remove-item', productId)
}
</script>
