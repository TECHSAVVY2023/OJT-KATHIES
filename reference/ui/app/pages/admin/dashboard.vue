<!-- /admin/dashboard.vue -->
<script setup>
import Sidebar from '~/components/admin/Sidebar.vue'
import ProductsTable from '~/components/admin/ProductsTable.vue'
import OrdersTable from '~/components/admin/OrdersTable.vue'
import SubscribersTable from '~/components/admin/SubscribersTable.vue'
import ComingSoonTable from '~/components/admin/ComingSoonTable.vue'

import { adminLogout } from '~/composables/useAdminAuth'
import { useRouter } from 'vue-router'

definePageMeta({
  middleware: ['admin-auth'],
  layout: 'admin'
})

const router = useRouter()
const activeComponent = ref('orders')

const menuItems = [
  { name: 'Products', key: 'products' },
  { name: 'Orders', key: 'orders' },
  { name: 'Subscribers', key: 'subscribers' },
  { name: 'Coming Soon', key: 'comingsoon' },
]

const componentsMap = {
  products: ProductsTable,
  orders: OrdersTable,
  subscribers: SubscribersTable,
  comingsoon: ComingSoonTable,
}

const logout = async () => {
  try {
    await adminLogout()
    router.push('/admin/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-[#FEF3E2] text-[#010024]">

    <!-- Sidebar (bounded + sticky) -->
    <aside class="w-64 shrink-0 sticky top-0 h-screen">
      <Sidebar :menu-items="menuItems" :active="activeComponent" @navigate="activeComponent = $event"
        @logout="logout" />
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 overflow-y-auto p-6 sm:pt-20">
      <h1 class="text-3xl font-bold mb-6 text-[#FA812F]">
        {{menuItems.find(i => i.key === activeComponent)?.name}}
      </h1>

      <ClientOnly>
        <Transition name="fade" mode="out-in">
          <KeepAlive>
            <component :is="componentsMap[activeComponent]" :key="activeComponent" />
          </KeepAlive>
        </Transition>
      </ClientOnly>
    </main>

  </div>
</template>



<style scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
