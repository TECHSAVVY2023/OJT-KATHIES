<template>
  <aside class="fixed left-0 top-0 z-30 h-screen flex flex-col border-r border-[#20437B]/10 shadow-lg overflow-y-auto bg-white" style="width: 280px;">
    <AdminSidebarHeader />
    
    <nav class="flex-1 py-4 px-3 overflow-y-auto space-y-5">
      <!-- Main Navigation -->
      <NavigationSection title="Main">
        <NuxtLink
          to="/admin"
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
          :class="isActive('/admin') && route.path === '/admin'
            ? 'bg-[#D3DDFF] text-[#20437B] font-medium'
            : 'text-[#20437B]/80 hover:bg-[#D3DDFF]/60 hover:text-[#20437B]'"
        >
          <span class="w-5 h-5 shrink-0 flex items-center justify-center" :class="isActive('/admin') && route.path === '/admin' ? 'text-[#20437B]' : 'text-[#20437B]/70'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </span>
          <span>Dashboard</span>
        </NuxtLink>
        
        <SuperAdminDropdown :is-open="superAdminOpen" @toggle="superAdminOpen = !superAdminOpen" />
      </NavigationSection>

      <!-- Management Navigation -->
      <NavigationSection title="Management">
        <NuxtLink
          v-for="item in managementNavItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
          :class="isActive(item.path)
            ? 'bg-[#D3DDFF] text-[#20437B] font-medium'
            : 'text-[#20437B]/80 hover:bg-[#D3DDFF]/60 hover:text-[#20437B]'"
        >
          <span class="w-5 h-5 shrink-0 flex items-center justify-center" :class="isActive(item.path) ? 'text-[#20437B]' : 'text-[#20437B]/70'">
            <svg v-if="item.icon === 'products'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <svg v-else-if="item.icon === 'coming-soon'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else-if="item.icon === 'category'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <svg v-else-if="item.icon === 'list'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </span>
          <span>{{ item.label }}</span>
        </NuxtLink>
      </NavigationSection>
    </nav>

    <!-- Logout -->
    <div class="p-3 border-t border-[#D3DDFF] shrink-0">
      <button
        type="button"
        class="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-[#20437B] font-medium hover:bg-[#D3DDFF] transition-colors"
        @click="handleLogout"
      >
        <span class="w-5 h-5 shrink-0 flex items-center justify-center text-[#20437B]">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </span>
        <span>Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()
const { logout } = useAuth()
const superAdminOpen = ref(false)

// Keep Super Admin expanded when on any of its child routes
watch(() => route.path, (path) => {
  if (path.startsWith('/admin/logs') || path.startsWith('/admin/customers') || path.startsWith('/admin/subscribe')) {
    superAdminOpen.value = true
  }
}, { immediate: true })

const managementNavItems = [
  { label: 'Products', path: '/admin/products', icon: 'products' },
  { label: 'Coming Soon Product', path: '/admin/coming-soon', icon: 'coming-soon' },
  { label: 'Category', path: '/admin/category', icon: 'category' },
  { label: 'Order List', path: '/admin/orders', icon: 'list' }
]

const isActive = (path: string) => {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}

const handleLogout = () => {
  logout()
  navigateTo('/')
}
</script>
