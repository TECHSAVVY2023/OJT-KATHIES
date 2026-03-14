<template>
  <div class="relative z-50">
    <button
      type="button"
      class="relative w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 hover:bg-orange-200/80 transition-colors shrink-0"
      aria-label="Messages"
      :aria-expanded="isOpen"
      @click="$emit('toggle')"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <span v-if="unreadCount > 0" class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-orange-500 text-white text-[10px] font-semibold flex items-center justify-center">
        {{ unreadCount }}
      </span>
    </button>
    <div
      v-if="isOpen"
      class="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-2"
    >
      <div class="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
        <h3 class="font-semibold text-gray-900">Messages</h3>
        <button type="button" class="text-xs text-orange-500 hover:underline" @click="$emit('mark-all-read')">Mark all read</button>
      </div>
      <div class="max-h-64 overflow-y-auto">
        <a
          v-for="message in messages"
          :key="message.id"
          href="#"
          class="flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-orange-50 text-sm border-b border-gray-50 last:border-0 transition-colors"
          :class="message.read ? 'text-gray-500 bg-gray-50/50' : 'text-gray-700'"
          @click.prevent="handleMessageClick(message.id)"
        >
          <span class="truncate">{{ message.subject }}</span>
          <span v-if="!message.read" class="shrink-0 w-2 h-2 rounded-full bg-orange-500" title="Unread" />
          <span v-else class="shrink-0 text-[10px] text-gray-400">Read</span>
        </a>
      </div>
      <div class="px-4 py-2 border-t border-gray-100">
        <span class="text-sm text-gray-500">Open a message to reply</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Message {
  id: string
  subject: string
  read: boolean
}

interface Props {
  isOpen: boolean
  messages: Message[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  toggle: []
  'mark-all-read': []
  'mark-read': [id: string]
}>()

const unreadCount = computed(() => props.messages.filter(m => !m.read).length)

const handleMessageClick = (id: string) => {
  emit('mark-read', id)
}
</script>
