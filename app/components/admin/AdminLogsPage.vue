<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl sm:text-3xl font-bold text-[#20437B]">Logs</h1>
      <p class="text-[#20437B]/80 mt-1">
        System and activity logs
      </p>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-[#D3DDFF] overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-[#D3DDFF]/50 text-[#20437B] font-semibold text-left">
              <th class="px-4 py-3 w-40">Time</th>
              <th class="px-4 py-3">Action</th>
              <th class="px-4 py-3">User</th>
              <th class="px-4 py-3">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(log, i) in logs"
              :key="i"
              class="border-t border-[#D3DDFF]/30 hover:bg-[#D3DDFF]/20 transition-colors"
            >
              <td class="px-4 py-3 text-[#20437B]/80">{{ log.time }}</td>
              <td class="px-4 py-3 font-medium text-[#20437B]">{{ log.action }}</td>
              <td class="px-4 py-3 text-[#20437B]/80">{{ log.user }}</td>
              <td class="px-4 py-3 text-[#20437B]/70">{{ log.details }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!logs.length" class="px-4 py-12 text-center text-[#20437B]/60">
        No logs yet.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface LogEntry {
  time: string
  action: string
  user: string
  details: string
}

const logs = ref<LogEntry[]>([
  { time: '07 Mar 2025, 10:32', action: 'Login', user: 'Admin', details: 'Successful login' },
  { time: '07 Mar 2025, 09:15', action: 'Order updated', user: 'Admin', details: 'Order #1024 status → Shipped' },
  { time: '06 Mar 2025, 16:45', action: 'Product created', user: 'Admin', details: 'New product added' }
])
</script>

