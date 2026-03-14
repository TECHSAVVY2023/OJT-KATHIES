<template>
  <div class="space-y-0.5">
    <button
      type="button"
      class="flex w-full items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left text-[#20437B]/80 hover:bg-[#D3DDFF]/60 hover:text-[#20437B]"
      @click="$emit('toggle')"
    >
      <span class="w-5 h-5 shrink-0 flex items-center justify-center text-[#20437B]/70">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </span>
      <span class="flex-1">Super Admin</span>
      <svg class="w-4 h-4 shrink-0 transition-transform" :class="isOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div v-show="isOpen" class="pl-8 space-y-0.5">
      <NuxtLink
        v-for="item in superAdminItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm"
        :class="isActive(item.path)
          ? 'bg-[#D3DDFF] text-[#20437B] font-medium'
          : 'text-[#20437B]/80 hover:bg-[#D3DDFF]/60 hover:text-[#20437B]'"
      >
        <span class="w-4 h-4 shrink-0 flex items-center justify-center" :class="isActive(item.path) ? 'text-[#20437B]' : 'text-[#20437B]/70'">
          <component :is="item.icon" class="w-4 h-4" />
        </span>
        <span>{{ item.label }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SuperAdminItem {
  label: string
  path: string
  icon: any
}

interface Props {
  isOpen: boolean
}

defineProps<Props>()
defineEmits<{
  toggle: []
}>()

const route = useRoute()

const superAdminItems: SuperAdminItem[] = [
  {
    label: 'Logs',
    path: '/admin/logs',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' })
    ])
  },
  {
    label: 'Customer',
    path: '/admin/customers',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })
    ])
  },
  {
    label: 'Subscribers',
    path: '/admin/subscribe',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })
    ])
  }
]

const isActive = (path: string) => {
  return route.path.startsWith(path)
}
</script>
