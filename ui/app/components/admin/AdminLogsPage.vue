<template>
  <AdminLayout title="Logs" subtitle="System and activity logs">
    <AdminTable
      :columns="logColumns"
      :data="logs"
      empty-message="No logs yet."
    >
      <template #cell-time="{ value }">
        <span class="text-[#20437B]/80">{{ value }}</span>
      </template>
      <template #cell-action="{ value }">
        <span class="font-medium text-[#20437B]">{{ value }}</span>
      </template>
      <template #cell-user="{ value }">
        <span class="text-[#20437B]/80">{{ value }}</span>
      </template>
      <template #cell-details="{ value }">
        <span class="text-[#20437B]/70">{{ value }}</span>
      </template>
    </AdminTable>
  </AdminLayout>
</template>

<script setup lang="ts">
interface LogEntry {
  time: string
  action: string
  user: string
  details: string
}

const logColumns = [
  { key: 'time', label: 'Time', class: 'w-40' },
  { key: 'action', label: 'Action' },
  { key: 'user', label: 'User' },
  { key: 'details', label: 'Details' }
]

const logs = ref<LogEntry[]>([
  { time: '07 Mar 2025, 10:32', action: 'Login', user: 'Admin', details: 'Successful login' },
  { time: '07 Mar 2025, 09:15', action: 'Order updated', user: 'Admin', details: 'Order #1024 status → Shipped' },
  { time: '06 Mar 2025, 16:45', action: 'Product created', user: 'Admin', details: 'New product added' }
])
</script>

