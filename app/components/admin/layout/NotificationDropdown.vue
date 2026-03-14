<template>
  <div class="relative z-50">
    <button
      type="button"
      class="relative w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 hover:bg-blue-200/80 transition-colors shrink-0"
      aria-label="Notifications"
      :aria-expanded="isOpen"
      @click="$emit('toggle')"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 6H9" />
      </svg>
      <span v-if="unreadCount > 0" class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-500 text-white text-[10px] font-semibold flex items-center justify-center">
        {{ unreadCount }}
      </span>
    </button>
    <div
      v-if="isOpen"
      class="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-2"
    >
      <div class="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
        <h3 class="font-semibold text-gray-900">Notifications</h3>
        <button type="button" class="text-xs text-blue-500 hover:underline" @click="$emit('mark-all-read')">Mark all read</button>
      </div>
      <div class="max-h-64 overflow-y-auto">
        <a
          v-for="notification in notifications"
          :key="notification.id"
          href="#"
          class="flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-blue-50 text-sm border-b border-gray-50 last:border-0 transition-colors"
          :class="notification.read ? 'text-gray-500 bg-gray-50/50' : 'text-gray-700'"
          @click.prevent="handleNotificationClick(notification.id)"
        >
          <span class="truncate">{{ notification.text }}</span>
          <span v-if="!notification.read" class="shrink-0 w-2 h-2 rounded-full bg-blue-500" title="Unread" />
          <span v-else class="shrink-0 text-[10px] text-gray-400">Read</span>
        </a>
      </div>
      <div class="px-4 py-2 border-t border-gray-100">
        <NuxtLink to="/admin/orders" class="text-sm font-medium text-blue-500 hover:underline" @click="$emit('close')">View all notifications</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Notification {
  id: string
  text: string
  read: boolean
}

interface Props {
  isOpen: boolean
  notifications: Notification[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  toggle: []
  close: []
  'mark-all-read': []
  'mark-read': [id: string]
}>()

const unreadCount = computed(() => props.notifications.filter(n => !n.read).length)

const handleNotificationClick = (id: string) => {
  emit('mark-read', id)
  emit('close')
}
</script>
