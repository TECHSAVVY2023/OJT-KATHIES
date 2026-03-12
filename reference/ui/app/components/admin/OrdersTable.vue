<script setup>
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { useAdminApi } from '~/composables/adminAPI'
import { useAdminGuard } from '~/composables/useAdminGuard'

const adminApi = useAdminApi()
const { admin } = useAdminGuard()
const { get, patch, del } = useAdminApi()

const orders = ref([])
const searchQuery = ref('')
const showModal = ref(false)
const selectedOrder = ref(null)

const showArchived = ref(false)
const archivedOrders = ref([])

// Load both Active + Archived Orders
const loadOrders = async () => {
    try {
        const [activeRes, archivedRes] = await Promise.all([
            get('admin-api/orders/?archived=false'),
            get('admin-api/orders/?archived=true'),
        ])
        orders.value = activeRes
        archivedOrders.value = archivedRes
    } catch (err) {
        console.error('Failed to load orders:', err)
        Swal.fire({
            icon: 'error',
            title: 'Failed to load orders',
            text: err.message,
        })
    }
}
onMounted(loadOrders)

// Filter + Sort
const filteredOrders = computed(() => {
    const q = searchQuery.value.toLowerCase()
    return orders.value.filter(
        o =>
            o.customer_name.toLowerCase().includes(q) ||
            o.email.toLowerCase().includes(q) ||
            o.status.toLowerCase().includes(q)
    )
})

const sortKey = ref(null)
const sortDirection = ref(null)
const toggleSort = key => {
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

const sortedOrders = computed(() => {
    if (!sortKey.value || !sortDirection.value) return filteredOrders.value
    return [...filteredOrders.value].sort((a, b) => {
        const x = a[sortKey.value]
        const y = b[sortKey.value]
        if (x == null || y == null) return 0
        if (typeof x === 'string') {
            return sortDirection.value === 'asc' ? x.localeCompare(y) : y.localeCompare(x)
        }
        return sortDirection.value === 'asc' ? x - y : y - x
    })
})

// Status → Buttons
const getStatusActions = status => {
    switch (status) {
        case 'pending_confirmation':
            return [
                { label: 'Confirm', next: 'confirmed' },
                { label: 'Cancel Order', next: 'cancelled' },
            ]
        case 'confirmed':
            return [
                { label: 'Pack Order', next: 'packed_ready' },
            ]
        case 'packed_ready':
            return [
                { label: 'Mark as Delivering', next: 'en_route' },
            ]
        case 'en_route':
            return [
                { label: 'Mark as Completed', next: 'completed' },
                // No cancel option once en route
            ]
        default:
            return []
    }
}

// Update status
const updateOrderStatus = async (order, newStatus) => {
    try {
        // Step 1. Confirm action
        const confirm = await Swal.fire({
            title: "Update Order Status?",
            text: `Change status to "${newStatus.replace("_", " ")}"?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, update",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        });
        if (!confirm.isConfirmed) return;

        let payload;
        let isMultipart = false;

        // Step 2. Handle custom cases
        if (newStatus === "confirmed") {
            // Ask for shipping details
            const { value: formValues } = await Swal.fire({
                title: "Enter Shipping Details",
                html: `
                    <input id="swal_delivery_method" class="swal2-input" placeholder="Delivery Method (e.g. LBC, Grab)">
                    <input id="swal_shipping_fee" type="number" class="swal2-input" placeholder="Shipping Fee (₱)">
                `,
                focusConfirm: false,
                preConfirm: () => {
                    const delivery_method = document.getElementById("swal_delivery_method").value.trim();
                    const shipping_fee = parseFloat(document.getElementById("swal_shipping_fee").value) || 0;

                    if (!delivery_method) {
                        Swal.showValidationMessage("Please enter delivery method");
                        return false;
                    }

                    return { delivery_method, shipping_fee };
                },
            });

            if (!formValues) return;

            payload = {
                status: newStatus,
                delivery_method: formValues.delivery_method,
                shipping_fee: formValues.shipping_fee,
            };
        }

        else if (newStatus === "packed_ready") {
            const { value: invoiceRef } = await Swal.fire({
                title: "Invoice Reference Number",
                html: `
            <div class="text-gray-600 text-sm mb-3">
                Please enter the invoice reference number for this order.
            </div>

            <input 
                id="invoiceRefInput"
                type="text"
                placeholder="e.g. KK-0001-2025"
                class="swal2-input border-gray-300"
                style="width: 50%;"
            />
        `,
                showCancelButton: true,
                confirmButtonText: "Submit",
                cancelButtonText: "Cancel",
                focusConfirm: false,
                preConfirm: () => {
                    const value = Swal.getPopup().querySelector("#invoiceRefInput").value.trim();

                    if (!value) {
                        Swal.showValidationMessage("Invoice reference number is required");
                        return false;
                    }

                    return value;
                },
                customClass: {
                    popup: "rounded-xl shadow-2xl",
                    confirmButton: "bg-[#FA812F] text-white font-medium px-4 py-2 mx-5 rounded-lg hover:bg-[#e8721f]",
                    cancelButton: "bg-gray-300 text-gray-700 font-medium px-4 py-2 mx-5 rounded-lg hover:bg-gray-400",
                },
                buttonsStyling: false,
            });

            if (!invoiceRef) return;

            payload = new FormData();
            payload.append("status", newStatus);
            payload.append("invoice_ref", invoiceRef);
            isMultipart = true;
        }

        else {
            // Generic status update
            payload = { status: newStatus };
        }

        // Step 3. Loading UI
        Swal.fire({
            title: "Updating Order...",
            text: `Please wait while we update order #${order.id}.`,
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });

        const start = Date.now();

        // Step 4. Send request
        if (isMultipart) {
            await adminApi.patch(`admin-api/orders/${order.id}/update-status/`, payload, true);
        } else {
            await adminApi.patch(`admin-api/orders/${order.id}/update-status/`, payload);
        }

        const elapsed = Date.now() - start;
        if (elapsed < 1000) await new Promise(r => setTimeout(r, 1000));
        Swal.close();

        await Swal.fire({
            icon: "success",
            title: "Status Updated!",
            text: `Order #${order.id} marked as "${newStatus.replace("_", " ")}".`,
            timer: 1800,
            showConfirmButton: false,
        });

        showModal.value = false;
        await loadOrders();
    } catch (err) {
        console.error("Failed to update order:", err);
        Swal.close();

        Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: err.response?.data?.error || err.message || "Could not update order. Please try again.",
            confirmButtonColor: "#d33",
        });
    }
};


