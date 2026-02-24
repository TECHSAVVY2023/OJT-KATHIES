<template>
  <div class="flex flex-col lg:flex-row gap-6">
    <!-- Main content -->
    <div class="flex-1 min-w-0 space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-[#20437B]">Customer</h1>
        <p class="text-[#20437B]/80 mt-1">
          You have <strong class="text-[#20437B]">{{ customerCountLabel }}</strong> Customer Today
        </p>
      </div>

      <!-- Overview cards: Total Customers, New Customer -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-white rounded-xl border border-[#D3DDFF] p-5 shadow-sm flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-[#D3DDFF]/50 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-[#20437B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-[#20437B]">{{ totalCustomers }}</p>
              <p class="text-sm text-gray-500">Total Customers</p>
            </div>
          </div>
          <select class="text-sm text-gray-500 border-0 bg-transparent pr-1 focus:ring-0 rounded cursor-pointer">
            <option>This Week</option>
          </select>
        </div>
        <div class="bg-white rounded-xl border border-[#D3DDFF] p-5 shadow-sm flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-[#D3DDFF]/50 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5 text-[#20437B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-[#20437B]">{{ newCustomers }}</p>
              <p class="text-sm text-gray-500">New Customer</p>
            </div>
          </div>
          <select class="text-sm text-gray-500 border-0 bg-transparent pr-1 focus:ring-0 rounded cursor-pointer">
            <option>This Week</option>
          </select>
        </div>
      </div>

      <!-- Search and filter -->
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="flex-1 relative">
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
        <select
          v-model="statusFilter"
          class="px-4 py-2.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 text-sm font-medium focus:ring-2 focus:ring-amber-300 outline-none min-w-[140px]"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-xl shadow-sm border border-[#D3DDFF] overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-[#D3DDFF]/50 text-[#20437B] font-semibold text-left">
                <th class="px-4 py-3 w-16">Profile</th>
                <th class="px-4 py-3">Name</th>
                <th class="px-4 py-3">Phone</th>
                <th class="px-4 py-3">Age</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3 text-right w-28">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="customer in filteredCustomers"
                :key="customer.id"
                class="border-t border-[#D3DDFF]/60 hover:bg-[#D3DDFF]/20 transition-colors"
                :class="{ 'bg-[#D3DDFF]/30': selectedCustomer?.id === customer.id }"
              >
                <td class="px-4 py-3">
                  <div class="w-10 h-10 rounded-full bg-[#D3DDFF]/50 flex items-center justify-center overflow-hidden shrink-0">
                    <img v-if="customer.profileImage" :src="customer.profileImage" :alt="customer.name" class="w-full h-full object-cover">
                    <svg v-else class="w-5 h-5 text-[#20437B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                </td>
                <td class="px-4 py-3 font-medium text-gray-900">{{ customer.name }}</td>
                <td class="px-4 py-3 text-gray-600">{{ customer.phone }}</td>
                <td class="px-4 py-3 text-gray-600">{{ customer.age }}</td>
                <td class="px-4 py-3">
                  <span class="inline-flex items-center gap-1.5">
                    <span
                      class="w-2 h-2 rounded-full shrink-0"
                      :class="customer.status === 'Active' ? 'bg-green-500' : 'bg-red-500'"
                    />
                    <span class="text-gray-700">{{ customer.status }}</span>
                  </span>
                </td>
                <td class="px-4 py-3 text-right">
                  <div class="flex items-center justify-end gap-1">
                    <button type="button" class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" aria-label="View" @click="onView(customer)">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </button>
                    <button type="button" class="p-2 text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/50 rounded-lg transition-colors" aria-label="Edit" @click="onEdit(customer)">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button type="button" class="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" aria-label="Delete" @click="confirmDelete(customer)">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-if="filteredCustomers.length === 0" class="text-center text-gray-500 py-8">No customers match your search or filter.</p>
      </div>
    </div>

    <!-- Right sidebar: Customer Details -->
    <aside
      v-if="selectedCustomer"
      class="w-full lg:w-80 xl:w-96 shrink-0 bg-white rounded-xl border border-[#D3DDFF] shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-8rem)] lg:sticky lg:top-24"
    >
      <div class="p-5 overflow-y-auto space-y-5">
        <!-- Header: headset icon + name -->
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-[#20437B] flex items-center justify-center shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <div class="min-w-0">
            <h2 class="font-bold text-lg text-[#20437B] truncate">{{ selectedCustomer.name }}</h2>
          </div>
        </div>

        <!-- Customer Info -->
        <div>
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Customer Info</h3>
          <div class="space-y-2 text-sm">
            <p class="flex items-center gap-2 text-gray-700">
              <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              {{ selectedCustomer.phone }}
            </p>
            <p class="flex items-center gap-2">
              <span
                class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium"
                :class="selectedCustomer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
              >
                {{ selectedCustomer.status }}
              </span>
            </p>
            <p class="text-gray-700">Age: <span class="font-medium">{{ selectedCustomer.age }}</span></p>
          </div>
        </div>

        <!-- Social Media -->
        <div>
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Social Media</h3>
          <div class="flex gap-2">
            <a href="#" class="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#D3DDFF]/50 hover:text-[#20437B]" aria-label="Facebook"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
            <a href="#" class="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#D3DDFF]/50 hover:text-[#20437B]" aria-label="WhatsApp"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
            <a href="#" class="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#D3DDFF]/50 hover:text-[#20437B]" aria-label="Twitter"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="#" class="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#D3DDFF]/50 hover:text-[#20437B]" aria-label="LinkedIn"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
            <a href="#" class="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#D3DDFF]/50 hover:text-[#20437B]" aria-label="Instagram"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
          </div>
        </div>

        <!-- Activity -->
        <div>
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Activity</h3>
          <div class="space-y-1 text-sm text-gray-700">
            <p>Registration: {{ selectedCustomer.registrationDate || '—' }}</p>
            <p>Last purchase: {{ selectedCustomer.lastPurchase || '—' }}</p>
          </div>
        </div>

        <!-- Order overview -->
        <div>
          <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Order overview</h3>
          <div class="grid grid-cols-1 gap-2">
            <p class="text-sm">
              <span class="font-bold text-[#20437B] underline">{{ selectedCustomer.totalOrders ?? 0 }} Total order</span>
            </p>
            <p class="text-sm font-medium text-green-600">{{ selectedCustomer.completedOrders ?? 0 }} Completed</p>
            <p class="text-sm font-medium text-red-600">{{ selectedCustomer.canceledOrders ?? 0 }} Canceled</p>
          </div>
        </div>
      </div>
      <div class="p-3 border-t border-[#D3DDFF]">
        <button type="button" class="w-full py-2 text-sm text-gray-500 hover:text-[#20437B] hover:bg-[#D3DDFF]/30 rounded-lg transition-colors" @click="selectedCustomer = null">
          Close details
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import type { CustomerItem } from '~/types/catalog'

definePageMeta({ layout: 'admin' })

const { customers, deleteCustomer, counts } = useCustomersData()

const searchQuery = ref('')
const statusFilter = ref('')
const selectedCustomer = ref<CustomerItem | null>(null)

const customerCountLabel = computed(() => {
  const n = customers.value.length
  return n >= 100 ? '100+' : String(n)
})

const totalCustomers = computed(() => customers.value.length)
const newCustomers = computed(() => counts.value.active)

const filteredCustomers = computed(() => {
  let list = [...customers.value]
  const q = searchQuery.value?.trim().toLowerCase()
  if (q) {
    list = list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.replace(/\s/g, '').includes(q.replace(/\s/g, ''))
    )
  }
  if (statusFilter.value) {
    list = list.filter((c) => c.status === statusFilter.value)
  }
  return list
})

function onView(customer: CustomerItem) {
  selectedCustomer.value = customer
}

function onEdit(customer: CustomerItem) {
  selectedCustomer.value = customer
  // TODO: open edit modal or navigate
}

function confirmDelete(customer: CustomerItem) {
  if (!import.meta.client) return
  if (confirm(`Delete customer "${customer.name}"? This will remove them from the list.`)) {
    deleteCustomer(customer.id)
    if (selectedCustomer.value?.id === customer.id) selectedCustomer.value = null
  }
}

useHead({ title: "Customer | Admin | Kathie's Kitchen" })
</script>
