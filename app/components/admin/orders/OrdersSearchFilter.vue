<template>
  <div class="flex flex-col sm:flex-row gap-3">
    <div class="flex-1 relative">
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
    <select
      :value="statusFilter"
      @change="$emit('update:statusFilter', ($event.target as HTMLSelectElement).value)"
      class="px-4 py-2.5 rounded-lg border border-[#D3DDFF] bg-white text-[#20437B] text-sm focus:ring-2 focus:ring-[#20437B]/30 outline-none min-w-[140px]"
    >
      <option value="">All Status</option>
      <option value="Pending">Pending</option>
      <option value="In-Progress">In-Progress</option>
      <option value="Completed">Completed</option>
      <option value="Canceled">Canceled</option>
      <option value="Returned">Returned</option>
      <option value="Damaged">Damaged</option>
    </select>
  </div>
</template>

<script setup lang="ts">
interface Props {
  searchQuery: string
  statusFilter: string
}

defineProps<Props>()

defineEmits<{
  'update:searchQuery': [value: string]
  'update:statusFilter': [value: string]
}>()
</script>
