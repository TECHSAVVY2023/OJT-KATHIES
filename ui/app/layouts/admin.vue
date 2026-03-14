<template>
  <div class="min-h-screen w-full flex flex-row bg-[#D3DDFF]">
    <!-- Left sidebar -->
    <AdminSidebar />

    <!-- Main: header + content -->
    <div class="flex-1 flex flex-col min-w-0 min-h-screen" style="padding-left: 280px;">
      <!-- Top header -->
      <AdminHeader 
        :is-dashboard="isDashboard"
        v-model:search-query="searchQuery"
        :header-menu-open="headerMenuOpen"
        :notifications="adminNotifications"
        :messages="adminMessages"
        @close-header-menu="headerMenuOpen = null"
        @toggle-notifications="headerMenuOpen = headerMenuOpen === 'notifications' ? null : 'notifications'"
        @toggle-messages="headerMenuOpen = headerMenuOpen === 'messages' ? null : 'messages'"
      />

      <!-- Page content -->
      <main class="flex-1 overflow-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const searchQuery = ref('')
const headerMenuOpen = ref<'notifications' | 'messages' | null>(null)

interface AdminNotification { id: string; text: string; read: boolean }
const adminNotifications = ref<AdminNotification[]>([
  { id: '1', text: 'New order #1024 received', read: false },
  { id: '2', text: 'Low stock: 555 Tuna Bicol Express', read: false },
  { id: '3', text: 'Customer message from Jane D.', read: false }
])

interface AdminMessage { id: string; subject: string; read: boolean }
const adminMessages = ref<AdminMessage[]>([
  { id: '1', subject: 'Jane D. – Order inquiry', read: false },
  { id: '2', subject: 'John M. – Delivery question', read: false },
  { id: '3', subject: 'Support – New ticket', read: false }
])

const isDashboard = computed(() => route.path === '/admin')
</script>
