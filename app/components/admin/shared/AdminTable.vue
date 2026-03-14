<template>
  <div class="bg-white rounded-xl shadow-sm border border-[#D3DDFF] overflow-hidden">
    <div v-if="title || viewAllLink" class="p-5 flex justify-between items-center border-b border-[#D3DDFF]/60">
      <h2 v-if="title" class="font-bold text-[#20437B]">{{ title }}</h2>
      <NuxtLink v-if="viewAllLink" :to="viewAllLink" class="text-sm text-[#20437B] font-medium hover:underline">View All</NuxtLink>
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-[#D3DDFF]/50 text-[#20437B] font-semibold text-left">
            <th v-for="column in columns" :key="column.key" class="px-5 py-3" :class="column.class">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in data"
            :key="rowKey ? row[rowKey] : i"
            class="border-t border-[#D3DDFF]/60 hover:bg-[#D3DDFF]/20 transition-colors"
          >
            <td v-for="column in columns" :key="column.key" class="px-5 py-3" :class="column.class">
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-if="!data.length" class="px-4 py-12 text-center text-[#20437B]/60">
      {{ emptyMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Column {
  key: string
  label: string
  class?: string
}

interface Props {
  title?: string
  viewAllLink?: string
  columns: Column[]
  data: any[]
  rowKey?: string
  emptyMessage?: string
}

withDefaults(defineProps<Props>(), {
  emptyMessage: 'No data available.'
})
</script>