const archiveOrder = async id => {
    try {
        const confirm = await Swal.fire({
            title: 'Archive this order?',
            text: 'Archived orders are stored separately.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Archive',
            confirmButtonColor: '#3085d6',
        })
        if (!confirm.isConfirmed) return

        await patch(`admin-api/orders/${id}/archive/`)
        Swal.fire({
            icon: 'success',
            title: 'Order archived!',
            timer: 1500,
            showConfirmButton: false,
        })
        await loadOrders()
        showModal.value = false
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Failed to archive',
            text: err.message,
        })
    }
}

const unarchiveOrder = async id => {
    try {
        const confirm = await Swal.fire({
            title: 'Unarchive this order?',
            text: 'This will move the order back to Active Orders.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Unarchive',
            confirmButtonColor: '#3085d6',
        })
        if (!confirm.isConfirmed) return

        await patch(`admin-api/orders/${id}/`, { archived: false })

        Swal.fire({
            icon: 'success',
            title: 'Order unarchived!',
            timer: 1500,
            showConfirmButton: false,
        })

        await loadOrders()
        showModal.value = false
        showArchived.value = false
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Failed to unarchive',
            text: err.message,
        })
    }
}


// Open Modal
const openOrderModal = order => {
    selectedOrder.value = { ...order }
    showModal.value = true
}

const displayedOrders = computed(() => {
    return showArchived.value ? archivedOrders.value : sortedOrders.value
})



</script>

