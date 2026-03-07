<template>
  <div class="min-h-screen w-full flex flex-row bg-[#D3DDFF]">
    <!-- Left sidebar - fixed, design colors #20437B and #D3DDFF -->
    <aside class="fixed left-0 top-0 z-30 h-screen flex flex-col border-r border-[#20437B]/10 shadow-lg overflow-y-auto bg-white" style="width: 280px;">
      <!-- Branding: logo + tagline banner + Admin Dashboard -->
      <div class="p-4 shrink-0 border-b border-[#D3DDFF]">
        <NuxtLink to="/admin" class="block">
          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-full bg-[#D3DDFF] border border-[#20437B]/20 flex items-center justify-center overflow-hidden shrink-0 shadow-sm mx-auto mb-2">
              <img v-if="footer?.logo?.imagePath" :src="footer.logo.imagePath" alt="Kathie's Kitchen" class="w-10 h-10 object-contain">
              <span v-else class="text-2xl font-bold text-[#20437B]">K</span>
            </div>
            <span class="font-bold text-[#20437B] text-lg">Kathie's Kitchen</span>
            <div class="mt-2 rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wide bg-white/80 border border-[#20437B]/15">
              <span class="tagline-gradient-text">Bringing Home Closer, One Bite at a Time</span>
            </div>
            <span class="text-sm font-semibold text-[#20437B] mt-3 block">Admin Dashboard</span>
          </div>
        </NuxtLink>
      </div>
      <nav class="flex-1 py-4 px-3 overflow-y-auto space-y-5">
        <!-- Main -->
        <div class="space-y-1">
          <p class="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#20437B]/60">Main</p>
          <NuxtLink
            to="/admin"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            :class="isActive('/admin') && route.path === '/admin'
              ? 'bg-[#D3DDFF] text-[#20437B] font-medium'
              : 'text-[#20437B]/80 hover:bg-[#D3DDFF]/60 hover:text-[#20437B]'"
          >
            <span class="w-5 h-5 shrink-0 flex items-center justify-center" :class="isActive('/admin') && route.path === '/admin' ? 'text-[#20437B]' : 'text-[#20437B]/70'">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </span>
            <span>Dashboard</span>
          </NuxtLink>
          <!-- Super Admin (expandable) -->
          <div class="space-y-0.5">
            <button
              type="button"
              class="flex w-full items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left text-[#20437B]/80 hover:bg-[#D3DDFF]/60 hover:text-[#20437B]"
              @click="superAdminOpen = !superAdminOpen"
            >
              <span class="w-5 h-5 shrink-0 flex items-center justify-center text-[#20437B]/70">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </span>
              <span class="flex-1">Super Admin</span>
              <svg class="w-4 h-4 shrink-0 transition-transform" :class="superAdminOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div v-show="superAdminOpen" class="pl-8 space-y-0.5">
              <NuxtLink
                to="/admin/logs"
                class="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm"
                :class="isActive('/admin/logs')
                  ? 'bg-[#D3DDFF] text-[#20437B] font-medium'
                  : 'text-[#20437B]/80 hover:bg-[#D3DDFF]/60 hover:text-[#20437B]'"
              >
                <span class="w-4 h-4 shrink-0 flex items-center justify-center" :class="isActive('/admin/logs') ? 'text-[#20437B]' : 'text-[#20437B]/70'">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </span>
                <span>Logs</span>
              </NuxtLink>
              <NuxtLink
                to="/admin/customers"
                class="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm"
                :class="isActive('/admin/customers')
                  ? 'bg-[#D3DDFF] text-[#20437B] font-medium'
                  : 'text-[#20437B]/80 hover:bg-[#D3DDFF]/60 hover:text-[#20437B]'"
              >
                <span class="w-4 h-4 shrink-0 flex items-center justify-center" :class="isActive('/admin/customers') ? 'text-[#20437B]' : 'text-[#20437B]/70'">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </span>
                <span>Customer</span>
              </NuxtLink>
              <NuxtLink
                to="/admin/subscribe"
                class="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm"
                :class="isActive('/admin/subscribe')
                  ? 'bg-[#D3DDFF] text-[#20437B] font-medium'
                  : 'text-[#20437B]/80 hover:bg-[#D3DDFF]/60 hover:text-[#20437B]'"
              >
                <span class="w-4 h-4 shrink-0 flex items-center justify-center" :class="isActive('/admin/subscribe') ? 'text-[#20437B]' : 'text-[#20437B]/70'">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                <span>Subscribers</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Management -->
        <div class="space-y-1">
          <p class="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#20437B]/60">Management</p>
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
              <svg v-if="item.icon === 'products'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              <svg v-else-if="item.icon === 'coming-soon'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <svg v-else-if="item.icon === 'category'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
              <svg v-else-if="item.icon === 'list'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
            </span>
            <span>{{ item.label }}</span>
          </NuxtLink>
        </div>
      </nav>
      <!-- Logout in sidebar -->
      <div class="p-3 border-t border-[#D3DDFF] shrink-0">
        <button
          type="button"
          class="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-[#20437B] font-medium hover:bg-[#D3DDFF] transition-colors"
          @click="logout(); navigateTo('/')"
        >
          <span class="w-5 h-5 shrink-0 flex items-center justify-center text-[#20437B]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </span>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main: header + content (padding-left so content is not under fixed sidebar) -->
    <div class="flex-1 flex flex-col min-w-0 min-h-screen" style="padding-left: 280px;">
      <!-- Top header - white, design accent #20437B -->
      <header class="h-16 shrink-0 bg-white border-b border-[#D3DDFF] flex items-center justify-between px-6 gap-4">
        <div v-if="isDashboard" class="flex-1 max-w-md relative">
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search here"
            class="w-full pl-4 pr-10 py-2.5 border border-[#D3DDFF] rounded-lg text-sm focus:ring-2 focus:ring-[#20437B]/30 focus:border-[#20437B] outline-none"
          >
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[#20437B]/50 pointer-events-none">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
        </div>
        <div v-else class="flex-1" />
        <div class="relative flex items-center gap-3 sm:gap-4">
          <!-- Click-outside overlay to close dropdowns -->
          <div
            v-if="headerMenuOpen"
            class="fixed inset-0 z-40"
            aria-hidden="true"
            @click="headerMenuOpen = null"
          />
          <!-- Notifications -->
          <div class="relative z-50">
            <button
              type="button"
              class="relative w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 hover:bg-blue-200/80 transition-colors shrink-0"
              aria-label="Notifications"
              aria-expanded="headerMenuOpen === 'notifications'"
              @click="headerMenuOpen = headerMenuOpen === 'notifications' ? null : 'notifications'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 6H9" /></svg>
              <span v-if="unreadNotificationsCount > 0" class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-500 text-white text-[10px] font-semibold flex items-center justify-center">{{ unreadNotificationsCount }}</span>
            </button>
            <div
              v-if="headerMenuOpen === 'notifications'"
              class="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-2"
            >
              <div class="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                <h3 class="font-semibold text-gray-900">Notifications</h3>
                <button type="button" class="text-xs text-blue-500 hover:underline" @click="markAllNotificationsRead">Mark all read</button>
              </div>
              <div class="max-h-64 overflow-y-auto">
                <a
                  v-for="n in adminNotifications"
                  :key="n.id"
                  href="#"
                  class="flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-blue-50 text-sm border-b border-gray-50 last:border-0 transition-colors"
                  :class="n.read ? 'text-gray-500 bg-gray-50/50' : 'text-gray-700'"
                  @click.prevent="markNotificationRead(n.id); headerMenuOpen = null"
                >
                  <span class="truncate">{{ n.text }}</span>
                  <span v-if="!n.read" class="shrink-0 w-2 h-2 rounded-full bg-blue-500" title="Unread" />
                  <span v-else class="shrink-0 text-[10px] text-gray-400">Read</span>
                </a>
              </div>
              <div class="px-4 py-2 border-t border-gray-100">
                <NuxtLink to="/admin/orders" class="text-sm font-medium text-blue-500 hover:underline" @click="headerMenuOpen = null">View all notifications</NuxtLink>
              </div>
            </div>
          </div>
          <!-- Messages -->
          <div class="relative z-50">
            <button
              type="button"
              class="relative w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 hover:bg-orange-200/80 transition-colors shrink-0"
              aria-label="Messages"
              aria-expanded="headerMenuOpen === 'messages'"
              @click="headerMenuOpen = headerMenuOpen === 'messages' ? null : 'messages'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              <span v-if="unreadMessagesCount > 0" class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-orange-500 text-white text-[10px] font-semibold flex items-center justify-center">{{ unreadMessagesCount }}</span>
            </button>
            <div
              v-if="headerMenuOpen === 'messages'"
              class="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-2"
            >
              <div class="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                <h3 class="font-semibold text-gray-900">Messages</h3>
                <button type="button" class="text-xs text-orange-500 hover:underline" @click="markAllMessagesRead">Mark all read</button>
              </div>
              <div class="max-h-64 overflow-y-auto">
                <a
                  v-for="msg in adminMessages"
                  :key="msg.id"
                  href="#"
                  class="flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-orange-50 text-sm border-b border-gray-50 last:border-0 transition-colors"
                  :class="msg.read ? 'text-gray-500 bg-gray-50/50' : 'text-gray-700'"
                  @click.prevent="markMessageRead(msg.id); headerMenuOpen = null"
                >
                  <span class="truncate">{{ msg.subject }}</span>
                  <span v-if="!msg.read" class="shrink-0 w-2 h-2 rounded-full bg-orange-500" title="Unread" />
                  <span v-else class="shrink-0 text-[10px] text-gray-400">Read</span>
                </a>
              </div>
              <div class="px-4 py-2 border-t border-gray-100">
                <span class="text-sm text-gray-500">Open a message to reply</span>
              </div>
            </div>
          </div>
          <span class="hidden sm:inline text-sm font-medium text-[#20437B]">Hello, {{ user?.name ?? 'Admin' }}</span>
          <div class="w-9 h-9 rounded-full bg-[#D3DDFF] flex items-center justify-center text-[#20437B] shrink-0">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
          </div>
          <div class="flex items-center gap-1.5 pl-1 border-l border-[#D3DDFF]">
            <svg class="w-5 h-5 text-[#20437B]/50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span class="text-sm text-[#20437B] whitespace-nowrap">{{ formattedDate }}</span>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { footer } = useLandingData()
const { user, logout } = useAuth()
const searchQuery = ref('')
const headerMenuOpen = ref<'notifications' | 'messages' | null>(null)

interface AdminNotification { id: string; text: string; read: boolean }
const adminNotifications = ref<AdminNotification[]>([
  { id: '1', text: 'New order #1024 received', read: false },
  { id: '2', text: 'Low stock: 555 Tuna Bicol Express', read: false },
  { id: '3', text: 'Customer message from Jane D.', read: false }
])
const unreadNotificationsCount = computed(() => adminNotifications.value.filter(n => !n.read).length)
function markNotificationRead(id: string) {
  const n = adminNotifications.value.find(x => x.id === id)
  if (n) n.read = true
}
function markAllNotificationsRead() {
  adminNotifications.value.forEach(n => { n.read = true })
}

interface AdminMessage { id: string; subject: string; read: boolean }
const adminMessages = ref<AdminMessage[]>([
  { id: '1', subject: 'Jane D. – Order inquiry', read: false },
  { id: '2', subject: 'John M. – Delivery question', read: false },
  { id: '3', subject: 'Support – New ticket', read: false }
])
const unreadMessagesCount = computed(() => adminMessages.value.filter(m => !m.read).length)
function markMessageRead(id: string) {
  const m = adminMessages.value.find(x => x.id === id)
  if (m) m.read = true
}
function markAllMessagesRead() {
  adminMessages.value.forEach(m => { m.read = true })
}

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

const isDashboard = computed(() => route.path === '/admin')

const formattedDate = computed(() => {
  const d = new Date()
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
})
</script>

<style scoped>
.tagline-gradient-text {
  background: linear-gradient(to right, #20437B, #dc2626);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
