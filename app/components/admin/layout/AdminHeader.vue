<template>
  <header class="h-16 shrink-0 bg-white border-b border-[#D3DDFF] flex items-center justify-between px-6 gap-4">
    <div v-if="isDashboard" class="flex-1 max-w-md relative">
      <input
        :value="searchQuery"
        @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        type="search"
        placeholder="Search here"
        class="w-full pl-4 pr-10 py-2.5 border border-[#D3DDFF] rounded-lg text-sm focus:ring-2 focus:ring-[#20437B]/30 focus:border-[#20437B] outline-none"
      >
      <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[#20437B]/50 pointer-events-none">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
    </div>
    <div v-else class="flex-1" />
    
    <div class="relative flex items-center gap-3 sm:gap-4">
      <!-- Click-outside overlay to close dropdowns -->
      <div
        v-if="headerMenuOpen"
        class="fixed inset-0 z-40"
        aria-hidden="true"
        @click="$emit('close-header-menu')"
      />

      <!-- Notifications -->
      <NotificationDropdown
        :is-open="headerMenuOpen === 'notifications'"
        :notifications="notifications"
        @toggle="$emit('toggle-notifications')"
        @close="$emit('close-header-menu')"
        @mark-all-read="markAllNotificationsRead"
        @mark-read="markNotificationRead"
      />

      <!-- Messages -->
      <MessageDropdown
        :is-open="headerMenuOpen === 'messages'"
        :messages="messages"
        @toggle="$emit('toggle-messages')"
        @mark-all-read="markAllMessagesRead"
        @mark-read="markMessageRead"
      />

      <span class="hidden sm:inline text-sm font-medium text-[#20437B]">Hello, {{ user?.name ?? 'Admin' }}</span>
      <div class="w-9 h-9 rounded-full bg-[#D3DDFF] flex items-center justify-center text-[#20437B] shrink-0">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
      <div class="flex items-center gap-1.5 pl-1 border-l border-[#D3DDFF]">
        <svg class="w-5 h-5 text-[#20437B]/50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-sm text-[#20437B] whitespace-nowrap">{{ formattedDate }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
interface Notification {
  id: string
  text: string
  read: boolean
}

interface Message {
  id: string
  subject: string
  read: boolean
}

interface Props {
  isDashboard: boolean
  searchQuery: string
  headerMenuOpen: 'notifications' | 'messages' | null
  notifications: Notification[]
  messages: Message[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'close-header-menu': []
  'toggle-notifications': []
  'toggle-messages': []
}>()

const { user } = useAuth()

const markNotificationRead = (id: string) => {
  const notification = props.notifications.find(n => n.id === id)
  if (notification) notification.read = true
}

const markAllNotificationsRead = () => {
  props.notifications.forEach(n => { n.read = true })
}

const markMessageRead = (id: string) => {
  const message = props.messages.find(m => m.id === id)
  if (message) message.read = true
}

const markAllMessagesRead = () => {
  props.messages.forEach(m => { m.read = true })
}

const formattedDate = computed(() => {
  const d = new Date()
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
})
</script>