<template>
    <div v-if="admin" class="bg-white shadow-lg rounded-lg p-6">
        <!-- Toggle + Search -->
        <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div class="flex gap-2">
                <button @click="showArchived = false" :class="[
                    'px-4 py-2 rounded-lg font-medium text-sm transition',
                    !showArchived
                        ? 'bg-[#FA812F] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]">
                    Active Orders
                </button>
                <button @click="showArchived = true" :class="[
                    'px-4 py-2 rounded-lg font-medium text-sm transition',
                    showArchived
                        ? 'bg-[#FA812F] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]">
                    Archived Orders
                </button>
            </div>

            <input v-model="searchQuery" type="text" placeholder="Search orders..."
                class="w-full sm:w-1/3 border border-black/20 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FA812F] focus:outline-none" />
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full text-left border-collapse">
                <thead class="bg-[#E3D9CB] text-[#010024]">
                    <tr>
                        <th class="p-3 cursor-pointer" @click="toggleSort('id')">
                            #
                            <span v-if="sortKey === 'id'">
                                <i v-if="sortDirection === 'asc'">▲</i>
                                <i v-else-if="sortDirection === 'desc'">▼</i>
                            </span>
                        </th>
                        <th class="p-3 cursor-pointer" @click="toggleSort('customer_name')">
                            Customer
                            <span v-if="sortKey === 'customer_name'">
                                <i v-if="sortDirection === 'asc'">▲</i>
                                <i v-else-if="sortDirection === 'desc'">▼</i>
                            </span>
                        </th>
                        <th class="p-3 hidden md:table-cell cursor-pointer" @click="toggleSort('email')">
                            Email
                            <span v-if="sortKey === 'email'">
                                <i v-if="sortDirection === 'asc'">▲</i>
                                <i v-else-if="sortDirection === 'desc'">▼</i>
                            </span>
                        </th>
                        <th class="p-3 hidden md:table-cell cursor-pointer" @click="toggleSort('total_amount')">
                            Total
                            <span v-if="sortKey === 'total_amount'">
                                <i v-if="sortDirection === 'asc'">▲</i>
                                <i v-else-if="sortDirection === 'desc'">▼</i>
                            </span>
                        </th>
                        <th class="p-3 cursor-pointer" @click="toggleSort('status')">
                            Status
                            <span v-if="sortKey === 'status'">
                                <i v-if="sortDirection === 'asc'">▲</i>
                                <i v-else-if="sortDirection === 'desc'">▼</i>
                            </span>
                        </th>
                        <th class="p-3 hidden lg:table-cell cursor-pointer" @click="toggleSort('created_at')">
                            Created
                            <span v-if="sortKey === 'created_at'">
                                <i v-if="sortDirection === 'asc'">▲</i>
                                <i v-else-if="sortDirection === 'desc'">▼</i>
                            </span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="order in displayedOrders" :key="order.id"
                        class="border-b border-black/20 hover:bg-[#FEF3E2] transition cursor-pointer"
                        @click="openOrderModal(order)">
                        <td class="p-3 font-medium">#{{ order.id }}</td>
                        <td class="p-3">{{ order.customer_name }}</td>
                        <td class="p-3 hidden md:table-cell">{{ order.email }}</td>
                        <td class="p-3 hidden md:table-cell">R{{ order.total_amount }}</td>
                        <td class="p-3">
                            <span class="px-2 py-1 rounded text-xs font-semibold" :class="{
                                'bg-yellow-300 text-yellow-800':
                                    order.status === 'pending_confirmation',
                                'bg-blue-300 text-blue-900': order.status === 'confirmed',
                                'bg-purple-300 text-purple-900': order.status === 'packed_ready',
                                'bg-orange-300 text-orange-900': order.status === 'en_route',
                                'bg-green-400 text-green-900': order.status === 'completed',
                                'bg-red-400 text-red-900': order.status === 'cancelled',
                            }">
                                {{ order.status.replace(/_/g, ' ') }}
                            </span>
                        </td>
                        <td class="p-3 hidden lg:table-cell text-sm text-gray-600">
                            {{ new Date(order.created_at).toLocaleDateString() }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


        <!-- Modal -->
        <Transition name="fade">
            <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000]"
                @click.self="showModal = false">
                <div class="bg-white rounded-lg p-6 w-full max-w-2xl shadow-2xl mx-10 relative">

                    <!-- Close Button -->
                    <button @click="showModal = false"
                        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition">
                        ✕
                    </button>



                    <h2 class="text-xl font-bold mb-4 text-[#FA812F]">
                        Order #{{ selectedOrder.id }}
                    </h2>

                    <!-- 🧍 Customer Info -->
                    <div class="space-y-2 text-gray-700 text-sm mb-4">
                        <p><strong>Customer:</strong> {{ selectedOrder.customer_name }}</p>
                        <p><strong>Email:</strong> {{ selectedOrder.email }}</p>
                        <p><strong>Phone:</strong> {{ selectedOrder.phone || '-' }}</p>
                        <p><strong>Address:</strong> {{ selectedOrder.address }}</p>
                        <p><strong>City:</strong> {{ selectedOrder.city || '-' }}</p>
                        <p><strong>ZIP:</strong> {{ selectedOrder.zip_code || '-' }}</p>
                        <p><strong>Preferred Date:</strong> {{ selectedOrder.preferred_delivery_date || '-' }}</p>
                        <p><strong>Notes:</strong> {{ selectedOrder.notes || 'None' }}</p>
                    </div>

                    <!-- Ordered Items Table -->
                    <div v-if="selectedOrder.items?.length" class="border-t border-b border-gray-200 py-3 my-4">
                        <h3 class="font-semibold mb-2 text-gray-800">Ordered Items</h3>
                        <table class="min-w-full text-sm text-left border-collapse">
                            <thead class="bg-gray-100 text-gray-700">
                                <tr>
                                    <th class="p-2">Product</th>
                                    <th class="p-2 text-center">Qty</th>
                                    <th class="p-2 text-right">Price Each</th>
                                    <th class="p-2 text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in selectedOrder.items" :key="item.id"
                                    class="border-b border-gray-100 hover:bg-gray-50">
                                    <td class="p-2">{{ item.product_name }}</td>
                                    <td class="p-2 text-center">{{ item.quantity }}</td>
                                    <td class="p-2 text-right">R{{ parseFloat(item.price_each).toFixed(2) }}</td>
                                    <td class="p-2 text-right font-medium">
                                        R{{ parseFloat(item.subtotal).toFixed(2) }}
                                    </td>
                                </tr>

                                <!-- Shipping Fee Row -->
                                <tr class="font-medium bg-gray-50">
                                    <td colspan="3" class="p-2 text-right">Shipment ({{
                                        selectedOrder.delivery_method || '—' }})</td>
                                    <td class="p-2 text-right">Fee: R{{ parseFloat(selectedOrder.shipping_fee ||
                                        0).toFixed(2) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Total -->
                    <div class="text-right font-semibold text-lg text-gray-800">
                        Total: R{{ parseFloat(selectedOrder.total_amount).toFixed(2) }}
                    </div>

                    <!-- Status Controls -->
                    <div class="flex justify-end gap-2 mt-6 flex-wrap">
                        <!-- When viewing Archived Orders -->
                        <button v-if="showArchived" @click="unarchiveOrder(selectedOrder.id)"
                            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                            Unarchive
                        </button>

                        <!-- When viewing Active Orders -->
                        <template v-else>
                            <button v-for="action in getStatusActions(selectedOrder.status)" :key="action.label"
                                @click="updateOrderStatus(selectedOrder, action.next)"
                                class="px-4 py-2 rounded-lg text-white text-sm font-medium transition" :class="action.label.toLowerCase().includes('cancel')
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-[#FA812F] hover:bg-[#e8721f]'">
                                {{ action.label }}
                            </button>

                            <button
                                v-if="['completed', 'cancelled'].includes(selectedOrder.status) && !selectedOrder.archived"
                                @click="archiveOrder(selectedOrder.id)"
                                class="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                                Archive
                            </button>
                        </template>
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
