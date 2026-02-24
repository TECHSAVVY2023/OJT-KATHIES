<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-[#20437B]">Subscribe</h1>
      <p class="text-[#20437B]/80 mt-1">
        Newsletter subscribers from the footer form. Total: <strong class="text-[#20437B]">{{ count }}</strong>
      </p>
    </div>

    <div class="bg-white rounded-xl border border-[#D3DDFF] p-5 shadow-sm flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-[#D3DDFF]/50 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5 text-[#20437B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p class="text-2xl font-bold text-[#20437B]">{{ count }}</p>
          <p class="text-sm text-gray-500">Total subscribers</p>
        </div>
      </div>
      <button
        type="button"
        class="px-4 py-2 rounded-lg bg-[#20437B] text-white text-sm font-medium hover:bg-[#1a3562] transition-colors disabled:opacity-50 disabled:pointer-events-none"
        :disabled="filteredList.length === 0"
        @click="exportCsv"
      >
        Export CSV
      </button>
    </div>

    <div class="relative max-w-md">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search by email"
        class="w-full pl-10 pr-4 py-2.5 border border-[#D3DDFF] rounded-lg text-sm focus:ring-2 focus:ring-[#20437B]/30 focus:border-[#20437B] outline-none"
      >
      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[#20437B]/50 pointer-events-none">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </span>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-[#D3DDFF] overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-[#D3DDFF]/50 text-[#20437B] font-semibold text-left">
              <th class="px-4 py-3">#</th>
              <th class="px-4 py-3">Email</th>
              <th class="px-4 py-3">Subscribed at</th>
              <th class="px-4 py-3 text-right w-24">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(sub, i) in filteredList"
              :key="sub.id"
              class="border-t border-[#D3DDFF]/60 hover:bg-[#D3DDFF]/20 transition-colors"
            >
              <td class="px-4 py-3 text-gray-600">{{ i + 1 }}</td>
              <td class="px-4 py-3 font-medium text-gray-900">{{ sub.email }}</td>
              <td class="px-4 py-3 text-gray-600">{{ formatDate(sub.subscribedAt) }}</td>
              <td class="px-4 py-3 text-right">
                <button
                  type="button"
                  class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Remove subscriber"
                  @click="remove(sub.id)"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="filteredList.length === 0" class="text-center text-gray-500 py-8">
        {{ searchQuery ? 'No subscribers match your search.' : 'No subscribers yet. They will appear here when someone subscribes from the footer.' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { subscribers, count, remove } = useSubscribers()
const searchQuery = ref('')

const filteredList = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  const list = subscribers.value
  if (!q) return list
  return list.filter(s => s.email.toLowerCase().includes(q))
})

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  } catch {
    return iso
  }
}

function exportCsv() {
  if (filteredList.value.length === 0) return
  const header = 'Email,Subscribed at\n'
  const rows = filteredList.value.map(s => `${s.email},${s.subscribedAt}`).join('\n')
  const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

definePageMeta({ layout: 'admin' })
</script>
