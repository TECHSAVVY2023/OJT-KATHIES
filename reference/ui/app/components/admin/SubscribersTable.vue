<script setup>
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { useAdminApi } from '~/composables/adminAPI'
import { useAdminGuard } from '~/composables/useAdminGuard'

const { admin } = useAdminGuard()
const { get, del } = useAdminApi()

// State
const subscribers = ref([])
const searchQuery = ref('')
const showModal = ref(false)
const selectedSubscriber = ref(null)

// Sorting
const sortKey = ref(null)
const sortDirection = ref(null)

const toggleSort = (key) => {
    if (sortKey.value === key) {
        if (sortDirection.value === 'asc') sortDirection.value = 'desc'
        else if (sortDirection.value === 'desc') {
            sortKey.value = null
            sortDirection.value = null
        } else sortDirection.value = 'asc'
    } else {
        sortKey.value = key
        sortDirection.value = 'asc'
    }
}

const sortedSubscribers = computed(() => {
    if (!sortKey.value || !sortDirection.value) return subscribers.value
    return [...subscribers.value].sort((a, b) => {
        const x = a[sortKey.value]
        const y = b[sortKey.value]
        return typeof x === 'string'
            ? sortDirection.value === 'asc'
                ? x.localeCompare(y)
                : y.localeCompare(x)
            : sortDirection.value === 'asc'
                ? new Date(x) - new Date(y)
                : new Date(y) - new Date(x)
    })
})

// Filtered list
const filteredSubscribers = computed(() => {
    const q = searchQuery.value.toLowerCase()
    return sortedSubscribers.value.filter(s => s.email.toLowerCase().includes(q))
})

// Load
const loadSubscribers = async () => {
    try {
        subscribers.value = await get('admin-api/subscribers/')
    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Failed to load', text: err.message })
    }
}
onMounted(loadSubscribers)

// Delete subscriber
const deleteSubscriber = async () => {
    const confirmDelete = await Swal.fire({
        title: 'Delete subscriber?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
    })
    if (!confirmDelete.isConfirmed) return

    try {
        await del(`admin-api/subscribers/${selectedSubscriber.value.id}/`)
        showModal.value = false
        await loadSubscribers()
        Swal.fire({
            icon: 'success',
            title: 'Subscriber deleted',
            showConfirmButton: false,
            timer: 1500,
        })
    } catch (err) {
        Swal.fire({ icon: 'error', title: 'Failed to delete', text: err.message })
    }
}

// Modal
const openSubscriberModal = (subscriber) => {
    selectedSubscriber.value = subscriber
    showModal.value = true
}
</script>

<template>
    <div v-if="admin" class="bg-white shadow-lg rounded-lg p-6">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6 gap-4">
            <input v-model="searchQuery" type="text" placeholder="Search email..."
                class="w-1/3 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FA812F]" />
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full border-collapse text-left">
                <thead class="bg-[#E3D9CB] text-[#010024]">
                    <tr>
                        <th class="p-3 cursor-pointer" @click="toggleSort('email')">
                            Email
                            <span v-if="sortKey === 'email'">
                                {{ sortDirection === 'asc' ? '▲' : sortDirection === 'desc' ? '▼' : '' }}
                            </span>
                        </th>
                        <th class="p-3 cursor-pointer" @click="toggleSort('subscribed_at')">
                            Subscribed At
                            <span v-if="sortKey === 'subscribed_at'">
                                {{ sortDirection === 'asc' ? '▲' : sortDirection === 'desc' ? '▼' : '' }}
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="subscriber in filteredSubscribers" :key="subscriber.id"
                        class="border-b border-gray-200 hover:bg-[#FEF3E2] cursor-pointer"
                        @click="openSubscriberModal(subscriber)">
                        <td class="p-3">{{ subscriber.email }}</td>
                        <td class="p-3">{{ new Date(subscriber.subscribed_at).toLocaleString() }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal -->
        <Transition name="fade">
            <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl">
                    <h2 class="text-xl font-bold mb-4 text-[#FA812F]">Subscriber Info</h2>

                    <p class="text-gray-700 mb-2"><strong>Email:</strong> {{ selectedSubscriber.email }}</p>
                    <p class="text-gray-700 mb-4">
                        <strong>Subscribed At:</strong>
                        {{ new Date(selectedSubscriber.subscribed_at).toLocaleString() }}
                    </p>

                    <div class="flex justify-end gap-2 mt-4">
                        <button @click="showModal = false"
                            class="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg">Close</button>
                        <button @click="deleteSubscriber"
                            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
